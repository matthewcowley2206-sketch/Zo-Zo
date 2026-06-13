import { motion } from 'framer-motion'

type NextActionHintProps = {
  action: string
  highlightContinue?: boolean
}

export function NextActionHint({ action, highlightContinue }: NextActionHintProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 rounded-2xl border-2 border-ink bg-[#fef3c7] px-4 py-3.5 shadow-sm ring-2 ring-amber-300/50"
    >
      <span className="flex h-8 w-8 shrink-0 animate-pulse items-center justify-center rounded-full bg-ink text-lg font-bold text-cream">
        ↓
      </span>
      <div>
        <p className="text-[0.625rem] font-bold uppercase tracking-[0.12em] text-amber-900">
          {highlightContinue ? 'Almost there' : 'Do this next'}
        </p>
        <p className="mt-0.5 text-[0.9375rem] font-semibold leading-snug text-ink">{action}</p>
      </div>
    </motion.div>
  )
}
