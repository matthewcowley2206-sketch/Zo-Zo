import type { DemoAssistantConfig, DemoGuideConfig, DemoJourney } from './demoTypes'
import { brightlineAssistant, brightlineJourneys } from './brightlineDemoContent'

export type {
  DemoAssistantConfig,
  DemoAssistantPrompt,
  DemoGuideConfig,
  DemoJourney,
  DemoOutcome,
  GuideStep,
} from './demoTypes'

export const phoenixJourneys: DemoJourney[] = [
  {
    id: 'breakdown',
    title: 'Machine breakdown',
    persona: 'Store manager',
    scenario: 'My coffee machine has stopped working.',
    processingMessages: [
      'Reviewing symptoms…',
      'Cross-checking service history…',
      'Generating diagnosis…',
    ],
    steps: [
      {
        id: 'symptom',
        target: 'run-diagnosis-btn',
        hint: 'Type a symptom or tap an example, then run AI diagnosis.',
        recovery: 'Enter what is happening with the machine and tap Run AI diagnosis.',
        annotation: {
          id: 'symptom-pick',
          clientAsk:
            'staff to diagnose common faults without calling a technician every time.',
          ourSolution:
            'free-text symptom capture with dynamic AI analysis - tested with store managers first.',
        },
      },
      {
        id: 'preview',
        target: 'outcome-preview-continue',
        hint: 'Review the outcome preview and likely causes, then continue.',
        recovery: 'Scroll to the outcome preview and tap View recommended actions.',
        annotation: {
          id: 'outcome-preview',
          clientAsk: 'proof of value before anyone commits to a service call.',
          ourSolution:
            'early outcome preview with confidence score and ranked causes - leadership saw ROI immediately.',
        },
      },
      {
        id: 'action',
        target: 'action-descale',
        hint: 'Choose the recommended action.',
        recovery: 'Tap the top recommended action to see business impact.',
        annotation: {
          id: 'action-pick',
          clientAsk: 'clear next steps staff can follow without a manual.',
          ourSolution:
            'ranked actions with estimated time and cost - avoids unnecessary callouts.',
        },
      },
      {
        id: 'outcome',
        target: 'outcome-continue',
        hint: 'Review business impact and continue exploring.',
        recovery: 'Scroll to the business impact summary, then tap Continue exploring.',
        annotation: {
          id: 'outcome-breakdown',
          clientAsk: 'proof that self-service troubleshooting saves money and downtime.',
          ourSolution:
            'business impact panel with technician savings and compliance metrics.',
        },
      },
    ],
    outcome: {
      beforeLabel: 'Before',
      beforeValue: 'Unknown fault · technician booked',
      afterLabel: 'After',
      afterValue: 'Scale buildup identified · descale scheduled',
      headline: 'Likely cause identified without a service call.',
      metric: 'Est. $180 callout avoided',
    },
  },
  {
    id: 'learn',
    title: 'Learn my machine',
    persona: 'New barista',
    scenario: 'I want to understand my machine better.',
    steps: [
      {
        id: 'boiler',
        target: 'part-boiler',
        hint: 'Tap the boiler on the machine diagram.',
        recovery: 'Open the machine explorer and tap the Boiler component.',
        annotation: {
          id: 'part-boiler',
          clientAsk: 'new staff to learn components without shadowing a senior barista for weeks.',
          ourSolution:
            'interactive diagram with plain-language guidance per component - validated in one store pilot.',
        },
      },
      {
        id: 'guidance',
        target: 'part-guidance-next',
        hint: 'Continue to explore another component.',
        recovery: 'Tap Next component after reading the boiler guidance.',
      },
      {
        id: 'grouphead',
        target: 'part-grouphead',
        hint: 'Tap the group head to see cleaning guidance.',
        recovery: 'Tap Group head on the diagram.',
        annotation: {
          id: 'part-grouphead',
          clientAsk: 'maintenance tasks tied to the part that actually needs attention.',
          ourSolution:
            'component-level cleaning steps and common faults - reduces training time and inconsistency.',
        },
      },
      {
        id: 'done',
        target: 'explorer-done',
        hint: 'Finish the explorer tour.',
        recovery: 'Tap Finish tour when you have reviewed two components.',
        annotation: {
          id: 'explorer-done',
          clientAsk: 'confidence that staff understand the machine before peak service.',
          ourSolution:
            'guided exploration with progress tracking - store managers requested this before rollout.',
        },
      },
    ],
    outcome: {
      beforeLabel: 'Before',
      beforeValue: 'Relies on senior staff for every question',
      afterLabel: 'After',
      afterValue: 'Understands boiler, group head, and cleaning cycles',
      headline: 'Greater confidence operating the machine.',
      metric: 'Training time reduced ~40%',
    },
  },
  {
    id: 'maintenance',
    title: 'Preventative maintenance',
    persona: 'Operations lead',
    scenario: 'I want to avoid future downtime.',
    processingMessages: [
      'Reviewing service history…',
      'Checking filter and cleaning cycles…',
      'Generating recommendations…',
    ],
    steps: [
      {
        id: 'dashboard',
        target: 'maint-dashboard',
        hint: 'Review the maintenance dashboard - last service and upcoming tasks.',
        recovery: 'Open the Maintenance tab and review status cards.',
        annotation: {
          id: 'maint-dash',
          clientAsk: 'one view of service status across six stores without spreadsheets.',
          ourSolution:
            'maintenance dashboard with last service, cleaning status, and filter life - ops validated layout first.',
        },
      },
      {
        id: 'ai-rec',
        target: 'maint-ai-rec',
        hint: 'Review the AI maintenance recommendation.',
        recovery: 'Scroll to AI recommendation and tap View plan.',
        annotation: {
          id: 'maint-ai',
          clientAsk: 'proactive alerts before machines fail on Saturday morning rush.',
          ourSolution:
            'AI recommendations based on usage patterns and service intervals - tested with ops lead.',
        },
      },
      {
        id: 'schedule',
        target: 'maint-schedule',
        hint: 'Schedule the recommended descale.',
        recovery: 'Tap Schedule descale on the maintenance plan.',
      },
      {
        id: 'outcome',
        target: 'outcome-continue',
        hint: 'See the risk reduction outcome and cumulative savings.',
        recovery: 'Review the outcome panel, then tap Continue exploring.',
        annotation: {
          id: 'outcome-maint',
          clientAsk: 'proof that preventative maintenance pays for itself.',
          ourSolution:
            'cumulative callouts avoided tracker - leadership approved pilot budget from this view alone.',
        },
      },
    ],
    outcome: {
      beforeLabel: 'Before',
      beforeValue: 'Reactive repairs · 3 callouts this quarter',
      afterLabel: 'After',
      afterValue: 'Descale scheduled · risk score improved',
      headline: 'Reduced risk of future failures.',
      metric: 'Est. $2,450 callouts avoided YTD',
    },
  },
]

