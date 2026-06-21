import {
  SITE_URL,
  defaultOgImage,
  entitySummary,
  type FaqItem,
  type PageSeo,
} from '../content/seo'
import { site } from '../content/site'

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized === '/' ? '' : normalized}`
}

function faqPageJsonLd(faq: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

function serviceJsonLd(seo: PageSeo) {
  if (!seo.service) return null

  const base = {
    '@type': 'Service',
    name: seo.service.title,
    description: seo.service.summary,
    provider: {
      '@type': 'ProfessionalService',
      name: site.name,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Australia',
    },
    url: absoluteUrl(seo.path),
  }

  if (seo.service.slug === 'prototype-development') {
    return {
      ...base,
      serviceType: 'Test Before You Invest',
      category: 'Business Consulting',
      alternateName: [
        'Working prototype development',
        'Prototype development for decision support',
        'Clickable prototype services',
      ],
      offers: {
        '@type': 'Offer',
        price: '8500',
        priceCurrency: 'AUD',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '8500',
          priceCurrency: 'AUD',
          valueAddedTaxIncluded: false,
        },
        availability: 'https://schema.org/InStock',
        url: absoluteUrl('/pricing'),
      },
    }
  }

  return base
}

function breadcrumbJsonLd(seo: PageSeo) {
  const items = [{ name: 'Home', path: '/' }]

  if (seo.path.startsWith('/services/')) {
    items.push({ name: 'Services', path: '/services' })
    items.push({ name: seo.service?.title ?? 'Service', path: seo.path })
  } else if (seo.path !== '/') {
    const labels: Record<string, string> = {
      '/how-we-work': 'How we work',
      '/services': 'Services',
      '/about': 'About',
      '/pricing': 'Pricing',
      '/contact': 'Contact',
    }
    items.push({ name: labels[seo.path] ?? site.name, path: seo.path })
  } else {
    return null
  }

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildJsonLd(seo: PageSeo): Record<string, unknown> {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#organization`,
      name: site.name,
      url: SITE_URL,
      email: site.email,
      description: entitySummary,
      slogan: site.tagline,
      knowsAbout: [
        'Test Before You Invest',
        'Working Prototypes',
        'Business Strategy',
        'Client Listening',
        'Growth and Go-to-Market',
      ],
      areaServed: {
        '@type': 'Country',
        name: 'Australia',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sydney',
        addressRegion: 'NSW',
        postalCode: '2207',
        addressCountry: 'AU',
      },
      founder: {
        '@type': 'Person',
        name: site.founderName,
        jobTitle: site.founderTitle,
      },
      sameAs: site.sameAs,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: site.name,
      description: entitySummary,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-AU',
    },
    {
      '@type': 'WebPage',
      '@id': `${absoluteUrl(seo.path)}#webpage`,
      url: absoluteUrl(seo.path),
      name: seo.title,
      description: seo.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-AU',
    },
  ]

  const service = serviceJsonLd(seo)
  if (service) graph.push(service)

  const breadcrumb = breadcrumbJsonLd(seo)
  if (breadcrumb) graph.push(breadcrumb)

  if (seo.faq?.length) {
    graph.push(faqPageJsonLd(seo.faq))
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

export function upsertMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string | undefined,
) {
  if (!content) return

  const selector = `meta[${attribute}="${key}"]`
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

export function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null

  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.appendChild(element)
  }

  element.href = href
}

export function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let element = document.getElementById(id) as HTMLScriptElement | null

  if (!element) {
    element = document.createElement('script')
    element.id = id
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify(data)
}

export function getOpenGraphPayload(seo: PageSeo) {
  const image =
    seo.service?.slug === 'prototype-development'
      ? absoluteUrl('/images/prototype-development-hero.jpg')
      : defaultOgImage

  return {
    title: seo.title,
    description: seo.description,
    url: absoluteUrl(seo.path),
    image,
    type: seo.ogType ?? 'website',
    siteName: site.name,
    locale: 'en_AU',
  }
}
