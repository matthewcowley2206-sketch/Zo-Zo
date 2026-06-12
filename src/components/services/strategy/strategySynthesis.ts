export type Lane = 'now' | 'next' | 'later'

export type StickyTheme =
  | 'capacity'
  | 'monetisation'
  | 'growth'
  | 'product'
  | 'governance'
  | 'retention'

export type StickyDef = {
  id: string
  text: string
  theme: StickyTheme
}

export const stickyDefs: StickyDef[] = [
  { id: 'website', text: 'Website feels outdated', theme: 'growth' },
  { id: 'hiring', text: 'Need to hire - but who first?', theme: 'capacity' },
  { id: 'pricing', text: 'Pricing has not moved in two years', theme: 'monetisation' },
  { id: 'product', text: 'New product idea keeps resurfacing', theme: 'product' },
  { id: 'team', text: 'Team stretched thin on delivery', theme: 'capacity' },
  { id: 'board', text: 'Board wants a clearer plan', theme: 'governance' },
  { id: 'client', text: 'Key client might leave', theme: 'retention' },
  { id: 'marketing', text: 'Marketing feels random, not a system', theme: 'growth' },
  { id: 'process', text: 'Processes live in people\'s heads', theme: 'capacity' },
]

type ActionItem = { action: string; why: string }

export type CascadeStep = {
  step: number
  label: string
  question: string
  answer: string
  detail?: string
  bullets?: string[]
}

export type StrategyOnPage = {
  headline: string
  frameworkLabel: string
  situation: string
  cascade: CascadeStep[]
  now30: { title: string; items: ActionItem[] }
  next90: { title: string; items: ActionItem[] }
  notNow: { title: string; rationale: string; parked: string[] }
  metrics: string[]
  reviewRhythm: string
}

export type DeckSubsection = { title: string; items: string[] }

export type DeckSlide = {
  number: number
  title: string
  subtitle: string
  cascadeStep: string
  intro?: string
  bullets: string[]
  subsections?: DeckSubsection[]
}

function idsInLane(assignments: Record<string, Lane>, lane: Lane): string[] {
  return Object.entries(assignments)
    .filter(([, l]) => l === lane)
    .map(([id]) => id)
}

function textFor(ids: string[]): string[] {
  return ids.map((id) => stickyDefs.find((s) => s.id === id)?.text ?? id)
}

function themesIn(ids: string[]): StickyTheme[] {
  return ids.map((id) => stickyDefs.find((s) => s.id === id)?.theme).filter(Boolean) as StickyTheme[]
}

function dominantTheme(themes: StickyTheme[]): StickyTheme {
  const counts = themes.reduce(
    (acc, t) => ({ ...acc, [t]: (acc[t] ?? 0) + 1 }),
    {} as Record<string, number>,
  )
  return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'capacity') as StickyTheme
}

