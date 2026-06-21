import { useState, type ReactNode } from 'react'
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
  expectedOutcomes?: string[]
}

type DrillStep = 'theme' | 'comments' | 'causes' | 'actions' | 'outcomes'

type DemoInsightExplorerProps = {
  categories: InsightCategory[]
  activeId: string
  onSelect: (id: string) => void
  highlightTargetId?: string
  accentColor: string
  drillDown?: boolean
  connected?: boolean
}

const drillSteps: { id: DrillStep; label: string }[] = [
  { id: 'theme', label: 'Theme' },
  { id: 'comments', label: 'Comments' },
  { id: 'causes', label: 'Root causes' },
  { id: 'actions', label: 'Actions' },
  { id: 'outcomes', label: 'Outcomes' },
]

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
  connected = false,
}: DemoInsightExplorerProps) {
  const [activeStep, setActiveStep] = useState<DrillStep>('theme')
  const active = categories.find((c) => c.id === activeId) ?? categories[0]

  const handleSelectTheme = (id: string) => {
    onSelect(id)
    if (connected) setActiveStep('theme')
  }

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
              onClick={() => handleSelectTheme(cat.id)}
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

      {connected && drillDown ? (
        <ConnectedInsightPanel
          category={active}
          accentColor={accentColor}
          activeStep={activeStep}
          onStepChange={setActiveStep}
        />
      ) : (
        <InsightDetail category={active} accentColor={accentColor} drillDown={drillDown} />
      )}
    </div>
  )
}

function ConnectedInsightPanel({
  category,
  accentColor,
  activeStep,
  onStepChange,
}: {
  category: InsightCategory
  accentColor: string
  activeStep: DrillStep
  onStepChange: (step: DrillStep) => void
}) {
  const stepIndex = drillSteps.findIndex((s) => s.id === activeStep)

  return (
    <div className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
      <div className="flex gap-0.5 overflow-x-auto border-b border-slate-100 bg-slate-50 px-2 py-2">
        {drillSteps.map((step, i) => {
          const isActive = step.id === activeStep
          const isPast = i < stepIndex
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepChange(step.id)}
              className={`flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-[0.625rem] font-semibold transition ${
                isActive
                  ? 'text-white'
                  : isPast
                    ? 'bg-white text-slate-700 ring-1 ring-slate-200'
                    : 'text-slate-400 hover:text-slate-600'
              }`}
              style={isActive ? { backgroundColor: accentColor } : undefined}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full text-[0.5rem] ${
                  isPast && !isActive ? 'bg-emerald-100 text-emerald-700' : ''
                }`}
              >
                {isPast && !isActive ? '✓' : i + 1}
              </span>
              {step.label}
            </button>
          )
        })}
      </div>

      <div className="p-4">
        {activeStep === 'theme' && (
          <ThemeStep category={category} accentColor={accentColor} onNext={() => onStepChange('comments')} />
        )}
        {activeStep === 'comments' && (
          <ListStep
            title="Supporting comments"
            items={category.supportingQuotes ?? []}
            render={(q) => (
              <p className="text-[0.75rem] italic leading-relaxed text-slate-600">&ldquo;{q}&rdquo;</p>
            )}
            onNext={() => onStepChange('causes')}
            accentColor={accentColor}
          />
        )}
        {activeStep === 'causes' && (
          <ListStep
            title="Root causes"
            items={category.rootCauses ?? []}
            render={(c) => <p className="text-[0.75rem] text-slate-700">· {c}</p>}
            onNext={() => onStepChange('actions')}
            accentColor={accentColor}
          />
        )}
        {activeStep === 'actions' && (
          <ListStep
            title="Recommendations"
            items={category.recommendedActions ?? []}
            render={(a) => (
              <p className="text-[0.75rem] font-medium text-emerald-800">→ {a}</p>
            )}
            onNext={() => onStepChange('outcomes')}
            accentColor={accentColor}
          />
        )}
        {activeStep === 'outcomes' && (
          <ListStep
            title="Expected outcomes"
            items={category.expectedOutcomes ?? []}
            render={(o) => (
              <p className="text-[0.75rem] font-medium text-sky-900">◆ {o}</p>
            )}
            accentColor={accentColor}
            isLast
          />
        )}
      </div>
    </div>
  )
}

function ThemeStep({
  category,
  accentColor,
  onNext,
}: {
  category: InsightCategory
  accentColor: string
  onNext: () => void
}) {
  return (
    <div>
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
      <button
        type="button"
        onClick={onNext}
        className="mt-4 text-[0.6875rem] font-semibold"
        style={{ color: accentColor }}
      >
        View supporting comments →
      </button>
    </div>
  )
}

function ListStep({
  title,
  items,
  render,
  onNext,
  accentColor,
  isLast = false,
}: {
  title: string
  items: string[]
  render: (item: string) => ReactNode
  onNext?: () => void
  accentColor: string
  isLast?: boolean
}) {
  return (
    <div>
      <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-400">{title}</p>
      <div className="mt-2 space-y-2">
        {items.length === 0 ? (
          <p className="text-[0.75rem] text-slate-500">No items identified for this theme.</p>
        ) : (
          items.map((item) => <div key={item}>{render(item)}</div>)
        )}
      </div>
      {!isLast && onNext && (
        <button
          type="button"
          onClick={onNext}
          className="mt-4 text-[0.6875rem] font-semibold"
          style={{ color: accentColor }}
        >
          Continue →
        </button>
      )}
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
          {category.expectedOutcomes && category.expectedOutcomes.length > 0 && (
            <DrillSection title="Expected outcomes">
              <ul className="space-y-1">
                {category.expectedOutcomes.map((o) => (
                  <li key={o} className="text-[0.75rem] font-medium text-sky-900">
                    ◆ {o}
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
