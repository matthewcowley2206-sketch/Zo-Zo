type DemoBusinessImpactPanelProps = {
  items: { label: string; value: string }[]
}

export function DemoBusinessImpactPanel({ items }: DemoBusinessImpactPanelProps) {
  return (
    <div className="space-y-2">
      <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-400">
        Business impact
      </p>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl bg-white p-3 ring-1 ring-slate-100">
            <p className="text-[0.625rem] font-semibold uppercase text-slate-400">{item.label}</p>
            <p className="mt-1 text-[0.875rem] font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