const actionLibrary: Record<string, { now?: ActionItem; next?: ActionItem; park?: string }> = {
  website: {
    next: {
      action: 'Refresh positioning and proof points - not a full rebuild yet',
      why: 'Credibility matters, but a website project will eat the team you need elsewhere.',
    },
    park: 'Full site rebuild until delivery stabilises and the offer is sharper.',
  },
  hiring: {
    now: {
      action: 'Define the one role that unlocks delivery - ops or delivery lead first',
      why: 'Hiring without a sharp brief repeats the stretch you already feel.',
    },
    next: {
      action: 'Run a lightweight scorecard hire for the agreed role',
      why: 'Speed with discipline beats another round of vague interviews.',
    },
  },
  pricing: {
    next: {
      action: 'Test two pricing scenarios with your best clients and lost deals',
      why: 'Two years static usually means margin left on the table - or value not visible.',
    },
    now: {
      action: 'Audit where you discount by habit, not strategy',
      why: 'Quick wins fund the work that follows without a risky list-price jump.',
    },
  },
  product: {
    next: {
      action: 'Shape the idea into a one-page concept with clear desirability tests',
      why: 'Ideas that keep resurfacing usually lack a decision frame, not creativity.',
    },
    park: 'Net-new product build until core offer and capacity are stable.',
  },
  team: {
    now: {
      action: 'Map workload vs capacity - name the bottlenecks, stop adding parallel work',
      why: 'You cannot strategy your way out of a capacity problem with more initiatives.',
    },
  },
  board: {
    now: {
      action: 'Agree a 90-day narrative with the board - one page, three bets, explicit tradeoffs',
      why: 'They want clarity, not activity. A credible plan buys you room to execute.',
    },
  },
  client: {
    now: {
      action: 'Senior conversation with the at-risk client - understand the real decision drivers',
      why: 'Retention saves more than any campaign. Assumptions here are expensive.',
    },
    next: {
      action: 'Document what "great" looks like for your top 5 accounts and who owns each',
      why: 'Retention becomes a system, not heroics, when key relationships are mapped.',
    },
  },
  marketing: {
    next: {
      action: 'Pick one channel and one message for 90 days - stop the random acts of marketing',
      why: 'Random activity feels busy. A system repeats what works.',
    },
    park: 'Brand campaigns and new channels until core offer and delivery are stable.',
  },
  process: {
    now: {
      action: 'Document the three workflows that break most often - assign one owner each',
      why: 'Tribal knowledge is a capacity leak. Light process beats another tool.',
    },
    next: {
      action: 'Pilot simple handoffs for delivery and client comms - measure rework',
      why: 'Process work only matters if it removes friction people feel daily.',
    },
  },
}

function buildActions(ids: string[], lane: 'now' | 'next'): ActionItem[] {
  const items: ActionItem[] = []
  for (const id of ids) {
    const lib = actionLibrary[id]
    const item = lane === 'now' ? lib?.now : lib?.next
    if (item) items.push(item)
  }
  if (items.length === 0 && ids.length > 0) {
    items.push({
      action: `Turn "${textFor(ids)[0]}" into one owned outcome with a date`,
      why: 'Every priority needs an owner and a finish line - or it stays noise.',
    })
  }
  return items.slice(0, 4)
}

type StrategyContext = {
  winningAspiration: string
  whereToPlay: { answer: string; bullets: string[] }
  howToWin: { answer: string; bullets: string[] }
  capabilities: { answer: string; bullets: string[] }
  hasCapacityCrunch: boolean
  hasBoardPressure: boolean
  hasMonetisation: boolean
  hasRetentionRisk: boolean
  dominantNow: StickyTheme
}

