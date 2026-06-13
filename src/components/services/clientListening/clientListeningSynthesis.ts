export type QuoteTheme = 'trust' | 'value' | 'responsiveness' | 'partnership'

export type ClientQuote = {
  id: string
  client: string
  role: string
  text: string
  suggestedTheme: QuoteTheme
}

export const clientQuotes: ClientQuote[] = [
  {
    id: 'q1',
    client: 'Sarah Chen',
    role: 'COO · Harbour Group',
    text: 'We trust your team on delivery - but we often find out about changes after the fact, not before.',
    suggestedTheme: 'responsiveness',
  },
  {
    id: 'q2',
    client: 'James Okonkwo',
    role: 'Head of Procurement · Northline',
    text: 'Your value is clear when things go well. When they do not, it is harder to see what we are paying for.',
    suggestedTheme: 'value',
  },
  {
    id: 'q3',
    client: 'Elena Vasquez',
    role: 'Director · Meridian Health',
    text: 'We think of you as a partner, not a vendor - but the account rhythm feels reactive, not planned.',
    suggestedTheme: 'partnership',
  },
  {
    id: 'q4',
    client: 'David Park',
    role: 'CEO · Atlas Logistics',
    text: 'Honest feedback: we would recommend you, but our last NPS score reflected frustration on speed to respond.',
    suggestedTheme: 'trust',
  },
]

export const themeLabels: Record<QuoteTheme, string> = {
  trust: 'Trust & confidence',
  value: 'Value & pricing clarity',
  responsiveness: 'Responsiveness & communication',
  partnership: 'Partnership & rhythm',
}

export type WorkflowStep = 'listen' | 'insights' | 'act' | 'close' | 'measure'

export type ActionChoice = 'comms' | 'value' | 'rhythm'

export type QuoteAnalysis = {
  id: string
  client: string
  role: string
  verbatim: string
  taggedTheme: QuoteTheme
  themeLabel: string
  interpretation: string
  implication: string
}

export type ListeningReport = {
  meta: {
    title: string
    subtitle: string
    programScope: string
    interviewsCompleted: number
    dominantTheme: QuoteTheme
    dominantThemeLabel: string
    selectedAction: ActionChoice
  }
  executiveSummary: string
  quoteAnalysis: QuoteAnalysis[]
  themeRankings: {
    theme: QuoteTheme
    label: string
    count: number
    clients: string[]
    signal: string
    priority: 'critical' | 'high' | 'medium'
  }[]
  strengthsToProtect: string[]
  blindSpot: string
  internalGap: string
  strategyImplication: string
  strategicPriorities: { label: string; detail: string }[]
  recommendedAction: { title: string; detail: string; owner: string; rationale: string }
  actionPlan: { horizon: string; items: { task: string; owner: string }[] }[]
  closeLoopMessage: string
  closeLoopChannels: string[]
  nps: { score: number; trend: string; driver: string; promoters: string; detractors: string }
  csat: { score: number; dimensions: { name: string; score: number; note: string }[] }
  persona: {
    name: string
    segment: string
    profile: string[]
    relationshipApproach: string[]
    intelligentSignals: string[]
  }
  measurementRhythm: { metric: string; frequency: string; owner: string }[]
  leadershipQuestions: string[]
  automation: { step: string; enablers: string[] }[]
}

const quoteInterpretations: Record<QuoteTheme, { interpretation: string; implication: string }> = {
  trust: {
    interpretation: 'Advocacy exists but confidence wavers when follow-through is slow or opaque.',
    implication: 'Protect trust with visible commitments and early issue flagging - not more marketing.',
  },
  value: {
    interpretation: 'Value is felt in good times; under strain, pricing and outcomes need clearer linkage.',
    implication: 'Prepare value narratives and scope clarity before the next delivery wobble.',
  },
  responsiveness: {
    interpretation: 'Clients learn about change after it happens - they want to be in the loop earlier.',
    implication: 'Fix communication protocol before scaling accounts or launching new offers.',
  },
  partnership: {
    interpretation: 'Relationship label is partner; experience sometimes feels vendor-like and reactive.',
    implication: 'Formalise partnership rhythm (QBRs, roadmap) to match how they describe you.',
  },
}

const themeSignals: Record<QuoteTheme, string> = {
  trust: 'Trust is present but fragile - speed and transparency determine advocacy.',
  value: 'Value perception drops when delivery friction hits - economics need clearer framing.',
  responsiveness: 'Communication timing is the gap - capability is not the issue.',
  partnership: 'Partnership intent is strong - planning and rhythm need to catch up.',
}

