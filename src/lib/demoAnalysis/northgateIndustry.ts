import type { IndustryContext } from './types'

export type IndustryConfig = {
  id: IndustryContext
  label: string
  shortLabel: string
  stakeholderTerm: string
  leaderTerm: string
  workUnit: string
  teamUnit: string
  summaryOpener: string
  priorityFraming: string
  responsiveness: {
    actionTitle: string
    actionDescription: string
    rootCauses: string[]
  }
  value: {
    actionTitle: string
    actionDescription: string
    rootCauses: string[]
  }
  portal: {
    actionTitle: string
    actionDescription: string
  }
  listening: {
    actionTitle: string
    actionDescription: string
  }
}

export const industryConfigs: Record<IndustryContext, IndustryConfig> = {
  law: {
    id: 'law',
    label: 'Law Firm',
    shortLabel: 'Law',
    stakeholderTerm: 'client',
    leaderTerm: 'Managing Partner',
    workUnit: 'matter',
    teamUnit: 'practice group',
    summaryOpener: 'Client listening analysis',
    priorityFraming: 'Q3 client experience program',
    responsiveness: {
      actionTitle: 'Launch proactive matter status updates',
      actionDescription: 'Automated status updates for in-flight matters · 90-day rollout',
      rootCauses: [
        'Manual status check-ins instead of automated matter updates',
        'No shared view of in-flight matter progress for clients',
        'Capacity constraints during peak matter periods',
      ],
    },
    value: {
      actionTitle: 'Partner-led value reviews',
      actionDescription: 'Quarterly value narrative for top corporate clients',
      rootCauses: [
        'Fee structure explained reactively rather than at matter outset',
        'No structured value narrative for corporate segment',
      ],
    },
    portal: {
      actionTitle: 'Matter status visibility portal',
      actionDescription: 'Client portal for matter progress · corporate segment',
    },
    listening: {
      actionTitle: 'Expand client listening program',
      actionDescription: 'Structured interviews across remaining practice groups',
    },
  },
  accounting: {
    id: 'accounting',
    label: 'Accounting Firm',
    shortLabel: 'Accounting',
    stakeholderTerm: 'client',
    leaderTerm: 'Managing Partner',
    workUnit: 'engagement',
    teamUnit: 'service line',
    summaryOpener: 'Client feedback analysis',
    priorityFraming: 'Q3 client retention initiative',
    responsiveness: {
      actionTitle: 'Launch proactive engagement status updates',
      actionDescription: 'Automated progress updates for in-flight engagements · 90-day rollout',
      rootCauses: [
        'Manual check-ins instead of scheduled engagement updates',
        'No client-facing view of deliverable progress',
        'Peak season capacity limits proactive outreach',
      ],
    },
    value: {
      actionTitle: 'Partner-led fee clarity reviews',
      actionDescription: 'Quarterly scope and fee narrative for key audit & advisory clients',
      rootCauses: [
        'Scope changes communicated reactively at billing milestones',
        'Limited upfront fee narrative for multi-phase engagements',
      ],
    },
    portal: {
      actionTitle: 'Engagement progress portal',
      actionDescription: 'Client dashboard for deliverable status · mid-market segment',
    },
    listening: {
      actionTitle: 'Expand client feedback program',
      actionDescription: 'Structured interviews across audit, tax, and advisory lines',
    },
  },
  consulting: {
    id: 'consulting',
    label: 'Consulting Firm',
    shortLabel: 'Consulting',
    stakeholderTerm: 'client',
    leaderTerm: 'Executive Committee',
    workUnit: 'project',
    teamUnit: 'delivery team',
    summaryOpener: 'Stakeholder feedback analysis',
    priorityFraming: 'Q3 client advocacy program',
    responsiveness: {
      actionTitle: 'Launch proactive project status cadence',
      actionDescription: 'Weekly client updates for active projects · sponsor-aligned rollout',
      rootCauses: [
        'Status updates depend on individual engagement leads',
        'No shared client view of milestone progress',
        'Resource constraints during concurrent project peaks',
      ],
    },
    value: {
      actionTitle: 'Principal-led value narrative sessions',
      actionDescription: 'Quarterly outcome reviews for top 20 client sponsors',
      rootCauses: [
        'Value delivered vs fees discussed only at renewal',
        'Outcomes not linked to project milestones in client communications',
      ],
    },
    portal: {
      actionTitle: 'Project visibility workspace',
      actionDescription: 'Shared milestone tracker for client sponsors · enterprise accounts',
    },
    listening: {
      actionTitle: 'Expand sponsor listening program',
      actionDescription: 'Structured interviews across key accounts and delivery teams',
    },
  },
  'professional-services': {
    id: 'professional-services',
    label: 'Professional Services',
    shortLabel: 'Prof. services',
    stakeholderTerm: 'stakeholder',
    leaderTerm: 'Executive Team',
    workUnit: 'assignment',
    teamUnit: 'business unit',
    summaryOpener: 'Stakeholder feedback analysis',
    priorityFraming: 'Q3 experience improvement program',
    responsiveness: {
      actionTitle: 'Launch proactive status updates',
      actionDescription: 'Scheduled progress updates for active assignments · 90-day rollout',
      rootCauses: [
        'Manual follow-ups instead of structured status communications',
        'No shared visibility of assignment progress for stakeholders',
        'Capacity gaps during high-demand periods',
      ],
    },
    value: {
      actionTitle: 'Executive-led value reviews',
      actionDescription: 'Quarterly value narrative for priority accounts',
      rootCauses: [
        'Pricing and scope explained reactively rather than at assignment start',
        'No consistent value story across business units',
      ],
    },
    portal: {
      actionTitle: 'Assignment status portal',
      actionDescription: 'Stakeholder dashboard for in-flight work · priority accounts',
    },
    listening: {
      actionTitle: 'Expand stakeholder listening program',
      actionDescription: 'Structured feedback across remaining business units',
    },
  },
}

export function getIndustryConfig(industry: IndustryContext): IndustryConfig {
  return industryConfigs[industry]
}

export const industryOptions: { id: IndustryContext; label: string }[] = [
  { id: 'law', label: 'Law Firm' },
  { id: 'accounting', label: 'Accounting Firm' },
  { id: 'consulting', label: 'Consulting Firm' },
  { id: 'professional-services', label: 'Professional Services' },
]
