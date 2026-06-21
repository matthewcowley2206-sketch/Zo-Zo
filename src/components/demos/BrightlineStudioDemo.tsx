import { useState, type ReactNode } from 'react'
import { useDemoAnnotation } from './DemoAnnotations'
import {
  brightlineOpportunities,
  brightlineRoadmaps,
  type RoadmapScenario,
} from './brightlineDemoContent'
import { GuideTarget, useDemoGuide, useGuideActivate } from './DemoGuide'
import { DemoButton, DemoPill } from './DeviceFrame'
import { InteractiveDemoShell } from './InteractiveDemoShell'
import { DemoAiAssistant } from './shared/DemoAiAssistant'
import { DemoJourneyPicker } from './shared/DemoJourneyPicker'
import { DemoOutcomeReveal } from './shared/DemoOutcomeReveal'
import { DemoProcessingSequence } from './shared/DemoProcessingSequence'
import { DemoRecommendationPanel } from './shared/DemoRecommendationPanel'
import { DemoRoadmapPanel } from './shared/DemoRoadmapPanel'

const accent = '#0f766e'

const SUGGESTED_CHALLENGE =
  'We want to expand into adjacent markets but need clarity on where to focus first - without over-investing before validation.'

const WORKSHOP_CHALLENGE =
  'Our leadership team has five competing priorities for H2. We need alignment on what to fund, what to defer, and who owns each bet.'

type Tab = 'workspace' | 'scenarios' | 'roadmap'
type IdeaView = 'challenge' | 'processing' | 'canvas' | 'outcome'
type TransformView = 'current' | 'processing' | 'future' | 'outcome'
type WorkshopView = 'challenge' | 'processing' | 'priorities' | 'outcome'

const transformActions = [
  {
    id: 'transformation-roadmap',
    title: 'Approve transformation roadmap',
    description: '3 workstreams · phased 30/90-day delivery · exec sponsors',
    impact: 'Est. 18% efficiency gain over 12 months',
  },
  {
    id: 'pilot-only',
    title: 'Pilot one workstream first',
    description: 'Customer experience stream only · lower risk entry',
    impact: 'Est. 6% gain · validates approach',
  },
]

const workshopActions = [
  {
    id: 'align-priority',
    title: 'Align on customer experience program',
    description: 'Top impact · medium effort · exec sponsor assigned',
    impact: 'Unblocks 2 dependent initiatives',
  },
  {
    id: 'defer-growth',
    title: 'Defer market expansion to H2',
    description: 'Free capacity for customer experience · consensus path',
    impact: 'Reduces execution risk this quarter',
  },
]

function BrightlineHeader({
  title,
  subtitle = 'Brightline · Strategic planning',
  right,
}: {
  title: string
  subtitle?: string
  right?: ReactNode
}) {
  return (
    <div className="shrink-0 border-b border-slate-200 px-5 py-3" style={{ backgroundColor: accent }}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.625rem] font-medium uppercase tracking-wider text-white/70">
            {subtitle}
          </p>
          <h3 className="text-[0.9375rem] font-semibold text-white">{title}</h3>
        </div>
        {right ?? <DemoPill color="green">Simulated</DemoPill>}
      </div>
    </div>
  )
}

function BrightlineShell({
  title,
  subtitle,
  children,
  onBack,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  onBack?: () => void
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <BrightlineHeader title={title} subtitle={subtitle} />
      <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mb-3 text-[0.8125rem] font-medium text-slate-600 hover:text-teal-900"
          >
            ← Back
          </button>
        )}
        <div className="mx-auto max-w-[540px] space-y-3">{children}</div>
      </div>
    </div>
  )
}

