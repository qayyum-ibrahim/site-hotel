import { useSearchParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle.jsx'
import PageIntro from '../components/PageIntro.jsx'
import RoomCard from '../components/RoomCard.jsx'
import { rooms, roomsPage, roomTypes } from '../data/rooms.js'
import './Rooms.css'

export default function Rooms() {
  const [params, setParams] = useSearchParams()
  const requested = params.get('type')
  const type = roomTypes.includes(requested) ? requested : 'All'
  const list = type === 'All' ? rooms : rooms.filter((r) => r.type === type)

  const choose = (t) => setParams(t === 'All' ? {} : { type: t }, { replace: true, preventScrollReset: true })

  return (
    <>
      <PageTitle
        title="Rooms & Suites"
        description="Six bright rooms and suites on the Lagos waterfront, from the Deluxe Marina Room to the Presidential Suite."
      />
      <PageIntro eyebrow={roomsPage.eyebrow} title={roomsPage.title} titleItalic={roomsPage.titleItalic} intro={roomsPage.intro} />

      <section className="rooms container container--wide" aria-labelledby="rooms-filter-label">
        <div className="rooms__bar">
          <div className="rooms__filter" role="group" aria-labelledby="rooms-filter-label">
            <span id="rooms-filter-label" className="rooms__filter-label">
              Filter by type
            </span>
            <div className="rooms__chips">
              {roomTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  className="rooms__chip"
                  aria-pressed={type === t}
                  onClick={() => choose(t)}
                >
                  {t === 'All' ? 'All rooms' : t === 'Suite' ? 'Suites' : t}
                </button>
              ))}
            </div>
          </div>
          <p className="rooms__count" aria-live="polite">
            Showing {list.length} of {rooms.length}
          </p>
        </div>

        <ul className="room-cards rooms__grid" key={type}>
          {list.map((room, i) => (
            <RoomCard key={room.id} room={room} delay={(i % 3) * 100} ratio="5 / 4" headingLevel={2} />
          ))}
        </ul>

        <p className="rooms__note">{roomsPage.note}</p>
      </section>
    </>
  )
}
