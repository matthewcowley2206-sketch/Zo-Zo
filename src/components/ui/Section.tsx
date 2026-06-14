import type { ReactNode } from 'react'
import { HeroDnaBackground } from './HeroDnaBackground'
import { FadeIn } from './FadeIn'

type SectionProps = {
  children: ReactNode
  className?: string
  id?: string
  theme?: 'light' | 'dark' | 'cream'
  size?: 'default' | 'hero' | 'compact'
}

const themes = {
  light: 'bg-cream text-ink',
  dark: 'bg-ink text-cream',
  cream: 'bg-cream-dark text-ink',
}

const sizes = {
  hero: 'py-24 sm:py-32 md:py-40 lg:py-48',
  default: 'py-20 sm:py-28 md:py-32',
  compact: 'py-16 sm:py-20',
}

export function Section({
  children,
  className = '',
  id,
  theme = 'light',
  size = 'default',
}: SectionProps) {
  const isHero = size === 'hero'

  return (
    <section
      id={id}
      className={`section-pad relative isolate overflow-hidden ${themes[theme]} ${sizes[size]} ${className}`}
    >
      {isHero && <HeroDnaBackground theme={theme} />}
      <div className={isHero ? 'hero-circuit-content' : undefined}>{children}</div>
    </section>
  )
}

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  theme?: 'light' | 'dark'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  theme = 'light',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const titleColor = theme === 'dark' ? 'text-cream' : 'text-ink'
  const descColor = theme === 'dark' ? 'text-cream/70' : 'text-muted'

  return (
    <FadeIn className={`content-max mb-14 sm:mb-16 md:mb-20 ${alignClass} ${className}`}>
      {eyebrow && <p className={`eyebrow mb-4 ${theme === 'dark' ? 'text-cream/50' : ''}`}>{eyebrow}</p>}
      <h2 className={`headline-section ${titleColor}`}>{title}</h2>
      {description && (
        <p className={`body-large mt-5 max-w-[640px] ${align === 'center' ? 'mx-auto' : ''} ${descColor}`}>
          {description}
        </p>
      )}
    </FadeIn>
  )
}

export function Divider() {
  return <div className="mx-auto h-px max-w-[1200px] bg-line" />
}
