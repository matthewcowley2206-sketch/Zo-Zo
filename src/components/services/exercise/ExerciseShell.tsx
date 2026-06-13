import { useEffect, useRef, type ReactNode } from 'react'
import { ExerciseCoach, type CoachGuide } from './ExerciseCoach'
import { NextActionHint } from './NextActionHint'

type ExerciseShellProps = {
  eyebrow: string
  title: string
  intro: string
  stepIndex: number
  totalSteps: number
  guide: CoachGuide
  nextAction: string
  highlightContinue?: boolean
  subLabel?: string
  subProgress?: number
  subMax?: number
  coachExtra?: ReactNode
  showReset: boolean
  showBack: boolean
  primaryLabel: string
  primaryDisabled?: boolean
  isFinal?: boolean
  onReset: () => void
  onBack: () => void
  onPrimary: () => void
  children: ReactNode
  scrollKey?: string | number
}

export function ExerciseShell({
  eyebrow,
  title,
  intro,
  stepIndex,
  totalSteps,
  guide,
  nextAction,
  highlightContinue,
  subLabel,
  subProgress,
  subMax,
  coachExtra,
  showReset,
  showBack,
  primaryLabel,
  primaryDisabled,
  isFinal,
  onReset,
  onBack,
  onPrimary,
  children,
  scrollKey,
}: ExerciseShellProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [scrollKey ?? stepIndex])

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-cream-dark/40">
      <div className="border-b border-line bg-cream px-6 py-5 sm:px-8">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
          {eyebrow}
        </p>
        <p className="mt-2 text-[1.125rem] font-semibold text-ink">{title}</p>
        <p className="mt-2 max-w-[560px] text-[0.9375rem] leading-relaxed text-muted">{intro}</p>
      </div>

      <div className="space-y-6 p-6 sm:p-8">
        <ExerciseCoach
          stepIndex={stepIndex}
          totalSteps={totalSteps}
          guide={guide}
          subLabel={subLabel}
          subProgress={subProgress}
          subMax={subMax}
        >
          {coachExtra}
        </ExerciseCoach>

        <NextActionHint action={nextAction} highlightContinue={highlightContinue} />

        <div ref={contentRef}>{children}</div>

        <div className="sticky bottom-0 -mx-6 flex flex-wrap items-center gap-3 border-t border-line bg-cream/95 px-6 py-4 backdrop-blur sm:-mx-8 sm:px-8">
          {showBack && (
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl px-4 py-2.5 text-[0.8125rem] font-medium text-muted transition hover:bg-white hover:text-ink"
            >
              ← Back
            </button>
          )}
          {showReset && (
            <button
              type="button"
              onClick={onReset}
              className="hidden rounded-xl border border-line bg-white px-4 py-2.5 text-[0.8125rem] font-semibold text-ink transition hover:bg-cream-dark sm:inline-flex"
            >
              Reset
            </button>
          )}
          <button
            type="button"
            disabled={primaryDisabled}
            onClick={onPrimary}
            className={`ml-auto rounded-xl px-6 py-3 text-[0.875rem] font-semibold transition active:scale-[0.99] ${
              isFinal
                ? 'border-2 border-ink bg-ink text-cream shadow-md hover:bg-ink-soft'
                : primaryDisabled
                  ? 'bg-ink text-cream hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-40'
                  : 'animate-pulse bg-ink text-cream shadow-lg shadow-ink/25 hover:bg-ink-soft hover:animate-none'
            }`}
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export function ChoiceButton({
  selected,
  onClick,
  title,
  sub,
  className = '',
}: {
  selected: boolean
  onClick: () => void
  title: string
  sub?: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl p-4 text-left ring-1 transition sm:p-5 ${
        selected
          ? 'bg-ink text-cream ring-ink ring-2'
          : 'bg-white ring-line hover:ring-ink/20'
      } ${className}`}
    >
      <p className="font-semibold">{title}</p>
      {sub && (
        <p className={`mt-1 text-[0.8125rem] ${selected ? 'text-cream/75' : 'text-muted'}`}>{sub}</p>
      )}
    </button>
  )
}

export function OutputCard({
  label,
  children,
  dark,
}: {
  label: string
  children: ReactNode
  dark?: boolean
}) {
  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 ${
        dark ? 'border-2 border-ink/10 bg-ink text-cream' : 'bg-white ring-1 ring-line'
      }`}
    >
      <p
        className={`text-[0.625rem] font-semibold uppercase ${
          dark ? 'text-cream/50' : 'text-muted-light'
        }`}
      >
        {label}
      </p>
      {children}
    </div>
  )
}
