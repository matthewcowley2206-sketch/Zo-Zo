import { useMemo, useState, type DragEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  allCardsAssigned,
  getCardsInWeek,
  getUnassignedCards,
  launchCards,
  offerOptions,
  stepGuides,
  synthesizeGoToMarket,
  weekLabels,
  workflowSteps,
  type GoToMarketInput,
  type LaunchWeek,
  type OfferType,
  type WorkflowStepId,
} from './goToMarketSynthesis'
import { ExerciseShell } from '../exercise/ExerciseShell'
import {
  DeliverableFrame,
  LaunchCalendarVisual,
  ProgressBarVisual,
  StatPill,
} from '../exercise/VisualDeliverables'

export function GoToMarketDemo() {
  const [step, setStep] = useState<WorkflowStepId>('offer')
  const [offer, setOffer] = useState<OfferType | null>(null)
  const [assignments, setAssignments] = useState<Partial<Record<string, LaunchWeek>>>({})
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [overWeek, setOverWeek] = useState<LaunchWeek | 'pool' | null>(null)
  const [outputTab, setOutputTab] = useState<'message' | 'test'>('message')

  const unassigned = getUnassignedCards(assignments)
  const boardComplete = allCardsAssigned(assignments)

  const output = useMemo(
    () =>
      offer && boardComplete
        ? synthesizeGoToMarket({ offer, assignments: assignments as Record<string, LaunchWeek> } satisfies GoToMarketInput)
        : null,
    [offer, assignments, boardComplete],
  )

  const assign = (cardId: string, week: LaunchWeek | null) => {
    setAssignments((prev) => {
      const next = { ...prev }
      if (week === null) delete next[cardId]
      else next[cardId] = week
      return next
    })
  }

  const reset = () => {
    setStep('offer')
    setOffer(null)
    setAssignments({})
    setOutputTab('message')
  }

  const onDragStart = (e: DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id)
    setDraggingId(id)
  }

  const onDrop = (e: DragEvent, week: LaunchWeek | 'pool') => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (id) assign(id, week === 'pool' ? null : week)
    setDraggingId(null)
    setOverWeek(null)
  }

  const handlePrimary = () => {
    if (step === 'output') {
      if (outputTab === 'message') {
        setOutputTab('test')
        return
      }
      reset()
      return
    }
    if (step === 'offer' && offer) setStep('board')
    else if (step === 'board' && boardComplete) setStep('output')
  }

  const handleBack = () => {
    if (step === 'output' && outputTab === 'test') {
      setOutputTab('message')
      return
    }
    setStep(workflowSteps[workflowSteps.findIndex((s) => s.id === step) - 1].id)
  }

  const stepIndex = workflowSteps.findIndex((s) => s.id === step)

  const highlightContinue =
    (step === 'offer' && !!offer) ||
    (step === 'board' && boardComplete) ||
    (step === 'output' && outputTab === 'message')

  const nextAction = (() => {
    if (step === 'offer') {
      if (!offer) return 'Tap New product, New service, New market, or Relaunch'
      return 'Tap the pulsing Continue button below'
    }
    if (step === 'board') {
      if (unassigned.length > 0) {
        return `Drag "${unassigned[0].label}" into Week ${unassigned.length <= 2 ? '1' : unassigned.length <= 4 ? '2' : '3 or 4'} (${launchCards.length - unassigned.length} of ${launchCards.length} placed)`
      }
      return 'Tap the pulsing Continue button below'
    }
    if (step === 'output' && outputTab === 'message') return 'Tap Next · Test scorecard below'
    return 'Tap Reset below to plan another launch'
  })()

  return (
    <ExerciseShell
      eyebrow="Sample exercise · Launch board"
      title="Plan four weeks. Drag activities into place."
      intro="Pick your offer, build a launch board week by week - then see messaging, calendar, and test scorecard."
      stepIndex={stepIndex}
      totalSteps={workflowSteps.length}
      guide={stepGuides[step]}
      nextAction={nextAction}
      highlightContinue={highlightContinue}
      subLabel={
        step === 'board'
          ? `${launchCards.length - unassigned.length}/${launchCards.length} placed`
          : step === 'output'
            ? outputTab === 'message'
              ? 'Messaging'
              : 'Test & learn'
            : undefined
      }
      showReset={offer !== null || Object.keys(assignments).length > 0}
      showBack={stepIndex > 0 || outputTab === 'test'}
      primaryLabel={
        step === 'board' && !boardComplete
          ? `Place ${unassigned.length} more activit${unassigned.length === 1 ? 'y' : 'ies'}`
          : step === 'output' && outputTab === 'message'
            ? 'Next · Test scorecard'
            : step === 'output'
              ? 'Reset · plan another launch'
              : !offer && step === 'offer'
                ? 'Pick your offer type'
                : `Continue to ${workflowSteps[stepIndex + 1]?.label ?? 'next'}`
      }
      primaryDisabled={
        (step === 'offer' && !offer) ||
        (step === 'board' && !boardComplete)
      }
      isFinal={step === 'output' && outputTab === 'test'}
      onReset={reset}
      onBack={handleBack}
      onPrimary={handlePrimary}
      scrollKey={`${step}-${outputTab}-${Object.keys(assignments).length}`}
    >
      <AnimatePresence mode="wait">
        {step === 'offer' && (
          <motion.div key="offer" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid gap-3 sm:grid-cols-2">
            {offerOptions.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setOffer(o.id)}
                className={`rounded-2xl p-4 text-left ring-1 transition sm:p-5 ${
                  offer === o.id ? 'bg-ink text-cream ring-ink ring-2' : 'bg-white ring-line hover:ring-ink/20'
                }`}
              >
                <p className="font-semibold">{o.label}</p>
                <p className={`mt-1 text-[0.8125rem] ${offer === o.id ? 'text-cream/75' : 'text-muted'}`}>{o.sub}</p>
              </button>
            ))}
          </motion.div>
        )}

        {step === 'board' && (
          <motion.div key="board" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setOverWeek('pool')
              }}
              onDrop={(e) => onDrop(e, 'pool')}
              className={`mb-4 min-h-[60px] rounded-xl p-2 ${unassigned.length ? 'bg-cream-dark/50 ring-1 ring-line' : ''}`}
            >
              {unassigned.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {unassigned.map((c) => (
                    <div
                      key={c.id}
                      draggable
                      onDragStart={(e) => onDragStart(e, c.id)}
                      onDragEnd={() => setDraggingId(null)}
                      className={`cursor-grab rounded-lg bg-amber-100 px-3 py-2 ring-1 ring-amber-200 active:cursor-grabbing ${
                        draggingId === c.id ? 'opacity-40' : ''
                      }`}
                    >
                      <p className="text-[0.75rem] font-semibold text-ink">{c.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {([1, 2, 3, 4] as LaunchWeek[]).map((w) => (
                <div
                  key={w}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setOverWeek(w)
                  }}
                  onDrop={(e) => onDrop(e, w)}
                  className={`min-h-[160px] rounded-xl bg-white p-3 ring-1 ring-line ${
                    overWeek === w ? 'ring-2 ring-ink/30' : ''
                  }`}
                >
                  <p className="text-[0.6875rem] font-bold uppercase text-ink">{weekLabels[w]}</p>
                  <div className="mt-2 space-y-1.5">
                    {getCardsInWeek(assignments, w).map((c) => (
                      <div
                        key={c.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, c.id)}
                        className="cursor-grab rounded-md bg-ink px-2 py-1.5 text-[0.625rem] font-medium text-cream active:cursor-grabbing"
                      >
                        {c.label}
                      </div>
                    ))}
                    {getCardsInWeek(assignments, w).length === 0 && (
                      <p className="py-6 text-center text-[0.625rem] text-muted-light">Drop here</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'output' && output && (
          <motion.div key={outputTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {outputTab === 'message' && (
              <div className="space-y-4">
                <DeliverableFrame label="Launch messaging · sample poster" badge="Go-to-market">
                  <p className="text-[1.375rem] font-bold leading-snug text-ink">{output.headline}</p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{output.valueProposition}</p>
                  <div className="mt-5 rounded-xl bg-ink p-4 text-cream">
                    <p className="text-[0.625rem] uppercase text-cream/50">Messaging pillar</p>
                    <p className="mt-2 text-[0.875rem]">{output.messagingPillar}</p>
                  </div>
                </DeliverableFrame>
                <DeliverableFrame label="Four-week launch board · sample">
                  <LaunchCalendarVisual weeks={output.weeklyPlan} />
                </DeliverableFrame>
              </div>
            )}

            {outputTab === 'test' && (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <StatPill
                    label="Launch readiness"
                    value={`${output.launchScore}%`}
                    tone={output.launchScore >= 70 ? 'good' : 'warn'}
                  />
                  <StatPill label="Status" value={output.testLearn.status === 'ready' ? 'Go' : output.testLearn.status === 'watch' ? 'Watch' : 'Fix first'} tone={output.testLearn.status === 'ready' ? 'good' : 'warn'} />
                  <StatPill label="Pricing" value="Clear" />
                </div>
                <DeliverableFrame label="Test-and-learn scorecard · sample">
                  <ProgressBarVisual value={output.launchScore} max={100} label="Launch readiness score" color="bg-emerald-500" />
                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-[0.6875rem] font-bold uppercase text-muted-light">The bet</p>
                      <p className="mt-1 text-[0.8125rem] text-muted">{output.testLearn.bet}</p>
                    </div>
                    <div>
                      <p className="text-[0.6875rem] font-bold uppercase text-muted-light">Measure</p>
                      <p className="mt-1 text-[0.8125rem] text-muted">{output.testLearn.metric}</p>
                    </div>
                    <div>
                      <p className="text-[0.6875rem] font-bold uppercase text-muted-light">Decision</p>
                      <p className="mt-1 text-[0.8125rem] text-muted">{output.testLearn.decision}</p>
                    </div>
                  </div>
                </DeliverableFrame>
                <DeliverableFrame label="Prototype tip" dark>
                  <p className="text-[0.9375rem] text-cream/90">{output.prototypeTip}</p>
                  <Link to="/services/prototype-development" className="mt-3 inline-block text-[0.8125rem] underline">
                    Explore Prototype Development →
                  </Link>
                </DeliverableFrame>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </ExerciseShell>
  )
}
