/** High-resolution Unsplash URLs - people-first, contextual imagery. Each ID used once site-wide. */
export function hiRes(photoId: string, width = 1800): string {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=85`
}

export const SITE_ORIGIN = 'https://www.zoandzo.com.au'

/** Local images in public/images/ — works on Vercel and GitHub Pages via BASE_URL. */
export function siteImage(filename: string) {
  return `${import.meta.env.BASE_URL}images/${filename}`
}

/** Absolute URL for Open Graph / social previews (must be fully qualified). */
export function absoluteSiteImage(filename: string) {
  return `${SITE_ORIGIN}/images/${filename}`
}

export const localImages = {
  homeHero: 'home-hero.jpg',
  prototypeDevelopmentHero: 'prototype-development-hero.jpg',
} as const

export const photos = {
  strategyTeam: 'photo-1522202176988-66273c2fd55f',
  strategyWhiteboard: 'photo-1553877522-43269d4ea984',
  clientConversation: 'photo-1517245386807-bb43f82c33c4',
  clientListeningConversation: 'photo-1573496359142-b8d87734a5a2',
  salesMeeting: 'photo-1552664730-d307ca884978',
  salesCollaboration: 'photo-1556761175-4b46a572b786',
  commPresentation: 'photo-1542744173-8e7e53415bb0',
  commDiscussion: 'photo-1551836022-d5d88e9218df',
  dataTeam: 'photo-1519389950473-47ba0277781c',
  dataInsights: 'photo-1460925895917-afdab827c52f',
  opsPlanning: 'photo-1556761175-b413da4baf72',
  opsAlignment: 'photo-1560250097-0b93528c311a',
  prototypeReview: 'photo-1522071820081-009f0129c71c',
  opsWorkshop: 'photo-1529156069898-49953e39b3ac',
  gtmPlanning: 'photo-1758518731706-be5d5230e5a5',
  gtmStakeholders: 'photo-1521791136064-7986c2920216',
  demoAirport: 'photo-1436491865332-7a61a109cc05',
  demoCafe: 'photo-1495474472287-4d71bcdd2085',
  demoLegal: 'photo-1551288049-bebda4e38f71',
} as const
