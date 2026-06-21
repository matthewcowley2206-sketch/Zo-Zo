import { Link } from 'react-router-dom'
import type { ServiceTheme } from '../../content/method'

type ServiceThemeCardProps = {
  theme: ServiceTheme
  className?: string
}

export function ServiceThemeCard({ theme, className = '' }: ServiceThemeCardProps) {
  return (
    <Link
      to={theme.primaryHref}
      className={`group flex h-full flex-col rounded-3xl border p-8 transition-all duration-300 ${
        theme.featured
          ? 'border-ink bg-ink text-cream shadow-lg shadow-ink/10 hover:bg-nav hover:shadow-xl hover:shadow-ink/25'
          : 'border-line/60 bg-cream text-ink hover:border-ink/15 hover:bg-white hover:shadow-lg hover:shadow-ink/8'
      } ${className}`}
    >
      <p
        className={`text-[0.6875rem] font-semibold uppercase tracking-[0.14em] ${
          theme.featured ? 'text-cream/55' : 'text-muted-light'
        }`}
      >
        {theme.uncertaintyLabel}
      </p>
      <h3
        className={`mt-3 text-[1.25rem] font-semibold tracking-[-0.02em] ${
          theme.featured ? 'text-cream' : 'text-ink'
        }`}
      >
        {theme.title}
      </h3>
      <p
        className={`mt-3 flex-1 text-[0.9375rem] leading-relaxed ${
          theme.featured ? 'text-cream/75' : 'text-muted group-hover:text-ink/80'
        }`}
      >
        {theme.summary}
      </p>
      <ul className={`mt-5 space-y-2 ${theme.featured ? 'text-cream/70' : 'text-muted'}`}>
        {theme.modules.map((module) => (
          <li key={module.label} className="text-[0.8125rem]">
            <span>· {module.label}</span>
            {module.supportingLine ? (
              <span
                className={`mt-0.5 block pl-3 text-[0.75rem] leading-relaxed ${
                  theme.featured ? 'text-cream/55' : 'text-muted-light'
                }`}
              >
                {module.supportingLine}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
      <span
        className={`mt-6 text-[0.875rem] font-medium transition-opacity ${
          theme.featured
            ? 'text-cream/80 group-hover:text-cream'
            : 'text-ink/50 group-hover:text-ink'
        }`}
      >
        Learn more →
      </span>
    </Link>
  )
}
