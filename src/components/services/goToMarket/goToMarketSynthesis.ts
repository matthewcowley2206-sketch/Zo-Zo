export type OfferType = 'product' | 'service' | 'market' | 'relaunch'
export type LaunchWeek = 1 | 2 | 3 | 4

export type LaunchCard = { id: string; label: string; sub: string }

export type GoToMarketInput = {
  offer: OfferType
  assignments: Record<string, LaunchWeek>
}

export type GoToMarketOutput = {
  valueProposition: string
  messagingPillar: string
  headline: string
  weeklyPlan: { week: string; focus: string; items: string[] }[]
  testLearn: { bet: string; metric: string; decision: string; status: 'ready' | 'watch' | 'risk' }
  pricingNote: string
  prototypeTip: string
  launchScore: number
}

export const offerOptions: { id: OfferType; label: string; sub: string }[] = [
  { id: 'product', label: 'New product', sub: 'Buy, try, or subscribe' },
  { id: 'service', label: 'New service', sub: 'Scoped outcome' },
  { id: 'market', label: 'New market', sub: 'Existing offer, new audience' },
  { id: 'relaunch', label: 'Relaunch', sub: 'Repositioned offer' },
]

export const launchCards: LaunchCard[] = [
  { id: 'message', label: 'Lock messaging', sub: 'Value prop and one-pager' },
  { id: 'list', label: 'Priority outreach', sub: 'First 20 targets' },
  { id: 'demo', label: 'Demo or pilot', sub: 'Show, do not tell' },
  { id: 'content', label: 'Launch content', sub: 'Page, email, or post' },
  { id: 'enable', label: 'Team enablement', sub: 'Pitch and FAQ' },
  { id: 'measure', label: 'Measure & review', sub: 'Metrics and retro' },
]

export const weekLabels: Record<LaunchWeek, string> = {
  1: 'Week 1 · Foundation',
  2: 'Week 2 · First wave',
  3: 'Week 3 · Learn',
  4: 'Week 4 · Scale or pivot',
}

export const workflowSteps = [
  { id: 'offer', label: 'Offer' },
  { id: 'board', label: 'Launch board' },
  { id: 'output', label: 'Launch plan' },
] as const

export type WorkflowStepId = (typeof workflowSteps)[number]['id']

export const stepGuides: Record<WorkflowStepId, { title: string; instruction: string; tip?: string }> = {
  offer: {
    title: 'What are you launching?',
    instruction: 'Pick the offer type - the sequence changes if it is net-new or a relaunch.',
  },
  board: {
    title: 'Plan the four weeks',
    instruction: 'Drag each activity into Week 1-4. Foundation before outreach - measure before scale.',
    tip: 'A realistic sequence beats a fantasy calendar every time.',
  },
  output: {
    title: 'Your sample launch snapshot',
    instruction: 'Review messaging, the four-week board, and test-and-learn scorecard.',
  },
}

const offerHeadlines: Record<OfferType, string> = {
  product: 'Built for how you work - ready to try before you commit.',
  service: 'Clear scope, clear outcome - no vague consulting.',
  market: 'Proven elsewhere - now for this market.',
  relaunch: 'We listened. Here is what is different.',
}

export function synthesizeGoToMarket(input: GoToMarketInput): GoToMarketOutput {
  const byWeek = (w: LaunchWeek) =>
    launchCards.filter((c) => input.assignments[c.id] === w).map((c) => c.label)

  const week1 = byWeek(1)
  const hasFoundation = week1.some((l) => l.includes('messaging') || l.includes('Lock'))
  const measureWeek = Object.entries(input.assignments).find(([id, w]) => id === 'measure' && w)?.[1] ?? 4

  const weeklyPlan = ([1, 2, 3, 4] as LaunchWeek[]).map((w) => ({
    week: weekLabels[w],
    focus: w === 1 ? 'Foundation' : w === 2 ? 'First wave' : w === 3 ? 'Learn fast' : 'Scale or pivot',
    items: byWeek(w).length ? byWeek(w) : ['Buffer for feedback and fixes'],
  }))

  const launchScore = Math.min(
    100,
    40 + (hasFoundation ? 25 : 0) + (measureWeek <= 4 ? 20 : 0) + launchCards.filter((c) => input.assignments[c.id]).length * 3,
  )

  return {
    headline: offerHeadlines[input.offer],
    valueProposition: `Launching ${input.offer === 'product' ? 'a new product' : input.offer === 'service' ? 'a new service' : input.offer === 'market' ? 'into a new market' : 'with a sharper message'} - with a sequence your team can actually run.`,
    messagingPillar: 'One audience, one proof point, one clear next step - before you widen spend.',
    weeklyPlan,
    testLearn: {
      bet: 'Test message and offer with 10-15 priority buyers before broad launch.',
      metric: 'Reply rate and quality of conversation - not impressions.',
      decision: launchScore >= 70 ? 'Proceed to widen on schedule.' : 'Fix foundation in Week 1 before scaling outreach.',
      status: launchScore >= 75 ? 'ready' : launchScore >= 55 ? 'watch' : 'risk',
    },
    pricingNote: 'Package scope clearly - buyers decide faster when options are simple.',
    prototypeTip: 'Let buyers click through the offer before launch week - objections surface early.',
    launchScore,
  }
}

export function allCardsAssigned(assignments: Partial<Record<string, LaunchWeek>>): boolean {
  return launchCards.every((c) => assignments[c.id])
}

export function getCardsInWeek(assignments: Partial<Record<string, LaunchWeek>>, week: LaunchWeek): LaunchCard[] {
  return launchCards.filter((c) => assignments[c.id] === week)
}

export function getUnassignedCards(assignments: Partial<Record<string, LaunchWeek>>): LaunchCard[] {
  return launchCards.filter((c) => !assignments[c.id])
}
