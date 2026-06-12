import { Link, Navigate, useParams } from 'react-router-dom'
import { getService } from '../content/services'
import { PrototypeDevelopmentContent } from '../components/services/PrototypeDevelopmentContent'
import { ServiceDetailContent } from '../components/services/ServiceDetailContent'
import { StrategyDirectionContent } from '../components/services/StrategyDirectionContent'
import { serviceImagery } from '../content/serviceImagery'
import { FadeIn } from '../components/ui/FadeIn'
import { Section } from '../components/ui/Section'

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const service = slug ? getService(slug) : undefined

  if (!service) {
    return <Navigate to="/services" replace />
  }

  const isPrototype = service.slug === 'prototype-development'
  const isStrategy = service.slug === 'strategy'
  const heroImage = serviceImagery[service.slug]?.hero

  return (
    <>
      <Section size="hero" className="pt-28 sm:pt-32">
        <div className={heroImage ? 'content-wide' : 'content-max'}>
          <FadeIn>
            <Link
              to="/services"
              className="mb-8 inline-flex text-[0.875rem] text-muted transition-colors hover:text-ink"
            >
              ← All services
            </Link>
          </FadeIn>
          <div className={heroImage ? 'grid items-end gap-10 lg:grid-cols-2 lg:gap-16' : ''}>
            <FadeIn delay={heroImage ? 0 : undefined}>
              <p className="eyebrow mb-6">Services</p>
              <h1 className="headline-hero max-w-[900px]">{service.title}</h1>
              <p className="body-large mt-8 max-w-[640px]">{service.tagline}</p>
            </FadeIn>
            {heroImage && (
              <FadeIn delay={0.1}>
                <div className="overflow-hidden rounded-3xl lg:mb-2">
                  <img
                    src={heroImage.url}
                    alt={heroImage.alt}
                    className="aspect-[5/4] w-full object-cover sm:aspect-[4/3]"
                    loading="eager"
                  />
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </Section>

      {isPrototype ? (
        <PrototypeDevelopmentContent service={service} />
      ) : isStrategy ? (
        <StrategyDirectionContent service={service} />
      ) : (
        <ServiceDetailContent service={service} />
      )}
    </>
  )
}
