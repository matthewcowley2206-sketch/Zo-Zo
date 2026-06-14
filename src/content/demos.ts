import { hiRes, localImages, photos, siteImage } from './imageUrls'

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
  device?: 'phone' | 'desktop'
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
    humanImage: hiRes(photos.demoAirport),
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
    humanImage: hiRes(photos.demoCafe),
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
    humanImage: hiRes(photos.demoLegal),
    humanImageAlt: 'Professional team reviewing documents and outcomes together',
    accentColor: '#1e3a5f',
  },
  {
    id: 'brightline-studio',
    clientName: 'Brightline Studio',
    sector: 'Creative & digital',
    headline: 'From inbox chaos to a quote you can stand behind.',
    summary:
      'A scope-and-quote workflow prototype: paste a vague enquiry, generate editable scope blocks, pick a quote tier, and send a preview - before anyone opened Excel.',
    challenge:
      'A growing brand studio was losing half a day on every hot lead - interpreting vague briefs, debating scope internally, then sending quotes everyone second-guessed.',
    approach:
      'We mapped the scoping workflow with leadership, built a simulated AI draft experience, and tested three quote tiers in a single clickable prototype.',
    outcome:
      'Aligned on scope and pricing before CRM or e-sign integration - and a validated brief for phase one build.',
    humanImage: hiRes(photos.demoAgency),
    humanImageAlt: 'Creative team reviewing strategy on a whiteboard in a bright studio',
    accentColor: '#0f766e',
    device: 'desktop',
  },
]

export function getProjectDemo(id: string): ProjectDemo | undefined {
  return projectDemos.find((d) => d.id === id)
}

export const humanImagery = {
  hero: siteImage(localImages.homeHero),
  heroAlt:
    'Diverse team collaborating around a table with laptops in a bright, modern workspace',
  heroObjectPosition: '34% 35%',
} as const
