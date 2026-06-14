import { Link } from 'react-router-dom'
import type { Service } from '../../content/services'

export const PROTOTYPE_SERVICE_SLUG = 'prototype-development'

export function isPrototypeService(slug: string) {
  return slug === PROTOTYPE_SERVICE_SLUG
}

type ServiceCardLinkProps = {
  service: Pick<Service, 'slug' | 'title' | 'tagline'> & { summary?: string }
  variant?: 'tile' | 'row' | 'compact' | 'related'
  linkLabel?: string
  className?: string
}

export function ServiceCardLink({
  service,
  variant = 'tile',
  linkLabel,
  className = '',
}: ServiceCardLinkProps) {
  const isPrototype = isPrototypeService(service.slug)
  const label =
    linkLabel ??
    (isPrototype && variant === 'compact' ? 'Explore service + demos →' : 'Learn more →')

  if (variant === 'row') {
    return (
      <Link
        to={`/services/${service.slug}`}
        className={`group block rounded-3xl border p-8 transition-all duration-300 sm:p-10 ${
          isPrototype
            ? 'border-ink bg-ink text-cream shadow-lg shadow-ink/10 hover:border-cream/20 hover:bg-nav hover:shadow-xl hover:shadow-ink/25'
            : 'border-line/60 bg-cream text-ink hover:border-ink/15 hover:bg-white hover:shadow-lg hover:shadow-ink/8'
        } ${className}`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-[640px]">
            <h2 className={`headline-small ${isPrototype ? 'text-cream' : 'group-hover:text-ink'}`}>
              {service.title}
            </h2>
            <p
              className={`mt-3 text-[1.0625rem] ${
                isPrototype ? 'text-cream/75' : 'text-muted group-hover:text-ink/80'
              }`}
            >
              {service.tagline}
            </p>
            {service.summary && (
              <p
                className={`mt-4 text-[1.0625rem] leading-[1.58] ${
                  isPrototype ? 'text-cream/60' : 'text-muted group-hover:text-ink/70'
                }`}
              >
                {service.summary}
              </p>
            )}
          </div>
          <span
            className={`shrink-0 text-[0.9375rem] font-medium transition-opacity ${
              isPrototype ? 'text-cream/70 group-hover:text-cream' : 'text-ink/50 group-hover:text-ink'
            }`}
          >
            {label}
          </span>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link
        to={`/services/${service.slug}`}
        className={`group flex h-full flex-col rounded-3xl p-8 transition-all ${
          isPrototype
            ? 'bg-ink text-cream hover:opacity-95'
            : 'border border-line hover:bg-cream-dark/50'
        } ${className}`}
      >
        <h3 className={`text-[1.125rem] font-semibold ${isPrototype ? 'text-cream' : 'text-ink'}`}>
          {service.title}
        </h3>
        <p
          className={`mt-2 flex-1 text-[0.9375rem] leading-relaxed ${
            isPrototype ? 'text-cream/70' : 'text-muted'
          }`}
        >
          {isPrototype
            ? `${service.tagline} Includes interactive example prototypes.`
            : service.tagline}
        </p>
        <span
          className={`mt-4 text-[0.875rem] font-medium transition-opacity ${
            isPrototype
              ? 'text-cream/80 group-hover:text-cream'
              : 'text-ink opacity-60 group-hover:opacity-100'
          }`}
        >
          {label}
        </span>
      </Link>
    )
  }

  if (variant === 'related') {
    return (
      <Link
        to={`/services/${service.slug}`}
        className={`rounded-3xl border p-6 transition-all ${
          isPrototype
            ? 'border-ink bg-ink text-cream shadow-md shadow-ink/10 hover:bg-nav'
            : 'border-line hover:bg-cream-dark/50'
        } ${className}`}
      >
        <h3 className={`text-[1.0625rem] font-semibold ${isPrototype ? 'text-cream' : 'text-ink'}`}>
          {service.title}
        </h3>
        <p className={`mt-2 text-[0.9375rem] ${isPrototype ? 'text-cream/75' : 'text-muted'}`}>
          {service.tagline}
        </p>
      </Link>
    )
  }

  return (
    <Link
      to={`/services/${service.slug}`}
      className={`group flex h-full flex-col rounded-3xl p-8 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${
        isPrototype
          ? 'bg-ink text-cream shadow-lg shadow-ink/10 hover:bg-nav hover:shadow-xl hover:shadow-ink/25 focus-visible:ring-cream/30'
          : 'bg-cream-dark/60 hover:bg-cream-dark focus-visible:ring-ink/25'
      } ${className}`}
    >
      <h3 className={`text-[1.25rem] font-semibold tracking-[-0.02em] ${isPrototype ? 'text-cream' : 'text-ink'}`}>
        {service.title}
      </h3>
      <p className={`mt-3 flex-1 text-[0.9375rem] leading-relaxed ${isPrototype ? 'text-cream/75' : 'text-muted'}`}>
        {service.tagline}
      </p>
      <span
        className={`mt-6 text-[0.875rem] font-medium transition-opacity duration-300 ${
          isPrototype
            ? 'text-cream/80 group-hover:text-cream group-focus-within:text-cream'
            : 'text-ink opacity-70 group-hover:opacity-100 group-focus-within:opacity-100'
        }`}
      >
        {label}
      </span>
    </Link>
  )
}
