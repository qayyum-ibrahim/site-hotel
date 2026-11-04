import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle.jsx'
import Img from '../components/Img.jsx'
import Button from '../components/Button.jsx'
import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import AvailabilityBar from '../components/AvailabilityBar.jsx'
import RoomCard from '../components/RoomCard.jsx'
import { amenities, dining, facilitiesFeature, hero, intro, rating, reviews } from '../data/home.js'
import { currency, getRoom } from '../data/rooms.js'
import { offers } from '../data/offers.js'
import './Home.css'

const featuredRooms = ['deluxe-marina-room', 'junior-suite', 'presidential-suite'].map(getRoom)

export default function Home() {
  return (
    <>
      <PageTitle
        title={null}
        description="Marina Crest Hotel is a calm waterfront hotel in Lagos with bright rooms and suites, an infinity pool, a spa and lagoon-side dining."
      />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__media">
          <Img src={hero.image} alt="Marina Crest Hotel at golden hour, seen across the calm water" ratio="auto" eager className="hero__img" />
        </div>
        <div className="hero__content container container--wide">
          <p className="eyebrow hero__eyebrow fade-up">{hero.eyebrow}</p>
          <h1 id="hero-title" className="hero__title fade-up">
            {hero.title} <em>{hero.titleItalic}</em>
          </h1>
          <p className="hero__text fade-up">{hero.text}</p>
        </div>
      </section>

      <div className="hero__avail container container--wide">
        <div className="fade-up hero__avail-inner">
          <AvailabilityBar />
        </div>
      </div>

      <section className="intro container" aria-labelledby="intro-title">
        <Reveal className="intro__head">
          <p className="eyebrow">{intro.eyebrow}</p>
          <h2 id="intro-title">{intro.title}</h2>
        </Reveal>
        <Reveal className="intro__body" delay={120}>
          <p className="lead">{intro.text}</p>
          <dl className="intro__stats">
            {intro.stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <Section
        id="rooms"
        tone="surface"
        wide
        eyebrow="Rooms & Suites"
        title="Light, linen and the water outside."
        className="home-rooms"
      >
        <ul className="room-cards">
          {featuredRooms.map((room, i) => (
            <RoomCard key={room.id} room={room} delay={i * 120} />
          ))}
        </ul>
        <div className="home-rooms__more">
          <Button to="/rooms" variant="outline">
            View all six rooms
          </Button>
        </div>
      </Section>

      <Section id="facilities" wide className="home-amenities">
        <div className="amenities">
          <Reveal className="amenities__media">
            <Img src={facilitiesFeature.image} alt={facilitiesFeature.imageAlt} ratio="4 / 5" label="The pool" className="amenities__img-main" />
            <Img src={facilitiesFeature.secondImage} alt={facilitiesFeature.secondAlt} ratio="1 / 1" label="The spa" className="amenities__img-small" />
          </Reveal>
          <div className="amenities__content">
            <Reveal className="section__head">
              <p className="eyebrow">Amenities</p>
              <h2 id="facilities-title">Slow mornings, warm water, nowhere to be.</h2>
            </Reveal>
            <ul className="amenities__list">
              {amenities.map((a, i) => (
                <Reveal as="li" key={a.title} delay={i * 90}>
                  <Icon name={a.icon} size={36} />
                  <div>
                    <h3>{a.title}</h3>
                    <p>{a.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Button to="/facilities" variant="outline">
              Explore facilities
            </Button>
          </div>
        </div>
      </Section>

      <section className="home-dining" aria-labelledby="dining-title">
        <div className="home-dining__grid container container--wide">
          <Reveal className="home-dining__media">
            <Img src={dining.image} alt={dining.imageAlt} ratio="3 / 2" label="Tide" />
          </Reveal>
          <Reveal className="home-dining__content" delay={120}>
            <p className="eyebrow">{dining.eyebrow}</p>
            <h2 id="dining-title">{dining.title}</h2>
            <p className="home-dining__text">{dining.text}</p>
            <ul className="home-dining__venues">
              {dining.venues.map((v) => (
                <li key={v.name}>
                  <span className="home-dining__venue">{v.name}</span>
                  <span>{v.note}</span>
                </li>
              ))}
            </ul>
            <Button to="/dining" variant="light">
              See the menus and hours
            </Button>
          </Reveal>
        </div>
      </section>

      <Section id="offers" wide eyebrow="Special offers" title="Reasons to stay a little longer." className="home-offers">
        <ul className="offer-cards">
          {offers.map((o, i) => (
            <Reveal as="li" key={o.id} delay={i * 120} className="offer-card">
              <p className="offer-card__tag">{o.tag}</p>
              <h3>{o.title}</h3>
              <p className="offer-card__text">{o.text}</p>
              <p className="offer-card__from">
                From <strong>{currency(o.from)}</strong>
              </p>
              <Link to="/offers" className="offer-card__link">
                View offer <Icon name="arrow" size={18} />
                <span className="visually-hidden">: {o.title}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="reviews" tone="surface" wide className="home-reviews">
        <div className="reviews">
          <Reveal className="reviews__head">
            <p className="eyebrow">Guest reviews</p>
            <h2 id="reviews-title">Words from our guests.</h2>
            <p className="reviews__score">
              <span className="reviews__number">{rating.score}</span>
              <span>
                <span className="reviews__stars" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Icon key={n} name="star" size={16} />
                  ))}
                </span>
                <span className="reviews__count">
                  <span className="visually-hidden">Rated {rating.score} out of 5 from </span>
                  {rating.count}
                </span>
              </span>
            </p>
          </Reveal>
          <ul className="reviews__list">
            {reviews.map((r, i) => (
              <Reveal as="li" key={r.name} delay={i * 120}>
                <figure className="review">
                  <blockquote>
                    <p>“{r.quote}”</p>
                  </blockquote>
                  <figcaption>
                    <span className="review__name">{r.name}</span>
                    <span className="review__stay">Stayed in the {r.stay}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>
    </>
  )
}
