import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type DemoProcessingSequenceProps = {
  messages: string[]
  accentColor: string
  onComplete: () => void
  durationMs?: number
}

export function DemoProcessingSequence({
  messages,
  accentColor,
  onComplete,
  durationMs = 2400,
}: DemoProcessingSequenceProps) {
  const [index, setIndex] = useState(0)
  const stepDuration = Math.max(600, durationMs / messages.length)

  useEffect(() => {
    if (index >= messages.length - 1) {
      const timer = window.setTimeout(onComplete, stepDuration)
      return () => window.clearTimeout(timer)
    }

    const timer = window.setTimeout(() => setIndex((i) => i + 1), stepDuration)
    return () => window.clearTimeout(timer)
  }, [index, messages.length, onComplete, stepDuration])

  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center space-y-4 px-4 text-center">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200"
        style={{ borderTopColor: accentColor }}
        aria-hidden
      />
      <AnimatePresence mode="wait">
        <motion.p
          key={messages[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="text-[0.9375rem] font-medium text-slate-700"
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
      <div className="flex w-full max-w-[200px] gap-1">
        {messages.map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-colors duration-300"
            style={{ backgroundColor: i <= index ? accentColor : '#e2e8f0' }}
          />
        ))}
      </div>
    </div>
  )
}
