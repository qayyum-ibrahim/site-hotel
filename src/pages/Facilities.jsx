import PageTitle from '../components/PageTitle.jsx'
import PageIntro from '../components/PageIntro.jsx'
import Img from '../components/Img.jsx'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import { facilities, facilitiesCta, facilitiesPage } from '../data/facilities.js'
import { site } from '../data/site.js'
import './Facilities.css'

export default function Facilities() {
  return (
    <>
      <PageTitle title="Facilities" description="Infinity pool, spa, fitness studio and event spaces at Marina Crest Hotel on the Lagos waterfront." />
      <PageIntro eyebrow={facilitiesPage.eyebrow} title={facilitiesPage.title} titleItalic={facilitiesPage.titleItalic} intro={facilitiesPage.intro}>
        <nav aria-label="On this page" className="fac-jump">
          <ul>
            {facilities.map((f) => (
              <li key={f.id}>
                <a href={`#${f.id}`}>{f.eyebrow}</a>
              </li>
            ))}
          </ul>
        </nav>
      </PageIntro>

      <div className="fac-list">
        {facilities.map((f, i) => (
          <section key={f.id} id={f.id} className={`fac ${i % 2 ? 'fac--flip' : ''}`} aria-labelledby={`${f.id}-title`}>
            <div className="fac__grid container container--wide">
              <Reveal className="fac__media">
                <Img src={f.image} alt={f.imageAlt} ratio="4 / 3" label={f.label} />
              </Reveal>
              <Reveal className="fac__content" delay={120}>
                <p className="eyebrow">
                  <span className="fac__num" aria-hidden="true">
                    0{i + 1}
                  </span>
                  {f.eyebrow}
                </p>
                <h2 id={`${f.id}-title`}>{f.title}</h2>
                <p className="fac__text">{f.text}</p>
                <dl className="fac__details">
                  {f.details.map((d) => (
                    <div key={d.label}>
                      <dt>{d.label}</dt>
                      <dd>{d.value}</dd>
                    </div>
                  ))}
                </dl>
                <Icon name={f.icon} size={40} className="fac__icon" />
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <section className="fac-cta" aria-labelledby="fac-cta-title">
        <Reveal className="fac-cta__inner container">
          <h2 id="fac-cta-title">{facilitiesCta.title}</h2>
          <p>{facilitiesCta.text}</p>
          <div className="fac-cta__actions">
            <Button to="/book" variant="brass">
              Book a stay
            </Button>
            <Button href={`mailto:${site.email}`} variant="light">
              Email us
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
