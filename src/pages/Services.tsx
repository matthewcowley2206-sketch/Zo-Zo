import { Link } from 'react-router-dom'
import { services } from '../content/services'
import { site } from '../content/site'
import { FadeIn } from '../components/ui/FadeIn'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'

export function Services() {
  return (
    <>
      <Section size="hero" className="hero-offset">
        <div className="content-max text-center">
          <FadeIn>
            <p className="eyebrow mb-6">Services</p>
            <h1 className="headline-hero">Where we help most.</h1>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-8">
            <p className="body-large mx-auto max-w-[640px]">
              Here is how we help you bring clarity, structure, and momentum to the
              parts of your business that feel messy or overwhelming.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section theme="cream" size="compact" className="pb-28">
        <div className="content-wide space-y-4">
          {services.map((service, i) => {
            const isPrototype = service.slug === 'prototype-development'

            return (
            <FadeIn key={service.slug} delay={i * 0.04}>
              <Link
                to={`/services/${service.slug}`}
                className={`group block rounded-3xl border p-8 transition-all duration-300 sm:p-10 ${
                  isPrototype
                    ? 'border-ink bg-ink text-cream shadow-lg shadow-ink/10 hover:border-cream/20 hover:bg-nav hover:shadow-xl hover:shadow-ink/25'
                    : 'border-line/60 bg-cream text-ink hover:border-ink/15 hover:bg-white hover:shadow-lg hover:shadow-ink/8'
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-[640px]">
                    <h2 className={`headline-small ${isPrototype ? 'text-cream' : 'group-hover:text-ink'}`}>
                      {service.title}
                    </h2>
                    <p className={`mt-3 text-[1.0625rem] ${isPrototype ? 'text-cream/75' : 'text-muted group-hover:text-ink/80'}`}>
                      {service.tagline}
                    </p>
                    <p className={`mt-4 text-[1.0625rem] leading-[1.58] ${isPrototype ? 'text-cream/60' : 'text-muted group-hover:text-ink/70'}`}>
                      {service.summary}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-[0.9375rem] font-medium transition-opacity ${
                      isPrototype
                        ? 'text-cream/70 group-hover:text-cream'
                        : 'text-ink/50 group-hover:text-ink'
                    }`}
                  >
                    Learn more →
                  </span>
                </div>
              </Link>
            </FadeIn>
            )
          })}
        </div>

        <FadeIn className="mt-16 text-center">
          <p className="body-regular mb-6">Not sure where to start?</p>
          <Button to="/contact">{site.ctaLabel}</Button>
        </FadeIn>
      </Section>
    </>
  )
}
