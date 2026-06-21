import type { IndustryContext } from '../../../lib/demoAnalysis/types'
import { industryOptions } from '../../../lib/demoAnalysis/northgateIndustry'

type DemoIndustrySelectorProps = {
  value: IndustryContext
  onChange: (industry: IndustryContext) => void
  accentColor: string
}

export function DemoIndustrySelector({ value, onChange, accentColor }: DemoIndustrySelectorProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-400">
        Your industry context
      </p>
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {industryOptions.map((option) => {
          const selected = value === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`rounded-xl px-2.5 py-2 text-[0.6875rem] font-semibold leading-snug transition ring-1 ${
                selected
                  ? 'text-white ring-transparent shadow-sm'
                  : 'bg-white text-slate-700 ring-slate-200 hover:ring-slate-300'
              }`}
              style={selected ? { backgroundColor: accentColor } : undefined}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
