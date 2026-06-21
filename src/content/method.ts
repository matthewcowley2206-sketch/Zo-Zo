export const positioning = {
  headline: 'Helping leaders move from uncertainty to confidence.',
  subhead:
    'We help you understand customers and stakeholders, shape strategy, design practical solutions, test ideas before you invest — and decide what to do next.',
  subheadMobile:
    'From understanding the real problem to testing practical solutions before you invest — so you can decide with confidence.',
  secondaryTagline: 'Turning Complexity into Clarity',
} as const

export const methodSteps = [
  {
    number: '01',
    id: 'understand',
    title: 'Understand',
    href: '/services/client-listening',
    description:
      'Clarify what is really happening — define the right problem, understand the customer, stakeholder or business challenge.',
    uncertainty:
      'Reduces uncertainty about what is really going on.',
  },
  {
    number: '02',
    id: 'structure',
    title: 'Structure',
    href: '/services/strategy',
    description:
      'Create clarity around the opportunity, map workflows, design practical approaches and establish priorities your team can follow.',
    uncertainty:
      'Reduces uncertainty about priorities and direction.',
  },
  {
    number: '03',
    id: 'prototype',
    title: 'Prototype',
    href: '/services/prototype-development',
    description:
      'Test ideas before major investment - concepts, workflows, AI-enabled tools, dashboards, customer experiences, or internal solutions.',
    uncertainty:
      'Reduces uncertainty before major investment decisions.',
  },
  {
    number: '04',
    id: 'decide',
    title: 'Decide',
    href: '/services/growth-gtm',
    description:
      'Use evidence, feedback, and insight to make confident decisions about next steps.',
    uncertainty:
      'Builds confidence about what to do next.',
  },
] as const

export type ServiceThemeModule = {
  label: string
  href: string
  supportingLine?: string
}

export type ServiceTheme = {
  id: string
  title: string
  summary: string
  problem: string
  outcome: string
  howWeHelp: string
  uncertaintyLabel: string
  primaryHref: string
  modules: ServiceThemeModule[]
  featured?: boolean
}

export const serviceThemes: ServiceTheme[] = [
  {
    id: 'opportunity-insight',
    title: 'Opportunity & Insight',
    summary:
      'Structured discovery and client listening so you stop guessing and start deciding from evidence.',
    problem:
      'Leaders often struggle to know whether they are solving the right problem - or what customers and stakeholders really think.',
    outcome: 'Confidence that decisions are based on evidence rather than assumptions.',
    howWeHelp: 'Client Listening, discovery and opportunity identification.',
    uncertaintyLabel: 'Less uncertainty about what customers and stakeholders really think.',
    primaryHref: '/services/client-listening',
    featured: true,
    modules: [
      { label: 'Client Listening', href: '/services/client-listening' },
      { label: 'Discovery & opportunity identification', href: '/services/client-listening' },
    ],
  },
  {
    id: 'strategy-structure',
    title: 'Strategy & Structure',
    summary:
      'Strategic direction, prioritisation, communication clarity, and operating model design — so your team can follow.',
    problem:
      'Too many priorities and no shared direction - teams cannot see what to do next or how work should flow.',
    outcome:
      'Confidence about where to focus, how to communicate change, and how the business actually operates.',
    howWeHelp: 'Strategy & direction, communication & clarity, operations & simplification.',
    uncertaintyLabel: 'Less uncertainty about priorities, direction, and how work flows.',
    primaryHref: '/services/strategy',
    modules: [
      { label: 'Strategy & direction', href: '/services/strategy' },
      { label: 'Communication & clarity', href: '/services/communication' },
      { label: 'Operations & simplification', href: '/services/operations' },
    ],
  },
  {
    id: 'prototype-ai',
    title: 'Prototype & AI Advisory',
    summary:
      'Working prototypes that help leaders make better decisions - plus practical data and AI guidance when insight needs tooling, not hype.',
    problem:
      'Major decisions feel risky when you cannot test an idea - or understand whether AI can help - before investing heavily.',
    outcome: 'Confidence from evidence before you commit significant investment.',
    howWeHelp: 'Test Before You Invest prototypes, Data, AI & Insights advisory.',
    uncertaintyLabel: 'Less uncertainty before you commit significant investment.',
    primaryHref: '/services/prototype-development',
    modules: [
      {
        label: 'Test Before You Invest',
        supportingLine: 'Working prototypes that help leaders make better decisions.',
        href: '/services/prototype-development',
      },
      { label: 'Data, AI & Insights', href: '/services/data-ai' },
    ],
  },
  {
    id: 'growth-gtm',
    title: 'Growth & Go-to-Market',
    summary:
      'Positioning, go-to-market strategy, sales enablement, and commercial activation - one coherent path to launch and grow.',
    problem:
      'Growth and launch feel like guesswork - messaging, audience, and commercial plans do not align.',
    outcome: 'Confidence in a go-to-market path you can actually run.',
    howWeHelp: 'Positioning & messaging, launch & commercial activation.',
    uncertaintyLabel: 'Less uncertainty about how to launch, message, and grow.',
    primaryHref: '/services/growth-gtm',
    modules: [
      { label: 'Positioning & messaging', href: '/services/growth-gtm' },
      { label: 'Launch & commercial activation', href: '/services/growth-gtm' },
    ],
  },
]

export const tensionPoints = [
  {
    title: 'Unclear what customers really think',
    text: 'You are making calls without enough honest insight - and the gap between assumption and reality is costly.',
    outcome: 'Confidence about what matters to clients and stakeholders.',
  },
  {
    title: 'Too many priorities, no shared direction',
    text: 'Good ideas stay in your head because there is no simple plan the team can align around.',
    outcome: 'Confidence about where to focus and what can wait.',
  },
  {
    title: 'Hard to validate before investing',
    text: 'Major decisions feel risky when you cannot see or test the idea before committing serious spend.',
    outcome: 'Confidence from evidence - not guesswork.',
  },
  {
    title: 'Growth and launch feel like guesswork',
    text: 'Messaging, audience, and launch plans are scattered - and execution keeps slipping.',
    outcome: 'Confidence in a go-to-market path you can actually run.',
  },
] as const

export const prototypeProofLine =
  'Working prototypes can help reduce uncertainty, validate assumptions and support better decisions before significant investment.'
