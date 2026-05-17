import { useFadeIn } from '../hooks/useScrollAnimation'
import './Contact.css'

export default function Contact() {
  const headerRef = useFadeIn()
  const infoRef = useFadeIn()
  const mapRef = useFadeIn()

  return (
    <div className="contact-page">

      {/* ── Header ── */}
      <div className="contact-header">
        <div className="container">
          <div className="fade-up" ref={headerRef}>
            <span className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Come Visit</span>
            <h1 className="contact-title">Find Us</h1>
            <p className="contact-subtitle">
              We're open every day. Stop by, give us a call, or use the map to find us on Chicago Avenue.
            </p>
          </div>
        </div>
      </div>

      {/* ── Info + Map ── */}
      <section className="section">
        <div className="container">
          <div className="contact-layout">

            {/* Info panel */}
            <div className="contact-info fade-up" ref={infoRef}>

              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <h3>Address</h3>
                  <p>3759 Chicago Ave #2</p>
                  <p>Minneapolis, MN 55407</p>
                  <p className="contact-neighborhood">George Floyd Square · Powderhorn</p>
                  <a
                    href="https://maps.google.com/?q=3759+Chicago+Ave,+Minneapolis,+MN+55407"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <h3>Hours</h3>
                  <div className="hours-table">
                    <span>Every Day</span>
                    <span className="hours-time">8:00 AM – 10:00 PM</span>
                  </div>
                  <p className="hours-note">Open 365 days a year</p>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.62 3.38 2 2 0 013.6 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h3>Phone</h3>
                  <a href="tel:+16128216444" className="contact-phone">(612) 821-6444</a>
                  <p>Call us anytime during store hours</p>
                </div>
              </div>

            </div>

            {/* Map */}
            <div className="contact-map fade-up" ref={mapRef}>
              <div className="map-wrapper">
                <iframe
                  title="Unity Foods Location Map"
                  src="https://maps.google.com/maps?q=3759+Chicago+Ave,+Minneapolis,+MN+55407&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="map-footer">
                <span>3759 Chicago Ave #2 · Minneapolis, MN 55407</span>
                <a
                  href="https://maps.google.com/?q=3759+Chicago+Ave,+Minneapolis,+MN+55407"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ padding: '9px 20px', fontSize: '0.875rem' }}
                >
                  Get Directions
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
