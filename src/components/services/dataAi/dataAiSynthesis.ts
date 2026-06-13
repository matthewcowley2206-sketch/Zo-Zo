export type Bucket = 'automate' | 'dashboard' | 'human'

export type TaskCard = { id: string; label: string; sub: string }

export type DataAiInput = {
  assignments: Record<string, Bucket>
}

export type DataAiOutput = {
  headline: string
  topAutomation: { title: string; detail: string; hoursSaved: string }
  dashboardFocus: string
  dashboardTiles: { label: string; value: string; trend?: string }[]
  aiPlaybook: string[]
  quickWin: string
  nextQuarter: string
  hoursSavedTotal: number
  automateCount: number
}

export const taskCards: TaskCard[] = [
  { id: 'email', label: 'Chasing status by email', sub: 'Weekly threads nobody owns' },
  { id: 'reports', label: 'Rebuild the same report', sub: 'Slides copied every Friday' },
  { id: 'dataentry', label: 'Copy-paste between systems', sub: 'CRM, sheets, invoices' },
  { id: 'scheduling', label: 'Schedule meetings manually', sub: 'Back-and-forth on times' },
  { id: 'approvals', label: 'Approval follow-ups', sub: 'Who signed off?' },
  { id: 'summaries', label: 'Summarise long documents', sub: 'Exec briefs from raw notes' },
]

export const buckets: { id: Bucket; label: string; sub: string; color: string }[] = [
  { id: 'automate', label: 'Automate', sub: 'Rules, workflows, AI', color: 'bg-violet-50 ring-violet-200 text-violet-950' },
  { id: 'dashboard', label: 'Dashboard', sub: 'Live numbers', color: 'bg-sky-50 ring-sky-200 text-sky-950' },
  { id: 'human', label: 'Keep human', sub: 'Judgment calls', color: 'bg-amber-50 ring-amber-200 text-amber-950' },
]

export const workflowSteps = [
  { id: 'sort', label: 'Sort tasks' },
  { id: 'output', label: 'Your roadmap' },
] as const

export type WorkflowStepId = (typeof workflowSteps)[number]['id']

export const stepGuides: Record<WorkflowStepId, { title: string; instruction: string; tip?: string }> = {
  sort: {
    title: 'Sort the work - where does time go?',
    instruction: 'Drag each task into Automate, Dashboard, or Keep human. There is no perfect answer - we synthesise from your sort.',
    tip: 'Automate repetition. Dashboard decisions. Keep human for trust and judgment.',
  },
  output: {
    title: 'Your sample quick-wins roadmap',
    instruction: 'Review the dashboard mock, automation wins, and roadmap we would build with you.',
  },
}

const automationDetails: Record<string, { title: string; detail: string; hours: number }> = {
  email: { title: 'Status digest automation', detail: 'Weekly summary from project tools - no manual chase.', hours: 4 },
  reports: { title: 'Live dashboard', detail: 'Replace slide rebuilds with one refreshed view.', hours: 6 },
  dataentry: { title: 'CRM sync workflow', detail: 'Deals and invoices flow automatically.', hours: 3 },
  scheduling: { title: 'Smart scheduling', detail: 'Booking links and reminder rules.', hours: 2 },
  approvals: { title: 'Approval workflow', detail: 'Routed requests with 48h nudges.', hours: 5 },
  summaries: { title: 'AI summary templates', detail: 'Draft briefs from notes - human review before send.', hours: 3 },
}

export function synthesizeDataAi(input: DataAiInput): DataAiOutput {
  const automateTasks = taskCards.filter((t) => input.assignments[t.id] === 'automate')
  const dashboardTasks = taskCards.filter((t) => input.assignments[t.id] === 'dashboard')
  const primary = automateTasks[0]?.id ?? 'reports'
  const auto = automationDetails[primary]

  const hoursSavedTotal = automateTasks.reduce(
    (sum, t) => sum + (automationDetails[t.id]?.hours ?? 2),
    0,
  )

  return {
    headline: `${automateTasks.length} tasks to automate · ${dashboardTasks.length} to dashboard · clearer decisions`,
    topAutomation: {
      title: auto.title,
      detail: auto.detail,
      hoursSaved: `${auto.hours}-8 hrs/week`,
    },
    dashboardFocus: dashboardTasks.length
      ? `Live view for: ${dashboardTasks.map((t) => t.label.toLowerCase()).join(', ')}`
      : 'Pipeline, revenue, and delivery health - three tiles, one login.',
    dashboardTiles: [
      { label: 'Pipeline', value: '£1.2M', trend: '↑ 12% vs last month' },
      { label: 'On-time delivery', value: '94%', trend: '↑ 6 pts' },
      { label: 'Hours saved', value: `${hoursSavedTotal}h`, trend: 'Est. per week' },
    ],
    aiPlaybook: [
      'Draft client updates from CRM notes',
      'Summarise documents into exec briefs',
      'Flag anomalies in weekly numbers',
    ],
    quickWin: `Week 1-2: ${auto.title}. Week 3-4: second automation from your sort.`,
    nextQuarter: 'Dashboard rollout, team training, and metric alignment.',
    hoursSavedTotal,
    automateCount: automateTasks.length,
  }
}

export function getTasksInBucket(assignments: Partial<Record<string, Bucket>>, bucket: Bucket): string[] {
  return taskCards.filter((t) => assignments[t.id] === bucket).map((t) => t.label)
}

export function allTasksSorted(assignments: Partial<Record<string, Bucket>>): boolean {
  return taskCards.every((t) => assignments[t.id])
}
