import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useFadeIn } from '../hooks/useScrollAnimation'
import './Shop.css'

const CATEGORIES = [
  { value: 'all',         label: 'All' },
  { value: 'phones',      label: 'Phones' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'accessories', label: 'Accessories' },
]

export default function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')

  const headerRef = useFadeIn()

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })
      if (data) setProducts(data)
      if (error) console.error('products fetch error:', error)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter(p => p.category === activeCategory)

  return (
    <div className="shop-page">

      {/* ── Hero ── */}
      <div className="shop-hero">
        <div className="container">
          <div className="fade-up" ref={headerRef}>
            <span className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>For Sale</span>
            <h1 className="shop-hero-title">Shop</h1>
            <p className="shop-hero-subtitle">
              New and used phones, electronics, and accessories — quality products at fair prices.
            </p>
          </div>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="shop-filters-bar">
        <div className="container">
          <div className="shop-filters">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                className={`shop-filter-btn${activeCategory === cat.value ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="shop-grid-section">
        <div className="container">
          {loading ? (
            <div className="shop-loading">
              <div className="shop-spinner" aria-label="Loading products" />
              <p>Loading products…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="shop-empty">
              <p className="shop-empty-icon" aria-hidden="true">📱</p>
              <p className="shop-empty-title">
                {activeCategory === 'all' ? 'No products yet' : `No ${CATEGORIES.find(c => c.value === activeCategory)?.label} available`}
              </p>
              <p className="shop-empty-sub">Check back soon or ask us in store.</p>
            </div>
          ) : (
            <div className="shop-grid stagger-grid fade-up is-visible">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  )
}

function ProductCard({ product }) {
  return (
    <div className={`product-card${!product.in_stock ? ' out-of-stock' : ''}`}>
      <div className="product-image">
        {product.image_url
          ? <img src={product.image_url} alt={product.name} loading="lazy" />
          : (
            <div className="product-img-placeholder">
              <DeviceIcon />
            </div>
          )
        }
        <div className="product-badges">
          <span className={`product-condition-badge ${product.condition}`}>
            {product.condition === 'new' ? 'New' : 'Used'}
          </span>
          {!product.in_stock && (
            <span className="product-oos-badge">Sold Out</span>
          )}
        </div>
        {product.category && (
          <span className="product-category-tag">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
        )}
      </div>
      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        {product.description && (
          <p className="product-description">{product.description}</p>
        )}
        {product.price != null && (
          <p className="product-price">${Number(product.price).toFixed(2)}</p>
        )}
      </div>
    </div>
  )
}

function DeviceIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  )
}
