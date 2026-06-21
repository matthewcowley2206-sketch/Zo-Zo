import { formatFromPrice, pricingBySlug, pricingFaqs } from './pricing'
import { serviceThemes } from './method'

export type PricingModuleRow = {
  slug: string
  title: string
  fromAmount: number
  outcome: string
  href: string
}

export type PricingThemeGroup = {
  themeId: string
  themeTitle: string
  uncertaintyLabel: string
  primarySlug: string
  primaryHref: string
  fromAmount: number
  outcome: string
  modules: PricingModuleRow[]
}

const modulePricing: Record<string, { title: string; slug: string }> = {
  strategy: { title: 'Strategy & direction', slug: 'strategy' },
  communication: { title: 'Communication & clarity', slug: 'communication' },
  operations: { title: 'Operations & simplification', slug: 'operations' },
  'prototype-development': { title: 'Test Before You Invest', slug: 'prototype-development' },
  'data-ai': { title: 'Data, AI & Insights', slug: 'data-ai' },
  'client-listening': { title: 'Client Listening', slug: 'client-listening' },
  'growth-gtm': { title: 'Growth & Go-to-Market', slug: 'growth-gtm' },
}

function moduleRow(slug: keyof typeof pricingBySlug): PricingModuleRow {
  const pricing = pricingBySlug[slug]
  const meta = modulePricing[slug]
  return {
    slug,
    title: meta.title,
    fromAmount: pricing.fromAmount,
    outcome: pricing.outcome,
    href: `/services/${slug}`,
  }
}

export const pricingThemeGroups: PricingThemeGroup[] = [
  {
    themeId: 'opportunity-insight',
    themeTitle: 'Opportunity & Insight',
    uncertaintyLabel: serviceThemes[0].uncertaintyLabel,
    primarySlug: 'client-listening',
    primaryHref: '/services/client-listening',
    fromAmount: pricingBySlug['client-listening'].fromAmount,
    outcome: pricingBySlug['client-listening'].outcome,
    modules: [moduleRow('client-listening')],
  },
  {
    themeId: 'strategy-structure',
    themeTitle: 'Strategy & Structure',
    uncertaintyLabel: serviceThemes[1].uncertaintyLabel,
    primarySlug: 'strategy',
    primaryHref: '/services/strategy',
    fromAmount: pricingBySlug.strategy.fromAmount,
    outcome: pricingBySlug.strategy.outcome,
    modules: [moduleRow('strategy'), moduleRow('communication'), moduleRow('operations')],
  },
  {
    themeId: 'prototype-ai',
    themeTitle: 'Prototype & AI Advisory',
    uncertaintyLabel: serviceThemes[2].uncertaintyLabel,
    primarySlug: 'prototype-development',
    primaryHref: '/services/prototype-development',
    fromAmount: pricingBySlug['prototype-development'].fromAmount,
    outcome: pricingBySlug['prototype-development'].outcome,
    modules: [moduleRow('prototype-development'), moduleRow('data-ai')],
  },
  {
    themeId: 'growth-gtm',
    themeTitle: 'Growth & Go-to-Market',
    uncertaintyLabel: serviceThemes[3].uncertaintyLabel,
    primarySlug: 'growth-gtm',
    primaryHref: '/services/growth-gtm',
    fromAmount: pricingBySlug['growth-gtm'].fromAmount,
    outcome: pricingBySlug['growth-gtm'].outcome,
    modules: [moduleRow('growth-gtm')],
  },
]

export { formatFromPrice, pricingFaqs }