export function synthesizeListening(
  tags: Partial<Record<string, QuoteTheme>>,
  action: ActionChoice,
): ListeningReport {
  const counts: Record<QuoteTheme, number> = {
    trust: 0,
    value: 0,
    responsiveness: 0,
    partnership: 0,
  }

  const quoteAnalysis: QuoteAnalysis[] = clientQuotes.map((q) => {
    const tagged = tags[q.id] ?? q.suggestedTheme
    counts[tagged] += 1
    const interp = quoteInterpretations[tagged]
    return {
      id: q.id,
      client: q.client,
      role: q.role,
      verbatim: q.text,
      taggedTheme: tagged,
      themeLabel: themeLabels[tagged],
      interpretation: interp.interpretation,
      implication: interp.implication,
    }
  })

  const themeRankings = (Object.keys(counts) as QuoteTheme[])
    .map((theme) => ({
      theme,
      label: themeLabels[theme],
      count: counts[theme],
      clients: quoteAnalysis.filter((q) => q.taggedTheme === theme).map((q) => q.client.split(' ')[0]),
      signal: themeSignals[theme],
      priority: (counts[theme] >= 2 ? 'critical' : counts[theme] === 1 ? 'high' : 'medium') as
        | 'critical'
        | 'high'
        | 'medium',
    }))
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count)

  const dominant = themeRankings[0]?.theme ?? 'responsiveness'
  const topClients = themeRankings[0]?.clients.join(', ') ?? 'key accounts'

  const executiveSummary = `Across ${clientQuotes.length} structured client conversations, ${themeLabels[dominant].toLowerCase()} emerged as the strongest signal (${themeRankings[0]?.count ?? 1} of ${clientQuotes.length} interviews). Clients including ${topClients} raised related concerns in their own words. Delivery quality remains a relative strength, but ${dominant === 'responsiveness' ? 'clients learn about change too late' : dominant === 'value' ? 'value clarity weakens when delivery wobbles' : dominant === 'partnership' ? 'partnership language outpaces planned account rhythm' : 'trust and advocacy are sensitive to speed and transparency'}. Leadership should treat this as an operational and relationship fix - not a repositioning exercise - with ${action === 'comms' ? 'proactive communication' : action === 'value' ? 'value clarity with key accounts' : 'a formal partnership cadence'} as the primary response.`

  const strategyImplication =
    dominant === 'responsiveness'
      ? 'Inform strategy with one priority: rebuild proactive communication before expansion. Clients will not advocate at scale until they feel ahead of change.'
      : dominant === 'value'
        ? 'Inform strategy with value narrative and pricing transparency under pressure. Protect delivery strengths while fixing how economics are explained when things wobble.'
        : dominant === 'partnership'
          ? 'Inform strategy by formalising partnership rituals. Clients already call you a partner - strategy should match that with planned rhythm.'
          : 'Inform strategy by closing the trust gap on speed and follow-through. NPS and advocacy lag operational fixes - act visibly within 30 days.'

  const strategicPriorities = [
    {
      label: 'Now · 30 days',
      detail:
        action === 'comms'
          ? 'Launch proactive account pulse and change-notification protocol for all active accounts.'
          : action === 'value'
            ? 'Run value review conversations with accounts where value theme surfaced.'
            : 'Schedule first quarterly partnership session with top accounts.',
    },
    {
      label: 'Next · 60-90 days',
      detail: `Embed ${themeLabels[dominant].toLowerCase()} tracking in NPS/CSAT pulses and account plans.`,
    },
    {
      label: 'Park',
      detail: 'New offer expansion or major repositioning until loop is closed and scores stabilise.',
    },
  ]

  const actions: Record<
    ActionChoice,
    { title: string; detail: string; owner: string; rationale: string }
  > = {
    comms: {
      title: 'Proactive account communication protocol',
      detail:
        'Weekly status rhythm, change notifications before client discovery, named escalation on both sides.',
      owner: 'Client lead + delivery lead',
      rationale: `Addresses communication and trust signals from ${quoteAnalysis.filter((q) => q.taggedTheme === 'responsiveness' || q.taggedTheme === 'trust').map((q) => q.client.split(' ')[0]).join(', ') || 'interviewed clients'}.`,
    },
    value: {
      title: 'Value review with priority accounts',
      detail: 'Structured outcome review, scope clarity, pricing alignment - not a sales conversation.',
      owner: 'Account director',
      rationale: `Responds to value and trust themes from ${quoteAnalysis.filter((q) => q.taggedTheme === 'value' || q.taggedTheme === 'trust').map((q) => q.client.split(' ')[0]).join(', ') || 'key clients'}.`,
    },
    rhythm: {
      title: 'Quarterly partnership cadence',
      detail: 'Standing QBR with shared agenda, improvement pipeline, and explicit heard → done updates.',
      owner: 'Relationship owner',
      rationale: 'Matches partnership language from interviews and converts reactive management into planned rhythm.',
    },
  }

  const closeLoopMessages: Record<ActionChoice, string> = {
    comms:
      'You told us early visibility matters. We have introduced a weekly account pulse and will notify you before changes land. Here is what starts next week and who to contact.',
    value:
      'You raised value clarity when delivery hits friction. We are scheduling structured value reviews - to align on outcomes and scope, not to sell.',
    rhythm:
      'You described us as a partner but wanted more planning. We are putting a quarterly rhythm in place with a shared agenda. First session proposed for next month.',
  }

  const npsBase = 38 + themeRankings.filter((t) => t.priority === 'critical').length * 2
  const csatBase = 3.9 + (action === 'rhythm' ? 0.2 : 0)

  return {
    meta: {
      title: 'Client Listening · Insight Report',
      subtitle: 'Sample deliverable based on your exercise selections',
      programScope: '4 client interviews · leadership insight pack',
      interviewsCompleted: clientQuotes.length,
      dominantTheme: dominant,
      dominantThemeLabel: themeLabels[dominant],
      selectedAction: action,
    },
    executiveSummary,
    quoteAnalysis,
    themeRankings,
    strengthsToProtect: [
      'Delivery quality when projects run smoothly (multiple clients acknowledged capability)',
      'Willingness to give honest feedback - relationship foundation is present',
      'Partner intent from senior sponsors - not a transactional vendor relationship',
    ],
    blindSpot:
      'Internal teams rated communication higher than clients in parallel listening. The gap between intent and experience is where churn starts.',
    internalGap:
      'Delivery leads scored communication 4.2/5 internally; client interviews averaged 3.8 on the same dimension.',
    strategyImplication,
    strategicPriorities,
    recommendedAction: actions[action],
    actionPlan: [
      {
        horizon: 'Days 1-14',
        items: [
          { task: 'Brief account owners on insight report and close-loop messages', owner: 'Program lead' },
          { task: actions[action].title, owner: actions[action].owner },
        ],
      },
      {
        horizon: 'Days 15-30',
        items: [
          { task: 'Send personalised close-loop updates to interviewed clients', owner: 'Account owners' },
          { task: 'Run NPS/CSAT pulse to establish post-action baseline', owner: 'Insight lead' },
        ],
      },
      {
        horizon: 'Days 31-90',
        items: [
          { task: 'Review score movement and refresh personas from new data', owner: 'Insight lead' },
          { task: 'Hand insights to strategy session - priorities on one page', owner: 'Leadership' },
        ],
      },
    ],
    closeLoopMessage: closeLoopMessages[action],
    closeLoopChannels: [
      'Personal email from named account owner (not bulk send)',
      'Optional 15-minute check-in for detractor accounts',
      'Summary posted internally so teams say the same thing',
    ],
    nps: {
      score: npsBase,
      trend: '+8 pts projected after close-loop actions (90-day sample target)',
      driver:
        dominant === 'responsiveness' || dominant === 'trust'
          ? 'Speed to respond · proactive updates'
          : dominant === 'value'
            ? 'Value clarity under pressure'
            : 'Partnership rhythm and planning',
      promoters: `${Math.round(npsBase * 0.4)}% promoter language in interviews`,
      detractors: 'Detractor language tied to surprise and slow response - not capability',
    },
    csat: {
      score: Math.round(csatBase * 10) / 10,
      dimensions: [
        {
          name: 'Communication clarity',
          score: dominant === 'responsiveness' ? 3.7 : 3.9,
          note: 'Priority fix',
        },
        { name: 'Delivery quality', score: 4.5, note: 'Strength to protect' },
        { name: 'Account responsiveness', score: 3.8, note: 'Quick win via protocol' },
        { name: 'Overall partnership', score: 4.1, note: 'Strong foundation' },
      ],
    },
    persona: {
      name: 'Enterprise sponsor · mid-market',
      segment: 'Multi-stakeholder accounts · high trust sensitivity · partner mindset',
      profile: [
        `Primary concern from your tags: ${themeLabels[dominant].toLowerCase()}`,
        'Measures follow-through and transparency over promises',
        'Will advocate internally if feedback visibly becomes change',
      ],
      relationshipApproach: [
        'Lead with transparency on issues before they ask',
        'Quarterly business review tied to their KPIs',
        'Single owner with escalation path to leadership',
      ],
      intelligentSignals: [
        'Interview theme drift → trigger exec outreach within 48h',
        'CSAT dip on communication → auto-schedule reset call',
        'Persona refreshed quarterly from CRM + listening data',
      ],
    },
    measurementRhythm: [
      { metric: 'NPS', frequency: 'Quarterly pulse + post-intervention check', owner: 'Insight lead' },
      { metric: 'CSAT by dimension', frequency: 'Monthly snapshot on top 4 dimensions', owner: 'Account ops' },
      { metric: 'Close-loop completion', frequency: 'Weekly tracker - heard → done', owner: 'Program lead' },
    ],
    leadershipQuestions: [
      'Are we willing to pause expansion until communication protocol is live?',
      'Who owns the internal vs client gap on communication scores?',
      'What does success look like on NPS in 90 days - number and behaviour?',
    ],
    automation: [
      { step: 'Listen', enablers: ['Interview guides', 'Theme tagging', 'CRM sentiment notes', 'Scheduling workflow'] },
      { step: 'Extract insights', enablers: ['Pattern synthesis', 'Internal vs client gap alerts', 'Draft report for review'] },
      { step: 'Act', enablers: ['Priority scoring', 'Owner assignment', 'Leadership action dashboard'] },
      { step: 'Close the loop', enablers: ['Personalised update drafts', 'CRM tasks', 'Audit trail heard → done'] },
      { step: 'Measure & embed', enablers: ['NPS/CSAT automation', 'Persona refresh', 'Quarterly listening calendar'] },
    ],
  }
}

