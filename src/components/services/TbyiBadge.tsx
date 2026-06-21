type TbyiBadgeProps = {
  className?: string
  label?: string
  tone?: 'onDark' | 'onLight'
}

export function TbyiBadge({
  className = '',
  label = 'Key differentiator',
  tone = 'onDark',
}: TbyiBadgeProps) {
  const toneClasses =
    tone === 'onDark'
      ? 'border-white/20 bg-white/10 text-white/90'
      : 'border-emerald-200/80 bg-white/90 text-emerald-800'

  return (
    <span
      className={`inline-block w-fit rounded-full border px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em] ${toneClasses} ${className}`}
    >
      {label}
    </span>
  )
}
