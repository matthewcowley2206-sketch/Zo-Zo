import { projectDemos } from '../../content/demos'
import { ProjectShowcase } from '../demos/ProjectShowcase'
import { Button } from '../ui/Button'
import { FadeIn } from '../ui/FadeIn'
import { Divider, Section } from '../ui/Section'

type WorkShowcaseProps = {
  showIntro?: boolean
}

export function WorkShowcase({ showIntro = true }: WorkShowcaseProps) {
  return (
    <>
      {showIntro && (
        <Section size="compact" id="demos">
          <div className="content-wide grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <FadeIn>
                <p className="eyebrow mb-6">Example prototypes</p>
                <h2 className="headline-section">See it working before you build it.</h2>
              </FadeIn>
              <FadeIn delay={0.15} className="mt-6 max-w-[540px]">
                <p className="body-large">
                  These are working prototypes built for real engagements. Each one includes a
                  guided walkthrough - follow the steps, tap the glowing areas in the phone, and
                  read the notes that appear. Names are placeholders where confidentiality applies.
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.1}>
              <div className="overflow-hidden rounded-3xl bg-ink p-8 text-cream sm:p-10">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-cream/50">
                  How we work
                </p>
                <p className="mt-4 text-[1.125rem] leading-relaxed text-cream/85">
                  Clickable prototypes your stakeholders can use in context - not slides about what
                  something might feel like.
                </p>
              </div>
            </FadeIn>
          </div>
        </Section>
      )}

      {!showIntro && <div id="demos" className="scroll-mt-24" />}

      {projectDemos.map((demo, index) => (
        <div key={demo.id} id={demo.id} className="scroll-mt-24">
          {(showIntro || index > 0) && index > 0 && <Divider />}
          <Section theme={index % 2 === 1 ? 'cream' : 'light'} size={showIntro ? 'default' : 'compact'}>
            <ProjectShowcase demo={demo} reversed={index % 2 === 1} />
          </Section>
        </div>
      ))}

      <Section theme="dark" size="compact">
        <FadeIn className="content-max text-center">
          <h2 className="headline-section text-cream">Your idea could be next.</h2>
          <p className="body-large mx-auto mt-5 max-w-[520px] !text-cream/70">
            Happy to share relevant examples under NDA on a call. Tell us what you are
            exploring and we will show you what a working prototype could look like.
          </p>
          <div className="mt-10">
            <Button to="/contact">Book a free clarity call</Button>
          </div>
        </FadeIn>
      </Section>
    </>
  )
}
