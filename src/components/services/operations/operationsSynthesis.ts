export type Process = 'onboarding' | 'approvals' | 'reporting' | 'handoffs'
export type AutomationLevel = 'light' | 'moderate' | 'full'

export type OperationsInput = {
  process: Process
  keptStepIds: string[]
  automation: AutomationLevel
}

export type OperationsOutput = {
  processName: string
  beforeSummary: string
  afterSummary: string
  hoursSaved: string
  hoursSavedNum: number
  sopOutline: string[]
  automations: string[]
  roleClarity: string
  beforeSteps: { id: string; label: string }[]
  afterSteps: { id: string; label: string }[]
  removedLabels: string[]
}

export const processOptions: { id: Process; title: string; sub: string; steps: { id: string; label: string }[] }[] = [
  {
    id: 'onboarding',
    title: 'Client onboarding',
    sub: 'Signed to live - too many handoffs',
    steps: [
      { id: 'intake', label: 'Intake forms' },
      { id: 'review', label: 'Internal review' },
      { id: 'legal', label: 'Legal check' },
      { id: 'setup', label: 'System setup' },
      { id: 'kickoff', label: 'Kickoff call' },
      { id: 'welcome', label: 'Welcome pack' },
    ],
  },
  {
    id: 'approvals',
    title: 'Approvals',
    sub: 'Quotes and spend stuck in inboxes',
    steps: [
      { id: 'submit', label: 'Submit request' },
      { id: 'review', label: 'Manager review' },
      { id: 'finance', label: 'Finance check' },
      { id: 'approve', label: 'Approver sign-off' },
      { id: 'execute', label: 'Execute action' },
      { id: 'archive', label: 'File & archive' },
    ],
  },
  {
    id: 'reporting',
    title: 'Weekly reporting',
    sub: 'Chasing five people every Friday',
    steps: [
      { id: 'request', label: 'Send requests' },
      { id: 'chase', label: 'Chase owners' },
      { id: 'consolidate', label: 'Consolidate data' },
      { id: 'draft', label: 'Draft deck' },
      { id: 'review', label: 'Leadership review' },
      { id: 'actions', label: 'Assign actions' },
    ],
  },
  {
    id: 'handoffs',
    title: 'Team handoffs',
    sub: 'Context lost between teams',
    steps: [
      { id: 'trigger', label: 'Handoff trigger' },
      { id: 'brief', label: 'Write brief' },
      { id: 'meeting', label: 'Handoff meeting' },
      { id: 'accept', label: 'Team accepts' },
      { id: 'start', label: 'Work starts' },
      { id: 'checkin', label: 'Client check-in' },
    ],
  },
]

export const TARGET_STEPS = 4

export const workflowSteps = [
  { id: 'simplify', label: 'Simplify' },
  { id: 'automate', label: 'Automate' },
  { id: 'output', label: 'Redesign' },
] as const

export type WorkflowStepId = (typeof workflowSteps)[number]['id']

export const stepGuides: Record<WorkflowStepId, { title: string; instruction: string; tip?: string }> = {
  simplify: {
    title: 'Cut the steps that add friction',
    instruction: 'Pick a process, then tap steps to remove until four remain. Merge or cut - do not keep clutter.',
    tip: 'If a step exists "just in case", it is usually costing you hours.',
  },
  automate: {
    title: 'How much automation feels right?',
    instruction: 'Light keeps humans in control. Full removes repetitive work end to end.',
  },
  output: {
    title: 'Your before & after',
    instruction: 'Review the simplified flow, time saved, SOP checklist, and automations.',
  },
}

export function getProcessDef(id: Process) {
  return processOptions.find((p) => p.id === id)!
}

export function synthesizeOperations(input: OperationsInput): OperationsOutput {
  const proc = getProcessDef(input.process)
  const removed = proc.steps.filter((s) => !input.keptStepIds.includes(s.id))
  const kept = proc.steps.filter((s) => input.keptStepIds.includes(s.id))
  const hoursSavedNum = removed.length * 3 + (input.process === 'reporting' ? 4 : 2)

  const automationSets: Record<AutomationLevel, string[]> = {
    light: ['Email templates at each step', 'Shared checklist - one source of truth'],
    moderate: ['Auto-routing to owners', 'Slack/Teams updates when steps complete', '48h reminder escalations'],
    full: ['End-to-end workflow with audit trail', 'Auto-assignment by rules', 'Exception queue for edge cases'],
  }

  return {
    processName: proc.title,
    beforeSteps: proc.steps,
    afterSteps: kept,
    removedLabels: removed.map((s) => s.label),
    beforeSummary: `${proc.title}: ${proc.steps.length} steps, ${removed.length} creating wait time and unclear ownership.`,
    afterSummary: `${kept.length} steps with one owner each, clear done states, and automated nudges where work waits.`,
    hoursSaved: `${hoursSavedNum}-${hoursSavedNum + 4} hrs/week`,
    hoursSavedNum,
    sopOutline: [
      `Purpose: ${proc.sub}`,
      `Steps: ${kept.map((s) => s.label).join(' → ')}`,
      'Owner per step - named role, not "the team"',
      'Done: definition of complete at each stage',
      'Exceptions: escalation path',
    ],
    automations: automationSets[input.automation],
    roleClarity: 'One accountable owner per step - backup named in the SOP.',
  }
}
