import { Link } from 'react-router-dom'
import { navLinks, site } from '../../content/site'

export function Footer() {
  return (
    <footer className="border-t border-line bg-cream section-pad pb-10 pt-16 sm:pt-20">
      <div className="content-wide">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-[1.125rem] font-semibold tracking-[-0.02em] text-ink">
              {site.name}
            </p>
            <p className="mt-2 text-[0.9375rem] text-muted">{site.tagline}</p>
          </div>

          <div>
            <p className="mb-3 text-[0.75rem] font-medium uppercase tracking-[0.06em] text-muted-light">
              Explore
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[0.9375rem] text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[0.75rem] font-medium uppercase tracking-[0.06em] text-muted-light">
              Contact
            </p>
            <ul className="space-y-2.5 text-[0.9375rem] text-muted">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-ink">
                  {site.phone}
                </a>
              </li>
              <li>{site.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-muted-light">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-[0.8125rem] text-muted-light">
            Sydney-based · Australia-wide · Online worldwide
          </p>
        </div>
      </div>
    </footer>
  )
}
