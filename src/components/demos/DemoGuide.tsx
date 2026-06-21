import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { DemoGuideConfig, DemoJourney, GuideStep } from './demoGuides'
import { useDemoAnnotation } from './DemoAnnotations'

type GuideMode = 'guided' | 'explore'

type DemoGuideContextValue = {
  config: DemoGuideConfig
  mode: GuideMode
  stepIndex: number
  currentStep: GuideStep | null
  totalSteps: number
  isComplete: boolean
  targetVisible: boolean
  accentColor: string
  deviceRef: React.RefObject<HTMLDivElement | null>
  isHighlighted: (target: string) => boolean
  activate: (target: string) => void
  skipToExplore: () => void
  restart: () => void
  restartKey: number
  journeyId: string | null
  activeJourney: DemoJourney | null
  awaitingJourney: boolean
  selectJourney: (id: string) => void
}

const DemoGuideContext = createContext<DemoGuideContextValue | null>(null)

export function DemoGuideProvider({
  config,
  accentColor,
  children,
}: {
  config: DemoGuideConfig
  accentColor: string
  children: ReactNode
}) {
  const { show, dismiss } = useDemoAnnotation()
  const deviceRef = useRef<HTMLDivElement>(null)
  const hasJourneys = Boolean(config.journeys?.length)
  const [mode, setMode] = useState<GuideMode>('guided')
  const [journeyId, setJourneyId] = useState<string | null>(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [targetVisible, setTargetVisible] = useState(true)
  const [tick, setTick] = useState(0)
  const [restartKey, setRestartKey] = useState(0)

  const activeJourney =
    hasJourneys && journeyId
      ? (config.journeys!.find((j) => j.id === journeyId) ?? null)
      : null
  const awaitingJourney = hasJourneys && !activeJourney
  const activeSteps = activeJourney?.steps ?? config.steps
  const totalSteps = activeSteps.length
  const currentStep =
    !awaitingJourney && mode === 'guided' && stepIndex < totalSteps
      ? activeSteps[stepIndex]
      : null

  const bump = useCallback(() => setTick((t) => t + 1), [])

  useEffect(() => {
    if (!currentStep || !deviceRef.current) {
      setTargetVisible(true)
      return
    }

    const check = () => {
      const el = deviceRef.current?.querySelector(
        `[data-demo-target="${currentStep.target}"]`,
      )
      setTargetVisible(!!el)
    }

    check()
    const id = window.setInterval(check, 400)
    return () => window.clearInterval(id)
  }, [currentStep, tick])

  const advance = useCallback(
    (step: GuideStep) => {
      if (step.annotation) {
        window.setTimeout(() => show(step.annotation!), 350)
      }
      setStepIndex((i) => {
        const next = i + 1
        if (next >= totalSteps) setMode('explore')
        return next
      })
      bump()
    },
    [show, totalSteps, bump],
  )

  const activate = useCallback(
    (target: string) => {
      if (mode !== 'guided' || !currentStep) return
      if (target !== currentStep.target) return
      advance(currentStep)
    },
    [mode, currentStep, advance],
  )

  const isHighlighted = useCallback(
    (target: string) => mode === 'guided' && currentStep?.target === target,
    [mode, currentStep],
  )

  const skipToExplore = useCallback(() => {
    setMode('explore')
    setStepIndex(totalSteps)
  }, [totalSteps])

  const selectJourney = useCallback(
    (id: string) => {
      dismiss()
      setJourneyId(id)
      setMode('guided')
      setStepIndex(0)
      bump()
    },
    [bump, dismiss],
  )

  const restart = useCallback(() => {
    dismiss()
    setMode('guided')
    setStepIndex(0)
    if (hasJourneys) setJourneyId(null)
    setRestartKey((key) => key + 1)
    bump()
  }, [bump, dismiss, hasJourneys])

  const value = useMemo(
    () => ({
      config,
      mode,
      stepIndex,
      currentStep,
      totalSteps,
      isComplete: mode === 'explore',
      targetVisible,
      accentColor,
      deviceRef,
      isHighlighted,
      activate,
      skipToExplore,
      restart,
      restartKey,
      journeyId,
      activeJourney,
      awaitingJourney,
      selectJourney,
    }),
    [
      config,
      mode,
      stepIndex,
      currentStep,
      totalSteps,
      targetVisible,
      accentColor,
      isHighlighted,
      activate,
      skipToExplore,
      restart,
      restartKey,
      journeyId,
      activeJourney,
      awaitingJourney,
      selectJourney,
    ],
  )

  return (
    <DemoGuideContext.Provider value={value}>{children}</DemoGuideContext.Provider>
  )
}

export function useDemoGuide() {
  const ctx = useContext(DemoGuideContext)
  if (!ctx) throw new Error('useDemoGuide must be used within DemoGuideProvider')
  return ctx
}

export function useGuideActivate(target: string) {
  const { activate, isHighlighted } = useDemoGuide()
  return {
    highlighted: isHighlighted(target),
    onGuideAction: () => activate(target),
    targetProps: {
      'data-demo-target': target,
      className: isHighlighted(target) ? 'demo-guide-target' : undefined,
    } as const,
  }
}

function PulseRing() {
  return (
    <>
      <span className="pointer-events-none absolute -inset-1 rounded-2xl ring-2 ring-amber-400/80 demo-guide-pulse" />
      <span className="pointer-events-none absolute -inset-2 rounded-2xl ring-2 ring-amber-400/40 demo-guide-pulse-delayed" />
    </>
  )
}

export function GuideTarget({
  id,
  children,
  className = '',
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  const { isHighlighted } = useDemoGuide()
  const active = isHighlighted(id)

  return (
    <div
      data-demo-target={id}
      className={`relative ${active ? 'z-10 demo-guide-target' : ''} ${className}`}
    >
      {active && <PulseRing />}
      {children}
    </div>
  )
}

export function DemoGuideRail() {
  const {
    config,
    mode,
    stepIndex,
    currentStep,
    totalSteps,
    targetVisible,
    accentColor,
    skipToExplore,
    restart,
    activeJourney,
    awaitingJourney,
  } = useDemoGuide()

  const railTitle = activeJourney?.title ?? config.title

  const displayHint = awaitingJourney
    ? 'Choose a scenario inside the prototype — each journey takes about 60 seconds.'
    : mode === 'guided' && currentStep
      ? targetVisible
        ? currentStep.hint
        : (currentStep.recovery ?? currentStep.hint)
      : config.completeMessage

  return (
    <div className="flex flex-col justify-center">
      <div className="rounded-2xl border border-line bg-cream p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-light">
              Guided walkthrough
            </p>
            <p className="mt-1 text-[1.0625rem] font-semibold text-ink">{railTitle}</p>
            {activeJourney && (
              <p className="mt-1 text-[0.8125rem] text-muted">
                &ldquo;{activeJourney.scenario}&rdquo;
              </p>
            )}
          </div>
          {mode === 'guided' && !awaitingJourney ? (
            <span
              className="shrink-0 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold text-white"
              style={{ backgroundColor: accentColor }}
            >
              {stepIndex + 1} / {totalSteps}
            </span>
          ) : mode === 'explore' ? (
            <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-[0.6875rem] font-semibold text-emerald-800">
              Complete
            </span>
          ) : null}
        </div>

        <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">{config.intro}</p>

        {!awaitingJourney && (
        <div className="mt-4 flex gap-1.5">
          {(activeJourney?.steps ?? config.steps).map((step, i) => (
            <div
              key={step.id}
              className="h-1.5 flex-1 rounded-full transition-colors duration-300"
              style={{
                backgroundColor:
                  i < stepIndex
                    ? accentColor
                    : i === stepIndex && mode === 'guided'
                      ? `${accentColor}99`
                      : '#e2e8f0',
              }}
            />
          ))}
        </div>
        )}

        <AnimatePresence mode="wait">
          <motion.p
            key={displayHint}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="mt-5 text-[0.9375rem] leading-relaxed text-ink"
          >
            {mode === 'guided' && currentStep && !targetVisible && (
              <span className="mr-1.5 inline-block rounded bg-amber-100 px-1.5 py-0.5 text-[0.6875rem] font-semibold uppercase text-amber-900">
                Hint
              </span>
            )}
            {displayHint}
          </motion.p>
        </AnimatePresence>

        <p className="mt-4 flex items-center gap-2 text-[0.8125rem] text-muted">
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="text-[1.125rem] leading-none"
            aria-hidden
          >
            ↓
          </motion.span>
          {awaitingJourney
            ? 'Tap a scenario card inside the phone to begin'
            : mode === 'guided'
              ? config.device === 'desktop'
                ? 'Click the glowing area inside the prototype'
                : 'Tap the glowing area inside the phone'
              : 'Explore freely - notes still appear on key taps'}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {mode === 'guided' ? (
            <button
              type="button"
              onClick={skipToExplore}
              className="text-[0.8125rem] font-medium text-muted transition hover:text-ink"
            >
              Skip to free explore
            </button>
          ) : (
            <button
              type="button"
              onClick={restart}
              className="text-[0.8125rem] font-medium text-muted transition hover:text-ink"
            >
              Restart walkthrough
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function DemoPhoneBeacon({
  children,
  device = 'phone',
}: {
  children: ReactNode
  device?: 'phone' | 'desktop'
}) {
  const { deviceRef, mode, accentColor } = useDemoGuide()
  const [inView, setInView] = useState(false)
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    const el = deviceRef.current
    if (!el) return

    let timeout: number | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          setPulse(true)
          timeout = window.setTimeout(() => setPulse(false), 4000)
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (timeout) window.clearTimeout(timeout)
    }
  }, [deviceRef])

  const beaconRadius = device === 'desktop' ? 'rounded-2xl' : 'rounded-[2.75rem]'

  return (
    <div
      ref={deviceRef}
      className={`relative mx-auto w-full transition-shadow duration-500 ${
        device === 'desktop' ? 'max-w-[680px]' : 'max-w-[320px]'
      } ${
        pulse && inView && mode === 'guided'
          ? `demo-phone-beacon ${beaconRadius}`
          : ''
      }`}
      style={
        pulse && inView && mode === 'guided'
          ? ({ '--beacon-color': `${accentColor}55` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  )
}
