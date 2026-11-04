import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'
import { addDays, today, validateStay } from '../lib/dates.js'
import { guestOptions } from '../data/booking.js'
import './AvailabilityBar.css'

export default function AvailabilityBar() {
  const navigate = useNavigate()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('2')
  const [errors, setErrors] = useState({})
  const minIn = today()
  const minOut = checkIn ? addDays(checkIn, 1) : addDays(minIn, 1)

  const onCheckIn = (value) => {
    setCheckIn(value)
    // Keep check-out valid when check-in moves past it.
    if (value && checkOut && checkOut <= value) setCheckOut(addDays(value, 1))
    setErrors((e) => ({ ...e, checkIn: undefined }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validateStay({ checkIn, checkOut })
    setErrors(found)
    if (Object.keys(found).length) {
      e.currentTarget.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }
    const params = new URLSearchParams({ checkIn, checkOut, guests })
    navigate(`/book?${params}`)
  }

  return (
    <form className="avail" onSubmit={onSubmit} noValidate aria-label="Check availability">
      <div className={`avail__field ${errors.checkIn ? 'has-error' : ''}`}>
        <label htmlFor="avail-in">
          <Icon name="calendar" size={18} /> Check-in
        </label>
        <input
          id="avail-in"
          name="checkIn"
          type="date"
          min={minIn}
          value={checkIn}
          onChange={(e) => onCheckIn(e.target.value)}
          aria-invalid={!!errors.checkIn}
          aria-describedby={errors.checkIn ? 'avail-in-error' : undefined}
          required
        />
        {errors.checkIn && (
          <p id="avail-in-error" className="avail__error" role="alert">
            {errors.checkIn}
          </p>
        )}
      </div>

      <div className={`avail__field ${errors.checkOut ? 'has-error' : ''}`}>
        <label htmlFor="avail-out">
          <Icon name="calendar" size={18} /> Check-out
        </label>
        <input
          id="avail-out"
          name="checkOut"
          type="date"
          min={minOut}
          value={checkOut}
          onChange={(e) => {
            setCheckOut(e.target.value)
            setErrors((er) => ({ ...er, checkOut: undefined }))
          }}
          aria-invalid={!!errors.checkOut}
          aria-describedby={errors.checkOut ? 'avail-out-error' : undefined}
          required
        />
        {errors.checkOut && (
          <p id="avail-out-error" className="avail__error" role="alert">
            {errors.checkOut}
          </p>
        )}
      </div>

      <div className="avail__field">
        <label htmlFor="avail-guests">
          <Icon name="guests" size={18} /> Guests
        </label>
        <select id="avail-guests" name="guests" value={guests} onChange={(e) => setGuests(e.target.value)}>
          {guestOptions.map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? 'guest' : 'guests'}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn--primary avail__submit">
        Check availability
      </button>
    </form>
  )
}
