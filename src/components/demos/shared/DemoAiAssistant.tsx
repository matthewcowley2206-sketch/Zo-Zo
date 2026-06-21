import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { DemoAssistantConfig } from '../demoTypes'

export type DemoAssistantSuggestion = {
  id: string
  label: string
}

type DemoAiAssistantProps = {
  accentColor: string
  compact?: boolean
  /** Legacy config for Horizon/Brightline — unchanged demos */
  config?: DemoAssistantConfig
  /** Contextual assistant — Northgate/Phoenix */
  title?: string
  placeholder?: string
  suggestions?: DemoAssistantSuggestion[]
  resolveQuestion?: (questionId: string) => string
  resolveFreeText?: (query: string) => string
}

export function DemoAiAssistant({
  accentColor,
  compact = false,
  config,
  title: titleProp,
  placeholder: placeholderProp,
  suggestions: suggestionsProp,
  resolveQuestion: resolveQuestionProp,
  resolveFreeText,
}: DemoAiAssistantProps) {
  const title = titleProp ?? config?.title ?? 'AI assistant'
  const placeholder = placeholderProp ?? config?.placeholder ?? 'Ask a question…'
  const suggestions: DemoAssistantSuggestion[] =
    suggestionsProp ??
    config?.prompts.map((p) => ({ id: p.id, label: p.label })) ??
    []

  const resolveQuestion =
    resolveQuestionProp ??
    ((id: string) => config?.prompts.find((p) => p.id === id)?.response ?? 'No response available.')

  const [open, setOpen] = useState(!compact)
  const [activeResponse, setActiveResponse] = useState<string | null>(null)
  const [typing, setTyping] = useState(false)
  const [showFreeText, setShowFreeText] = useState(false)
  const [freeText, setFreeText] = useState('')

  const respond = (getResponse: () => string) => {
    setTyping(true)
    setActiveResponse(null)
    window.setTimeout(() => {
      setTyping(false)
      setActiveResponse(getResponse())
    }, 700)
  }

  const askSuggestion = (id: string) => {
    respond(() => resolveQuestion(id))
  }

  const askFreeText = () => {
    const q = freeText.trim()
    if (q.length < 3 || !resolveFreeText) return
    respond(() => resolveFreeText(q))
    setFreeText('')
  }

  const accentText = accentColor === '#92400e' ? '#fcd34d' : '#93c5fd'
  const showOwnQuestion = Boolean(resolveFreeText)

  return (
    <div className="rounded-2xl bg-slate-900 text-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left"
      >
        <span className="text-[0.6875rem] font-semibold uppercase tracking-wide text-slate-400">
          {title}
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
            <div className="space-y-2.5 p-3">
              {showOwnQuestion && (
                <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-500">
                  Suggested questions
                </p>
              )}

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

              {!activeResponse && !typing && !showOwnQuestion && (
                <p className="text-[0.6875rem] text-slate-500">{placeholder}</p>
              )}

              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => askSuggestion(s.id)}
                    className="rounded-lg px-2.5 py-1.5 text-left text-[0.625rem] font-medium ring-1 ring-slate-600 transition hover:bg-slate-800 hover:ring-slate-400"
                    style={{ color: accentText }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {showOwnQuestion && (
                <div className="border-t border-slate-700/60 pt-2">
                  {!showFreeText ? (
                    <button
                      type="button"
                      onClick={() => setShowFreeText(true)}
                      className="text-[0.625rem] font-medium text-slate-500 hover:text-slate-300"
                    >
                      Ask your own question…
                    </button>
                  ) : (
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={freeText}
                        onChange={(e) => setFreeText(e.target.value)}
                        placeholder={placeholder}
                        className="min-w-0 flex-1 rounded-lg bg-slate-800 px-2.5 py-1.5 text-[0.687rem] text-white placeholder:text-slate-500 ring-1 ring-slate-600 focus:outline-none focus:ring-slate-400"
                        onKeyDown={(e) => e.key === 'Enter' && askFreeText()}
                      />
                      <button
                        type="button"
                        onClick={askFreeText}
                        disabled={freeText.trim().length < 3}
                        className="shrink-0 rounded-lg px-2 py-1.5 text-[0.625rem] font-semibold text-slate-900 disabled:opacity-40"
                        style={{ backgroundColor: accentText }}
                      >
                        Ask
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
