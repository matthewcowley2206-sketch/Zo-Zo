import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  getProcessDef,
  processOptions,
  stepGuides,
  synthesizeOperations,
  TARGET_STEPS,
  workflowSteps,
  type AutomationLevel,
  type Process,
  type WorkflowStepId,
} from './operationsSynthesis'
import { ExerciseShell } from '../exercise/ExerciseShell'
import {
  DeliverableFrame,
  FlowDiagram,
  ProgressBarVisual,
  StatPill,
} from '../exercise/VisualDeliverables'

export function OperationsDemo() {
  const [step, setStep] = useState<WorkflowStepId>('simplify')
  const [process, setProcess] = useState<Process | null>(null)
  const [removedIds, setRemovedIds] = useState<string[]>([])
  const [automation, setAutomation] = useState<AutomationLevel | null>(null)

  const procDef = process ? getProcessDef(process) : null
  const keptIds = procDef ? procDef.steps.filter((s) => !removedIds.includes(s.id)).map((s) => s.id) : []
  const simplifyComplete = procDef && keptIds.length === TARGET_STEPS

  const output = useMemo(
    () =>
      simplifyComplete && automation
        ? synthesizeOperations({ process: process!, keptStepIds: keptIds, automation })
        : null,
    [process, keptIds, automation, simplifyComplete],
  )

  const toggleRemove = (stepId: string) => {
    if (!procDef) return
    setRemovedIds((prev) => {
      if (prev.includes(stepId)) return prev.filter((id) => id !== stepId)
      const next = [...prev, stepId]
      if (procDef.steps.length - next.length < TARGET_STEPS) return prev
      return next
    })
  }

  const reset = () => {
    setStep('simplify')
    setProcess(null)
    setRemovedIds([])
    setAutomation(null)
  }

  const handlePrimary = () => {
    if (step === 'output') {
      reset()
      return
    }
    if (step === 'simplify' && simplifyComplete) setStep('automate')
    else if (step === 'automate' && automation) setStep('output')
  }

  const handleBack = () => {
    if (step === 'output') setStep('automate')
    else if (step === 'automate') setStep('simplify')
  }

  const canAdvance =
    (step === 'simplify' && simplifyComplete) ||
    (step === 'automate' && automation) ||
    step === 'output'

  const highlightContinue =
    (step === 'simplify' && simplifyComplete) ||
    (step === 'automate' && !!automation)

  const nextAction = (() => {
    if (step === 'simplify') {
      if (!process) return 'Tap one of the four process cards to start'
      if (keptIds.length > TARGET_STEPS) {
        return `Tap ${keptIds.length - TARGET_STEPS} more step(s) in the list to cut them`
      }
      return 'Tap the pulsing Continue button below'
    }
    if (step === 'automate') {
      if (!automation) return 'Tap Light touch, Moderate, or Full workflow'
      return 'Tap the pulsing Continue button below'
    }
    return 'Tap Reset below to try another process'
  })()

  return (
    <ExerciseShell
      eyebrow="Sample exercise · Process strip"
      title="Cut steps. See the flow simplify."
      intro="Pick a messy process, strike steps until four remain, choose automation - then see a before/after flow visual."
      stepIndex={workflowSteps.findIndex((s) => s.id === step)}
      totalSteps={workflowSteps.length}
      guide={stepGuides[step]}
      nextAction={nextAction}
      highlightContinue={highlightContinue}
      subLabel={
        step === 'simplify' && procDef
          ? `${keptIds.length}/${TARGET_STEPS} steps kept`
          : undefined
      }
      showReset={process !== null}
      showBack={step !== 'simplify'}
      primaryLabel={
        step === 'simplify' && procDef && keptIds.length > TARGET_STEPS
          ? `Remove ${keptIds.length - TARGET_STEPS} more step${keptIds.length - TARGET_STEPS === 1 ? '' : 's'}`
          : step === 'simplify' && !simplifyComplete
            ? 'Pick a process and cut to four steps'
            : step === 'automate' && !automation
              ? 'Choose automation level'
              : step === 'output'
                ? 'Reset · try another process'
                : `Continue to ${workflowSteps[workflowSteps.findIndex((s) => s.id === step) + 1]?.label ?? 'next'}`
      }
      primaryDisabled={step !== 'output' && !canAdvance}
      isFinal={step === 'output'}
      onReset={reset}
      onBack={handleBack}
      onPrimary={handlePrimary}
      scrollKey={`${step}-${process}-${removedIds.join()}`}
    >
      <AnimatePresence mode="wait">
        {step === 'simplify' && (
          <motion.div key="simplify" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {!process ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {processOptions.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setProcess(p.id)
                      setRemovedIds([])
                    }}
                    className="rounded-2xl bg-white p-4 text-left ring-1 ring-line transition hover:ring-ink/25"
                  >
                    <p className="font-semibold text-ink">{p.title}</p>
                    <p className="mt-1 text-[0.8125rem] text-muted">{p.sub}</p>
                    <p className="mt-2 text-[0.6875rem] text-muted-light">{p.steps.length} steps today</p>
                  </button>
                ))}
              </div>
            ) : (
              procDef && (
                <div>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[0.8125rem] font-semibold text-ink">{procDef.title}</p>
                    <button type="button" onClick={() => setProcess(null)} className="text-[0.75rem] text-muted underline">
                      Change process
                    </button>
                  </div>
                  <FlowDiagram steps={procDef.steps} frictionIds={removedIds} variant="before" />
                  <div className="mt-4 space-y-2">
                    {procDef.steps.map((s) => {
                      const cut = removedIds.includes(s.id)
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggleRemove(s.id)}
                          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left ring-1 transition ${
                            cut
                              ? 'bg-slate-100 text-muted line-through ring-slate-200'
                              : 'bg-emerald-50 ring-emerald-200'
                          }`}
                        >
                          <span className={`h-3 w-3 rounded-full ${cut ? 'bg-slate-300' : 'bg-emerald-500'}`} />
                          <span className="font-medium">{s.label}</span>
                          <span className="ml-auto text-[0.6875rem] font-semibold uppercase">
                            {cut ? 'Cut' : 'Keep'}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            )}
          </motion.div>
        )}

        {step === 'automate' && (
          <motion.div key="automate" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
            {(
              [
                { id: 'light' as const, title: 'Light touch', sub: 'Templates and checklists' },
                { id: 'moderate' as const, title: 'Moderate', sub: 'Routing and nudges' },
                { id: 'full' as const, title: 'Full workflow', sub: 'End-to-end with audit trail' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAutomation(opt.id)}
                className={`w-full rounded-2xl p-4 text-left ring-1 transition sm:p-5 ${
                  automation === opt.id ? 'bg-ink text-cream ring-ink ring-2' : 'bg-white ring-line hover:ring-ink/20'
                }`}
              >
                <p className="font-semibold">{opt.title}</p>
                <p className={`mt-1 text-[0.8125rem] ${automation === opt.id ? 'text-cream/75' : 'text-muted'}`}>{opt.sub}</p>
              </button>
            ))}
          </motion.div>
        )}

        {step === 'output' && output && (
          <motion.div key="output" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <StatPill label="Steps cut" value={String(output.removedLabels.length)} tone="warn" />
              <StatPill label="Time saved" value={output.hoursSaved} tone="good" />
              <StatPill label="Steps left" value={String(output.afterSteps.length)} />
            </div>

            <DeliverableFrame label="Before & after · flow">
              <p className="mb-2 text-[0.6875rem] font-semibold uppercase text-rose-700">Before · {output.beforeSteps.length} steps</p>
              <FlowDiagram steps={output.beforeSteps} frictionIds={removedIds} variant="before" />
              <p className="mb-2 mt-5 text-[0.6875rem] font-semibold uppercase text-emerald-700">After · {output.afterSteps.length} steps</p>
              <FlowDiagram steps={output.afterSteps} variant="after" />
              <ProgressBarVisual value={output.hoursSavedNum} max={16} label="Admin load reduced · sample" color="bg-emerald-500" />
            </DeliverableFrame>

            <div className="grid gap-4 lg:grid-cols-2">
              <DeliverableFrame label="SOP checklist · sample">
                <ul className="space-y-2">
                  {output.sopOutline.map((line, i) => (
                    <li key={line} className="flex gap-3 text-[0.8125rem] text-muted">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-[0.625rem] font-bold text-cream">
                        {i + 1}
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </DeliverableFrame>
              <DeliverableFrame label="Automations · sample">
                <ul className="space-y-2">
                  {output.automations.map((a) => (
                    <li key={a} className="flex gap-2 rounded-lg bg-violet-50 px-3 py-2 text-[0.8125rem] text-violet-950 ring-1 ring-violet-100">
                      <span>⚡</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </DeliverableFrame>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ExerciseShell>
  )
}
