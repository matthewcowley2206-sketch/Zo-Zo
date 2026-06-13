export type InsightQuestionId = 'risk' | 'margin' | 'time'

export type DataRow = {
  id: string
  client: string
  region: string
  segment: string
  revenue: number
  projects: number
  nps: number
  margin: number
  manualHours: number
}

export type InsightQuestion = {
  id: InsightQuestionId
  label: string
  sub: string
  insightHeadline: string
  insightDetail: string
  highlightRowIds: string[]
  metrics: { label: string; value: string; note?: string }[]
  recommendation: string
  deliverables: string[]
}

export const datasetMeta = {
  title: 'Q3 client & delivery performance',
  subtitle: 'Anonymised sample · 9 clients · 6 regions · 12 tracked metrics',
  source: 'CRM, finance, delivery logs, NPS surveys',
}

export const dataRows: DataRow[] = [
  { id: 'r1', client: 'Harbour Group', region: 'NSW', segment: 'Enterprise', revenue: 420, projects: 6, nps: 38, margin: 22, manualHours: 5 },
  { id: 'r2', client: 'Northline', region: 'VIC', segment: 'Enterprise', revenue: 310, projects: 4, nps: 41, margin: 19, manualHours: 4 },
  { id: 'r3', client: 'Meridian Health', region: 'QLD', segment: 'Mid-market', revenue: 185, projects: 5, nps: 62, margin: 28, manualHours: 3 },
  { id: 'r4', client: 'Atlas Logistics', region: 'NSW', segment: 'Mid-market', revenue: 142, projects: 3, nps: 55, margin: 31, manualHours: 2 },
  { id: 'r5', client: 'Summit Legal', region: 'WA', segment: 'Enterprise', revenue: 265, projects: 4, nps: 48, margin: 24, manualHours: 3 },
  { id: 'r6', client: 'Pacific Retail', region: 'NSW', segment: 'Growth', revenue: 98, projects: 7, nps: 71, margin: 18, manualHours: 6 },
  { id: 'r7', client: 'Coastal Finance', region: 'SA', segment: 'Mid-market', revenue: 156, projects: 2, nps: 58, margin: 33, manualHours: 2 },
  { id: 'r8', client: 'Urban Projects', region: 'VIC', segment: 'Growth', revenue: 74, projects: 8, nps: 44, margin: 12, manualHours: 8 },
  { id: 'r9', client: 'Metro Council', region: 'NSW', segment: 'Public', revenue: 198, projects: 3, nps: 52, margin: 15, manualHours: 7 },
]

export const insightQuestions: InsightQuestion[] = [
  {
    id: 'risk',
    label: 'Where is client risk hiding?',
    sub: 'Revenue concentration vs satisfaction',
    insightHeadline: '42% of revenue sits with clients scoring NPS below 45.',
    insightDetail:
      'Harbour Group and Northline drive nearly half your enterprise revenue - but satisfaction scores signal retention risk. Without a clear view, account teams react late.',
    highlightRowIds: ['r1', 'r2'],
    metrics: [
      { label: 'Revenue at risk', value: '$730k', note: '2 accounts' },
      { label: 'Avg NPS (top 2)', value: '39', note: 'vs 58 portfolio avg' },
      { label: 'Projects affected', value: '10', note: 'active' },
    ],
    recommendation:
      'Run a data clarity session on client health metrics, then build a simple retention dashboard your account leads check weekly.',
    deliverables: [
      'Data clarity session on the numbers that matter',
      'Dashboard optimisation (Power BI, Tableau)',
      'Client health view tied to NPS and revenue',
    ],
  },
  {
    id: 'margin',
    label: 'What is compressing margin?',
    sub: 'Delivery cost vs project type',
    insightHeadline: 'Low-margin growth accounts are running 2× the project load.',
    insightDetail:
      'Urban Projects and Pacific Retail have the thinnest margins but the highest project counts - suggesting delivery rework and scope creep, not pricing alone.',
    highlightRowIds: ['r6', 'r8'],
    metrics: [
      { label: 'Margin gap', value: '16 pts', note: 'vs portfolio avg' },
      { label: 'Projects per client', value: '7.5', note: 'avg on flagged accounts' },
      { label: 'Revenue mix', value: '18%', note: 'of total, low margin' },
    ],
    recommendation:
      'Segment delivery data by project type, identify rework drivers, and redesign the reporting rhythm so leaders spot margin drift early.',
    deliverables: [
      'Data clarity session on margin drivers',
      'Dashboard with delivery health tiles',
      'Workflow redesign for project intake',
    ],
  },
  {
    id: 'time',
    label: 'Where are we losing hours?',
    sub: 'Manual reporting and repeat work',
    insightHeadline: '14+ hours per week spent rebuilding reports nobody trusts.',
    insightDetail:
      'Metro Council, Urban Projects, and Harbour Group account for most manual reporting hours - the same numbers copied across sheets, decks, and CRM every week.',
    highlightRowIds: ['r1', 'r8', 'r9'],
    metrics: [
      { label: 'Manual hours', value: '20h/wk', note: 'top 3 accounts' },
      { label: 'Reports duplicated', value: '6', note: 'CRM, sheets, slides' },
      { label: 'Quick win potential', value: '8h/wk', note: 'est. recoverable' },
    ],
    recommendation:
      'Automate the weekly status digest, add AI summary templates for exec briefs, and map a practical AI roadmap for the next quarter.',
    deliverables: [
      'Small automations that save hours each week',
      'AI prompts and playbooks designed for your business',
      'Practical AI roadmap for quick wins and long-term gains',
    ],
  },
]

export const activityTitle = 'From complex data to clear insight'
export const activityIntro =
  'Real decisions sit inside messy data. Pick a business question below and explore how we cut through the noise to find what matters.'
