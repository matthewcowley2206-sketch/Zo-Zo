import { lazy, Suspense } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getService } from '../content/services'
import { serviceImagery } from '../content/serviceImagery'
import { FadeIn } from '../components/ui/FadeIn'
import { Section } from '../components/ui/Section'

const PrototypeDevelopmentContent = lazy(() =>
  import('../components/services/PrototypeDevelopmentContent').then((module) => ({
    default: module.PrototypeDevelopmentContent,
  })),
)
const StrategyDirectionContent = lazy(() =>
  import('../components/services/StrategyDirectionContent').then((module) => ({
    default: module.StrategyDirectionContent,
  })),
)
const ClientListeningContent = lazy(() =>
  import('../components/services/ClientListeningContent').then((module) => ({
    default: module.ClientListeningContent,
  })),
)
const ServiceExerciseContent = lazy(() =>
  import('../components/services/ServiceExerciseContent').then((module) => ({
    default: module.ServiceExerciseContent,
  })),
)
const ServiceDetailContent = lazy(() =>
  import('../components/services/ServiceDetailContent').then((module) => ({
    default: module.ServiceDetailContent,
  })),
)
const SalesMarketingDemo = lazy(() =>
  import('../components/services/salesMarketing/SalesMarketingDemo').then((module) => ({
    default: module.SalesMarketingDemo,
  })),
)
const CommunicationDemo = lazy(() =>
  import('../components/services/communication/CommunicationDemo').then((module) => ({
    default: module.CommunicationDemo,
  })),
)
const DataAiDemo = lazy(() =>
  import('../components/services/dataAi/DataAiDemo').then((module) => ({
    default: module.DataAiDemo,
  })),
)
const OperationsDemo = lazy(() =>
  import('../components/services/operations/OperationsDemo').then((module) => ({
    default: module.OperationsDemo,
  })),
)
const GoToMarketDemo = lazy(() =>
  import('../components/services/goToMarket/GoToMarketDemo').then((module) => ({
    default: module.GoToMarketDemo,
  })),
)

function ServiceBodyFallback() {
  return (
    <Section theme="cream" size="compact">
      <div className="content-max py-16 text-center">
        <p className="text-[0.9375rem] text-muted">Loading service details…</p>
      </div>
    </Section>
  )
}

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const service = slug ? getService(slug) : undefined

  if (!service) {
    return <Navigate to="/services" replace />
  }

  const heroImage = serviceImagery[service.slug]?.hero

  const body = (() => {
    switch (service.slug) {
      case 'prototype-development':
        return <PrototypeDevelopmentContent service={service} />
      case 'strategy':
        return <StrategyDirectionContent service={service} />
      case 'client-listening':
        return <ClientListeningContent service={service} />
      case 'sales-marketing':
        return (
          <ServiceExerciseContent
            service={service}
            Demo={SalesMarketingDemo}
            exerciseCaption="Four areas of support - positioning, go-to-market plan, customer journey, and sales assets. Tap each to see how we help and what you leave with."
            outcomesDescription="Clear positioning, a plan you can run, and sales and marketing saying the same thing."
            engagementDescription="Some clients need positioning clarity in a session. Others want a full go-to-market plan and pitch packs."
          />
        )
      case 'communication':
        return (
          <ServiceExerciseContent
            service={service}
            Demo={CommunicationDemo}
            exerciseCaption="Follow the narrative spine - five story beats from core storyline to client narrative and rollout toolkit. Expand each beat to see how storytelling shapes what we deliver."
            outcomesDescription="A clear story thread, client narratives that land, and materials your team can tell consistently."
          />
        )
      case 'data-ai':
        return (
          <ServiceExerciseContent
            service={service}
            Demo={DataAiDemo}
            exerciseCaption="Pick a business question and see how data insight and AI support connect - from the question through analysis to a practical recommendation."
            outcomesDescription="Clarity on the numbers that matter, time saved through practical automations, and an AI roadmap your team can follow."
            engagementDescription="Some clients need a clarity session and quick wins. Others want dashboards, training, and a full roadmap."
          />
        )
      case 'operations':
        return (
          <ServiceExerciseContent
            service={service}
            Demo={OperationsDemo}
            exerciseCaption="Follow a sample onboarding workflow - select each area of support to see the flow change and what we deliver."
            outcomesDescription="Clearer workflows, automations that save real time, and SOPs your team can follow."
          />
        )
      case 'go-to-market':
        return (
          <ServiceExerciseContent
            service={service}
            Demo={GoToMarketDemo}
            exerciseCaption="Six building blocks for launch - offer, audience, messaging, plan, pricing, and test-and-learn. Tap each block to see what we deliver."
            outcomesDescription="A go-to-market plan you can execute week by week, messaging that lands, and a test-and-learn approach that cuts risk."
            engagementDescription="Some clients need offer clarity and a launch sequence. Others want the full strategy pack, profiles, and test plan."
          />
        )
      default:
        return <ServiceDetailContent service={service} />
    }
  })()

  return (
    <>
      <Section size="hero" className="hero-offset">
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
            <FadeIn delay={heroImage ? 0 : undefined} className={heroImage ? 'min-w-0' : undefined}>
              <p className="eyebrow mb-6">Services</p>
              <h1 className={heroImage ? 'headline-hero-split' : 'headline-hero max-w-[900px]'}>
                {service.title}
              </h1>
              <p className="body-large mt-8 max-w-[640px]">{service.tagline}</p>
              <p className="body-regular mt-4 max-w-[640px] text-muted">{service.summary}</p>
            </FadeIn>
            {heroImage && (
              <FadeIn delay={0.1}>
                <div className="overflow-hidden rounded-3xl lg:mb-2">
                  <img
                    src={heroImage.url}
                    alt={heroImage.alt}
                    loading="eager"
                    decoding="async"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="aspect-[5/4] w-full object-cover sm:aspect-[4/3]"
                  />
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </Section>

      <Suspense fallback={<ServiceBodyFallback />}>{body}</Suspense>
    </>
  )
}
