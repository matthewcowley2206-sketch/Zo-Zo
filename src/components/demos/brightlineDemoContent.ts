import type { DemoAssistantConfig, DemoJourney } from './demoTypes'

export const brightlineAssistant: DemoAssistantConfig = {
  title: 'AI strategy assistant',
  placeholder: 'Ask about focus, risks, or delivery structure.',
  prompts: [
    {
      id: 'focus',
      label: 'What should we focus on first?',
      response:
        'Start with the partnership channel - highest fit score, lowest capital requirement, and validates demand before product investment. Sequence: 30-day partner pilot → 90-day scale decision.',
    },
    {
      id: 'risks',
      label: 'What risks exist?',
      response:
        'Top 3 risks: (1) Channel conflict with direct sales - mitigate with clear partner tier rules, (2) Capacity strain on delivery - phase rollout by region, (3) Unclear value proposition - run 5 client tests before scale.',
    },
    {
      id: 'delivery',
      label: 'How should we structure delivery?',
      response:
        'Recommended: Phase 1 discovery (2 wks) → Phase 2 pilot with 3 partners (6 wks) → Phase 3 scale playbook (4 wks). Assign exec sponsor + dedicated PM; review gates at day 30 and day 90.',
    },
  ],
}

export const brightlineOpportunities = [
  {
    id: 'partnership',
    title: 'Partnership channel expansion',
    description: 'White-label offering via 3 regional partners · low capital',
    impact: 'Highest fit · fastest validation',
  },
  {
    id: 'saas',
    title: 'Adjacent SaaS vertical',
    description: 'Target mid-market SaaS with similar workflow pain',
    impact: 'Medium fit · higher investment',
  },
  {
    id: 'bundle',
    title: 'Product bundling',
    description: 'Bundle existing services into tiered packages',
    impact: 'Quick win · limited upside',
  },
]

