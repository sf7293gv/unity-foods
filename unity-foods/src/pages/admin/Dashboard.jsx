import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const [stats, setStats] = useState({ items: 0, specials: 0, announcements: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const [
        { count: items },
        { count: specials },
        { count: announcements },
      ] = await Promise.all([
        supabase.from('items').select('*', { count: 'exact', head: true }),
        supabase.from('specials').select('*', { count: 'exact', head: true }).eq('active', true),
        supabase.from('announcements').select('*', { count: 'exact', head: true }).eq('active', true),
      ])
      setStats({
        items: items ?? 0,
        specials: specials ?? 0,
        announcements: announcements ?? 0,
      })
      setLoading(false)
    }
    fetchStats()
  }, [])

  return (
    <div>
      <div className="adm-page-header">
        <h1>Dashboard</h1>
        <p>Welcome back — here's what's happening at Unity Foods.</p>
      </div>

      <div className="adm-stats">
        <div className="adm-stat">
          <div className="adm-stat-icon red">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
              <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </div>
          <div>
            <div className="adm-stat-val">{loading ? '—' : stats.items}</div>
            <div className="adm-stat-lbl">Total Menu Items</div>
          </div>
        </div>

        <div className="adm-stat">
          <div className="adm-stat-icon green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
          </div>
          <div>
            <div className="adm-stat-val">{loading ? '—' : stats.specials}</div>
            <div className="adm-stat-lbl">Active Specials</div>
          </div>
        </div>

        <div className="adm-stat">
          <div className="adm-stat-icon amber">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
          </div>
          <div>
            <div className="adm-stat-val">{loading ? '—' : stats.announcements}</div>
            <div className="adm-stat-lbl">Live Announcements</div>
          </div>
        </div>
      </div>

      <div className="adm-panel">
        <h2>Quick Actions</h2>
        <div className="adm-shortcut-grid">
          <Link to="/admin/items" className="adm-shortcut">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Menu Item
          </Link>
          <Link to="/admin/specials" className="adm-shortcut">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Special
          </Link>
          <Link to="/admin/announcements" className="adm-shortcut">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Announcement
          </Link>
        </div>
      </div>
    </div>
  )
}
