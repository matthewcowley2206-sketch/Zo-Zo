import { type FormEvent, useState } from 'react'
import { site } from '../content/site'
import { Button } from '../components/ui/Button'
import { FadeIn } from '../components/ui/FadeIn'
import { Section } from '../components/ui/Section'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Section size="hero" className="pt-28 sm:pt-32">
        <div className="content-max text-center">
          <FadeIn>
            <p className="eyebrow mb-6">Contact</p>
            <h1 className="headline-hero">Start the conversation.</h1>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-8">
            <p className="body-large mx-auto max-w-[560px]">
              Book a free initial consultation. Tell us what is on your mind - we will
              help you figure out if we are the right fit, and what the first step should look like.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section theme="cream" size="compact" className="pb-28">
        <div className="content-wide grid gap-16 lg:grid-cols-2">
          <FadeIn>
            <div className="space-y-10">
              <div>
                <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-muted-light">
                  Email
                </h2>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 block text-[1.5rem] font-semibold tracking-[-0.02em] text-ink transition-colors hover:text-muted"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-muted-light">
                  Phone
                </h2>
                <a
                  href={`tel:${site.phone.replace(/\s/g, '')}`}
                  className="mt-2 block text-[1.5rem] font-semibold tracking-[-0.02em] text-ink transition-colors hover:text-muted"
                >
                  {site.phone}
                </a>
              </div>
              <div>
                <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-muted-light">
                  Location
                </h2>
                <p className="mt-2 text-[1.125rem] text-ink">{site.location}</p>
                <p className="mt-2 body-regular">
                  Sydney-based · Working across Australia · Online worldwide
                </p>
              </div>
              <div>
                <Button href={site.bookingUrl} external variant="secondary">
                  Book via calendar →
                </Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            {submitted ? (
              <div className="rounded-3xl bg-cream p-10 text-center ring-1 ring-line">
                <h2 className="headline-small">Thank you.</h2>
                <p className="mt-4 body-regular">
                  We have received your message and will be in touch shortly.
                  For something urgent, email us directly at {site.email}.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl bg-cream p-8 sm:p-10 ring-1 ring-line"
              >
                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-[0.8125rem] font-medium text-muted">
                        First name
                      </span>
                      <input
                        required
                        type="text"
                        name="firstName"
                        className="w-full rounded-2xl border-0 bg-cream-dark/80 px-4 py-3.5 text-[1rem] text-ink outline-none ring-1 ring-line transition-shadow focus:ring-ink/30"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[0.8125rem] font-medium text-muted">
                        Last name
                      </span>
                      <input
                        required
                        type="text"
                        name="lastName"
                        className="w-full rounded-2xl border-0 bg-cream-dark/80 px-4 py-3.5 text-[1rem] text-ink outline-none ring-1 ring-line transition-shadow focus:ring-ink/30"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-2 block text-[0.8125rem] font-medium text-muted">
                      Email
                    </span>
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      className="w-full rounded-2xl border-0 bg-cream-dark/80 px-4 py-3.5 text-[1rem] text-ink outline-none ring-1 ring-line transition-shadow focus:ring-ink/30"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[0.8125rem] font-medium text-muted">
                      Mobile number
                    </span>
                    <input
                      type="tel"
                      name="mobile"
                      autoComplete="tel"
                      placeholder="04XX XXX XXX"
                      className="w-full rounded-2xl border-0 bg-cream-dark/80 px-4 py-3.5 text-[1rem] text-ink outline-none ring-1 ring-line transition-shadow placeholder:text-muted-light focus:ring-ink/30"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[0.8125rem] font-medium text-muted">
                      What would you like to talk about?
                    </span>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      className="w-full resize-none rounded-2xl border-0 bg-cream-dark/80 px-4 py-3.5 text-[1rem] text-ink outline-none ring-1 ring-line transition-shadow focus:ring-ink/30"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="mt-8 w-full rounded-full bg-ink px-6 py-3.5 text-[0.9375rem] font-medium text-cream transition-all hover:bg-ink-soft active:scale-[0.99]"
                >
                  Send message
                </button>
                <p className="mt-4 text-center text-[0.8125rem] text-muted-light">
                  We typically respond within one business day.
                </p>
              </form>
            )}
          </FadeIn>
        </div>
      </Section>
    </>
  )
}
