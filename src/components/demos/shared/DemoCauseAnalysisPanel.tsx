import type { DiagnosisCause } from '../../../lib/demoAnalysis/types'

type DemoCauseAnalysisPanelProps = {
  causes: DiagnosisCause[]
  confidence: number
  matchedSignals?: string[]
}

export function DemoCauseAnalysisPanel({
  causes,
  confidence,
  matchedSignals,
}: DemoCauseAnalysisPanelProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 ring-1 ring-slate-200">
        <div>
          <p className="text-[0.625rem] font-semibold uppercase text-slate-400">Diagnosis confidence</p>
          <p className="text-[1.375rem] font-bold tabular-nums text-slate-900">{confidence}%</p>
        </div>
        {matchedSignals && matchedSignals.length > 0 && (
          <div className="text-right">
            <p className="text-[0.625rem] font-semibold uppercase text-slate-400">Matched signals</p>
            <p className="mt-1 text-[0.6875rem] text-slate-600">{matchedSignals.slice(0, 3).join(' · ')}</p>
          </div>
        )}
      </div>

      <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-400">
        Most likely causes
      </p>
      {causes.map((cause) => (
        <div key={cause.id} className="rounded-xl bg-white p-3 ring-1 ring-slate-100">
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold text-slate-900">{cause.name}</p>
            <span className="shrink-0 rounded-full bg-violet-100 px-2 py-0.5 text-[0.6875rem] font-bold tabular-nums text-violet-800">
              {cause.probability}%
            </span>
          </div>
          <p className="mt-1 text-[0.75rem] leading-relaxed text-slate-600">{cause.explanation}</p>
          <p className="mt-2 text-[0.6875rem] font-medium text-emerald-800">→ {cause.action}</p>
        </div>
      ))}
    </div>
  )
}
