import PageTitle from '../components/PageTitle.jsx'
import PageIntro from '../components/PageIntro.jsx'
import Img from '../components/Img.jsx'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import { diningCta, diningPage, venues } from '../data/dining.js'
import { site } from '../data/site.js'
import './Dining.css'

export default function Dining() {
  return (
    <>
      <PageTitle title="Dining" description="Tide restaurant and The Brass Bar at Marina Crest Hotel: coastal cooking and slow cocktails by the Lagos lagoon, with opening hours." />
      <PageIntro eyebrow={diningPage.eyebrow} title={diningPage.title} titleItalic={diningPage.titleItalic} intro={diningPage.intro}>
        <ul className="dine-summary">
          {venues.map((v) => (
            <li key={v.id}>
              <a href={`#${v.id}`}>{v.name}</a>
              <span>{v.open}</span>
            </li>
          ))}
        </ul>
      </PageIntro>

      {venues.map((v, i) => (
        <section key={v.id} id={v.id} className={`venue ${i % 2 ? 'venue--alt' : ''}`} aria-labelledby={`${v.id}-title`}>
          <div className="venue__grid container container--wide">
            <Reveal className="venue__media">
              <Img src={v.image} alt={v.imageAlt} ratio="4 / 5" label={v.label} />
            </Reveal>
            <Reveal className="venue__content" delay={120}>
              <p className="eyebrow">{v.eyebrow}</p>
              <h2 id={`${v.id}-title`}>
                <span className="venue__name">{v.name}</span>
                {v.title}
              </h2>
              {v.text.map((p) => (
                <p key={p} className="venue__text">
                  {p}
                </p>
              ))}
              <div className="venue__hours">
                <h3>Opening hours</h3>
                <dl>
                  {v.hours.map((h) => (
                    <div key={h.label}>
                      <dt>{h.label}</dt>
                      <dd>{h.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="venue__note">{v.note}</p>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="dine-cta" aria-labelledby="dine-cta-title">
        <Reveal className="dine-cta__inner container">
          <h2 id="dine-cta-title">{diningCta.title}</h2>
          <p>{diningCta.text}</p>
          <div className="dine-cta__actions">
            <Button to="/book" variant="brass">
              Book a stay
            </Button>
            <Button href={`tel:${site.phone.replace(/\s/g, '')}`} variant="light">
              Call {site.phone}
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
