import { useState, type ReactNode } from 'react'
import { useDemoAnnotation } from './DemoAnnotations'
import { GuideTarget, useDemoGuide, useGuideActivate } from './DemoGuide'
import { northgateInsightCategories } from './demoGuides'
import { analyseNorthgateFeedback } from '../../lib/demoAnalysis/northgateFeedback'
import {
  matchNorthgateFreeTextQuery,
  northgateSuggestedQuestions,
  resolveNorthgateAssistantQuestion,
} from '../../lib/demoAnalysis/northgateAssistantResolver'
import { getSamplesForIndustry } from '../../lib/demoAnalysis/northgateSamples'
import type { IndustryContext, NorthgateAnalysisResult } from '../../lib/demoAnalysis/types'
import { DemoButton, DemoPill } from './DeviceFrame'
import { InteractiveDemoShell } from './InteractiveDemoShell'
import { DemoAiAssistant } from './shared/DemoAiAssistant'
import { DemoFeedbackTransformation } from './shared/DemoFeedbackTransformation'
import { DemoIndustrySelector } from './shared/DemoIndustrySelector'
import { DemoInsightExplorer } from './shared/DemoInsightExplorer'
import { DemoInsightTransparency } from './shared/DemoInsightTransparency'
import { DemoJourneyPicker } from './shared/DemoJourneyPicker'
import { DemoOutcomePreview } from './shared/DemoOutcomePreview'
import { DemoOutcomeReveal } from './shared/DemoOutcomeReveal'
import { DemoPipelineHeader } from './shared/DemoPipelineHeader'
import { DemoPriorityMatrix } from './shared/DemoPriorityMatrix'
import { DemoProcessingSequence } from './shared/DemoProcessingSequence'
import { DemoRecommendationPanel } from './shared/DemoRecommendationPanel'
import { DemoServiceClosingPanel } from './shared/DemoServiceClosingPanel'

const accent = '#1e3a5f'
const capabilitySubtitle = 'Client Listening Intelligence · Example: Northgate Legal'

