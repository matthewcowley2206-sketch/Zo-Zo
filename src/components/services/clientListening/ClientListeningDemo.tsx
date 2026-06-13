import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  clientQuotes,
  insightPanels,
  measurePanels,
  stepGuides,
  synthesizeListening,
  themeLabels,
  workflowSteps,
  type ActionChoice,
  type QuoteTheme,
  type WorkflowStep,
} from './clientListeningSynthesis'
import {
  ReportSectionCloseLoop,
  ReportSectionEmbed,
  ReportSectionPersona,
  ReportSectionQuotes,
  ReportSectionScores,
  ReportSectionStrategy,
  ReportSectionSummary,
  ReportSectionThemes,
} from './ListeningReportView'
import { NextActionHint } from '../exercise/NextActionHint'

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-line/80">
      <motion.div
        className="h-full rounded-full bg-ink"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />
    </div>
  )
}

function CoachPanel({
  stepIndex,
  guide,
  subLabel,
  subProgress,
  subMax,
  children,
}: {
  stepIndex: number
  guide: (typeof stepGuides)[WorkflowStep]
  subLabel?: string
  subProgress?: number
  subMax?: number
  children?: ReactNode
}) {
  return (
    <div className="rounded-2xl bg-ink p-5 text-cream sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-cream/50">
          Step {stepIndex + 1} of {workflowSteps.length}
          {subLabel ? ` · ${subLabel}` : ''}
        </p>
        {subProgress !== undefined && subMax !== undefined && (
          <p className="text-[0.6875rem] font-medium text-cream/60">
            {subProgress} of {subMax}
          </p>
        )}
      </div>
      <ProgressBar
        value={
          subProgress !== undefined && subMax
            ? stepIndex + subProgress / subMax
            : stepIndex + 1
        }
        max={workflowSteps.length}
      />
      <p className="mt-4 text-[1.0625rem] font-semibold leading-snug">{guide.title}</p>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-cream/85">{guide.instruction}</p>
      {guide.tip && (
        <p className="mt-3 rounded-xl bg-white/10 px-3 py-2.5 text-[0.8125rem] leading-relaxed text-cream/75">
          {guide.tip}
        </p>
      )}
      {children}
    </div>
  )
}