function buildContext(
  nowIds: string[],
  nextIds: string[],
  laterIds: string[],
): StrategyContext {
  const nowThemes = themesIn(nowIds)
  const nextThemes = themesIn(nextIds)
  const allActive = [...nowIds, ...nextIds]
  const dominantNow = dominantTheme(nowThemes)
  const hasCapacityCrunch =
    nowThemes.includes('capacity') ||
    nextThemes.includes('capacity') ||
    allActive.includes('process')
  const hasBoardPressure = allActive.includes('board')
  const hasMonetisation = allActive.includes('pricing')
  const hasRetentionRisk = allActive.includes('client') || nowThemes.includes('retention')

  let winningAspiration =
    'A business that delivers reliably, charges what it is worth, and grows on purpose - not by accident.'
  let howToWin =
    'Choose one lane for the next 90 days: protect capacity, sharpen the core offer, then monetise deliberately.'
  let whereBullets = [
    'Core clients and core offer - depth before breadth',
    'The work you already win - not net-new bets this quarter',
    'Internal leadership bandwidth - one narrative, three bets',
  ]
  let howBullets = [
    'Say no in public - parked items are part of the strategy',
    'Fix delivery and economics before visibility projects',
    'One owner per bet - named in the room, not in a footnote',
  ]
  let capBullets = [
    'Leadership alignment on tradeoffs (board-ready story)',
    'Capacity map - who does what, and what stops',
    'Lightweight rhythm to review, not rewrite, the plan',
  ]

  if (hasCapacityCrunch && hasBoardPressure) {
    winningAspiration =
      'Reliable delivery and a credible story - so the board trusts the plan and the team can execute without burning out.'
    howToWin =
      'Stabilise delivery and align the board on a 90-day cascade before any growth, product, or marketing expansion.'
    whereBullets = [
      'Existing clients and live delivery - protect NPS and margin',
      'Roles and workflows that remove bottlenecks - not new initiatives',
      'Board and leadership - one page, one narrative, fortnightly proof',
    ]
  } else if (hasRetentionRisk) {
    winningAspiration =
      'Keep the clients that matter while you fix how the business runs - retention and reliability together.'
    howToWin =
      'Win on trust and delivery for key accounts before you chase new logos or new offers.'
    whereBullets = [
      'Top accounts and the work that funds the business',
      'Client-facing leaders - relationship and delivery in one view',
      'Issues that signal churn risk - not broad market experiments',
    ]
    capBullets = [
      'Account ownership and escalation paths',
      'Delivery reliability metrics clients can feel',
      'Pricing and scope conversations that match value delivered',
    ]
  } else if (hasMonetisation || dominantNow === 'monetisation') {
    winningAspiration =
      'Same team, better economics - capture the value you already create before expanding the offer.'
    howToWin =
      'Fix pricing, packaging, and proof of value on the core offer before new channels or products.'
    howBullets = [
      'Test price and scope with real clients - not spreadsheet theory',
      'Stop habitual discounting; fund change from quick margin wins',
      'Make value visible in how you sell and deliver',
    ]
  } else if (dominantNow === 'product') {
    winningAspiration =
      'One sharp offer, delivered well - expansion only when the foundation is boringly reliable.'
    howToWin =
      'Park net-new builds; validate the resurfacing idea as a concept, not a project, until capacity opens.'
  } else if (dominantNow === 'growth' || allActive.includes('marketing')) {
    winningAspiration =
      'Growth from clarity - a repeatable story and channel, not another half-finished initiative.'
    howToWin =
      'Make the current offer easier to buy with one message and one channel before overhauling brand or site.'
  }

  if (laterIds.includes('product') || laterIds.includes('marketing')) {
    capBullets.push('Discipline to keep parked bets off the roadmap until gates are met')
  }

  return {
    winningAspiration,
    whereToPlay: {
      answer: 'Focus where you can win this quarter - not everywhere you could play eventually.',
      bullets: whereBullets,
    },
    howToWin: { answer: howToWin, bullets: howBullets },
    capabilities: {
      answer: 'The few enablers that must be true for the choices above to work.',
      bullets: capBullets,
    },
    hasCapacityCrunch,
    hasBoardPressure,
    hasMonetisation,
    hasRetentionRisk,
    dominantNow,
  }
}

