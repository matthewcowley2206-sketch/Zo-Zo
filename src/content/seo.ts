import { engagementFaq } from './howWeWork'
import { hiRes, photos } from './imageUrls'
import { services, type Service } from './services'
import { site } from './site'

export const SITE_URL = 'https://www.zoandzo.com.au'

export const defaultOgImage = hiRes(photos.homeHero, 1200)

export type FaqItem = {
  question: string
  answer: string
}

export type PageSeo = {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article'
  noindex?: boolean
  faq?: FaqItem[]
  service?: Service
}

/** Plain-language entity summary for humans and answer engines. */
export const entitySummary =
  'Zo&Zo Advisory is a Sydney-based business advisory helping growing companies across Australia turn complexity into clarity. We combine strategy, client listening, operations, data and AI guidance, and working prototypes you can click through before committing to full development.'

export const homeFaqs: FaqItem[] = [
  {
    question: 'What does Zo&Zo Advisory do?',
    answer:
      'We help growing business owners make clearer decisions and test ideas with working prototypes. Services include strategy and direction, client listening, sales and marketing clarity, communication, data and AI, operations simplification, go-to-market planning, and prototype development.',
  },
  {
    question: 'Who is Zo&Zo Advisory for?',
    answer:
      'Owners and leaders juggling growth, operations, and big decisions who want practical help - not generic frameworks. We work with businesses across Australia, in person in Sydney or online worldwide.',
  },
  {
    question: 'What makes Zo&Zo different from other advisors?',
    answer:
      'We do not stop at slide decks. Where it matters, we build working prototypes so you can click, share, and test before serious development spend - alongside strategy, listening, and operational clarity.',
  },
  {
    question: 'How do I start working with Zo&Zo?',
    answer:
      'Book a free clarity call or send a message through the contact form. We listen first, recommend what fits, and scope clear deliverables if we are the right match.',
  },
]

const staticPageMeta: Record<string, Omit<PageSeo, 'path'>> = {
  '/': {
    title: 'Zo&Zo Advisory | Business Strategy & Working Prototypes · Sydney',
    description:
      'Sydney-based business advisory for growing companies across Australia. Strategy, client listening, operations, and working prototypes you can test before full development.',
    ogType: 'website',
    faq: homeFaqs,
  },
  '/how-we-work': {
    title: 'How We Work | Zo&Zo Advisory',
    description:
      'Five steps from first conversation to moving forward. Free clarity call, honest fit check, and scoped engagements with deliverables you can hold us to.',
    faq: [...engagementFaq],
  },
  '/services': {
    title: 'Advisory Services | Strategy, Prototypes & Client Insight · Zo&Zo',
    description:
      'Explore Zo&Zo Advisory services: prototype development, strategy, client listening, sales and marketing, communication, data and AI, operations, and go-to-market.',
  },
  '/about': {
    title: 'About Zo&Zo Advisory | Sydney Business Strategy Partner',
    description:
      'Zo&Zo Advisory turns big-business thinking into practical results for growing companies. Founded by Matthew Cowley, Sydney-based and Australia-wide.',
  },
  '/contact': {
    title: 'Contact Zo&Zo Advisory | Book a Free Clarity Call',
    description:
      'Start the conversation with Zo&Zo Advisory. Book a free initial consultation or send a message - Sydney-based, working across Australia and online worldwide.',
  },
}

export function getServiceSeo(service: Service): PageSeo {
  const descriptions: Record<string, string> = {
    'prototype-development':
      'Build clickable working prototypes before full development. Test ideas, align stakeholders, and validate direction with Zo&Zo Advisory.',
    strategy:
      'Strategy and direction for growing businesses. Cut through competing priorities and leave with a plan your team can actually follow.',
    'client-listening':
      'Structured client listening programs, NPS and CSAT, and insight that feeds strategy - not slide decks that gather dust.',
    'sales-marketing':
      'Sales and marketing clarity for growing businesses. Positioning, customer journey, and materials your team can use consistently.',
    communication:
      'Communication and clarity for change, launches, and leadership messaging. Story-driven materials your people can actually deliver.',
    'data-ai':
      'Practical data, AI, and insights advisory. Dashboards, automations, and roadmaps your team can adopt without a major IT project.',
    operations:
      'Operations simplification and workflow design. Map what happens today, automate the repetitive, and document how it works.',
    'go-to-market':
      'Go-to-market planning you can execute week by week. Sharpen the offer, define the audience, and test before you scale.',
  }

  return {
    title: `${service.title} Advisory · Zo&Zo · Sydney & Australia`,
    description: descriptions[service.slug] ?? service.summary,
    path: `/services/${service.slug}`,
    ogType: 'article',
    faq: service.faq,
    service,
  }
}

export function resolvePageSeo(pathname: string, serviceSlug?: string): PageSeo {
  const normalized = pathname.replace(/\/$/, '') || '/'

  if (serviceSlug) {
    const service = services.find((item) => item.slug === serviceSlug)
    if (service) return getServiceSeo(service)
  }

  const staticMeta = staticPageMeta[normalized]
  if (staticMeta) {
    return { ...staticMeta, path: normalized }
  }

  return {
    title: `${site.name} | ${site.tagline}`,
    description:
      'Zo&Zo Advisory helps growing businesses make clear decisions and test ideas with working prototypes. Sydney-based, Australia-wide.',
    path: normalized,
    noindex: true,
  }
}

export const sitemapPaths = [
  '/',
  '/how-we-work',
  '/services',
  ...services.map((service) => `/services/${service.slug}`),
  '/about',
  '/contact',
]
