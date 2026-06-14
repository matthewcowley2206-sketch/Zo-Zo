import { useEffect, useMemo, useState } from 'react'
import { useDemoAnnotation } from './DemoAnnotations'
import { GuideTarget, useDemoGuide, useGuideActivate } from './DemoGuide'
import { DemoButton, DemoPill } from './DeviceFrame'
import { InteractiveDemoShell } from './InteractiveDemoShell'

const accent = '#0f766e'

const SAMPLE_ENQUIRY = `Hi Brightline team,

We need to refresh our website and maybe some brand stuff. We're a B2B services firm (~40 staff). Budget is flexible but we'd like to keep it sensible.

Ideally something live before EOFY. Can you send a quote?

Thanks,
Marcus · Ops Director`

type Phase = {
  id: string
  label: string
  weeks: number
  included: boolean
}

type View = 'enquiry' | 'generating' | 'scope' | 'tiers' | 'quote'

type TierId = 'essential' | 'recommended' | 'full'

const defaultPhases: Phase[] = [
  { id: 'discovery', label: 'Discovery & strategy', weeks: 2, included: true },
  { id: 'brand', label: 'Brand refresh', weeks: 3, included: true },
  { id: 'web', label: 'Web design & build', weeks: 5, included: true },
  { id: 'handover', label: 'Launch & handover', weeks: 1, included: true },
]

const tiers: Record<
  TierId,
  { label: string; subtitle: string; basePrice: number; extras: string[] }
