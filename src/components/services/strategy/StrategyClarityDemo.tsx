import { useMemo, useState, type DragEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  partialInsight,
  stickyDefs,
  synthesizeStrategy,
  type Lane,
} from './strategySynthesis'
import { NextActionHint } from '../exercise/NextActionHint'

const lanes: { id: Lane; label: string; sub: string; color: string }[] = [
  { id: 'now', label: 'Now', sub: 'Next 30 days', color: 'bg-amber-100 ring-amber-200/80 text-amber-950' },
  { id: 'next', label: 'Next', sub: '60-90 days', color: 'bg-sky-100 ring-sky-200/80 text-sky-950' },
  { id: 'later', label: 'Park', sub: 'Not this quarter', color: 'bg-slate-100 ring-slate-200/80 text-slate-700' },
]

function StickyNote({
  id,
  text,
  onDragStart,
  onDragEnd,
  dragging,
}: {
  id: string
  text: string
  onDragStart: (e: DragEvent, id: string) => void
  onDragEnd: () => void
  dragging: boolean
}) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      onDragEnd={onDragEnd}
      className={`cursor-grab rounded-lg px-3 py-2 text-[0.8125rem] font-medium shadow-sm ring-1 transition-all active:cursor-grabbing ${
        dragging
          ? 'scale-95 opacity-40'
          : 'bg-[#fef9c3] ring-amber-200/60 hover:bg-amber-100 hover:shadow-md'
      }`}
    >
      {text}
    </div>
  )
}

