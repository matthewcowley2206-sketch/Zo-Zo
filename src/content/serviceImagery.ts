import { hiRes, localImages, photos, siteImage } from './imageUrls'

export type ServiceImage = {
  url: string
  alt: string
  /** Focal point for object-cover crops, e.g. "center 25%" */
  objectPosition?: string
}

export type ServiceImagerySet = {
  hero: ServiceImage
  secondary?: ServiceImage
}

export const serviceImagery: Partial<Record<string, ServiceImagerySet>> = {
  strategy: {
    hero: {
      url: hiRes(photos.strategyTeam),
      alt: 'Small diverse team collaborating around a laptop in a bright workspace',
    },
    secondary: {
      url: hiRes(photos.strategyWhiteboard),
      alt: 'Team working through ideas together at a whiteboard',
    },
  },
  'client-listening': {
    hero: {
      url: hiRes(photos.clientConversation),
      alt: 'Two colleagues in a thoughtful conversation at a table',
    },
    secondary: {
      url: hiRes(photos.clientListeningConversation),
      alt: 'Two professionals in a focused listening conversation at a table',
      objectPosition: 'center 20%',
    },
  },
  'sales-marketing': {
    hero: {
      url: hiRes(photos.salesMeeting),
      alt: 'Marketing team reviewing plans together at a table',
    },
    secondary: {
      url: hiRes(photos.salesCollaboration),
      alt: 'Colleagues discussing positioning and go-to-market together',
    },
  },
  communication: {
    hero: {
      url: hiRes(photos.commPresentation),
      alt: 'Leadership team in a focused presentation and discussion',
    },
    secondary: {
      url: hiRes(photos.commDiscussion),
      alt: 'Diverse team in an open discussion with clear eye contact',
    },
  },
  'data-ai': {
    hero: {
      url: hiRes(photos.dataTeam),
      alt: 'Mixed team reviewing insights together at screens - not a dashboard on its own',
    },
    secondary: {
      url: hiRes(photos.dataInsights),
      alt: 'Colleagues making decisions from shared data in conversation',
    },
  },
  operations: {
    hero: {
      url: hiRes(photos.opsPlanning),
      alt: 'Team mapping a process together in a working session',
    },
    secondary: {
      url: hiRes(photos.opsWorkshop),
      alt: 'Diverse team simplifying a workflow together',
    },
  },
  'prototype-development': {
    hero: {
      url: siteImage(localImages.prototypeDevelopmentHero),
      alt: 'Team collaborating around a tablet while reviewing a digital prototype together',
      objectPosition: 'center center',
    },
    secondary: {
      url: hiRes(photos.opsAlignment),
      alt: 'Colleagues in a working session reacting to a deliverable',
    },
  },
  'go-to-market': {
    hero: {
      url: hiRes(photos.gtmPlanning),
      alt: 'Diverse launch team planning together in a modern office with women and men',
    },
    secondary: {
      url: hiRes(photos.gtmStakeholders),
      alt: 'Stakeholders aligning on launch priorities in conversation',
    },
  },
}