export function synthesizeStrategy(assignments: Record<string, Lane>): {
  onePager: StrategyOnPage
  deck: DeckSlide[]
} {
  const nowIds = idsInLane(assignments, 'now')
  const nextIds = idsInLane(assignments, 'next')
  const laterIds = idsInLane(assignments, 'later')
  const allActive = [...nowIds, ...nextIds]
  const ctx = buildContext(nowIds, nextIds, laterIds)
  const parked = textFor(laterIds)

  const parkedRationale =
    parked.length > 0
      ? `Explicitly parked so the organisation stops carrying them as background anxiety. Revisit only when ${ctx.hasCapacityCrunch ? 'capacity and delivery gates are met' : 'the 90-day cascade is landing'}.`
      : 'Nothing parked yet - watch for scope creep if every sticky stays "active".'

  const cascade: CascadeStep[] = [
    {
      step: 1,
      label: 'Winning aspiration',
      question: 'What does winning look like?',
      answer: ctx.winningAspiration,
      detail:
        'The north star that every downstream choice must serve. Not a mission poster - a decision filter.',
    },
    {
      step: 2,
      label: 'Where to play',
      question: 'Where will we focus - and where won\'t we?',
      answer: ctx.whereToPlay.answer,
      bullets: ctx.whereToPlay.bullets,
      detail: 'Scope choices: segments, offers, geographies, and leadership attention.',
    },
    {
      step: 3,
      label: 'How to win',
      question: 'How will we win in those choices?',
      answer: ctx.howToWin.answer,
      bullets: ctx.howToWin.bullets,
      detail: 'The strategic integrator - the few moves that connect ambition to action.',
    },
    {
      step: 4,
      label: 'Capabilities & enablers',
      question: 'What must be true - people, process, proof?',
      answer: ctx.capabilities.answer,
      bullets: ctx.capabilities.bullets,
      detail: 'What the organisation needs in place. Not a shopping list - the gating enablers.',
    },
    {
      step: 5,
      label: 'Management systems',
      question: 'How does this run week to week?',
      answer: 'Fortnightly leadership review against this page - 30-day sprints inside a 90-day arc.',
      bullets: [
        'One-page cascade is the source of truth - deck supports, does not replace',
        'Owners named for each "Now" bet; parked items require a swap to enter "Now"',
        'Board updates use slides 1, 3, 5, and 8 - not a new story every month',
      ],
    },
  ]

  const onePager: StrategyOnPage = {
    headline: 'Strategy on a Page · Choice cascade',
    frameworkLabel: 'Modern strategy choice cascade',
    situation: `Nine competing signals, one stretched team, and leadership that needs choices they can defend. This page follows the cascade used by top-tier strategy firms - ambition, focus, advantage, enablers, then execution - without the 100-slide binder.`,
    cascade,
    now30: {
      title: 'Management systems · Next 30 days',
      items: buildActions(nowIds, 'now'),
    },
    next90: {
      title: 'Management systems · Days 31-90',
      items: buildActions(nextIds, 'next'),
    },
    notNow: {
      title: 'Where we are not playing (this quarter)',
      rationale: parkedRationale,
      parked,
    },
    metrics: [
      'Delivery: committed vs completed work each fortnight',
      'Focus: no more than 3 company-level "Now" bets active',
      ctx.hasMonetisation
        ? 'Economics: average deal value, discount rate, or margin on new work'
        : 'Pipeline: quality and conversion on core offer - not volume for its own sake',
      ctx.hasRetentionRisk
        ? 'Retention: health of top accounts - leading indicators, not surprises'
        : 'Alignment: leadership explains the cascade in under two minutes',
      'Cascade integrity: parked list unchanged unless something swaps off it',
    ],
    reviewRhythm:
      'Fortnightly 45-minute cascade review: ambition still true? focus held? metrics moving? Adjust bets - do not rewrite the strategy every meeting.',
  }

  const tensionLabel = ctx.hasCapacityCrunch
    ? 'capacity vs ambition'
    : ctx.hasRetentionRisk
      ? 'retention vs distraction'
      : ctx.hasBoardPressure
        ? 'clarity vs activity'
        : 'growth vs focus'

  const deck: DeckSlide[] = [
    {
      number: 1,
      title: 'Executive context',
      subtitle: 'Slide 1 · Situation & ambition',
      cascadeStep: 'Winning aspiration',
      intro:
        'Sets the case for change and the definition of winning. Board and leadership align on why this cascade exists.',
      bullets: [
        'Multiple valid priorities are creating drag - effort is not the constraint, choice is.',
        `Dominant tension from your sort: ${tensionLabel}.`,
        'The cost of "everything is important" is slow delivery, tired leaders, and clients who feel the stretch.',
      ],
      subsections: [
        {
          title: 'Winning aspiration (decision filter)',
          items: [ctx.winningAspiration, 'Used to approve or reject work that does not serve the next 90 days.'],
        },
        {
          title: 'What leadership must align on today',
          items: [
            'This is a choice cascade - each level constrains the next',
            'Parked items are strategic; they protect focus',
            'Owners and dates matter as much as words on the page',
          ],
        },
      ],
    },
    {
      number: 2,
      title: 'Where to play',
      subtitle: 'Slide 2 · Scope & focus choices',
      cascadeStep: 'Where to play',
      intro:
        'Defines the playing field: which clients, offers, channels, and leadership attention are in - and explicitly out - for this quarter.',
      bullets: [ctx.whereToPlay.answer],
      subsections: [
        {
          title: 'In scope this quarter',
          items: ctx.whereToPlay.bullets,
        },
        {
          title: 'Evidence from the prioritisation exercise',
          items: [
            ...textFor(nowIds).slice(0, 3).map((t) => `Now signals focus: ${t}`),
            ...textFor(nextIds).slice(0, 2).map((t) => `Next signals sequence: ${t}`),
          ],
        },
        {
          title: 'Out of scope (unless swap from Park)',
          items:
            parked.length > 0
              ? parked.map((p) => p)
              : ['Net-new bets that do not serve the winning aspiration this quarter'],
        },
      ],
    },
    {
      number: 3,
      title: 'How to win',
      subtitle: 'Slide 3 · Strategic integrator',
      cascadeStep: 'How to win',
      intro:
        'The integrator choice - how you will win in the chosen arenas. This is where strategy becomes actionable tradeoffs, not slogans.',
      bullets: [ctx.howToWin.answer, ...ctx.howToWin.bullets],
      subsections: [
        {
          title: 'What we will not do (even if tempting)',
          items: [
            'No parallel "shadow" strategies for different audiences',
            'No new initiatives without a parked swap',
            ctx.hasCapacityCrunch
              ? 'No growth projects until delivery metrics stabilise'
              : 'No brand or product resets before economics and offer clarity',
          ],
        },
        {
          title: 'Implications for leadership',
          items: [
            'Decisions faster - with explicit tradeoffs on the record',
            'Communicate the "no" as clearly as the "yes"',
            'Use this slide in every board update until the cascade holds',
          ],
        },
      ],
    },
    {
      number: 4,
      title: 'Capabilities & enablers',
      subtitle: 'Slide 4 · What must be true',
      cascadeStep: 'Capabilities & enablers',
      intro:
        'Maps the few organisational enablers required for the where-to-play and how-to-win choices to be credible.',
      bullets: [ctx.capabilities.answer, ...ctx.capabilities.bullets],
      subsections: [
        {
          title: 'Capability gaps implied by your sort',
          items: [
            ctx.hasCapacityCrunch ? 'Delivery capacity and workflow clarity' : 'Commercial clarity on core offer',
            ctx.hasBoardPressure ? 'Board narrative and governance rhythm' : 'Cross-functional ownership of priorities',
            ctx.hasRetentionRisk ? 'Key account stewardship and early warning' : 'Repeatable sales and delivery story',
            allActive.includes('process') ? 'Documented handoffs - not tribal knowledge' : 'Metrics leaders actually review',
          ],
        },
        {
          title: 'Enablers we will build (not buy all at once)',
          items: [
            'Lightweight - owners, rituals, and measures before tools',
            'Pilot in one team or client segment, then scale',
            'Tie each enabler to a metric on slide 8',
          ],
        },
      ],
    },
    {
      number: 5,
      title: '30-day execution',
      subtitle: 'Slide 5 · Management systems · Now',
      cascadeStep: 'Management systems',
      intro:
        'Near-term bets that protect focus and prove the cascade is real. Each item has an owner, a date, and a link to slide 8 metrics.',
      bullets: onePager.now30.items.map((i) => i.action),
      subsections: [
        {
          title: 'Now bets · action & rationale',
          items: onePager.now30.items.flatMap((i) => [i.action, `Why: ${i.why}`]),
        },
        {
          title: 'Operating rules for the next 30 days',
          items: [
            'Maximum three company-level "Now" items active',
            'Weekly check: still the right Now? swap from Park if not',
            'No new work without a named swap off the cascade',
          ],
        },
      ],
    },
    {
      number: 6,
      title: '90-day execution',
      subtitle: 'Slide 6 · Management systems · Next',
      cascadeStep: 'Management systems',
      intro:
        'Sequenced bets that follow once Now stabilises. This is the bridge from firefighting to deliberate momentum.',
      bullets:
        onePager.next90.items.length > 0
          ? onePager.next90.items.map((i) => i.action)
          : ['Convert "Next" priorities into dated bets with owners at day-30 review'],
      subsections: [
        {
          title: 'Next bets · action & rationale',
          items:
            onePager.next90.items.length > 0
              ? onePager.next90.items.flatMap((i) => [i.action, `Why: ${i.why}`])
              : ['Sequence follows capacity gate - not calendar optimism'],
        },
        {
          title: 'Gate to move Next → Now',
          items: [
            ctx.hasCapacityCrunch
              ? 'Delivery: committed vs completed within agreed band'
              : 'Commercial: pricing or scope test completed with evidence',
            'Leadership sign-off that focus held for 30 days',
            'Parked list unchanged or consciously swapped',
          ],
        },
      ],
    },
    {
      number: 7,
      title: 'Tradeoffs & parked',
      subtitle: 'Slide 7 · Where we are not playing',
      cascadeStep: 'Where to play (negative space)',
      intro:
        'Documents what is intentionally not pursued this quarter. Protects the cascade from scope creep and political re-litigation.',
      bullets: [
        parkedRationale,
        'New initiatives require a parked swap - no hidden roadmap',
        'Revisit Park only at cascade review, not when someone gets excited',
      ],
      subsections: [
        {
          title: 'Parked this quarter',
          items: parked.length > 0 ? parked : ['No explicit park list - risk of overload remains'],
        },
        {
          title: 'Common failure modes we are avoiding',
          items: [
            '"Everything is priority" → nothing finishes',
            'Strategy deck lives separately from weekly decisions',
            'Board hears a new story each month instead of progress on one cascade',
          ],
        },
      ],
    },
    {
      number: 8,
      title: 'Metrics & rhythm',
      subtitle: 'Slide 8 · Proof the cascade is alive',
      cascadeStep: 'Management systems',
      intro:
        'Defines how you know the strategy is working - and the cadence that keeps the cascade current without rewriting it.',
      bullets: onePager.metrics,
      subsections: [
        {
          title: 'Review rhythm',
          items: [
            onePager.reviewRhythm,
            'Agenda: aspiration still true? focus held? metrics moving? swap bets if needed',
            'Output: one-page update - not a new deck from scratch',
          ],
        },
        {
          title: 'Ownership & governance',
          items: [
            'Executive sponsor for the cascade (single throat to choke)',
            'One owner per Now bet - named on slide 5',
            'Board pack: slides 1, 3, 5, 8 until metrics stabilise',
          ],
        },
      ],
    },
  ]

  return { onePager, deck }
}

export function partialInsight(assignments: Record<string, Lane>): string | null {
  const count = Object.keys(assignments).length
  if (count === 0) return null
  if (count < 4) return 'Patterns are forming - keep sorting. We synthesise through a choice cascade, not labels.'
  const nowIds = idsInLane(assignments, 'now')
  if (themesIn(nowIds).includes('capacity')) {
    return 'Capacity in "Now" usually means protect the team before you grow - the cascade will reflect that.'
  }
  if (nowIds.includes('client')) {
    return 'Retention in "Now" shifts the winning aspiration - the full output will prioritise trust and delivery.'
  }
  return 'Almost there - the cascade and deck interpret your choices with consulting depth, not a list.'
}
