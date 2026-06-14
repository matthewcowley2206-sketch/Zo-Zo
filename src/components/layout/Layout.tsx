import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { RouteSeo } from '../seo/RouteSeo'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export function Layout() {
  return (
    <div className="min-h-screen">
      <RouteSeo />
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
