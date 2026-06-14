import { services } from '../content/services'
import { site } from '../content/site'
import { ServiceCardLink } from '../components/services/ServiceCardLink'
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
            <h1 className="headline-hero">Where we help most.</h1>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-8">
            <p className="body-large mx-auto max-w-[640px]">
              Here is how we help you bring clarity, structure, and momentum to the
              parts of your business that feel messy or overwhelming.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section theme="cream" size="compact" className="pb-28">
        <div className="content-wide space-y-4">
          {services.map((service, i) => (
            <FadeIn key={service.slug} delay={i * 0.04}>
              <ServiceCardLink service={service} variant="row" />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-16 text-center">
          <p className="body-regular mb-6">Not sure where to start?</p>
          <Button to="/contact">{site.ctaLabel}</Button>
        </FadeIn>
      </Section>
    </>
  )
}
