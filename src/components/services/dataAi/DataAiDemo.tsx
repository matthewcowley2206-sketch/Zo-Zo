import { useMemo, useState, type DragEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  allTasksSorted,
  buckets,
  getTasksInBucket,
  stepGuides,
  synthesizeDataAi,
  taskCards,
  workflowSteps,
  type Bucket,
  type WorkflowStepId,
} from './dataAiSynthesis'
import { ExerciseShell } from '../exercise/ExerciseShell'
import {
  BucketColumn,
  DashboardMock,
  DeliverableFrame,
  ProgressBarVisual,
  StatPill,
} from '../exercise/VisualDeliverables'

export function DataAiDemo() {
  const [step, setStep] = useState<WorkflowStepId>('sort')
  const [assignments, setAssignments] = useState<Partial<Record<string, Bucket>>>({})
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [overBucket, setOverBucket] = useState<Bucket | 'pool' | null>(null)
  const [outputTab, setOutputTab] = useState<'dashboard' | 'roadmap'>('dashboard')

  const unassigned = taskCards.filter((t) => !assignments[t.id])
  const sorted = allTasksSorted(assignments)

  const output = useMemo(
    () => (sorted ? synthesizeDataAi({ assignments: assignments as Record<string, Bucket> }) : null),
    [assignments, sorted],
  )

  const assign = (taskId: string, bucket: Bucket | null) => {
    setAssignments((prev) => {
      const next = { ...prev }
      if (bucket === null) delete next[taskId]
      else next[taskId] = bucket
      return next
    })
  }

  const reset = () => {
    setStep('sort')
    setAssignments({})
    setDraggingId(null)
    setOutputTab('dashboard')
  }

  const onDragStart = (e: DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id)
    setDraggingId(id)
  }

  const onDrop = (e: DragEvent, bucket: Bucket | 'pool') => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (id) assign(id, bucket === 'pool' ? null : bucket)
    setDraggingId(null)
    setOverBucket(null)
  }

  const handlePrimary = () => {
    if (step === 'output') {
      if (outputTab === 'dashboard') {
        setOutputTab('roadmap')
        return
      }
      reset()
      return
    }
    if (sorted) setStep('output')
  }

  const handleBack = () => {
    if (step === 'output' && outputTab === 'roadmap') {
      setOutputTab('dashboard')
      return
    }
    setStep('sort')
  }

  const highlightContinue = sorted || (step === 'output' && outputTab === 'dashboard')

  const nextAction = (() => {
    if (step === 'sort') {
      if (unassigned.length === taskCards.length) {
        return 'Drag a purple task card into Automate, Dashboard, or Keep human'
      }
      if (unassigned.length > 0) {
        return `Drag "${unassigned[0].label}" into a column (${taskCards.length - unassigned.length} of ${taskCards.length} done)`
      }
      return 'Tap the pulsing See your roadmap button below'
    }
    if (step === 'output' && outputTab === 'dashboard') return 'Tap Next · Roadmap below'
    return 'Tap Reset below to sort again'
  })()

  return (
    <ExerciseShell
      eyebrow="Sample exercise · Task sort"
      title="Automate, dashboard, or keep human?"
      intro="Drag each time-waster into the right bucket - then see a dashboard mock, automation wins, and roadmap."
      stepIndex={step === 'sort' ? 0 : 1}
      totalSteps={workflowSteps.length}
      guide={stepGuides[step]}
      nextAction={nextAction}
      highlightContinue={highlightContinue}
      subLabel={step === 'sort' ? `${taskCards.length - unassigned.length}/${taskCards.length} sorted` : outputTab === 'dashboard' ? 'Dashboard' : 'Roadmap'}
      showReset={Object.keys(assignments).length > 0}
      showBack={step === 'output'}
      primaryLabel={
        step === 'output' && outputTab === 'dashboard'
          ? 'Next · Roadmap'
          : step === 'output'
            ? 'Reset · sort again'
            : !sorted
              ? `Sort ${unassigned.length} remaining task${unassigned.length === 1 ? '' : 's'}`
              : 'See your roadmap'
      }
      primaryDisabled={step === 'sort' && !sorted}
      isFinal={step === 'output' && outputTab === 'roadmap'}
      onReset={reset}
      onBack={handleBack}
      onPrimary={handlePrimary}
      scrollKey={`${step}-${outputTab}-${Object.keys(assignments).length}`}
    >
      <AnimatePresence mode="wait">
        {step === 'sort' && (
          <motion.div key="sort" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setOverBucket('pool')
              }}
              onDrop={(e) => onDrop(e, 'pool')}
              className={`mb-4 min-h-[72px] rounded-2xl p-3 ring-1 transition ${
                unassigned.length ? `bg-white/80 ring-line ${overBucket === 'pool' ? 'ring-2 ring-ink/30' : ''}` : ''
              }`}
            >
              {unassigned.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {unassigned.map((t) => (
                    <div
                      key={t.id}
                      draggable
                      onDragStart={(e) => onDragStart(e, t.id)}
                      onDragEnd={() => setDraggingId(null)}
                      className={`cursor-grab rounded-lg bg-violet-100 px-3 py-2 ring-1 ring-violet-200 active:cursor-grabbing ${
                        draggingId === t.id ? 'opacity-40' : ''
                      }`}
                    >
                      <p className="text-[0.8125rem] font-semibold text-ink">{t.label}</p>
                      <p className="text-[0.625rem] text-muted">{t.sub}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-2 text-center text-[0.8125rem] font-medium text-emerald-800">All sorted · continue to output</p>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {buckets.map((b) => (
                <div
                  key={b.id}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setOverBucket(b.id)
                  }}
                  onDrop={(e) => onDrop(e, b.id)}
                  className={overBucket === b.id ? 'ring-2 ring-ink/30 rounded-xl' : ''}
                >
                  <BucketColumn
                    label={b.label}
                    color={b.color}
                    items={getTasksInBucket(assignments, b.id)}
                    emptyHint="Drop here"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'output' && output && (
          <motion.div key={outputTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {outputTab === 'dashboard' && (
              <div className="space-y-4">
                <DeliverableFrame label="Executive dashboard · sample" badge="Data & AI">
                  <DashboardMock tiles={output.dashboardTiles} />
                  <p className="mt-4 text-[0.8125rem] text-muted">{output.dashboardFocus}</p>
                </DeliverableFrame>
                <div className="grid gap-3 sm:grid-cols-3">
                  <StatPill label="Automations" value={String(output.automateCount)} tone="good" />
                  <StatPill label="Hours saved" value={`${output.hoursSavedTotal}h/wk`} tone="good" />
                  <StatPill label="Top win" value={output.topAutomation.title.split(' ')[0]} />
                </div>
                <DeliverableFrame label="Top automation · sample">
                  <p className="font-semibold text-ink">{output.topAutomation.title}</p>
                  <p className="mt-2 text-[0.875rem] text-muted">{output.topAutomation.detail}</p>
                  <ProgressBarVisual value={output.hoursSavedTotal} max={12} label="Est. weekly time recovered" color="bg-violet-500" />
                </DeliverableFrame>
              </div>
            )}

            {outputTab === 'roadmap' && (
              <div className="space-y-4">
                <DeliverableFrame label="AI playbook · sample" dark>
                  <ul className="space-y-2">
                    {output.aiPlaybook.map((p) => (
                      <li key={p} className="flex gap-2 text-[0.875rem] text-cream/85">
                        <span className="text-violet-300">→</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </DeliverableFrame>
                <DeliverableFrame label="Roadmap · sample">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                      <p className="text-[0.6875rem] font-bold uppercase text-emerald-900">Quick wins</p>
                      <p className="mt-2 text-[0.875rem] text-emerald-950">{output.quickWin}</p>
                    </div>
                    <div className="rounded-xl bg-sky-50 p-4 ring-1 ring-sky-100">
                      <p className="text-[0.6875rem] font-bold uppercase text-sky-900">Next quarter</p>
                      <p className="mt-2 text-[0.875rem] text-sky-950">{output.nextQuarter}</p>
                    </div>
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