export const phoenixAssistant: DemoAssistantConfig = {
  title: 'AI troubleshooting assistant',
  placeholder: 'Ask about symptoms, maintenance, or machine parts.',
  prompts: [
    {
      id: 'slow-bitter',
      label: 'Slow + bitter extraction',
      response:
        'Likely scale buildup in the boiler or group head. Run a descale cycle first - 85% of similar cases resolve without a technician. Estimated time: 25 minutes.',
    },
    {
      id: 'no-steam',
      label: 'No steam pressure',
      response:
        'Check water level and steam wand blockage. If pressure gauge reads below 1 bar after refill, schedule steam system inspection - do not force the pump.',
    },
    {
      id: 'next-service',
      label: 'When is next service due?',
      response:
        'Surry Hills machine: descale due in 4 days based on shot count. Filter replacement due in 12 days. Scheduling now avoids weekend downtime risk.',
    },
  ],
}

export const northgateAssistant: DemoAssistantConfig = {
  title: 'AI insight assistant',
  placeholder: 'Ask about client priorities, leadership focus, or impact.',
  prompts: [
    {
      id: 'concerns',
      label: 'What concerns clients most?',
      response:
        'Responsiveness and value perception are the top concerns - 38% of negative sentiment links to turnaround time on routine matters. Communication quality is secondary but rising in corporate clients.',
    },
    {
      id: 'prioritise',
      label: 'What should leadership prioritise?',
      response:
        'Priority 1: Matter status visibility and proactive updates. Priority 2: Value narrative in corporate M&A. Estimated NPS uplift +12 if both addressed in Q3.',
    },
    {
      id: 'impact',
      label: 'Greatest impact actions?',
      response:
        'Automated status updates for in-flight matters (+8 NPS), partner-led value reviews for top 20 clients (+6 NPS), and a single client feedback loop closing within 10 days (+5 NPS).',
    },
  ],
}

