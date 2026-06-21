import { WorkShowcase } from '../components/work/WorkShowcase'
import { FadeIn } from '../components/ui/FadeIn'
import { Section } from '../components/ui/Section'

export function Work() {
  return (
    <>
      <Section size="hero" className="hero-offset">
        <div className="content-max">
          <FadeIn>
            <p className="eyebrow mb-6">Our work</p>
            <h1 className="headline-hero max-w-[900px]">Proof of method, not just prototypes.</h1>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-8 max-w-[720px] space-y-5">
            <p className="body-large">
              The work below shows how ideas can be made tangible, tested and used to support
              better decisions.
            </p>
            <p className="body-regular text-muted">
              Each example connects to our advisory method - from testing an idea before major
              investment to validating growth plans and clarifying strategic direction. Names are
              placeholders where confidentiality applies; the capability is real.
            </p>
          </FadeIn>
        </div>
      </Section>

      <WorkShowcase showIntro={false} showPageIntro={false} />
    </>
  )
}
