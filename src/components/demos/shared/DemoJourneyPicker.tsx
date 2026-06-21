import type { DemoJourney } from '../demoTypes'

type DemoJourneyPickerProps = {
  journeys: DemoJourney[]
  accentColor: string
  onSelect: (journeyId: string) => void
}

export function DemoJourneyPicker({
  journeys,
  accentColor,
  onSelect,
}: DemoJourneyPickerProps) {
  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-amber-50 px-3 py-2 ring-1 ring-amber-100">
        <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-amber-800">
          Step 1 · Choose a scenario
        </p>
        <p className="mt-1 text-[0.8125rem] text-amber-900">
          What would this feel like in your business tomorrow?
        </p>
      </div>
      {journeys.map((journey) => (
        <button
          key={journey.id}
          type="button"
          onClick={() => onSelect(journey.id)}
          className="w-full rounded-2xl bg-white p-4 text-left ring-1 ring-slate-100 transition hover:ring-amber-200"
        >
            <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-400">
              {journey.persona}
            </p>
            <p className="mt-1 font-semibold text-slate-900">{journey.title}</p>
            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-slate-600">
              &ldquo;{journey.scenario}&rdquo;
            </p>
          <p className="mt-3 text-[0.75rem] font-medium" style={{ color: accentColor }}>
            Start journey →
          </p>
        </button>
      ))}
    </div>
  )
}
