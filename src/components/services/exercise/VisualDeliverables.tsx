import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function DeliverableFrame({
  label,
  badge,
  children,
  dark,
}: {
  label: string
  badge?: string
  children: ReactNode
  dark?: boolean
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl ring-1 ${
        dark ? 'bg-ink text-cream ring-ink/20' : 'bg-white ring-line shadow-sm'
      }`}
    >
      <div
        className={`flex items-center justify-between gap-3 border-b px-5 py-3 ${
          dark ? 'border-cream/10 bg-ink-soft/50' : 'border-line bg-cream-dark/30'
        }`}
      >
        <p className={`text-[0.625rem] font-semibold uppercase tracking-[0.1em] ${dark ? 'text-cream/50' : 'text-muted-light'}`}>
          {label}
        </p>
        {badge && (
          <span className={`rounded-full px-2.5 py-0.5 text-[0.625rem] font-semibold ${dark ? 'bg-cream/10 text-cream/80' : 'bg-ink text-cream'}`}>
            {badge}
          </span>
        )}
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  )
}

export function StatPill({ label, value, tone = 'default' }: { label: string; value: string; tone?: 'default' | 'good' | 'warn' }) {
  const tones = {
    default: 'bg-cream-dark text-ink',
    good: 'bg-emerald-50 text-emerald-900 ring-1 ring-emerald-100',
    warn: 'bg-amber-50 text-amber-900 ring-1 ring-amber-100',
  }
  return (
    <div className={`rounded-xl px-4 py-3 ${tones[tone]}`}>
      <p className="text-[0.625rem] font-semibold uppercase tracking-wide opacity-70">{label}</p>
      <p className="mt-1 text-[1.125rem] font-bold tabular-nums">{value}</p>
    </div>
  )
}

export function ProgressBarVisual({ value, max, label, color = 'bg-ink' }: { value: number; max: number; label?: string; color?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div>
      {label && <p className="mb-2 text-[0.75rem] font-medium text-muted">{label}</p>}
      <div className="h-3 overflow-hidden rounded-full bg-line/60">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export function FunnelVisual({
  stages,
  leakIds,
  fixLabel,
}: {
  stages: { id: string; label: string; sub: string }[]
  leakIds: string[]
  fixLabel?: string
}) {
  return (
    <div className="space-y-2">
      {stages.map((s, i) => {
        const isLeak = leakIds.includes(s.id)
        return (
          <div key={s.id} className="flex items-center gap-3">
            <div
              className={`flex flex-1 items-center justify-between rounded-xl px-4 py-3 ring-1 transition ${
                isLeak ? 'bg-rose-50 ring-rose-200' : 'bg-cream-dark/50 ring-line'
              }`}
              style={{ marginLeft: `${i * 8}px`, marginRight: `${(stages.length - 1 - i) * 8}px` }}
            >
              <div>
                <p className="text-[0.8125rem] font-semibold text-ink">{s.label}</p>
                <p className="text-[0.6875rem] text-muted">{s.sub}</p>
              </div>
              {isLeak && (
                <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[0.625rem] font-bold uppercase text-white">
                  Leak
                </span>
              )}
            </div>
          </div>
        )
      })}
      {fixLabel && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 ring-1 ring-emerald-100">
          <span className="text-emerald-600">→</span>
          <p className="text-[0.8125rem] font-medium text-emerald-900">{fixLabel}</p>
        </div>
      )}
    </div>
  )
}

export function FlowDiagram({
  steps,
  frictionIds = [],
  variant = 'after',
}: {
  steps: { id: string; label: string }[]
  frictionIds?: string[]
  variant?: 'before' | 'after'
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => {
        const friction = frictionIds.includes(s.id)
        return (
          <div key={s.id} className="flex items-center gap-2">
            <div
              className={`rounded-xl px-3 py-2 text-center ring-1 ${
                variant === 'before' && friction
                  ? 'bg-amber-100 ring-amber-300'
                  : variant === 'after'
                    ? 'bg-emerald-50 ring-emerald-200'
                    : 'bg-white ring-line'
              }`}
            >
              <p className="text-[0.6875rem] font-semibold text-ink">{s.label}</p>
            </div>
            {i < steps.length - 1 && <span className="text-muted-light">→</span>}
          </div>
        )
      })}
    </div>
  )
}

export function DashboardMock({ tiles }: { tiles: { label: string; value: string; trend?: string }[] }) {
  return (
    <div className="overflow-hidden rounded-xl bg-slate-900 p-4 text-cream ring-1 ring-slate-700">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-rose-400" />
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="ml-2 text-[0.625rem] text-slate-400">Executive dashboard · sample</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-lg bg-slate-800 p-3 ring-1 ring-slate-700">
            <p className="text-[0.625rem] uppercase text-slate-400">{t.label}</p>
            <p className="mt-1 text-[1.25rem] font-bold tabular-nums">{t.value}</p>
            {t.trend && <p className="mt-0.5 text-[0.625rem] text-emerald-400">{t.trend}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export function LaunchCalendarVisual({
  weeks,
}: {
  weeks: { week: string; focus: string; items: string[] }[]
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {weeks.map((w, i) => (
        <div key={w.week} className="rounded-xl bg-cream-dark/60 p-3 ring-1 ring-line">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[0.6875rem] font-bold text-cream">
              {i + 1}
            </span>
            <p className="text-[0.75rem] font-semibold text-ink">{w.week}</p>
          </div>
          <p className="mt-2 text-[0.6875rem] font-medium text-muted">{w.focus}</p>
          <ul className="mt-2 space-y-1">
            {w.items.map((item) => (
              <li key={item} className="rounded-md bg-white px-2 py-1.5 text-[0.625rem] leading-snug text-ink ring-1 ring-line">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function BeforeAfterDoc({
  before,
  after,
  clarityScore,
}: {
  before: string
  after: string
  clarityScore: number
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl bg-rose-50/80 p-4 ring-1 ring-rose-100">
        <p className="text-[0.625rem] font-semibold uppercase text-rose-800">Before</p>
        <p className="mt-2 text-[0.8125rem] leading-relaxed text-rose-950/80 line-through decoration-rose-400/60">{before}</p>
      </div>
      <div className="rounded-xl bg-emerald-50/80 p-4 ring-1 ring-emerald-100">
        <p className="text-[0.625rem] font-semibold uppercase text-emerald-800">After · clarity {clarityScore}%</p>
        <p className="mt-2 text-[0.875rem] font-semibold leading-relaxed text-ink">{after}</p>
      </div>
    </div>
  )
}

export function SlideMock({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="aspect-[16/10] overflow-hidden rounded-xl bg-ink ring-1 ring-ink/20">
      <div className="flex h-full flex-col p-6 text-cream">
        <p className="text-[0.625rem] uppercase text-cream/40">Slide 1 · sample</p>
        <h4 className="mt-3 text-[1.125rem] font-semibold leading-snug">{title}</h4>
        <ul className="mt-4 space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2 text-[0.8125rem] text-cream/85">
              <span className="text-cream/40">-</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function BucketColumn({
  label,
  color,
  items,
  emptyHint,
}: {
  label: string
  color: string
  items: string[]
  emptyHint?: string
}) {
  return (
    <div className={`min-h-[140px] rounded-xl p-3 ring-1 ${color}`}>
      <p className="text-[0.6875rem] font-semibold uppercase">{label}</p>
      <div className="mt-2 space-y-1.5">
        {items.length === 0 && emptyHint && (
          <p className="py-4 text-center text-[0.6875rem] opacity-60">{emptyHint}</p>
        )}
        {items.map((item) => (
          <div key={item} className="rounded-lg bg-white/90 px-2.5 py-2 text-[0.6875rem] font-medium text-ink shadow-sm ring-1 ring-black/5">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
