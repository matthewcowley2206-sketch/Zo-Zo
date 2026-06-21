type DemoBusinessImpactPanelProps = {
  items: { label: string; value: string; emphasis?: boolean }[]
}

export function DemoBusinessImpactPanel({ items }: DemoBusinessImpactPanelProps) {
  return (
    <div className="space-y-2">
      <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-400">
        Business impact
      </p>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className={`rounded-xl p-3 ring-1 ${
              item.emphasis
                ? 'col-span-2 bg-amber-50 ring-amber-200'
                : 'bg-white ring-slate-100'
            }`}
          >
            <p
              className={`text-[0.625rem] font-semibold uppercase ${
                item.emphasis ? 'text-amber-800' : 'text-slate-400'
              }`}
            >
              {item.label}
            </p>
            <p
              className={`mt-1 font-semibold ${
                item.emphasis ? 'text-[1rem] text-amber-950' : 'text-[0.875rem] text-slate-900'
              }`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
