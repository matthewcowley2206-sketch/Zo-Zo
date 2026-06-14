import { Link } from 'react-router-dom'
import { humanImagery, projectDemos } from '../content/demos'
import { engagementSteps } from '../content/howWeWork'
import { entitySummary, homeFaqs } from '../content/seo'
import { services } from '../content/services'
import { pillars, site } from '../content/site'
import { DemoRenderer } from '../components/demos/DemoRenderer'
import { ServiceCardLink } from '../components/services/ServiceCardLink'
import { FaqSection } from '../components/seo/FaqSection'
import { ArrowLink, Button } from '../components/ui/Button'
import { FadeIn } from '../components/ui/FadeIn'
import { Divider, Section, SectionHeader } from '../components/ui/Section'

export function Home() {
  const featuredDemo = projectDemos[0]

  return (
    <>
      <Section size="hero" className="hero-offset">
        <div className="content-wide grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0 text-center lg:text-left">
            <FadeIn>
              <p className="eyebrow mb-6">Zo&Zo Advisory · Sydney · Australia-wide</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="headline-hero-split text-ink">
                See your idea working - before you commit to building it.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="body-large mt-6 max-w-[560px] lg:mx-0 mx-auto">
                We help growing business owners cut through noise, make confident decisions,
                and test ideas with working prototypes - not just slide decks.
              </p>
            </FadeIn>
            <FadeIn delay={0.3} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-stretch lg:justify-start">
              <Button to="/contact" className="min-h-12 w-full text-center sm:w-auto sm:whitespace-nowrap">
                {site.ctaLabel}
              </Button>
              <Button
                to="/services/prototype-development#demos"
                variant="secondarySolid"
                className="min-h-12 w-full whitespace-nowrap sm:w-auto"
              >
                <span>Try a prototype demo</span>
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
              Running a business is equal parts vision, pressure, and guesswork.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="mt-8 max-w-[640px] space-y-5">
            <p className="body-large text-ink/90">
              You are not short on ideas. You are short on time.
            </p>
            <p className="body-regular">
              Between leading your team, managing operations, and chasing growth,
              strategy keeps sliding to the bottom of the list. You are not stuck
              because you lack vision - you are stuck because there is too much to
              hold in your head at once.
            </p>
            <p className="text-[1.125rem] font-medium text-ink">
              That is exactly where we come in.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Divider />

      <Section theme="dark">
        <SectionHeader
          theme="dark"
          eyebrow="What makes us different"
          title="We do not just help you decide. We help you see it."
          description="Most advisors hand you a strategy and wish you luck. We go further - with working prototypes that let you click, share, and test before you spend."
        />
        <div className="content-wide grid items-stretch gap-6 sm:grid-cols-3">
          {pillars.map((pillar, i) => (
            <FadeIn key={pillar.title} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-cream/10 bg-cream/[0.04] p-8 sm:p-10">
                <h3 className="headline-small text-cream">{pillar.title}</h3>
                <p className="mt-4 flex-1 text-[1.0625rem] leading-relaxed text-cream/65">
                  {pillar.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-14 text-center">
          <ArrowLink to="/services/prototype-development" className="!text-cream hover:!text-cream/70">
            Explore Prototype Development
          </ArrowLink>
        </FadeIn>
      </Section>

      <Section theme="cream">
        <SectionHeader
          eyebrow="Prototype Development"
          title="Click through a real example."
          description={`${featuredDemo.clientName} is a placeholder for an aviation engagement. Try the check-in flow below - or explore the full Prototype Development service.`}
        />
        <FadeIn className="content-wide">
          <div className="rounded-3xl bg-cream px-6 py-10 sm:px-10 sm:py-14 ring-1 ring-line">
            <DemoRenderer demoId={featuredDemo.id} />
            <p className="mt-8 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
              <ArrowLink to="/services/prototype-development#horizon-airways">See all prototype demos</ArrowLink>
              <span className="hidden text-muted-light sm:inline">·</span>
              <ArrowLink to="/services/prototype-development">About this service</ArrowLink>
            </p>
          </div>
        </FadeIn>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="How we work"
          title="We understand your business first - then recommend what fits."
          description="Every engagement starts with listening, not pitching. We learn how you operate, identify what matters, and discuss which services apply."
        />
        <div className="content-wide space-y-0">
          {engagementSteps.slice(0, 3).map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.05}>
              <div className="grid gap-4 border-b border-line py-8 sm:grid-cols-[80px_1fr_2fr] sm:gap-8 sm:py-10">
                <span className="text-[0.8125rem] font-medium tabular-nums text-muted-light">
                  {step.number}
                </span>
                <h3 className="headline-small">{step.title}</h3>
                <p className="body-regular sm:max-w-[480px]">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-12 text-center">
          <Button to="/how-we-work" variant="secondary">
            How we work
          </Button>
        </FadeIn>
      </Section>

      <Divider />

      <Section>
        <SectionHeader
          eyebrow="Services"
          title="Where we help most."
          description="Pick the area that feels messiest right now. We will meet you there."
        />
        <div className="content-wide grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <FadeIn key={service.slug} delay={i * 0.04}>
              <ServiceCardLink service={service} variant="tile" />
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
          eyebrow="Our work"
          title="Three prototypes. Three industries."
          description="Horizon Airways, Phoenix Coffee, and Northgate Legal - placeholder names, real capability."
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
            <p className="mt-6 text-[1.0625rem] text-cream/60">
              Matthew Cowley · Founder, Zo&Zo Advisory
            </p>
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
              Sydney-based. Working across Australia and online worldwide.
              Book a free initial consultation - we will help you figure out if we are the right fit.
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
