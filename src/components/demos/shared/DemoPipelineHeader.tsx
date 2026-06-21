const stages = [
  { id: 'input', label: 'Raw stakeholder input' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'insight', label: 'Executive insight' },
  { id: 'action', label: 'Recommended actions' },
] as const

export type PipelineStage = (typeof stages)[number]['id']

type DemoPipelineHeaderProps = {
  activeStage: PipelineStage
  accentColor: string
}

export function DemoPipelineHeader({ activeStage, accentColor }: DemoPipelineHeaderProps) {
  const activeIndex = stages.findIndex((s) => s.id === activeStage)

  return (
    <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
      <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-400">
        Transformation pipeline
      </p>
      <div className="mt-3 flex items-start gap-0.5">
        {stages.map((stage, index) => {
          const isActive = stage.id === activeStage
          const isComplete = index < activeIndex
          return (
            <div key={stage.id} className="flex min-w-0 flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                {index > 0 && (
                  <div
                    className={`h-0.5 flex-1 ${isComplete || isActive ? 'opacity-100' : 'opacity-30'}`}
                    style={{ backgroundColor: isComplete || isActive ? accentColor : '#cbd5e1' }}
                  />
                )}
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-bold ${
                    isActive ? 'text-white' : isComplete ? 'text-white' : 'bg-slate-100 text-slate-400'
                  }`}
                  style={
                    isActive || isComplete ? { backgroundColor: accentColor } : undefined
                  }
                >
                  {isComplete ? '✓' : index + 1}
                </div>
                {index < stages.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 ${isComplete ? 'opacity-100' : 'opacity-30'}`}
                    style={{ backgroundColor: isComplete ? accentColor : '#cbd5e1' }}
                  />
                )}
              </div>
              <p
                className={`mt-1.5 hidden text-center text-[0.5625rem] font-semibold leading-tight sm:block ${
                  isActive ? 'text-slate-900' : 'text-slate-400'
                }`}
              >
                {stage.label}
              </p>
            </div>
          )
        })}
      </div>
      <p className="mt-2 text-center text-[0.6875rem] font-medium text-slate-600 sm:hidden">
        {stages[activeIndex]?.label}
      </p>
    </div>
  )
}

export { stages as pipelineStages }
