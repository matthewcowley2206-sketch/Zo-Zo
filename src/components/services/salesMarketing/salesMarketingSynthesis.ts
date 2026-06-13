export type FunnelStage = 'awareness' | 'interest' | 'consider' | 'buy' | 'retain'
export type Audience = 'smb' | 'enterprise' | 'consumer'
export type Value = 'speed' | 'trust' | 'price' | 'expertise'
export type Differentiator = 'human' | 'specialist' | 'integrated' | 'proven'

export type SalesMarketingInput = {
  leaks: FunnelStage[]
  audience: Audience
  value: Value
  differentiator: Differentiator
}

export type SalesMarketingOutput = {
  positioning: string
  oneLiner: string
  journeyLeak: string
  journeyFix: string
  contentCadence: string
  channelFocus: string
  pitchAngle: string
  funnelFixLabel: string
  cadenceStrip: { month: string; actions: string[] }[]
}

export const funnelStages: { id: FunnelStage; label: string; sub: string }[] = [
  { id: 'awareness', label: 'Awareness', sub: 'They discover you' },
  { id: 'interest', label: 'Interest', sub: 'They explore what you do' },
  { id: 'consider', label: 'Consideration', sub: 'They compare options' },
  { id: 'buy', label: 'Purchase', sub: 'They decide and sign' },
  { id: 'retain', label: 'Retention', sub: 'They stay and refer' },
]

export const positioningTiles = {
  audience: [
    { id: 'smb' as const, label: 'SMB buyers' },
    { id: 'enterprise' as const, label: 'Enterprise accounts' },
    { id: 'consumer' as const, label: 'Direct consumers' },
  ],
  value: [
    { id: 'speed' as const, label: 'Speed' },
    { id: 'trust' as const, label: 'Trust' },
    { id: 'price' as const, label: 'Value for money' },
    { id: 'expertise' as const, label: 'Expertise' },
  ],
  differentiator: [
    { id: 'human' as const, label: 'Human follow-through' },
    { id: 'specialist' as const, label: 'Specialist depth' },
    { id: 'integrated' as const, label: 'Strategy to delivery' },
    { id: 'proven' as const, label: 'Proven track record' },
  ],
}

export const workflowSteps = [
  { id: 'funnel', label: 'Journey map' },
  { id: 'position', label: 'Positioning' },
  { id: 'output', label: 'Your plan' },
] as const

export type WorkflowStepId = (typeof workflowSteps)[number]['id']

export const stepGuides: Record<WorkflowStepId, { title: string; instruction: string; tip?: string }> = {
  funnel: {
    title: 'Where do you lose people?',
    instruction: 'Tap two stages on the funnel where prospects drop off or stall.',
    tip: 'Most leaks are message mismatch or missing proof - not lack of channels.',
  },
  position: {
    title: 'Build your positioning line',
    instruction: 'Tap one tile in each row - Who, Why you, and What sets you apart.',
  },
  output: {
    title: 'Your sample marketing snapshot',
    instruction: 'Review the positioning one-pager, funnel fix, and content rhythm.',
  },
}

const audienceLabels: Record<Audience, string> = {
  smb: 'small and mid-size businesses',
  enterprise: 'enterprise accounts',
  consumer: 'direct consumers',
}

const valueLabels: Record<Value, string> = {
  speed: 'speed and responsiveness',
  trust: 'trust and reliability',
  price: 'value for money',
  expertise: 'deep expertise',
}

const diffLabels: Record<Differentiator, string> = {
  human: 'a human team that actually follows through',
  specialist: 'specialist depth - not generalist noise',
  integrated: 'strategy through to delivery in one place',
  proven: 'a track record with businesses like theirs',
}

const leakFixes: Record<FunnelStage, { leak: string; fix: string; channel: string }> = {
  awareness: {
    leak: 'Not enough of the right people know you exist.',
    fix: 'Sharpen who you help on every touchpoint - one clear audience, one proof point.',
    channel: 'Content and search',
  },
  interest: {
    leak: 'They visit but cannot tell what you actually do.',
    fix: 'Rewrite hero copy and case proof so interest converts to conversation.',
    channel: 'Website and content',
  },
  consider: {
    leak: 'They compare you and the difference is not obvious.',
    fix: 'Lead with your differentiator in pitch packs and proposals - side by side.',
    channel: 'Sales enablement',
  },
  buy: {
    leak: 'Decision stalls at proposal or pricing conversation.',
    fix: 'Clear packages, outcome-led pricing, and a simple next step.',
    channel: 'Sales conversations',
  },
  retain: {
    leak: 'Clients do not refer or renew at the rate you expect.',
    fix: 'Proactive check-ins and a referral ask built into delivery rhythm.',
    channel: 'Referrals and advocacy',
  },
}

export function synthesizeSalesMarketing(input: SalesMarketingInput): SalesMarketingOutput {
  const primaryLeak = input.leaks[0] ?? 'interest'
  const secondaryLeak = input.leaks[1] ?? 'consider'
  const fix = leakFixes[primaryLeak]

  const positioning = `For ${audienceLabels[input.audience]} who need ${valueLabels[input.value]}, we are the partner known for ${diffLabels[input.differentiator]}.`

  const oneLiners: Record<Differentiator, string> = {
    human: 'Real people, real follow-through - not a ticket queue.',
    specialist: 'Deep in what we do. Not trying to be everything to everyone.',
    integrated: 'From clarity to delivery - one team, one thread.',
    proven: 'We have done this before, with businesses like yours.',
  }

  return {
    positioning,
    oneLiner: oneLiners[input.differentiator],
    journeyLeak: `${leakFixes[primaryLeak].leak} Also at ${funnelStages.find((s) => s.id === secondaryLeak)?.label.toLowerCase()}: ${leakFixes[secondaryLeak].leak.toLowerCase()}`,
    journeyFix: fix.fix,
    funnelFixLabel: fix.fix,
    contentCadence: 'Two useful touchpoints per month · one proof story per quarter · monthly pipeline review',
    channelFocus: fix.channel,
    pitchAngle: `Lead with ${valueLabels[input.value]} - then prove ${diffLabels[input.differentiator]}.`,
    cadenceStrip: [
      { month: 'Month 1', actions: ['Fix top funnel leak', 'Align pitch to positioning'] },
      { month: 'Month 2', actions: ['Publish one proof story', 'Run 5 targeted conversations'] },
      { month: 'Month 3', actions: ['Review what converted', 'Cut what did not land'] },
    ],
  }
}
