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
    themeLabel: 'Growth & Go-to-Market',
    headline: 'Commercial intelligence that tells you where to focus — before you commit.',
    summary:
      'A desktop growth intelligence prototype with guided journeys for sales leaders, account managers, and executives — portfolio analysis, risk alerts, AI briefs, and forecast simulations.',
    challenge:
      'Commercial leadership had CRM data, booking stats, and spreadsheets — but no single view to prioritise accounts, respond to sector risk, or simulate revenue impact before acting.',
    approach:
      'We built three role-based journeys inside a working prototype: quarterly focus, at-risk account response, and executive prioritisation — each with simulated AI and measurable outcomes.',
    outcome:
      'Sales and executive teams aligned on Q3 priorities with forecast uplift modelled in the session — validated before CRM and BI integration.',
    humanImage: hiRes(photos.demoAirport),
    humanImageAlt: 'Traveller at an airport window, looking out at aircraft',
    accentColor: '#0c4a6e',
    device: 'desktop',
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
    themeLabel: 'Strategy & Structure',
    headline: 'Strategic planning that turns ambiguity into aligned action.',
    summary:
      'An interactive planning workspace with guided journeys for new ideas, transformation programs, and leadership workshops — opportunity canvas, scenario planning, and AI-assisted facilitation.',
    challenge:
      'Leadership had strategic questions but no shared workspace — ideas lived in decks, workshops produced sticky notes, and priorities shifted every quarter without a clear record.',
    approach:
      'We built three guided journeys: business idea validation, transformation roadmap, and leadership alignment — each with simulated AI, scenario planning, and measurable outcomes.',
    outcome:
      'Executive team aligned on Q3 priorities with a phased roadmap — validated before investing in OKR and program management integration.',
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
