import { methodSteps } from '../content/method'
import {
  antiPositioning,
  clientListeningSpotlight,
  engagementFaq,
  engagementStartSteps,
  howWeWorkPage,
  sampleOutputs,
  technologySection,
} from '../content/howWeWork'
import { serviceThemes } from '../content/method'
import { site } from '../content/site'
import { ServiceThemeCard } from '../components/services/ServiceThemeCard'
import { ArrowLink, Button } from '../components/ui/Button'
import { FadeIn } from '../components/ui/FadeIn'
import { Divider, Section, SectionHeader } from '../components/ui/Section'

export function HowWeWork() {
  return (
    <>
      <Section size="hero" className="hero-offset">
        <div className="content-max">
          <FadeIn>
            <p className="eyebrow mb-6">How we work</p>
            <h1 className="headline-hero max-w-[900px]">{howWeWorkPage.heroTitle}</h1>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-8 max-w-[640px]">
            <p className="body-large">{howWeWorkPage.intro}</p>
          </FadeIn>
        </div>
      </Section>

      <Section theme="dark">
        <SectionHeader
          theme="dark"
          align="left"
          eyebrow="The Zo&Zo Method"
          title="Understand → Structure → Prototype → Decide"
          description="Every engagement follows the same logic - whether you need client insight, strategic clarity, a working prototype, or growth planning."
        />
        <div className="content-wide grid gap-6 sm:grid-cols-2">
          {methodSteps.map((step, i) => (
            <FadeIn key={step.id} delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-cream/10 bg-cream/[0.04] p-8 sm:p-9">
                <span className="text-[0.8125rem] font-medium tabular-nums text-cream/45">
                  {step.number}
                </span>
                <h2 className="headline-small mt-3 text-cream">{step.title}</h2>
                <p className="mt-4 flex-1 text-[1.0625rem] leading-relaxed text-cream/70">
                  {step.description}
                </p>
                <p className="mt-5 text-[0.8125rem] leading-relaxed text-cream/45">
                  {step.uncertainty}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section theme="cream" size="compact">
        <div className="content-max max-w-[720px]">
          <FadeIn>
            <h2 className="headline-section">{technologySection.title}</h2>
            <p className="body-large mt-6">{technologySection.body}</p>
          </FadeIn>
        </div>
      </Section>

      <Section size="compact">
        <div className="content-max max-w-[720px]">
          <FadeIn>
            <h2 className="headline-section">{antiPositioning.title}</h2>
            <p className="body-large mt-6">{antiPositioning.body}</p>
          </FadeIn>
        </div>
      </Section>

      <Divider />

      <Section theme="cream" size="compact">
        <SectionHeader
          align="left"
          eyebrow="Getting started"
          title="How an engagement starts"
          description="Simple steps from first conversation to confident next steps."
        />
        <div className="content-wide space-y-0">
          {engagementStartSteps.map((step, i) => (
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
        <FadeIn className="mt-10 text-center">
          <Button to="/contact">{site.ctaLabel}</Button>
        </FadeIn>
      </Section>

      <Section>
        <div className="content-wide grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p className="eyebrow mb-4">Flagship capability</p>
            <h2 className="headline-section">{clientListeningSpotlight.title}</h2>
            <p className="body-large mt-5">{clientListeningSpotlight.body}</p>
            <ul className="mt-6 space-y-2">
              {clientListeningSpotlight.points.map((point) => (
                <li key={point} className="text-[0.9375rem] text-ink/85">
                  · {point}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ArrowLink to={clientListeningSpotlight.href}>Explore Client Listening</ArrowLink>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-3xl border border-line/60 bg-cream p-8 sm:p-10">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-light">
                Typical outputs
              </p>
              <p className="body-regular mt-4">
                Listening programs produce leadership insight packs, NPS and CSAT frameworks,
                stakeholder themes, and a clear line of sight to strategy - not reports that gather
                dust.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section theme="cream" size="compact">
        <SectionHeader
          align="left"
          eyebrow="What you receive"
          title="Example outputs from our work"
          description="Every engagement is scoped to your outcome. These are typical artefacts - not a fixed menu."
        />
        <div className="content-wide grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sampleOutputs.map((output, i) => (
            <FadeIn key={output.title} delay={i * 0.04}>
              <div className="h-full rounded-3xl border border-line/60 bg-white p-6 sm:p-7">
                <h3 className="text-[1rem] font-semibold text-ink">{output.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{output.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Where this applies"
          title="Four ways we reduce uncertainty."
          description="The method connects to practical capabilities - start with the problem that feels most urgent."
        />
        <div className="content-wide grid gap-4 sm:grid-cols-2">
          {serviceThemes.map((theme, i) => (
            <FadeIn key={theme.id} delay={i * 0.04}>
              <ServiceThemeCard theme={theme} />
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <ArrowLink to="/services">View all services</ArrowLink>
          <span className="hidden text-muted-light sm:inline">·</span>
          <ArrowLink to="/work">See example work</ArrowLink>
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
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-cream/65">{item.answer}</p>
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
