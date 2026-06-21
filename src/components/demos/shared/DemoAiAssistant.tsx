import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { DemoAssistantConfig } from '../demoTypes'

type DemoAiAssistantProps = {
  config: DemoAssistantConfig
  accentColor: string
  compact?: boolean
}

export function DemoAiAssistant({ config, accentColor, compact = false }: DemoAiAssistantProps) {
  const [open, setOpen] = useState(!compact)
  const [activeResponse, setActiveResponse] = useState<string | null>(null)
  const [typing, setTyping] = useState(false)

  const ask = (response: string) => {
    setTyping(true)
    setActiveResponse(null)
    window.setTimeout(() => {
      setTyping(false)
      setActiveResponse(response)
    }, 900)
  }

  return (
    <div className="rounded-2xl bg-slate-900 text-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left"
      >
        <span className="text-[0.6875rem] font-semibold uppercase tracking-wide text-slate-400">
          {config.title}
        </span>
        <span className="text-[0.75rem] text-slate-400">{open ? '−' : '+'}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-700/60"
          >
            <div className="space-y-2 p-3">
              {activeResponse && !typing && (
                <p className="rounded-xl bg-slate-800 px-3 py-2 text-[0.75rem] leading-relaxed text-slate-200">
                  {activeResponse}
                </p>
              )}
              {typing && (
                <p className="rounded-xl bg-slate-800 px-3 py-2 text-[0.75rem] text-slate-400">
                  Analysing…
                </p>
              )}
              {!activeResponse && !typing && (
                <p className="text-[0.6875rem] text-slate-500">{config.placeholder}</p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {config.prompts.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => ask(prompt.response)}
                    className="rounded-lg px-2 py-1 text-[0.625rem] font-medium ring-1 ring-slate-600 transition hover:ring-slate-400"
                    style={{ color: accentColor === '#92400e' ? '#fcd34d' : undefined }}
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
