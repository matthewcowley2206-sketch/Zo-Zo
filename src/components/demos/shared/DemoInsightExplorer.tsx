import type { ReactNode } from 'react'
import { GuideTarget, useGuideActivate } from '../DemoGuide'

export type InsightCategory = {
  id: string
  label: string
  score: number
  sentiment: 'positive' | 'mixed' | 'negative'
  summary: string
  mentions: number
  risk?: string
  supportingQuotes?: string[]
  rootCauses?: string[]
  recommendedActions?: string[]
}

type DemoInsightExplorerProps = {
  categories: InsightCategory[]
  activeId: string
  onSelect: (id: string) => void
  highlightTargetId?: string
  accentColor: string
  drillDown?: boolean
}

const sentimentStyles = {
  positive: 'bg-emerald-50 text-emerald-800 ring-emerald-100',
  mixed: 'bg-amber-50 text-amber-800 ring-amber-100',
  negative: 'bg-rose-50 text-rose-800 ring-rose-100',
}

export function DemoInsightExplorer({
  categories,
  activeId,
  onSelect,
  highlightTargetId,
  accentColor,
  drillDown = false,
}: DemoInsightExplorerProps) {
  const active = categories.find((c) => c.id === activeId) ?? categories[0]

  return (
    <div className="space-y-3">
      <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-400">
        Insight explorer
      </p>
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => {
          const targetId = `theme-${cat.id}`
          const isHighlight = highlightTargetId === targetId
          const tab = (
            <button
              type="button"
              onClick={() => onSelect(cat.id)}
              className={`rounded-lg px-2.5 py-1.5 text-[0.6875rem] font-semibold transition ${
                activeId === cat.id
                  ? 'text-white'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-300'
              }`}
              style={activeId === cat.id ? { backgroundColor: accentColor } : undefined}
            >
              {cat.label}
            </button>
          )

          if (isHighlight) {
            return (
              <GuideTarget key={cat.id} id={targetId}>
                {tab}
              </GuideTarget>
            )
          }

          return (
            <span key={cat.id} data-demo-target={targetId}>
              {tab}
            </span>
          )
        })}
      </div>

      <InsightDetail category={active} accentColor={accentColor} drillDown={drillDown} />
    </div>
  )
}

function InsightDetail({
  category,
  accentColor,
  drillDown,
}: {
  category: InsightCategory
  accentColor: string
  drillDown: boolean
}) {
  return (
    <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-900">{category.label}</p>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-slate-600">{category.summary}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[1.25rem] font-bold tabular-nums" style={{ color: accentColor }}>
            {category.score}
          </p>
          <p className="text-[0.625rem] text-slate-400">score</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2 py-0.5 text-[0.625rem] font-semibold uppercase ring-1 ${sentimentStyles[category.sentiment]}`}
        >
          {category.sentiment}
        </span>
        <span className="text-[0.6875rem] text-slate-500">{category.mentions} mentions</span>
      </div>
      {category.risk && (
        <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-[0.75rem] text-rose-900 ring-1 ring-rose-100">
          Risk signal · {category.risk}
        </p>
      )}

      {drillDown && (
        <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
          {category.supportingQuotes && category.supportingQuotes.length > 0 && (
            <DrillSection title="Supporting signals">
              {category.supportingQuotes.map((q) => (
                <p key={q} className="text-[0.75rem] italic leading-relaxed text-slate-600">
                  &ldquo;{q}&rdquo;
                </p>
              ))}
            </DrillSection>
          )}
          {category.rootCauses && category.rootCauses.length > 0 && (
            <DrillSection title="Root causes">
              <ul className="space-y-1">
                {category.rootCauses.map((c) => (
                  <li key={c} className="text-[0.75rem] text-slate-700">
                    · {c}
                  </li>
                ))}
              </ul>
            </DrillSection>
          )}
          {category.recommendedActions && category.recommendedActions.length > 0 && (
            <DrillSection title="Recommended actions">
              <ul className="space-y-1">
                {category.recommendedActions.map((a) => (
                  <li key={a} className="text-[0.75rem] font-medium text-emerald-800">
                    → {a}
                  </li>
                ))}
              </ul>
            </DrillSection>
          )}
        </div>
      )}
    </div>
  )
}

function DrillSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-400">{title}</p>
      <div className="mt-1.5 space-y-1.5">{children}</div>
    </div>
  )
}

export function useInsightThemeActivate(themeId: string) {
  return useGuideActivate(`theme-${themeId}`)
}
