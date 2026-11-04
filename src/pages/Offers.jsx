import PageTitle from '../components/PageTitle.jsx'
import PageIntro from '../components/PageIntro.jsx'
import Img from '../components/Img.jsx'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import { offers, offersPage } from '../data/offers.js'
import { currency } from '../data/rooms.js'
import './Offers.css'

export default function Offers() {
  return (
    <>
      <PageTitle title="Offers" description="Three stay packages at Marina Crest Hotel: Lagoon Escape, Spa Retreat and Family Summer." />
      <PageIntro eyebrow={offersPage.eyebrow} title={offersPage.title} titleItalic={offersPage.titleItalic} intro={offersPage.intro} />

      <ol className="packages container container--wide">
        {offers.map((o, i) => (
          <li key={o.id} id={o.id} className="package">
            <Reveal className="package__media">
              <Img src={o.image} alt={o.imageAlt} ratio="4 / 3" label={o.title} />
              <span className="package__num" aria-hidden="true">
                0{i + 1}
              </span>
            </Reveal>
            <Reveal className="package__body" delay={120}>
              <p className="eyebrow">{o.tag}</p>
              <h2>{o.title}</h2>
              <p className="package__lead">{o.text}</p>
              <p className="package__text">{o.details}</p>
              <ul className="package__perks" aria-label={`Included in ${o.title}`}>
                {o.perks.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="package__foot">
                <p className="package__price">
                  <span>From</span>
                  <strong>{currency(o.from)}</strong>
                  <span>{o.unit}</span>
                </p>
                <Button to="/book">
                  Book this offer<span className="visually-hidden">: {o.title}</span>
                </Button>
              </div>
              <p className="package__terms">{o.terms}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      <p className="packages__note container">{offersPage.note}</p>
    </>
  )
}
