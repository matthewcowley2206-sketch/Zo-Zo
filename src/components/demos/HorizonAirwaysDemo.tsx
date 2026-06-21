import { useState, type ReactNode } from 'react'
import { useDemoAnnotation } from './DemoAnnotations'
import { GuideTarget, useDemoGuide, useGuideActivate } from './DemoGuide'
import { horizonAccounts } from './demoGuides'
import { DemoButton, DemoPill } from './DeviceFrame'
import { InteractiveDemoShell } from './InteractiveDemoShell'
import { DemoAiAssistant } from './shared/DemoAiAssistant'
import { DemoJourneyPicker } from './shared/DemoJourneyPicker'
import { DemoOutcomeReveal } from './shared/DemoOutcomeReveal'
import { DemoProcessingSequence } from './shared/DemoProcessingSequence'
import { DemoRecommendationPanel } from './shared/DemoRecommendationPanel'

const accent = '#0c4a6e'

type Tab = 'portfolio' | 'alerts' | 'forecast'
type SalesView = 'portfolio' | 'processing' | 'opportunities' | 'outcome'
type AccountView = 'alert' | 'health' | 'processing' | 'brief' | 'outcome'
type ExecutiveView = 'dashboard' | 'processing' | 'priorities' | 'outcome'

const opportunityAlerts = [
  {
    id: 'mining',
    label: 'Mining sector travel down 12%',
    detail: 'Sector-wide contraction · 4 accounts affected',
    tone: 'amber',
  },
  {
    id: 'pacific',
    targetId: 'alert-at-risk',
    label: 'Revenue risk · Pacific Resources',
    detail: 'Spend down 24% · no exec contact 90 days',
    tone: 'rose',
  },
  {
    id: 'westfield',
    label: 'Executive engagement recommended',
    detail: 'Westfield Mining · contract renewal Q4',
    tone: 'sky',
  },
]

const salesActions = [
  {
    id: 'focus-mining',
    title: 'Focus mining sector recovery',
    description: 'Targeted coverage + sector incentive program · Q3',
    impact: '+$2.2M forecast uplift',
  },
  {
    id: 'incentive',
    title: 'Offer commercial incentive',
    description: 'Volume commitment discount · top 3 mining accounts',
    impact: '+$1.4M potential · higher certainty',
  },
]

const accountActions = [
  {
    id: 'retention',
    title: 'Launch retention campaign',
    description: 'Executive outreach + travel credit · Pacific Resources',
    impact: 'Risk 78 → 52 · $620k protected',
  },
  {
    id: 'coverage',
    title: 'Increase account coverage',
    description: 'Dedicated AM + quarterly business review',
    impact: 'Risk 78 → 61 · relationship rebuild',
  },
]

const executiveActions = [
  {
    id: 'priority-growth',
    title: 'Prioritise mining sector recovery',
    description: 'Cross-functional taskforce · sales + network planning',
    impact: '$3.1M Q3 upside · top strategic bet',
  },
  {
    id: 'retention-program',
    title: 'Enterprise retention program',
    description: 'Top 10 at-risk accounts · exec sponsor model',
    impact: '$1.8M revenue protected',
  },
]

