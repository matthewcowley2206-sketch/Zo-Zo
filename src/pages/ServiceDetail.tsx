import { Link, Navigate, useParams } from 'react-router-dom'
import { getService } from '../content/services'
import { ClientListeningContent } from '../components/services/ClientListeningContent'
import { CommunicationDemo } from '../components/services/communication/CommunicationDemo'
import { DataAiDemo } from '../components/services/dataAi/DataAiDemo'
import { GoToMarketDemo } from '../components/services/goToMarket/GoToMarketDemo'
import { OperationsDemo } from '../components/services/operations/OperationsDemo'
import { PrototypeDevelopmentContent } from '../components/services/PrototypeDevelopmentContent'
import { SalesMarketingDemo } from '../components/services/salesMarketing/SalesMarketingDemo'
import { ServiceDetailContent } from '../components/services/ServiceDetailContent'
import { ServiceExerciseContent } from '../components/services/ServiceExerciseContent'
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
            exerciseCaption="Mark funnel leaks and assemble positioning tiles - then see a visual one-pager and journey fix. Real work is shaped with your customers and your numbers."
            outcomesDescription="Clear positioning, a plan you can run, and sales and marketing saying the same thing."
            engagementDescription="Some clients need positioning clarity in a session. Others want a full go-to-market plan and pitch packs."
          />
        )
      case 'communication':
        return (
          <ServiceExerciseContent
            service={service}
            Demo={CommunicationDemo}
            exerciseCaption="Strike corporate filler and watch clarity rise - then see a before/after doc and slide mock. Real packs are built with your leaders and your rollout."
            outcomesDescription="Messages people understand, materials ready to use, and less confusion during change."
          />
        )
      case 'data-ai':
        return (
          <ServiceExerciseContent
            service={service}
            Demo={DataAiDemo}
            exerciseCaption="Sort tasks into automate, dashboard, or human - then see a dashboard mock and roadmap. Real roadmaps connect to your systems and what you will adopt."
            outcomesDescription="Clarity on the numbers that matter, time saved through automations, and an AI roadmap your team can follow."
            engagementDescription="Some clients need a clarity session and quick wins. Others want dashboards, training, and a full roadmap."
          />
        )
      case 'operations':
        return (
          <ServiceExerciseContent
            service={service}
            Demo={OperationsDemo}
            exerciseCaption="Cut a messy process to four steps and pick automation - then see a before/after flow visual. Real work maps your actual process and tools."
            outcomesDescription="Clearer workflows, automations that save real time, and SOPs your team can follow."
          />
        )
      case 'go-to-market':
        return (
          <ServiceExerciseContent
            service={service}
            Demo={GoToMarketDemo}
            exerciseCaption="Drag launch activities onto a four-week board - then see messaging, calendar, and test scorecard. Real plans are built with your offer and your team."
            outcomesDescription="A week-by-week launch plan, messaging that explains the offer, and a test-and-learn approach that cuts risk."
            engagementDescription="Some clients need offer clarity and a launch sequence. Others want the full strategy pack, profiles, and test plan."
          />
        )
      default:
        return <ServiceDetailContent service={service} />
    }
  })()

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
                    decoding="async"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </Section>

      {body}
    </>
  )
}
