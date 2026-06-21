import { engagementFaq } from './howWeWork'
import { pricingFaqs } from './pricing'
import { absoluteSiteImage, localImages } from './imageUrls'
import { legacyServiceRedirects } from './redirects'
import { services, type Service } from './services'
import { site } from './site'

export const SITE_URL = 'https://www.zoandzo.com.au'

export const defaultOgImage = absoluteSiteImage(localImages.homeHero)

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
  primaryKeyword?: string
}

/** Plain-language entity summary for humans and answer engines. */
export const entitySummary =
  'Zo&Zo Advisory is a Sydney-based business advisory helping leaders across Australia move from uncertainty to confidence. We help you define the right problem, understand customers and stakeholders, shape strategy, design practical solutions, and test ideas before major investment — so you can decide what to do next with evidence, not guesswork.'

export const homeFaqs: FaqItem[] = [
  {
    question: 'What does Zo&Zo Advisory do?',
    answer:
      'We help leaders move from uncertainty to confidence through a practical method: Understand what is really going on, Structure the opportunity, Prototype ideas before major investment, and Decide with evidence. Capabilities include Client Listening, strategy and operations, test-before-you-invest prototypes, Data & AI advisory, and Growth & Go-to-Market.',
  },
  {
    question: 'Who is Zo&Zo Advisory for?',
    answer:
      'Owners and leaders juggling growth, operations, and big decisions who want practical help - not generic frameworks. We work with businesses across Australia, in person in Sydney or online worldwide.',
  },
  {
    question: 'What makes Zo&Zo different from other advisors?',
    answer:
      'We are not a software development agency. We reduce uncertainty with structure and insight first - and where it matters, build working prototypes and practical AI-enabled tools so you can test before you commit serious spend.',
  },
  {
    question: 'How do I start working with Zo&Zo?',
    answer:
      'Book a free clarity call or send a message through the contact form. We listen first, recommend what fits, and scope clear deliverables if we are the right match.',
  },
]

const staticPageMeta: Record<string, Omit<PageSeo, 'path'>> = {
  '/': {
    title: 'Business Advisory · Uncertainty to Confidence · Zo&Zo · Sydney',
    description:
      'Zo&Zo Advisory helps leaders define the right problem, understand customers, shape strategy, design practical solutions, and test ideas before investment. Sydney-based, Australia-wide.',
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
    title: 'Services · Reduce Uncertainty · Zo&Zo Advisory · Sydney',
    description:
      'Four ways Zo&Zo helps leaders: understand customers, shape strategy, test ideas before investment, and grow with confidence. Client listening, strategy, prototypes, data & AI, and go-to-market.',
  },
  '/about': {
    title: 'About Zo&Zo Advisory | Sydney Business Strategy Partner',
    description:
      'Zo&Zo Advisory turns big-business thinking into practical results for growing companies. Founded by Matthew Cowley, Sydney-based and Australia-wide.',
  },
  '/pricing': {
    title: 'Pricing | Zo&Zo Advisory · Simple Starting Points',
    description:
      'Typical starting points by problem area - client listening, strategy, test-before-you-invest prototypes, data & AI, and Growth & Go-to-Market from $5,500. Fixed quotes after scoping, ex GST.',
    faq: pricingFaqs,
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
      'Test before you invest with working prototypes for apps, workflows, dashboards, and customer journeys. Zo&Zo builds clickable prototypes in Sydney and across Australia so leaders can validate ideas before major spend - not a software development agency.',
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
    'growth-gtm':
      'Growth and go-to-market advisory in one engagement. Positioning, customer journey, launch plan, and sales enablement from $5,500 ex GST.',
  }

  if (service.slug === 'prototype-development') {
    return {
      title: 'Test Before You Invest · Working Prototypes · Zo&Zo Advisory · Sydney',
      description: descriptions[service.slug],
      path: `/services/${service.slug}`,
      ogType: 'article',
      faq: service.faq,
      service,
      primaryKeyword: 'test before you invest',
    }
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
  '/services/prototype-development',
  ...services
    .filter(
      (service) =>
        service.slug !== 'prototype-development' &&
        !Object.keys(legacyServiceRedirects).includes(service.slug),
    )
    .map((service) => `/services/${service.slug}`),
  '/about',
  '/pricing',
  '/contact',
]
