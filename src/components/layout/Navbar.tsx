import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks, site } from '../../content/site'
import { Button } from '../ui/Button'
import { Logo } from './Logo'
import { isNavLinkActive } from './navUtils'

const navCtaClassName =
  '!border-0 !px-5 !py-2 !text-[0.8125rem] !text-cream !ring-1 !ring-cream/35 hover:!ring-cream/60 focus-visible:!ring-cream/60'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
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

  useEffect(() => {
    if (!menuOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <>
      <a
        href="#main"
        className="focus-ring-nav sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-nav focus:px-4 focus:py-2 focus:text-[0.875rem] focus:font-medium focus:text-cream"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 bg-nav text-cream transition-shadow duration-300 ${
          scrolled ? 'border-b border-white/10 shadow-md shadow-black/20' : ''
        }`}
      >
        <div className="section-pad mx-auto flex h-16 max-w-[1200px] items-center justify-between sm:h-[4.25rem]">
          <Link
            to="/"
            className="focus-ring-nav rounded-sm text-cream"
            aria-label={`${site.name} home`}
          >
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {navLinks.map((link) => {
              const isActive = isNavLinkActive(location.pathname, link.href)

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`focus-ring-nav rounded-sm text-[0.875rem] transition-colors duration-200 ${
                    isActive
                      ? 'font-medium text-cream underline decoration-cream/40 underline-offset-[0.45rem]'
                      : 'text-cream/70 hover:text-cream'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:block">
            <Button to="/contact" variant="secondary" className={navCtaClassName}>
              {site.ctaLabel}
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="focus-ring-nav relative z-50 flex h-10 w-10 items-center justify-center rounded-sm md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="flex w-5 flex-col gap-1.5" aria-hidden>
              <span
                className={`h-[1.5px] bg-cream transition-all duration-300 ${
                  menuOpen ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-[1.5px] bg-cream transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-[1.5px] bg-cream transition-all duration-300 ${
                  menuOpen ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        inert={menuOpen ? undefined : true}
        hidden={!menuOpen}
        className={`fixed inset-0 z-40 bg-nav transition-opacity duration-300 md:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8" aria-label="Mobile">
          {navLinks.map((link) => {
            const isActive = isNavLinkActive(location.pathname, link.href)

            return (
              <Link
                key={link.href}
                to={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`focus-ring-nav rounded-sm text-[1.75rem] font-semibold tracking-[-0.02em] ${
                  isActive ? 'text-cream underline decoration-cream/40 underline-offset-8' : 'text-cream/80'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Button to="/contact" variant="secondary" className={`mt-4 ${navCtaClassName}`}>
            {site.ctaLabel}
          </Button>
        </nav>
      </div>
    </>
  )
}
