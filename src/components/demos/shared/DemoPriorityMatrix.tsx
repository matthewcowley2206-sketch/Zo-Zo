import type { DemoRecommendation, RecommendationQuadrant } from '../demoTypes'

type DemoPriorityMatrixProps = {
  recommendations: DemoRecommendation[]
  accentColor: string
}

const quadrantConfig: Record<
  RecommendationQuadrant,
  { label: string; subtitle: string; actionLabel: string; className: string }
> = {
  'quick-win': {
    label: 'Start here',
    subtitle: 'Quick wins · act this quarter',
    actionLabel: 'Do first',
    className: 'bg-emerald-50 ring-emerald-200',
  },
  strategic: {
    label: 'Invest next',
    subtitle: 'Strategic · high return',
    actionLabel: 'Plan Q3',
    className: 'bg-sky-50 ring-sky-200',
  },
  'long-term': {
    label: 'Build capability',
    subtitle: 'Longer-term · foundation',
    actionLabel: 'Roadmap',
    className: 'bg-slate-50 ring-slate-200',
  },
}

export function DemoPriorityMatrix({ recommendations, accentColor }: DemoPriorityMatrixProps) {
  const grouped = groupByQuadrant(recommendations)
  const firstAction = recommendations[0]

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-400">
            What should we do next?
          </p>
          <p className="mt-0.5 text-[0.8125rem] font-medium text-slate-800">
            Prioritised actions from your feedback — not a report.
          </p>
        </div>
        {firstAction && (
          <span
            className="shrink-0 rounded-full px-2.5 py-1 text-[0.5625rem] font-bold uppercase text-white"
            style={{ backgroundColor: accentColor }}
          >
            Top pick
          </span>
        )}
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {(Object.keys(quadrantConfig) as RecommendationQuadrant[]).map((quadrant) => {
          const config = quadrantConfig[quadrant]
          const items = grouped[quadrant]
          return (
            <div key={quadrant} className={`rounded-xl p-3 ring-1 ${config.className}`}>
              <div className="flex items-center justify-between gap-1">
                <p className="text-[0.6875rem] font-semibold text-slate-900">{config.label}</p>
                <span className="text-[0.5625rem] font-semibold uppercase text-slate-500">
                  {config.actionLabel}
                </span>
              </div>
              <p className="text-[0.625rem] text-slate-500">{config.subtitle}</p>
              <div className="mt-2 space-y-1.5">
                {items.length === 0 ? (
                  <p className="text-[0.6875rem] italic text-slate-400">No items in this band</p>
                ) : (
                  items.map((rec, i) => (
                    <div
                      key={rec.id}
                      className={`rounded-lg px-2.5 py-2 ring-1 ${
                        i === 0 && quadrant === 'quick-win'
                          ? 'bg-white ring-emerald-300'
                          : 'bg-white/80 ring-black/5'
                      }`}
                    >
                      <p className="text-[0.6875rem] font-semibold leading-snug text-slate-900">
                        {rec.title}
                      </p>
                      {rec.impact && (
                        <p className="mt-1 text-[0.625rem] font-medium text-emerald-800">{rec.impact}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-center text-[0.6875rem] text-slate-600">
        Select an action below to complete the journey.
      </p>
    </div>
  )
}

function groupByQuadrant(recommendations: DemoRecommendation[]) {
  const groups: Record<RecommendationQuadrant, DemoRecommendation[]> = {
    'quick-win': [],
    strategic: [],
    'long-term': [],
  }

  for (const rec of recommendations) {
    const q = rec.quadrant ?? 'strategic'
    groups[q].push(rec)
  }

  return groups
}
