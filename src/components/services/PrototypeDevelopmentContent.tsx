import type { Service } from '../../content/services'
import { getRelatedServices } from '../../content/services'
import { WorkShowcase } from '../work/WorkShowcase'
import { CollapsibleSection } from '../ui/CollapsibleSection'
import { FadeIn } from '../ui/FadeIn'
import { Section } from '../ui/Section'
import { ServiceCardLink } from './ServiceCardLink'

type PrototypeDevelopmentContentProps = {
  service: Service
}

export function PrototypeDevelopmentContent({ service }: PrototypeDevelopmentContentProps) {
  const related = getRelatedServices(service.slug)

  return (
    <>
      <WorkShowcase showIntro hideGuideRail compactLayout />

      <Section>
        <div className="content-wide">
          <CollapsibleSection
            eyebrow="How we approach this"
            title={service.approachTitle}
            description={service.approachDescription}
            defaultOpen={false}
          >
            <div className="space-y-0">
              {service.processSteps.map((step, i) => (
                <FadeIn key={step.number} delay={i * 0.05}>
                  <div className="grid gap-4 border-b border-line py-10 sm:grid-cols-[100px_240px_1fr] sm:gap-12">
                    <span className="text-[0.875rem] font-medium tabular-nums text-muted-light">
                      {step.number}
                    </span>
                    <h3 className="headline-small">{step.title}</h3>
                    <p className="body-regular max-w-[560px]">{step.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </CollapsibleSection>
        </div>
      </Section>

      <Section theme="dark">
        <div className="content-wide">
          <CollapsibleSection
            eyebrow="What you leave with"
            title="Outcomes that matter."
            defaultOpen={false}
            theme="dark"
          >
            <ul className="mx-auto max-w-[720px] space-y-4">
              {service.outcomes.map((outcome, i) => (
                <FadeIn key={outcome} delay={i * 0.05}>
                  <li className="flex gap-4 text-[1.0625rem] leading-relaxed text-cream/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cream/50" />
                    {outcome}
                  </li>
                </FadeIn>
              ))}
            </ul>
          </CollapsibleSection>
        </div>
      </Section>

      <Section theme="cream">
        <div className="content-wide">
          <CollapsibleSection
            eyebrow="Common questions"
            title="Good to know before we start."
            defaultOpen={false}
            theme="cream"
          >
            <div className="mx-auto max-w-[720px] space-y-8">
              {service.faq.map((item, i) => (
                <FadeIn key={item.question} delay={i * 0.05}>
                  <div className="border-b border-line pb-8">
                    <h3 className="text-[1.125rem] font-semibold text-ink">{item.question}</h3>
                    <p className="mt-3 body-regular">{item.answer}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </CollapsibleSection>
        </div>
      </Section>

      {related.length > 0 && (
        <Section size="compact" className="pb-28">
          <div className="content-max">
            <h2 className="headline-small mb-8">Related services</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((s) => (
                <ServiceCardLink key={s.slug} service={s} variant="related" />
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  )
}
