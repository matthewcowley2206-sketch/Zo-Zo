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
  price: number
  included: boolean
}

type View = 'enquiry' | 'generating' | 'scope' | 'tiers' | 'quote' | 'email'

type TierId = 'essential' | 'recommended' | 'full'

const defaultPhases: Phase[] = [
  { id: 'discovery', label: 'Discovery & strategy', weeks: 2, price: 4000, included: true },
  { id: 'brand', label: 'Brand refresh', weeks: 3, price: 9000, included: true },
  { id: 'web', label: 'Web design & build', weeks: 5, price: 12500, included: true },
  { id: 'handover', label: 'Launch & handover', weeks: 1, price: 3000, included: true },
]

const fullPartnershipExtras = 13500
const minQuote = 14000

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
    subtitle: 'Brand + web - balanced',
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

function scopeSubtotal(phases: Phase[]) {
  return phases.filter((p) => p.included).reduce((sum, p) => sum + p.price, 0)
}

function scopeWeeks(phases: Phase[]) {
  return phases.filter((p) => p.included).reduce((sum, p) => sum + p.weeks, 0)
}

function calculateTierPrice(tierId: TierId, phases: Phase[]) {
  const subtotal = scopeSubtotal(phases)
  const brandPhase = phases.find((p) => p.id === 'brand')
  const brandPrice = brandPhase?.included ? brandPhase.price : 0

  switch (tierId) {
    case 'essential':
      return Math.max(subtotal - brandPrice, minQuote)
    case 'recommended':
      return Math.max(subtotal, minQuote)
    case 'full':
      return Math.max(subtotal + fullPartnershipExtras, minQuote)
  }
}

function buildEmailDraft(tierLabel: string, total: number, weeks: number) {
  return {
    subject: `Your Brightline quote · ${tierLabel}`,
    body: `Hi Marcus,

Thanks for your enquiry about the website refresh and brand work. Based on our scope conversation, here's your quote summary:

${tierLabel} · ${formatPrice(total)} ex GST
Timeline · ${weeks} weeks · Target launch before EOFY

You'll find the full breakdown in the preview link below. Happy to adjust scope if you'd like to discuss options.

Preview link: https://quote.brightline.studio/marcus-harbour

Best,
Sarah
Brightline Studio`,
  }
}

