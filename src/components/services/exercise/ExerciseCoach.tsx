import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-cream/20">
      <motion.div
        className="h-full rounded-full bg-cream"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />
    </div>
  )
}

export type CoachGuide = {
  title: string
  instruction: string
  tip?: string
}

export function ExerciseCoach({
  stepIndex,
  totalSteps,
  guide,
  subLabel,
  subProgress,
  subMax,
  children,
}: {
  stepIndex: number
  totalSteps: number
  guide: CoachGuide
  subLabel?: string
  subProgress?: number
  subMax?: number
  children?: ReactNode
}) {
  const progressValue =
    subProgress !== undefined && subMax
      ? stepIndex + subProgress / subMax
      : stepIndex + 1

  return (
    <div className="rounded-2xl bg-ink p-5 text-cream sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-cream/50">
          Step {stepIndex + 1} of {totalSteps}
          {subLabel ? ` · ${subLabel}` : ''}
        </p>
        {subProgress !== undefined && subMax !== undefined && (
          <p className="text-[0.6875rem] font-medium text-cream/60">
            {subProgress} of {subMax}
          </p>
        )}
      </div>
      <ProgressBar value={progressValue} max={totalSteps} />
      <p className="mt-4 text-[1.0625rem] font-semibold leading-snug">{guide.title}</p>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-cream/85">{guide.instruction}</p>
      {guide.tip && (
        <p className="mt-3 rounded-xl bg-white/10 px-3 py-2.5 text-[0.8125rem] leading-relaxed text-cream/75">
          {guide.tip}
        </p>
      )}
      {children}
    </div>
  )
}
