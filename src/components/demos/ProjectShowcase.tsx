import type { ProjectDemo } from '../../content/demos'
import { FadeIn } from '../ui/FadeIn'
import { DemoBadge } from './DeviceFrame'
import { DemoRenderer } from './DemoRenderer'

type ProjectShowcaseProps = {
  demo: ProjectDemo
  reversed?: boolean
}

export function ProjectShowcase({ demo, reversed = false }: ProjectShowcaseProps) {
  return (
    <div className="content-wide">
      <div
        className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24 ${
          reversed ? 'lg:[direction:rtl]' : ''
        }`}
      >
        <FadeIn className={reversed ? 'lg:[direction:ltr]' : ''}>
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={demo.humanImage}
              alt={demo.humanImageAlt}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <DemoBadge>{demo.sector}</DemoBadge>
              <p className="mt-3 text-[1.25rem] font-semibold text-white">{demo.clientName}</p>
            </div>
          </div>
        </FadeIn>

        <div className={reversed ? 'lg:[direction:ltr]' : ''}>
          <FadeIn delay={0.08}>
            <p className="eyebrow mb-4">Prototype demo</p>
            <h2 className="headline-small">{demo.headline}</h2>
            <p className="mt-5 body-regular">{demo.summary}</p>
            <dl className="mt-8 space-y-5">
              <div>
                <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.04em] text-muted-light">
                  Challenge
                </dt>
                <dd className="mt-1.5 text-[1rem] leading-relaxed text-ink">{demo.challenge}</dd>
              </div>
              <div>
                <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.04em] text-muted-light">
                  Outcome
                </dt>
                <dd className="mt-1.5 text-[1rem] leading-relaxed text-muted">{demo.outcome}</dd>
              </div>
            </dl>
          </FadeIn>
        </div>
      </div>

      <FadeIn delay={0.12} className="mt-14 lg:mt-20">
        <div className="rounded-3xl bg-cream-dark/80 px-6 py-10 sm:px-10 sm:py-14">
          <div className="mx-auto mb-8 max-w-[540px] text-center">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
              Live prototype
            </p>
            <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink">
              {demo.device === 'desktop'
                ? 'The prototype below is fully interactive. Follow the guided walkthrough - it tells you exactly where to click, and why it mattered to the client.'
                : 'The phone below is fully interactive. Follow the guided walkthrough - it tells you exactly where to tap, and why it mattered to the client.'}
            </p>
          </div>
          <DemoRenderer demoId={demo.id} />
          <p className="mt-6 text-center text-[0.75rem] text-muted-light">
            {demo.clientName} is a placeholder name. Client identity withheld where required.
          </p>
        </div>
      </FadeIn>
    </div>
  )
}

export function ProjectShowcaseCompact({ demo }: { demo: ProjectDemo }) {
  return (
    <FadeIn>
      <div className="overflow-hidden rounded-3xl border border-line bg-cream">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[220px] lg:min-h-[320px]">
            <img
              src={demo.humanImage}
              alt={demo.humanImageAlt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-ink/20" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-[0.8125rem] font-medium uppercase tracking-wider text-white/80">
                {demo.sector}
              </p>
              <p className="text-[1.125rem] font-semibold text-white">{demo.clientName}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <p className="headline-small text-[1.375rem]">{demo.headline}</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{demo.summary}</p>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
