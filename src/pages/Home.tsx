import { Link } from 'react-router-dom'
import { humanImagery, projectDemos } from '../content/demos'
import {
  methodSteps,
  positioning,
  serviceThemes,
  tensionPoints,
} from '../content/method'
import { entitySummary, homeFaqs } from '../content/seo'
import { site } from '../content/site'
import { DemoRenderer } from '../components/demos/DemoRenderer'
import { MethodStepCard } from '../components/method/MethodStepCard'
import { ServiceThemeCard } from '../components/services/ServiceThemeCard'
import { FaqSection } from '../components/seo/FaqSection'
import { ArrowLink, Button } from '../components/ui/Button'
import { FadeIn } from '../components/ui/FadeIn'
import { Divider, Section, SectionHeader } from '../components/ui/Section'

export function Home() {
  const phoenixDemo = projectDemos.find((d) => d.id === 'phoenix-coffee') ?? projectDemos[0]
  const northgateDemo = projectDemos.find((d) => d.id === 'northgate-legal') ?? projectDemos[1]
  const clientListeningTheme = serviceThemes.find((theme) => theme.featured)

  return (
    <>
      <Section size="hero" className="hero-offset">
        <div className="content-wide grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0 text-center lg:text-left">
            <FadeIn>
              <p className="eyebrow mb-6">Zo&Zo Advisory · Sydney · Australia-wide</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="headline-hero-split text-ink">{positioning.headline}</h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-4 text-[1.125rem] font-medium tracking-[-0.01em] text-ink/70">
                {positioning.secondaryTagline}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="body-large mt-6 max-w-[560px] lg:mx-0 mx-auto md:hidden">
                {positioning.subheadMobile}
              </p>
              <p className="body-large mt-6 mx-auto hidden max-w-[560px] md:mx-0 md:block">
                {positioning.subhead}
              </p>
            </FadeIn>
            <FadeIn delay={0.3} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-stretch lg:justify-start">
              <Button to="/contact" className="min-h-12 w-full text-center sm:w-auto sm:whitespace-nowrap">
                {site.ctaLabel}
              </Button>
              <Button
                to="/how-we-work"
                variant="secondarySolid"
                className="min-h-12 w-full whitespace-nowrap sm:w-auto"
              >
                <span>{site.secondaryCtaLabel}</span>
                <span aria-hidden className="shrink-0 text-[1.125rem] leading-none">
                  ›
                </span>
              </Button>
            </FadeIn>
          </div>
          <FadeIn delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={humanImagery.hero}
                alt={humanImagery.heroAlt}
                className="aspect-[4/5] w-full object-cover sm:aspect-[3/4]"
                style={{ objectPosition: humanImagery.heroObjectPosition }}
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
            </div>
          </FadeIn>
        </div>
      </Section>

      <Divider />

      <Section>
        <div className="content-max">
          <FadeIn>
            <h2 className="headline-section max-w-[800px]">
              Uncertainty is expensive. Clarity is how you move forward.
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {tensionPoints.map((point, i) => (
              <FadeIn key={point.title} delay={i * 0.06}>
                <div className="h-full rounded-3xl border border-line/60 bg-cream p-7 sm:p-8">
                  <h3 className="headline-small">{point.title}</h3>
                  <p className="body-regular mt-3">{point.text}</p>
                  <p className="mt-4 text-[0.875rem] font-medium text-ink/70">{point.outcome}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      <Divider />

      <Section theme="dark">
        <SectionHeader
          theme="dark"
          eyebrow="How we help"
          title="Understand → Structure → Prototype → Decide"
          description="Our method reduces uncertainty at each step - so you can commit to what matters with evidence, not guesswork."
        />
        <div className="content-wide grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {methodSteps.map((step, i) => (
            <FadeIn key={step.id} delay={i * 0.08} className="h-full">
              <MethodStepCard step={step} titleAs="h3" />
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-14 text-center">
          <ArrowLink to="/how-we-work" className="!text-cream hover:!text-cream/70">
            {site.secondaryCtaLabel}
          </ArrowLink>
        </FadeIn>
      </Section>

      {clientListeningTheme ? (
        <>
          <Divider />
          <Section theme="cream">
            <div className="content-wide grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <FadeIn>
                <p className="eyebrow mb-4">Flagship capability</p>
                <h2 className="headline-section">{clientListeningTheme.title}</h2>
                <p className="body-large mt-5">{clientListeningTheme.summary}</p>
                <p className="mt-4 text-[0.9375rem] font-medium text-ink/70">
                  {clientListeningTheme.uncertaintyLabel}
                </p>
                <div className="mt-8">
                  <Button to={clientListeningTheme.primaryHref}>Explore Client Listening</Button>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="rounded-3xl bg-white p-8 ring-1 ring-line sm:p-10">
                  <p className="eyebrow mb-4">What you get</p>
                  <ul className="mt-5 space-y-3">
                    {clientListeningTheme.modules.map((module) => (
                      <li key={module.label} className="text-[0.9375rem] text-ink/85">
                        · {module.label}
                      </li>
                    ))}
                  </ul>
                  <p className="body-regular mt-6 text-muted">
                    Structured conversations, honest insight, and leadership-ready findings - so
                    decisions are grounded in what customers and stakeholders actually think.
                  </p>
                </div>
              </FadeIn>
            </div>
          </Section>
        </>
      ) : null}

      <Divider />

      <Section>
        <SectionHeader
          eyebrow="Services"
          title="Four ways we reduce uncertainty."
          description="Each theme connects to practical modules - pick where the pressure is highest, and we will meet you there."
        />
        <div className="content-wide grid gap-4 sm:grid-cols-2">
          {serviceThemes.map((theme, i) => (
            <FadeIn key={theme.id} delay={i * 0.06} className="h-full">
              <ServiceThemeCard theme={theme} />
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-10 text-center">
          <ArrowLink to="/services">View all services</ArrowLink>
        </FadeIn>
      </Section>

      <Divider />

      <Section theme="cream">
        <SectionHeader
          eyebrow="Flagship demonstration"
          title="Test before you invest."
          description="Type a symptom. Get a dynamic diagnosis. See business impact before you commit to a platform."
        />
        <FadeIn className="content-wide">
          <div className="rounded-3xl bg-cream px-6 py-10 sm:px-10 sm:py-14 ring-1 ring-line">
            <p className="mb-8 text-center text-[0.9375rem] text-muted">
              {phoenixDemo.clientName} is a placeholder for a hospitality engagement. Type a symptom
              or tap an example - the diagnosis changes based on what you enter.
            </p>
            <DemoRenderer demoId={phoenixDemo.id} />
            <p className="mt-8 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
              <ArrowLink to="/services/prototype-development#phoenix-coffee">
                Explore Test Before You Invest
              </ArrowLink>
            </p>
          </div>
        </FadeIn>
      </Section>

      <Divider />

      <Section>
        <SectionHeader
          eyebrow="Flagship capability"
          title="Client Listening Intelligence"
          description="Paste stakeholder feedback and see how it becomes executive-ready insight, leadership priorities and recommended actions."
        />
        <FadeIn className="content-wide">
          <div className="rounded-3xl bg-white px-6 py-10 sm:px-10 sm:py-14 ring-1 ring-line">
            <p className="mb-8 text-center text-[0.9375rem] text-muted">
              Illustrated using {northgateDemo.clientName}, a placeholder professional services firm.
              Select your industry, paste feedback or try a sample - the executive insight changes
              based on what you provide.
            </p>
            <DemoRenderer demoId={northgateDemo.id} />
            <p className="mt-8 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
              <ArrowLink to="/services/client-listening">
                Explore Client Listening
              </ArrowLink>
              <span className="hidden text-muted-light sm:inline">·</span>
              <ArrowLink to="/services/prototype-development#northgate-legal">
                Try on example work page
              </ArrowLink>
            </p>
          </div>
        </FadeIn>
      </Section>

      <Section size="compact">
        <FadeIn className="content-max text-center">
          <ArrowLink to="/services/prototype-development">See all prototype demos</ArrowLink>
        </FadeIn>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Our work"
          title="Four prototypes. Two flagship demonstrations."
          description="Phoenix Coffee and Northgate Legal lead - plus Horizon Airways and Brightline Studio. Placeholder names, real capability."
        />
        <div className="content-wide grid gap-6 lg:grid-cols-3">
          {projectDemos.map((demo, i) => (
            <FadeIn key={demo.id} delay={i * 0.08}>
              <Link
                to={`/services/prototype-development#${demo.id}`}
                className="group block overflow-hidden rounded-3xl bg-cream ring-1 ring-line transition hover:ring-ink/20"
              >
                <div className="relative aspect-[16/10]">
                  <img
                    src={demo.humanImage}
                    alt={demo.humanImageAlt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-[0.75rem] font-medium uppercase tracking-wider text-white/80">
                      {demo.sector}
                    </p>
                    <p className="text-[1.125rem] font-semibold text-white">{demo.clientName}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[0.9375rem] leading-relaxed text-muted">{demo.summary}</p>
                  <span className="mt-4 inline-block text-[0.875rem] font-medium text-ink">
                    Try the demo →
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section theme="dark" size="compact">
        <div className="content-max text-center">
          <FadeIn>
            <blockquote className="headline-section text-cream">
              &ldquo;Clarity creates momentum - and momentum changes everything.&rdquo;
            </blockquote>
            <p className="mt-6 text-[1.0625rem] text-cream/60">{site.name}</p>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-10">
            <ArrowLink to="/about" className="!text-cream hover:!text-cream/70">
              More about Zo&Zo
            </ArrowLink>
          </FadeIn>
        </div>
      </Section>

      <Section theme="cream" size="compact">
        <div className="content-max max-w-[720px]">
          <FadeIn>
            <p className="eyebrow mb-4">What is Zo&Zo Advisory?</p>
            <p className="body-large">{entitySummary}</p>
          </FadeIn>
        </div>
      </Section>

      <Section size="compact" className="pb-28 sm:pb-32">
        <div className="content-wide">
          <FaqSection
            eyebrow="Quick answers"
            title="Questions people ask before they reach out."
            items={homeFaqs}
          />
        </div>
      </Section>

      <Section size="compact" className="pb-28 sm:pb-32">
        <div className="content-max text-center">
          <FadeIn>
            <h2 className="headline-section">Start the conversation.</h2>
            <p className="body-large mx-auto mt-5 max-w-[520px]">
              Sydney-based. Working across Australia and online worldwide. Book a free clarity call
              - we will help you figure out if we are the right fit.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Button to="/contact">{site.ctaLabel}</Button>
              <p className="text-[0.9375rem] text-muted">{site.email}</p>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  )
}
