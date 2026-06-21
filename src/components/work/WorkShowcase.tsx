import { projectDemos } from '../../content/demos'
import { site } from '../../content/site'
import { DemoEmbedSettingsProvider } from '../demos/DemoEmbedSettings'
import { ProjectShowcase } from '../demos/ProjectShowcase'
import { Button } from '../ui/Button'
import { CollapsibleSection } from '../ui/CollapsibleSection'
import { FadeIn } from '../ui/FadeIn'
import { Divider, Section } from '../ui/Section'

type WorkShowcaseProps = {
  showIntro?: boolean
  showPageIntro?: boolean
  hideGuideRail?: boolean
  compactLayout?: boolean
}

function ExampleWorkIntro() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="body-large max-w-[540px]">
          These examples show how our method comes to life — clickable prototypes leaders
          can evaluate in context. Names are placeholders where confidentiality applies.
        </p>
      </div>
      <div className="overflow-hidden rounded-3xl bg-ink p-8 text-cream sm:p-10">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-cream/50">
          Not a software agency
        </p>
        <p className="mt-4 text-[1.125rem] leading-relaxed text-cream/85">
          Prototypes here are decision tools — scoped to reduce uncertainty and support
          confident next steps, not products built for launch.
        </p>
      </div>
    </div>
  )
}

export function WorkShowcase({
  showIntro = true,
  showPageIntro = true,
  hideGuideRail = false,
  compactLayout = false,
}: WorkShowcaseProps) {
  const content = (
    <>
      {showIntro && showPageIntro && !compactLayout && (
        <Section size="compact" id="demos" className="scroll-mt-24">
          <div className="content-wide grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <FadeIn>
                <p className="eyebrow mb-6">Example work</p>
                <h2 className="headline-section">
                  Ideas made tangible - tested to support better decisions.
                </h2>
              </FadeIn>
              <FadeIn delay={0.15} className="mt-6 max-w-[540px]">
                <p className="body-large">
                  These examples show how our method comes to life - clickable prototypes and
                  structured work leaders can evaluate in context. Each includes a guided
                  walkthrough. Names are placeholders where confidentiality applies.
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.1}>
              <div className="overflow-hidden rounded-3xl bg-ink p-8 text-cream sm:p-10">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-cream/50">
                  Not a software agency
                </p>
                <p className="mt-4 text-[1.125rem] leading-relaxed text-cream/85">
                  Prototypes here are decision tools - scoped to reduce uncertainty and support
                  confident next steps, not products built for launch.
                </p>
              </div>
            </FadeIn>
          </div>
        </Section>
      )}

      {compactLayout && showIntro && (
        <Section id="demos" className="scroll-mt-24">
          <div className="content-wide">
            <CollapsibleSection
              eyebrow="Example work"
              title="Ideas made tangible — try the prototypes"
              description="Expand an example to read the story and interact with the live prototype."
              defaultOpen
            >
              <ExampleWorkIntro />
              <div className="mt-10 space-y-3">
                {projectDemos.map((demo) => (
                  <CollapsibleSection
                    key={demo.id}
                    id={demo.id}
                    title={demo.clientName}
                    description={demo.headline}
                    defaultOpen={false}
                    size="compact"
                  >
                    <ProjectShowcase demo={demo} reversed={false} compact />
                  </CollapsibleSection>
                ))}
              </div>
            </CollapsibleSection>
          </div>
        </Section>
      )}

      {!compactLayout && (
        <>
          {!showIntro && !showPageIntro && <div id="demos" className="scroll-mt-24" />}

          {projectDemos.map((demo, index) => (
            <div key={demo.id} id={demo.id} className="scroll-mt-24">
              {(showIntro || index > 0) && index > 0 && <Divider />}
              <Section theme={index % 2 === 1 ? 'cream' : 'light'} size={showIntro ? 'default' : 'compact'}>
                <ProjectShowcase demo={demo} reversed={index % 2 === 1} />
              </Section>
            </div>
          ))}
        </>
      )}

      <Section theme="dark" size="compact">
        <FadeIn className="content-max text-center">
          <h2 className="headline-section text-cream">Your idea could be next.</h2>
          <p className="body-large mx-auto mt-5 max-w-[520px] !text-cream/70">
            Happy to share relevant examples under NDA on a call. Tell us what you are
            exploring and we will show you what a working prototype could look like.
          </p>
          <div className="mt-10">
            <Button to="/contact">{site.ctaLabel}</Button>
          </div>
        </FadeIn>
      </Section>
    </>
  )

  if (hideGuideRail) {
    return (
      <DemoEmbedSettingsProvider hideGuideRail>{content}</DemoEmbedSettingsProvider>
    )
  }

  return content
}
