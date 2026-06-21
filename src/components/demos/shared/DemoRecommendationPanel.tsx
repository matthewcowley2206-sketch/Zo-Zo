import { GuideTarget, useGuideActivate } from '../DemoGuide'
import type { DemoRecommendation } from '../demoTypes'

type DemoRecommendationPanelProps = {
  recommendations: DemoRecommendation[]
  accentColor: string
  highlightTargetId: string
  onSelect: (id: string) => void
  selectedId?: string
  title?: string
}

export function DemoRecommendationPanel({
  recommendations,
  accentColor,
  highlightTargetId,
  onSelect,
  selectedId,
  title = 'Step 4 · Recommended actions',
}: DemoRecommendationPanelProps) {
  return (
    <div className="space-y-2">
      <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </p>
      {recommendations.map((rec) => (
        <RecommendationCard
          key={rec.id}
          rec={rec}
          accentColor={accentColor}
          highlight={highlightTargetId === `action-${rec.id}`}
          selected={selectedId === rec.id}
          onSelect={() => onSelect(rec.id)}
        />
      ))}
    </div>
  )
}

function RecommendationCard({
  rec,
  accentColor,
  highlight,
  selected,
  onSelect,
}: {
  rec: DemoRecommendation
  accentColor: string
  highlight: boolean
  selected: boolean
  onSelect: () => void
}) {
  const targetId = `action-${rec.id}`
  const { onGuideAction } = useGuideActivate(targetId)

  const card = (
    <button
      type="button"
      onClick={() => {
        onGuideAction()
        onSelect()
      }}
      className={`w-full rounded-xl p-3 text-left ring-1 transition ${
        selected
          ? 'bg-emerald-50 ring-emerald-200'
          : 'bg-white ring-slate-100 hover:ring-amber-200'
      }`}
    >
      <p className="font-semibold text-slate-900">{rec.title}</p>
      <p className="mt-1 text-[0.75rem] leading-relaxed text-slate-600">{rec.description}</p>
      {rec.impact && (
        <p className="mt-2 text-[0.6875rem] font-medium" style={{ color: accentColor }}>
          {rec.impact}
        </p>
      )}
    </button>
  )

  if (highlight) {
    return <GuideTarget id={targetId}>{card}</GuideTarget>
  }

  return <div data-demo-target={targetId}>{card}</div>
}
