import { Link } from 'react-router-dom'
import Img from './Img.jsx'
import Reveal from './Reveal.jsx'
import { currency } from '../data/rooms.js'
import './RoomCard.css'

export default function RoomCard({ room, delay = 0, ratio = '4 / 5', headingLevel = 3 }) {
  const H = `h${headingLevel}`
  return (
    <Reveal as="li" delay={delay} className="room-card">
      <Link to={`/rooms/${room.id}`} className="room-card__link">
        <Img src={room.image} alt={`${room.name} interior`} ratio={ratio} label={room.name} className="room-card__img" />
        <div className="room-card__body">
          <p className="room-card__meta">
            {room.type} · {room.size} m² · {room.view}
          </p>
          <H>{room.name}</H>
          <p className="room-card__price">
            From <strong>{currency(room.price)}</strong> / night
          </p>
        </div>
      </Link>
    </Reveal>
  )
}
