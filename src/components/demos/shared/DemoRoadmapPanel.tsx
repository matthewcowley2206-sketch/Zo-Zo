import type { RoadmapScenario } from '../brightlineDemoContent'

type DemoRoadmapPanelProps = {
  scenario: RoadmapScenario
  label: string
  day30: string[]
  day90: string[]
  strategic: string[]
  accentColor: string
}

export function DemoRoadmapPanel({
  scenario,
  label,
  day30,
  day90,
  strategic,
  accentColor,
}: DemoRoadmapPanelProps) {
  return (
    <div className="space-y-3">
      <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-400">
        Roadmap · {label}
      </p>
      {[
        { title: '30-day actions', items: day30 },
        { title: '90-day priorities', items: day90 },
        { title: 'Strategic roadmap', items: strategic },
      ].map((section) => (
        <div key={section.title} className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
          <p className="text-[0.6875rem] font-semibold uppercase text-slate-500">{section.title}</p>
          <ul className="mt-2 space-y-1.5">
            {section.items.map((item) => (
              <li key={item} className="flex gap-2 text-[0.8125rem] text-slate-700">
                <span style={{ color: accentColor }} aria-hidden>
                  →
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="text-[0.6875rem] text-slate-400">Scenario · {scenario}</p>
    </div>
  )
}