function BrightlineApp() {
  const { show } = useDemoAnnotation()
  const {
    mode,
    config,
    awaitingJourney,
    activeJourney,
    selectJourney,
    skipToExplore,
  } = useDemoGuide()

  const [tab, setTab] = useState<Tab>('workspace')
  const [ideaView, setIdeaView] = useState<IdeaView>('challenge')
  const [transformView, setTransformView] = useState<TransformView>('current')
  const [workshopView, setWorkshopView] = useState<WorkshopView>('challenge')
  const [challenge, setChallenge] = useState('')
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [scenario, setScenario] = useState<RoadmapScenario>('growth')

  const challengeInput = useGuideActivate('challenge-input')
  const generateCanvas = useGuideActivate('generate-canvas-btn')
  const currentState = useGuideActivate('current-state-review')
  const futureState = useGuideActivate('future-state-btn')
  const workshopChallenge = useGuideActivate('workshop-challenge')
  const runFacilitation = useGuideActivate('run-facilitation-btn')

  const exploreShow = (annotation: Parameters<typeof show>[0]) => {
    if (mode === 'explore') show(annotation)
  }

  const resetJourneyState = () => {
    setIdeaView('challenge')
    setTransformView('current')
    setWorkshopView('challenge')
    setChallenge('')
    setSelectedAction(null)
    setTab('workspace')
  }

  const handleSelectJourney = (id: string) => {
    selectJourney(id)
    resetJourneyState()
  }

  if (awaitingJourney) {
    return (
      <BrightlineShell title="Choose a scenario" subtitle="Strategy workspace">
        <DemoJourneyPicker
          journeys={config.journeys ?? []}
          accentColor={accent}
          onSelect={handleSelectJourney}
        />
        {config.assistant && (
          <DemoAiAssistant config={config.assistant} accentColor={accent} compact />
        )}
      </BrightlineShell>
    )
  }

  if (mode !== 'explore' && activeJourney?.id === 'idea') {
    if (ideaView === 'processing') {
      return (
        <BrightlineShell title="Building canvas" subtitle="AI opportunity mapping">
          <DemoProcessingSequence
            messages={
              activeJourney.processingMessages ?? [
                'Analysing challenge…',
                'Mapping opportunities…',
                'Scoring fit…',
              ]
            }
            accentColor={accent}
            onComplete={() => setIdeaView('canvas')}
          />
        </BrightlineShell>
      )
    }

    if (ideaView === 'canvas') {
      return (
        <BrightlineShell
          title="Opportunity canvas"
          subtitle="Prioritise options"
          onBack={() => setIdeaView('challenge')}
        >
          <div className="rounded-xl bg-teal-50 p-3 ring-1 ring-teal-100">
            <p className="text-[0.625rem] font-semibold uppercase text-teal-800">AI summary</p>
            <p className="mt-1 text-[0.8125rem] leading-relaxed text-teal-900">
              Three viable paths identified. Partnership channel offers fastest validation with
              lowest capital. Recommend prioritising before product or bundling plays.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {brightlineOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="rounded-lg bg-white p-2.5 ring-1 ring-slate-200 text-[0.6875rem]"
              >
                <p className="font-semibold text-slate-900">{opp.title}</p>
                <p className="mt-1 text-slate-600">{opp.impact}</p>
              </div>
            ))}
          </div>
          <DemoRecommendationPanel
            recommendations={brightlineOpportunities}
            accentColor={accent}
            highlightTargetId="action-partnership"
            selectedId={selectedAction ?? undefined}
            onSelect={(id) => {
              setSelectedAction(id)
              if (id === 'partnership') setIdeaView('outcome')
            }}
          />
        </BrightlineShell>
      )
    }

    if (ideaView === 'outcome') {
      return (
        <BrightlineShell title="Next steps ready" subtitle="New business idea">
          <DemoRoadmapPanel
            scenario="growth"
            {...brightlineRoadmaps.growth}
            accentColor={accent}
          />
          <DemoOutcomeReveal
            outcome={activeJourney.outcome}
            accentColor={accent}
            onContinue={() => {
              skipToExplore()
              setTab('roadmap')
            }}
          />
        </BrightlineShell>
      )
    }

    return (
      <BrightlineShell title="Business challenge" subtitle="New business idea">
        <GuideTarget id="challenge-input">
          <div className="space-y-2">
            <label className="text-[0.6875rem] font-semibold uppercase text-slate-400">
              Step 2 · Describe your challenge
            </label>
            <textarea
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              onFocus={() => challengeInput.onGuideAction()}
              placeholder="What strategic question are you trying to answer?"
              className="h-24 w-full rounded-xl border-0 bg-white p-3 text-[0.8125rem] ring-1 ring-slate-200 focus:ring-teal-500"
            />
            <button
              type="button"
              onClick={() => {
                setChallenge(SUGGESTED_CHALLENGE)
                challengeInput.onGuideAction()
              }}
              className="text-[0.75rem] font-medium text-teal-800 hover:text-teal-950"
            >
              Use suggested challenge →
            </button>
          </div>
        </GuideTarget>
        {challenge.trim().length > 10 && (
          <GuideTarget id="generate-canvas-btn">
            <DemoButton
              accentColor={accent}
              onClick={() => {
                generateCanvas.onGuideAction()
                setIdeaView('processing')
              }}
            >
              Generate opportunity canvas
            </DemoButton>
          </GuideTarget>
        )}
      </BrightlineShell>
    )
  }

  if (mode !== 'explore' && activeJourney?.id === 'transformation') {
    if (transformView === 'processing') {
      return (
        <BrightlineShell title="Future state planning" subtitle="AI transformation">
          <DemoProcessingSequence
            messages={
              activeJourney.processingMessages ?? [
                'Assessing current state…',
                'Modelling future state…',
                'Identifying opportunities…',
              ]
            }
            accentColor={accent}
            onComplete={() => setTransformView('future')}
          />
        </BrightlineShell>
      )
    }

    if (transformView === 'future') {
      return (
        <BrightlineShell
          title="Future state plan"
          subtitle="Transformation program"
          onBack={() => setTransformView('current')}
        >
          <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
            <p className="text-[0.625rem] font-semibold uppercase text-slate-400">Target state</p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-slate-700">
              Integrated customer experience · automated handoffs between sales and delivery ·
              single source of truth for program status. 3 workstreams over 12 months.
            </p>
          </div>
          <DemoRoadmapPanel
            scenario="transformation"
            {...brightlineRoadmaps.transformation}
            accentColor={accent}
          />
          <DemoRecommendationPanel
            recommendations={transformActions}
            accentColor={accent}
            highlightTargetId="action-transformation-roadmap"
            selectedId={selectedAction ?? undefined}
            onSelect={(id) => {
              setSelectedAction(id)
              if (id === 'transformation-roadmap') setTransformView('outcome')
            }}
          />
        </BrightlineShell>
      )
    }

    if (transformView === 'outcome') {
      return (
        <BrightlineShell title="Roadmap approved" subtitle="Transformation program">
          <DemoOutcomeReveal
            outcome={activeJourney.outcome}
            accentColor={accent}
            onContinue={() => {
              skipToExplore()
              setTab('scenarios')
            }}
          />
        </BrightlineShell>
      )
    }

    return (
      <BrightlineShell title="Current state" subtitle="Transformation assessment">
        <GuideTarget id="current-state-review">
          <div
            className="space-y-3 rounded-xl bg-white p-4 ring-1 ring-slate-200"
            onClick={() => currentState.onGuideAction()}
            onKeyDown={() => {}}
            role="presentation"
          >
            <p className="text-[0.625rem] font-semibold uppercase text-slate-400">
              Current state assessment
            </p>
            {[
              { label: 'Delivery efficiency', value: '62% · below benchmark' },
              { label: 'Customer satisfaction', value: 'NPS 41 · declining' },
              { label: 'Manual handoffs', value: '14 per project · bottleneck' },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between border-b border-slate-100 pb-2 text-[0.8125rem] last:border-0"
              >
                <span className="text-slate-600">{row.label}</span>
                <span className="font-semibold text-slate-900">{row.value}</span>
              </div>
            ))}
            <div className="rounded-lg bg-amber-50 px-3 py-2 text-[0.75rem] text-amber-900 ring-1 ring-amber-100">
              Key gap · No shared view of program status across teams
            </div>
          </div>
        </GuideTarget>
        <GuideTarget id="future-state-btn">
          <DemoButton
            accentColor={accent}
            onClick={() => {
              futureState.onGuideAction()
              setTransformView('processing')
            }}
          >
            Generate future state plan
          </DemoButton>
        </GuideTarget>
      </BrightlineShell>
    )
  }

  if (mode !== 'explore' && activeJourney?.id === 'workshop') {
    if (workshopView === 'processing') {
      return (
        <BrightlineShell title="Facilitating" subtitle="Leadership workshop">
          <DemoProcessingSequence
            messages={
              activeJourney.processingMessages ?? [
                'Facilitating discussion…',
                'Synthesising views…',
                'Building priority matrix…',
              ]
            }
            accentColor={accent}
            onComplete={() => setWorkshopView('priorities')}
          />
        </BrightlineShell>
      )
    }

    if (workshopView === 'priorities') {
      return (
        <BrightlineShell
          title="Priority matrix"
          subtitle="Leadership alignment"
          onBack={() => setWorkshopView('challenge')}
        >
          <div className="rounded-xl bg-violet-50 p-3 ring-1 ring-violet-100">
            <p className="text-[0.625rem] font-semibold uppercase text-violet-700">Facilitation summary</p>
            <p className="mt-1 text-[0.8125rem] text-violet-900">
              Customer experience program ranks highest on impact/effort. Market expansion should
              defer to H2 if customer experience is funded.
            </p>
          </div>
          <DemoRecommendationPanel
            recommendations={workshopActions}
            accentColor={accent}
            highlightTargetId="action-align-priority"
            selectedId={selectedAction ?? undefined}
            onSelect={(id) => {
              setSelectedAction(id)
              if (id === 'align-priority') setWorkshopView('outcome')
            }}
          />
        </BrightlineShell>
      )
    }

    if (workshopView === 'outcome') {
      return (
        <BrightlineShell title="Alignment reached" subtitle="Leadership workshop">
          <DemoOutcomeReveal
            outcome={activeJourney.outcome}
            accentColor={accent}
            onContinue={() => {
              skipToExplore()
              setTab('workspace')
            }}
          />
        </BrightlineShell>
      )
    }

    return (
      <BrightlineShell title="Workshop setup" subtitle="Leadership alignment">
        <GuideTarget id="workshop-challenge">
          <button
            type="button"
            onClick={() => workshopChallenge.onGuideAction()}
            className="w-full rounded-xl bg-white p-4 text-left ring-1 ring-slate-200"
          >
            <p className="text-[0.625rem] font-semibold uppercase text-slate-400">
              Strategic challenge
            </p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-slate-700">{WORKSHOP_CHALLENGE}</p>
            <p className="mt-3 text-[0.75rem] font-medium text-teal-800">Confirm challenge →</p>
          </button>
        </GuideTarget>
        <GuideTarget id="run-facilitation-btn">
          <DemoButton
            accentColor={accent}
            onClick={() => {
              runFacilitation.onGuideAction()
              setWorkshopView('processing')
            }}
          >
            Run AI facilitation
          </DemoButton>
        </GuideTarget>
      </BrightlineShell>
    )
  }

  const navTabs: { id: Tab; label: string }[] = [
    { id: 'workspace', label: 'Workspace' },
    { id: 'scenarios', label: 'Scenarios' },
    { id: 'roadmap', label: 'Roadmap' },
  ]

  const scenarioKeys: RoadmapScenario[] = ['growth', 'conservative', 'transformation']

  return (
    <div className="flex h-full min-h-0 flex-col">
      <BrightlineHeader
        title={
          tab === 'workspace'
            ? 'Planning workspace'
            : tab === 'scenarios'
              ? 'Scenario planning'
              : 'Strategic roadmap'
        }
        right={
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[0.6875rem] font-semibold text-white">
            Explore mode
          </span>
        }
      />
      <div className="flex shrink-0 gap-1 border-b border-slate-200 bg-white px-4 py-2">
        {navTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-3 py-1.5 text-[0.75rem] font-semibold transition ${
              tab === t.id ? 'text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
            style={tab === t.id ? { backgroundColor: accent } : undefined}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4">
        <div className="mx-auto max-w-[540px] space-y-3">
          {tab === 'workspace' && config.assistant && (
            <DemoAiAssistant config={config.assistant} accentColor={accent} />
          )}
          {tab === 'scenarios' && (
            <>
              <div className="flex flex-wrap gap-1.5">
                {scenarioKeys.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setScenario(key)
                      exploreShow({
                        id: `scenario-${key}`,
                        clientAsk: 'to compare strategic paths before committing budget.',
                        ourSolution: `${brightlineRoadmaps[key].label} with different 30/90-day trade-offs.`,
                      })
                    }}
                    className={`rounded-lg px-2.5 py-1.5 text-[0.6875rem] font-semibold ${
                      scenario === key ? 'text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'
                    }`}
                    style={scenario === key ? { backgroundColor: accent } : undefined}
                  >
                    {brightlineRoadmaps[key].label}
                  </button>
                ))}
              </div>
              <p className="text-[0.8125rem] text-slate-600">
                Compare how priorities shift under different strategic assumptions.
              </p>
            </>
          )}
          {(tab === 'roadmap' || tab === 'scenarios') && (
            <DemoRoadmapPanel scenario={scenario} {...brightlineRoadmaps[scenario]} accentColor={accent} />
          )}
        </div>
      </div>
    </div>
  )
}

export function BrightlineStudioDemo() {
  return (
    <InteractiveDemoShell demoId="brightline-studio" accentColor={accent}>
      <BrightlineApp />
    </InteractiveDemoShell>
  )
}
