import type { IndustryContext } from './types'

type FeedbackSample = {
  id: string
  label: string
  text: string
}

const lawSamples: FeedbackSample[] = [
  {
    id: 'interview',
    label: 'Corporate client interview',
    text: `Interview excerpt - Corporate client (M&A matter):
"We trust the partner's judgment on complex deals, but we often wait too long for updates on routine matters. Sometimes we chase the team for status. Fee discussions feel reactive rather than proactive - we want clarity earlier in the matter lifecycle."
"Communication is clear when we get it, but we'd like more proactive outreach before we have to ask."
"The strategic advice on the acquisition was excellent - we just need the day-to-day experience to match."`,
  },
  {
    id: 'executive',
    label: 'Executive stakeholder feedback',
    text: `Executive stakeholder session notes:
"Partners are strong on complex strategy but clients perceive slow turnaround on standard matters."
"Value narrative is unclear for corporate clients - fee structure questioned in 4 of 6 interviews."
"Responsiveness is the top concern in Corporate & M&A - 38% of mixed feedback links to update delays."
"Litigation clients praise communication quality. Property group scores strategic advice highly."`,
  },
  {
    id: 'survey',
    label: 'Customer survey results',
    text: `Annual client survey highlights (89 responses):
"How responsive is the firm?" - Average 3.2/5. Comments: "Slow updates", "Have to follow up", "Want proactive status."
"Do you understand fees?" - Average 3.4/5. Comments: "Unclear billing", "Surprised by phases", "Need value narrative."
"Quality of advice" - Average 4.1/5. Comments: "Excellent on complex matters", "Trust partner judgment."
"Would you recommend us?" - NPS 42 in Corporate segment, 58 in Property.`,
  },
]

const accountingSamples: FeedbackSample[] = [
  {
    id: 'interview',
    label: 'Audit client interview',
    text: `Interview excerpt - Mid-market audit client:
"We trust the technical quality on complex audits, but status updates on routine compliance work are slow. We often chase the team for deliverable timelines."
"Fee changes on scope creep feel reactive - we want clarity at engagement start, not at billing."
"Tax advisory work is excellent - we need the same proactive communication on audit milestones."`,
  },
  {
    id: 'executive',
    label: 'CFO stakeholder session',
    text: `CFO roundtable notes:
"Partners deliver strong technical advice but clients wait too long for engagement status on standard work."
"Fee transparency is questioned in 5 of 8 interviews - scope narrative needs strengthening."
"Responsiveness is the top concern in advisory - clients cite follow-up delays during peak season."
"Audit quality scores remain high - communication consistency is the gap."`,
  },
  {
    id: 'survey',
    label: 'Client satisfaction survey',
    text: `Annual client survey (62 responses):
"How responsive is the firm?" - Average 3.1/5. Comments: "Slow updates", "Have to chase", "Want proactive status."
"Do fees match scope?" - Average 3.3/5. Comments: "Unclear scope changes", "Surprised by phases."
"Technical quality" - Average 4.2/5. Comments: "Strong audit work", "Trust the partner."
"Would you recommend us?" - NPS 44 in advisory, 56 in audit.`,
  },
]

const consultingSamples: FeedbackSample[] = [
  {
    id: 'interview',
    label: 'Client sponsor interview',
    text: `Interview excerpt - Enterprise client sponsor:
"We value the strategic insight on transformation programs, but project status updates are inconsistent. Sponsors chase engagement leads for milestone progress."
"Value delivered vs fees is unclear until renewal - we want outcome narratives throughout the project."
"Communication is strong on steering committees - day-to-day project updates need improvement."`,
  },
  {
    id: 'executive',
    label: 'Sponsor feedback session',
    text: `Executive sponsor session notes:
"Principals excel on complex strategy but sponsors perceive slow turnaround on routine project updates."
"Value narrative weak for multi-phase programs - fees questioned in 4 of 7 sponsor interviews."
"Responsiveness is the top theme - 35% of mixed feedback links to status delays."
"Transformation work scores highly - operational project communication is the gap."`,
  },
  {
    id: 'survey',
    label: 'Client advocacy survey',
    text: `Client advocacy survey (48 responses):
"How responsive is the team?" - Average 3.0/5. Comments: "Slow updates", "Need proactive status", "Chase for milestones."
"Do you understand fees vs outcomes?" - Average 3.2/5. Comments: "Unclear value", "Renewal surprises."
"Quality of advice" - Average 4.3/5. Comments: "Excellent strategy", "Trust the principals."
"Would you recommend us?" - NPS 41 enterprise, 54 mid-market.`,
  },
]

const professionalServicesSamples: FeedbackSample[] = [
  {
    id: 'interview',
    label: 'Stakeholder interview',
    text: `Interview excerpt - Priority account stakeholder:
"We trust the team's expertise on complex assignments, but status updates on routine work are slow. We often follow up for progress."
"Pricing and scope feel reactive - we want clarity earlier in the assignment lifecycle."
"Strategic input is strong - we need day-to-day communication to match."`,
  },
  {
    id: 'executive',
    label: 'Executive stakeholder notes',
    text: `Executive stakeholder session:
"Teams deliver well on complex work but stakeholders perceive slow turnaround on standard assignments."
"Value narrative unclear for key accounts - pricing questioned in stakeholder feedback."
"Responsiveness is the top concern - update delays cited in 36% of mixed feedback."
"Expertise scores highly - communication consistency needs attention."`,
  },
  {
    id: 'survey',
    label: 'Stakeholder survey',
    text: `Stakeholder survey highlights (54 responses):
"How responsive is the team?" - Average 3.2/5. Comments: "Slow updates", "Have to follow up", "Want proactive status."
"Do you understand fees?" - Average 3.4/5. Comments: "Unclear pricing", "Scope surprises."
"Quality of work" - Average 4.1/5. Comments: "Strong expertise", "Trust the team."
"Would you recommend us?" - NPS 43 priority accounts, 55 growth segment.`,
  },
]

const samplesByIndustry: Record<IndustryContext, FeedbackSample[]> = {
  law: lawSamples,
  accounting: accountingSamples,
  consulting: consultingSamples,
  'professional-services': professionalServicesSamples,
}

export function getSamplesForIndustry(industry: IndustryContext): FeedbackSample[] {
  return samplesByIndustry[industry]
}

/** @deprecated Use getSamplesForIndustry - kept for any legacy imports */
export const northgateFeedbackSamples = lawSamples
