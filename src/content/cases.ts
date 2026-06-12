export type CaseStudy = {
  id: string
  sector: string
  clientName: string
  challenge: string
  approach: string
  outcome: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'horizon-airways',
    sector: 'Aviation',
    clientName: 'Horizon Airways',
    challenge:
      'A complex passenger experience needed rethinking - fast - without a full build commitment.',
    approach:
      'We mapped the journey, aligned stakeholders, and built a working mobile prototype the team could interact with and test.',
    outcome:
      'Clear direction, shared understanding, and confidence before development dollars were allocated.',
  },
  {
    id: 'phoenix-coffee',
    sector: 'Hospitality',
    clientName: 'Phoenix Coffee',
    challenge:
      'A new digital ordering experience needed real-world validation before launch investment.',
    approach:
      'We built a clickable order flow with menu, customisation, cart, and loyalty - ready to test with the team.',
    outcome:
      'A validated customer journey and a sharper go-to-market plan without building the wrong product first.',
  },
  {
    id: 'northgate-legal',
    sector: 'Professional services',
    clientName: 'Northgate Legal',
    challenge:
      'Internal teams needed a clearer way to explore a new client portal - beyond slides and meetings.',
    approach:
      'We structured the problem, simplified the options, and mocked up a working portal leadership could evaluate in context.',
    outcome:
      'Faster alignment and a sharper brief for what to build next.',
  },
]

export const sectors = ['All', 'Aviation', 'Hospitality', 'Professional services'] as const