function BrightlineApp() {
  const { show } = useDemoAnnotation()
  const { mode } = useDemoGuide()
  const [view, setView] = useState<View>('enquiry')
  const [phases, setPhases] = useState<Phase[]>(defaultPhases)
  const [selectedTier, setSelectedTier] = useState<TierId>('recommended')
  const [previewSent, setPreviewSent] = useState(false)
  const [enquiryRead, setEnquiryRead] = useState(false)
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')

  const enquiryCard = useGuideActivate('enquiry-card')
  const generateBtn = useGuideActivate('generate-btn')
  const scopeToggle = useGuideActivate('scope-toggle')
  const tierRecommended = useGuideActivate('tier-recommended')
  const viewEmailBtn = useGuideActivate('view-email-btn')
  const sendPreviewBtn = useGuideActivate('send-preview-btn')

  const exploreShow = (annotation: Parameters<typeof show>[0]) => {
    if (mode === 'explore') show(annotation)
  }

  const includedPhases = phases.filter((p) => p.included)
  const subtotal = scopeSubtotal(phases)
  const totalWeeks = scopeWeeks(phases)

  const quoteTotal = useMemo(
    () => calculateTierPrice(selectedTier, phases),
    [selectedTier, phases],
  )

  const openEmail = () => {
    const draft = buildEmailDraft(tiers[selectedTier].label, quoteTotal, totalWeeks)
    setEmailSubject(draft.subject)
    setEmailBody(draft.body)
    viewEmailBtn.onGuideAction()
    setView('email')
  }

  useEffect(() => {
    if (view !== 'generating') return
    const id = window.setTimeout(() => setView('scope'), 1600)
    return () => window.clearTimeout(id)
  }, [view])

  const togglePhase = (id: string) => {
    setPhases((prev) => {
      const target = prev.find((p) => p.id === id)
      if (!target) return prev
      if (target.included && prev.filter((p) => p.included).length <= 1) return prev
      return prev.map((p) => (p.id === id ? { ...p, included: !p.included } : p))
    })
  }

  const renderPhaseRow = (phase: Phase, guideWrapped: boolean) => {
    const row = (
      <button
        type="button"
        onClick={() => {
          togglePhase(phase.id)
          if (phase.id === 'brand') scopeToggle.onGuideAction()
        }}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[0.8125rem] ring-1 transition-colors ${
          phase.included
            ? 'bg-teal-50 ring-teal-100 text-teal-950'
            : 'bg-slate-100 ring-slate-200 text-slate-500'
        }`}
      >
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 text-[0.625rem] font-bold leading-none ${
            phase.included
              ? 'border-teal-600 bg-teal-600 text-white'
              : 'border-slate-300 bg-white text-transparent'
          }`}
          aria-hidden
        >
          ✓
        </span>
        <span className={`min-w-0 flex-1 ${phase.included ? '' : 'line-through'}`}>{phase.label}</span>
        <span className="shrink-0 text-[0.75rem] text-slate-500">{phase.weeks} wks</span>
        <span
          className={`shrink-0 font-semibold tabular-nums ${
            phase.included ? 'text-teal-900' : 'text-slate-400 line-through'
          }`}
        >
          {formatPrice(phase.price)}
        </span>
      </button>
    )

    return guideWrapped ? (
      <GuideTarget key={phase.id} id="scope-toggle">
        {row}
      </GuideTarget>
    ) : (
      <div key={phase.id}>{row}</div>
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
            {view === 'email' && 'Review email'}
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
                    <span className="text-slate-500">
                      {formatPrice(phase.price)} · {phase.weeks} wks
                    </span>
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
                Timeline · {totalWeeks} weeks · Target launch before EOFY
              </div>
            </div>

            <GuideTarget id="view-email-btn">
              <DemoButton accentColor={accent} onClick={openEmail}>
                View email
              </DemoButton>
            </GuideTarget>

            <DemoButton accentColor={accent} variant="secondary" onClick={() => setView('tiers')}>
              Change quote option
            </DemoButton>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'email') {
    const tier = tiers[selectedTier]

    return (
      <div className="flex h-full min-h-0 flex-col">
        {header}
        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4">
          <div className="mx-auto max-w-[520px] space-y-3">
            <button
              type="button"
              onClick={() => setView('quote')}
              className="text-[0.8125rem] font-medium text-teal-800 hover:text-teal-950"
            >
              ← Back to quote
            </button>

            <div className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
              <div className="space-y-2 border-b border-slate-100 px-4 py-3 text-[0.75rem]">
                <div className="flex gap-2">
                  <span className="w-14 shrink-0 text-slate-500">From</span>
                  <span className="text-slate-700">Sarah · quotes@brightline.studio</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-14 shrink-0 text-slate-500">To</span>
                  <span className="text-slate-700">Marcus · marcus@harbourgroup.com.au</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-14 shrink-0 text-slate-500">Subject</span>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="min-w-0 flex-1 rounded-md border-0 bg-slate-50 px-2 py-1 text-[0.75rem] text-slate-800 ring-1 ring-slate-200 focus:ring-teal-500"
                  />
                </div>
              </div>

              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={12}
                className="w-full resize-none border-0 bg-white px-4 py-3 text-[0.8125rem] leading-relaxed text-slate-700 focus:outline-none focus:ring-0"
                aria-label="Email message"
              />

              <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">
                <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-500">
                  Attached quote summary
                </p>
                <div className="mt-2 rounded-lg bg-white px-3 py-2 ring-1 ring-slate-200">
                  <p className="text-[0.8125rem] font-semibold text-ink">
                    {tier.label} · {formatPrice(quoteTotal)} ex GST
                  </p>
                  <p className="mt-1 text-[0.75rem] text-slate-600">
                    {includedPhases.map((p) => p.label).join(' · ')} · {totalWeeks} weeks
                  </p>
                </div>
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
            Same scope - pick how you package it for the client.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(tiers) as TierId[]).map((id) => {
              const tier = tiers[id]
              const tierPrice = calculateTierPrice(id, phases)
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
                        ourSolution: `${tier.label} tier - same blocks, different line items and price anchor.`,
                      })
                    }
                  }}
                  className={`flex h-full w-full flex-col rounded-xl bg-white p-3 text-left ring-1 transition-all hover:ring-teal-300 ${
                    selectedTier === id ? 'ring-2 ring-teal-600' : 'ring-slate-200'
                  }`}
                >
                  <div className="mb-2 flex h-5 items-center">
                    {isRecommended && (
                      <span className="rounded-full bg-teal-600 px-2 py-0.5 text-[0.5625rem] font-bold uppercase text-white">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-slate-500">
                    {tier.label}
                  </p>
                  <p className="mt-1 text-[1.125rem] font-bold tabular-nums">{formatPrice(tierPrice)}</p>
                  <p className="mt-auto min-h-[2.75rem] text-[0.75rem] leading-snug text-slate-600">
                    {tier.subtitle}
                    {id !== 'recommended' && (
                      <>
                        <br />
                        Based on your scope
                      </>
                    )}
                  </p>
                </button>
              )

              return (
                <div key={id} className="h-full min-w-0">
                  {isRecommended ? (
                    <GuideTarget id="tier-recommended" className="block h-full">
                      {card}
                    </GuideTarget>
                  ) : (
                    card
                  )}
                </div>
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
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-slate-500">
                  Suggested phases
                </p>
                <p className="text-[0.6875rem] text-slate-500">Tap to include or exclude</p>
              </div>
              <div className="mt-2 space-y-2">
                {phases.map((phase) => renderPhaseRow(phase, phase.id === 'brand'))}
              </div>
              <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-800 px-3 py-2.5 text-white">
                <div>
                  <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-white/70">
                    Scope estimate
                  </p>
                  <p className="text-[0.75rem] text-white/80">
                    {includedPhases.length} phase{includedPhases.length === 1 ? '' : 's'} · {totalWeeks} weeks
                  </p>
                </div>
                <p className="text-[1.125rem] font-bold tabular-nums">{formatPrice(subtotal)}</p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-emerald-700">
                  In scope
                </p>
                <ul className="mt-2 space-y-1 text-[0.75rem] text-slate-700">
                  {includedPhases.length > 0 ? (
                    includedPhases.map((phase) => (
                      <li key={phase.id}>· {phase.label}</li>
                    ))
                  ) : (
                    <li>· Select at least one phase above</li>
                  )}
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

            <DemoButton
              accentColor={accent}
              onClick={() => subtotal > 0 && setView('tiers')}
              className={subtotal === 0 ? 'opacity-50' : ''}
            >
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
