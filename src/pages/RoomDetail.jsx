import { Link, useParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle.jsx'
import PageIntro from '../components/PageIntro.jsx'
import Button from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'
import RoomCard from '../components/RoomCard.jsx'
import RoomGallery from '../components/RoomGallery.jsx'
import { currency, getRoom, rooms, roomsPage } from '../data/rooms.js'
import './RoomDetail.css'

export default function RoomDetail() {
  const { id } = useParams()
  const room = getRoom(id)

  if (!room) {
    return (
      <>
        <PageTitle title="Room not found" description="This room could not be found at Marina Crest Hotel." />
        <PageIntro eyebrow="Rooms & Suites" title="This room is" titleItalic="not on our map." intro="The link may be old or mistyped. All six rooms and suites are on the rooms page.">
          <div>
            <Button to="/rooms" variant="outline">
              See all rooms
            </Button>
          </div>
        </PageIntro>
      </>
    )
  }

  const others = rooms.filter((r) => r.id !== room.id && r.type === room.type)
  const more = [...others, ...rooms.filter((r) => r.id !== room.id && r.type !== room.type)].slice(0, 3)
  const facts = [
    { label: 'Size', value: `${room.size} m²` },
    { label: 'Guests', value: `Up to ${room.guests}` },
    { label: 'Bed', value: room.bed },
    { label: 'View', value: room.view },
  ]

  return (
    <>
      <PageTitle title={room.name} description={`${room.name} at Marina Crest Hotel: ${room.summary} From ${currency(room.price)} per night.`} />

      <div className="room container container--wide">
        <nav className="room__crumbs fade-up" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link to="/rooms">Rooms & Suites</Link>
            </li>
            <li aria-current="page">{room.name}</li>
          </ol>
        </nav>

        <header className="room__head">
          <p className="eyebrow fade-up">{room.type}</p>
          <h1 className="room__title fade-up">{room.name}</h1>
          <p className="room__summary lead fade-up">{room.summary}</p>
        </header>

        <div className="room__gallery fade-up">
          <RoomGallery key={room.id} images={room.gallery} name={room.name} />
        </div>

        <div className="room__layout">
          <div className="room__main">
            <Reveal className="room__text">
              {room.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>

            <Reveal as="section" className="room__amenities" aria-labelledby="amenities-title">
              <h2 id="amenities-title">In the room</h2>
              <ul>
                {room.amenities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="room__aside" aria-label="Rate and booking">
            <div className="room__card">
              <p className="room__price">
                <span className="room__price-from">From</span>
                <span className="room__price-value">{currency(room.price)}</span>
                <span className="room__price-unit">per night</span>
              </p>
              <dl className="room__facts">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <Button to={`/book?room=${room.id}`} className="room__book">
                Book this room
              </Button>
              <p className="room__note">{roomsPage.note}</p>
            </div>
          </aside>
        </div>
      </div>

      <section className="room-more" aria-labelledby="more-title">
        <div className="container container--wide">
          <div className="room-more__head">
            <h2 id="more-title">You may also like</h2>
            <Link to="/rooms" className="room-more__all">
              All rooms
            </Link>
          </div>
          <ul className="room-cards room-more__grid">
            {more.map((r, i) => (
              <RoomCard key={r.id} room={r} delay={i * 100} ratio="5 / 4" />
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
