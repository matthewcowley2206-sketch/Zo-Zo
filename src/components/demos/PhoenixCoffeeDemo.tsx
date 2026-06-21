import { useState } from 'react'
import { useDemoAnnotation } from './DemoAnnotations'
import { GuideTarget, useDemoGuide, useGuideActivate } from './DemoGuide'
import {
  DemoButton,
  DemoPill,
  DemoScreen,
  DemoTabBar,
} from './DeviceFrame'
import { InteractiveDemoShell } from './InteractiveDemoShell'
import { analysePhoenixSymptoms, phoenixSymptomExamples } from '../../lib/demoAnalysis/phoenixDiagnosis'
import type { PhoenixDiagnosisResult } from '../../lib/demoAnalysis/types'
import { DemoAiAssistant } from './shared/DemoAiAssistant'
import { DemoBusinessImpactPanel } from './shared/DemoBusinessImpactPanel'
import { DemoCauseAnalysisPanel } from './shared/DemoCauseAnalysisPanel'
import { DemoJourneyPicker } from './shared/DemoJourneyPicker'
import { DemoOutcomePreview } from './shared/DemoOutcomePreview'
import { DemoOutcomeReveal } from './shared/DemoOutcomeReveal'
import { DemoProcessingSequence } from './shared/DemoProcessingSequence'
import { DemoRecommendationPanel } from './shared/DemoRecommendationPanel'
import { DemoServiceClosingPanel } from './shared/DemoServiceClosingPanel'

const accent = '#92400e'

type Tab = 'home' | 'machine' | 'maintenance' | 'support'
type BreakdownView = 'symptoms' | 'processing' | 'diagnosis' | 'actions' | 'impact'
type LearnView = 'diagram' | 'detail'
type MaintView = 'dashboard' | 'processing' | 'plan' | 'outcome'

const machineParts = [
  {
    id: 'boiler',
    targetId: 'part-boiler',
    label: 'Boiler',
    guidance: 'Heats water to brew temperature. Descale every 3 months or 10k shots.',
    fault: 'Scale buildup causes slow extraction and bitter taste.',
  },
  {
    id: 'pump',
    label: 'Pump',
    guidance: 'Pressurises water through the group head. Check for unusual noise.',
    fault: 'Weak pressure often indicates pump wear or air lock.',
  },
  {
    id: 'grouphead',
    targetId: 'part-grouphead',
    label: 'Group head',
    guidance: 'Backflush daily · deep clean weekly. Replace gasket every 6 months.',
    fault: 'Dirty group head causes channeling and inconsistent shots.',
  },
  {
    id: 'water',
    label: 'Water system',
    guidance: 'Filter replacement every 30 days · monitor TDS readings.',
    fault: 'Old filters affect taste and increase scale buildup.',
  },
  {
    id: 'steam',
    label: 'Steam system',
    guidance: 'Purge wand after each use · descale steam circuit quarterly.',
    fault: 'Blockage reduces steam pressure for milk texturing.',
  },
]

