import { useState, type ReactNode } from 'react'
import { useDemoAnnotation } from './DemoAnnotations'
import { GuideTarget, useDemoGuide, useGuideActivate } from './DemoGuide'
import { northgateInsightCategories } from './demoGuides'
import { DemoButton, DemoPill } from './DeviceFrame'
import { InteractiveDemoShell } from './InteractiveDemoShell'
import { DemoAiAssistant } from './shared/DemoAiAssistant'
import { DemoInsightExplorer } from './shared/DemoInsightExplorer'
import { DemoJourneyPicker } from './shared/DemoJourneyPicker'
import { DemoOutcomeReveal } from './shared/DemoOutcomeReveal'
import { DemoProcessingSequence } from './shared/DemoProcessingSequence'
import { DemoRecommendationPanel } from './shared/DemoRecommendationPanel'

const accent = '#1e3a5f'

type Tab = 'dashboard' | 'insights' | 'groups'
type ListeningView = 'upload' | 'processing' | 'themes' | 'outcome'
type LeadershipView = 'findings' | 'processing' | 'brief' | 'outcome'
type PracticeView = 'select' | 'sentiment' | 'actions' | 'outcome'

const uploadSources = [
  {
    id: 'transcript',
    targetId: 'upload-transcript',
    label: 'Interview transcript',
    file: 'client_interviews_q2_2025.txt',
    count: '12 interviews · 4.2 hrs',
  },
  {
    id: 'survey',
    label: 'Survey results',
    file: 'annual_client_survey.csv',
    count: '89 responses · 94% completion',
  },
  {
    id: 'feedback',
    label: 'Client feedback',
    file: 'feedback_portal_export.json',
    count: '34 submissions · last 90 days',
  },
]

const practiceGroups = [
  {
    id: 'corporate',
    targetId: 'group-corporate',
    label: 'Corporate & M&A',
    interviews: 12,
    nps: 42,
    sentiment: 68,
    trend: '↓ Value concerns rising',
  },
  {
    id: 'litigation',
    label: 'Litigation',
    interviews: 8,
    nps: 51,
    sentiment: 55,
    trend: '→ Stable · communication praised',
  },
  {
    id: 'property',
    label: 'Property',
    interviews: 6,
    nps: 58,
    sentiment: 72,
    trend: '↑ Strong strategic advice scores',
  },
]

const leadershipActions = [
  {
    id: 'responsiveness',
    title: 'Launch proactive matter updates',
    description: 'Automated status updates for in-flight matters · 90-day rollout',
    impact: 'Est. +8 NPS · addresses top client concern',
  },
  {
    id: 'value',
    title: 'Partner-led value reviews',
    description: 'Quarterly value narrative for top 20 corporate clients',
    impact: 'Est. +6 NPS · fee clarity improvement',
  },
]

const practiceActions = [
  {
    id: 'value-review',
    title: 'Partner-led value reviews',
    description: 'Top 12 corporate clients · fee narrative workshop',
    impact: 'Est. +8 NPS for Corporate & M&A',
  },
  {
    id: 'status-portal',
    title: 'Matter status visibility',
    description: 'Client portal for matter progress · corporate segment',
    impact: 'Est. +5 NPS · reduces status enquiry calls',
  },
]

function NorthgateHeader({
  title,
  subtitle = 'Northgate Legal · Client listening',
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

function NorthgateShell({
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
      <NorthgateHeader title={title} subtitle={subtitle} />
      <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mb-3 text-[0.8125rem] font-medium text-slate-600 hover:text-slate-900"
          >
            ← Back
          </button>
        )}
        <div className="mx-auto max-w-[540px] space-y-3">{children}</div>
      </div>
    </div>
  )
}

