import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  activityIntro,
  activityTitle,
  narrativeSpine,
  storyBeats,
  type StoryBeatId,
} from './communicationStory'

export function CommunicationDemo() {
  const [openId, setOpenId] = useState<StoryBeatId | null>('spine')

  const toggle = (id: StoryBeatId) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-[#f6f2ef]">
      <div className="border-b border-line bg-cream px-6 py-5 sm:px-8">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
          Storytelling & clarity
        </p>
        <p className="mt-2 font-serif text-[1.25rem] font-semibold text-ink sm:text-[1.375rem]">
          {activityTitle}
        </p>
        <p className="mt-2 max-w-[560px] text-[0.9375rem] leading-relaxed text-muted">
          {activityIntro}
        </p>

        <div className="mt-6 rounded-2xl bg-ink px-4 py-4 sm:px-5">
          <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-cream/45">
            Every story follows a spine
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {narrativeSpine.map((step, index) => (
              <div
                key={step.label}
                className="relative rounded-xl bg-white/10 px-3 py-2.5 text-center sm:py-3"
              >
                {index < narrativeSpine.length - 1 && (
                  <span
                    className="absolute -right-1.5 top-1/2 hidden h-px w-3 -translate-y-1/2 bg-cream/25 sm:block"
                    aria-hidden
                  />
                )}
                <p className="text-[0.6875rem] font-semibold text-cream">{step.label}</p>
                <p className="mt-0.5 text-[0.625rem] text-cream/55">{step.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <ol className="relative space-y-0">
          <div
            className="absolute bottom-4 left-[1.125rem] top-4 w-px bg-gradient-to-b from-ink/20 via-ink/10 to-transparent sm:left-[1.375rem]"
            aria-hidden
          />

          {storyBeats.map((beat, index) => {
            const isOpen = openId === beat.id

            return (
              <li key={beat.id} className="relative pl-10 sm:pl-12">
                <span
                  className={`absolute left-2 top-5 flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-[#f6f2ef] sm:left-2.5 sm:h-6 sm:w-6 ${
                    isOpen ? 'bg-ink' : 'bg-white ring-1 ring-line'
                  }`}
                  aria-hidden
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-cream' : 'bg-ink/30'}`}
                  />
                </span>

                <div className="pb-4 pt-1">
                  <button
                    type="button"
                    onClick={() => toggle(beat.id)}
                    aria-expanded={isOpen}
                    aria-controls={`story-beat-${beat.id}`}
                    className={`w-full rounded-2xl px-4 py-4 text-left transition sm:px-5 sm:py-5 ${
                      isOpen
                        ? 'bg-ink text-cream shadow-lg shadow-ink/10'
                        : 'bg-white ring-1 ring-line hover:ring-ink/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p
                          className={`text-[0.625rem] font-semibold uppercase tracking-[0.1em] ${
                            isOpen ? 'text-cream/50' : 'text-muted-light'
                          }`}
                        >
                          {beat.beat} · {beat.storyLine}
                        </p>
                        <p
                          className={`mt-1.5 text-[1.0625rem] font-semibold leading-snug sm:text-[1.125rem] ${
                            isOpen ? 'text-cream' : 'text-ink'
                          }`}
                        >
                          {beat.title}
                        </p>
                        <p
                          className={`mt-2 text-[0.875rem] leading-relaxed ${
                            isOpen ? 'text-cream/80' : 'text-muted'
                          }`}
                        >
                          {beat.summary}
                        </p>
                      </div>
                      <span
                        className={`mt-1 shrink-0 text-[1.125rem] leading-none transition ${
                          isOpen ? 'rotate-45 text-cream/60' : 'text-muted-light'
                        }`}
                        aria-hidden
                      >
                        +
                      </span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`story-beat-${beat.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 space-y-4 rounded-2xl bg-white p-5 ring-1 ring-line sm:p-6">
                          <blockquote className="border-l-2 border-ink/20 pl-4">
                            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
                              Story in one line
                            </p>
                            <p className="mt-2 text-[1rem] italic leading-relaxed text-ink/90 sm:text-[1.0625rem]">
                              &ldquo;{beat.storySnippet}&rdquo;
                            </p>
                          </blockquote>

                          <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
                                How we help
                              </p>
                              <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                                {beat.whatWeDo}
                              </p>
                            </div>
                            <div>
                              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
                                What you leave with
                              </p>
                              <ul className="mt-2 space-y-2">
                                {beat.deliverables.map((item) => (
                                  <li
                                    key={item}
                                    className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-muted"
                                  >
                                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/35" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="rounded-xl bg-cream-dark/60 px-4 py-3">
                            <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">
                              Outcome
                            </p>
                            <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink">
                              {beat.outcome}
                            </p>
                          </div>

                          {index < storyBeats.length - 1 && (
                            <button
                              type="button"
                              onClick={() => setOpenId(storyBeats[index + 1].id)}
                              className="text-[0.8125rem] font-semibold text-ink underline underline-offset-2 hover:text-ink/70"
                            >
                              Next beat · {storyBeats[index + 1].title} →
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
