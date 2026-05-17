import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-grid">

          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span>Unity</span><span className="logo-red">Foods</span>
            </Link>
            <p className="footer-tagline">
              Your neighborhood store in the heart of Minneapolis — serving the Powderhorn community with fresh food, groceries, and essential services.
            </p>
          </div>

          <div className="footer-col">
            <h3>Visit Us</h3>
            <ul>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>3759 Chicago Ave #2<br />Minneapolis, MN 55407</span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.62 3.38 2 2 0 013.6 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <a href="tel:+16128216444">(612) 821-6444</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Hours</h3>
            <ul>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>Open Every Day<br /><strong>8:00 AM – 10:00 PM</strong></span>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Navigate</h3>
            <ul className="footer-nav">
              {[
                { to: '/', label: 'Home' },
                { to: '/menu', label: 'Menu' },
                { to: '/services', label: 'Services' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© {year} Unity Foods. All rights reserved.</p>
          <p className="footer-location">George Floyd Square · Powderhorn · Minneapolis, MN</p>
        </div>
      </div>
    </footer>
  )
}
