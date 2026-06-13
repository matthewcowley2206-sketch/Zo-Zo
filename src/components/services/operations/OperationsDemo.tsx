import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  activityIntro,
  activityTitle,
  afterSteps,
  beforeSteps,
  processPain,
  processTitle,
  supportAreas,
  type ProcessStep,
  type SupportAreaId,
} from './operationsSupport'

function StepNode({
  step,
  mode,
}: {
  step: ProcessStep
  mode: 'before' | 'after' | 'owners' | 'automate'
}) {
  const isBottleneck = mode === 'before' && step.bottleneck
  const showOwner = mode === 'owners' || mode === 'automate'
  const isAutomated = mode === 'automate' && step.automated

  return (
    <div
      className={`relative h-full rounded-xl px-2.5 py-3 text-center ring-1 transition sm:px-3 sm:py-3.5 ${
        isBottleneck
          ? 'bg-rose-50 ring-rose-300'
          : isAutomated
            ? 'bg-violet-50 ring-violet-200'
            : mode === 'after' || mode === 'owners' || mode === 'automate'
              ? 'bg-emerald-50 ring-emerald-200'
              : 'bg-white ring-line'
      }`}
    >
      {isBottleneck && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[0.625rem] font-bold text-white">
          !
        </span>
      )}
      {isAutomated && (
        <span className="absolute -right-1 -top-1 rounded-full bg-violet-600 px-1.5 py-0.5 text-[0.5625rem] font-bold uppercase text-white">
          Auto
        </span>
      )}
      <p className="text-[0.6875rem] font-semibold leading-snug text-ink sm:text-[0.75rem]">
        {step.label}
      </p>
      {showOwner && (
        <p className="mt-1.5 text-[0.5625rem] font-medium uppercase tracking-wide text-muted">
          {step.owner}
        </p>
      )}
    </div>
  )
}

function FlowSequence({
  steps,
  mode,
}: {
  steps: ProcessStep[]
  mode: 'before' | 'after' | 'owners' | 'automate'
}) {
  const columns = steps.length <= 4 ? steps.length : 4
  const gridClass =
    columns === 4
      ? 'grid-cols-2 sm:grid-cols-4'
      : columns === 3
        ? 'grid-cols-3'
        : 'grid-cols-2 sm:grid-cols-4'

  const rows: ProcessStep[][] = []
  for (let i = 0; i < steps.length; i += columns) {
    rows.push(steps.slice(i, i + columns))
  }

  return (
    <div className="space-y-3">
      {rows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`}>
          <div className={`grid ${gridClass} gap-2.5 sm:gap-3`}>
            {row.map((step, index) => (
              <div key={step.id} className="relative min-w-0">
                <StepNode step={step} mode={mode} />
                {index < row.length - 1 && (
                  <span
                    className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-[0.75rem] text-muted-light sm:inline"
                    aria-hidden
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
          {rowIndex < rows.length - 1 && (
            <div className="flex justify-center py-1.5 text-[0.875rem] text-muted-light" aria-hidden>
              ↓
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function FlowSection({
  label,
  labelClassName,
  steps,
  mode,
}: {
  label: string
  labelClassName: string
  steps: ProcessStep[]
  mode: 'before' | 'after' | 'owners' | 'automate'
}) {
  return (
    <div>
      <p className={`mb-3 text-[0.625rem] font-semibold uppercase tracking-[0.08em] ${labelClassName}`}>
        {label}
      </p>
      <FlowSequence steps={steps} mode={mode} />
    </div>
  )
}

function ProcessFlow({ mode }: { mode: SupportAreaId | null }) {
  const showBefore = mode === 'map' || mode === null
  const showCompare = mode === 'redesign'
  const afterMode = mode === 'automate' ? 'automate' : mode === 'document' ? 'owners' : 'after'

  if (showCompare) {
    return (
      <div className="space-y-6">
        <FlowSection
          label={`Before · ${beforeSteps.length} steps`}
          labelClassName="text-rose-700"
          steps={beforeSteps}
          mode="before"
        />
        <FlowSection
          label={`After · ${afterSteps.length} steps`}
          labelClassName="text-emerald-700"
          steps={afterSteps}
          mode="after"
        />
      </div>
    )
  }

  const steps = showBefore ? beforeSteps : afterSteps
  const stepMode = showBefore ? 'before' : afterMode

  return (
    <FlowSection
      label={
        showBefore
          ? `Current flow · ${beforeSteps.length} steps`
          : `Redesigned flow · ${afterSteps.length} steps`
      }
      labelClassName="text-muted-light"
      steps={steps}
      mode={stepMode}
    />
  )
}

export function OperationsDemo() {
  const [activeId, setActiveId] = useState<SupportAreaId | null>('map')
  const activeArea = supportAreas.find((area) => area.id === activeId) ?? null

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-cream-dark/40">
      <div className="border-b border-line bg-cream px-6 py-5 sm:px-8">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
          Process simplification · sample workflow
        </p>
        <p className="mt-2 text-[1.125rem] font-semibold text-ink">{activityTitle}</p>
        <p className="mt-2 max-w-[560px] text-[0.9375rem] leading-relaxed text-muted">
          {activityIntro}
        </p>
      </div>

      <div className="p-6 sm:p-8">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-line sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[0.875rem] font-semibold text-ink">{processTitle}</p>
              <p className="mt-0.5 text-[0.6875rem] text-muted-light">{processPain}</p>
            </div>
            {activeArea && (
              <span className="max-w-full rounded-full bg-cream-dark px-3 py-1 text-[0.6875rem] font-medium leading-snug text-muted sm:max-w-[220px] sm:text-right">
                {activeArea.flowNote}
              </span>
            )}
          </div>
          <div className="mt-6">
            <ProcessFlow mode={activeId} />
          </div>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {supportAreas.map((area) => {
            const isActive = activeId === area.id

            return (
              <button
                key={area.id}
                type="button"
                onClick={() => setActiveId(area.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-[0.8125rem] font-medium transition ring-1 ${
                  isActive
                    ? 'bg-ink text-cream ring-ink'
                    : 'bg-white text-muted ring-line hover:text-ink'
                }`}
              >
                {area.label}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeArea ? (
            <motion.div
              key={activeArea.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="mt-5 overflow-hidden rounded-2xl bg-white ring-1 ring-line"
            >
              <div className="border-b border-line bg-emerald-50/80 px-5 py-4 sm:px-6">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-emerald-800/60">
                  {activeArea.tagline}
                </p>
                <p className="mt-1 text-[1.0625rem] font-semibold text-ink">{activeArea.label}</p>
                <p className="mt-1 text-[0.875rem] text-muted">{activeArea.summary}</p>
              </div>

              <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-2">
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
                    How we help
                  </p>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                    {activeArea.whatWeDo}
                  </p>
                  <div className="mt-5 rounded-xl bg-cream-dark/50 p-4 ring-1 ring-line/80">
                    <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">
                      Example
                    </p>
                    <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink/90">
                      {activeArea.example}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
                    What you leave with
                  </p>
                  <ul className="mt-2 space-y-2">
                    {activeArea.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-muted"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-xl bg-ink px-4 py-3">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-cream/50">
                      Outcome
                    </p>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-cream/90">
                      {activeArea.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-5 text-center text-[0.875rem] text-muted"
            >
              Select an area to see how we simplify operations.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
