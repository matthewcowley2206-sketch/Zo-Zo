import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { About } from './pages/About'
import { Pricing } from './pages/Pricing'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { HowWeWork } from './pages/HowWeWork'
import { Maintenance } from './pages/Maintenance'
import { ServiceDetail } from './pages/ServiceDetail'
import { Services } from './pages/Services'
import { Work } from './pages/Work'

const maintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'true'

export default function App() {
  if (maintenanceMode) {
    return <Maintenance />
  }

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="how-we-work" element={<HowWeWork />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="about" element={<About />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
          <Route path="work" element={<Work />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
