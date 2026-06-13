export type WorkflowStageId = 'listen' | 'insights' | 'act' | 'close' | 'measure'

export type WorkflowStage = {
  id: WorkflowStageId
  label: string
  tagline: string
  summary: string
  whatHappens: string
  deliverables: string[]
  example: string
  automation?: string
}

export const workflowStages: WorkflowStage[] = [
  {
    id: 'listen',
    label: 'Listen',
    tagline: 'Structured conversations',
    summary: 'Honest input from clients, stakeholders, and internal teams.',
    whatHappens:
      'We design who to speak with, what decisions insight must inform, and how to run conversations that surface truth - not polite answers.',
    deliverables: [
      'Interview guides and question sets',
      'Facilitation support and runbooks',
      'Starter briefing packs if listening is not set up yet',
    ],
    example:
      '"We trust your team on delivery - but we often find out about changes after the fact, not before."',
    automation: 'Interview scheduling, note capture, and CRM sync.',
  },
  {
    id: 'insights',
    label: 'Insights',
    tagline: 'Extract what matters',
    summary: 'Themes, blind spots, and gaps between assumption and experience.',
    whatHappens:
      'Raw feedback becomes a leadership-ready insight pack - patterns ranked, implications clear, and strategy connections explicit.',
    deliverables: [
      'Insight extraction pack with ranked themes',
      'Strategy-on-a-page informed by listening',
      'Executive summary for alignment workshops',
    ],
    example:
      'Responsiveness and proactive communication emerge as the top theme across four key accounts.',
    automation: 'Cross-interview pattern detection and draft insight packs for review.',
  },
  {
    id: 'act',
    label: 'Act',
    tagline: 'Turn insight into action',
    summary: 'Prioritised responses with clear owners and timelines.',
    whatHappens:
      'Leadership agrees what changes first. Actions are scoped, owned, and linked back to what clients actually said.',
    deliverables: [
      'Prioritised action plan with owners',
      'Leadership workshop to align on findings',
      'Workflow triggers for account teams',
    ],
    example:
      'Launch a proactive communication protocol for key accounts within 30 days.',
    automation: 'Priority scoring, owner assignment, and action dashboards.',
  },
  {
    id: 'close',
    label: 'Close',
    tagline: 'Tell clients what changed',
    summary: 'Close the loop so feedback becomes visible change.',
    whatHappens:
      'Clients hear what you heard and what you are doing about it. Trust rebuilds when people see feedback landed.',
    deliverables: [
      'Close-the-loop playbook and client update templates',
      'Account owner tasks tied to each action',
      'Audit trail from feedback to response',
    ],
    example:
      '"Based on your feedback, we are introducing a monthly check-in before any scope changes."',
    automation: 'Personalised update drafts and CRM follow-up tasks.',
  },
  {
    id: 'measure',
    label: 'Measure',
    tagline: 'Embed the loop',
    summary: 'NPS, CSAT, personas, and a rhythm that keeps running.',
    whatHappens:
      'Baseline scores, tracking dashboards, and client personas refresh the loop - so listening is continuous, not a one-off project.',
    deliverables: [
      'NPS and CSAT baseline with tracking framework',
      'Client personas and relationship profiles',
      'AI and automation roadmap across the workflow',
    ],
    example:
      'NPS lifts from 32 to 41 over two quarters as close-the-loop actions land.',
    automation: 'Survey pulses, persona updates, and embedded listening triggers.',
  },
]
