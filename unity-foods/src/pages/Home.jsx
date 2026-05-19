import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useFadeIn } from '../hooks/useScrollAnimation'
import './Home.css'

const DAYS_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function fmtTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`
}

export default function Home() {
  const [announcements, setAnnouncements] = useState([])
  const [specials, setSpecials] = useState([])
  const [hours, setHours] = useState([])

  const heroRef = useFadeIn()
  const announcementsRef = useFadeIn()
  const specialsHeaderRef = useFadeIn()
  const specialsGridRef = useFadeIn()
  const infoRef = useFadeIn()
  const hoursRef = useFadeIn()
  const aboutRef = useFadeIn()

  useEffect(() => {
    async function fetchData() {
      const [{ data: ann }, { data: spec }, { data: hrs }] = await Promise.all([
        supabase.from('announcements').select('*').eq('active', true).order('created_at', { ascending: false }),
        supabase.from('specials').select('*').eq('active', true),
        supabase.from('hours').select('*').order('id'),
      ])
      if (ann) setAnnouncements(ann)
      if (spec) setSpecials(spec)
      if (hrs) setHours(hrs)
    }
    fetchData()
  }, [])

  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const orderedHours = DAYS_ORDER.map(d => hours.find(h => h.day === d)).filter(Boolean)
  const displayHours = orderedHours.length === 7
    ? orderedHours
    : DAYS_ORDER.map(d => ({ day: d, open_time: '08:00', close_time: '22:00', is_closed: false }))
  const allSame = orderedHours.length === 7
    && orderedHours.every(h => !h.is_closed)
    && orderedHours.every(h => h.open_time === orderedHours[0].open_time && h.close_time === orderedHours[0].close_time)
  const todayRow = orderedHours.find(h => h.day === todayName)

  return (
    <div className="home">

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-content container" ref={heroRef}>
          <p className="hero-eyebrow fade-up is-visible">George Floyd Square · Minneapolis, MN</p>
          <h1 className="hero-title fade-up is-visible" style={{ transitionDelay: '0.1s' }}>
            Unity Foods
          </h1>
          <p className="hero-subtitle fade-up is-visible" style={{ transitionDelay: '0.2s' }}>
            Your neighborhood store in the heart of Minneapolis
          </p>
          <div className="hero-cta fade-up is-visible" style={{ transitionDelay: '0.3s' }}>
            <Link to="/menu" className="btn-primary">Explore Our Menu</Link>
            <Link to="/contact" className="btn-outline-white">Get Directions</Link>
          </div>
          <div className="hero-badge fade-up is-visible" style={{ transitionDelay: '0.4s' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
            </svg>
            {todayRow?.is_closed
              ? 'Closed Today'
              : todayRow
                ? `Open Today · ${fmtTime(todayRow.open_time)} – ${fmtTime(todayRow.close_time)}`
                : 'Open Today · 8:00 AM – 10:00 PM'
            }
          </div>
        </div>
      </section>

      {/* ── Announcements ── */}
      {announcements.length > 0 && (
        <section className="announcements-section">
          <div className="container">
            <div
              className="announcements-list stagger-grid fade-up"
              ref={announcementsRef}
            >
              {announcements.map(item => (
                <div key={item.id} className="announcement-card">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <p>{item.message}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Weekly Specials ── */}
      {specials.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-header centered fade-up" ref={specialsHeaderRef}>
              <span className="section-eyebrow">This Week</span>
              <h2 className="section-title">Weekly Specials</h2>
              <p className="section-subtitle">
                Fresh deals on your favorite items — available while supplies last.
              </p>
            </div>
            <div className="specials-grid stagger-grid fade-up" ref={specialsGridRef}>
              {specials.map(special => (
                <div key={special.id} className="special-card">
                  <div className="special-image">
                    {special.image_url
                      ? <img src={special.image_url} alt={special.title} loading="lazy" />
                      : <div className="img-placeholder"><PlaceholderIcon /></div>
                    }
                    <span className="sale-badge">Sale</span>
                  </div>
                  <div className="special-body">
                    <h3>{special.title}</h3>
                    {special.description && <p>{special.description}</p>}
                    <div className="special-pricing">
                      <span className="price-sale">${Number(special.sale_price).toFixed(2)}</span>
                      {special.original_price && (
                        <span className="price-original">${Number(special.original_price).toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Quick Info ── */}
      <section className="section quick-info-section">
        <div className="container">
          <div className="quick-info-grid stagger-grid fade-up" ref={infoRef}>

            <div className="info-card">
              <div className="info-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>Store Hours</h3>
              <p className="info-primary">
                {allSame
                  ? `${fmtTime(orderedHours[0].open_time)} – ${fmtTime(orderedHours[0].close_time)}`
                  : orderedHours.length > 0 ? 'Hours vary by day' : '8:00 AM – 10:00 PM'
                }
              </p>
              <p className="info-secondary">
                {allSame || orderedHours.length === 0 ? 'Open every day of the week' : 'See full schedule below'}
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3>Location</h3>
              <p className="info-primary">3759 Chicago Ave #2</p>
              <p className="info-secondary">Minneapolis, MN 55407</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.62 3.38 2 2 0 013.6 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <h3>Phone</h3>
              <p className="info-primary">
                <a href="tel:+16128216444">(612) 821-6444</a>
              </p>
              <p className="info-secondary">Call us anytime during hours</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Store Hours ── */}
      <section className="section section-alt store-hours-section">
        <div className="container">
          <div className="section-header centered fade-up" ref={hoursRef}>
            <span className="section-eyebrow">We're Open</span>
            <h2 className="section-title">Store Hours</h2>
            <p className="section-subtitle">
              Come visit us any day of the week at 3759 Chicago Ave.
            </p>
          </div>
          <div className="hours-week-grid">
            {displayHours.map(h => (
              <div
                key={h.day}
                className={`hours-week-day${h.day === todayName ? ' is-today' : ''}${h.is_closed ? ' is-closed' : ''}`}
              >
                {h.day === todayName && <span className="hours-today-badge">Today</span>}
                <span className="hours-week-dayname">
                  {h.day.slice(0, 3)}
                  {h.day === todayName && <span className="hours-today-inline"> · Today</span>}
                </span>
                <div className="hours-week-times">
                  {h.is_closed ? (
                    <span className="hours-week-closed">Closed</span>
                  ) : (
                    <span className="hours-week-time-range">
                      {fmtTime(h.open_time)} – {fmtTime(h.close_time)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Snippet ── */}
      <section className="section section-alt about-snippet">
        <div className="container">
          <div className="about-snippet-inner fade-up" ref={aboutRef}>
            <div className="about-snippet-text">
              <span className="section-eyebrow">Our Story</span>
              <h2 className="section-title">More Than a Corner Store</h2>
              <p>
                Unity Foods is a cornerstone of the Powderhorn neighborhood, located on Chicago Avenue at the heart of South Minneapolis. We offer a thoughtfully stocked selection of fresh deli items, everyday groceries, beverages, snacks, and a range of community services.
              </p>
              <p>
                We believe everyone deserves access to quality food and helpful services at fair prices — and we've built this store around that belief.
              </p>
              <Link to="/about" className="btn-outline" style={{ marginTop: '28px' }}>
                Learn Our Story
              </Link>
            </div>
            <div className="about-snippet-visual" aria-hidden="true">
              <div className="visual-block">
                <div className="visual-stat">
                  <span className="stat-number">7</span>
                  <span className="stat-label">Days a Week</span>
                </div>
              </div>
              <div className="visual-block accent">
                <div className="visual-stat">
                  <span className="stat-number">
                    {todayRow && !todayRow.is_closed && todayRow.open_time && todayRow.close_time
                      ? `${parseInt(todayRow.close_time) - parseInt(todayRow.open_time)}+`
                      : '14+'}
                  </span>
                  <span className="stat-label">Hours Daily</span>
                </div>
              </div>
              <div className="visual-block dark">
                <div className="visual-stat">
                  <span className="stat-number">4</span>
                  <span className="stat-label">Services Offered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

function PlaceholderIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  )
}
