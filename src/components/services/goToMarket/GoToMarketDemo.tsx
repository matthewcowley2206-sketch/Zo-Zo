import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  activityIntro,
  activityTitle,
  blueprintBlocks,
  launchSample,
  type BlueprintBlockId,
} from './goToMarketSupport'

export function GoToMarketDemo() {
  const [activeId, setActiveId] = useState<BlueprintBlockId | null>('offer')
  const [visited, setVisited] = useState<Set<BlueprintBlockId>>(() => new Set(['offer']))

  const selectBlock = (id: BlueprintBlockId) => {
    setActiveId(id)
    setVisited((prev) => new Set(prev).add(id))
  }

  const activeBlock = blueprintBlocks.find((block) => block.id === activeId) ?? null
  const exploredCount = visited.size

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-cream-dark/40">
      <div className="border-b border-line bg-cream px-6 py-5 sm:px-8">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
          Go-to-market · launch blueprint
        </p>
        <p className="mt-2 text-[1.125rem] font-semibold text-ink">{activityTitle}</p>
        <p className="mt-2 max-w-[560px] text-[0.9375rem] leading-relaxed text-muted">
          {activityIntro}
        </p>
        <p className="mt-4 text-[0.8125rem] font-medium text-ink">
          Sample offer:{' '}
          <span className="text-muted">{launchSample.offerName}</span>
        </p>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid gap-2 sm:grid-cols-2">
          {blueprintBlocks.map((block) => {
            const isActive = activeId === block.id

            return (
              <button
                key={block.id}
                type="button"
                onClick={() => selectBlock(block.id)}
                aria-expanded={isActive}
                aria-controls={`gtm-block-${block.id}`}
                className={`rounded-2xl px-4 py-4 text-left transition ring-1 sm:px-5 sm:py-5 ${block.gridClass} ${
                  isActive
                    ? 'bg-ink text-cream ring-ink shadow-lg shadow-ink/10'
                    : 'bg-white text-ink ring-line hover:ring-ink/20'
                }`}
              >
                <p
                  className={`text-[0.625rem] font-semibold uppercase tracking-[0.1em] ${
                    isActive ? 'text-cream/50' : 'text-muted-light'
                  }`}
                >
                  {block.tagline}
                </p>
                <p className={`mt-1.5 text-[1rem] font-semibold leading-snug ${isActive ? 'text-cream' : 'text-ink'}`}>
                  {block.label}
                </p>
                <p className={`mt-1.5 text-[0.8125rem] leading-relaxed ${isActive ? 'text-cream/75' : 'text-muted'}`}>
                  {block.summary}
                </p>

                {block.weeks && (
                  <div className={`mt-4 grid grid-cols-4 gap-1.5 ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                    {block.weeks.map((week) => (
                      <div
                        key={week.week}
                        className={`rounded-lg px-1.5 py-2 text-center ${
                          isActive ? 'bg-white/10 ring-1 ring-white/15' : 'bg-cream-dark/80 ring-1 ring-line'
                        }`}
                      >
                        <p className={`text-[0.5625rem] font-bold uppercase ${isActive ? 'text-cream/60' : 'text-muted-light'}`}>
                          {week.week.replace('Week ', 'W')}
                        </p>
                        <p className={`mt-0.5 text-[0.625rem] font-semibold leading-tight ${isActive ? 'text-cream' : 'text-ink'}`}>
                          {week.focus}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
            <motion.div
              className="h-full rounded-full bg-ink"
              initial={false}
              animate={{ width: `${(exploredCount / blueprintBlocks.length) * 100}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>
          <p className="shrink-0 text-[0.6875rem] font-medium tabular-nums text-muted">
            {exploredCount}/{blueprintBlocks.length} explored
          </p>
        </div>

        <AnimatePresence mode="wait">
          {activeBlock ? (
            <motion.div
              key={activeBlock.id}
              id={`gtm-block-${activeBlock.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="mt-5 overflow-hidden rounded-2xl bg-white ring-1 ring-line"
            >
              <div className="border-b border-line bg-gradient-to-r from-amber-50 to-cream px-5 py-4 sm:px-6">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-amber-900/50">
                  {activeBlock.tagline}
                </p>
                <p className="mt-1 text-[1.0625rem] font-semibold text-ink">{activeBlock.label}</p>
              </div>

              <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-2">
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
                    How we help
                  </p>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                    {activeBlock.whatWeDo}
                  </p>
                  <div className="mt-5 rounded-xl bg-cream-dark/50 p-4 ring-1 ring-line/80">
                    <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">
                      Example
                    </p>
                    <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink/90">
                      {activeBlock.example}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
                    What you leave with
                  </p>
                  <ul className="mt-2 space-y-2">
                    {activeBlock.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-muted"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {activeBlock.weeks && (
                    <div className="mt-5 space-y-2">
                      {activeBlock.weeks.map((week) => (
                        <div
                          key={week.week}
                          className="rounded-xl bg-ink px-4 py-3 text-cream"
                        >
                          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-cream/50">
                            {week.week} · {week.focus}
                          </p>
                          <p className="mt-1 text-[0.75rem] leading-relaxed text-cream/85">
                            {week.activities.join(' · ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {!activeBlock.weeks && (
                    <div className="mt-5 rounded-xl bg-ink px-4 py-3">
                      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-cream/50">
                        Outcome
                      </p>
                      <p className="mt-1 text-[0.8125rem] leading-relaxed text-cream/90">
                        {activeBlock.outcome}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {activeBlock.weeks && (
                <div className="border-t border-line bg-cream/50 px-5 py-3 sm:px-6">
                  <p className="text-[0.8125rem] text-muted">
                    <span className="font-semibold text-ink">Outcome:</span> {activeBlock.outcome}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 border-t border-line bg-cream/50 px-5 py-4 sm:px-6">
                {blueprintBlocks.map((block) => (
                  <button
                    key={block.id}
                    type="button"
                    onClick={() => selectBlock(block.id)}
                    className={`rounded-full px-3 py-1.5 text-[0.75rem] font-medium transition ${
                      block.id === activeBlock.id
                        ? 'bg-ink text-cream'
                        : 'bg-white text-muted ring-1 ring-line hover:text-ink'
                    }`}
                  >
                    {block.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-5 text-center text-[0.875rem] text-muted"
            >
              Tap a block in the blueprint to explore our go-to-market support.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