export function StrategyClarityDemo() {
  const [assignments, setAssignments] = useState<Partial<Record<string, Lane>>>({})
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [overZone, setOverZone] = useState<Lane | 'pool' | null>(null)
  const [tip, setTip] = useState<string | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [outputTab, setOutputTab] = useState<'page' | 'deck'>('page')

  const unassigned = stickyDefs.filter((s) => !assignments[s.id])
  const sortedCount = Object.keys(assignments).length
  const done = unassigned.length === 0

  const output = useMemo(
    () => (done ? synthesizeStrategy(assignments as Record<string, Lane>) : null),
    [assignments, done],
  )

  const progressNote = partialInsight(assignments as Record<string, Lane>)

  const assign = (id: string, lane: Lane | null) => {
    setAssignments((prev) => {
      const next = { ...prev }
      if (lane === null) delete next[id]
      else next[id] = lane
      return next
    })
    if (sortedCount === 0 && lane !== null) {
      setTip('We take your sort and synthesise it - tradeoffs, narrative, and a deck the board can actually use.')
    }
  }

  const reset = () => {
    setAssignments({})
    setDraggingId(null)
    setOverZone(null)
    setTip(null)
    setActiveSlide(0)
    setOutputTab('page')
  }

  const onDragStart = (e: DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id)
    e.dataTransfer.effectAllowed = 'move'
    setDraggingId(id)
  }

  const onDragEnd = () => {
    setDraggingId(null)
    setOverZone(null)
  }

  const onDragOver = (e: DragEvent, zone: Lane | 'pool') => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setOverZone(zone)
  }

  const onDrop = (e: DragEvent, zone: Lane | 'pool') => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (!id) return
    assign(id, zone === 'pool' ? null : zone)
    setDraggingId(null)
    setOverZone(null)
  }

  const dropHighlight = (zone: Lane | 'pool') =>
    overZone === zone ? 'ring-2 ring-ink/30 bg-ink/[0.03]' : ''

  const nextAction = !done
    ? sortedCount === 0
      ? 'Drag any yellow sticky below into Now, Next, or Park'
      : `Drag the next sticky into a column (${sortedCount} of ${stickyDefs.length} sorted)`
    : outputTab === 'page'
      ? 'Scroll your Strategy-on-a-Page below, or tap 8-slide pack'
      : 'Tap Reset exercise to sort again'

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-cream-dark/40">
      <div className="border-b border-line bg-cream px-6 py-5 sm:px-8">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
          Sample exercise · Try it
        </p>
        <p className="mt-2 text-[1.125rem] font-semibold text-ink">
          Sort the noise - see what a real strategy output looks like.
        </p>
        <p className="mt-2 max-w-[620px] text-[0.9375rem] leading-relaxed text-muted">
          Drag all nine stickies into Now, Next, or Park. When you are done, we synthesise a Strategy-on-a-Page
          using a modern choice cascade - plus an 8-slide pack with the depth you would expect from a strategy engagement.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        <NextActionHint action={nextAction} highlightContinue={done} />
        <div className="mt-6">
        {sortedCount > 0 && (
          <div className="mb-6 flex justify-end">
            <button
              type="button"
              onClick={reset}
              className="rounded-xl border-2 border-ink bg-white px-5 py-2.5 text-[0.875rem] font-semibold text-ink shadow-sm transition hover:bg-cream-dark active:scale-[0.99]"
            >
              Reset exercise
            </button>
          </div>
        )}
        <div
          onDragOver={(e) => onDragOver(e, 'pool')}
          onDrop={(e) => onDrop(e, 'pool')}
          className={`mb-6 rounded-2xl p-4 transition-colors ${unassigned.length > 0 ? `ring-1 ring-line bg-white/60 ${dropHighlight('pool')}` : ''}`}
        >
          {unassigned.length > 0 ? (
            <>
              <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-wide text-muted-light">
                What is on your mind · drag to a column
              </p>
              <div className="flex flex-wrap gap-2">
                {unassigned.map((s) => (
                  <StickyNote
                    key={s.id}
                    id={s.id}
                    text={s.text}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    dragging={draggingId === s.id}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-[0.8125rem] font-medium text-emerald-800">
              All sorted · your strategy output is below
            </p>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {lanes.map((lane) => (
            <div
              key={lane.id}
              onDragOver={(e) => onDragOver(e, lane.id)}
              onDrop={(e) => onDrop(e, lane.id)}
              className={`rounded-2xl bg-white/80 p-3 ring-1 ring-line transition-all ${dropHighlight(lane.id)}`}
            >
              <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">{lane.label}</p>
              <p className="text-[0.625rem] text-muted-light">{lane.sub}</p>
              <div className="mt-3 min-h-[100px] space-y-2">
                {stickyDefs
                  .filter((s) => assignments[s.id] === lane.id)
                  .map((s) => (
                    <StickyNote
                      key={s.id}
                      id={s.id}
                      text={s.text}
                      onDragStart={onDragStart}
                      onDragEnd={onDragEnd}
                      dragging={draggingId === s.id}
                    />
                  ))}
                {stickyDefs.filter((s) => assignments[s.id] === lane.id).length === 0 && (
                  <p className="py-6 text-center text-[0.6875rem] text-muted-light">Drop here</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {!done && (
          <div className="mt-6 rounded-2xl border border-dashed border-line px-4 py-5 text-center">
            <p className="text-[0.9375rem] font-medium text-muted">
              {sortedCount === 0
                ? 'Everything feels urgent. Nothing moves.'
                : `${sortedCount} of ${stickyDefs.length} sorted…`}
            </p>
            {progressNote && (
              <p className="mt-2 text-[0.8125rem] text-muted-light">{progressNote}</p>
            )}
          </div>
        )}

        {done && output && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
                  Sample deliverable
                </p>
                <p className="mt-1 text-[1.0625rem] font-semibold text-ink">
                  How we would shape this in a real engagement
                </p>
              </div>
              <div className="flex rounded-full bg-white p-1 ring-1 ring-line">
                <button
                  type="button"
                  onClick={() => setOutputTab('page')}
                  className={`rounded-full px-4 py-2 text-[0.8125rem] font-medium transition ${
                    outputTab === 'page' ? 'bg-ink text-cream' : 'text-muted hover:text-ink'
                  }`}
                >
                  Strategy on a page
                </button>
                <button
                  type="button"
                  onClick={() => setOutputTab('deck')}
                  className={`rounded-full px-4 py-2 text-[0.8125rem] font-medium transition ${
                    outputTab === 'deck' ? 'bg-ink text-cream' : 'text-muted hover:text-ink'
                  }`}
                >
                  8-slide pack
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {outputTab === 'page' ? (
                <motion.div
                  key="page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden rounded-2xl bg-white ring-1 ring-line"
                >
                  <div className="border-b border-line bg-ink px-6 py-4 sm:px-8">
                    <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-cream/50">
                      Zo&Zo · {output.onePager.frameworkLabel}
                    </p>
                    <p className="mt-2 text-[1.25rem] font-semibold text-cream">{output.onePager.headline}</p>
                  </div>
                  <div className="space-y-6 p-6 sm:p-8">
                    <p className="text-[0.9375rem] leading-relaxed text-muted">{output.onePager.situation}</p>

                    <div className="space-y-0">
                      {output.onePager.cascade.map((level, i) => (
                        <div key={level.step} className="relative pl-8">
                          {i < output.onePager.cascade.length - 1 && (
                            <span className="absolute left-[11px] top-8 h-[calc(100%-8px)] w-px bg-ink/15" />
                          )}
                          <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[0.625rem] font-bold text-cream">
                            {level.step}
                          </span>
                          <div className={`pb-6 ${i === output.onePager.cascade.length - 1 ? '' : ''}`}>
                            <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-muted-light">
                              {level.label}
                            </p>
                            <p className="mt-0.5 text-[0.6875rem] italic text-muted-light">{level.question}</p>
                            <p className="mt-2 text-[0.9375rem] font-medium leading-snug text-ink">{level.answer}</p>
                            {level.detail && (
                              <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">{level.detail}</p>
                            )}
                            {level.bullets && (
                              <ul className="mt-2 space-y-1">
                                {level.bullets.map((b) => (
                                  <li key={b} className="text-[0.8125rem] text-muted">· {b}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-line pt-6">
                      <p className="text-[0.625rem] font-semibold uppercase text-amber-800">
                        {output.onePager.now30.title}
                      </p>
                      <ul className="mt-3 space-y-3">
                        {output.onePager.now30.items.map((item) => (
                          <li key={item.action} className="text-[0.8125rem]">
                            <p className="font-semibold text-ink">{item.action}</p>
                            <p className="mt-0.5 leading-relaxed text-muted">{item.why}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[0.625rem] font-semibold uppercase text-sky-800">
                        {output.onePager.next90.title}
                      </p>
                      <ul className="mt-3 space-y-3">
                        {output.onePager.next90.items.map((item) => (
                          <li key={item.action} className="text-[0.8125rem]">
                            <p className="font-semibold text-ink">{item.action}</p>
                            <p className="mt-0.5 leading-relaxed text-muted">{item.why}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {output.onePager.notNow.parked.length > 0 && (
                      <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                        <p className="text-[0.625rem] font-semibold uppercase text-slate-600">
                          {output.onePager.notNow.title}
                        </p>
                        <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
                          {output.onePager.notNow.rationale}
                        </p>
                        <p className="mt-2 text-[0.8125rem] font-medium text-ink">
                          {output.onePager.notNow.parked.join(' · ')}
                        </p>
                      </div>
                    )}
                    <div className="border-t border-line pt-5">
                      <p className="text-[0.625rem] font-semibold uppercase text-muted-light">Proof the cascade is working</p>
                      <ul className="mt-2 space-y-1">
                        {output.onePager.metrics.map((m) => (
                          <li key={m} className="text-[0.8125rem] text-muted">· {m}</li>
                        ))}
                      </ul>
                      <p className="mt-3 text-[0.8125rem] font-medium text-ink">{output.onePager.reviewRhythm}</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="deck" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="grid gap-4 lg:grid-cols-[160px_1fr]">
                    <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                      {output.deck.map((slide, i) => (
                        <button
                          key={slide.number}
                          type="button"
                          onClick={() => setActiveSlide(i)}
                          className={`shrink-0 rounded-xl px-3 py-2.5 text-left text-[0.6875rem] ring-1 transition lg:w-full ${
                            activeSlide === i
                              ? 'bg-ink text-cream ring-ink'
                              : 'bg-white text-muted ring-line hover:text-ink'
                          }`}
                        >
                          <span className="font-semibold tabular-nums">{slide.number}</span>
                          <span className="ml-1.5 block lg:inline">{slide.title}</span>
                          <span className={`mt-0.5 block text-[0.5625rem] ${activeSlide === i ? 'text-cream/60' : 'text-muted-light'}`}>
                            {slide.cascadeStep}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-cream-dark/50 px-5 py-3">
                        <div>
                          <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-light">
                            Strategy pack · Slide {output.deck[activeSlide].number} of 8
                          </p>
                          <p className="text-[0.625rem] text-muted-light">
                            Cascade: {output.deck[activeSlide].cascadeStep}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            disabled={activeSlide === 0}
                            onClick={() => setActiveSlide((s) => s - 1)}
                            className="rounded-lg border border-line bg-white px-2.5 py-1 text-[0.75rem] text-muted disabled:opacity-30"
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            disabled={activeSlide === 7}
                            onClick={() => setActiveSlide((s) => s + 1)}
                            className="rounded-lg border border-line bg-white px-2.5 py-1 text-[0.75rem] text-muted disabled:opacity-30"
                          >
                            →
                          </button>
                        </div>
                      </div>
                      <div className="max-h-[520px] overflow-y-auto p-6 sm:p-8">
                        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-muted-light">
                          {output.deck[activeSlide].subtitle}
                        </p>
                        <h3 className="mt-2 text-[1.375rem] font-semibold text-ink">
                          {output.deck[activeSlide].title}
                        </h3>
                        {output.deck[activeSlide].intro && (
                          <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                            {output.deck[activeSlide].intro}
                          </p>
                        )}
                        <ul className="mt-5 space-y-2.5">
                          {output.deck[activeSlide].bullets.map((b) => (
                            <li key={b} className="flex gap-3 text-[0.875rem] leading-relaxed text-ink">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" />
                              {b}
                            </li>
                          ))}
                        </ul>
                        {output.deck[activeSlide].subsections?.map((sub) => (
                          <div key={sub.title} className="mt-6 border-t border-line pt-5">
                            <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-light">
                              {sub.title}
                            </p>
                            <ul className="mt-2 space-y-2">
                              {sub.items.map((item) => (
                                <li key={item} className="text-[0.8125rem] leading-relaxed text-muted">
                                  · {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-[0.75rem] text-muted-light">
                    Eight slides mapped to the choice cascade - board-ready depth, without the binder nobody opens.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col items-center gap-4 border-t border-line pt-8 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={reset}
                className="w-full rounded-xl border-2 border-ink bg-ink px-8 py-3.5 text-[0.9375rem] font-semibold text-cream shadow-md transition hover:bg-ink-soft active:scale-[0.99] sm:w-auto"
              >
                Reset · try a different sort
              </button>
              <p className="text-center text-[0.8125rem] text-muted-light sm:text-left">
                Different choices produce a different cascade.
              </p>
            </div>
          </motion.div>
        )}
        </div>
      </div>

      <AnimatePresence>
        {tip && !done && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-line bg-ink px-6 py-4 text-[0.8125rem] leading-relaxed text-cream/85 sm:px-8"
          >
            <span className="font-semibold text-cream">What we do in the room:</span> {tip}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