function NorthgateApp() {
  const { show } = useDemoAnnotation()
  const {
    mode,
    config,
    awaitingJourney,
    activeJourney,
    selectJourney,
    skipToExplore,
  } = useDemoGuide()

  const [tab, setTab] = useState<Tab>('dashboard')
  const [listeningView, setListeningView] = useState<ListeningView>('upload')
  const [leadershipView, setLeadershipView] = useState<LeadershipView>('findings')
  const [practiceView, setPracticeView] = useState<PracticeView>('select')
  const [selectedUpload, setSelectedUpload] = useState<string | null>(null)
  const [activeTheme, setActiveTheme] = useState('responsiveness')
  const [selectedGroup, setSelectedGroup] = useState(practiceGroups[0])
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [activeInsight, setActiveInsight] = useState('responsiveness')

  const uploadTranscript = useGuideActivate('upload-transcript')
  const runAnalysis = useGuideActivate('run-analysis-btn')
  const themeResponsiveness = useGuideActivate('theme-responsiveness')
  const findingsSummary = useGuideActivate('findings-summary')
  const generateBrief = useGuideActivate('generate-brief-btn')
  const groupCorporate = useGuideActivate('group-corporate')
  const sentimentReview = useGuideActivate('sentiment-review')

  const exploreShow = (annotation: Parameters<typeof show>[0]) => {
    if (mode === 'explore') show(annotation)
  }

  const resetJourneyState = () => {
    setListeningView('upload')
    setLeadershipView('findings')
    setPracticeView('select')
    setSelectedUpload(null)
    setActiveTheme('responsiveness')
    setSelectedGroup(practiceGroups[0])
    setSelectedAction(null)
    setTab('dashboard')
  }

  const handleSelectJourney = (id: string) => {
    selectJourney(id)
    resetJourneyState()
  }

  if (awaitingJourney) {
    return (
      <NorthgateShell title="Choose a scenario" subtitle="Client listening platform">
        <DemoJourneyPicker
          journeys={config.journeys ?? []}
          accentColor={accent}
          onSelect={handleSelectJourney}
        />
        {config.assistant && (
          <DemoAiAssistant config={config.assistant} accentColor={accent} compact />
        )}
      </NorthgateShell>
    )
  }

  if (mode !== 'explore' && activeJourney?.id === 'listening') {
    if (listeningView === 'processing') {
      return (
        <NorthgateShell title="Analysing transcripts" subtitle="Step 3 · AI insight">
          <DemoProcessingSequence
            messages={
              activeJourney.processingMessages ?? [
                'Analysing feedback…',
                'Generating themes…',
                'Preparing recommendations…',
              ]
            }
            accentColor={accent}
            onComplete={() => setListeningView('themes')}
          />
        </NorthgateShell>
      )
    }

    if (listeningView === 'themes') {
      return (
        <NorthgateShell title="Themes extracted" subtitle="Step 4 · Review insights">
          <div className="rounded-xl bg-violet-50 p-3 ring-1 ring-violet-100">
            <p className="text-[0.625rem] font-semibold uppercase text-violet-700">AI summary</p>
            <p className="mt-1 text-[0.8125rem] leading-relaxed text-violet-900">
              12 interviews analysed · 4 priority themes · 2 risk flags. Responsiveness is the
              highest-impact improvement area for Q3.
            </p>
          </div>
          <DemoInsightExplorer
            categories={northgateInsightCategories}
            activeId={activeTheme}
            onSelect={(id) => {
              setActiveTheme(id)
              if (id === 'responsiveness') themeResponsiveness.onGuideAction()
            }}
            highlightTargetId="theme-responsiveness"
            accentColor={accent}
          />
          <DemoButton accentColor={accent} onClick={() => setListeningView('outcome')}>
            View business outcome
          </DemoButton>
        </NorthgateShell>
      )
    }

    if (listeningView === 'outcome') {
      return (
        <NorthgateShell title="Analysis complete" subtitle="Client listening review">
          <DemoOutcomeReveal
            outcome={activeJourney.outcome}
            accentColor={accent}
            onContinue={() => {
              skipToExplore()
              setTab('insights')
            }}
          />
        </NorthgateShell>
      )
    }

    return (
      <NorthgateShell title="Upload sources" subtitle="Step 2 · Client listening review">
        <p className="text-[0.8125rem] text-slate-600">
          Select sources to analyse. Simulated upload — no files leave your browser.
        </p>
        {uploadSources.map((source) => {
          const isTarget = source.targetId === 'upload-transcript'
          const card = (
            <button
              type="button"
              onClick={() => {
                setSelectedUpload(source.id)
                if (source.id === 'transcript') uploadTranscript.onGuideAction()
              }}
              className={`w-full rounded-xl p-3 text-left ring-1 transition ${
                selectedUpload === source.id
                  ? 'bg-slate-800 text-white ring-slate-700'
                  : 'bg-white ring-slate-200 hover:ring-slate-300'
              }`}
            >
              <p className="font-semibold">{source.label}</p>
              <p
                className={`mt-0.5 text-[0.75rem] ${
                  selectedUpload === source.id ? 'text-white/80' : 'text-slate-500'
                }`}
              >
                {source.file}
              </p>
              <p
                className={`mt-1 text-[0.6875rem] ${
                  selectedUpload === source.id ? 'text-white/70' : 'text-slate-400'
                }`}
              >
                {source.count}
              </p>
            </button>
          )

          if (isTarget) {
            return (
              <GuideTarget key={source.id} id={source.targetId!}>
                {card}
              </GuideTarget>
            )
          }

          return <div key={source.id}>{card}</div>
        })}
        {selectedUpload && (
          <GuideTarget id="run-analysis-btn">
            <DemoButton
              accentColor={accent}
              onClick={() => {
                runAnalysis.onGuideAction()
                setListeningView('processing')
              }}
            >
              Analyse transcripts
            </DemoButton>
          </GuideTarget>
        )}
      </NorthgateShell>
    )
  }

  if (mode !== 'explore' && activeJourney?.id === 'leadership') {
    if (leadershipView === 'processing') {
      return (
        <NorthgateShell title="Generating brief" subtitle="AI executive summary">
          <DemoProcessingSequence
            messages={
              activeJourney.processingMessages ?? [
                'Synthesising findings…',
                'Drafting executive summary…',
                'Ranking priorities…',
              ]
            }
            accentColor={accent}
            onComplete={() => setLeadershipView('brief')}
          />
        </NorthgateShell>
      )
    }

    if (leadershipView === 'brief') {
      return (
        <NorthgateShell
          title="Leadership brief"
          subtitle="Prioritise actions"
          onBack={() => setLeadershipView('findings')}
        >
          <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
            <p className="text-[0.625rem] font-semibold uppercase text-slate-400">Executive summary</p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-slate-700">
              Client listening across 26 interviews confirms strong trust in partner judgment, but
              responsiveness and value narrative need urgent attention in Corporate & M&A. Recommend
              two Q3 initiatives with measurable NPS targets.
            </p>
          </div>
          <DemoRecommendationPanel
            recommendations={leadershipActions}
            accentColor={accent}
            highlightTargetId="action-responsiveness"
            selectedId={selectedAction ?? undefined}
            onSelect={(id) => {
              setSelectedAction(id)
              if (id === 'responsiveness') setLeadershipView('outcome')
            }}
          />
        </NorthgateShell>
      )
    }

    if (leadershipView === 'outcome') {
      return (
        <NorthgateShell title="Action plan ready" subtitle="Leadership brief">
          <DemoOutcomeReveal
            outcome={activeJourney.outcome}
            accentColor={accent}
            onContinue={() => {
              skipToExplore()
              setTab('dashboard')
            }}
          />
        </NorthgateShell>
      )
    }

    return (
      <NorthgateShell title="Findings overview" subtitle="Leadership brief">
        <GuideTarget id="findings-summary">
          <div
            className="space-y-3 rounded-xl bg-white p-4 ring-1 ring-slate-200"
            onClick={() => findingsSummary.onGuideAction()}
            onKeyDown={() => {}}
            role="presentation"
          >
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: 'Interviews', value: '26' },
                { label: 'Avg sentiment', value: '66' },
                { label: 'Risk flags', value: '2' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg bg-slate-50 p-2">
                  <p className="text-[1.125rem] font-bold text-slate-900">{stat.value}</p>
                  <p className="text-[0.625rem] text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-amber-50 px-3 py-2 text-[0.75rem] text-amber-900 ring-1 ring-amber-100">
              Top concern · Responsiveness on routine matters · 38% of mixed feedback
            </div>
            <div className="rounded-lg bg-emerald-50 px-3 py-2 text-[0.75rem] text-emerald-900 ring-1 ring-emerald-100">
              Strength · Strategic advice · 74 score · litigation & property leading
            </div>
          </div>
        </GuideTarget>
        <GuideTarget id="generate-brief-btn">
          <DemoButton
            accentColor={accent}
            onClick={() => {
              generateBrief.onGuideAction()
              setLeadershipView('processing')
            }}
          >
            Generate leadership brief
          </DemoButton>
        </GuideTarget>
      </NorthgateShell>
    )
  }

  if (mode !== 'explore' && activeJourney?.id === 'practice') {
    if (practiceView === 'sentiment') {
      return (
        <NorthgateShell
          title={selectedGroup.label}
          subtitle="Sentiment breakdown"
          onBack={() => setPracticeView('select')}
        >
          <div className="space-y-2">
            {[
              { label: 'Responsiveness', score: 58, tone: 'amber' },
              { label: 'Communication', score: 71, tone: 'emerald' },
              { label: 'Value', score: 49, tone: 'rose' },
              { label: 'Strategic advice', score: 76, tone: 'emerald' },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-lg bg-white px-3 py-2 ring-1 ring-slate-200"
              >
                <span className="text-[0.8125rem] font-medium text-slate-700">{row.label}</span>
                <span className="text-[0.875rem] font-bold tabular-nums text-slate-900">{row.score}</span>
              </div>
            ))}
          </div>
          <DemoButton
            accentColor={accent}
            onClick={() => setPracticeView('actions')}
          >
            View recommended actions
          </DemoButton>
        </NorthgateShell>
      )
    }

    if (practiceView === 'actions') {
      return (
        <NorthgateShell
          title="Improvement actions"
          subtitle={selectedGroup.label}
          onBack={() => setPracticeView('sentiment')}
        >
          <DemoRecommendationPanel
            recommendations={practiceActions}
            accentColor={accent}
            highlightTargetId="action-value-review"
            selectedId={selectedAction ?? undefined}
            onSelect={(id) => {
              setSelectedAction(id)
              if (id === 'value-review') setPracticeView('outcome')
            }}
          />
        </NorthgateShell>
      )
    }

    if (practiceView === 'outcome') {
      return (
        <NorthgateShell title="Actions defined" subtitle="Practice group review">
          <DemoOutcomeReveal
            outcome={activeJourney.outcome}
            accentColor={accent}
            onContinue={() => {
              skipToExplore()
              setTab('groups')
            }}
          />
        </NorthgateShell>
      )
    }

    return (
      <NorthgateShell title="Practice groups" subtitle="Select a team">
        <p className="text-[0.8125rem] text-slate-600">
          Review sentiment and opportunities for one practice group.
        </p>
        {practiceGroups.map((group) => {
          const isTarget = group.targetId === 'group-corporate'
          const card = (
            <button
              type="button"
              onClick={() => {
                setSelectedGroup(group)
                if (group.id === 'corporate') groupCorporate.onGuideAction()
              }}
              className={`w-full rounded-xl p-3 text-left ring-1 transition ${
                selectedGroup.id === group.id
                  ? 'bg-slate-800 text-white ring-slate-700'
                  : 'bg-white ring-slate-200 hover:ring-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold">{group.label}</p>
                <span className="text-[0.875rem] font-bold tabular-nums">{group.nps} NPS</span>
              </div>
              <p
                className={`mt-1 text-[0.75rem] ${
                  selectedGroup.id === group.id ? 'text-white/80' : 'text-slate-500'
                }`}
              >
                {group.interviews} interviews · sentiment {group.sentiment}
              </p>
              <p
                className={`mt-1 text-[0.6875rem] ${
                  selectedGroup.id === group.id ? 'text-white/70' : 'text-slate-400'
                }`}
              >
                {group.trend}
              </p>
            </button>
          )

          if (isTarget) {
            return (
              <GuideTarget key={group.id} id={group.targetId!}>
                {card}
              </GuideTarget>
            )
          }

          return <div key={group.id}>{card}</div>
        })}
        {selectedGroup.id === 'corporate' && (
          <GuideTarget id="sentiment-review">
            <DemoButton
              accentColor={accent}
              onClick={() => {
                sentimentReview.onGuideAction()
                setPracticeView('sentiment')
              }}
            >
              View sentiment breakdown
            </DemoButton>
          </GuideTarget>
        )}
      </NorthgateShell>
    )
  }

  const navTabs: { id: Tab; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'insights', label: 'Insights' },
    { id: 'groups', label: 'Groups' },
  ]

  return (
    <div className="flex h-full min-h-0 flex-col">
      <NorthgateHeader
        title={
          tab === 'dashboard'
            ? 'Client listening dashboard'
            : tab === 'insights'
              ? 'Insight explorer'
              : 'Practice groups'
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
          {tab === 'dashboard' && (
            <>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Interviews', value: '26' },
                  { label: 'Themes', value: '4' },
                  { label: 'Risk flags', value: '2' },
                  { label: 'Avg NPS', value: '48' },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                    <p className="text-[0.625rem] text-slate-400">{s.label}</p>
                    <p className="text-[1.125rem] font-bold text-slate-900">{s.value}</p>
                  </div>
                ))}
              </div>
              {config.assistant && (
                <DemoAiAssistant config={config.assistant} accentColor={accent} />
              )}
            </>
          )}
          {tab === 'insights' && (
            <DemoInsightExplorer
              categories={northgateInsightCategories}
              activeId={activeInsight}
              onSelect={(id) => {
                setActiveInsight(id)
                exploreShow({
                  id: `insight-${id}`,
                  clientAsk: `visibility into ${id} across all client feedback.`,
                  ourSolution: 'insight explorer with scores, sentiment, and risk flags per theme.',
                })
              }}
              accentColor={accent}
            />
          )}
          {tab === 'groups' &&
            practiceGroups.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() =>
                  exploreShow({
                    id: group.id,
                    clientAsk: 'practice leaders to see their group without firm-wide averages.',
                    ourSolution: 'group-level NPS and sentiment with targeted recommendations.',
                  })
                }
                className="w-full rounded-xl bg-white p-3 text-left ring-1 ring-slate-200"
              >
                <p className="font-semibold">{group.label}</p>
                <p className="mt-1 text-[0.75rem] text-slate-500">
                  {group.interviews} interviews · NPS {group.nps}
                </p>
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}

export function NorthgateLegalDemo() {
  return (
    <InteractiveDemoShell demoId="northgate-legal" accentColor={accent}>
      <NorthgateApp />
    </InteractiveDemoShell>
  )
}