> = {
  essential: {
    label: 'Essential',
    subtitle: 'Core web refresh only',
    basePrice: 18500,
    extras: ['Discovery workshop', 'Responsive web build', 'CMS handover'],
  },
  recommended: {
    label: 'Recommended',
    subtitle: 'Brand + web — balanced',
    basePrice: 28500,
    extras: ['Brand refresh', 'Content support', '2 rounds of revisions'],
  },
  full: {
    label: 'Full partnership',
    subtitle: 'Brand, web, and post-launch',
    basePrice: 42000,
    extras: ['Full brand system', 'Copywriting', '3 months support'],
  },
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function BrightlineApp() {
  const { show } = useDemoAnnotation()
  const { mode } = useDemoGuide()
  const [view, setView] = useState<View>('enquiry')
  const [phases, setPhases] = useState<Phase[]>(defaultPhases)
  const [selectedTier, setSelectedTier] = useState<TierId>('recommended')
  const [previewSent, setPreviewSent] = useState(false)
  const [enquiryRead, setEnquiryRead] = useState(false)

  const enquiryCard = useGuideActivate('enquiry-card')
  const generateBtn = useGuideActivate('generate-btn')
  const scopeToggle = useGuideActivate('scope-toggle')
  const tierRecommended = useGuideActivate('tier-recommended')
  const sendPreviewBtn = useGuideActivate('send-preview-btn')

  const exploreShow = (annotation: Parameters<typeof show>[0]) => {
    if (mode === 'explore') show(annotation)
  }

  const includedPhases = phases.filter((p) => p.included)
  const brandIncluded = phases.find((p) => p.id === 'brand')?.included ?? true

  const quoteTotal = useMemo(() => {
    const tier = tiers[selectedTier]
    let total = tier.basePrice
    if (!brandIncluded && selectedTier !== 'essential') {
      total -= 4500
    }
    if (includedPhases.length < 3) {
      total -= 1200
    }
    return Math.max(total, 14000)
  }, [selectedTier, brandIncluded, includedPhases.length])

  useEffect(() => {
    if (view !== 'generating') return
    const id = window.setTimeout(() => setView('scope'), 1600)
    return () => window.clearTimeout(id)
  }, [view])

  const togglePhase = (id: string) => {
    setPhases((prev) =>
      prev.map((p) => (p.id === id ? { ...p, included: !p.included } : p)),
    )
  }

  const header = (
    <div className="shrink-0 border-b border-slate-200 px-5 py-3" style={{ backgroundColor: accent }}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.625rem] font-medium uppercase tracking-wider text-white/70">
            Brightline Studio · Scope builder
          </p>
          <h3 className="text-[0.9375rem] font-semibold text-white">
            {view === 'enquiry' && 'New enquiry'}
            {view === 'generating' && 'Drafting scope…'}
            {view === 'scope' && 'Scope draft'}
            {view === 'tiers' && 'Quote options'}
            {view === 'quote' && 'Quote preview'}
          </h3>
        </div>
        <DemoPill color="green">Simulated</DemoPill>
      </div>
    </div>
  )

  if (view === 'quote') {
    const tier = tiers[selectedTier]
    return (
      <div className="flex h-full min-h-0 flex-col">
        {header}
        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4">
          <div className="mx-auto max-w-[520px] space-y-3">
            <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-slate-500">
                    Quote · {tier.label}
                  </p>
                  <p className="mt-1 text-[1.375rem] font-bold text-ink">{formatPrice(quoteTotal)}</p>
                  <p className="mt-1 text-[0.75rem] text-slate-500">Ex GST · Valid 14 days</p>
                </div>
                <DemoPill color="green">{selectedTier === 'recommended' ? 'Selected' : tier.label}</DemoPill>
              </div>
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                {includedPhases.map((phase) => (
                  <div key={phase.id} className="flex justify-between text-[0.8125rem]">
                    <span>{phase.label}</span>
                    <span className="text-slate-500">{phase.weeks} wks</span>
                  </div>
                ))}
                {tier.extras.map((extra) => (
                  <div key={extra} className="flex justify-between text-[0.8125rem] text-slate-600">
                    <span>{extra}</span>
                    <span className="text-emerald-600">Included</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-teal-50 px-3 py-2 text-[0.75rem] text-teal-900">
                Timeline · {includedPhases.reduce((sum, p) => sum + p.weeks, 0)} weeks · Target launch before EOFY
              </div>
            </div>

            {previewSent ? (
              <div className="rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                <p className="font-semibold text-emerald-900">Preview sent to Marcus</p>
                <p className="mt-1 text-[0.8125rem] text-emerald-700">
                  Link copied · Team notified · CRM note drafted
                </p>
              </div>
            ) : (
              <GuideTarget id="send-preview-btn">
                <DemoButton
                  accentColor={accent}
                  onClick={() => {
                    sendPreviewBtn.onGuideAction()
                    setPreviewSent(true)
                  }}
                >
                  Send preview
                </DemoButton>
              </GuideTarget>
            )}

            <DemoButton accentColor={accent} variant="secondary" onClick={() => setView('tiers')}>
              Change quote option
            </DemoButton>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'tiers') {
    return (
      <div className="flex h-full min-h-0 flex-col">
        {header}
        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4">
          <p className="mb-3 text-[0.8125rem] text-slate-600">
            Same scope — pick how you package it for the client.
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {(Object.keys(tiers) as TierId[]).map((id) => {
              const tier = tiers[id]
              const isRecommended = id === 'recommended'
              const card = (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTier(id)
                    if (isRecommended) tierRecommended.onGuideAction()
                    setView('quote')
                    if (!isRecommended) {
                      exploreShow({
                        id: `tier-${id}`,
                        clientAsk: 'flexible packaging without rewriting scope from scratch.',
                        ourSolution: `${tier.label} tier — same blocks, different line items and price anchor.`,
                      })
                    }
                  }}
                  className={`rounded-xl bg-white p-3 text-left ring-1 transition-all hover:ring-teal-300 ${
                    selectedTier === id ? 'ring-2 ring-teal-600' : 'ring-slate-200'
                  } ${isRecommended ? 'relative' : ''}`}
                >
                  {isRecommended && (
                    <span className="absolute -top-2 left-3 rounded-full bg-teal-600 px-2 py-0.5 text-[0.5625rem] font-bold uppercase text-white">
                      Popular
                    </span>
                  )}
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-slate-500">
                    {tier.label}
                  </p>
                  <p className="mt-1 text-[1.125rem] font-bold">{formatPrice(tier.basePrice)}</p>
                  <p className="mt-1 text-[0.75rem] text-slate-600">{tier.subtitle}</p>
                </button>
              )

              return isRecommended ? (
                <GuideTarget key={id} id="tier-recommended">
                  {card}
                </GuideTarget>
              ) : (
                <div key={id}>{card}</div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  if (view === 'generating') {
    return (
      <div className="flex h-full min-h-0 flex-col">
        {header}
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center bg-slate-50 p-6">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-teal-200 border-t-teal-600" />
          <p className="mt-4 text-[0.9375rem] font-semibold text-ink">Turning enquiry into scope…</p>
          <p className="mt-1 text-[0.8125rem] text-slate-500">
            Phases · assumptions · questions to confirm
          </p>
        </div>
      </div>
    )
  }

  if (view === 'scope') {
    return (
      <div className="flex h-full min-h-0 flex-col">
        {header}
        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4">
          <div className="space-y-3">
            <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-slate-500">
                What we understood
              </p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-slate-700">
                B2B services firm (~40 staff) needs website refresh with possible brand work. Flexible
                budget, hard EOFY deadline. Decision-maker: Marcus (Ops).
              </p>
            </div>

            <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-slate-500">
                Suggested phases
              </p>
              <div className="mt-2 space-y-2">
                {phases.map((phase) => {
                  const row = (
                    <button
                      type="button"
                      onClick={() => {
                        togglePhase(phase.id)
                        if (phase.id === 'brand') scopeToggle.onGuideAction()
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[0.8125rem] ring-1 transition-colors ${
                        phase.included
                          ? 'bg-teal-50 ring-teal-100 text-teal-950'
                          : 'bg-slate-100 ring-slate-200 text-slate-500 line-through'
                      }`}
                    >
                      <span>{phase.label}</span>
                      <span className="text-[0.75rem]">{phase.weeks} wks</span>
                    </button>
                  )

                  return phase.id === 'brand' ? (
                    <GuideTarget key={phase.id} id="scope-toggle">
                      {row}
                    </GuideTarget>
                  ) : (
                    <div key={phase.id}>{row}</div>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-emerald-700">
                  In scope
                </p>
                <ul className="mt-2 space-y-1 text-[0.75rem] text-slate-700">
                  <li>· Responsive site · CMS · Brand guidelines if selected</li>
                  <li>· Stakeholder workshops · Launch support</li>
                </ul>
              </div>
              <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-amber-700">
                  Out of scope
                </p>
                <ul className="mt-2 space-y-1 text-[0.75rem] text-slate-700">
                  <li>· Paid media · Photography shoot · ERP integration</li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl bg-amber-50 p-3 ring-1 ring-amber-100">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-amber-900">
                Assumptions
              </p>
              <p className="mt-1 text-[0.8125rem] text-amber-950">
                Client provides logo assets · 2 revision rounds · Content sign-off within 5 business days
              </p>
            </div>

            <DemoButton accentColor={accent} onClick={() => setView('tiers')}>
              Continue to quote options
            </DemoButton>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      {header}
      <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4">
        <div className="mb-3 flex items-center gap-2 text-[0.75rem] text-slate-500">
          <span className="rounded-full bg-slate-200 px-2 py-0.5 font-medium">Inbox</span>
          <span>Marcus · B2B services · Received 9:14am</span>
        </div>

        <GuideTarget id="enquiry-card">
          <button
            type="button"
            onClick={() => {
              enquiryCard.onGuideAction()
              setEnquiryRead(true)
            }}
            className={`w-full rounded-xl bg-white p-4 text-left ring-1 transition-shadow ${
              enquiryRead ? 'ring-teal-300' : 'ring-slate-200'
            }`}
          >
            <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-slate-500">
              Customer enquiry
            </p>
            <pre className="mt-3 whitespace-pre-wrap font-sans text-[0.8125rem] leading-relaxed text-slate-700">
              {SAMPLE_ENQUIRY}
            </pre>
          </button>
        </GuideTarget>

        <div className="mt-4">
          <GuideTarget id="generate-btn">
            <DemoButton
              accentColor={accent}
              onClick={() => {
                generateBtn.onGuideAction()
                setView('generating')
              }}
            >
              Turn into scope
            </DemoButton>
          </GuideTarget>
        </div>
      </div>
    </div>
  )
}

export function BrightlineStudioDemo() {
  return (
    <InteractiveDemoShell demoId="brightline-studio" accentColor={accent}>
      <BrightlineApp />
    </InteractiveDemoShell>
  )
}
