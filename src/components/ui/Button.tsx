import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  to?: string
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  external?: boolean
}

const variants = {
  primary:
    'bg-ink text-cream hover:bg-ink-soft active:scale-[0.98]',
  secondary:
    'bg-transparent text-ink ring-1 ring-ink/20 hover:ring-ink/40 active:scale-[0.98]',
  ghost:
    'bg-transparent text-ink hover:text-muted active:scale-[0.98] px-0 ring-0',
}

export function Button({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  external,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.9375rem] font-medium transition-all duration-300'

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return <button type="button" className={classes}>{children}</button>
}

export function ArrowLink({
  children,
  to,
  className = '',
}: {
  children: ReactNode
  to: string
  className?: string
}) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-1.5 text-[1.0625rem] font-medium text-ink transition-colors hover:text-muted ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  )
}
