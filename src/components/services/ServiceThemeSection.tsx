import { Link } from 'react-router-dom'
import type { ServiceTheme } from '../../content/method'
import { formatFromPrice, pricingBySlug } from '../../content/pricing'
import { ArrowLink } from '../ui/Button'

type ServiceThemeSectionProps = {
  theme: ServiceTheme
  index: number
}

export function ServiceThemeSection({ theme, index }: ServiceThemeSectionProps) {
  const primaryPricing = pricingBySlug[theme.primaryHref.replace('/services/', '')]
  const isDark = theme.featured

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
          <dd className={`mt-2 text-[0.9375rem] leading-relaxed ${isDark ? 'text-cream/80' : 'text-ink/85'}`}>
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
          <dd className={`mt-2 text-[0.9375rem] leading-relaxed ${isDark ? 'text-cream/80' : 'text-ink/85'}`}>
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
          <dd className={`mt-2 text-[0.9375rem] leading-relaxed ${isDark ? 'text-cream/80' : 'text-ink/85'}`}>
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
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {theme.modules.map((module) => (
            <li key={`${module.label}-${module.href}`}>
              <Link
                to={module.href}
                className={`group block rounded-2xl border px-4 py-4 transition ${
                  isDark
                    ? 'border-cream/15 bg-cream/[0.04] hover:border-cream/30 hover:bg-cream/[0.08]'
                    : 'border-line/60 bg-cream/40 hover:border-ink/15 hover:bg-cream'
                }`}
              >
                <span
                  className={`text-[0.9375rem] font-medium ${
                    isDark ? 'text-cream group-hover:text-cream' : 'text-ink'
                  }`}
                >
                  {module.label}
                </span>
                {module.supportingLine ? (
                  <span
                    className={`mt-1 block text-[0.8125rem] leading-relaxed ${
                      isDark ? 'text-cream/55' : 'text-muted'
                    }`}
                  >
                    {module.supportingLine}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
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
              Typical engagements from{' '}
              <span className={`font-semibold ${isDark ? 'text-cream' : 'text-ink'}`}>
                {formatFromPrice(primaryPricing.fromAmount)}
              </span>{' '}
              ex GST
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
