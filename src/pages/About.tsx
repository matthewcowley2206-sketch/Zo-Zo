import { site } from '../content/site'
import { Button, ArrowLink } from '../components/ui/Button'
import { FadeIn } from '../components/ui/FadeIn'
import { Section } from '../components/ui/Section'

export function About() {
  return (
    <>
      <Section size="hero" className="hero-offset">
        <div className="content-max">
          <FadeIn>
            <p className="eyebrow mb-6">About</p>
            <h1 className="headline-hero max-w-[900px]">
              Practical advisory for leaders who need clearer decisions.
            </h1>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-10 max-w-[640px] space-y-6">
            <p className="body-large">
              Zo&Zo Advisory helps leaders move from uncertainty to confidence - through
              understanding, structure, evidence, and a practical way forward.
            </p>
            <p className="body-regular">
              We are not a traditional consulting firm handing over slide decks, and we are not a
              software development agency building products to launch. We are an advisory partner
              that combines client insight, strategy, communication, data and AI thinking, and
              working prototypes when seeing or testing an idea matters.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section theme="cream" size="compact">
        <div className="content-max max-w-[720px]">
          <FadeIn className="space-y-6">
            <h2 className="headline-small">What we believe</h2>
            <p className="body-regular">
              Good decisions need more than ideas. They need a clear view of what is really
              happening - what customers and stakeholders think, where priorities should sit, and
              what evidence exists before you commit significant investment.
            </p>
            <p className="body-regular">
              Our method is simple: Understand what is going on, Structure the opportunity,
              Prototype ideas when validation matters, and Decide with confidence about next steps.
            </p>
            <p className="body-regular">
              Client Listening is often where clarity begins - structured programs that capture the
              voice of the customer, surface honest stakeholder insight, and turn feedback into
              decisions leaders can act on.
            </p>
            <div>
              <ArrowLink to="/services/client-listening">Explore Client Listening</ArrowLink>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section size="compact">
        <div className="content-max max-w-[720px]">
          <FadeIn className="space-y-6">
            <div>
              <p className="text-[1.0625rem] font-semibold text-ink">{site.principalAdvisorTitle}</p>
              <p className="mt-1 text-[0.875rem] text-muted">{site.name}</p>
            </div>
            <p className="body-regular">
              {site.name} is led by a Principal Advisor with more than 20 years&apos; experience
              across commercial strategy, customer insight, sales, growth, aviation, professional
              services and advisory work.
            </p>
            <p className="body-regular">
              After years working with large organisations to streamline processes, make sense of
              data, and deliver go-to-market strategies, that experience is translated into
              something flexible, practical, and human for growing businesses.
            </p>
            <p className="body-regular">
              That is what we do at Zo&Zo Advisory. We ask the right questions, listen properly, and
              help connect the dots so decisions feel lighter and next steps feel obvious - whether
              that means understanding clients, shaping strategy, simplifying operations,
              exploring practical AI, testing a prototype, or planning growth.
            </p>
            <p className="body-regular">
              Sydney-based. Working across Australia and online worldwide.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section theme="dark" size="compact">
        <div className="content-max text-center">
          <FadeIn>
            <blockquote className="headline-section text-cream max-w-[800px] mx-auto">
              &ldquo;Clarity creates momentum - and momentum changes everything.&rdquo;
            </blockquote>
            <p className="mt-6 text-[1.0625rem] text-cream/60">{site.name}</p>
          </FadeIn>
        </div>
      </Section>

      <Section size="compact" className="pb-28">
        <FadeIn className="content-max text-center">
          <h2 className="headline-small">Ready to talk?</h2>
          <p className="body-large mx-auto mt-5 max-w-[520px]">
            Book a free clarity call. We will help you frame the problem and recommend what applies
            - with no pressure to proceed.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button to="/contact">{site.ctaLabel}</Button>
            <ArrowLink to="/how-we-work">See how we work</ArrowLink>
          </div>
        </FadeIn>
      </Section>
    </>
  )
}
