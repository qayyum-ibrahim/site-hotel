import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { nav, site } from '../data/site.js'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container container--wide">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Marina Crest Hotel, home">
              <Logo />
            </Link>
            <p>{site.tagline}. Bright rooms, slow mornings and the lagoon at the door.</p>
          </div>

          <nav className="footer__col" aria-label="Footer">
            <h2 className="footer__title">Explore</h2>
            <ul>
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/book">Book a stay</Link>
              </li>
            </ul>
          </nav>

          <div className="footer__col">
            <h2 className="footer__title">Visit</h2>
            <address>
              {site.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </div>

          <div className="footer__col">
            <h2 className="footer__title">Contact</h2>
            <ul>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__base">
          <p>
            © {year} {site.fullName}
          </p>
          <p className="footer__demo">{site.demoNote}</p>
        </div>
      </div>
    </footer>
  )
}