function AiEnabler({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-5 overflow-hidden rounded-xl ring-1 ring-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 bg-white px-4 py-3 text-left transition hover:bg-cream-dark/40"
      >
        <span className="text-[0.8125rem] font-medium text-muted">
          Optional · AI & automation at this stage
        </span>
        <span className="text-[0.75rem] font-semibold text-ink">{open ? 'Hide' : 'Show'}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="bg-slate-800 px-4 py-3 text-[0.8125rem] leading-relaxed text-cream/85">
              <span className="font-semibold text-cream">{label}</span> {children}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ClientListeningDemo() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState<WorkflowStep>('listen')
  const [tags, setTags] = useState<Partial<Record<string, QuoteTheme>>>({})
  const [focusQuoteIndex, setFocusQuoteIndex] = useState(0)
  const [action, setAction] = useState<ActionChoice>('comms')
  const [insightPanel, setInsightPanel] = useState(0)
  const [measurePanel, setMeasurePanel] = useState(0)

  const taggedCount = clientQuotes.filter((q) => tags[q.id]).length
  const allTagged = taggedCount === clientQuotes.length
  const output = useMemo(
    () => (allTagged ? synthesizeListening(tags, action) : null),
    [tags, action, allTagged],
  )

  const stepIndex = workflowSteps.findIndex((s) => s.id === step)
  const guide = stepGuides[step]
  const focusQuote = clientQuotes[focusQuoteIndex]

  const reset = () => {
    setStep('listen')
    setTags({})
    setFocusQuoteIndex(0)
    setAction('comms')
    setInsightPanel(0)
    setMeasurePanel(0)
  }

  const goNext = () => {
    const next = workflowSteps[stepIndex + 1]
    if (next) {
      setStep(next.id)
      setInsightPanel(0)
      setMeasurePanel(0)
    }
  }

  const tagQuote = (quoteId: string, theme: QuoteTheme) => {
    setTags((prev) => {
      const next = { ...prev, [quoteId]: theme }
      const idx = clientQuotes.findIndex((q) => q.id === quoteId)
      let nextIdx = clientQuotes.findIndex((q, i) => i > idx && !next[q.id])
      if (nextIdx < 0) nextIdx = clientQuotes.findIndex((q) => !next[q.id])
      if (nextIdx >= 0 && nextIdx !== idx) {
        window.setTimeout(() => setFocusQuoteIndex(nextIdx), 280)
      }
      return next
    })
  }

  useEffect(() => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [step, focusQuoteIndex, insightPanel, measurePanel])

  const insightsReady = insightPanel >= insightPanels.length - 1
  const measureReady = measurePanel >= measurePanels.length - 1

  const primaryLabel = (() => {
    if (step === 'listen') {
      if (!allTagged) return `Tag quote ${Math.min(taggedCount + 1, clientQuotes.length)} of ${clientQuotes.length}`
      return 'Continue to Extract insights'
    }
    if (step === 'insights') {
      if (!insightsReady) return `Next · ${insightPanels[insightPanel + 1]?.label ?? 'Strategy link'}`
      return 'Continue to Act'
    }
    if (step === 'act') return 'Continue to Close the loop'
    if (step === 'close') return 'Continue to Measure & embed'
    if (step === 'measure') {
      if (!measureReady) return `Next · ${measurePanels[measurePanel + 1]?.label ?? 'Embed'}`
      return 'Reset · run the loop again'
    }
    return 'Continue'
  })()

  const handlePrimary = () => {
    if (step === 'listen' && !allTagged) return
    if (step === 'insights' && !insightsReady) {
      setInsightPanel((p) => p + 1)
      return
    }
    if (step === 'measure' && !measureReady) {
      setMeasurePanel((p) => p + 1)
      return
    }
    if (step === 'measure' && measureReady) {
      reset()
      return
    }
    goNext()
  }

  const primaryDisabled = step === 'listen' && !allTagged

  const highlightContinue =
    (step === 'listen' && allTagged) ||
    (step === 'insights' && insightsReady) ||
    (step === 'act') ||
    (step === 'close') ||
    (step === 'measure' && !measureReady)

  const nextAction = (() => {
    if (step === 'listen') {
      if (!allTagged) {
        return `Tap one theme button below for ${focusQuote?.client ?? 'this client'} (${taggedCount} of ${clientQuotes.length} tagged)`
      }
      return 'Tap the pulsing Continue button below'
    }
    if (step === 'insights') {
      if (!insightsReady) return `Read ${insightPanels[insightPanel + 1]?.label ?? 'the next report section'}, then tap Continue below`
      return 'Tap the pulsing Continue button below'
    }
    if (step === 'act') return 'Pick the response that best fits your report - recommendations update instantly'
    if (step === 'close') return 'Read the client update preview, then tap Continue below'
    if (step === 'measure') {
      if (!measureReady) {
        return `Tap the ${measurePanels[measurePanel + 1]?.label ?? 'next'} tab above, or Continue below`
      }
      return 'Tap Reset below to run the loop again'
    }
    return 'Tap Continue below'
  })()

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-cream-dark/40">
      <div className="border-b border-line bg-cream px-6 py-5 sm:px-8">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
          Sample exercise · 360 client listening
        </p>
        <p className="mt-2 text-[1.125rem] font-semibold text-ink">
          Five steps. One loop. Follow the guide.
        </p>
        <p className="mt-2 max-w-[560px] text-[0.9375rem] leading-relaxed text-muted">
          We will walk you through listen → insights → act → close → measure. Take it one step at a time.
        </p>
      </div>

      <div className="space-y-6 p-6 sm:p-8">
        <CoachPanel
          stepIndex={stepIndex}
          guide={guide}
          subLabel={
            step === 'insights'
              ? insightPanels[insightPanel]?.label
              : step === 'measure'
                ? measurePanels[measurePanel]?.label
                : step === 'listen'
                  ? `Quote ${focusQuoteIndex + 1}`
                  : workflowSteps[stepIndex]?.label
          }
          subProgress={
            step === 'insights'
              ? insightPanel + 1
              : step === 'measure'
                ? measurePanel + 1
                : step === 'listen'
                  ? taggedCount
                  : undefined
          }
          subMax={
            step === 'insights'
              ? insightPanels.length
              : step === 'measure'
                ? measurePanels.length
                : step === 'listen'
                  ? clientQuotes.length
                  : undefined
          }
        >
          {step === 'listen' && (
            <div className="mt-4 flex gap-1.5">
              {clientQuotes.map((q, i) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setFocusQuoteIndex(i)}
                  aria-label={`Quote ${i + 1}${tags[q.id] ? ', tagged' : ''}`}
                  className={`h-2 flex-1 rounded-full transition ${
                    tags[q.id]
                      ? 'bg-emerald-400'
                      : i === focusQuoteIndex
                        ? 'bg-cream'
                        : 'bg-cream/30'
                  }`}
                />
              ))}
            </div>
          )}
        </CoachPanel>

        <NextActionHint action={nextAction} highlightContinue={highlightContinue && !primaryDisabled} />

        <div ref={contentRef}>
          <AnimatePresence mode="wait">
            {step === 'listen' && focusQuote && (
              <motion.div
                key={`listen-${focusQuote.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="rounded-2xl bg-white p-5 ring-2 ring-ink/10 sm:p-6">
                  <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">
                    {focusQuote.client} · {focusQuote.role}
                  </p>
                  <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink sm:text-[1.125rem]">
                    &ldquo;{focusQuote.text}&rdquo;
                  </p>
                  <p className="mt-5 text-[0.8125rem] font-semibold text-ink">
                    What theme do you hear?
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {(Object.keys(themeLabels) as QuoteTheme[]).map((theme) => (
                      <button
                        key={theme}
                        type="button"
                        onClick={() => tagQuote(focusQuote.id, theme)}
                        className={`rounded-xl px-4 py-3 text-left text-[0.8125rem] font-medium ring-1 transition ${
                          tags[focusQuote.id] === theme
                            ? 'bg-ink text-cream ring-ink'
                            : 'bg-cream ring-line hover:ring-ink/25 hover:bg-cream-dark/60'
                        }`}
                      >
                        {themeLabels[theme]}
                      </button>
                    ))}
                  </div>
                </div>

                {taggedCount > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {clientQuotes
                      .filter((q) => tags[q.id])
                      .map((q) => (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => setFocusQuoteIndex(clientQuotes.indexOf(q))}
                          className="rounded-full bg-emerald-50 px-3 py-1 text-[0.6875rem] font-medium text-emerald-900 ring-1 ring-emerald-100"
                        >
                          {q.client.split(' ')[0]} · {themeLabels[tags[q.id]!]}
                        </button>
                      ))}
                  </div>
                )}

                <AiEnabler label="Listen:">
                  Interview guides, theme tagging, sentiment notes synced to CRM, scheduling workflows.
                </AiEnabler>
              </motion.div>
            )}

            {step === 'insights' && output && (
              <motion.div
                key={`insights-${insightPanel}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-5 flex gap-1">
                  {insightPanels.map((panel, i) => (
                    <button
                      key={panel.id}
                      type="button"
                      onClick={() => setInsightPanel(i)}
                      className={`flex-1 rounded-lg px-1 py-2 text-[0.625rem] font-semibold leading-tight transition sm:text-[0.6875rem] ${
                        insightPanel === i
                          ? 'bg-ink text-cream'
                          : i < insightPanel
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-white text-muted ring-1 ring-line'
                      }`}
                    >
                      {panel.label}
                    </button>
                  ))}
                </div>

                <p className="mb-4 text-[0.8125rem] text-muted">
                  {insightPanels[insightPanel]?.instruction}
                </p>

                {insightPanel === 0 && <ReportSectionSummary report={output} />}
                {insightPanel === 1 && <ReportSectionQuotes report={output} />}
                {insightPanel === 2 && <ReportSectionThemes report={output} />}
                {insightPanel === 3 && <ReportSectionStrategy report={output} />}

                <AiEnabler label="Extract insights:">
                  Cross-interview pattern detection, internal vs client gap alerts, draft insight pack for review.
                </AiEnabler>
              </motion.div>
            )}

            {step === 'act' && output && (
              <motion.div
                key="act"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <p className="mb-4 text-[0.8125rem] text-muted">
                  Choose the response that best addresses what you heard. Your report updates below.
                </p>
                <div className="space-y-3">
                  {(
                    [
                      {
                        id: 'comms' as const,
                        title: 'Proactive communication protocol',
                        sub: 'Fix the "found out after the fact" pattern',
                      },
                      {
                        id: 'value' as const,
                        title: 'Value review with key accounts',
                        sub: 'Align on outcomes when delivery wobbles',
                      },
                      {
                        id: 'rhythm' as const,
                        title: 'Quarterly partnership cadence',
                        sub: 'Match partner intent with planned rhythm',
                      },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAction(opt.id)}
                      className={`w-full rounded-2xl p-4 text-left ring-1 transition sm:p-5 ${
                        action === opt.id
                          ? 'bg-ink text-cream ring-ink ring-2'
                          : 'bg-white ring-line hover:ring-ink/20'
                      }`}
                    >
                      <p className="font-semibold">{opt.title}</p>
                      <p
                        className={`mt-1 text-[0.8125rem] ${action === opt.id ? 'text-cream/75' : 'text-muted'}`}
                      >
                        {opt.sub}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl bg-white ring-1 ring-line">
                  <div className="border-b border-line bg-cream-dark/40 px-5 py-3">
                    <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">
                      Report preview · recommended response
                    </p>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-[1.0625rem] font-semibold text-ink">{output.recommendedAction.title}</p>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">{output.recommendedAction.detail}</p>
                    <p className="mt-3 text-[0.8125rem] text-muted">
                      <span className="font-semibold text-ink">Owner:</span> {output.recommendedAction.owner}
                    </p>
                    <p className="mt-3 rounded-lg bg-cream-dark/60 p-3 text-[0.8125rem] leading-relaxed text-muted">
                      {output.recommendedAction.rationale}
                    </p>
                  </div>
                </div>

                <AiEnabler label="Act:">
                  Priority scoring, owner assignment, workflow triggers, leadership action dashboard.
                </AiEnabler>
              </motion.div>
            )}

            {step === 'close' && output && (
              <motion.div
                key="close"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <ReportSectionCloseLoop report={output} />
                <AiEnabler label="Close the loop:">
                  Personalised update drafts, CRM tasks for account owners, audit trail from feedback to action.
                </AiEnabler>
              </motion.div>
            )}

            {step === 'measure' && output && (
              <motion.div
                key={`measure-${measurePanel}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <p className="mb-4 text-[0.8125rem] text-muted">
                  {measurePanels[measurePanel]?.instruction}
                </p>

                <div className="mb-5 flex gap-1">
                  {measurePanels.map((panel, i) => (
                    <button
                      key={panel.id}
                      type="button"
                      onClick={() => setMeasurePanel(i)}
                      className={`flex-1 rounded-lg py-2 text-[0.6875rem] font-semibold transition ${
                        measurePanel === i
                          ? 'bg-ink text-cream'
                          : i < measurePanel
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-white text-muted ring-1 ring-line'
                      }`}
                    >
                      {panel.label}
                    </button>
                  ))}
                </div>

                {measurePanel === 0 && <ReportSectionScores report={output} />}
                {measurePanel === 1 && (
                  <div className="space-y-4">
                    <ReportSectionPersona report={output} />
                    <div className="rounded-2xl bg-white p-5 ring-1 ring-line sm:p-6">
                      <p className="text-[0.6875rem] font-bold uppercase text-muted-light">Intelligent signals</p>
                      <ul className="mt-3 space-y-2">
                        {output.persona.intelligentSignals.map((s) => (
                          <li key={s} className="text-[0.8125rem] leading-relaxed text-muted">
                            · {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                {measurePanel === 2 && <ReportSectionEmbed report={output} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="sticky bottom-0 -mx-6 flex flex-wrap items-center gap-3 border-t border-line bg-cream/95 px-6 py-4 backdrop-blur sm:-mx-8 sm:px-8">
          {stepIndex > 0 && (
            <button
              type="button"
              onClick={() => {
                if (step === 'insights' && insightPanel > 0) {
                  setInsightPanel((p) => p - 1)
                  return
                }
                if (step === 'measure' && measurePanel > 0) {
                  setMeasurePanel((p) => p - 1)
                  return
                }
                const prev = workflowSteps[stepIndex - 1]
                if (prev) {
                  setStep(prev.id)
                  if (prev.id === 'insights') setInsightPanel(insightPanels.length - 1)
                  if (prev.id === 'measure') setMeasurePanel(measurePanels.length - 1)
                }
              }}
              className="rounded-xl px-4 py-2.5 text-[0.8125rem] font-medium text-muted transition hover:bg-white hover:text-ink"
            >
              ← Back
            </button>
          )}

          {(stepIndex > 0 || taggedCount > 0) && (
            <button
              type="button"
              onClick={reset}
              className="hidden rounded-xl border border-line bg-white px-4 py-2.5 text-[0.8125rem] font-semibold text-ink transition hover:bg-cream-dark sm:inline-flex"
            >
              Reset
            </button>
          )}

          <button
            type="button"
            disabled={primaryDisabled}
            onClick={handlePrimary}
            className={`ml-auto rounded-xl px-6 py-3 text-[0.875rem] font-semibold transition active:scale-[0.99] ${
              step === 'measure' && measureReady
                ? 'border-2 border-ink bg-ink text-cream shadow-md hover:bg-ink-soft'
                : primaryDisabled
                  ? 'bg-ink text-cream hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-40'
                  : 'animate-pulse bg-ink text-cream shadow-lg shadow-ink/25 hover:bg-ink-soft hover:animate-none'
            }`}
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