export const northgateInsightCategories = [
  {
    id: 'responsiveness',
    label: 'Responsiveness',
    score: 62,
    sentiment: 'mixed' as const,
    summary:
      'Clients want faster updates on routine matters. Partners agree - but current process relies on manual check-ins.',
    mentions: 24,
    risk: 'Turnaround time cited in 38% of mixed feedback',
  },
  {
    id: 'communication',
    label: 'Communication',
    score: 71,
    sentiment: 'positive' as const,
    summary:
      'Clear, jargon-free updates praised in litigation and property groups. Corporate clients want more proactive outreach.',
    mentions: 19,
  },
  {
    id: 'value',
    label: 'Value',
    score: 58,
    sentiment: 'mixed' as const,
    summary:
      'Corporate clients question fee transparency on multi-phase matters. Value narrative needs strengthening at partner level.',
    mentions: 16,
    risk: 'Fee clarity flagged by 4 of 6 corporate interviewees',
  },
  {
    id: 'strategic',
    label: 'Strategic advice',
    score: 74,
    sentiment: 'positive' as const,
    summary:
      'Strong trust in partner judgment on complex matters. Clients want earlier strategic input, not just reactive advice.',
    mentions: 14,
  },
]

export const northgateJourneys: DemoJourney[] = [
  {
    id: 'listening',
    title: 'Client listening review',
    persona: 'Client insights lead',
    scenario: "I've completed client interviews.",
    processingMessages: [
      'Analysing feedback…',
      'Generating themes…',
      'Identifying risks…',
      'Preparing recommendations…',
    ],
    steps: [
      {
        id: 'paste',
        target: 'run-analysis-btn',
        hint: 'Paste feedback or try a sample, then analyse.',
        recovery: 'Add feedback text or tap a sample scenario, then tap Analyse feedback.',
        annotation: {
          id: 'paste-feedback',
          clientAsk:
            'to analyse client feedback without a team of analysts reading every line.',
          ourSolution:
            'paste-and-analyse flow with dynamic theme extraction - leadership validated intake before AI integration.',
        },
      },
      {
        id: 'insight',
        target: 'top-insight-continue',
        hint: 'Review the analysis summary, then view executive insight.',
        recovery: 'Tap View executive insight to see the transformation from raw feedback.',
        annotation: {
          id: 'top-insight',
          clientAsk: 'evidence of value within minutes, not weeks of analysis.',
          ourSolution:
            'early outcome preview with transparency on how insights were generated.',
        },
      },
      {
        id: 'brief',
        target: 'action-responsiveness',
        hint: 'Review the transformation from raw feedback to executive insight, then choose an action.',
        recovery: 'Scroll to the priority matrix and select a recommended action.',
        annotation: {
          id: 'exec-brief',
          clientAsk: 'a brief the managing partner can act on immediately.',
          ourSolution:
            'raw-to-executive transformation with leadership priorities and a priority matrix.',
        },
      },
      {
        id: 'outcome',
        target: 'outcome-continue',
        hint: 'Review the business outcome and continue exploring.',
        recovery: 'Scroll to the business outcome, then tap Continue exploring.',
        annotation: {
          id: 'outcome-listening',
          clientAsk: 'evidence that client listening drives decisions, not shelf-ware reports.',
          ourSolution:
            'before/after outcome with prioritised themes - managing partner approved pilot scope from this view.',
        },
      },
    ],
    outcome: {
      beforeLabel: 'Before',
      beforeValue: '42 interview pages · no shared themes',
      afterLabel: 'After',
      afterValue: '4 priority themes · 2 risk flags raised',
      headline: 'Key client priorities identified.',
      metric: 'Analysis time · 3 weeks → 20 minutes',
    },
  },
  {
    id: 'leadership',
    title: 'Leadership brief',
    persona: 'Managing partner',
    scenario: 'I need an executive summary.',
    processingMessages: [
      'Synthesising findings…',
      'Drafting executive summary…',
      'Ranking priorities…',
    ],
    steps: [
      {
        id: 'findings',
        target: 'findings-summary',
        hint: 'Review the aggregated findings from client listening.',
        recovery: 'Open the Findings panel on the dashboard.',
        annotation: {
          id: 'findings',
          clientAsk: 'a single executive view - not separate decks per practice group.',
          ourSolution:
            'unified findings dashboard with sentiment trend and top themes - partners aligned in one session.',
        },
      },
      {
        id: 'brief',
        target: 'generate-brief-btn',
        hint: 'Generate the leadership summary with AI.',
        recovery: 'Tap Generate leadership brief on the findings panel.',
      },
      {
        id: 'prioritise',
        target: 'action-responsiveness',
        hint: 'Prioritise the responsiveness initiative - highest impact.',
        recovery: 'Select Launch proactive matter updates from recommendations.',
        annotation: {
          id: 'prioritise',
          clientAsk: 'clear priorities leadership can act on this quarter.',
          ourSolution:
            'ranked recommendations with estimated NPS impact - committee voted on top two in the workshop.',
        },
      },
      {
        id: 'outcome',
        target: 'outcome-continue',
        hint: 'Review the executive action plan outcome.',
        recovery: 'Tap Continue exploring after reviewing the outcome.',
        annotation: {
          id: 'outcome-leadership',
          clientAsk: 'a brief they could take to the partnership meeting, not another slide deck.',
          ourSolution:
            'action plan with owners and 90-day milestones - scoped CRM integration for phase two.',
        },
      },
    ],
    outcome: {
      beforeLabel: 'Before',
      beforeValue: 'Fragmented feedback · no shared plan',
      afterLabel: 'After',
      afterValue: '3 priority actions · owners assigned',
      headline: 'Clear executive action plan.',
      metric: 'Est. +12 NPS if top 2 actions delivered',
    },
  },
  {
    id: 'practice',
    title: 'Practice group review',
    persona: 'Practice group leader',
    scenario: 'I want to understand one team.',
    steps: [
      {
        id: 'group',
        target: 'group-corporate',
        hint: 'Select Corporate & M&A to review practice group sentiment.',
        recovery: 'Tap Corporate & M&A under Practice groups.',
        annotation: {
          id: 'group-select',
          clientAsk: 'practice leaders to see their group without firm-wide averages hiding problems.',
          ourSolution:
            'group-level sentiment with interview count and NPS - corporate lead validated metrics in workshop.',
        },
      },
      {
        id: 'sentiment',
        target: 'sentiment-review',
        hint: 'Review sentiment breakdown for this practice group.',
        recovery: 'Tap View sentiment breakdown on the group card.',
      },
      {
        id: 'opportunity',
        target: 'action-value-review',
        hint: 'Select the value review action for this group.',
        recovery: 'Choose Partner-led value reviews from recommendations.',
        annotation: {
          id: 'opportunity',
          clientAsk: 'targeted improvements, not firm-wide initiatives that miss local context.',
          ourSolution:
            'group-specific recommendations wired to known client segments - practice lead owned the top action.',
        },
      },
      {
        id: 'outcome',
        target: 'outcome-continue',
        hint: 'See targeted improvement actions for the practice group.',
        recovery: 'Review outcome and tap Continue exploring.',
        annotation: {
          id: 'outcome-practice',
          clientAsk: 'confidence that the right team is fixing the right problems.',
          ourSolution:
            'before/after with group NPS trajectory - approved for Q3 client experience program.',
        },
      },
    ],
    outcome: {
      beforeLabel: 'Before',
      beforeValue: 'Corporate NPS 42 · value concerns rising',
      afterLabel: 'After',
      afterValue: '2 targeted actions · value review scheduled',
      headline: 'Targeted improvement actions defined.',
      metric: 'Projected NPS +8 for Corporate & M&A',
    },
  },
]

