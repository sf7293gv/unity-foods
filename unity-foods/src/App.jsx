import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Menu from './pages/Menu'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Repairs from './pages/Repairs'
import Shop from './pages/Shop'

import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import ItemsManager from './pages/admin/ItemsManager'
import SpecialsManager from './pages/admin/SpecialsManager'
import AnnouncementsManager from './pages/admin/AnnouncementsManager'
import HoursManager from './pages/admin/HoursManager'
import ShopManager from './pages/admin/ShopManager'
import RepairsManager from './pages/admin/RepairsManager'
import RepairMediaManager from './pages/admin/RepairMediaManager'
import AdminSettings from './pages/admin/AdminSettings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public site */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/repairs" element={<Repairs />} />
          <Route path="/shop" element={<Shop />} />
        </Route>

        {/* Admin login (no auth required) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin panel (protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="items" element={<ItemsManager />} />
          <Route path="specials" element={<SpecialsManager />} />
          <Route path="announcements" element={<AnnouncementsManager />} />
          <Route path="hours" element={<HoursManager />} />
          <Route path="shop" element={<ShopManager />} />
          <Route path="repairs" element={<RepairsManager />} />
          <Route path="repair-media" element={<RepairMediaManager />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
