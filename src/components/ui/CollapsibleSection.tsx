import { useId, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type CollapsibleSectionProps = {
  title: string
  eyebrow?: string
  description?: string
  defaultOpen?: boolean
  theme?: 'light' | 'dark' | 'cream'
  size?: 'default' | 'compact'
  children: ReactNode
  className?: string
  id?: string
}

export function CollapsibleSection({
  title,
  eyebrow,
  description,
  defaultOpen = false,
  theme = 'light',
  size = 'default',
  children,
  className = '',
  id,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()

  const titleColor = theme === 'dark' ? 'text-cream' : 'text-ink'
  const descColor = theme === 'dark' ? 'text-cream/70' : 'text-muted'
  const eyebrowColor = theme === 'dark' ? 'text-cream/50' : undefined
  const buttonHover =
    theme === 'dark' ? 'hover:bg-cream/5' : theme === 'cream' ? 'hover:bg-cream/80' : 'hover:bg-cream-dark/40'
  const triggerBorder =
    theme === 'dark'
      ? open
        ? 'border-transparent'
        : 'border-cream/15 bg-cream/[0.04]'
      : theme === 'cream'
        ? open
          ? 'border-transparent'
          : 'border-line bg-cream shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
        : open
          ? 'border-transparent'
          : 'border-line bg-white/45 shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
  const toggleRing =
    theme === 'dark'
      ? 'border-cream/20 bg-cream/[0.06] text-cream/70'
      : theme === 'cream'
        ? 'border-line bg-white text-muted'
        : 'border-line bg-cream text-muted'
  const toggleLabel = theme === 'dark' ? 'text-cream/45' : 'text-muted-light'

  return (
    <div className={className} id={id}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`group flex w-full items-start justify-between gap-4 rounded-2xl border px-4 py-4 text-left transition sm:px-5 sm:py-5 ${triggerBorder} ${buttonHover} ${
          size === 'compact' ? 'py-3 sm:py-4' : ''
        }`}
      >
        <span className="min-w-0 flex-1">
          {eyebrow && (
            <span className={`eyebrow mb-2 block ${eyebrowColor ?? ''}`}>{eyebrow}</span>
          )}
          <span
            className={`block font-semibold leading-snug ${
              size === 'compact' ? 'text-[1.0625rem]' : 'headline-section'
            } ${titleColor}`}
          >
            {title}
          </span>
          {description && !open && (
            <span className={`mt-2 block text-[0.9375rem] leading-relaxed ${descColor}`}>
              {description}
            </span>
          )}
        </span>
        <span className="mt-0.5 flex shrink-0 flex-col items-center gap-1.5">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-transform duration-200 group-hover:scale-[1.03] ${
              open ? 'rotate-180' : ''
            } ${toggleRing}`}
            aria-hidden
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M3.5 5.25L7 8.75L10.5 5.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className={`text-[0.6875rem] font-medium tracking-[0.04em] ${toggleLabel}`}>
            {open ? 'Hide' : 'Show'}
          </span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className={size === 'compact' ? 'pt-2' : 'pt-6 sm:pt-8'}>
              {open && description && (
                <p className={`mb-6 max-w-[640px] text-[0.9375rem] leading-relaxed ${descColor}`}>
                  {description}
                </p>
              )}
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