export const horizonAssistant: DemoAssistantConfig = {
  title: 'AI commercial assistant',
  placeholder: 'Ask about account risk, focus areas, or opportunities.',
  prompts: [
    {
      id: 'at-risk',
      label: 'Which accounts are most at risk?',
      response:
        'Pacific Resources is highest risk (score 78) - travel spend down 24% QoQ, no executive contact in 90 days. Westfield Mining is secondary (score 64) due to sector contraction.',
    },
    {
      id: 'focus',
      label: 'Where should I focus?',
      response:
        'Mining sector recovery offers the largest Q3 upside (+$2.2M forecast). Pair commercial incentives with executive engagement on Westfield Mining and Pacific Resources.',
    },
    {
      id: 'opportunities',
      label: 'What opportunities should I pursue?',
      response:
        'Top 3: (1) Mining sector incentive program - $1.4M, (2) Pacific retention campaign - $620k protected, (3) Harbour Group contract extension - $480k new revenue.',
    },
  ],
}

export const horizonAccounts = [
  {
    id: 'pacific',
    targetId: 'account-health-pacific',
    name: 'Pacific Resources',
    sector: 'Resources',
    revenue: '$4.8M',
    trend: '↓ 24%',
    risk: 78,
    status: 'At risk',
  },
  {
    id: 'westfield',
    targetId: 'portfolio-account-mining',
    name: 'Westfield Mining',
    sector: 'Mining',
    revenue: '$3.2M',
    trend: '↓ 12%',
    risk: 64,
    status: 'Opportunity',
  },
  {
    id: 'harbour',
    name: 'Harbour Group',
    sector: 'Financial services',
    revenue: '$5.1M',
    trend: '→ Stable',
    risk: 28,
    status: 'Healthy',
  },
  {
    id: 'apex',
    name: 'Apex Legal',
    sector: 'Professional services',
    revenue: '$2.4M',
    trend: '↑ 8%',
    risk: 22,
    status: 'Growth',
  },
]

