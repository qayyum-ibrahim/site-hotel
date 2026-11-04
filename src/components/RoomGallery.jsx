import { useState } from 'react'
import Img from './Img.jsx'
import Icon from './Icon.jsx'
import './RoomGallery.css'

export default function RoomGallery({ images, name }) {
  const [index, setIndex] = useState(0)
  const count = images.length
  const go = (step) => setIndex((i) => (i + step + count) % count)
  const altFor = (img, i) => img.alt || `${name} interior${count > 1 ? `, photo ${i + 1}` : ''}`

  const onKeyDown = (e) => {
    if (count < 2) return
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <div className="gallery" role="region" aria-roledescription="gallery" aria-label={`${name} photos`} onKeyDown={onKeyDown}>
      <div className="gallery__stage">
        {images.map((img, i) => (
          <div key={img.src} className={`gallery__slide ${i === index ? 'is-active' : ''}`} aria-hidden={i !== index}>
            <Img src={img.src} alt={altFor(img, i)} ratio="3 / 2" label={img.label || name} eager={i === 0} />
          </div>
        ))}

        {count > 1 && (
          <div className="gallery__controls">
            <button type="button" className="gallery__arrow gallery__arrow--prev" onClick={() => go(-1)}>
              <Icon name="arrow" size={20} />
              <span className="visually-hidden">Previous photo</span>
            </button>
            <p className="gallery__count" aria-live="polite">
              <span className="visually-hidden">Photo </span>
              {index + 1} <span aria-hidden="true">/</span>
              <span className="visually-hidden"> of </span> {count}
            </p>
            <button type="button" className="gallery__arrow" onClick={() => go(1)}>
              <Icon name="arrow" size={20} />
              <span className="visually-hidden">Next photo</span>
            </button>
          </div>
        )}
      </div>

      {count > 1 && (
        <ul className="gallery__thumbs">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                className="gallery__thumb"
                aria-current={i === index ? 'true' : undefined}
                onClick={() => setIndex(i)}
              >
                <Img src={img.src} alt="" ratio="3 / 2" />
                <span className="visually-hidden">Show {img.label || `photo ${i + 1}`}</span>
                {img.label && <span className="gallery__thumb-label" aria-hidden="true">{img.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