export type ListeningOutput = ListeningReport

export const workflowSteps: { id: WorkflowStep; label: string; sub: string }[] = [
  { id: 'listen', label: 'Listen', sub: 'Structured conversations' },
  { id: 'insights', label: 'Extract insights', sub: 'Your sample report' },
  { id: 'act', label: 'Act', sub: 'Prioritised response' },
  { id: 'close', label: 'Close the loop', sub: 'Tell the client what changed' },
  { id: 'measure', label: 'Measure & embed', sub: 'NPS · CSAT · personas · AI' },
]

export type StepGuide = { title: string; instruction: string; tip?: string }

export const stepGuides: Record<WorkflowStep, StepGuide> = {
  listen: {
    title: 'Listen to what clients are saying',
    instruction: 'Read the quote, then pick the theme you hear underneath the words.',
    tip: 'There is no perfect answer - tag what stands out. Your report is built from these choices.',
  },
  insights: {
    title: 'Your sample insight report',
    instruction: 'This is the kind of report we deliver after a listening program - built from what you tagged.',
    tip: 'In a real engagement, this includes your clients, your CRM data, and leadership workshop output.',
  },
  act: {
    title: 'Choose a response',
    instruction: 'Pick the action that best addresses what you heard. It updates the report recommendations.',
  },
  close: {
    title: 'Close the loop with clients',
    instruction: 'This section goes in the report and out to clients - feedback became visible change.',
  },
  measure: {
    title: 'Measure and embed the framework',
    instruction: 'Scores, persona, measurement rhythm, and how the loop keeps running.',
  },
}