export const horizonJourneys: DemoJourney[] = [
  {
    id: 'sales',
    title: 'Sales leader focus',
    persona: 'Sales leader',
    scenario: 'I need to know where to focus this quarter.',
    processingMessages: [
      'Reviewing portfolio performance…',
      'Scanning sector trends…',
      'Identifying opportunities…',
    ],
    steps: [
      {
        id: 'portfolio',
        target: 'portfolio-account-mining',
        hint: 'Review the portfolio - tap Westfield Mining to inspect the sector signal.',
        recovery: 'Open the portfolio table and select Westfield Mining.',
        annotation: {
          id: 'portfolio',
          clientAsk:
            'sales leaders to see portfolio performance without exporting five spreadsheets.',
          ourSolution:
            'unified portfolio view with sector trends and risk scores - validated with sales VP in one workshop.',
        },
      },
      {
        id: 'scan',
        target: 'run-opportunity-scan',
        hint: 'Run AI opportunity scan on the portfolio.',
        recovery: 'Tap Run opportunity scan below the portfolio table.',
        annotation: {
          id: 'opportunity-scan',
          clientAsk: 'AI to surface where to focus this quarter - not generic dashboards.',
          ourSolution:
            'simulated scan that ranks sector opportunities with revenue impact - leadership saw forecast shift live.',
        },
      },
      {
        id: 'action',
        target: 'action-focus-mining',
        hint: 'Choose Focus mining sector recovery - highest forecast impact.',
        recovery: 'Select Focus mining sector recovery from recommendations.',
      },
      {
        id: 'outcome',
        target: 'outcome-continue',
        hint: 'Review the updated revenue forecast and identified opportunities.',
        recovery: 'Tap Continue exploring after reviewing the outcome.',
        annotation: {
          id: 'outcome-sales',
          clientAsk: 'proof that the platform drives revenue decisions, not just reporting.',
          ourSolution:
            'forecast update tied to chosen action - sales committee approved pilot from this view.',
        },
      },
    ],
    outcome: {
      beforeLabel: 'Q3 forecast (before)',
      beforeValue: '$42.0M · unclear focus',
      afterLabel: 'Q3 forecast (after)',
      afterValue: '$44.2M · mining recovery plan',
      headline: 'Business opportunities identified.',
      metric: '+$2.2M forecast uplift',
    },
  },
  {
    id: 'account',
    title: 'Account at risk',
    persona: 'Account manager',
    scenario: 'A major account is at risk.',
    processingMessages: [
      'Analysing account health…',
      'Reviewing travel patterns…',
      'Generating account brief…',
    ],
    steps: [
      {
        id: 'alert',
        target: 'alert-at-risk',
        hint: 'Open the revenue risk alert for Pacific Resources.',
        recovery: 'Tap the Pacific Resources alert at the top of the dashboard.',
        annotation: {
          id: 'alert',
          clientAsk: 'account managers to see risk before it appears in the churn report.',
          ourSolution:
            'proactive alerts wired to travel spend and engagement signals - AM validated thresholds first.',
        },
      },
      {
        id: 'health',
        target: 'account-health-pacific',
        hint: 'Review Pacific Resources account health details.',
        recovery: 'Tap Pacific Resources in the account panel.',
      },
      {
        id: 'brief',
        target: 'generate-brief-btn',
        hint: 'Generate an AI account brief.',
        recovery: 'Tap Generate account brief on the account detail view.',
        annotation: {
          id: 'brief',
          clientAsk: 'a brief they can use in a client conversation tomorrow - not a 20-page report.',
          ourSolution:
            'one-page brief with risk drivers and recommended actions - AM used it in a real client call during pilot.',
        },
      },
      {
        id: 'retention',
        target: 'action-retention',
        hint: 'Select Launch retention campaign.',
        recovery: 'Choose Launch retention campaign from recommendations.',
        annotation: {
          id: 'retention',
          clientAsk: 'simulated outcomes before committing commercial budget.',
          ourSolution:
            'decision simulation showing risk reduction and revenue protected - signed off by commercial director.',
        },
      },
      {
        id: 'outcome',
        target: 'outcome-continue',
        hint: 'See how risk reduced after your chosen action.',
        recovery: 'Review outcome and tap Continue exploring.',
      },
    ],
    outcome: {
      beforeLabel: 'Risk score (before)',
      beforeValue: '78 / 100 · revenue at risk $620k',
      afterLabel: 'Risk score (after)',
      afterValue: '52 / 100 · retention campaign active',
      headline: 'Account risk reduced.',
      metric: '$620k revenue protected',
    },
  },
  {
    id: 'executive',
    title: 'Executive priorities',
    persona: 'Executive',
    scenario: 'What should leadership focus on?',
    processingMessages: [
      'Aggregating commercial signals…',
      'Generating executive summary…',
      'Ranking strategic priorities…',
    ],
    steps: [
      {
        id: 'dashboard',
        target: 'exec-dashboard',
        hint: 'Review the executive dashboard - sector performance and alerts.',
        recovery: 'Scroll through the executive dashboard metrics and alerts.',
        annotation: {
          id: 'exec-dash',
          clientAsk:
            'leadership to see commercial health in one sitting - not three separate BI tools.',
          ourSolution:
            'executive dashboard with sector trends, risk exposure, and opportunity pipeline - CEO validated layout.',
        },
      },
      {
        id: 'summary',
        target: 'ai-summary-btn',
        hint: 'Generate the AI executive summary.',
        recovery: 'Tap Generate AI summary on the dashboard.',
      },
      {
        id: 'priority',
        target: 'action-priority-growth',
        hint: 'Prioritise mining sector recovery - top strategic focus.',
        recovery: 'Select Prioritise mining sector recovery from recommendations.',
        annotation: {
          id: 'priority',
          clientAsk: 'clear strategic focus - not a list of 20 initiatives.',
          ourSolution:
            'ranked priorities with revenue impact and owners - exec team aligned on top 3 in one session.',
        },
      },
      {
        id: 'outcome',
        target: 'outcome-continue',
        hint: 'Review the strategic focus outcome.',
        recovery: 'Tap Continue exploring after reviewing priorities.',
        annotation: {
          id: 'outcome-exec',
          clientAsk: 'confidence that commercial leadership is focused on the right bets.',
          ourSolution:
            'before/after from fragmented priorities to 3 owned initiatives - board saw this in pre-read.',
        },
      },
    ],
    outcome: {
      beforeLabel: 'Before',
      beforeValue: '6 disconnected priorities · no owners',
      afterLabel: 'After',
      afterValue: '3 strategic focus areas · owners assigned',
      headline: 'Clear strategic focus for leadership.',
      metric: 'Est. $3.1M Q3 upside identified',
    },
  },
]

