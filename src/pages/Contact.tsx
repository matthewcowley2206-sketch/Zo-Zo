import { type FormEvent, useState } from 'react'
import { site } from '../content/site'
import { submitContactForm } from '../lib/submitContactForm'
import { Button } from '../components/ui/Button'
import { FadeIn } from '../components/ui/FadeIn'
import { Section } from '../components/ui/Section'

const fieldClassName =
  'field-focus w-full rounded-2xl border-0 bg-cream-dark/80 px-4 py-3.5 text-[1rem] text-ink ring-1 ring-line'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      await submitContactForm({
        firstName: String(data.get('firstName') ?? ''),
        lastName: String(data.get('lastName') ?? ''),
        email: String(data.get('email') ?? ''),
        mobile: String(data.get('mobile') ?? ''),
        message: String(data.get('message') ?? ''),
      })
      setSubmitted(true)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to send your message. Please email matt@zoandzo.com.au directly.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Section size="hero" className="hero-offset">
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
                  className="focus-ring mt-2 block rounded-sm text-[1.5rem] font-semibold tracking-[-0.02em] text-ink transition-colors hover:text-muted"
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
                  className="focus-ring mt-2 block rounded-sm text-[1.5rem] font-semibold tracking-[-0.02em] text-ink transition-colors hover:text-muted"
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
              <div
                role="status"
                aria-live="polite"
                className="rounded-3xl bg-cream p-10 text-center ring-1 ring-line"
              >
                <h2 className="headline-small">Thank you.</h2>
                <p className="mt-4 body-regular">
                  Your message has been sent. We will be in touch shortly - usually within one
                  business day.
                </p>
                <Button
                  href={site.bookingUrl}
                  external
                  variant="secondary"
                  className="mt-8"
                >
                  Or book via calendar →
                </Button>
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
                        disabled={submitting}
                        className={fieldClassName}
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
                        disabled={submitting}
                        className={fieldClassName}
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
                      disabled={submitting}
                      className={fieldClassName}
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
                      disabled={submitting}
                      className={`${fieldClassName} placeholder:text-muted-light`}
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
                      disabled={submitting}
                      className={`${fieldClassName} resize-none`}
                    />
                  </label>
                </div>

                {error && (
                  <p role="alert" className="mt-6 rounded-2xl bg-cream-dark/80 px-4 py-3 text-[0.9375rem] text-ink ring-1 ring-line">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={submitting}
                  className="mt-8 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Sending…' : 'Send message'}
                </Button>
                <p className="mt-4 text-center text-[0.8125rem] text-muted-light">
                  Your message is sent to {site.email}. We typically respond within one business
                  day.
                </p>
              </form>
            )}
          </FadeIn>
        </div>
      </Section>
    </>
  )
}
