import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  audienceOptions,
  stepGuides,
  synthesizeCommunication,
  waffleParagraphs,
  workflowSteps,
  type CommAudience,
  type WorkflowStepId,
} from './communicationSynthesis'
import { ExerciseShell } from '../exercise/ExerciseShell'
import {
  BeforeAfterDoc,
  DeliverableFrame,
  ProgressBarVisual,
  SlideMock,
} from '../exercise/VisualDeliverables'

export function CommunicationDemo() {
  const [step, setStep] = useState<WorkflowStepId>('redact')
  const [audience, setAudience] = useState<CommAudience>('team')
  const [redacted, setRedacted] = useState<string[]>([])

  const para = waffleParagraphs[audience]
  const allRedacted = redacted.length >= para.segments.length
  const clarityPct = Math.round((redacted.length / para.segments.length) * 100)

  const output = useMemo(
    () => (allRedacted ? synthesizeCommunication({ audience, redactedIds: redacted }) : null),
    [audience, redacted, allRedacted],
  )

  const toggleSegment = (id: string) => {
    setRedacted((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const reset = () => {
    setStep('redact')
    setAudience('team')
    setRedacted([])
  }

  const handlePrimary = () => {
    if (step === 'output') {
      reset()
      return
    }
    if (allRedacted) setStep('output')
  }

  const handleBack = () => setStep('redact')

  const highlightContinue = allRedacted && step === 'redact'

  const nextAction = (() => {
    if (step === 'output') return 'Tap Reset below to try another audience'
    if (redacted.length === 0) {
      return `First tap an audience chip above, then tap any pink crossed-out phrase in the paragraph`
    }
    const next = para.segments.find((s) => !redacted.includes(s.id))
    if (next) {
      return `Tap the next pink phrase (${redacted.length} of ${para.segments.length} fixed)`
    }
    return 'Tap the pulsing See your communication pack button below'
  })()

  return (
    <ExerciseShell
      eyebrow="Sample exercise · Waffle redactor"
      title="Strike the filler. Watch clarity rise."
      intro="Pick your audience, tap corporate phrases to replace them with plain English - then see a before/after doc and slide mock."
      stepIndex={step === 'redact' ? 0 : 1}
      totalSteps={workflowSteps.length}
      guide={stepGuides[step]}
      nextAction={nextAction}
      highlightContinue={highlightContinue}
      subLabel={step === 'redact' ? `${clarityPct}% clear` : 'Deliverables'}
      subProgress={step === 'redact' ? redacted.length : undefined}
      subMax={step === 'redact' ? para.segments.length : undefined}
      showReset={redacted.length > 0 || step === 'output'}
      showBack={step === 'output'}
      primaryLabel={
        step === 'output'
          ? 'Reset · try another audience'
          : !allRedacted
            ? `Redact ${para.segments.length - redacted.length} more phrase${para.segments.length - redacted.length === 1 ? '' : 's'}`
            : 'See your communication pack'
      }
      primaryDisabled={step === 'redact' && !allRedacted}
      isFinal={step === 'output'}
      onReset={reset}
      onBack={handleBack}
      onPrimary={handlePrimary}
      scrollKey={`${step}-${audience}-${redacted.join()}`}
      coachExtra={
        step === 'redact' ? (
          <div className="mt-4">
            <ProgressBarVisual value={redacted.length} max={para.segments.length} label="Clarity meter" color="bg-emerald-400" />
          </div>
        ) : undefined
      }
    >
      <AnimatePresence mode="wait">
        {step === 'redact' && (
          <motion.div key="redact" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="mb-4 flex flex-wrap gap-2">
              {audienceOptions.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => {
                    setAudience(a.id)
                    setRedacted([])
                  }}
                  className={`rounded-full px-3 py-1.5 text-[0.75rem] font-semibold ring-1 transition ${
                    audience === a.id ? 'bg-ink text-cream ring-ink' : 'bg-white text-muted ring-line'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>

            <div className="rounded-2xl bg-white p-5 ring-1 ring-line sm:p-6">
              <p className="text-[0.625rem] font-semibold uppercase text-muted-light">Draft paragraph · tap to fix</p>
              <p className="mt-4 text-[1.0625rem] leading-[1.75] text-ink">
                {para.segments.map((s, i) => {
                  const fixed = redacted.includes(s.id)
                  return (
                    <span key={s.id}>
                      {i > 0 && ' '}
                      <button
                        type="button"
                        onClick={() => toggleSegment(s.id)}
                        className={`rounded px-0.5 transition ${
                          fixed
                            ? 'font-semibold text-emerald-800 underline decoration-emerald-300 decoration-2 underline-offset-4'
                            : 'bg-rose-100/80 text-rose-950 line-through decoration-rose-400 hover:bg-rose-200/80'
                        }`}
                      >
                        {fixed ? s.plain : s.text}
                      </button>
                    </span>
                  )
                })}
              </p>
            </div>
          </motion.div>
        )}

        {step === 'output' && output && (
          <motion.div key="output" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <DeliverableFrame label="Before & after · sample" badge={`Clarity ${output.clarityScore}%`}>
              <BeforeAfterDoc before={output.beforeText} after={output.headline} clarityScore={output.clarityScore} />
            </DeliverableFrame>

            <div className="grid gap-4 lg:grid-cols-2">
              <DeliverableFrame label="Slide mock · sample">
                <SlideMock title={output.headline} bullets={output.talkingPoints} />
              </DeliverableFrame>

              <DeliverableFrame label="FAQ & rollout · sample">
                {output.faqExcerpt.map((f) => (
                  <div key={f.q} className="border-t border-line py-3 first:border-0 first:pt-0">
                    <p className="text-[0.8125rem] font-semibold text-ink">{f.q}</p>
                    <p className="mt-1 text-[0.8125rem] text-muted">{f.a}</p>
                  </div>
                ))}
                <p className="mt-4 rounded-lg bg-cream-dark/60 p-3 text-[0.75rem] text-muted">{output.rolloutTip}</p>
              </DeliverableFrame>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ExerciseShell>
  )
}