export const brightlineJourneys: DemoJourney[] = [
  {
    id: 'idea',
    title: 'New business idea',
    persona: 'Founder',
    scenario: 'I have an idea but need direction.',
    processingMessages: [
      'Analysing your challenge…',
      'Mapping market signals…',
      'Building opportunity canvas…',
    ],
    steps: [
      {
        id: 'challenge',
        target: 'challenge-input',
        hint: 'Enter your business challenge - or use the suggested prompt.',
        recovery: 'Type in the challenge field or tap Use suggested challenge.',
        annotation: {
          id: 'challenge',
          clientAsk:
            'leadership to articulate a fuzzy idea without a blank-page strategy workshop.',
          ourSolution:
            'guided challenge intake with suggested prompts - validated with founders in one session.',
        },
      },
      {
        id: 'canvas',
        target: 'generate-canvas-btn',
        hint: 'Generate the AI opportunity canvas.',
        recovery: 'Tap Generate opportunity canvas after entering your challenge.',
        annotation: {
          id: 'canvas',
          clientAsk: 'structured options - not a wall of AI text.',
          ourSolution:
            'opportunity canvas with fit scores and trade-offs - exec team ranked options live.',
        },
      },
      {
        id: 'prioritise',
        target: 'action-partnership',
        hint: 'Prioritise Partnership channel expansion - highest fit.',
        recovery: 'Select Partnership channel expansion from recommendations.',
      },
      {
        id: 'outcome',
        target: 'outcome-continue',
        hint: 'Review clear next steps and the 30-day action plan.',
        recovery: 'Tap Continue exploring after reviewing the outcome.',
        annotation: {
          id: 'outcome-idea',
          clientAsk: 'confidence about what to do next Monday - not just strategy slides.',
          ourSolution:
            'prioritised opportunity with 30-day actions - board approved pilot budget from this view.',
        },
      },
    ],
    outcome: {
      beforeLabel: 'Before',
      beforeValue: 'Vague expansion idea · no priorities',
      afterLabel: 'After',
      afterValue: 'Partnership channel selected · 30-day plan',
      headline: 'Clear next steps defined.',
      metric: '3 opportunities evaluated in 12 minutes',
    },
  },
  {
    id: 'transformation',
    title: 'Transformation program',
    persona: 'COO',
    scenario: 'We need to improve the business.',
    processingMessages: [
      'Assessing current state…',
      'Modelling future state…',
      'Identifying opportunities…',
    ],
    steps: [
      {
        id: 'current',
        target: 'current-state-review',
        hint: 'Review the current state assessment - bottlenecks and gaps.',
        recovery: 'Scroll through the current state panel and tap Acknowledge assessment.',
        annotation: {
          id: 'current-state',
          clientAsk: 'an honest current state view - not a polished annual report.',
          ourSolution:
            'structured assessment with bottlenecks, metrics, and stakeholder pain - COO validated in workshop.',
        },
      },
      {
        id: 'future',
        target: 'future-state-btn',
        hint: 'Generate the future state plan with AI.',
        recovery: 'Tap Generate future state plan on the assessment screen.',
      },
      {
        id: 'roadmap',
        target: 'action-transformation-roadmap',
        hint: 'Approve the transformation roadmap - phased delivery.',
        recovery: 'Select Approve transformation roadmap from recommendations.',
        annotation: {
          id: 'roadmap',
          clientAsk: 'a roadmap they could fund - not a 200-page program plan.',
          ourSolution:
            '30/90-day phased roadmap with owners - program board signed off in one sitting.',
        },
      },
      {
        id: 'outcome',
        target: 'outcome-continue',
        hint: 'Review the transformation roadmap outcome.',
        recovery: 'Tap Continue exploring after reviewing the roadmap.',
      },
    ],
    outcome: {
      beforeLabel: 'Before',
      beforeValue: '12 improvement ideas · no sequence',
      afterLabel: 'After',
      afterValue: 'Phased roadmap · 3 workstreams owned',
      headline: 'Transformation roadmap defined.',
      metric: 'Est. 18% efficiency gain over 12 months',
    },
  },
  {
    id: 'workshop',
    title: 'Leadership workshop',
    persona: 'Leadership team',
    scenario: 'We need alignment.',
    processingMessages: [
      'Facilitating strategic discussion…',
      'Synthesising perspectives…',
      'Building priority matrix…',
    ],
    steps: [
      {
        id: 'challenge',
        target: 'workshop-challenge',
        hint: 'Review the strategic challenge for the workshop.',
        recovery: 'Read the workshop challenge card and tap Confirm challenge.',
        annotation: {
          id: 'workshop-challenge',
          clientAsk: 'a facilitated session that produces decisions - not sticky notes on a wall.',
          ourSolution:
            'AI-assisted facilitation with structured challenge framing - leadership aligned in 90 minutes.',
        },
      },
      {
        id: 'facilitate',
        target: 'run-facilitation-btn',
        hint: 'Run AI facilitation on the strategic challenge.',
        recovery: 'Tap Run AI facilitation after confirming the challenge.',
      },
      {
        id: 'align',
        target: 'action-align-priority',
        hint: 'Align on the top priority - customer experience program.',
        recovery: 'Select Align on customer experience program.',
        annotation: {
          id: 'align',
          clientAsk: 'shared direction the whole exec team could repeat consistently.',
          ourSolution:
            'priority matrix with impact/effort scoring - team voted on top 3 in the prototype session.',
        },
      },
      {
        id: 'outcome',
        target: 'outcome-continue',
        hint: 'Review shared direction and priorities.',
        recovery: 'Tap Continue exploring after reviewing alignment outcome.',
        annotation: {
          id: 'outcome-workshop',
          clientAsk: 'proof that workshops can end with owned priorities.',
          ourSolution:
            'shared priorities with exec sponsors - replaced a follow-up alignment meeting entirely.',
        },
      },
    ],
    outcome: {
      beforeLabel: 'Before',
      beforeValue: '5 competing priorities · no owners',
      afterLabel: 'After',
      afterValue: '3 aligned priorities · sponsors assigned',
      headline: 'Shared direction and priorities.',
      metric: 'Workshop decision time · 2 days → 90 minutes',
    },
  },
]

export type RoadmapScenario = 'growth' | 'conservative' | 'transformation'

export const brightlineRoadmaps: Record<
  RoadmapScenario,
  { label: string; day30: string[]; day90: string[]; strategic: string[] }
> = {
  growth: {
    label: 'Growth scenario',
    day30: ['Launch partner pilot with 3 firms', 'Validate pricing with 5 target clients'],
    day90: ['Scale partner channel to 2 regions', 'Hire dedicated partner manager'],
    strategic: ['Expand to adjacent vertical', 'Build partner certification program'],
  },
  conservative: {
    label: 'Conservative scenario',
    day30: ['Run 8 client discovery interviews', 'Document current delivery bottlenecks'],
    day90: ['Pilot one internal automation', 'Measure baseline efficiency metrics'],
    strategic: ['Fund transformation from savings', 'Defer market expansion 6 months'],
  },
  transformation: {
    label: 'Transformation scenario',
    day30: ['Stand up program office', 'Assign workstream leads'],
    day90: ['Deliver phase 1 efficiency gains', 'Launch customer experience program'],
    strategic: ['Integrate systems across workstreams', 'Embed continuous improvement cadence'],
  },
}
