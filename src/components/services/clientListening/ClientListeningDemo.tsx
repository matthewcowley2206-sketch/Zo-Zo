import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  workflowStages,
  type WorkflowStageId,
} from './clientListeningWorkflow'

function StepBadge({
  index,
  active,
}: {
  index: number
  active: boolean
}) {
  return (
    <span
      className={`text-[0.8125rem] font-bold tabular-nums ${
        active ? 'text-cream' : 'text-ink'
      }`}
    >
      {String(index + 1).padStart(2, '0')}
    </span>
  )
}

export function ClientListeningDemo() {
  const panelRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState<WorkflowStageId | null>('listen')
  const activeStage = workflowStages.find((s) => s.id === activeId)
  const activeIndex = activeStage
    ? workflowStages.findIndex((s) => s.id === activeStage.id)
    : -1

  const toggleStage = (id: WorkflowStageId) => {
    setActiveId((current) => (current === id ? null : id))
  }

  useEffect(() => {
    if (activeId && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [activeId])

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-cream-dark/40">
      <div className="border-b border-line bg-cream px-6 py-5 sm:px-8">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
          How the loop works
        </p>
        <p className="mt-2 text-[1.125rem] font-semibold text-ink">
          Listen → Insights → Act → Close → Measure
        </p>
        <p className="mt-2 max-w-[560px] text-[0.9375rem] leading-relaxed text-muted">
          A visual walkthrough of the 360 client listening workflow. Tap any stage to expand
          what happens and what you leave with.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {/* Desktop: horizontal workflow */}
        <div className="hidden lg:block">
          <div className="relative flex items-start justify-between gap-2">
            {workflowStages.map((stage, index) => {
              const isActive = activeId === stage.id
              const isPast =
                activeId !== null &&
                workflowStages.findIndex((s) => s.id === activeId) > index

              return (
                <div key={stage.id} className="relative flex flex-1 flex-col items-center">
                  {index < workflowStages.length - 1 && (
                    <div
                      className={`absolute left-[calc(50%+28px)] top-7 h-0.5 w-[calc(100%-56px)] ${
                        isPast || isActive ? 'bg-ink/30' : 'bg-line'
                      }`}
                      aria-hidden
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => toggleStage(stage.id)}
                    aria-expanded={isActive}
                    aria-controls={`workflow-panel-${stage.id}`}
                    className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl ring-1 transition ${
                      isActive
                        ? 'bg-ink text-cream ring-ink shadow-lg shadow-ink/15'
                        : 'bg-white text-ink ring-line hover:ring-ink/25 hover:bg-cream'
                    }`}
                  >
                    <StepBadge index={index} active={isActive} />
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleStage(stage.id)}
                    className="mt-4 w-full text-center"
                  >
                    <p
                      className={`text-[0.8125rem] font-semibold ${
                        isActive ? 'text-ink' : 'text-muted'
                      }`}
                    >
                      {stage.label}
                    </p>
                    <p className="mt-1 text-[0.6875rem] leading-snug text-muted-light">
                      {stage.tagline}
                    </p>
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile: vertical accordion cards */}
        <div className="space-y-3 lg:hidden">
          {workflowStages.map((stage, index) => {
            const isActive = activeId === stage.id

            return (
              <div key={stage.id} className="overflow-hidden rounded-2xl ring-1 ring-line">
                <button
                  type="button"
                  onClick={() => toggleStage(stage.id)}
                  aria-expanded={isActive}
                  aria-controls={`workflow-panel-${stage.id}`}
                  className={`flex w-full items-center gap-4 px-4 py-4 text-left transition sm:px-5 ${
                    isActive ? 'bg-ink text-cream' : 'bg-white hover:bg-cream-dark/50'
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isActive ? 'bg-white/15' : 'bg-cream ring-1 ring-line'
                    }`}
                  >
                    <StepBadge index={index} active={isActive} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-[0.6875rem] font-semibold tabular-nums opacity-60">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[0.9375rem] font-semibold">{stage.label}</span>
                    </span>
                    <span
                      className={`mt-0.5 block text-[0.8125rem] ${
                        isActive ? 'text-cream/80' : 'text-muted'
                      }`}
                    >
                      {stage.summary}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 text-[1.25rem] leading-none transition ${
                      isActive ? 'rotate-45 text-cream/70' : 'text-muted-light'
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
              </div>
            )
          })}
        </div>

        {/* Expanded detail panel */}
        <AnimatePresence mode="wait">
          {activeStage && (
            <motion.div
              ref={panelRef}
              key={activeStage.id}
              id={`workflow-panel-${activeStage.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="mt-8 overflow-hidden rounded-2xl bg-white ring-1 ring-line"
            >
              <div className="border-b border-line bg-cream-dark/40 px-5 py-4 sm:px-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-cream">
                    <StepBadge index={activeIndex} active />
                  </span>
                  <div>
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
                      Stage {workflowStages.findIndex((s) => s.id === activeStage.id) + 1} of{' '}
                      {workflowStages.length}
                    </p>
                    <p className="text-[1.0625rem] font-semibold text-ink">{activeStage.label}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 p-5 sm:p-6 lg:grid-cols-2">
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
                    What happens
                  </p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {activeStage.whatHappens}
                  </p>

                  <div className="mt-6 rounded-xl bg-cream-dark/50 p-4 ring-1 ring-line/80">
                    <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">
                      Example
                    </p>
                    <p className="mt-2 text-[0.875rem] italic leading-relaxed text-ink/90">
                      {activeStage.example}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
                    What you leave with
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {activeStage.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[0.875rem] leading-relaxed text-muted"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/35" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {activeStage.automation && (
                    <div className="mt-6 rounded-xl bg-slate-800 p-4">
                      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-cream/50">
                        AI & automation
                      </p>
                      <p className="mt-2 text-[0.8125rem] leading-relaxed text-cream/85">
                        {activeStage.automation}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 border-t border-line bg-cream/50 px-5 py-4 sm:px-6">
                {workflowStages.map((stage) => (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveId(stage.id)}
                    className={`rounded-full px-3 py-1.5 text-[0.75rem] font-medium transition ${
                      stage.id === activeStage.id
                        ? 'bg-ink text-cream'
                        : 'bg-white text-muted ring-1 ring-line hover:text-ink'
                    }`}
                  >
                    {stage.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!activeStage && (
          <p className="mt-6 text-center text-[0.875rem] text-muted">
            Tap a stage above to explore the workflow.
          </p>
        )}
      </div>
    </div>
  )
}
