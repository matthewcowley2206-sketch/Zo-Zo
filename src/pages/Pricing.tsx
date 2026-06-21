import { Link } from 'react-router-dom'
import { formatFromPrice, pricingFaqs, pricingThemeGroups } from '../content/pricingThemes'
import { site } from '../content/site'
import { TbyiCapabilityHeader } from '../components/services/TbyiCapabilityHeader'
import {
  isTestBeforeYouInvest,
  tbyiCapabilityBodyClasses,
  tbyiCapabilityLinkClasses,
  tbyiCapabilityTitleClasses,
} from '../lib/testBeforeYouInvest'
import { FaqSection } from '../components/seo/FaqSection'
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
              Every engagement is scoped to your outcome. Typical investment levels below are
              starting points by problem area - not menu prices. We quote a fixed amount before work
              begins.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section theme="cream" size="compact">
        <div className="content-wide space-y-8">
          {pricingThemeGroups.map((group, groupIndex) => (
            <FadeIn key={group.themeId} delay={groupIndex * 0.05}>
              <div className="overflow-hidden rounded-3xl border border-line bg-white">
                <div className="border-b border-line bg-cream-dark/40 px-6 py-5 sm:px-8">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-light">
                    {group.uncertaintyLabel}
                  </p>
                  <h2 className="mt-2 text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">
                    {group.themeTitle}
                  </h2>
                </div>

                <ul className="divide-y divide-line">
                  {group.modules.map((module) => {
                    const isTbyi = isTestBeforeYouInvest({ slug: module.slug, label: module.title })

                    return (
                      <li key={module.slug}>
                        <div
                          className={`grid gap-3 px-6 py-6 sm:grid-cols-[minmax(0,1.1fr)_120px_minmax(0,1fr)] sm:items-center sm:gap-8 sm:px-8 ${
                            isTbyi ? tbyiCapabilityLinkClasses : ''
                          }`}
                        >
                          <div>
                            {isTbyi ? (
                              <Link
                                to={module.href}
                                className="block transition-opacity hover:opacity-90"
                              >
                                <TbyiCapabilityHeader
                                  title={module.title}
                                  titleClassName={tbyiCapabilityTitleClasses}
                                  badgeClassName="mt-2"
                                />
                              </Link>
                            ) : (
                              <Link
                                to={module.href}
                                className="text-[1.0625rem] font-semibold text-ink transition-opacity hover:opacity-80"
                              >
                                {module.title}
                              </Link>
                            )}
                          </div>
                          <p
                            className={`text-[1.0625rem] font-semibold tabular-nums ${
                              isTbyi ? 'text-cream' : 'text-ink'
                            }`}
                          >
                            {formatFromPrice(module.fromAmount)}
                          </p>
                          <p
                            className={`text-[0.9375rem] leading-relaxed ${
                              isTbyi ? tbyiCapabilityBodyClasses : 'text-muted'
                            }`}
                          >
                            {module.outcome}
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </FadeIn>
          ))}

          <FadeIn>
            <p className="mx-auto max-w-[640px] text-center text-[0.9375rem] leading-relaxed text-muted">
              Full programs - board strategy packs, multi-flow prototypes, embedded listening loops,
              or multiple automations - are scoped individually. You always get a fixed quote before
              we start.
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
