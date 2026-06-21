import { services } from './services'

export type PricingFaq = {
  question: string
  answer: string
}

export type PricingRow = {
  serviceSlug: string
  serviceTitle: string
  fromAmount: number
  outcome: string
}

export const pricingBySlug: Record<string, { fromAmount: number; outcome: string }> = {
  'prototype-development': {
    fromAmount: 8500,
    outcome: 'A working prototype to validate your idea and support a confident decision',
  },
  strategy: {
    fromAmount: 4500,
    outcome: 'Strategy-on-a-page, priorities, and a 90-day action plan',
  },
  'client-listening': {
    fromAmount: 7000,
    outcome: 'Program design, facilitated conversations, and a leadership insight pack',
  },
  'sales-marketing': {
    fromAmount: 5500,
    outcome: 'Positioning, customer journey map, and sales-ready messaging',
  },
  communication: {
    fromAmount: 4000,
    outcome: 'Narrative spine plus board, team, or client materials for one rollout',
  },
  'data-ai': {
    fromAmount: 6500,
    outcome: 'Data clarity review, one automation or dashboard improvement, and an AI roadmap',
  },
  operations: {
    fromAmount: 5000,
    outcome: 'Process mapping, one redesigned workflow, and SOPs your team can follow',
  },
  'go-to-market': {
    fromAmount: 6000,
    outcome: 'GTM strategy pack, audience profiles, and a week-by-week launch plan',
  },
  'growth-gtm': {
    fromAmount: 5500,
    outcome: 'Positioning, GTM plan, customer journey, and sales-ready messaging in one engagement',
  },
}

export const pricingRows: PricingRow[] = services.map((service) => {
  const pricing = pricingBySlug[service.slug]
  if (!pricing) {
    throw new Error(`Missing pricing for service: ${service.slug}`)
  }
  return {
    serviceSlug: service.slug,
    serviceTitle: service.title,
    ...pricing,
  }
})

export function formatFromPrice(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export const pricingFaqs: PricingFaq[] = [
  {
    question: 'Are these fixed prices?',
    answer:
      'No. They are starting points for typical engagements. We scope together on the clarity call and send a fixed quote before any paid work begins.',
  },
  {
    question: 'How do you decide the final price?',
    answer:
      'Based on what you need delivered - not hours on a clock. You get a clear scope, a fixed quote, and deliverables you can hold us to.',
  },
  {
    question: 'Is the clarity call free?',
    answer:
      'Yes. The first conversation is free. We listen, recommend what fits, and discuss ballpark investment if we are a good match.',
  },
  {
    question: 'Do prices include GST?',
    answer: 'Amounts shown are ex GST. GST is added where applicable on your invoice.',
  },
]
