export type SupportAreaId = 'map' | 'redesign' | 'automate' | 'document' | 'playbook'

export type ProcessStep = {
  id: string
  label: string
  owner: string
  bottleneck?: boolean
  automated?: boolean
  kept?: boolean
}

export type SupportArea = {
  id: SupportAreaId
  label: string
  tagline: string
  summary: string
  whatWeDo: string
  deliverables: string[]
  example: string
  outcome: string
  flowNote: string
}

export const processTitle = 'New client onboarding'
export const processPain = '8 steps · 4 handoffs · 12 days average · 6 hrs admin per client'

export const beforeSteps: ProcessStep[] = [
  { id: 's1', label: 'Lead received', owner: 'Sales' },
  { id: 's2', label: 'Manual CRM entry', owner: 'Admin', bottleneck: true },
  { id: 's3', label: 'Scope call booked', owner: 'Sales' },
  { id: 's4', label: 'Proposal drafted', owner: 'Delivery' },
  { id: 's5', label: 'Legal review queue', owner: 'Legal', bottleneck: true },
  { id: 's6', label: 'Client signs', owner: 'Sales' },
  { id: 's7', label: 'Kickoff deck rebuilt', owner: 'Delivery', bottleneck: true },
  { id: 's8', label: 'Project starts', owner: 'Delivery' },
]

export const afterSteps: ProcessStep[] = [
  { id: 'a1', label: 'Lead qualified', owner: 'Sales', automated: true, kept: true },
  { id: 'a2', label: 'Proposal & scope', owner: 'Delivery', kept: true },
  { id: 'a3', label: 'Sign & onboard', owner: 'Ops', automated: true, kept: true },
  { id: 'a4', label: 'Project live', owner: 'Delivery', kept: true },
]

export const supportAreas: SupportArea[] = [
  {
    id: 'map',
    label: 'Process mapping',
    tagline: 'See where work gets stuck',
    summary: 'Map the real flow - not the version on the whiteboard from last year.',
    whatWeDo:
      'We run a process mapping workshop with the people who actually do the work. Together we uncover bottlenecks, duplicate steps, and handoffs that slow everything down.',
    deliverables: ['Process mapping workshop to uncover bottlenecks'],
    example:
      'CRM entry, legal review, and kickoff prep account for 60% of delay - but nobody owned fixing them until the map made it visible.',
    outcome: 'Everyone agrees what happens today - and where time disappears.',
    flowNote: 'Bottlenecks highlighted on the current flow.',
  },
  {
    id: 'redesign',
    label: 'Workflow redesign',
    tagline: 'Before and after',
    summary: 'Cut steps, clarify handoffs, design a flow people can follow.',
    whatWeDo:
      'We redesign the workflow with your team - fewer steps, clearer ownership, and a before-and-after view leaders can approve without a 40-page document.',
    deliverables: ['Before & after workflow redesign'],
    example:
      'Eight steps became four. Legal review moves to a standard clause library - not a queue every time.',
    outcome: 'A simpler path from start to finish.',
    flowNote: 'Compare the messy flow with the redesigned version.',
  },
  {
    id: 'automate',
    label: 'Simple automation',
    tagline: 'Remove the repeat work',
    summary: 'Emails, reminders, reporting, approvals - the bits nobody wants to do manually.',
    whatWeDo:
      'We identify repetitive tasks and set up simple automations - CRM updates, approval nudges, status reports - without a major IT project.',
    deliverables: ['Simple automation (emails, reminders, reporting, approvals)'],
    example:
      'Signed proposal triggers onboarding checklist, client welcome email, and kickoff scheduling - no one chases in Slack.',
    outcome: 'Hours back every week on work that should run itself.',
    flowNote: 'Automation points marked on the redesigned flow.',
  },
  {
    id: 'document',
    label: 'SOPs & roles',
    tagline: 'Make it stick',
    summary: 'Document how it works and who owns what.',
    whatWeDo:
      'We build an SOP pack and roles map so the new flow survives staff changes, busy weeks, and growth - not just the week after the workshop.',
    deliverables: [
      'Standard Operating Procedures pack',
      'Team roles & responsibilities map',
    ],
    example:
      'Each step has one owner, a checklist, and an escalation path - new hires onboard to the process in a day, not a month.',
    outcome: 'The team runs the new way without you in every thread.',
    flowNote: 'Owners assigned on each step of the new flow.',
  },
  {
    id: 'playbook',
    label: 'Efficiency playbook',
    tagline: 'Keep simplifying',
    summary: 'A rhythm for spotting the next bottleneck before it hurts.',
    whatWeDo:
      'We leave an operational efficiency playbook - how to review flows, prioritise the next fix, and keep admin load from creeping back.',
    deliverables: ['Operational efficiency playbook'],
    example:
      'Quarterly 30-minute flow review: one process, one metric, one improvement - compounding gains without transformation theatre.',
    outcome: 'Operations keep getting lighter - not sliding back to chaos.',
    flowNote: 'The improved flow ready to run and review.',
  },
]

export const activityTitle = 'One process. Five ways we simplify it.'
export const activityIntro =
  'Explore a sample onboarding workflow. Select each area of support to see what we do, what you leave with, and how the flow changes.'