export const demoGuides: Record<string, DemoGuideConfig> = {
  'horizon-airways': {
    id: 'horizon-airways',
    title: 'Commercial growth intelligence',
    device: 'desktop',
    intro:
      'Choose a scenario inside the prototype, then follow the guided workflow. Each step shows what the client asked for.',
    completeMessage:
      'Journey complete. Try another scenario, ask the commercial assistant, or explore portfolio and alerts freely.',
    scopeNote:
      'Built to validate commercial intelligence for a regional airline. Production connects to CRM, booking data, and revenue management - this prototype settled the experience before platform investment.',
    steps: [],
    journeys: horizonJourneys,
    assistant: horizonAssistant,
  },
  'phoenix-coffee': {
    id: 'phoenix-coffee',
    title: 'AI troubleshooting & ops support',
    intro:
      'Choose a scenario inside the phone, then follow the guided workflow. Each step shows what the client asked for.',
    completeMessage:
      'Journey complete. Try another scenario, ask the AI assistant, or explore the machine diagram freely.',
    scopeNote:
      'Built to validate AI-assisted troubleshooting and preventative maintenance across six stores. Production connects to IoT sensors, service logs, and technician dispatch - this prototype settled the experience first.',
    device: 'phone',
    steps: [],
    journeys: phoenixJourneys,
    assistant: phoenixAssistant,
  },
  'northgate-legal': {
    id: 'northgate-legal',
    title: 'Client Listening Intelligence',
    device: 'desktop',
    intro:
      'Choose a scenario inside the prototype, then follow the guided workflow. Illustrated using Northgate Legal as a placeholder firm.',
    completeMessage:
      'Journey complete. Try another scenario, ask the AI assistant, or explore insight categories freely.',
    scopeNote:
      'Built to validate client listening and insight workflows for a top-tier firm. Production connects to CRM, interview recordings, and partner dashboards - this prototype settled the experience before integration.',
    steps: [],
    journeys: northgateJourneys,
    assistant: northgateAssistant,
  },
  'brightline-studio': {
    id: 'brightline-studio',
    title: 'Strategic planning workspace',
    device: 'desktop',
    intro:
      'Choose a scenario inside the prototype, then follow the guided workflow. Each step shows what the client asked for.',
    completeMessage:
      'Journey complete. Try another scenario, explore scenario planning, or ask the strategy assistant.',
    scopeNote:
      'Built to validate strategic planning and workshop facilitation for a growing services firm. Production connects to OKR tools, CRM, and program management - this prototype settled the experience first.',
    steps: [],
    journeys: brightlineJourneys,
    assistant: brightlineAssistant,
  },
}
