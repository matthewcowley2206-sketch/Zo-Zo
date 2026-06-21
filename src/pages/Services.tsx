import { serviceThemes } from '../content/method'
import { site } from '../content/site'
import { ServiceThemeSection } from '../components/services/ServiceThemeSection'
import { FadeIn } from '../components/ui/FadeIn'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'

export function Services() {
  return (
    <>
      <Section size="hero" className="hero-offset">
        <div className="content-max text-center">
          <FadeIn>
            <p className="eyebrow mb-6">Services</p>
            <h1 className="headline-hero">Start with the problem, not the service label.</h1>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-8">
            <p className="body-large mx-auto max-w-[720px]">
              Most leaders arrive with a business challenge - unclear customer insight, too many
              priorities, an idea that needs testing, or growth that feels like guesswork. We
              organise our work around four ways to reduce uncertainty and help you decide with
              confidence.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section theme="cream" size="compact" className="pb-28">
        <div className="content-wide space-y-8">
          {serviceThemes.map((theme, i) => (
            <FadeIn key={theme.id} delay={i * 0.05}>
              <ServiceThemeSection theme={theme} index={i} />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-16 text-center">
          <p className="body-regular mb-2">Not sure which theme fits?</p>
          <p className="body-regular mb-6 text-muted">
            Book a clarity call - we will help you define the problem and recommend what applies.
          </p>
          <Button to="/contact">{site.ctaLabel}</Button>
        </FadeIn>
      </Section>
    </>
  )
}
