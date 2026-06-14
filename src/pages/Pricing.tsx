import { Link } from 'react-router-dom'
import { formatFromPrice, pricingFaqs, pricingRows } from '../content/pricing'
import { site } from '../content/site'
import { FaqSection } from '../components/seo/FaqSection'
import { isPrototypeService } from '../components/services/ServiceCardLink'
import { Button } from '../components/ui/Button'
import { FadeIn } from '../components/ui/FadeIn'
import { Section } from '../components/ui/Section'

export function Pricing() {
  return (
    <>
      <Section size="hero" className="hero-offset">
        <div className="content-max">
          <FadeIn>
            <p className="eyebrow mb-6">Pricing</p>
            <h1 className="headline-hero max-w-[900px]">Simple starting points.</h1>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-8 max-w-[640px]">
            <p className="body-large">
              Every engagement is scoped to your outcome. These are typical starting points - not
              menu prices. We quote a fixed amount before work begins.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section theme="cream" size="compact">
        <div className="content-wide">
          <FadeIn>
            <div className="overflow-hidden rounded-3xl border border-line bg-white">
              <div className="hidden border-b border-line bg-cream-dark/40 px-6 py-4 sm:grid sm:grid-cols-[minmax(0,1.1fr)_120px_minmax(0,1fr)] sm:gap-8 sm:px-8">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-muted-light">
                  Service
                </p>
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-muted-light">
                  From
                </p>
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-muted-light">
                  Typical outcome
                </p>
              </div>

              <ul className="divide-y divide-line">
                {pricingRows.map((row, index) => {
                  const isPrototype = isPrototypeService(row.serviceSlug)

                  return (
                    <li key={row.serviceSlug}>
                      <FadeIn delay={index * 0.03}>
                        <div
                          className={`grid gap-3 px-6 py-6 sm:grid-cols-[minmax(0,1.1fr)_120px_minmax(0,1fr)] sm:items-center sm:gap-8 sm:px-8 ${
                            isPrototype ? 'bg-ink text-cream' : ''
                          }`}
                        >
                          <div>
                            <Link
                              to={`/services/${row.serviceSlug}`}
                              className={`text-[1.0625rem] font-semibold transition-opacity hover:opacity-80 ${
                                isPrototype ? 'text-cream' : 'text-ink'
                              }`}
                            >
                              {row.serviceTitle}
                            </Link>
                          </div>
                          <p
                            className={`text-[1.0625rem] font-semibold tabular-nums ${
                              isPrototype ? 'text-cream' : 'text-ink'
                            }`}
                          >
                            {formatFromPrice(row.fromAmount)}
                          </p>
                          <p
                            className={`text-[0.9375rem] leading-relaxed ${
                              isPrototype ? 'text-cream/75' : 'text-muted'
                            }`}
                          >
                            {row.outcome}
                          </p>
                        </div>
                      </FadeIn>
                    </li>
                  )
                })}
              </ul>
            </div>

            <p className="mx-auto mt-8 max-w-[640px] text-center text-[0.9375rem] leading-relaxed text-muted">
              Full programs - board strategy packs, multi-flow prototypes, embedded listening
              loops, or multiple automations - are scoped individually. You always get a fixed quote
              before we start.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section theme="dark" size="compact">
        <FaqSection theme="dark" title="Questions about pricing." items={pricingFaqs} />
        <FadeIn className="mt-14 text-center">
          <Button to="/contact">{site.ctaLabel}</Button>
        </FadeIn>
      </Section>
    </>
  )
}
