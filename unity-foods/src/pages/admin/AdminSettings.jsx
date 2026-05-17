import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function AdminSettings() {
  const [session, setSession] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login', { replace: true })
  }

  const email = session?.user?.email ?? '—'
  const created = session?.user?.created_at
    ? new Date(session.user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—'

  return (
    <div>
      <div className="adm-page-header">
        <h1>Settings</h1>
        <p>Manage your admin account.</p>
      </div>

      <div className="adm-settings-section">
        <h2>Account</h2>
        <div className="adm-info-row">
          <span className="lbl">Email</span>
          <span className="val">{email}</span>
        </div>
        <div className="adm-info-row">
          <span className="lbl">Account created</span>
          <span className="val">{created}</span>
        </div>
        <div className="adm-info-row">
          <span className="lbl">Role</span>
          <span className="val">Administrator</span>
        </div>
      </div>

      <div className="adm-settings-section">
        <h2>Store Info</h2>
        <div className="adm-info-row">
          <span className="lbl">Store name</span>
          <span className="val">Unity Foods</span>
        </div>
        <div className="adm-info-row">
          <span className="lbl">Address</span>
          <span className="val">3759 Chicago Ave #2, Minneapolis, MN 55407</span>
        </div>
        <div className="adm-info-row">
          <span className="lbl">Phone</span>
          <span className="val">(612) 821-6444</span>
        </div>
        <div className="adm-info-row">
          <span className="lbl">Hours</span>
          <span className="val">8:00 AM – 10:00 PM, every day</span>
        </div>
      </div>

      <div className="adm-settings-section danger">
        <h2>Danger Zone</h2>
        <div className="adm-danger-row">
          <div>
            <h3>Sign out of admin panel</h3>
            <p>You will be returned to the login page.</p>
          </div>
          <button className="adm-btn adm-btn-secondary" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
