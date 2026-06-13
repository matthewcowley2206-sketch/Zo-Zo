export type SupportAreaId = 'positioning' | 'gtm' | 'journey' | 'assets'

export type SupportArea = {
  id: SupportAreaId
  label: string
  tagline: string
  summary: string
  whatWeDo: string
  deliverables: string[]
  example: string
  outcome: string
}

export const supportAreas: SupportArea[] = [
  {
    id: 'positioning',
    label: 'Positioning',
    tagline: 'Say who you are for',
    summary: 'A clear statement in plain English - not marketing jargon.',
    whatWeDo:
      'We help you articulate who you serve, why they choose you, and what makes you different. The goal is one message your whole team can repeat without sounding generic.',
    deliverables: [
      'Positioning statement in plain English',
      'Value proposition your sales team can use on a call',
      'Messaging refreshes for website, decks, and key touchpoints',
    ],
    example:
      '"For mid-market professional services firms who need clarity without a big agency - we turn scattered marketing into a message and plan the team can actually run."',
    outcome: 'Everyone explains your value the same way - in one breath.',
  },
  {
    id: 'gtm',
    label: 'Go-to-market plan',
    tagline: 'Plan you can run',
    summary: 'Channels, content rhythm, and focus - sized to your capacity.',
    whatWeDo:
      'We build a go-to-market plan around where your audience actually is, not every channel at once. Simple content cadence, realistic reach, and priorities that fit your team.',
    deliverables: [
      'Go-to-market plan with channel priorities',
      'Simple content plan for consistent visibility',
      '90-day rhythm your marketing team can follow',
    ],
    example:
      'LinkedIn thought leadership fortnightly, two targeted events per quarter, and one case-led email per month - not ten channels with no follow-through.',
    outcome: 'Marketing stops feeling like guesswork or burnout.',
  },
  {
    id: 'journey',
    label: 'Customer journey',
    tagline: 'Map where you win and lose',
    summary: 'See how prospects find you, where they drop off, and what to fix.',
    whatWeDo:
      'We outline the customer journey from first touch to close - where you win attention, where you lose people, and what needs to change at each stage. No complex diagrams for the sake of it.',
    deliverables: [
      'Customer journey outline with key stages',
      'Leak points and fix priorities annotated',
      'Handoff clarity between marketing and sales',
    ],
    example:
      'Strong first meetings, weak follow-up - the journey map flags post-demo silence as the drop-off and prioritises a nurture sequence.',
    outcome: 'You know where to focus instead of guessing what is broken.',
  },
  {
    id: 'assets',
    label: 'Sales assets',
    tagline: 'Equip the team on the road',
    summary: 'Pitch packs and materials so sales and marketing say the same thing.',
    whatWeDo:
      'We create practical sales assets - pitch packs, talk tracks, and deck structure - so your team shows up consistent whether they are in a room, on a call, or sending a follow-up.',
    deliverables: [
      'Sales pitch packs for key scenarios',
      'Talk tracks aligned to positioning',
      'Deck and one-pager structure ready to customise',
    ],
    example:
      'A three-slide opener, objection handling sheet, and follow-up email template - all using the same positioning language.',
    outcome: 'Sales and marketing pull in the same direction.',
  },
]

export const supportFlowHeadline = 'Positioning → Plan → Journey → Assets'

export const supportFlowIntro =
  'Four areas of support that connect positioning to action. Tap any area to see how we help and what you leave with.'
