import { site } from '../content/site'
import { Logo } from '../components/layout/Logo'

export function Maintenance() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="bg-nav px-6 py-5 sm:px-10">
        <Logo />
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="max-w-[480px] text-center">
          <p className="eyebrow mb-4">Zo&Zo Advisory</p>
          <h1 className="headline-small text-ink">Temporarily unavailable</h1>
          <p className="body-large mt-5">
            We are taking a short pause while we update things behind the scenes. Please check
            back soon.
          </p>
          <p className="mt-8 text-[1.0625rem] text-muted">
            Need to reach us?{' '}
            <a
              href={`mailto:${site.email}`}
              className="focus-ring rounded-sm font-medium text-ink underline underline-offset-2"
            >
              {site.email}
            </a>
            {' · '}
            <a
              href={`tel:${site.phone.replace(/\s/g, '')}`}
              className="focus-ring rounded-sm font-medium text-ink underline underline-offset-2"
            >
              {site.phone}
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
