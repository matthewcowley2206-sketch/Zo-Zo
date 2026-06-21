import { Link } from 'react-router-dom'
import type { Service } from '../../content/services'
import { getRelatedServices } from '../../content/services'
import { serviceImagery } from '../../content/serviceImagery'
import { engagementTypes, site } from '../../content/site'
import { ClientListeningDemo } from './clientListening/ClientListeningDemo'
import { Button } from '../ui/Button'
import { FadeIn } from '../ui/FadeIn'
import { Section, SectionHeader } from '../ui/Section'
import { ServiceCardLink } from './ServiceCardLink'

type ClientListeningContentProps = {
  service: Service
}

export function ClientListeningContent({ service }: ClientListeningContentProps) {
  const related = getRelatedServices(service.slug)
  const imagery = serviceImagery['client-listening']

  return (
    <>
      <Section theme="cream" size="compact">
        <div className="content-wide grid gap-16 lg:grid-cols-2">
          <FadeIn>
            <h2 className="headline-small">Who this is for</h2>
            <p className="mt-4 body-regular">{service.whoFor}</p>
            <p className="mt-6 body-regular">{service.summary}</p>
            <p className="mt-6 rounded-2xl bg-white p-4 text-[0.9375rem] leading-relaxed text-muted ring-1 ring-line">
              Client listening is often the <span className="font-semibold text-ink">first step</span>.
              What comes next is extracting insights that inform{' '}
              <Link to="/services/strategy" className="font-semibold text-ink underline underline-offset-2">
                strategy
              </Link>{' '}
              - not a report that sits in a folder.
            </p>
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
          <ClientListeningDemo />
          <p className="mx-auto mt-5 max-w-[640px] text-center text-[0.8125rem] leading-relaxed text-muted-light">
            Tap each stage to expand what happens, what you leave with, and where automation can help.
            The loop runs continuously - not as a one-off survey.
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
          description="Listening is the start. Insight, measurement, and an embedded loop are what make it stick."
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
                  Explore Test Before You Invest →
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
          description="Some clients need a listening sprint. Others want the full 360 framework embedded with automation."
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
                <ServiceCardLink key={s.slug} service={s} variant="related" />
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  )
}
