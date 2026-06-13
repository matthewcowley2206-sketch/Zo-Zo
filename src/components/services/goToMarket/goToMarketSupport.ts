export type BlueprintBlockId =
  | 'offer'
  | 'audience'
  | 'messaging'
  | 'launch'
  | 'pricing'
  | 'test'

export type LaunchWeek = {
  week: string
  focus: string
  activities: string[]
}

export type BlueprintBlock = {
  id: BlueprintBlockId
  label: string
  tagline: string
  summary: string
  whatWeDo: string
  deliverables: string[]
  example: string
  outcome: string
  weeks?: LaunchWeek[]
  gridClass: string
}

export const launchSample = {
  offerName: 'Advisory sprint · new market entry',
  readinessLabel: 'Launch blueprint',
}

export const blueprintBlocks: BlueprintBlock[] = [
  {
    id: 'offer',
    label: 'Offer clarity',
    tagline: 'Sharpen what you sell',
    summary: 'Who it is for, why they care, and how you are different.',
    whatWeDo:
      'We pressure-test your offer in plain language - what problem it solves, who buys it, and why now - before you spend on launch activity.',
    deliverables: ['Go-to-Market Strategy Pack (10-15 slides)', 'Offer definition your team can repeat'],
    example:
      'A fixed-scope advisory sprint for mid-market CEOs entering a new region - not generic consulting hours.',
    outcome: 'Everyone describes the offer the same way.',
    gridClass: 'sm:col-span-1',
  },
  {
    id: 'audience',
    label: 'Audience & profiles',
    tagline: 'Reach the right people',
    summary: 'Segments, profiles, and where your buyers actually are.',
    whatWeDo:
      'We define who you are launching to - primary and secondary segments, customer profiles, and the channels where they pay attention.',
    deliverables: ['Audience segmentation and customer profiles'],
    example:
      'Primary: CEOs of $5-20M firms expanding interstate. Secondary: COOs tasked with making the launch happen.',
    outcome: 'Launch effort focuses on buyers who convert - not everyone.',
    gridClass: 'sm:col-span-1',
  },
  {
    id: 'messaging',
    label: 'Messaging framework',
    tagline: 'Say it clearly',
    summary: 'Value proposition and messages that explain the offer fast.',
    whatWeDo:
      'We build a messaging framework - headline, proof points, objections, and talk tracks - so sales, marketing, and founders say the same thing.',
    deliverables: ['Refined value proposition and messaging framework'],
    example:
      '"Enter a new market with a plan you can run in 90 days - not a strategy deck that sits on the shelf."',
    outcome: 'Your offer lands in the first conversation.',
    gridClass: 'sm:col-span-2',
  },
  {
    id: 'launch',
    label: 'Launch plan',
    tagline: 'Week by week',
    summary: 'A realistic sequence your team can execute.',
    whatWeDo:
      'We map a simple weekly launch plan - what happens when, who owns it, and what good looks like at each stage. Built for capacity, not fantasy.',
    deliverables: ['Launch plan with a simple weekly sequence'],
    example:
      'Four weeks: validate with warm accounts, soft launch, channel push, then review and iterate.',
    outcome: 'Launch day is the start of a plan - not the whole plan.',
    gridClass: 'sm:col-span-2',
    weeks: [
      {
        week: 'Week 1',
        focus: 'Validate',
        activities: ['5 target account conversations', 'Refine message from feedback'],
      },
      {
        week: 'Week 2',
        focus: 'Soft launch',
        activities: ['Warm network outreach', 'Landing page or one-pager live'],
      },
      {
        week: 'Week 3',
        focus: 'Reach',
        activities: ['LinkedIn + email sequence', 'Partner or referral push'],
      },
      {
        week: 'Week 4',
        focus: 'Learn',
        activities: ['Review conversion data', 'Adjust offer or channel'],
      },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing & structure',
    tagline: 'Price with confidence',
    summary: 'Offer structure and pricing guidance that fits the market.',
    whatWeDo:
      'We help you structure the offer and set pricing that matches value and buyer expectations - packages, anchors, and how to present it.',
    deliverables: ['Pricing guidance and offer structure templates'],
    example:
      'Three tiers: diagnostic ($), sprint ($$), embedded ($$$) - with a clear default recommendation for first-time buyers.',
    outcome: 'Pricing conversations feel confident - not improvised.',
    gridClass: 'sm:col-span-1',
  },
  {
    id: 'test',
    label: 'Test & learn',
    tagline: 'Launch fast, learn faster',
    summary: 'Small bets, clear metrics, room to improve.',
    whatWeDo:
      'We design a test-and-learn plan - what you are betting on, how you measure it, and when to pivot vs persevere - so launch risk drops without slowing you down.',
    deliverables: ['Test-and-learn plan to launch quickly and improve'],
    example:
      'Bet: CEOs will book a clarity call from LinkedIn. Measure: 8 calls in 30 days. Decision: double down on content if yes, rework message if no.',
    outcome: 'You learn from the market - not from guesswork.',
    gridClass: 'sm:col-span-1',
  },
]

export const activityTitle = 'Your launch blueprint'
export const activityIntro =
  'Six building blocks for a confident go-to-market. Tap each block to see how we help and what you leave with.'
