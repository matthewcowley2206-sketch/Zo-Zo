import { Link } from 'react-router-dom'
import type { ComponentType, ReactNode } from 'react'
import type { Service } from '../../content/services'
import { getRelatedServices } from '../../content/services'
import { serviceImagery } from '../../content/serviceImagery'
import { engagementTypes, site } from '../../content/site'
import { Button } from '../ui/Button'
import { FadeIn } from '../ui/FadeIn'
import { Section, SectionHeader } from '../ui/Section'

type ServiceExerciseContentProps = {
  service: Service
  Demo: ComponentType
  exerciseCaption: string
  outcomesDescription?: string
  engagementDescription?: string
  callout?: ReactNode
}

export function ServiceExerciseContent({
  service,
  Demo,
  exerciseCaption,
  outcomesDescription = 'Every engagement is scoped toward deliverables you can use - not reports that gather dust.',
  engagementDescription = 'Some clients need a single session. Others want a scoped project or ongoing support. We figure out what fits together.',
  callout,
}: ServiceExerciseContentProps) {
  const related = getRelatedServices(service.slug)
  const imagery = serviceImagery[service.slug]

  return (
    <>
      <Section theme="cream" size="compact">
        <div className="content-wide grid gap-16 lg:grid-cols-2">
          <FadeIn>
            <h2 className="headline-small">Who this is for</h2>
            <p className="mt-4 body-regular">{service.whoFor}</p>
            <p className="mt-6 body-regular">{service.summary}</p>
            {callout}
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="headline-small">What this includes</h2>
            <ul className="mt-6 space-y-4">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3 text-[1.0625rem] leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Section>

      <Section>
        <FadeIn className="content-wide">
          <Demo />
          <p className="mx-auto mt-5 max-w-[640px] text-center text-[0.8125rem] leading-relaxed text-muted-light">
            {exerciseCaption}
          </p>
        </FadeIn>
      </Section>

      <Section theme="cream">
        <div className="content-wide grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <SectionHeader
              align="left"
              eyebrow="How we approach this"
              title={service.approachTitle}
              description={service.approachDescription}
              className="!mb-0 !max-w-none"
            />
          </FadeIn>
          {imagery?.secondary && (
            <FadeIn delay={0.1}>
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={imagery.secondary.url}
                  alt={imagery.secondary.alt}
                  className="aspect-[4/3] w-full object-cover"
                  style={
                    imagery.secondary.objectPosition
                      ? { objectPosition: imagery.secondary.objectPosition }
                      : undefined
                  }
                  loading="lazy"
                />
              </div>
            </FadeIn>
          )}
        </div>
        <div className="content-wide mt-12 space-y-0">
          {service.processSteps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.05}>
              <div className="grid gap-4 border-b border-line py-10 sm:grid-cols-[100px_240px_1fr] sm:gap-12">
                <span className="text-[0.875rem] font-medium tabular-nums text-muted-light">
                  {step.number}
                </span>
                <h2 className="headline-small text-[1.375rem]">{step.title}</h2>
                <p className="body-regular max-w-[560px]">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section theme="dark">
        <SectionHeader
          theme="dark"
          eyebrow="What you leave with"
          title="Outcomes that matter."
          description={outcomesDescription}
        />
        <div className="content-max mx-auto max-w-[720px]">
          <ul className="space-y-4">
            {service.outcomes.map((outcome, i) => (
              <FadeIn key={outcome} delay={i * 0.05}>
                <li className="flex gap-4 text-[1.0625rem] leading-relaxed text-cream/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cream/50" />
                  {outcome}
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </Section>

      <Section theme="cream">
        <SectionHeader eyebrow="Common questions" title="Good to know before we start." />
        <div className="content-max mx-auto max-w-[720px] space-y-8">
          {service.faq.map((item, i) => (
            <FadeIn key={item.question} delay={i * 0.05}>
              <div className="border-b border-line pb-8">
                <h3 className="text-[1.125rem] font-semibold text-ink">{item.question}</h3>
                <p className="mt-3 body-regular">{item.answer}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {service.prototypeNote && (
        <Section>
          <FadeIn className="content-max">
            <div className="rounded-3xl bg-ink p-8 sm:p-10">
              <p className="eyebrow !text-cream/50">Working prototypes</p>
              <p className="mt-4 text-[1.125rem] leading-relaxed text-cream/80">
                {service.prototypeNote}{' '}
                <Link
                  to="/services/prototype-development"
                  className="underline underline-offset-2 hover:text-cream"
                >
                  Explore Prototype Development →
                </Link>
              </p>
            </div>
          </FadeIn>
        </Section>
      )}

      <Section theme="cream">
        <SectionHeader
          eyebrow="Engagement types"
          title="Flexible to fit where you are."
          description={engagementDescription}
        />
        <div className="content-wide grid gap-6 md:grid-cols-3">
          {engagementTypes.map((type, i) => (
            <FadeIn key={type.title} delay={i * 0.08}>
              <div className="rounded-3xl border border-line bg-cream p-8 sm:p-10">
                <h3 className="headline-small text-[1.375rem]">{type.title}</h3>
                <p className="mt-4 body-regular">{type.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="content-max mt-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[1.0625rem] font-medium text-ink">
              Ready to talk about {service.title.toLowerCase()}?
            </p>
            <p className="mt-1 body-regular">Book a free clarity call to get started.</p>
          </div>
          <Button to="/contact">{site.ctaLabel}</Button>
        </FadeIn>
      </Section>

      {related.length > 0 && (
        <Section size="compact" className="pb-28">
          <div className="content-max">
            <h2 className="headline-small mb-8">Related services</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="rounded-3xl border border-line p-6 transition-colors hover:bg-cream-dark/50"
                >
                  <h3 className="text-[1.0625rem] font-semibold">{s.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-muted">{s.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  )
}
