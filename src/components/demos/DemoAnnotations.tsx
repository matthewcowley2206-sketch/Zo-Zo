import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export type DemoAnnotationContent = {
  id: string
  clientAsk: string
  ourSolution: string
}

type DemoAnnotationContextValue = {
  active: DemoAnnotationContent | null
  show: (annotation: DemoAnnotationContent) => void
  dismiss: () => void
}

const DemoAnnotationContext = createContext<DemoAnnotationContextValue | null>(null)

export function DemoAnnotationProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<DemoAnnotationContent | null>(null)

  const show = useCallback((annotation: DemoAnnotationContent) => {
    setActive(annotation)
  }, [])

  const dismiss = useCallback(() => setActive(null), [])

  const value = useMemo(
    () => ({ active, show, dismiss }),
    [active, show, dismiss],
  )

  return (
    <DemoAnnotationContext.Provider value={value}>{children}</DemoAnnotationContext.Provider>
  )
}

export function useDemoAnnotation() {
  const ctx = useContext(DemoAnnotationContext)
  if (!ctx) throw new Error('useDemoAnnotation must be used within DemoAnnotationProvider')
  return ctx
}

export function DemoAnnotationBubble() {
  const { active, dismiss } = useDemoAnnotation()

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto mt-5 max-w-[340px] rounded-2xl border border-ink/10 bg-ink p-4 text-left shadow-xl shadow-ink/15"
        >
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-cream/50">
            Behind this interaction
          </p>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-cream/90">
            <span className="font-semibold text-cream">The client wanted:</span>{' '}
            {active.clientAsk}
          </p>
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-cream/75">
            <span className="font-semibold text-cream/90">What we built:</span>{' '}
            {active.ourSolution}
          </p>
          <button
            type="button"
            onClick={dismiss}
            className="mt-4 w-full rounded-xl bg-cream/10 py-2.5 text-[0.8125rem] font-medium text-cream transition hover:bg-cream/15"
          >
            Got it
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function DemoScopeNote() {
  return (
    <p className="mx-auto mt-4 max-w-[340px] text-center text-[0.75rem] leading-relaxed text-muted-light">
      This prototype is built for alignment and testing - production versions connect to live
      systems, compliance rules, and integrations at a depth you would expect from a global
      airline, not a simplified demo.
    </p>
  )
}

export function InteractiveDemoWrapper({
  children,
  scopeNote,
}: {
  children: ReactNode
  scopeNote?: string
}) {
  return (
    <DemoAnnotationProvider>
      {children}
      <DemoAnnotationBubble />
      <p className="mx-auto mt-4 max-w-[340px] text-center text-[0.75rem] leading-relaxed text-muted-light">
        {scopeNote ?? (
          <>
            Built to feel real enough to decide with. Production systems go much further - live
            data, edge cases, security, and integrations that take months, not days.
          </>
        )}
      </p>
    </DemoAnnotationProvider>
  )
}
