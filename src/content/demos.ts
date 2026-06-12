export type ProjectDemo = {
  id: string
  clientName: string
  sector: string
  headline: string
  summary: string
  challenge: string
  approach: string
  outcome: string
  humanImage: string
  humanImageAlt: string
  accentColor: string
}

export const projectDemos: ProjectDemo[] = [
  {
    id: 'horizon-airways',
    clientName: 'Horizon Airways',
    sector: 'Aviation',
    headline: 'Loyalty, booking, and check-in - in one app you can actually test.',
    summary:
      'A working mobile prototype for Horizon Miles: tier status, award booking, miles redemption, check-in, and lounge access - simplified from a global airline loyalty replatform.',
    challenge:
      'Leadership needed to rethink the frequent-flyer experience - loyalty, booking, and airport journey together - without committing to a full platform rebuild.',
    approach:
      'We mapped the loyalty-led journey, aligned stakeholders on priority flows, and built a clickable prototype covering miles balance through boarding.',
    outcome:
      'Shared understanding across teams, faster decisions, and a validated brief before development spend.',
    humanImage:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    humanImageAlt: 'Traveller at an airport window, looking out at aircraft',
    accentColor: '#0c4a6e',
  },
  {
    id: 'phoenix-coffee',
    clientName: 'Phoenix Coffee',
    sector: 'Hospitality',
    headline: 'Order, customise, and reward - a coffee experience you can actually try.',
    summary:
      'A mobile ordering prototype with loyalty tiers, scheduled pickup, favourites, and rewards redemption - tested with store managers before launch investment.',
    challenge:
      'A growing coffee brand wanted to launch digital ordering but needed to validate flows and offers with real interactions first.',
    approach:
      'We designed and built a working order flow - menu, customisation, cart, and loyalty progress - ready to click through and share.',
    outcome:
      'A validated customer journey and a sharper go-to-market plan, without building the wrong product first.',
    humanImage:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
    humanImageAlt: 'Barista pouring latte art in a warm cafe',
    accentColor: '#92400e',
  },
  {
    id: 'northgate-legal',
    clientName: 'Northgate Legal',
    sector: 'Professional services',
    headline: 'A client portal teams could evaluate in context - not in a meeting deck.',
    summary:
      'A client portal prototype with matter tracking, secure messaging, document upload, and invoice visibility - built so partners could navigate it themselves.',
    challenge:
      'Partners needed to explore a new digital capability but could not agree direction from wireframes and presentations alone.',
    approach:
      'We structured the problem, simplified the options, and delivered a working portal prototype leadership could navigate themselves.',
    outcome:
      'Faster alignment, clearer requirements, and confidence in what to build next.',
    humanImage:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    humanImageAlt: 'Professional team collaborating around a table',
    accentColor: '#1e3a5f',
  },
]

export function getProjectDemo(id: string): ProjectDemo | undefined {
  return projectDemos.find((d) => d.id === id)
}

export const humanImagery = {
  hero:
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80',
  heroAlt: 'Business owner in conversation, planning the path forward',
  about:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
  aboutAlt: 'Matthew Cowley, founder of Zo and Zo Advisory',
  working:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  workingAlt: 'Team reviewing a prototype together on screen',
} as const
