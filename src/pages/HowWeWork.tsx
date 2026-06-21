import { serviceThemes } from '../content/method'
import { engagementFaq, engagementSteps } from '../content/howWeWork'
import { engagementTypes, site } from '../content/site'
import { ServiceThemeCard } from '../components/services/ServiceThemeCard'
import { ArrowLink, Button } from '../components/ui/Button'
import { FadeIn } from '../components/ui/FadeIn'
import { Section, SectionHeader } from '../components/ui/Section'

export function HowWeWork() {
  return (
    <>
      <Section size="hero" className="hero-offset">
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
          description="You might need one theme. You might need a few. Start with the problem that feels most urgent."
        />
        <div className="content-wide grid gap-4 sm:grid-cols-2">
          {serviceThemes.map((theme, i) => (
            <FadeIn key={theme.id} delay={i * 0.04}>
              <ServiceThemeCard theme={theme} />
            </FadeIn>
          ))}
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
          <Button to="/contact">{site.ctaLabel}</Button>
        </FadeIn>
      </Section>
    </>
  )
}
