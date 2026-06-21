type DemoInsightTransparencyProps = {
  items: { label: string; value: number | string }[]
}

export function DemoInsightTransparency({ items }: DemoInsightTransparencyProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-400">
        Generated from
      </p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item.label} className="flex items-center justify-between gap-2 text-[0.75rem]">
            <span className="text-slate-600">{item.label}</span>
            <span className="font-semibold tabular-nums text-slate-900">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
