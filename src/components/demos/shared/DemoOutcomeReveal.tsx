import { GuideTarget, useGuideActivate } from '../DemoGuide'
import { DemoButton } from '../DeviceFrame'
import type { DemoOutcome } from '../demoTypes'

type DemoOutcomeRevealProps = {
  outcome: DemoOutcome
  accentColor: string
  targetId?: string
  onContinue?: () => void
}

export function DemoOutcomeReveal({
  outcome,
  accentColor,
  targetId = 'outcome-continue',
  onContinue,
}: DemoOutcomeRevealProps) {
  const { onGuideAction } = useGuideActivate(targetId)

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-emerald-50 px-3 py-2 ring-1 ring-emerald-100">
        <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-emerald-800">
          Step 5 · Business outcome
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-slate-100 p-3">
          <p className="text-[0.625rem] font-semibold uppercase text-slate-400">
            {outcome.beforeLabel}
          </p>
          <p className="mt-1 text-[0.8125rem] font-medium text-slate-600">{outcome.beforeValue}</p>
        </div>
        <div className="rounded-xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
          <p className="text-[0.625rem] font-semibold uppercase text-emerald-700">
            {outcome.afterLabel}
          </p>
          <p className="mt-1 text-[0.8125rem] font-semibold text-emerald-900">{outcome.afterValue}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-amber-900 p-4 text-white">
        <p className="text-[0.9375rem] font-semibold">{outcome.headline}</p>
        {outcome.metric && (
          <p className="mt-2 text-[1.25rem] font-bold text-amber-200">{outcome.metric}</p>
        )}
      </div>

      {onContinue && (
        <GuideTarget id={targetId}>
          <DemoButton
            accentColor={accentColor}
            onClick={() => {
              onGuideAction()
              onContinue()
            }}
          >
            Continue exploring
          </DemoButton>
        </GuideTarget>
      )}
    </div>
  )
}
