import PageTitle from '../components/PageTitle.jsx'
import Button from '../components/Button.jsx'
import { nav } from '../data/site.js'
import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <section className="not-found container" aria-labelledby="nf-title">
      <PageTitle title="Page not found" description="This page could not be found at Marina Crest Hotel." />
      <svg className="not-found__mark fade-up" viewBox="0 0 120 60" aria-hidden="true">
        <path d="M44 30l16-17 16 17" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 44c13.3-9 26.7-9 40 0s26.7 9 40 0" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <p className="eyebrow fade-up">Error 404</p>
      <h1 id="nf-title" className="not-found__title fade-up">
        Lost at sea, <em>briefly.</em>
      </h1>
      <p className="lead fade-up">The page you are looking for has drifted off. It may have moved, or the link may be mistyped.</p>
      <div className="not-found__actions fade-up">
        <Button to="/">Back to home</Button>
        <Button to="/book" variant="outline">
          Book a stay
        </Button>
      </div>
      <nav className="not-found__links fade-up" aria-label="Popular pages">
        <ul>
          {nav.map((n) => (
            <li key={n.to}>
              <Link to={n.to}>{n.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
