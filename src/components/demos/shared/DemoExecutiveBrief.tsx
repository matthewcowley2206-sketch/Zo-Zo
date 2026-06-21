type DemoExecutiveBriefProps = {
  summary: string
  keyThemes: string[]
  risks: string[]
  opportunities: string[]
  recommendedActions: string[]
}

export function DemoExecutiveBrief({
  summary,
  keyThemes,
  risks,
  opportunities,
  recommendedActions,
}: DemoExecutiveBriefProps) {
  return (
    <div className="space-y-3 rounded-xl bg-white p-4 ring-1 ring-slate-200">
      <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-400">
        Executive brief
      </p>

      <section>
        <h4 className="text-[0.6875rem] font-semibold uppercase text-slate-500">Executive summary</h4>
        <p className="mt-1 text-[0.8125rem] leading-relaxed text-slate-700">{summary}</p>
      </section>

      <BriefList title="Key themes" items={keyThemes} />
      <BriefList title="Risks" items={risks} tone="rose" />
      <BriefList title="Opportunities" items={opportunities} tone="emerald" />
      <BriefList title="Recommended actions" items={recommendedActions} tone="slate" />
    </div>
  )
}

function BriefList({
  title,
  items,
  tone = 'slate',
}: {
  title: string
  items: string[]
  tone?: 'slate' | 'rose' | 'emerald'
}) {
  const dot =
    tone === 'rose' ? 'bg-rose-400' : tone === 'emerald' ? 'bg-emerald-500' : 'bg-slate-400'

  return (
    <section>
      <h4 className="text-[0.6875rem] font-semibold uppercase text-slate-500">{title}</h4>
      <ul className="mt-1.5 space-y-1">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-[0.75rem] leading-relaxed text-slate-700">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
