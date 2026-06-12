import type { ReactNode } from 'react'

type DeviceFrameProps = {
  children: ReactNode
  showLabel?: boolean
  accentColor?: string
  height?: number
}

export function DeviceFrame({
  children,
  showLabel,
  accentColor = '#1d1d1f',
  height = 580,
}: DeviceFrameProps) {
  return (
    <div className="mx-auto w-full max-w-[320px]">
      {showLabel && (
        <p className="mb-3 text-center text-[0.75rem] font-medium uppercase tracking-[0.08em] text-muted-light">
          Interactive prototype · tap to explore
        </p>
      )}
      <div
        className="overflow-hidden rounded-[2.5rem] bg-ink p-2 shadow-2xl shadow-ink/20 ring-1 ring-ink/10"
        style={{ boxShadow: `0 32px 64px -24px ${accentColor}40` }}
      >
        <div className="overflow-hidden rounded-[2rem] bg-white">
          <div className="flex items-center justify-center bg-ink py-2">
            <div className="h-1 w-16 rounded-full bg-white/20" />
          </div>
          <div className="overflow-hidden" style={{ height }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export function DemoTabBar({
  tabs,
  active,
  onChange,
  accentColor,
}: {
  tabs: { id: string; label: string; icon: string }[]
  active: string
  onChange: (id: string) => void
  accentColor: string
}) {
  return (
    <div className="flex border-t border-slate-200 bg-white px-1 py-1.5">
      {tabs.map((tab) => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 transition-colors"
            style={isActive ? { color: accentColor } : { color: '#94a3b8' }}
          >
            <span className="text-[1rem] leading-none">{tab.icon}</span>
            <span className="text-[0.5625rem] font-semibold uppercase tracking-wide">
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export function DemoScreen({
  title,
  subtitle,
  accentColor,
  children,
  onBack,
  rightAction,
}: {
  title: string
  subtitle?: string
  accentColor: string
  children: ReactNode
  onBack?: () => void
  rightAction?: ReactNode
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 px-4 pb-3 pt-4" style={{ backgroundColor: accentColor }}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="mb-1 text-[0.75rem] font-medium text-white/70 hover:text-white"
              >
                ← Back
              </button>
            )}
            {subtitle && (
              <p className="text-[0.625rem] font-medium uppercase tracking-wider text-white/70">
                {subtitle}
              </p>
            )}
            <h3 className="truncate text-[1rem] font-semibold text-white">{title}</h3>
          </div>
          {rightAction}
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-3">{children}</div>
    </div>
  )
}

export function DemoButton({
  children,
  onClick,
  variant = 'primary',
  accentColor,
  className = '',
}: {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  accentColor: string
  className?: string
}) {
  const styles =
    variant === 'primary'
      ? 'text-white'
      : variant === 'secondary'
        ? 'bg-white text-ink ring-1 ring-slate-200'
        : 'bg-transparent text-ink underline-offset-2 hover:underline'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl px-4 py-2.5 text-[0.8125rem] font-semibold transition-all hover:opacity-90 active:scale-[0.99] ${styles} ${className}`}
      style={variant === 'primary' ? { backgroundColor: accentColor } : undefined}
    >
      {children}
    </button>
  )
}

export function DemoBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-cream/20 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-cream backdrop-blur-sm">
      {children}
    </span>
  )
}

export function DemoPill({
  children,
  color = 'slate',
}: {
  children: ReactNode
  color?: 'gold' | 'green' | 'blue' | 'slate' | 'amber'
}) {
  const colors = {
    gold: 'bg-amber-100 text-amber-900',
    green: 'bg-emerald-100 text-emerald-800',
    blue: 'bg-sky-100 text-sky-800',
    slate: 'bg-slate-100 text-slate-700',
    amber: 'bg-orange-100 text-orange-800',
  }
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide ${colors[color]}`}
    >
      {children}
    </span>
  )
}
