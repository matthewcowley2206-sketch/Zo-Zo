import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  activityIntro,
  activityTitle,
  dataRows,
  datasetMeta,
  insightQuestions,
  type DataRow,
  type InsightQuestionId,
} from './dataInsightDemo'

function formatCurrency(value: number) {
  return `$${value}k`
}

function DataTable({
  rows,
  activeQuestion,
}: {
  rows: DataRow[]
  activeQuestion: (typeof insightQuestions)[number] | null
}) {
  const highlighted = new Set(activeQuestion?.highlightRowIds ?? [])

  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-slate-700/50">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-[0.75rem]">
          <thead>
            <tr className="border-b border-slate-700/60 bg-slate-800/80 text-slate-400">
              <th className="px-3 py-2.5 font-semibold">Client</th>
              <th className="px-3 py-2.5 font-semibold">Region</th>
              <th className="px-3 py-2.5 font-semibold">Segment</th>
              <th className="px-3 py-2.5 font-semibold text-right">Revenue</th>
              <th className="px-3 py-2.5 font-semibold text-right">Projects</th>
              <th className="px-3 py-2.5 font-semibold text-right">NPS</th>
              <th className="px-3 py-2.5 font-semibold text-right">Margin</th>
              <th className="px-3 py-2.5 font-semibold text-right">Manual hrs</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isHighlight = highlighted.has(row.id)
              const isDimmed = activeQuestion && !isHighlight

              return (
                <tr
                  key={row.id}
                  className={`border-b border-slate-700/30 transition ${
                    isHighlight
                      ? 'bg-violet-500/15'
                      : isDimmed
                        ? 'bg-slate-900/40 opacity-35'
                        : 'bg-slate-900/20'
                  }`}
                >
                  <td className={`px-3 py-2.5 ${isHighlight ? 'font-semibold text-violet-200' : 'text-slate-200'}`}>
                    {row.client}
                    {isHighlight && (
                      <span className="ml-2 rounded bg-violet-500/25 px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase text-violet-200">
                        Signal
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-slate-400">{row.region}</td>
                  <td className="px-3 py-2.5 text-slate-400">{row.segment}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-slate-200">
                    {formatCurrency(row.revenue)}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-slate-300">{row.projects}</td>
                  <td
                    className={`px-3 py-2.5 text-right tabular-nums ${
                      row.nps < 45 ? 'font-semibold text-amber-300' : 'text-slate-300'
                    }`}
                  >
                    {row.nps}
                  </td>
                  <td
                    className={`px-3 py-2.5 text-right tabular-nums ${
                      row.margin < 18 ? 'font-semibold text-rose-300' : 'text-slate-300'
                    }`}
                  >
                    {row.margin}%
                  </td>
                  <td
                    className={`px-3 py-2.5 text-right tabular-nums ${
                      row.manualHours >= 6 ? 'font-semibold text-sky-300' : 'text-slate-300'
                    }`}
                  >
                    {row.manualHours}h
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function DataAiDemo() {
  const [questionId, setQuestionId] = useState<InsightQuestionId | null>(null)
  const activeQuestion = insightQuestions.find((q) => q.id === questionId) ?? null

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-cream-dark/40">
      <div className="border-b border-line bg-cream px-6 py-5 sm:px-8">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
          Insight explorer · sample dataset
        </p>
        <p className="mt-2 text-[1.125rem] font-semibold text-ink">{activityTitle}</p>
        <p className="mt-2 max-w-[560px] text-[0.9375rem] leading-relaxed text-muted">
          {activityIntro}
        </p>
      </div>

      <div className="space-y-5 p-6 sm:p-8">
        <div>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
            Step 1 · Ask a business question
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {insightQuestions.map((question) => {
              const isActive = questionId === question.id

              return (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => setQuestionId(question.id)}
                  className={`rounded-2xl px-4 py-3.5 text-left transition ring-1 ${
                    isActive
                      ? 'bg-ink text-cream ring-ink shadow-md'
                      : 'bg-white text-ink ring-line hover:ring-ink/20'
                  }`}
                >
                  <p className="text-[0.8125rem] font-semibold leading-snug">{question.label}</p>
                  <p
                    className={`mt-1 text-[0.6875rem] ${
                      isActive ? 'text-cream/70' : 'text-muted-light'
                    }`}
                  >
                    {question.sub}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-slate-950 ring-1 ring-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3 sm:px-5">
            <div>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                Step 2 · Explore the data
              </p>
              <p className="mt-0.5 text-[0.875rem] font-semibold text-slate-100">{datasetMeta.title}</p>
              <p className="text-[0.6875rem] text-slate-500">{datasetMeta.subtitle}</p>
            </div>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-[0.625rem] font-medium text-slate-400 ring-1 ring-slate-700">
              {datasetMeta.source}
            </span>
          </div>

          <div className="p-4 sm:p-5">
            {!activeQuestion && (
              <p className="mb-4 rounded-xl bg-slate-900/80 px-4 py-3 text-[0.8125rem] text-slate-400 ring-1 ring-slate-800">
                Select a question above to highlight patterns in the dataset and surface an insight.
              </p>
            )}

            <DataTable rows={dataRows} activeQuestion={activeQuestion} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeQuestion ? (
            <motion.div
              key={activeQuestion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden rounded-2xl bg-white ring-1 ring-line"
            >
              <div className="border-b border-line bg-violet-50 px-5 py-4 sm:px-6">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-violet-700/70">
                  Step 3 · Insight surfaced
                </p>
                <p className="mt-1 text-[1.0625rem] font-semibold leading-snug text-ink">
                  {activeQuestion.insightHeadline}
                </p>
              </div>

              <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_280px]">
                <div>
                  <p className="text-[0.9375rem] leading-relaxed text-muted">
                    {activeQuestion.insightDetail}
                  </p>
                  <div className="mt-5 rounded-xl bg-cream-dark/60 p-4 ring-1 ring-line/80">
                    <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">
                      What we would recommend
                    </p>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-ink">
                      {activeQuestion.recommendation}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {activeQuestion.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl bg-slate-900 px-4 py-3 text-cream ring-1 ring-slate-800"
                    >
                      <p className="text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-slate-500">
                        {metric.label}
                      </p>
                      <p className="mt-1 text-[1.375rem] font-semibold tabular-nums">{metric.value}</p>
                      {metric.note && (
                        <p className="mt-0.5 text-[0.6875rem] text-slate-400">{metric.note}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-line bg-cream/50 px-5 py-4 sm:px-6">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
                  How this maps to our service
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {activeQuestion.deliverables.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-white px-3 py-1.5 text-[0.75rem] text-muted ring-1 ring-line"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-[0.875rem] text-muted"
            >
              Pick a question to see how we extract insight from complex data.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