function HorizonHeader({
  title,
  subtitle = 'Horizon Airways · Commercial intelligence',
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

function HorizonShell({
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
      <HorizonHeader title={title} subtitle={subtitle} />
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
        <div className="mx-auto max-w-[560px] space-y-3">{children}</div>
      </div>
    </div>
  )
}

function PortfolioTable({
  highlightTargetId,
  onSelect,
  selectedId,
}: {
  highlightTargetId?: string
  onSelect: (id: string, targetId?: string) => void
  selectedId?: string
}) {
  return (
    <div className="space-y-2">
      {horizonAccounts.map((account) => {
        const targetId = account.targetId ?? `account-${account.id}`
        const isHighlight = highlightTargetId === targetId
        const card = (
          <button
            type="button"
            onClick={() => onSelect(account.id, account.targetId)}
            className={`flex w-full items-center justify-between rounded-xl p-3 text-left ring-1 transition ${
              selectedId === account.id
                ? 'bg-sky-50 ring-sky-200'
                : 'bg-white ring-slate-200 hover:ring-sky-200'
            }`}
          >
            <div>
              <p className="font-semibold text-slate-900">{account.name}</p>
              <p className="text-[0.6875rem] text-slate-500">
                {account.sector} · {account.status}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold tabular-nums text-slate-900">{account.revenue}</p>
              <p
                className={`text-[0.6875rem] font-bold tabular-nums ${
                  account.risk >= 60
                    ? 'text-rose-600'
                    : account.risk >= 40
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                }`}
              >
                Risk {account.risk} · {account.trend}
              </p>
            </div>
          </button>
        )

        if (isHighlight) {
          return (
            <GuideTarget key={account.id} id={targetId}>
              {card}
            </GuideTarget>
          )
        }

        return <div key={account.id}>{card}</div>
      })}
    </div>
  )
}

function HorizonApp() {
  const { show } = useDemoAnnotation()
  const {
    mode,
    config,
    awaitingJourney,
    activeJourney,
    selectJourney,
    skipToExplore,
  } = useDemoGuide()

  const [tab, setTab] = useState<Tab>('portfolio')
  const [salesView, setSalesView] = useState<SalesView>('portfolio')
  const [accountView, setAccountView] = useState<AccountView>('alert')
  const [executiveView, setExecutiveView] = useState<ExecutiveView>('dashboard')
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [forecast, setForecast] = useState('$42.0M')

  const portfolioMining = useGuideActivate('portfolio-account-mining')
  const runScan = useGuideActivate('run-opportunity-scan')
  const alertAtRisk = useGuideActivate('alert-at-risk')
  const accountHealth = useGuideActivate('account-health-pacific')
  const generateBrief = useGuideActivate('generate-brief-btn')
  const execDashboard = useGuideActivate('exec-dashboard')
  const aiSummary = useGuideActivate('ai-summary-btn')

  const exploreShow = (annotation: Parameters<typeof show>[0]) => {
    if (mode === 'explore') show(annotation)
  }

  const resetJourneyState = () => {
    setSalesView('portfolio')
    setAccountView('alert')
    setExecutiveView('dashboard')
    setSelectedAccount(null)
    setSelectedAction(null)
    setForecast('$42.0M')
    setTab('portfolio')
  }

  const handleSelectJourney = (id: string) => {
    selectJourney(id)
    resetJourneyState()
  }

  const handleAccountSelect = (id: string, targetId?: string) => {
    setSelectedAccount(id)
    if (targetId === 'portfolio-account-mining') portfolioMining.onGuideAction()
    if (targetId === 'account-health-pacific') accountHealth.onGuideAction()
  }

  if (awaitingJourney) {
    return (
      <HorizonShell title="Choose a scenario" subtitle="Commercial growth platform">
        <DemoJourneyPicker
          journeys={config.journeys ?? []}
          accentColor={accent}
          onSelect={handleSelectJourney}
        />
        {config.assistant && (
          <DemoAiAssistant config={config.assistant} accentColor={accent} compact />
        )}
      </HorizonShell>
    )
  }

  if (mode !== 'explore' && activeJourney?.id === 'sales') {
    if (salesView === 'processing') {
      return (
        <HorizonShell title="Opportunity scan" subtitle="AI analysis">
          <DemoProcessingSequence
            messages={
              activeJourney.processingMessages ?? [
                'Reviewing portfolio…',
                'Scanning sectors…',
                'Identifying opportunities…',
              ]
            }
            accentColor={accent}
            onComplete={() => setSalesView('opportunities')}
          />
        </HorizonShell>
      )
    }

    if (salesView === 'opportunities') {
      return (
        <HorizonShell
          title="Opportunities identified"
          subtitle="Review recommendations"
          onBack={() => setSalesView('portfolio')}
        >
          <div className="rounded-xl bg-sky-50 p-3 ring-1 ring-sky-100">
            <p className="text-[0.625rem] font-semibold uppercase text-sky-800">AI insight</p>
            <p className="mt-1 text-[0.8125rem] leading-relaxed text-sky-900">
              Mining sector offers largest Q3 upside. Westfield Mining and Pacific Resources need
              coordinated coverage. Forecast uplift +$2.2M with focused recovery plan.
            </p>
          </div>
          <DemoRecommendationPanel
            recommendations={salesActions}
            accentColor={accent}
            highlightTargetId="action-focus-mining"
            selectedId={selectedAction ?? undefined}
            onSelect={(id) => {
              setSelectedAction(id)
              if (id === 'focus-mining') {
                setForecast('$44.2M')
                setSalesView('outcome')
              }
            }}
          />
        </HorizonShell>
      )
    }

    if (salesView === 'outcome') {
      return (
        <HorizonShell title="Forecast updated" subtitle="Sales leader focus">
          <DemoOutcomeReveal
            outcome={activeJourney.outcome}
            accentColor={accent}
            onContinue={() => {
              skipToExplore()
              setTab('forecast')
            }}
          />
        </HorizonShell>
      )
    }

    return (
      <HorizonShell title="Portfolio review" subtitle="Step 2 · Sales leader">
        <p className="text-[0.8125rem] text-slate-600">
          Review account portfolio performance for Q3 planning.
        </p>
        <PortfolioTable
          highlightTargetId="portfolio-account-mining"
          selectedId={selectedAccount ?? undefined}
          onSelect={(id, targetId) => handleAccountSelect(id, targetId)}
        />
        {selectedAccount && (
          <GuideTarget id="run-opportunity-scan">
            <DemoButton
              accentColor={accent}
              onClick={() => {
                runScan.onGuideAction()
                setSalesView('processing')
              }}
            >
              Run opportunity scan
            </DemoButton>
          </GuideTarget>
        )}
      </HorizonShell>
    )
  }

  if (mode !== 'explore' && activeJourney?.id === 'account') {
    const pacific = horizonAccounts.find((a) => a.id === 'pacific')!

    if (accountView === 'processing') {
      return (
        <HorizonShell title="Generating brief" subtitle="AI account analysis">
          <DemoProcessingSequence
            messages={
              activeJourney.processingMessages ?? [
                'Analysing account health…',
                'Reviewing travel patterns…',
                'Generating brief…',
              ]
            }
            accentColor={accent}
            onComplete={() => setAccountView('brief')}
          />
        </HorizonShell>
      )
    }

    if (accountView === 'brief') {
      return (
        <HorizonShell
          title="Account brief"
          subtitle="Pacific Resources"
          onBack={() => setAccountView('health')}
        >
          <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
            <p className="text-[0.625rem] font-semibold uppercase text-slate-400">AI account brief</p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-slate-700">
              Pacific Resources travel spend down 24% QoQ. Root cause: competitor route expansion +
              reduced project travel. No executive contact in 90 days. Recommend retention campaign
              with travel credit and dedicated AM coverage.
            </p>
          </div>
          <DemoRecommendationPanel
            recommendations={accountActions}
            accentColor={accent}
            highlightTargetId="action-retention"
            selectedId={selectedAction ?? undefined}
            onSelect={(id) => {
              setSelectedAction(id)
              if (id === 'retention') setAccountView('outcome')
            }}
          />
        </HorizonShell>
      )
    }

    if (accountView === 'outcome') {
      return (
        <HorizonShell title="Risk reduced" subtitle="Account manager">
          <DemoOutcomeReveal
            outcome={activeJourney.outcome}
            accentColor={accent}
            onContinue={() => {
              skipToExplore()
              setTab('alerts')
            }}
          />
        </HorizonShell>
      )
    }

    if (accountView === 'health') {
      return (
        <HorizonShell
          title={pacific.name}
          subtitle="Account health"
          onBack={() => setAccountView('alert')}
        >
        <GuideTarget id="account-health-pacific">
          <div
            className="grid grid-cols-2 gap-2"
            onClick={() => accountHealth.onGuideAction()}
            onKeyDown={() => {}}
            role="presentation"
          >
            {[
              { label: 'Revenue YTD', value: pacific.revenue },
              { label: 'Trend', value: pacific.trend },
              { label: 'Risk score', value: `${pacific.risk} / 100` },
              { label: 'Revenue at risk', value: '$620k' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-white p-3 ring-1 ring-slate-200">
                <p className="text-[0.625rem] text-slate-400">{stat.label}</p>
                <p className="mt-1 font-semibold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </GuideTarget>
          <GuideTarget id="generate-brief-btn">
            <DemoButton
              accentColor={accent}
              onClick={() => {
                generateBrief.onGuideAction()
                setAccountView('processing')
              }}
            >
              Generate account brief
            </DemoButton>
          </GuideTarget>
        </HorizonShell>
      )
    }

    return (
      <HorizonShell title="Alerts" subtitle="Account at risk">
        <p className="text-[0.8125rem] text-slate-600">Review proactive commercial alerts.</p>
        {opportunityAlerts.map((alert) => {
          const isTarget = alert.targetId === 'alert-at-risk'
          const card = (
            <button
              type="button"
              onClick={() => {
                if (alert.id === 'pacific') {
                  alertAtRisk.onGuideAction()
                  setSelectedAccount('pacific')
                  setAccountView('health')
                }
              }}
              className={`w-full rounded-xl p-3 text-left ring-1 ${
                alert.tone === 'rose'
                  ? 'bg-rose-50 ring-rose-100'
                  : alert.tone === 'amber'
                    ? 'bg-amber-50 ring-amber-100'
                    : 'bg-sky-50 ring-sky-100'
              }`}
            >
              <p className="font-semibold text-slate-900">{alert.label}</p>
              <p className="mt-1 text-[0.75rem] text-slate-600">{alert.detail}</p>
            </button>
          )

          if (isTarget) {
            return (
              <GuideTarget key={alert.id} id={alert.targetId!}>
                {card}
              </GuideTarget>
            )
          }

          return <div key={alert.id}>{card}</div>
        })}
      </HorizonShell>
    )
  }

  if (mode !== 'explore' && activeJourney?.id === 'executive') {
    if (executiveView === 'processing') {
      return (
        <HorizonShell title="Executive summary" subtitle="AI synthesis">
          <DemoProcessingSequence
            messages={
              activeJourney.processingMessages ?? [
                'Aggregating signals…',
                'Generating summary…',
                'Ranking priorities…',
              ]
            }
            accentColor={accent}
            onComplete={() => setExecutiveView('priorities')}
          />
        </HorizonShell>
      )
    }

    if (executiveView === 'priorities') {
      return (
        <HorizonShell
          title="Strategic priorities"
          subtitle="Executive focus"
          onBack={() => setExecutiveView('dashboard')}
        >
          <div className="rounded-xl bg-violet-50 p-3 ring-1 ring-violet-100">
            <p className="text-[0.625rem] font-semibold uppercase text-violet-700">AI summary</p>
            <p className="mt-1 text-[0.8125rem] leading-relaxed text-violet-900">
              Commercial health stable overall, but mining sector contraction creates both risk and
              recovery opportunity. Recommend 3 owned priorities with $3.1M Q3 upside.
            </p>
          </div>
          <DemoRecommendationPanel
            recommendations={executiveActions}
            accentColor={accent}
            highlightTargetId="action-priority-growth"
            selectedId={selectedAction ?? undefined}
            onSelect={(id) => {
              setSelectedAction(id)
              if (id === 'priority-growth') setExecutiveView('outcome')
            }}
          />
        </HorizonShell>
      )
    }

    if (executiveView === 'outcome') {
      return (
        <HorizonShell title="Focus aligned" subtitle="Executive priorities">
          <DemoOutcomeReveal
            outcome={activeJourney.outcome}
            accentColor={accent}
            onContinue={() => {
              skipToExplore()
              setTab('portfolio')
            }}
          />
        </HorizonShell>
      )
    }

    return (
      <HorizonShell title="Executive dashboard" subtitle="Commercial overview">
        <GuideTarget id="exec-dashboard">
          <div
            className="space-y-3"
            onClick={() => execDashboard.onGuideAction()}
            onKeyDown={() => {}}
            role="presentation"
          >
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Q3 forecast', value: forecast },
                { label: 'At-risk revenue', value: '$2.1M' },
                { label: 'Opportunities', value: '7 active' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg bg-white p-3 ring-1 ring-slate-200">
                  <p className="text-[0.625rem] text-slate-400">{stat.label}</p>
                  <p className="mt-1 text-[1rem] font-bold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-amber-50 px-3 py-2 text-[0.75rem] text-amber-900 ring-1 ring-amber-100">
              Alert · Mining sector travel down 12% · executive engagement recommended
            </div>
            <div className="rounded-lg bg-rose-50 px-3 py-2 text-[0.75rem] text-rose-900 ring-1 ring-rose-100">
              Risk · Pacific Resources · $620k revenue at risk
            </div>
          </div>
        </GuideTarget>
        <GuideTarget id="ai-summary-btn">
          <DemoButton
            accentColor={accent}
            onClick={() => {
              aiSummary.onGuideAction()
              setExecutiveView('processing')
            }}
          >
            Generate AI summary
          </DemoButton>
        </GuideTarget>
      </HorizonShell>
    )
  }

  const navTabs: { id: Tab; label: string }[] = [
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'forecast', label: 'Forecast' },
  ]

  return (
    <div className="flex h-full min-h-0 flex-col">
      <HorizonHeader
        title={
          tab === 'portfolio'
            ? 'Account portfolio'
            : tab === 'alerts'
              ? 'Opportunity alerts'
              : 'Revenue forecast'
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
        <div className="mx-auto max-w-[560px] space-y-3">
          {tab === 'portfolio' && (
            <>
              <PortfolioTable
                onSelect={(id) => {
                  setSelectedAccount(id)
                  exploreShow({
                    id: `account-${id}`,
                    clientAsk: 'portfolio visibility without spreadsheet exports.',
                    ourSolution: 'live portfolio with sector, revenue, and risk in one view.',
                  })
                }}
              />
              {config.assistant && (
                <DemoAiAssistant config={config.assistant} accentColor={accent} />
              )}
            </>
          )}
          {tab === 'alerts' &&
            opportunityAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-xl p-3 ring-1 ${
                  alert.tone === 'rose'
                    ? 'bg-rose-50 ring-rose-100'
                    : alert.tone === 'amber'
                      ? 'bg-amber-50 ring-amber-100'
                      : 'bg-sky-50 ring-sky-100'
                }`}
              >
                <p className="font-semibold text-slate-900">{alert.label}</p>
                <p className="mt-1 text-[0.75rem] text-slate-600">{alert.detail}</p>
              </div>
            ))}
          {tab === 'forecast' && (
            <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-[0.625rem] font-semibold uppercase text-slate-400">Q3 forecast</p>
              <p className="mt-2 text-[2rem] font-bold text-slate-900">{forecast}</p>
              <p className="mt-2 text-[0.8125rem] text-slate-600">
                Simulated based on portfolio actions · updates when you complete journeys
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function HorizonAirwaysDemo() {
  return (
    <InteractiveDemoShell demoId="horizon-airways" accentColor={accent}>
      <HorizonApp />
    </InteractiveDemoShell>
  )
}
