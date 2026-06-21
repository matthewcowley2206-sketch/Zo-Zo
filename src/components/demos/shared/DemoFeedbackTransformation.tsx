import type { ReactNode } from 'react'
import { DemoExecutiveBrief } from './DemoExecutiveBrief'

type DemoFeedbackTransformationProps = {
  rawExcerpts: string[]
  brief: {
    summary: string
    keyThemes: string[]
    risks: string[]
    opportunities: string[]
    recommendedActions: string[]
    leadershipPriorities: string[]
  }
  accentColor: string
}

export function DemoFeedbackTransformation({
  rawExcerpts,
  brief,
  accentColor,
}: DemoFeedbackTransformationProps) {
  const topPriority = brief.leadershipPriorities[0]
  const summaryPreview = brief.summary.length > 140 ? `${brief.summary.slice(0, 137)}…` : brief.summary

  return (
    <div className="overflow-hidden rounded-2xl ring-2 ring-slate-900/15 shadow-lg">
      <div className="border-b border-slate-700 bg-slate-950 px-4 py-3 text-center">
        <p className="text-[0.625rem] font-semibold uppercase tracking-widest text-slate-400">
          Zo & Zo · Client Listening Intelligence
        </p>
        <p className="mt-1 text-[0.9375rem] font-semibold text-white">
          This is what Zo & Zo creates from stakeholder input
        </p>
      </div>

      {/* Mobile: brief preview above fold so transformation is obvious immediately */}
      <div
        className="border-b px-4 py-3 lg:hidden"
        style={{ backgroundColor: accentColor, borderColor: `${accentColor}cc` }}
      >
        <p className="text-[0.5625rem] font-semibold uppercase tracking-wide text-white/70">
          Executive-ready insight · preview
        </p>
        <p className="mt-1 text-[0.8125rem] font-semibold leading-snug text-white">{summaryPreview}</p>
        {topPriority && (
          <p className="mt-2 text-[0.6875rem] leading-relaxed text-white/90">
            <span className="font-semibold">Priority 1:</span> {topPriority}
          </p>
        )}
      </div>

      <div className="grid gap-0 lg:grid-cols-2">
        {/* Raw input — muted, unstructured */}
        <div className="relative border-b border-dashed border-slate-300 bg-slate-200/80 p-4 lg:border-b-0 lg:border-r lg:border-dashed">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-8 bg-gradient-to-r from-transparent to-white/40 lg:block" />
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-500 text-[0.625rem] font-bold text-white">
              1
            </span>
            <div>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-slate-600">
                Raw stakeholder input
              </p>
              <p className="text-[0.625rem] text-slate-500">Unstructured · verbatim</p>
            </div>
          </div>
          <div className="space-y-2">
            {rawExcerpts.slice(0, 4).map((excerpt) => (
              <blockquote
                key={excerpt.slice(0, 40)}
                className="rounded-lg border border-slate-300/80 bg-slate-50 px-3 py-2.5 text-[0.75rem] italic leading-relaxed text-slate-600"
              >
                &ldquo;{highlightKeywords(excerpt)}&rdquo;
              </blockquote>
            ))}
          </div>
        </div>

        {/* Executive insight — elevated, structured */}
        <div
          className="relative bg-white p-4 ring-4 ring-inset lg:ring-8"
          style={{ boxShadow: `inset 0 0 0 1px ${accentColor}22`, outlineColor: `${accentColor}18` }}
        >
          <div
            className="absolute left-4 top-0 hidden h-full w-1 rounded-full lg:block"
            style={{ backgroundColor: accentColor }}
          />
          <div className="mb-3 flex items-center gap-2 lg:pl-3">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full text-[0.6875rem] font-bold text-white shadow-md"
              style={{ backgroundColor: accentColor }}
            >
              2
            </span>
            <div>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-slate-800">
                Executive-ready insight
              </p>
              <p className="text-[0.625rem] font-medium text-emerald-700">Structured · leadership-ready</p>
            </div>
          </div>
          <div className="lg:pl-3">
            <DemoExecutiveBrief {...brief} compact />
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-center gap-2 border-t border-slate-200 px-4 py-2.5 text-[0.6875rem] font-medium"
        style={{ backgroundColor: `${accentColor}10` }}
      >
        <span className="rounded bg-slate-200 px-2 py-0.5 text-slate-600">Raw input</span>
        <span className="text-lg font-bold" style={{ color: accentColor }}>
          →
        </span>
        <span
          className="rounded px-2 py-0.5 font-semibold text-white"
          style={{ backgroundColor: accentColor }}
        >
          Leadership decision support
        </span>
      </div>
    </div>
  )
}

function highlightKeywords(text: string): ReactNode {
  const keywords = ['slow', 'wait', 'fee', 'value', 'update', 'unclear', 'proactive', 'trust', 'excellent', 'reactive']
  const parts: ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    let earliest: { word: string; index: number } | null = null
    const lower = remaining.toLowerCase()
    for (const word of keywords) {
      const index = lower.indexOf(word)
      if (index !== -1 && (earliest === null || index < earliest.index)) {
        earliest = { word, index }
      }
    }
    if (!earliest) {
      parts.push(remaining)
      break
    }
    if (earliest.index > 0) parts.push(remaining.slice(0, earliest.index))
    parts.push(
      <mark key={key++} className="rounded bg-amber-200/80 px-0.5 not-italic text-amber-950">
        {remaining.slice(earliest.index, earliest.index + earliest.word.length)}
      </mark>,
    )
    remaining = remaining.slice(earliest.index + earliest.word.length)
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>
}
