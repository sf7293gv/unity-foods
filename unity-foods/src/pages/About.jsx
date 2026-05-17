import { Link } from 'react-router-dom'
import { useFadeIn } from '../hooks/useScrollAnimation'
import './About.css'

const VALUES = [
  {
    icon: '🤝',
    title: 'Community First',
    description: 'We exist to serve our neighbors. Every decision we make starts with what\'s best for the people of Powderhorn.',
  },
  {
    icon: '💰',
    title: 'Fair Prices',
    description: 'Quality food and services shouldn\'t be a luxury. We keep our prices honest and accessible for everyone.',
  },
  {
    icon: '😊',
    title: 'Warm Service',
    description: 'When you walk through our door, you\'re not a customer — you\'re a neighbor. We treat everyone with dignity and care.',
  },
  {
    icon: '✅',
    title: 'Quality Products',
    description: 'We stock what our community actually needs and wants — fresh, reliable, and always worth it.',
  },
]

export default function About() {
  const heroRef = useFadeIn()
  const storyRef = useFadeIn()
  const communityRef = useFadeIn()
  const valuesHeaderRef = useFadeIn()
  const valuesGridRef = useFadeIn()
  const visitRef = useFadeIn()

  return (
    <div className="about-page">

      {/* ── Hero ── */}
      <div className="about-hero">
        <div className="container">
          <div className="fade-up" ref={heroRef}>
            <span className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Who We Are</span>
            <h1 className="about-hero-title">Our Story</h1>
            <p className="about-hero-subtitle">
              A neighborhood store rooted in community, built on trust, and open every day for the people of South Minneapolis.
            </p>
          </div>
        </div>
      </div>

      {/* ── Story ── */}
      <section className="section">
        <div className="container">
          <div className="story-layout fade-up" ref={storyRef}>
            <div className="story-text">
              <span className="section-eyebrow">Since the Beginning</span>
              <h2 className="section-title">Built for This Neighborhood</h2>
              <p>
                Unity Foods was founded with a clear purpose: to be the kind of store this neighborhood deserves. Located on Chicago Avenue in Minneapolis's Powderhorn community, we offer a thoughtfully curated mix of fresh deli items, everyday groceries, beverages, snacks, and essential services.
              </p>
              <p>
                We believe in treating every person who walks through our door with respect and warmth. Whether you're grabbing a quick bite, stocking up on essentials, getting your phone fixed, or duplicating a key — we're here to make it easy.
              </p>
              <p>
                The store is more than a business. It's a gathering point, a resource, and a constant in a neighborhood that has seen a great deal of change. We're honored to be part of this community's daily life.
              </p>
            </div>
            <div className="story-aside">
              <div className="story-card">
                <div className="story-stat">
                  <span className="story-number">8AM</span>
                  <span className="story-label">Open every morning</span>
                </div>
              </div>
              <div className="story-card accent">
                <div className="story-stat">
                  <span className="story-number">10PM</span>
                  <span className="story-label">Close every night</span>
                </div>
              </div>
              <div className="story-card dark">
                <div className="story-stat">
                  <span className="story-number">365</span>
                  <span className="story-label">Days a year, always open</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community ── */}
      <section className="section section-alt community-section">
        <div className="container">
          <div className="community-inner fade-up" ref={communityRef}>
            <div className="community-marker" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className="community-text">
              <span className="section-eyebrow">Where We Stand</span>
              <h2 className="section-title">George Floyd Square</h2>
              <p>
                Unity Foods is located on Chicago Avenue, steps from the intersection of 38th Street and Chicago Avenue — a place known around the world as George Floyd Square. On May 25, 2020, George Floyd was killed here by a Minneapolis police officer, and the community's response sparked a global reckoning with racial injustice.
              </p>
              <p>
                The square has become a site of mourning, art, activism, and profound community resilience. Murals cover the walls. Neighbors care for the memorial. Visitors come from around the world to pay their respects.
              </p>
              <p>
                As a business rooted at this intersection, we carry this history with us. We are committed to being a space where every person — regardless of background — is welcomed with dignity. We stand with the ongoing pursuit of justice and healing in this community and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section">
        <div className="container">
          <div className="section-header centered fade-up" ref={valuesHeaderRef}>
            <span className="section-eyebrow">What We Believe</span>
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              These aren't just words on a wall — they guide every interaction we have with our community.
            </p>
          </div>
          <div className="values-grid stagger-grid fade-up" ref={valuesGridRef}>
            {VALUES.map(value => (
              <div key={value.title} className="value-card">
                <span className="value-icon" aria-hidden="true">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visit ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="about-visit fade-up" ref={visitRef}>
            <div>
              <span className="section-eyebrow">Come See Us</span>
              <h2 className="section-title">Visit Unity Foods</h2>
              <p className="section-subtitle">We're open every single day. Come in, say hi, and let us take care of you.</p>
            </div>
            <div className="about-visit-actions">
              <Link to="/contact" className="btn-primary">Get Directions</Link>
              <Link to="/menu" className="btn-outline">Browse Our Menu</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
