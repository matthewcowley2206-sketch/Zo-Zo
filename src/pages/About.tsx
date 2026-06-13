import { Button } from '../components/ui/Button'
import { FadeIn } from '../components/ui/FadeIn'
import { Section } from '../components/ui/Section'
import { humanImagery } from '../content/demos'

export function About() {
  return (
    <>
      <Section size="hero" className="pt-28 sm:pt-32">
        <div className="content-max">
          <FadeIn>
            <p className="eyebrow mb-6">About</p>
            <h1 className="headline-hero max-w-[900px]">
              Turning big-business thinking into practical results.
            </h1>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-10 max-w-[640px] space-y-6">
            <p className="body-large">
              Zo&Zo Advisory was built for business owners who are juggling more than
              anyone realises - and just need someone to help make the path forward clearer.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section theme="cream" size="compact">
        <div className="content-max grid gap-16 lg:grid-cols-5">
          <FadeIn className="lg:col-span-2">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl">
              <img
                src={humanImagery.about}
                alt={humanImagery.aboutAlt}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="mt-4 text-center text-[0.9375rem] font-semibold text-ink lg:text-left">
              Matthew Cowley
            </p>
            <p className="text-center text-[0.875rem] text-muted lg:text-left">
              Founder, Zo&Zo Advisory
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-3 space-y-6">
            <h2 className="headline-small">
              We are here to take what is already in your head and turn it into something
              structured, simple, and achievable.
            </h2>
            <p className="body-regular">
              After years working with large organisations to streamline processes, make sense
              of data, and deliver go-to-market strategies, I saw how much of that experience
              could help smaller businesses - if it was translated into something flexible and human.
            </p>
            <p className="body-regular">
              That is what we do at Zo&Zo Advisory. We ask the right questions, we listen,
              and we help connect the dots so your decisions feel lighter and your next steps
              feel obvious.
            </p>
            <p className="body-regular">
              Our role is to bring order to the chaos and help you move with confidence -
              whether that means listening to your clients, refining your strategy, making sense
              of your data, or building a working prototype before you commit to development.
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
            <p className="mt-6 text-[1.0625rem] text-cream/60">Matthew Cowley</p>
          </FadeIn>
        </div>
      </Section>

      <Section size="compact" className="pb-28">
        <FadeIn className="content-max text-center">
          <h2 className="headline-small">In this together.</h2>
          <p className="body-large mx-auto mt-5 max-w-[520px]">
            We see every business we work with as part of our journey too. Your goals become
            ours, and we will work side by side to help you grow with clarity and confidence.
          </p>
          <div className="mt-10">
            <Button to="/contact">Book a free clarity call</Button>
          </div>
        </FadeIn>
      </Section>
    </>
  )
}
