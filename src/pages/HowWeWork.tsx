import { Link } from 'react-router-dom'
import { services } from '../content/services'
import { engagementFaq, engagementSteps } from '../content/howWeWork'
import { engagementTypes } from '../content/site'
import { ArrowLink, Button } from '../components/ui/Button'
import { FadeIn } from '../components/ui/FadeIn'
import { Section, SectionHeader } from '../components/ui/Section'

export function HowWeWork() {
  const servicePreview = services.filter((s) => s.slug !== 'prototype-development')

  return (
    <>
      <Section size="hero" className="pt-28 sm:pt-32">
        <div className="content-max">
          <FadeIn>
            <p className="eyebrow mb-6">How we work</p>
            <h1 className="headline-hero max-w-[900px]">
              We start by understanding your business - then we figure out what fits.
            </h1>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-8 max-w-[640px]">
            <p className="body-large">
              Zo&Zo is not a one-size-fits-all consultancy. We listen first, learn how your
              business actually works, and then recommend the services that make sense for
              where you are - not a package you do not need.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section theme="cream" size="compact">
        <SectionHeader
          align="left"
          eyebrow="Our approach"
          title="Five steps from first conversation to moving forward."
          description="Every engagement follows the same human logic - even when the services differ."
        />
        <div className="content-wide space-y-0">
          {engagementSteps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.05}>
              <div className="grid gap-4 border-b border-line py-10 sm:grid-cols-[100px_240px_1fr] sm:gap-12">
                <span className="text-[0.875rem] font-medium tabular-nums text-muted-light">
                  {step.number}
                </span>
                <h2 className="headline-small">{step.title}</h2>
                <p className="body-regular max-w-[560px]">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Our services"
          title="Once we understand you, we recommend what applies."
          description="You might need one service. You might need a few. Here is what we offer - explore any that resonate."
        />
        <div className="content-wide grid gap-4 sm:grid-cols-2">
          {servicePreview.map((service, i) => (
            <FadeIn key={service.slug} delay={i * 0.04}>
              <Link
                to={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-line p-8 transition-all hover:bg-cream-dark/50"
              >
                <h3 className="text-[1.125rem] font-semibold text-ink">{service.title}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                  {service.tagline}
                </p>
                <span className="mt-4 text-[0.875rem] font-medium text-ink opacity-60 transition-opacity group-hover:opacity-100">
                  Learn more →
                </span>
              </Link>
            </FadeIn>
          ))}
          <FadeIn delay={0.08}>
            <Link
              to="/services/prototype-development"
              className="group flex h-full flex-col rounded-3xl bg-ink p-8 text-cream transition-opacity hover:opacity-95"
            >
              <h3 className="text-[1.125rem] font-semibold">Prototype Development</h3>
              <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-cream/70">
                See your idea working - before you commit to building it. Includes interactive
                example prototypes.
              </p>
              <span className="mt-4 text-[0.875rem] font-medium text-cream/80 group-hover:text-cream">
                Explore service + demos →
              </span>
            </Link>
          </FadeIn>
        </div>
        <FadeIn className="mt-10 text-center">
          <ArrowLink to="/services">View all services</ArrowLink>
        </FadeIn>
      </Section>

      <Section theme="dark">
        <SectionHeader
          theme="dark"
          eyebrow="Before you reach out"
          title="Questions we hear often."
        />
        <div className="content-max mx-auto max-w-[720px] space-y-8">
          {engagementFaq.map((item, i) => (
            <FadeIn key={item.question} delay={i * 0.05}>
              <div className="border-b border-cream/10 pb-8">
                <h3 className="text-[1.125rem] font-semibold text-cream">{item.question}</h3>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-cream/65">
                  {item.answer}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section theme="cream">
        <SectionHeader
          eyebrow="Engagement types"
          title="Flexible to fit where you are."
          description="Some clients need a single clarity session. Others want a scoped project or ongoing advisory."
        />
        <div className="content-wide grid gap-6 md:grid-cols-3">
          {engagementTypes.map((type, i) => (
            <FadeIn key={type.title} delay={i * 0.08}>
              <div className="rounded-3xl border border-line bg-cream p-8 sm:p-10">
                <h3 className="headline-small">{type.title}</h3>
                <p className="mt-4 body-regular">{type.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-14 text-center">
          <Button to="/contact">Book a free clarity call</Button>
        </FadeIn>
      </Section>
    </>
  )
}
