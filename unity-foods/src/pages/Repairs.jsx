import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useFadeIn } from '../hooks/useScrollAnimation'
import './Repairs.css'

export default function Repairs() {
  const [services, setServices] = useState([])
  const [media, setMedia] = useState([])
  const [lightbox, setLightbox] = useState(null)

  const heroRef = useFadeIn()
  const servicesHeaderRef = useFadeIn()
  const servicesEmptyRef = useFadeIn()
  const mediaHeaderRef = useFadeIn()
  const mediaGridRef = useFadeIn()
  const ctaRef = useFadeIn()

  useEffect(() => {
    async function fetchData() {
      const [{ data: svc, error: svcErr }, { data: med }] = await Promise.all([
        supabase.from('repair_services').select('*').eq('active', true).order('created_at'),
        supabase.from('repair_media').select('*').order('created_at', { ascending: false }),
      ])
      if (svcErr) console.error('repair_services fetch error:', svcErr)
      if (svc) setServices(svc)
      if (med) setMedia(med)
    }
    fetchData()
  }, [])

  const photos = media.filter(m => m.type === 'photo')

  useEffect(() => {
    if (lightbox === null) return
    function onKey(e) {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % photos.length)
      if (e.key === 'ArrowLeft') setLightbox(i => (i - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, photos.length])

  return (
    <div className="repairs-page">

      {/* ── Hero ── */}
      <div className="repairs-hero">
        <div className="container">
          <div className="fade-up" ref={heroRef}>
            <span className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Device Repairs</span>
            <h1 className="repairs-hero-title">We Fix Your Devices</h1>
            <p className="repairs-hero-subtitle">
              Fast, affordable repairs right in the Powderhorn neighborhood. Screens, batteries, water damage, and more.
            </p>
          </div>
        </div>
      </div>

      {/* ── Services ── */}
      <section className="section">
        <div className="container">
          <div className="section-header centered fade-up" ref={servicesHeaderRef}>
            <span className="section-eyebrow">What We Fix</span>
            <h2 className="section-title">Repair Services</h2>
            <p className="section-subtitle">
              Professional device repairs at fair prices. Call us to check availability or drop in.
            </p>
          </div>
          {services.length > 0 ? (
            <div className="repairs-grid stagger-grid fade-up is-visible">
              {services.map(svc => (
                <div key={svc.id} className="repair-card">
                  {svc.image_url && (
                    <div className="repair-card-img">
                      <img src={svc.image_url} alt={svc.name} loading="lazy" />
                    </div>
                  )}
                  <div className="repair-card-body">
                    <h3>{svc.name}</h3>
                    {svc.price && <span className="repair-price">{svc.price}</span>}
                    {svc.description && <p>{svc.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="repairs-empty fade-up" ref={servicesEmptyRef}>
              <p>Repair services coming soon. Call us for pricing and availability.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Media ── */}
      {media.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-header centered fade-up" ref={mediaHeaderRef}>
              <span className="section-eyebrow">Our Work</span>
              <h2 className="section-title">Before &amp; After</h2>
              <p className="section-subtitle">Real repairs done right here at Unity Foods.</p>
            </div>
            <div className="repair-media-grid stagger-grid fade-up" ref={mediaGridRef}>
              {media.map(item => {
                if (item.type === 'video') {
                  return (
                    <div key={item.id} className="repair-media-item repair-media-video">
                      <video controls preload="metadata" playsInline>
                        <source src={item.url} />
                      </video>
                      {item.description && <p className="repair-media-desc">{item.description}</p>}
                    </div>
                  )
                }
                const photoIdx = photos.findIndex(p => p.id === item.id)
                return (
                  <button
                    key={item.id}
                    className="repair-media-item repair-media-photo"
                    onClick={() => setLightbox(photoIdx)}
                    aria-label={`View photo${item.description ? ': ' + item.description : ''}`}
                  >
                    <img src={item.url} alt={item.description || 'Repair photo'} loading="lazy" />
                    <div className="repair-media-overlay" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                      </svg>
                    </div>
                    {item.description && <p className="repair-media-desc">{item.description}</p>}
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Book a Repair CTA ── */}
      <section className="section repairs-cta-section">
        <div className="container">
          <div className="repairs-cta fade-up" ref={ctaRef}>
            <div className="repairs-cta-icon" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.62 3.38 2 2 0 013.6 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </div>
            <div className="repairs-cta-text">
              <span className="section-eyebrow">Book a Repair</span>
              <h2 className="section-title">Ready to Get Your Device Fixed?</h2>
              <p>
                Drop in during store hours or call us to check availability and get a quote.
                We're at 3759 Chicago Ave, open every day.
              </p>
            </div>
            <div className="repairs-cta-action">
              <a href="tel:+16128216444" className="btn-primary repairs-call-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.62 3.38 2 2 0 013.6 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                (612) 821-6444
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox !== null && photos[lightbox] && (
        <div
          className="repairs-lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            className="repairs-lb-close"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {photos.length > 1 && (
            <>
              <button
                className="repairs-lb-nav repairs-lb-prev"
                onClick={e => { e.stopPropagation(); setLightbox(i => (i - 1 + photos.length) % photos.length) }}
                aria-label="Previous photo"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <button
                className="repairs-lb-nav repairs-lb-next"
                onClick={e => { e.stopPropagation(); setLightbox(i => (i + 1) % photos.length) }}
                aria-label="Next photo"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </>
          )}

          <div className="repairs-lb-img-wrap" onClick={e => e.stopPropagation()}>
            <img src={photos[lightbox].url} alt={photos[lightbox].description || 'Repair photo'} />
            {photos[lightbox].description && (
              <p className="repairs-lb-caption">{photos[lightbox].description}</p>
            )}
          </div>

          <div className="repairs-lb-counter" aria-live="polite">
            {lightbox + 1} / {photos.length}
          </div>
        </div>
      )}

    </div>
  )
}
