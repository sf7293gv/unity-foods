import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useFadeIn } from '../hooks/useScrollAnimation'
import './Gallery.css'

export default function Gallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null)

  const headerRef = useFadeIn()
  const gridRef = useFadeIn()

  useEffect(() => {
    async function fetchImages() {
      setLoading(true)
      try {
        const { data: rootItems } = await supabase.storage
          .from('images')
          .list('', { limit: 200 })

        const all = []

        if (rootItems) {
          const rootFiles = rootItems.filter(f => f.id !== null)
          for (const file of rootFiles) {
            const { data } = supabase.storage.from('images').getPublicUrl(file.name)
            all.push({ url: data.publicUrl, name: file.name })
          }

          const folders = rootItems.filter(f => f.id === null)
          await Promise.all(
            folders.map(async folder => {
              const { data: folderItems } = await supabase.storage
                .from('images')
                .list(folder.name, { limit: 200 })
              if (folderItems) {
                for (const file of folderItems.filter(f => f.id !== null)) {
                  const path = `${folder.name}/${file.name}`
                  const { data } = supabase.storage.from('images').getPublicUrl(path)
                  all.push({ url: data.publicUrl, name: file.name })
                }
              }
            })
          )
        }

        setImages(all)
      } catch (err) {
        console.error('Gallery fetch error:', err)
      }
      setLoading(false)
    }
    fetchImages()
  }, [])

  useEffect(() => {
    if (lightbox === null) return
    function handleKey(e) {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(i => Math.min(i + 1, images.length - 1))
      if (e.key === 'ArrowLeft') setLightbox(i => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox, images.length])

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <div className="gallery-page">

      {/* ── Header ── */}
      <div className="gallery-header">
        <div className="container">
          <div className="fade-up" ref={headerRef}>
            <span className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Our Store</span>
            <h1 className="gallery-title">Photo Gallery</h1>
            <p className="gallery-subtitle">
              A look inside Unity Foods — our shelves, deli, and community space on Chicago Avenue.
            </p>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div className="gallery-loading">
              <div className="gallery-spinner" aria-label="Loading gallery" />
              <p>Loading gallery…</p>
            </div>
          ) : images.length === 0 ? (
            <div className="gallery-empty">
              <div className="gallery-empty-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <p className="gallery-empty-title">No photos yet</p>
              <p className="gallery-empty-sub">Photos will appear here once added through the store.</p>
            </div>
          ) : (
            <div className="gallery-grid stagger-grid fade-up" ref={gridRef}>
              {images.map((img, i) => (
                <button
                  key={img.url}
                  className="gallery-item"
                  onClick={() => setLightbox(i)}
                  aria-label={`View photo ${i + 1}`}
                >
                  <img src={img.url} alt={`Unity Foods photo ${i + 1}`} loading="lazy" />
                  <div className="gallery-item-overlay" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      <line x1="11" y1="8" x2="11" y2="14"/>
                      <line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            className="lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close photo viewer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <button
            className="lightbox-nav lightbox-prev"
            onClick={e => { e.stopPropagation(); setLightbox(i => Math.max(i - 1, 0)) }}
            disabled={lightbox === 0}
            aria-label="Previous photo"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
            <img
              src={images[lightbox].url}
              alt={`Unity Foods photo ${lightbox + 1}`}
            />
          </div>

          <button
            className="lightbox-nav lightbox-next"
            onClick={e => { e.stopPropagation(); setLightbox(i => Math.min(i + 1, images.length - 1)) }}
            disabled={lightbox === images.length - 1}
            aria-label="Next photo"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          <div className="lightbox-counter" onClick={e => e.stopPropagation()}>
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}

    </div>
  )
}
