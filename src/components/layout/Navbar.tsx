import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks, site } from '../../content/site'
import { Button } from '../ui/Button'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'nav-blur bg-cream/80 border-b border-line' : 'bg-transparent'
        }`}
      >
        <div className="section-pad mx-auto flex h-[52px] max-w-[1200px] items-center justify-between sm:h-14">
          <Link
            to="/"
            className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink"
            aria-label={`${site.name} home`}
          >
            Zo&Zo
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/services'
                  ? location.pathname === '/services'
                  : location.pathname === link.href ||
                    location.pathname.startsWith(`${link.href}/`)

              return (
              <Link
                key={link.href}
                to={link.href}
                className={`text-[0.875rem] transition-colors duration-200 ${
                  isActive ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
              )
            })}
          </nav>

          <div className="hidden md:block">
            <Button to="/contact" variant="secondary" className="!px-5 !py-2 !text-[0.8125rem]">
              Book a clarity call
            </Button>
          </div>

          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-[1.5px] bg-ink transition-all duration-300 ${
                  menuOpen ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-[1.5px] bg-ink transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-[1.5px] bg-ink transition-all duration-300 ${
                  menuOpen ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 nav-blur bg-cream/95 transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-[1.75rem] font-semibold tracking-[-0.02em] text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Button to="/contact" className="mt-4">
            Book a clarity call
          </Button>
        </nav>
      </div>
    </>
  )
}