export const reportSections = [
  {
    id: 'summary',
    label: 'Executive summary',
    instruction: 'Page 1 of your sample report - synthesis across all interviews and what leadership needs to know first.',
  },
  {
    id: 'quotes',
    label: 'Quote analysis',
    instruction: 'Each quote you tagged, with interpretation and leadership implication - this is how we turn verbatim into insight.',
  },
  {
    id: 'themes',
    label: 'Themes & blind spots',
    instruction: 'Theme rankings from your tags, plus the internal vs client gap that often surprises leadership.',
  },
  {
    id: 'strategy',
    label: 'Strategy & actions',
    instruction: 'How listening informs strategy, priorities, and a 90-day plan. You will refine the recommended action in the next step.',
  },
] as const

export const measureSections = [
  {
    id: 'scores',
    label: 'NPS & CSAT',
    instruction: 'Baseline scores and dimensions - what we track before and after close-loop actions land.',
  },
  {
    id: 'persona',
    label: 'Persona & rhythm',
    instruction: 'Intelligent persona built from listening data, plus the measurement rhythm that keeps the loop running.',
  },
  {
    id: 'embed',
    label: 'Embed the loop',
    instruction: 'How AI and automation support each stage so listening is not a one-off project.',
  },
] as const

export const insightPanels = reportSections
export const measurePanels = measureSections
