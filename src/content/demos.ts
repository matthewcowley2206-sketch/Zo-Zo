import { hiRes, localImages, photos, siteImage } from './imageUrls'

export type ProjectDemo = {
  id: string
  clientName: string
  sector: string
  themeLabel: string
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
    themeLabel: 'Test Before You Invest',
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
    themeLabel: 'Test Before You Invest',
    headline: 'AI troubleshooting and ops support — before you invest in the platform.',
    summary:
      'An interactive ops prototype with guided fault diagnosis, machine explorer, preventative maintenance, and AI assistant — tested with store managers across six locations before build.',
    challenge:
      'A growing coffee chain faced costly machine downtime and inconsistent troubleshooting — but leadership needed to validate the experience before integrating IoT, service logs, and technician dispatch.',
    approach:
      'We built three guided journeys inside a working mobile prototype: breakdown diagnosis, machine learning, and preventative maintenance — each ending with a measurable business outcome.',
    outcome:
      'Leadership saw estimated callout savings and validated the self-service model — with confidence to invest in production integration.',
    humanImage: hiRes(photos.demoCafe),
    humanImageAlt: 'Barista pouring latte art in a warm cafe',
    accentColor: '#92400e',
  },
  {
    id: 'northgate-legal',
    clientName: 'Northgate Legal',
    sector: 'Professional services',
    themeLabel: 'Opportunity & Insight',
    headline: 'Client listening that turns feedback into strategic intelligence.',
    summary:
      'An interactive insight platform with guided journeys: analyse interview transcripts, generate leadership briefs, and review practice group sentiment — before investing in CRM and analytics integration.',
    challenge:
      'Partners had completed client listening but struggled to turn interview data into priorities leadership could act on — spreadsheets and slide decks were not moving decisions.',
    approach:
      'We built three guided journeys inside a working prototype: transcript analysis, executive brief generation, and practice group review — each ending with measurable outcomes.',
    outcome:
      'Managing partner approved a Q3 client experience program with clear priorities — validated before analytics platform investment.',
    humanImage: hiRes(photos.demoLegal),
    humanImageAlt: 'Professional team reviewing documents and outcomes together',
    accentColor: '#1e3a5f',
    device: 'desktop',
  },
  {
    id: 'brightline-studio',
    clientName: 'Brightline Studio',
    sector: 'Creative & digital',
    themeLabel: 'Prototype & AI Advisory',
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
