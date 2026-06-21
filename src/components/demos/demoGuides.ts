import type { DemoAssistantConfig, DemoGuideConfig, DemoJourney } from './demoTypes'

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
        target: 'symptom-slow-bitter',
        hint: 'Select the symptom that matches — slow extraction and bitter taste.',
        recovery: 'Tap the symptom card describing slow extraction and bitter taste.',
        annotation: {
          id: 'symptom-pick',
          clientAsk:
            'staff to diagnose common faults without calling a technician every time.',
          ourSolution:
            'guided symptom capture that mirrors how baristas actually describe problems on shift.',
        },
      },
      {
        id: 'diagnose',
        target: 'run-diagnosis-btn',
        hint: 'Run AI diagnosis on the symptoms you selected.',
        recovery: 'Tap Run AI diagnosis below the selected symptoms.',
        annotation: {
          id: 'ai-diagnose',
          clientAsk: 'likely causes before anyone opens the machine or calls service.',
          ourSolution:
            'simulated AI analysis using machine model, usage, and symptom pattern — tested with store managers first.',
        },
      },
      {
        id: 'action',
        target: 'action-descale',
        hint: 'Choose the recommended descale action.',
        recovery: 'After diagnosis, tap Run descale cycle (recommended).',
        annotation: {
          id: 'action-pick',
          clientAsk: 'clear next steps staff can follow without a manual.',
          ourSolution:
            'ranked actions with estimated time and cost — avoids unnecessary callouts.',
        },
      },
      {
        id: 'outcome',
        target: 'outcome-continue',
        hint: 'Review the outcome — likely cause identified and callout avoided.',
        recovery: 'Scroll to the outcome summary, then tap Continue exploring.',
        annotation: {
          id: 'outcome-breakdown',
          clientAsk: 'proof that self-service troubleshooting saves money and downtime.',
          ourSolution:
            'before/after outcome with estimated technician cost avoided — leadership saw ROI in one session.',
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
            'interactive diagram with plain-language guidance per component — validated in one store pilot.',
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
            'component-level cleaning steps and common faults — reduces training time and inconsistency.',
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
            'guided exploration with progress tracking — store managers requested this before rollout.',
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
        hint: 'Review the maintenance dashboard — last service and upcoming tasks.',
        recovery: 'Open the Maintenance tab and review status cards.',
        annotation: {
          id: 'maint-dash',
          clientAsk: 'one view of service status across six stores without spreadsheets.',
          ourSolution:
            'maintenance dashboard with last service, cleaning status, and filter life — ops validated layout first.',
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
            'AI recommendations based on usage patterns and service intervals — tested with ops lead.',
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
            'cumulative callouts avoided tracker — leadership approved pilot budget from this view alone.',
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
        'Likely scale buildup in the boiler or group head. Run a descale cycle first — 85% of similar cases resolve without a technician. Estimated time: 25 minutes.',
    },
    {
      id: 'no-steam',
      label: 'No steam pressure',
      response:
        'Check water level and steam wand blockage. If pressure gauge reads below 1 bar after refill, schedule steam system inspection — do not force the pump.',
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
        'Responsiveness and value perception are the top concerns — 38% of negative sentiment links to turnaround time on routine matters. Communication quality is secondary but rising in corporate clients.',
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
      'Clients want faster updates on routine matters. Partners agree — but current process relies on manual check-ins.',
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
        id: 'upload',
        target: 'upload-transcript',
        hint: 'Select interview transcripts to upload for analysis.',
        recovery: 'Tap Interview transcript under Step 2 · Upload sources.',
        annotation: {
          id: 'upload-transcript',
          clientAsk:
            'to analyse interview transcripts without a team of analysts reading every line.',
          ourSolution:
            'simulated upload flow with matter tagging — leadership validated intake before AI integration.',
        },
      },
      {
        id: 'analyse',
        target: 'run-analysis-btn',
        hint: 'Run AI analysis on the uploaded transcripts.',
        recovery: 'After selecting a source, tap Analyse transcripts.',
        annotation: {
          id: 'run-analysis',
          clientAsk: 'themes and sentiment surfaced in minutes, not weeks.',
          ourSolution:
            'processing sequence that mirrors production NLP pipeline — partners saw realistic output timing.',
        },
      },
      {
        id: 'themes',
        target: 'theme-responsiveness',
        hint: 'Explore the Responsiveness theme — highest risk signal.',
        recovery: 'Open Insight explorer and tap Responsiveness.',
        annotation: {
          id: 'themes',
          clientAsk: 'leadership to see where client sentiment is fragile, not just average scores.',
          ourSolution:
            'category explorer with scores, sentiment, and risk flags — replaced a 60-page interview summary.',
        },
      },
      {
        id: 'outcome',
        target: 'outcome-continue',
        hint: 'Review the outcome — key client priorities identified.',
        recovery: 'Scroll to the business outcome, then tap Continue exploring.',
        annotation: {
          id: 'outcome-listening',
          clientAsk: 'evidence that client listening drives decisions, not shelf-ware reports.',
          ourSolution:
            'before/after outcome with prioritised themes — managing partner approved pilot scope from this view.',
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
          clientAsk: 'a single executive view — not separate decks per practice group.',
          ourSolution:
            'unified findings dashboard with sentiment trend and top themes — partners aligned in one session.',
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
        hint: 'Prioritise the responsiveness initiative — highest impact.',
        recovery: 'Select Launch proactive matter updates from recommendations.',
        annotation: {
          id: 'prioritise',
          clientAsk: 'clear priorities leadership can act on this quarter.',
          ourSolution:
            'ranked recommendations with estimated NPS impact — committee voted on top two in the workshop.',
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
            'action plan with owners and 90-day milestones — scoped CRM integration for phase two.',
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
            'group-level sentiment with interview count and NPS — corporate lead validated metrics in workshop.',
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
            'group-specific recommendations wired to known client segments — practice lead owned the top action.',
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
            'before/after with group NPS trajectory — approved for Q3 client experience program.',
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

export const demoGuides: Record<string, DemoGuideConfig> = {
  'horizon-airways': {
    id: 'horizon-airways',
    title: 'Loyalty & travel day',
    intro:
      'This is a working prototype inside the phone. Follow the glowing tap - brief notes appear as you go.',
    completeMessage:
      'You have seen the core journey. Keep exploring - Book, Miles, and lounge pass are all live.',
    scopeNote:
      'Simplified from a global loyalty replatform. Production adds partner airlines, fare rules, fraud, and dozens of integrations - this was enough for leadership to commit.',
    steps: [
      {
        id: 'trip',
        target: 'trip-card',
        hint: "Tap today's flight under Upcoming trips.",
        recovery: 'Use the Home tab - look for Tier status, Miles balance, then Upcoming trips.',
        annotation: {
          id: 'home-loyalty',
          clientAsk:
            'a single app where frequent flyers see tier status, miles, and upcoming trips without jumping between systems.',
          ourSolution:
            'a loyalty-first home screen - tier, balance, and next flight on one view, ready for executive walkthroughs.',
        },
      },
      {
        id: 'upgrade',
        target: 'upgrade-btn',
        hint: 'Try upgrading with miles before check-in.',
        recovery: 'Open your trip first, then tap Upgrade with miles.',
        annotation: {
          id: 'upgrade',
          clientAsk: 'to test miles redemption before wiring to the loyalty engine.',
          ourSolution:
            'full upgrade path with balance preview - rules debated in workshops, not in Jira.',
        },
      },
      {
        id: 'checkin',
        target: 'checkin-btn',
        hint: 'Complete check-in - seats and Gold benefits together.',
        recovery: 'From your trip, tap Check in, pick a seat, then complete check-in.',
        annotation: {
          id: 'checkin',
          clientAsk: 'check-in, seats, and loyalty benefits in one journey - not three apps.',
          ourSolution: 'unified check-in respecting tier, upgrade, and lounge eligibility.',
        },
      },
      {
        id: 'boarding',
        target: 'boarding-btn',
        hint: 'Open your boarding pass.',
        recovery: 'After check-in, tap View boarding pass on the trip screen.',
        annotation: {
          id: 'boarding',
          clientAsk: 'boarding pass with tier, lounge, and miles earned on one card.',
          ourSolution: 'single boarding pass pulling tier benefits and trip details together.',
        },
      },
      {
        id: 'lounge',
        target: 'lounge-btn',
        hint: 'Open your Gold lounge pass.',
        recovery: 'From the trip screen, tap Open lounge pass.',
        annotation: {
          id: 'lounge',
          clientAsk: 'digital lounge passes for Gold - no PDF, no separate app.',
          ourSolution: 'pass generated from tier + trip in the same record.',
        },
      },
    ],
  },
  'phoenix-coffee': {
    id: 'phoenix-coffee',
    title: 'AI troubleshooting & ops support',
    intro:
      'Choose a scenario inside the phone, then follow the guided workflow. Each step shows what the client asked for.',
    completeMessage:
      'Journey complete. Try another scenario, ask the AI assistant, or explore the machine diagram freely.',
    scopeNote:
      'Built to validate AI-assisted troubleshooting and preventative maintenance across six stores. Production connects to IoT sensors, service logs, and technician dispatch — this prototype settled the experience first.',
    device: 'phone',
    steps: [],
    journeys: phoenixJourneys,
    assistant: phoenixAssistant,
  },
  'northgate-legal': {
    id: 'northgate-legal',
    title: 'Client listening & insight',
    device: 'desktop',
    intro:
      'Choose a scenario inside the prototype, then follow the guided workflow. Each step shows what the firm asked for.',
    completeMessage:
      'Journey complete. Try another scenario, ask the AI assistant, or explore insight categories freely.',
    scopeNote:
      'Built to validate client listening and insight workflows for a top-tier firm. Production connects to CRM, interview recordings, and partner dashboards — this prototype settled the experience before integration.',
    steps: [],
    journeys: northgateJourneys,
    assistant: northgateAssistant,
  },
  'brightline-studio': {
    id: 'brightline-studio',
    title: 'Enquiry to quote',
    device: 'desktop',
    intro:
      'This is a desk workflow prototype - not a chatbot. Follow the steps to turn a vague brief into a sendable quote.',
    completeMessage:
      'Walkthrough complete. Try toggling phases, switching tiers, or editing the client email before sending.',
    scopeNote:
      'Simulated AI - production would connect to your templates, rate card, CRM, and approval rules. This prototype was enough for leadership to agree what to build first.',
    steps: [
      {
        id: 'enquiry',
        target: 'enquiry-card',
        hint: 'Read the enquiry - vague brief, flexible budget, tight deadline.',
        recovery: 'Start on the New enquiry screen and review the message from Marcus.',
        annotation: {
          id: 'enquiry',
          clientAsk:
            'to stop losing half a day every time a hot lead lands in the inbox with a vague brief.',
          ourSolution:
            'a structured intake view that captures the messy enquiry before anyone opens a spreadsheet.',
        },
      },
      {
        id: 'generate',
        target: 'generate-btn',
        hint: 'Tap Turn into scope - watch structured output appear in seconds.',
        recovery: 'From the enquiry screen, tap Turn into scope.',
        annotation: {
          id: 'generate',
          clientAsk: 'scope drafted from enquiry without starting from a blank doc.',
          ourSolution:
            'one action that produces editable blocks - phases, assumptions, and questions - not a wall of AI text.',
        },
      },
      {
        id: 'edit',
        target: 'scope-toggle',
        hint: 'Toggle a phase off to show the quote is editable, not a black box.',
        recovery: 'On the scope screen, tap Brand refresh to toggle it off.',
        annotation: {
          id: 'edit',
          clientAsk: 'the team to adjust scope before pricing - not after the quote is sent.',
          ourSolution:
            'phase toggles wired to the quote - leadership saw pricing shift in the same session.',
        },
      },
      {
        id: 'tier',
        target: 'tier-recommended',
        hint: 'Pick Recommended - same scope, different packaging.',
        recovery: 'Tap Continue to quote options, then select Recommended.',
        annotation: {
          id: 'tier',
          clientAsk: 'three clear options instead of one take-it-or-leave-it number.',
          ourSolution:
            'Essential / Recommended / Full tiers - mirrors how they actually sell, tested in one workshop.',
        },
      },
      {
        id: 'email',
        target: 'view-email-btn',
        hint: 'View email - see the quote as Marcus would, ready to personalise.',
        recovery: 'From the quote preview, tap View email.',
        annotation: {
          id: 'email',
          clientAsk: 'to tweak the message before it goes out - not send a generic template.',
          ourSolution:
            'pre-filled client email with quote summary attached - edit subject and body before sending.',
        },
      },
      {
        id: 'send',
        target: 'send-preview-btn',
        hint: 'Personalise if you like, then send the preview.',
        recovery: 'Open View email from the quote, then tap Send preview.',
        annotation: {
          id: 'send',
          clientAsk: 'a quote they could stand behind before integrating CRM, Xero, or e-sign.',
          ourSolution:
            'sendable preview with line items and timeline - scoped CRM integration for phase two.',
        },
      },
    ],
  },
}
