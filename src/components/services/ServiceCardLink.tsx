import { Link } from 'react-router-dom'
import type { Service } from '../../content/services'
import {
  tbyiCapabilityBodyClasses,
  tbyiCapabilityCtaClasses,
  tbyiCapabilityLinkClasses,
  tbyiCapabilityTitleClasses,
} from '../../lib/testBeforeYouInvest'
import { TbyiCapabilityHeader } from './TbyiCapabilityHeader'

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
  const isTbyi = isPrototypeService(service.slug)
  const label =
    linkLabel ??
    (isTbyi && variant === 'compact' ? 'Explore service + demos →' : 'Learn more →')

  if (variant === 'row') {
    return (
      <Link
        to={`/services/${service.slug}`}
        className={`group block rounded-3xl border p-8 transition-all duration-300 sm:p-10 ${
          isTbyi
            ? `${tbyiCapabilityLinkClasses} focus-visible:ring-2 focus-visible:ring-emerald-400/40`
            : 'border-line/60 bg-cream text-ink hover:border-ink/15 hover:bg-white hover:shadow-lg hover:shadow-ink/8'
        } ${className}`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-[640px]">
            {isTbyi ? (
              <TbyiCapabilityHeader
                title={service.title}
                titleClassName={`headline-small ${tbyiCapabilityTitleClasses}`}
                badgeClassName="mt-2"
              />
            ) : (
              <h2 className="headline-small group-hover:text-ink">{service.title}</h2>
            )}
            <p
              className={`mt-3 text-[1.0625rem] ${
                isTbyi ? tbyiCapabilityBodyClasses : 'text-muted group-hover:text-ink/80'
              }`}
            >
              {service.tagline}
            </p>
            {service.summary && (
              <p
                className={`mt-4 text-[1.0625rem] leading-[1.58] ${
                  isTbyi ? 'text-cream/65' : 'text-muted group-hover:text-ink/70'
                }`}
              >
                {service.summary}
              </p>
            )}
          </div>
          <span
            className={`shrink-0 text-[0.9375rem] transition-opacity ${
              isTbyi ? tbyiCapabilityCtaClasses : 'font-medium text-ink/50 group-hover:text-ink'
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
        className={`group flex h-full flex-col rounded-3xl border p-8 transition-all ${
          isTbyi
            ? tbyiCapabilityLinkClasses
            : 'border border-line hover:bg-cream-dark/50'
        } ${className}`}
      >
        {isTbyi ? (
          <TbyiCapabilityHeader
            title={service.title}
            titleClassName={`text-[1.125rem] ${tbyiCapabilityTitleClasses}`}
            badgeClassName="mt-2"
          />
        ) : (
          <h3 className="text-[1.125rem] font-semibold text-ink">{service.title}</h3>
        )}
        <p
          className={`mt-2 flex-1 text-[0.9375rem] leading-relaxed ${
            isTbyi ? tbyiCapabilityBodyClasses : 'text-muted'
          }`}
        >
          {isTbyi
            ? `${service.tagline} Includes interactive example prototypes.`
            : service.tagline}
        </p>
        <span
          className={`mt-4 text-[0.875rem] transition-opacity ${
            isTbyi ? tbyiCapabilityCtaClasses : 'font-medium text-ink opacity-60 group-hover:opacity-100'
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
          isTbyi ? tbyiCapabilityLinkClasses : 'border-line hover:bg-cream-dark/50'
        } ${className}`}
      >
        {isTbyi ? (
          <TbyiCapabilityHeader
            title={service.title}
            titleClassName={`text-[1.0625rem] ${tbyiCapabilityTitleClasses}`}
            badgeClassName="mt-2"
          />
        ) : (
          <h3 className="text-[1.0625rem] font-semibold text-ink">{service.title}</h3>
        )}
        <p className={`mt-2 text-[0.9375rem] ${isTbyi ? tbyiCapabilityBodyClasses : 'text-muted'}`}>
          {service.tagline}
        </p>
      </Link>
    )
  }

  return (
    <Link
      to={`/services/${service.slug}`}
      className={`group flex h-full flex-col rounded-3xl border p-8 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${
        isTbyi
          ? `${tbyiCapabilityLinkClasses} focus-visible:ring-emerald-400/40`
          : 'border-transparent bg-cream-dark/60 hover:bg-cream-dark focus-visible:ring-ink/25'
      } ${className}`}
    >
      {isTbyi ? (
        <TbyiCapabilityHeader
          title={service.title}
          titleClassName={`text-[1.25rem] tracking-[-0.02em] ${tbyiCapabilityTitleClasses}`}
          badgeClassName="mt-2"
        />
      ) : (
        <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">
          {service.title}
        </h3>
      )}
      <p
        className={`mt-3 flex-1 text-[0.9375rem] leading-relaxed ${
          isTbyi ? tbyiCapabilityBodyClasses : 'text-muted'
        }`}
      >
        {service.tagline}
      </p>
      <span
        className={`mt-6 text-[0.875rem] transition-opacity duration-300 ${
          isTbyi
            ? `${tbyiCapabilityCtaClasses} group-focus-within:opacity-100`
            : 'font-medium text-ink opacity-70 group-hover:opacity-100 group-focus-within:opacity-100'
        }`}
      >
        {label}
      </span>
    </Link>
  )
}
