import { Link } from 'react-router-dom'
import type { ServiceTheme } from '../../content/method'
import { formatTypicalInvestment, pricingBySlug } from '../../content/pricing'
import {
  isTestBeforeYouInvest,
  standardCapabilityCardClasses,
  tbyiCapabilityBodyClasses,
  tbyiCapabilityLinkClasses,
  tbyiCapabilityTitleClasses,
} from '../../lib/testBeforeYouInvest'
import { ArrowLink } from '../ui/Button'
import { TbyiCapabilityHeader } from './TbyiCapabilityHeader'

type ServiceThemeSectionProps = {
  theme: ServiceTheme
  index: number
}

export function ServiceThemeSection({ theme, index }: ServiceThemeSectionProps) {
  const primaryPricing = pricingBySlug[theme.primaryHref.replace('/services/', '')]
  const isDark = Boolean(theme.featured)

  return (
    <article
      id={theme.id}
      className={`scroll-mt-28 rounded-3xl border p-8 sm:p-10 lg:p-12 ${
        isDark
          ? 'border-ink bg-ink text-cream shadow-lg shadow-ink/10'
          : 'border-line/60 bg-white text-ink'
      }`}
    >
      <p
        className={`text-[0.6875rem] font-semibold uppercase tracking-[0.14em] ${
          isDark ? 'text-cream/55' : 'text-muted-light'
        }`}
      >
        {theme.uncertaintyLabel}
      </p>

      <h2
        className={`mt-4 text-[1.75rem] font-semibold tracking-[-0.03em] sm:text-[2rem] ${
          isDark ? 'text-cream' : 'text-ink'
        }`}
      >
        {theme.title}
      </h2>

      <p
        className={`mt-4 max-w-[720px] text-[1.0625rem] leading-relaxed ${
          isDark ? 'text-cream/75' : 'text-muted'
        }`}
      >
        {theme.summary}
      </p>

      <dl className={`mt-8 grid gap-6 sm:grid-cols-3 ${isDark ? 'text-cream' : 'text-ink'}`}>
        <div>
          <dt
            className={`text-[0.6875rem] font-semibold uppercase tracking-[0.12em] ${
              isDark ? 'text-cream/50' : 'text-muted-light'
            }`}
          >
            Problem
          </dt>
          <dd
            className={`mt-2 text-[0.9375rem] leading-relaxed ${
              isDark ? 'text-cream/80' : 'text-ink/85'
            }`}
          >
            {theme.problem}
          </dd>
        </div>
        <div>
          <dt
            className={`text-[0.6875rem] font-semibold uppercase tracking-[0.12em] ${
              isDark ? 'text-cream/50' : 'text-muted-light'
            }`}
          >
            Outcome
          </dt>
          <dd
            className={`mt-2 text-[0.9375rem] leading-relaxed ${
              isDark ? 'text-cream/80' : 'text-ink/85'
            }`}
          >
            {theme.outcome}
          </dd>
        </div>
        <div>
          <dt
            className={`text-[0.6875rem] font-semibold uppercase tracking-[0.12em] ${
              isDark ? 'text-cream/50' : 'text-muted-light'
            }`}
          >
            How we help
          </dt>
          <dd
            className={`mt-2 text-[0.9375rem] leading-relaxed ${
              isDark ? 'text-cream/80' : 'text-ink/85'
            }`}
          >
            {theme.howWeHelp}
          </dd>
        </div>
      </dl>

      <div className="mt-10">
        <p
          className={`mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] ${
            isDark ? 'text-cream/50' : 'text-muted-light'
          }`}
        >
          Capabilities
        </p>
        <ul className="grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {theme.modules.map((module) => {
            const isTbyi = isTestBeforeYouInvest({ href: module.href, label: module.label })

            return (
              <li key={`${module.label}-${module.href}`} className="h-full">
                <Link
                  to={module.href}
                  className={`group flex h-full flex-col rounded-2xl border px-4 py-4 transition ${
                    isTbyi
                      ? tbyiCapabilityLinkClasses
                      : standardCapabilityCardClasses(isDark)
                  }`}
                >
                  {isTbyi ? (
                    <TbyiCapabilityHeader
                      title={module.label}
                      titleClassName={tbyiCapabilityTitleClasses}
                    />
                  ) : (
                    <span
                      className={`text-[0.9375rem] font-medium ${
                        isDark ? 'text-cream group-hover:text-cream' : 'text-ink'
                      }`}
                    >
                      {module.label}
                    </span>
                  )}
                  {module.supportingLine ? (
                    <span
                      className={`mt-1 block flex-1 text-[0.8125rem] leading-relaxed ${
                        isTbyi
                          ? tbyiCapabilityBodyClasses
                          : isDark
                            ? 'text-cream/55'
                            : 'text-muted'
                      }`}
                    >
                      {module.supportingLine}
                    </span>
                  ) : (
                    <span className="mt-1 block flex-1" aria-hidden="true" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div
        className={`mt-10 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between ${
          isDark ? 'border-cream/10' : 'border-line'
        }`}
      >
        <div>
          {primaryPricing ? (
            <p className={`text-[0.875rem] ${isDark ? 'text-cream/60' : 'text-muted'}`}>
              {formatTypicalInvestment(primaryPricing.fromAmount)}
            </p>
          ) : null}
        </div>
        <ArrowLink
          to={theme.primaryHref}
          className={isDark ? '!text-cream hover:!text-cream/70' : undefined}
        >
          Explore {theme.title}
        </ArrowLink>
      </div>

      {index === 0 ? null : (
        <span className="sr-only">{`Service theme ${index + 1} of 4`}</span>
      )}
    </article>
  )
}