type Tab = 'dashboard' | 'insights' | 'groups'
type ListeningView = 'input' | 'processing' | 'topInsight' | 'decisionSupport' | 'outcome'
type LeadershipView = 'findings' | 'processing' | 'brief' | 'outcome'
type PracticeView = 'select' | 'sentiment' | 'actions' | 'outcome'

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
  subtitle = capabilitySubtitle,
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
  const [listeningView, setListeningView] = useState<ListeningView>('input')
  const [leadershipView, setLeadershipView] = useState<LeadershipView>('findings')
  const [practiceView, setPracticeView] = useState<PracticeView>('select')
  const [feedbackText, setFeedbackText] = useState('')
  const [industry, setIndustry] = useState<IndustryContext>('law')
  const [analysisResult, setAnalysisResult] = useState<NorthgateAnalysisResult | null>(null)
  const [activeTheme, setActiveTheme] = useState('responsiveness')
  const [selectedGroup, setSelectedGroup] = useState(practiceGroups[0])
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [activeInsight, setActiveInsight] = useState('responsiveness')

  const runAnalysis = useGuideActivate('run-analysis-btn')
  const topInsightContinue = useGuideActivate('top-insight-continue')
  const themeResponsiveness = useGuideActivate('theme-responsiveness')
  const findingsSummary = useGuideActivate('findings-summary')
  const generateBrief = useGuideActivate('generate-brief-btn')
  const groupCorporate = useGuideActivate('group-corporate')
  const sentimentReview = useGuideActivate('sentiment-review')

  const exploreShow = (annotation: Parameters<typeof show>[0]) => {
    if (mode === 'explore') show(annotation)
  }

  const resetJourneyState = () => {
    setListeningView('input')
    setLeadershipView('findings')
    setPracticeView('select')
    setFeedbackText('')
    setAnalysisResult(null)
    setActiveTheme('responsiveness')
    setSelectedGroup(practiceGroups[0])
    setSelectedAction(null)
    setTab('dashboard')
  }

  const handleSelectJourney = (id: string) => {
    selectJourney(id)
    resetJourneyState()
    if (id === 'listening') {
      setFeedbackText(getSamplesForIndustry('law')[0].text)
    }
  }

  const runFeedbackAnalysis = () => {
    const result = analyseNorthgateFeedback(feedbackText, industry)
    setAnalysisResult(result)
    setActiveTheme(result.themes[0].id)
    runAnalysis.onGuideAction()
    setListeningView('processing')
  }

  const northgateAssistant = (
    <DemoAiAssistant
      title="Decision support assistant"
      placeholder="Ask about priorities, risks, or quick wins…"
      suggestions={northgateSuggestedQuestions}
      resolveQuestion={(id) => resolveNorthgateAssistantQuestion(id, analysisResult)}
      resolveFreeText={(q) => matchNorthgateFreeTextQuery(q, analysisResult)}
      accentColor={accent}
      compact={listeningView === 'input'}
    />
  )

  const industrySamples = getSamplesForIndustry(industry)

  const insightCategories = analysisResult
    ? analysisResult.themes.map((t) => ({
        id: t.id,
        label: t.label,
        score: t.score,
        sentiment: t.sentiment,
        summary: t.summary,
        mentions: t.mentions,
        risk: t.risk,
        supportingQuotes: t.supportingQuotes,
        rootCauses: t.rootCauses,
        recommendedActions: t.recommendedActions,
        expectedOutcomes: t.expectedOutcomes,
      }))
    : northgateInsightCategories

  if (awaitingJourney) {
    return (
      <NorthgateShell title="Choose a scenario" subtitle={capabilitySubtitle}>
        <DemoJourneyPicker
          journeys={config.journeys ?? []}
          accentColor={accent}
          onSelect={handleSelectJourney}
        />
        {northgateAssistant}
      </NorthgateShell>
    )
  }

  if (mode !== 'explore' && activeJourney?.id === 'listening') {
    if (listeningView === 'processing' && analysisResult) {
      return (
        <NorthgateShell title="Analysing feedback" subtitle={capabilitySubtitle}>
          <DemoPipelineHeader activeStage="analysis" accentColor={accent} />
          <DemoProcessingSequence
            messages={analysisResult.processingMessages}
            accentColor={accent}
            onComplete={() => setListeningView('topInsight')}
          />
        </NorthgateShell>
      )
    }

    if (listeningView === 'topInsight' && analysisResult) {
      const { topInsight, outcomePreview, transparency } = analysisResult
      return (
        <NorthgateShell title="Analysis complete" subtitle={capabilitySubtitle} onBack={() => setListeningView('input')}>
          <DemoPipelineHeader activeStage="analysis" accentColor={accent} />
          <div className="rounded-xl bg-violet-50 p-3 ring-1 ring-violet-100">
            <p className="text-[0.625rem] font-semibold uppercase text-violet-700">Top insight</p>
            <p className="mt-1 text-[0.9375rem] font-semibold text-violet-950">
              {topInsight.themeLabel} · score {topInsight.score}
            </p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-violet-900">{topInsight.summary}</p>
          </div>
          <DemoOutcomePreview
            headline={outcomePreview.headline}
            metric={outcomePreview.metric}
            detail={outcomePreview.detail}
            accentColor={accent}
          />
          <DemoInsightTransparency
            items={[
              { label: 'Feedback excerpts analysed', value: transparency.excerptCount },
              { label: 'Themes identified', value: transparency.themeCount },
              { label: 'Risks flagged', value: transparency.riskCount },
              { label: 'Opportunities identified', value: transparency.opportunityCount },
              { label: 'Recommendations prioritised', value: transparency.recommendationCount },
            ]}
          />
          <DemoInsightExplorer
            categories={insightCategories}
            activeId={activeTheme}
            onSelect={(id) => {
              setActiveTheme(id)
              if (id === analysisResult.themes[0].id) themeResponsiveness.onGuideAction()
            }}
            highlightTargetId={`theme-${analysisResult.themes[0].id}`}
            accentColor={accent}
            drillDown
            connected
          />
          {northgateAssistant}
          <GuideTarget id="top-insight-continue">
            <DemoButton
              accentColor={accent}
              onClick={() => {
                topInsightContinue.onGuideAction()
                setListeningView('decisionSupport')
              }}
            >
              View executive insight
            </DemoButton>
          </GuideTarget>
        </NorthgateShell>
      )
    }

    if (listeningView === 'decisionSupport' && analysisResult) {
      const primaryId = analysisResult.recommendations[0]?.id ?? 'responsiveness'
      return (
        <NorthgateShell title="Executive insight" subtitle={capabilitySubtitle} onBack={() => setListeningView('topInsight')}>
          <DemoPipelineHeader activeStage="insight" accentColor={accent} />
          <DemoFeedbackTransformation
            rawExcerpts={analysisResult.rawExcerpts}
            brief={analysisResult.executiveBrief}
            accentColor={accent}
          />
          <DemoPriorityMatrix
            recommendations={analysisResult.recommendations}
            accentColor={accent}
          />
          <DemoRecommendationPanel
            recommendations={analysisResult.recommendations}
            accentColor={accent}
            highlightTargetId={`action-${primaryId}`}
            selectedId={selectedAction ?? undefined}
            title="Select your first action"
            onSelect={(id) => {
              setSelectedAction(id)
              setListeningView('outcome')
            }}
          />
          {northgateAssistant}
        </NorthgateShell>
      )
    }

    if (listeningView === 'outcome') {
      return (
        <NorthgateShell title="Action selected" subtitle={capabilitySubtitle}>
          <DemoOutcomeReveal
            outcome={activeJourney.outcome}
            accentColor={accent}
            onContinue={() => {
              skipToExplore()
              setTab('insights')
            }}
          />
          <div className="mt-4">
            <DemoServiceClosingPanel variant="northgate" />
          </div>
        </NorthgateShell>
      )
    }

    return (
      <NorthgateShell title="Analyse feedback" subtitle={capabilitySubtitle}>
        <DemoPipelineHeader activeStage="input" accentColor={accent} />
        <DemoIndustrySelector value={industry} onChange={setIndustry} accentColor={accent} />
        <p className="text-[0.8125rem] text-slate-600">
          Paste stakeholder feedback, interview notes, or survey comments. Analysis runs in your
          browser - nothing is uploaded.
        </p>
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Paste feedback here…"
          rows={5}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[0.8125rem] leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
        <div className="space-y-1.5">
          <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-400">
            Try a sample for your industry
          </p>
          <div className="flex flex-wrap gap-1.5">
            {industrySamples.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => setFeedbackText(sample.text)}
                className="rounded-lg bg-white px-2.5 py-1.5 text-[0.6875rem] font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-800 hover:text-white hover:ring-slate-700"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
        {feedbackText.trim().length >= 40 && (
          <GuideTarget id="run-analysis-btn">
            <DemoButton accentColor={accent} onClick={runFeedbackAnalysis}>
              Analyse feedback
            </DemoButton>
          </GuideTarget>
        )}
        {northgateAssistant}
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
      const brief = analysisResult?.executiveBrief
      const recs = analysisResult?.recommendations ?? leadershipActions
      const primaryId = recs[0]?.id ?? 'responsiveness'
      return (
        <NorthgateShell
          title="Leadership brief"
          subtitle="Prioritise actions"
          onBack={() => setLeadershipView('findings')}
        >
          {brief ? (
            <DemoFeedbackTransformation
              rawExcerpts={analysisResult?.rawExcerpts ?? ['Executive stakeholder session notes…']}
              brief={brief}
              accentColor={accent}
            />
          ) : (
            <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-[0.625rem] font-semibold uppercase text-slate-400">Executive summary</p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-slate-700">
                Client listening across 26 interviews confirms strong trust in partner judgment, but
                responsiveness and value narrative need urgent attention in Corporate & M&A.
              </p>
            </div>
          )}
          <DemoRecommendationPanel
            recommendations={recs}
            accentColor={accent}
            highlightTargetId={`action-${primaryId}`}
            selectedId={selectedAction ?? undefined}
            onSelect={(id) => {
              setSelectedAction(id)
              if (id === primaryId || id === 'responsiveness') setLeadershipView('outcome')
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
              if (!analysisResult) {
                const sample = getSamplesForIndustry(industry).find((s) => s.id === 'executive')!
                setAnalysisResult(analyseNorthgateFeedback(sample.text, industry))
              }
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
              {northgateAssistant}
            </>
          )}
          {tab === 'insights' && (
            <DemoInsightExplorer
              categories={insightCategories}
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
              drillDown={!!analysisResult}
              connected={!!analysisResult}
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