function PhoenixApp() {
  const { show } = useDemoAnnotation()
  const {
    mode,
    config,
    awaitingJourney,
    activeJourney,
    selectJourney,
    skipToExplore,
  } = useDemoGuide()

  const [tab, setTab] = useState<Tab>('home')
  const [breakdownView, setBreakdownView] = useState<BreakdownView>('symptoms')
  const [symptomText, setSymptomText] = useState('')
  const [diagnosisResult, setDiagnosisResult] = useState<PhoenixDiagnosisResult | null>(null)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [learnView, setLearnView] = useState<LearnView>('diagram')
  const [activePart, setActivePart] = useState(machineParts[0])
  const [partsVisited, setPartsVisited] = useState<Set<string>>(new Set())
  const [maintView, setMaintView] = useState<MaintView>('dashboard')
  const [scheduled, setScheduled] = useState(false)

  const runDiagnosis = useGuideActivate('run-diagnosis-btn')
  const previewContinue = useGuideActivate('outcome-preview-continue')
  const partBoiler = useGuideActivate('part-boiler')
  const partGrouphead = useGuideActivate('part-grouphead')
  const guidanceNext = useGuideActivate('part-guidance-next')
  const explorerDone = useGuideActivate('explorer-done')
  const maintDashboard = useGuideActivate('maint-dashboard')
  const maintAiRec = useGuideActivate('maint-ai-rec')
  const maintSchedule = useGuideActivate('maint-schedule')

  const exploreShow = (annotation: Parameters<typeof show>[0]) => {
    if (mode === 'explore') show(annotation)
  }

  const resetJourneyState = () => {
    setBreakdownView('symptoms')
    setSymptomText('')
    setDiagnosisResult(null)
    setSelectedAction(null)
    setLearnView('diagram')
    setActivePart(machineParts[0])
    setPartsVisited(new Set())
    setMaintView('dashboard')
    setScheduled(false)
    setTab('home')
  }

  const handleSelectJourney = (id: string) => {
    selectJourney(id)
    resetJourneyState()
    if (id === 'learn') setTab('machine')
    if (id === 'maintenance') setTab('maintenance')
    if (id === 'breakdown') {
      setSymptomText(phoenixSymptomExamples[0].text)
    }
  }

  if (awaitingJourney) {
    return (
      <div className="flex h-full flex-col">
        <DemoScreen title="Phoenix Ops" subtitle="Surry Hills · 6 stores" accentColor={accent}>
          <DemoJourneyPicker
            journeys={config.journeys ?? []}
            accentColor={accent}
            onSelect={handleSelectJourney}
          />
          {config.assistant && (
            <div className="mt-4">
              <DemoAiAssistant config={config.assistant} accentColor={accent} compact />
            </div>
          )}
        </DemoScreen>
      </div>
    )
  }

  const runSymptomAnalysis = () => {
    const result = analysePhoenixSymptoms(symptomText)
    setDiagnosisResult(result)
    runDiagnosis.onGuideAction()
    setBreakdownView('processing')
  }

  if (mode !== 'explore' && activeJourney?.id === 'breakdown') {
    if (breakdownView === 'processing' && diagnosisResult) {
      return (
        <DemoScreen title="AI diagnosis" subtitle="Analysing symptoms" accentColor={accent}>
          <DemoProcessingSequence
            messages={diagnosisResult.processingMessages}
            accentColor={accent}
            onComplete={() => setBreakdownView('diagnosis')}
          />
        </DemoScreen>
      )
    }

    if (breakdownView === 'diagnosis' && diagnosisResult) {
      return (
        <DemoScreen
          title="Diagnosis ready"
          subtitle="La Marzocco Linea · Surry Hills"
          accentColor={accent}
          onBack={() => setBreakdownView('symptoms')}
        >
          <div className="space-y-3">
            <div className="rounded-xl bg-violet-50 p-3 ring-1 ring-violet-100">
              <p className="text-[0.625rem] font-semibold uppercase text-violet-700">AI insight</p>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-violet-900">
                {diagnosisResult.insight}
              </p>
            </div>
            <DemoCauseAnalysisPanel
              causes={diagnosisResult.causes}
              confidence={diagnosisResult.confidence}
              matchedSignals={diagnosisResult.matchedSignals}
            />
            <DemoOutcomePreview
              headline={diagnosisResult.outcomePreview.headline}
              metric={diagnosisResult.outcomePreview.metric}
              detail={diagnosisResult.outcomePreview.detail}
              accentColor={accent}
            />
            <GuideTarget id="outcome-preview-continue">
              <DemoButton
                accentColor={accent}
                onClick={() => {
                  previewContinue.onGuideAction()
                  setBreakdownView('actions')
                }}
              >
                View recommended actions
              </DemoButton>
            </GuideTarget>
          </div>
        </DemoScreen>
      )
    }

    if (breakdownView === 'actions' && diagnosisResult) {
      const primaryId = diagnosisResult.recommendations[0]?.id
      return (
        <DemoScreen
          title="Recommended actions"
          subtitle="Step 4 · Choose next step"
          accentColor={accent}
          onBack={() => setBreakdownView('diagnosis')}
        >
          <DemoRecommendationPanel
            recommendations={diagnosisResult.recommendations}
            accentColor={accent}
            highlightTargetId={primaryId ? `action-${primaryId}` : 'action-descale'}
            selectedId={selectedAction ?? undefined}
            onSelect={(id) => {
              setSelectedAction(id)
              setBreakdownView('impact')
            }}
          />
        </DemoScreen>
      )
    }

    if (breakdownView === 'impact' && diagnosisResult) {
      const impact = diagnosisResult.businessImpact
      return (
        <DemoScreen title="Business impact" subtitle="Self-service complete" accentColor={accent}>
          <DemoBusinessImpactPanel
            items={[
              { label: 'Technician cost avoided', value: impact.technicianCostAvoided },
              { label: 'Downtime avoided', value: impact.downtimeAvoided },
              { label: 'Staff confidence', value: impact.staffConfidence },
              { label: 'Maintenance compliance', value: impact.maintenanceCompliance },
            ]}
          />
          <div className="mt-4">
            <DemoOutcomeReveal
              outcome={{
                ...activeJourney.outcome,
                metric: diagnosisResult.outcomePreview.metric,
                headline: diagnosisResult.outcomePreview.headline,
              }}
              accentColor={accent}
              onContinue={() => {
                skipToExplore()
                setTab('support')
              }}
            />
          </div>
          <div className="mt-4">
            <DemoServiceClosingPanel variant="phoenix" />
          </div>
        </DemoScreen>
      )
    }

    return (
      <DemoScreen title="Report a fault" subtitle="Describe the symptom" accentColor={accent}>
        <div className="space-y-3">
          <p className="text-[0.8125rem] text-slate-600">
            Type what is happening - or try an example below.
          </p>
          <textarea
            value={symptomText}
            onChange={(e) => setSymptomText(e.target.value)}
            placeholder="e.g. Coffee is bitter and extracting slowly…"
            rows={3}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[0.8125rem] leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
          <div className="flex flex-wrap gap-1.5">
            {phoenixSymptomExamples.map((ex) => (
              <button
                key={ex.label}
                type="button"
                onClick={() => setSymptomText(ex.text)}
                className="rounded-lg bg-slate-100 px-2.5 py-1 text-[0.6875rem] font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-amber-50 hover:ring-amber-200"
              >
                {ex.label}
              </button>
            ))}
          </div>
          {symptomText.trim().length >= 3 && (
            <GuideTarget id="run-diagnosis-btn">
              <DemoButton accentColor={accent} onClick={runSymptomAnalysis}>
                Run AI diagnosis
              </DemoButton>
            </GuideTarget>
          )}
        </div>
      </DemoScreen>
    )
  }

  if (mode !== 'explore' && activeJourney?.id === 'learn') {
    if (learnView === 'detail') {
      return (
        <DemoScreen
          title={activePart.label}
          subtitle="Maintenance & faults"
          accentColor={accent}
          onBack={() => setLearnView('diagram')}
        >
          <div className="space-y-3">
            <div className="rounded-xl bg-white p-3 ring-1 ring-slate-100">
              <p className="text-[0.625rem] font-semibold uppercase text-slate-400">Guidance</p>
              <p className="mt-1 text-[0.8125rem] text-slate-700">{activePart.guidance}</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 ring-1 ring-amber-100">
              <p className="text-[0.625rem] font-semibold uppercase text-amber-800">Common fault</p>
              <p className="mt-1 text-[0.8125rem] text-amber-900">{activePart.fault}</p>
            </div>
            <GuideTarget id="part-guidance-next">
              <DemoButton
                accentColor={accent}
                variant="secondary"
                onClick={() => {
                  guidanceNext.onGuideAction()
                  setLearnView('diagram')
                }}
              >
                Next component
              </DemoButton>
            </GuideTarget>
            {partsVisited.size >= 2 && (
              <GuideTarget id="explorer-done">
                <DemoButton
                  accentColor={accent}
                  onClick={() => {
                    explorerDone.onGuideAction()
                    skipToExplore()
                  }}
                >
                  Finish tour
                </DemoButton>
              </GuideTarget>
            )}
          </div>
        </DemoScreen>
      )
    }

    return (
      <DemoScreen title="Machine explorer" subtitle="Tap a component" accentColor={accent}>
        <div className="space-y-3">
          <div className="relative mx-auto aspect-[4/5] max-w-[200px] rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200 p-4">
            {machineParts.map((part, i) => {
              const positions = [
                'left-1/2 top-2 -translate-x-1/2',
                'left-2 top-1/3',
                'right-2 top-1/3',
                'left-1/2 bottom-16 -translate-x-1/2',
                'left-1/2 bottom-4 -translate-x-1/2',
              ]
              const isTarget = part.targetId
              const btn = (
                <button
                  type="button"
                  onClick={() => {
                    setActivePart(part)
                    setPartsVisited((prev) => new Set(prev).add(part.id))
                    setLearnView('detail')
                    if (part.id === 'boiler') partBoiler.onGuideAction()
                    if (part.id === 'grouphead') partGrouphead.onGuideAction()
                    exploreShow({
                      id: `part-${part.id}`,
                      clientAsk: `staff to understand the ${part.label.toLowerCase()} without a manual.`,
                      ourSolution: `interactive component guide with maintenance steps and common faults.`,
                    })
                  }}
                  className={`absolute rounded-lg px-2 py-1 text-[0.625rem] font-semibold shadow-sm ring-1 ring-slate-300 transition hover:ring-amber-400 ${
                    partsVisited.has(part.id) ? 'bg-emerald-100 text-emerald-800' : 'bg-white text-slate-700'
                  } ${positions[i]}`}
                >
                  {part.label}
                </button>
              )

              if (isTarget) {
                return (
                  <GuideTarget key={part.id} id={part.targetId!}>
                    {btn}
                  </GuideTarget>
                )
              }

              return <span key={part.id}>{btn}</span>
            })}
            <div className="absolute inset-x-4 top-12 bottom-20 rounded-xl border-2 border-dashed border-slate-300/80" />
          </div>
          <p className="text-center text-[0.75rem] text-slate-500">
            {partsVisited.size} of {machineParts.length} components explored
          </p>
        </div>
      </DemoScreen>
    )
  }

  if (mode !== 'explore' && activeJourney?.id === 'maintenance') {
    if (maintView === 'processing') {
      return (
        <DemoScreen title="Generating plan" subtitle="AI maintenance" accentColor={accent}>
          <DemoProcessingSequence
            messages={
              activeJourney.processingMessages ?? [
                'Reviewing service history…',
                'Checking filter status…',
                'Generating recommendations…',
              ]
            }
            accentColor={accent}
            onComplete={() => setMaintView('plan')}
          />
        </DemoScreen>
      )
    }

    if (maintView === 'plan') {
      return (
        <DemoScreen title="Maintenance plan" subtitle="AI recommended" accentColor={accent} onBack={() => setMaintView('dashboard')}>
          <div className="space-y-3">
            <div className="rounded-xl bg-violet-50 p-3 ring-1 ring-violet-100">
              <p className="text-[0.625rem] font-semibold uppercase text-violet-700">Recommendation</p>
              <p className="mt-1 text-[0.8125rem] text-violet-900">
                Schedule descale within 4 days · filter replacement in 12 days. Risk score improves
                from 72 to 41 with both tasks completed.
              </p>
            </div>
            <GuideTarget id="maint-schedule">
              <DemoButton
                accentColor={accent}
                onClick={() => {
                  maintSchedule.onGuideAction()
                  setScheduled(true)
                  setMaintView('outcome')
                }}
              >
                Schedule descale · Tue 7 AM
              </DemoButton>
            </GuideTarget>
          </div>
        </DemoScreen>
      )
    }

    if (maintView === 'outcome') {
      return (
        <DemoScreen title="Plan scheduled" subtitle={scheduled ? 'Descale confirmed' : ''} accentColor={accent}>
          <DemoOutcomeReveal
            outcome={activeJourney.outcome}
            accentColor={accent}
            onContinue={() => {
              skipToExplore()
              setTab('maintenance')
            }}
          />
        </DemoScreen>
      )
    }

    return (
      <DemoScreen title="Maintenance" subtitle="Surry Hills · Linea PB" accentColor={accent}>
        <GuideTarget id="maint-dashboard">
          <div
            className="space-y-3"
            onClick={() => maintDashboard.onGuideAction()}
            onKeyDown={() => {}}
            role="presentation"
          >
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Last service', value: '94 days ago', warn: true },
                { label: 'Cleaning status', value: 'Due today', warn: true },
                { label: 'Filter status', value: '12 days left', warn: false },
                { label: 'Risk score', value: '72 / 100', warn: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`rounded-xl p-3 ring-1 ${
                    item.warn ? 'bg-amber-50 ring-amber-100' : 'bg-white ring-slate-100'
                  }`}
                >
                  <p className="text-[0.625rem] font-semibold uppercase text-slate-400">{item.label}</p>
                  <p className="mt-1 text-[0.875rem] font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-emerald-900 p-4 text-white">
              <p className="text-[0.625rem] font-semibold uppercase opacity-80">Cost savings YTD</p>
              <p className="mt-1 text-[1.375rem] font-bold">$2,450</p>
              <p className="mt-1 text-[0.75rem] opacity-90">Service callouts avoided across 6 stores</p>
            </div>
            <GuideTarget id="maint-ai-rec">
              <button
                type="button"
                onClick={() => {
                  maintAiRec.onGuideAction()
                  setMaintView('processing')
                }}
                className="w-full rounded-xl bg-violet-600 p-3 text-left text-white"
              >
                <DemoPill color="gold">AI</DemoPill>
                <p className="mt-2 font-semibold">View maintenance plan</p>
                <p className="text-[0.75rem] opacity-90">Descale due · filter replacement scheduled</p>
              </button>
            </GuideTarget>
          </div>
        </GuideTarget>
      </DemoScreen>
    )
  }

  const titles: Record<Tab, string> = {
    home: 'Phoenix Ops',
    machine: 'Machine',
    maintenance: 'Maintenance',
    support: 'Support',
  }

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <DemoScreen title={titles[tab]} subtitle="Explore freely" accentColor={accent}>
          {tab === 'home' && (
            <div className="space-y-3">
              <div className="rounded-xl bg-emerald-50 px-3 py-2 ring-1 ring-emerald-100">
                <p className="text-[0.75rem] font-medium text-emerald-900">All stores operational</p>
                <p className="text-[0.6875rem] text-emerald-700">1 maintenance task due this week</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTab('support')
                  setBreakdownView('symptoms')
                }}
                className="w-full rounded-2xl bg-amber-900 p-4 text-left text-white"
              >
                <p className="text-[0.625rem] font-semibold uppercase opacity-80">Quick action</p>
                <p className="mt-1 font-semibold">Report a machine fault</p>
              </button>
            </div>
          )}
          {tab === 'support' && (
            <div className="space-y-3">
              {config.assistant && (
                <DemoAiAssistant config={config.assistant} accentColor={accent} />
              )}
              <button
                type="button"
                onClick={() => {
                  setBreakdownView('symptoms')
                  exploreShow({
                    id: 'support-fault',
                    clientAsk: 'a single place for fault reporting and AI guidance.',
                    ourSolution: 'integrated troubleshooting flow with escalation path to technicians.',
                  })
                }}
                className="w-full rounded-xl bg-white p-3 text-left ring-1 ring-slate-100"
              >
                <p className="font-semibold">Start fault report</p>
                <p className="text-[0.75rem] text-slate-500">Guided diagnosis · ~2 min</p>
              </button>
            </div>
          )}
          {tab === 'machine' && (
            <p className="text-[0.8125rem] text-slate-600">
              Machine explorer available during the Learn journey. Restart to try another scenario.
            </p>
          )}
          {tab === 'maintenance' && (
            <p className="text-[0.8125rem] text-slate-600">
              Maintenance dashboard and AI plans - explore freely or restart a journey.
            </p>
          )}
        </DemoScreen>
      </div>
      <DemoTabBar
        tabs={[
          { id: 'home', label: 'Home', icon: '⌂' },
          { id: 'machine', label: 'Machine', icon: '⚙' },
          { id: 'maintenance', label: 'Maint.', icon: '◷' },
          { id: 'support', label: 'Support', icon: '?' },
        ]}
        active={tab}
        onChange={(id) => setTab(id as Tab)}
        accentColor={accent}
      />
    </div>
  )
}

export function PhoenixCoffeeDemo() {
  return (
    <InteractiveDemoShell demoId="phoenix-coffee" accentColor={accent}>
      <PhoenixApp />
    </InteractiveDemoShell>
  )
}
