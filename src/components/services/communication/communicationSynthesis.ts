export type CommAudience = 'board' | 'team' | 'clients'

export type WaffleSegment = { id: string; text: string; plain: string }

export type CommunicationInput = {
  audience: CommAudience
  redactedIds: string[]
}

export type CommunicationOutput = {
  headline: string
  executiveSummary: string
  talkingPoints: string[]
  faqExcerpt: { q: string; a: string }[]
  rolloutTip: string
  formatNote: string
  clarityScore: number
  beforeText: string
  afterText: string
}

export const audienceOptions: { id: CommAudience; label: string; sub: string }[] = [
  { id: 'board', label: 'Board or investors', sub: 'Decisions, risk, and numbers' },
  { id: 'team', label: 'Your team', sub: 'Direction and what changes' },
  { id: 'clients', label: 'Clients', sub: 'Reassurance and next steps' },
]

export const waffleParagraphs: Record<CommAudience, { segments: WaffleSegment[]; headline: string }> = {
  board: {
    headline: 'Three priorities for next quarter - and what we are stopping.',
    segments: [
      { id: 'b1', text: 'Following a comprehensive organisational review,', plain: 'After reviewing how we work,' },
      { id: 'b2', text: 'we are implementing a strategic realignment initiative', plain: 'we are focusing on three priorities' },
      { id: 'b3', text: 'to optimise resource allocation across workstreams', plain: 'and stopping work that does not fit' },
      { id: 'b4', text: 'with a view to enhancing stakeholder value creation', plain: 'so we grow profitably' },
      { id: 'b5', text: 'through synergistic cross-functional alignment.', plain: 'with clearer ownership.' },
    ],
  },
  team: {
    headline: 'A simpler way of working - same direction, fewer bottlenecks.',
    segments: [
      { id: 't1', text: 'As part of our operational excellence programme,', plain: 'Starting next month,' },
      { id: 't2', text: 'we are transitioning to a new workflow paradigm', plain: 'we are changing how work flows' },
      { id: 't3', text: 'designed to leverage synergies between functions', plain: 'so handoffs are clearer' },
      { id: 't4', text: 'and reduce non-value-adding administrative burden.', plain: 'and admin eats less of your week.' },
      { id: 't5', text: 'Change champions will cascade communications accordingly.', plain: 'Your lead will walk you through what changes.' },
    ],
  },
  clients: {
    headline: 'What is changing for you - and what is not.',
    segments: [
      { id: 'c1', text: 'In line with our continuous improvement framework,', plain: 'We are making a change' },
      { id: 'c2', text: 'we are enhancing our service delivery model', plain: 'to improve how we serve you' },
      { id: 'c3', text: 'to ensure best-in-class client outcomes', plain: 'with faster response and clearer updates' },
      { id: 'c4', text: 'through proactive stakeholder engagement protocols.', plain: 'and one point of contact for questions.' },
      { id: 'c5', text: 'Your account team will provide further detail in due course.', plain: 'Your account lead will reach out this week.' },
    ],
  },
}

export const workflowSteps = [
  { id: 'redact', label: 'Cut the waffle' },
  { id: 'output', label: 'Your pack' },
] as const

export type WorkflowStepId = (typeof workflowSteps)[number]['id']

export const stepGuides: Record<WorkflowStepId, { title: string; instruction: string; tip?: string }> = {
  redact: {
    title: 'Strike the corporate filler',
    instruction: 'Pick who this is for, then tap every highlighted phrase to replace it with plain English.',
    tip: 'If you would not say it out loud, it should not be in the deck.',
  },
  output: {
    title: 'Your sample communication pack',
    instruction: 'See the before/after, slide mock, and delivery materials we would build with you.',
  },
}

export function synthesizeCommunication(input: CommunicationInput): CommunicationOutput {
  const para = waffleParagraphs[input.audience]
  const total = para.segments.length
  const redacted = input.redactedIds.filter((id) => para.segments.some((s) => s.id === id))
  const clarityScore = Math.min(100, Math.round((redacted.length / total) * 100))

  const beforeText = para.segments.map((s) => s.text).join(' ')
  const afterParts = para.segments.map((s) =>
    redacted.includes(s.id) ? s.plain : s.text,
  )
  const afterText = afterParts.join(' ').replace(/\s+/g, ' ').trim()

  const talkingPointsMap: Record<CommAudience, string[]> = {
    board: ['The one decision this supports', 'Risk if we wait', 'What we need from the board'],
    team: ['Why now - honest reason', 'What changes in daily work', 'Named owner for questions'],
    clients: ['What improves for them', 'What they need to do, if anything', 'Single point of contact'],
  }

  const faqMap: Record<CommAudience, { q: string; a: string }[]> = {
    board: [
      { q: 'Why now?', a: 'Because the current way is costing us speed - and the numbers show it.' },
      { q: 'What is the ask?', a: 'Approval to proceed - with one clear owner and a 90-day checkpoint.' },
    ],
    team: [
      { q: 'What changes for me?', a: 'Your lead will spell out role-specific changes - not generic slides.' },
      { q: 'When does this start?', a: 'Phased from next month - with support, not surprise.' },
    ],
    clients: [
      { q: 'Does this affect my service?', a: 'Yes - for the better. Here is what stays the same.' },
      { q: 'Who do I contact?', a: 'Your account lead - named in your follow-up note.' },
    ],
  }

  const rolloutTips: Record<CommAudience, string> = {
    board: 'Brief 48 hours before. One recommendation - not five options.',
    team: 'Leaders deliver the same message within 24 hours.',
    clients: 'Personal notes from account owners - not a bulk blast.',
  }

  return {
    headline: para.headline,
    executiveSummary: afterText,
    talkingPoints: talkingPointsMap[input.audience],
    faqExcerpt: faqMap[input.audience],
    rolloutTip: rolloutTips[input.audience],
    formatNote: '8-12 slides max · one idea per slide · appendix for detail.',
    clarityScore,
    beforeText,
    afterText: para.headline + ' ' + afterText,
  }
}
