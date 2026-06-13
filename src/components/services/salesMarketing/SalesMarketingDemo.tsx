import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  funnelStages,
  positioningTiles,
  stepGuides,
  synthesizeSalesMarketing,
  workflowSteps,
  type Audience,
  type Differentiator,
  type FunnelStage,
  type Value,
  type WorkflowStepId,
} from './salesMarketingSynthesis'
import { ExerciseShell } from '../exercise/ExerciseShell'
import {
  DeliverableFrame,
  FunnelVisual,
  ProgressBarVisual,
  StatPill,
} from '../exercise/VisualDeliverables'

export function SalesMarketingDemo() {
  const [step, setStep] = useState<WorkflowStepId>('funnel')
  const [leaks, setLeaks] = useState<FunnelStage[]>([])
  const [audience, setAudience] = useState<Audience | null>(null)
  const [value, setValue] = useState<Value | null>(null)
  const [differentiator, setDifferentiator] = useState<Differentiator | null>(null)
  const [outputTab, setOutputTab] = useState<'position' | 'journey'>('position')

  const stepIndex = workflowSteps.findIndex((s) => s.id === step)
  const positioningComplete = audience && value && differentiator
  const funnelComplete = leaks.length >= 2
  const complete = funnelComplete && positioningComplete

  const output = useMemo(
    () =>
      complete
        ? synthesizeSalesMarketing({
            leaks,
            audience: audience!,
            value: value!,
            differentiator: differentiator!,
          })
        : null,
    [leaks, audience, value, differentiator, complete],
  )

  const toggleLeak = (id: FunnelStage) => {
    setLeaks((prev) => {
      if (prev.includes(id)) return prev.filter((l) => l !== id)
      if (prev.length >= 2) return [prev[1], id]
      return [...prev, id]
    })
  }

  const reset = () => {
    setStep('funnel')
    setLeaks([])
    setAudience(null)
    setValue(null)
    setDifferentiator(null)
    setOutputTab('position')
  }

  const handlePrimary = () => {
    if (step === 'output') {
      if (outputTab === 'position') {
        setOutputTab('journey')
        return
      }
      reset()
      return
    }
    setStep(workflowSteps[stepIndex + 1].id)
  }

  const handleBack = () => {
    if (step === 'output' && outputTab === 'journey') {
      setOutputTab('position')
      return
    }
    setStep(workflowSteps[stepIndex - 1].id)
  }

  const canAdvance =
    (step === 'funnel' && funnelComplete) ||
    (step === 'position' && positioningComplete) ||
    step === 'output'

  const primaryLabel =
    step === 'funnel' && !funnelComplete
      ? `Mark ${2 - leaks.length} leak point${leaks.length === 1 ? '' : 's'} on the funnel`
      : step === 'position' && !positioningComplete
        ? 'Pick one tile in each row'
        : step === 'output' && outputTab === 'position'
          ? 'Next · Journey & cadence'
          : step === 'output'
            ? 'Reset · try another journey'
            : `Continue to ${workflowSteps[stepIndex + 1]?.label ?? 'next'}`

  const highlightContinue =
    (step === 'funnel' && funnelComplete) ||
    (step === 'position' && !!positioningComplete) ||
    (step === 'output' && outputTab === 'position')

  const nextAction = (() => {
    if (step === 'funnel') {
      if (leaks.length < 2) {
        const stage = funnelStages.find((s) => !leaks.includes(s.id))
        return `Tap Mark leak under ${stage?.label ?? 'a stage'} (${leaks.length} of 2 done)`
      }
      return 'Tap the pulsing Continue button below'
    }
    if (step === 'position') {
      if (!audience) return 'Tap a yellow tile in the Who row'
      if (!value) return 'Now tap a tile in the Why you row'
      if (!differentiator) return 'Now tap a tile in the Difference row'
      return 'Tap the pulsing Continue button below'
    }
    if (step === 'output' && outputTab === 'position') return 'Tap Next · Journey & cadence below'
    return 'Scroll the tabs above, or tap Reset below to try again'
  })()

  return (
    <ExerciseShell
      eyebrow="Sample exercise · Customer journey map"
      title="Find the leak. Build the message."
      intro="Mark where prospects drop off, then assemble your positioning from tiles - see a visual one-pager and funnel fix."
      stepIndex={stepIndex}
      totalSteps={workflowSteps.length}
      guide={stepGuides[step]}
      nextAction={nextAction}
      highlightContinue={highlightContinue}
      subLabel={step === 'output' ? (outputTab === 'position' ? 'Positioning' : 'Journey') : undefined}
      subProgress={step === 'funnel' ? leaks.length : undefined}
      subMax={step === 'funnel' ? 2 : undefined}
      showReset={stepIndex > 0 || leaks.length > 0}
      showBack={stepIndex > 0 || outputTab === 'journey'}
      primaryLabel={primaryLabel}
      primaryDisabled={step !== 'output' && !canAdvance}
      isFinal={step === 'output' && outputTab === 'journey'}
      onReset={reset}
      onBack={handleBack}
      onPrimary={handlePrimary}
      scrollKey={`${step}-${outputTab}-${leaks.join()}`}
    >
      <AnimatePresence mode="wait">
        {step === 'funnel' && (
          <motion.div key="funnel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <FunnelVisual stages={funnelStages} leakIds={leaks} />
            <div className="mt-4 grid gap-2 sm:grid-cols-5">
              {funnelStages.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleLeak(s.id)}
                  className={`rounded-xl px-2 py-2.5 text-[0.6875rem] font-semibold transition ring-1 ${
                    leaks.includes(s.id)
                      ? 'bg-rose-500 text-white ring-rose-500'
                      : 'bg-white text-ink ring-line hover:ring-ink/25'
                  }`}
                >
                  {leaks.includes(s.id) ? '✓ Leak' : 'Mark leak'}
                  <span className="mt-0.5 block font-normal opacity-80">{s.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'position' && (
          <motion.div key="position" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
            {(
              [
                { key: 'audience', label: 'Who', tiles: positioningTiles.audience, selected: audience, set: setAudience },
                { key: 'value', label: 'Why you', tiles: positioningTiles.value, selected: value, set: setValue },
                { key: 'diff', label: 'Difference', tiles: positioningTiles.differentiator, selected: differentiator, set: setDifferentiator },
              ] as const
            ).map((row) => (
              <div key={row.key}>
                <p className="mb-2 text-[0.6875rem] font-semibold uppercase text-muted-light">{row.label}</p>
                <div className="flex flex-wrap gap-2">
                  {row.tiles.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => row.set(t.id as never)}
                      className={`rounded-full px-4 py-2 text-[0.8125rem] font-medium transition ring-1 ${
                        row.selected === t.id
                          ? 'bg-ink text-cream ring-ink'
                          : 'bg-[#fef9c3] text-ink ring-amber-200/80 hover:shadow-md'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {positioningComplete && (
              <div className="rounded-xl bg-emerald-50 px-4 py-3 text-[0.8125rem] text-emerald-900 ring-1 ring-emerald-100">
                Positioning assembled · continue to see your sample deliverable
              </div>
            )}
          </motion.div>
        )}

        {step === 'output' && output && (
          <motion.div key={outputTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="mb-4 flex gap-1 rounded-full bg-white p-1 ring-1 ring-line">
              {(['position', 'journey'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setOutputTab(tab)}
                  className={`flex-1 rounded-full py-2 text-[0.75rem] font-semibold transition ${
                    outputTab === tab ? 'bg-ink text-cream' : 'text-muted hover:text-ink'
                  }`}
                >
                  {tab === 'position' ? 'Positioning one-pager' : 'Journey & cadence'}
                </button>
              ))}
            </div>

            {outputTab === 'position' && (
              <DeliverableFrame label="Positioning one-pager · sample" badge="Sales & marketing">
                <p className="text-[1.25rem] font-bold leading-snug text-ink">{output.oneLiner}</p>
                <p className="mt-4 rounded-xl bg-cream-dark/60 p-4 text-[0.9375rem] leading-relaxed text-muted">
                  {output.positioning}
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <StatPill label="Pitch angle" value="Ready" tone="good" />
                  <StatPill label="Channel focus" value={output.channelFocus.split(' ')[0]} />
                </div>
                <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">{output.pitchAngle}</p>
              </DeliverableFrame>
            )}

            {outputTab === 'journey' && (
              <div className="space-y-4">
                <DeliverableFrame label="Funnel fix · annotated">
                  <FunnelVisual stages={funnelStages} leakIds={leaks} fixLabel={output.funnelFixLabel} />
                </DeliverableFrame>
                <DeliverableFrame label="90-day content rhythm · sample">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {output.cadenceStrip.map((m) => (
                      <div key={m.month} className="rounded-xl bg-cream-dark/50 p-3 ring-1 ring-line">
                        <p className="text-[0.6875rem] font-bold uppercase text-ink">{m.month}</p>
                        <ul className="mt-2 space-y-1">
                          {m.actions.map((a) => (
                            <li key={a} className="text-[0.6875rem] text-muted">· {a}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <ProgressBarVisual value={2} max={3} label="Cadence health · sample" color="bg-emerald-500" />
                  </div>
                </DeliverableFrame>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </ExerciseShell>
  )
}
