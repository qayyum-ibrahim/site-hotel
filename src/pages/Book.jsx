import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle.jsx'
import PageIntro from '../components/PageIntro.jsx'
import Img from '../components/Img.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { addDays, nightsBetween, today, validateStay } from '../lib/dates.js'
import { arrivalOptions, bookingNotes, bookingPage, guestOptions, steps } from '../data/booking.js'
import { currency, getRoom, rooms } from '../data/rooms.js'
import './Book.css'

const ISO = /^\d{4}-\d{2}-\d{2}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emptyGuest = { firstName: '', lastName: '', email: '', phone: '', arrival: arrivalOptions[0], requests: '', agree: false }

function formatDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
}

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`

// Reads the stay from the URL (sent by the availability bar or a room page) and keeps only valid values.
function initialStay(params) {
  const checkIn = params.get('checkIn') || ''
  const checkOut = params.get('checkOut') || ''
  const datesOk = ISO.test(checkIn) && ISO.test(checkOut) && !Object.keys(validateStay({ checkIn, checkOut })).length
  const guestsParam = Number(params.get('guests'))
  const guests = guestOptions.includes(guestsParam) ? guestsParam : 2
  const room = getRoom(params.get('room'))
  return {
    checkIn: datesOk ? checkIn : '',
    checkOut: datesOk ? checkOut : '',
    guests,
    roomId: room && room.guests >= guests ? room.id : '',
    step: datesOk ? 1 : 0,
  }
}

function validateGuest(g) {
  const errors = {}
  if (!g.firstName.trim()) errors.firstName = 'Enter your first name.'
  if (!g.lastName.trim()) errors.lastName = 'Enter your last name.'
  if (!g.email.trim()) errors.email = 'Enter your email address.'
  else if (!EMAIL.test(g.email.trim())) errors.email = 'Enter an email address like name@example.com.'
  if (!g.phone.trim()) errors.phone = 'Enter a phone number.'
  else if (!/^\+?[\d\s()-]+$/.test(g.phone.trim()) || g.phone.replace(/\D/g, '').length < 7) errors.phone = 'Enter a phone number with at least 7 digits.'
  if (!g.agree) errors.agree = 'Please accept the booking terms.'
  return errors
}

function Field({ id, label, error, hint, optional, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>
        {label} {optional && <span className="field__optional">(optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="field__hint">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="field__error">
          {error}
        </p>
      )}
    </div>
  )
}

const describe = (id, error, hint) => [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined

export default function Book() {
  const [params] = useSearchParams()
  const [init] = useState(() => initialStay(params))
  const [step, setStep] = useState(init.step)
  const [stay, setStay] = useState({ checkIn: init.checkIn, checkOut: init.checkOut, guests: init.guests })
  const [roomId, setRoomId] = useState(init.roomId)
  const [guest, setGuest] = useState(emptyGuest)
  const [errors, setErrors] = useState({})
  const [reference, setReference] = useState('')
  const headingRef = useRef(null)
  const firstRender = useRef(true)

  const room = getRoom(roomId)
  const nights = nightsBetween(stay.checkIn, stay.checkOut)
  const total = room && nights > 0 ? room.price * nights : 0
  const minIn = today()
  const minOut = stay.checkIn ? addDays(stay.checkIn, 1) : addDays(minIn, 1)

  // Move focus to the new step heading so keyboard and screen reader users follow along.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const el = headingRef.current
    if (!el) return
    el.focus({ preventScroll: true })
    const top = el.getBoundingClientRect().top + window.scrollY - 120
    window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }, [step, reference])

  const go = (n) => {
    setErrors({})
    setStep(n)
  }

  const focusFirstError = (form, found) => {
    const first = Object.keys(found)[0]
    form.querySelector(`[name="${first}"]`)?.focus()
  }

  const onCheckIn = (value) => {
    setStay((s) => ({ ...s, checkIn: value, checkOut: value && s.checkOut && s.checkOut <= value ? addDays(value, 1) : s.checkOut }))
    setErrors((e) => ({ ...e, checkIn: undefined }))
  }

  const onGuests = (value) => {
    const n = Number(value)
    setStay((s) => ({ ...s, guests: n }))
    if (room && room.guests < n) setRoomId('')
  }

  const submitDates = (e) => {
    e.preventDefault()
    const found = validateStay(stay)
    setErrors(found)
    if (Object.keys(found).length) return focusFirstError(e.currentTarget, found)
    go(1)
  }

  const submitRoom = (e) => {
    e.preventDefault()
    if (!room) {
      setErrors({ roomId: 'Choose a room to continue.' })
      e.currentTarget.querySelector('input[name="roomId"]:not(:disabled)')?.focus()
      return
    }
    go(2)
  }

  const submitGuest = (e) => {
    e.preventDefault()
    const found = validateGuest(guest)
    setErrors(found)
    if (Object.keys(found).length) return focusFirstError(e.currentTarget, found)
    go(3)
  }

  const confirm = () => {
    const code = Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, '0')
    setReference(`MC-${code}`)
  }

  const restart = () => {
    setStay({ checkIn: '', checkOut: '', guests: 2 })
    setRoomId('')
    setGuest(emptyGuest)
    setErrors({})
    setReference('')
    setStep(0)
  }

  const setGuestField = (name) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setGuest((g) => ({ ...g, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const errorCount = Object.values(errors).filter(Boolean).length

  const summaryRows = [
    { label: 'Check-in', value: formatDate(stay.checkIn) || 'Not chosen' },
    { label: 'Check-out', value: formatDate(stay.checkOut) || 'Not chosen' },
    { label: 'Nights', value: nights > 0 ? nights : '–' },
    { label: 'Guests', value: plural(stay.guests, 'guest') },
    { label: 'Room', value: room ? room.name : 'Not chosen' },
  ]

  if (reference) {
    return (
      <>
        <PageTitle title="Booking confirmed" description="Your stay at Marina Crest Hotel is confirmed." />
        <section className="book-done container" aria-labelledby="done-title">
          <div className="book-done__mark fade-up" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="64" height="64">
              <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M20 33l8 8 16-17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="eyebrow fade-up">Booking confirmed</p>
          <h1 id="done-title" className="book-done__title fade-up" ref={headingRef} tabIndex={-1}>
            See you by the water, <em>{guest.firstName.trim()}.</em>
          </h1>
          <p className="lead fade-up" role="status">
            Your reference is <strong className="book-done__ref">{reference}</strong>. A confirmation would be sent to {guest.email.trim()}.
          </p>

          <div className="book-done__card fade-up">
            <dl className="book-sum__list">
              {summaryRows.map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
            <p className="book-sum__total">
              <span>Total</span>
              <strong>{currency(total)}</strong>
            </p>
            <p className="book-sum__note">{bookingNotes.payment}</p>
          </div>

          <p className="book-done__demo fade-up">{bookingNotes.demo}</p>
          <div className="book-done__actions fade-up">
            <Button to="/">Back to home</Button>
            <Button variant="outline" onClick={restart}>
              Make another booking
            </Button>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageTitle title="Book a stay" description="Book your stay at Marina Crest Hotel: choose your dates and room, add guest details and confirm." />
      <PageIntro eyebrow={bookingPage.eyebrow} title={bookingPage.title} titleItalic={bookingPage.titleItalic} intro={bookingPage.intro} />

      <div className="book container container--wide">
        <nav className="book-steps" aria-label="Booking steps">
          <ol>
            {steps.map((label, i) => {
              const state = i < step ? 'done' : i === step ? 'current' : 'todo'
              return (
                <li key={label} className={`book-steps__item is-${state}`} aria-current={i === step ? 'step' : undefined}>
                  {i < step ? (
                    <button type="button" onClick={() => go(i)}>
                      <span className="book-steps__num">{i + 1}</span>
                      <span className="book-steps__label">{label}</span>
                      <span className="visually-hidden"> (completed, edit)</span>
                    </button>
                  ) : (
                    <span className="book-steps__static">
                      <span className="book-steps__num">{i + 1}</span>
                      <span className="book-steps__label">{label}</span>
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        <div className="book__layout">
          <div className="book__main">
            <p className="visually-hidden" role="status">
              {errorCount ? `${plural(errorCount, 'field')} need${errorCount === 1 ? 's' : ''} attention.` : ''}
            </p>

            {step === 0 && (
              <form className="book-step" onSubmit={submitDates} noValidate aria-labelledby="step-title">
                <h2 id="step-title" ref={headingRef} tabIndex={-1}>
                  When are you staying?
                </h2>
                <div className="book-grid">
                  <Field id="b-in" label="Check-in" error={errors.checkIn}>
                    <input
                      id="b-in"
                      name="checkIn"
                      type="date"
                      min={minIn}
                      value={stay.checkIn}
                      onChange={(e) => onCheckIn(e.target.value)}
                      aria-invalid={!!errors.checkIn}
                      aria-describedby={describe('b-in', errors.checkIn)}
                      required
                    />
                  </Field>
                  <Field id="b-out" label="Check-out" error={errors.checkOut}>
                    <input
                      id="b-out"
                      name="checkOut"
                      type="date"
                      min={minOut}
                      value={stay.checkOut}
                      onChange={(e) => {
                        setStay((s) => ({ ...s, checkOut: e.target.value }))
                        setErrors((er) => ({ ...er, checkOut: undefined }))
                      }}
                      aria-invalid={!!errors.checkOut}
                      aria-describedby={describe('b-out', errors.checkOut)}
                      required
                    />
                  </Field>
                  <Field id="b-guests" label="Guests">
                    <select id="b-guests" name="guests" value={stay.guests} onChange={(e) => onGuests(e.target.value)}>
                      {guestOptions.map((n) => (
                        <option key={n} value={n}>
                          {plural(n, 'guest')}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <p className="book-step__info">
                  <Icon name="calendar" size={20} />
                  {nights > 0 ? `${plural(nights, 'night')} · ${bookingNotes.checkTimes}` : bookingNotes.checkTimes}
                </p>
                <div className="book-step__actions">
                  <button type="submit" className="btn btn--primary">
                    Continue to rooms
                  </button>
                </div>
              </form>
            )}

            {step === 1 && (
              <form className="book-step" onSubmit={submitRoom} noValidate aria-labelledby="step-title">
                <h2 id="step-title" ref={headingRef} tabIndex={-1}>
                  Choose your room
                </h2>
                <fieldset className={`book-rooms ${errors.roomId ? 'has-error' : ''}`} aria-describedby={errors.roomId ? 'b-room-error' : undefined}>
                  <legend className="visually-hidden">
                    Rooms for {plural(stay.guests, 'guest')}, {plural(nights, 'night')}
                  </legend>
                  {rooms.map((r) => {
                    const tooSmall = r.guests < stay.guests
                    return (
                      <label key={r.id} className={`book-room ${roomId === r.id ? 'is-selected' : ''} ${tooSmall ? 'is-disabled' : ''}`}>
                        <input
                          type="radio"
                          name="roomId"
                          value={r.id}
                          checked={roomId === r.id}
                          disabled={tooSmall}
                          onChange={() => {
                            setRoomId(r.id)
                            setErrors({})
                          }}
                        />
                        <span className="book-room__img">
                          <Img src={r.image} alt="" ratio="4 / 3" />
                        </span>
                        <span className="book-room__body">
                          <span className="book-room__type">{r.type}</span>
                          <span className="book-room__name">{r.name}</span>
                          <span className="book-room__meta">
                            {r.size} m² · {r.bed} · Up to {plural(r.guests, 'guest')}
                          </span>
                          {tooSmall && <span className="book-room__warn">Too small for {plural(stay.guests, 'guest')}</span>}
                        </span>
                        <span className="book-room__price">
                          <strong>{currency(r.price)}</strong>
                          <span>per night</span>
                          <span className="book-room__total">
                            {currency(r.price * nights)} for {plural(nights, 'night')}
                          </span>
                        </span>
                        <span className="book-room__check" aria-hidden="true" />
                      </label>
                    )
                  })}
                </fieldset>
                {errors.roomId && (
                  <p id="b-room-error" className="field__error">
                    {errors.roomId}
                  </p>
                )}
                <div className="book-step__actions">
                  <button type="button" className="btn btn--outline" onClick={() => go(0)}>
                    Back
                  </button>
                  <button type="submit" className="btn btn--primary">
                    Continue to details
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form className="book-step" onSubmit={submitGuest} noValidate aria-labelledby="step-title">
                <h2 id="step-title" ref={headingRef} tabIndex={-1}>
                  Who is coming?
                </h2>
                <div className="book-grid book-grid--two">
                  <Field id="b-first" label="First name" error={errors.firstName}>
                    <input id="b-first" name="firstName" type="text" autoComplete="given-name" value={guest.firstName} onChange={setGuestField('firstName')} aria-invalid={!!errors.firstName} aria-describedby={describe('b-first', errors.firstName)} required />
                  </Field>
                  <Field id="b-last" label="Last name" error={errors.lastName}>
                    <input id="b-last" name="lastName" type="text" autoComplete="family-name" value={guest.lastName} onChange={setGuestField('lastName')} aria-invalid={!!errors.lastName} aria-describedby={describe('b-last', errors.lastName)} required />
                  </Field>
                  <Field id="b-email" label="Email" error={errors.email}>
                    <input id="b-email" name="email" type="email" autoComplete="email" inputMode="email" value={guest.email} onChange={setGuestField('email')} aria-invalid={!!errors.email} aria-describedby={describe('b-email', errors.email)} required />
                  </Field>
                  <Field id="b-phone" label="Phone" error={errors.phone}>
                    <input id="b-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+234 800 000 0000" value={guest.phone} onChange={setGuestField('phone')} aria-invalid={!!errors.phone} aria-describedby={describe('b-phone', errors.phone)} required />
                  </Field>
                  <Field id="b-arrival" label="Arrival time" optional>
                    <select id="b-arrival" name="arrival" value={guest.arrival} onChange={setGuestField('arrival')}>
                      {arrivalOptions.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </Field>
                  <div className="book-grid__full">
                    <Field id="b-requests" label="Special requests" optional hint="A cot, a quiet room, a birthday. We will do our best.">
                      <textarea id="b-requests" name="requests" rows={4} maxLength={500} value={guest.requests} onChange={setGuestField('requests')} aria-describedby={describe('b-requests', null, true)} />
                    </Field>
                  </div>
                  <div className={`book-grid__full field field--check ${errors.agree ? 'has-error' : ''}`}>
                    <input id="b-agree" name="agree" type="checkbox" checked={guest.agree} onChange={setGuestField('agree')} aria-invalid={!!errors.agree} aria-describedby={errors.agree ? 'b-agree-error' : undefined} />
                    <label htmlFor="b-agree">
                      I accept the booking terms. {bookingNotes.cancel}
                    </label>
                    {errors.agree && (
                      <p id="b-agree-error" className="field__error">
                        {errors.agree}
                      </p>
                    )}
                  </div>
                </div>
                <div className="book-step__actions">
                  <button type="button" className="btn btn--outline" onClick={() => go(1)}>
                    Back
                  </button>
                  <button type="submit" className="btn btn--primary">
                    Review booking
                  </button>
                </div>
              </form>
            )}

            {step === 3 && room && (
              <div className="book-step">
                <h2 id="step-title" ref={headingRef} tabIndex={-1}>
                  Check and confirm
                </h2>
                <div className="book-review">
                  <section className="book-review__block" aria-labelledby="rev-stay">
                    <div className="book-review__head">
                      <h3 id="rev-stay">Your stay</h3>
                      <button type="button" className="book-review__edit" onClick={() => go(0)}>
                        Edit<span className="visually-hidden"> dates</span>
                      </button>
                    </div>
                    <p>
                      {formatDate(stay.checkIn)} to {formatDate(stay.checkOut)}
                    </p>
                    <p className="book-review__muted">
                      {plural(nights, 'night')} · {plural(stay.guests, 'guest')}
                    </p>
                  </section>
                  <section className="book-review__block" aria-labelledby="rev-room">
                    <div className="book-review__head">
                      <h3 id="rev-room">Room</h3>
                      <button type="button" className="book-review__edit" onClick={() => go(1)}>
                        Edit<span className="visually-hidden"> room</span>
                      </button>
                    </div>
                    <p>{room.name}</p>
                    <p className="book-review__muted">
                      {room.size} m² · {room.bed} · {room.view}
                    </p>
                  </section>
                  <section className="book-review__block" aria-labelledby="rev-guest">
                    <div className="book-review__head">
                      <h3 id="rev-guest">Guest</h3>
                      <button type="button" className="book-review__edit" onClick={() => go(2)}>
                        Edit<span className="visually-hidden"> guest details</span>
                      </button>
                    </div>
                    <p>
                      {guest.firstName.trim()} {guest.lastName.trim()}
                    </p>
                    <p className="book-review__muted">
                      {guest.email.trim()} · {guest.phone.trim()}
                    </p>
                    <p className="book-review__muted">Arrival: {guest.arrival}</p>
                    {guest.requests.trim() && <p className="book-review__muted">Requests: {guest.requests.trim()}</p>}
                  </section>
                  <section className="book-review__block" aria-labelledby="rev-price">
                    <h3 id="rev-price">Price</h3>
                    <dl className="book-review__price">
                      <div>
                        <dt>
                          {currency(room.price)} × {plural(nights, 'night')}
                        </dt>
                        <dd>{currency(total)}</dd>
                      </div>
                      <div>
                        <dt>Taxes and service</dt>
                        <dd>Included</dd>
                      </div>
                      <div className="book-review__total">
                        <dt>Total</dt>
                        <dd>{currency(total)}</dd>
                      </div>
                    </dl>
                  </section>
                </div>
                <ul className="book-review__notes">
                  <li>{bookingNotes.included}</li>
                  <li>{bookingNotes.payment}</li>
                  <li>{bookingNotes.cancel}</li>
                </ul>
                <div className="book-step__actions">
                  <button type="button" className="btn btn--outline" onClick={() => go(2)}>
                    Back
                  </button>
                  <button type="button" className="btn btn--brass" onClick={confirm}>
                    Confirm booking
                  </button>
                </div>
                <p className="book-step__demo">{bookingNotes.demo}</p>
              </div>
            )}
          </div>

          <aside className="book-sum" aria-label="Booking summary">
            <div className="book-sum__card">
              {room ? (
                <Img src={room.image} alt={room.name} ratio="16 / 10" label={room.name} />
              ) : (
                <div className="book-sum__empty">
                  <Icon name="calendar" size={28} />
                  <span>Choose your dates and a room to see the total.</span>
                </div>
              )}
              <h2 className="book-sum__title">Your stay</h2>
              <dl className="book-sum__list">
                {summaryRows.map((r) => (
                  <div key={r.label}>
                    <dt>{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="book-sum__total" aria-live="polite">
                <span>Total</span>
                <strong>{total ? currency(total) : '–'}</strong>
              </p>
              {room && nights > 0 && (
                <p className="book-sum__note">
                  {currency(room.price)} × {plural(nights, 'night')}. Taxes included.
                </p>
              )}
              <p className="book-sum__note">{bookingNotes.cancel}</p>
              <Link to="/rooms" className="book-sum__link">
                Compare all rooms <Icon name="arrow" size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
