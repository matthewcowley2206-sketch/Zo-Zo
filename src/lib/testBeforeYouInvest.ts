export const TBYI_LABEL = 'Test Before You Invest'
export const TBYI_SERVICE_HREF = '/services/prototype-development'
export const TBYI_SERVICE_SLUG = 'prototype-development'

export function isTestBeforeYouInvest(input: {
  href?: string
  label?: string
  slug?: string
}): boolean {
  if (input.slug === TBYI_SERVICE_SLUG) return true
  if (input.label === TBYI_LABEL) return true
  if (input.href?.includes(TBYI_SERVICE_SLUG)) return true
  return false
}

/** Premium dark green signature treatment - capability cards only. */
export const tbyiCapabilityClasses =
  'border-emerald-800/35 bg-zo-green text-cream shadow-md shadow-zo-green-deep/20'

export const tbyiCapabilityHoverClasses =
  'hover:border-emerald-700/45 hover:bg-zo-green-light hover:shadow-lg hover:shadow-zo-green-deep/25'

export const tbyiCapabilityTitleClasses = 'font-semibold text-cream'
export const tbyiCapabilityBodyClasses = 'text-cream/75'
export const tbyiCapabilityCtaClasses =
  'font-semibold text-cream/90 transition-colors group-hover:text-cream'

export const tbyiCapabilityLinkClasses = `${tbyiCapabilityClasses} ${tbyiCapabilityHoverClasses}`

/** Compact pill for footer / work labels - same signature colour. */
export const tbyiSignaturePillClasses =
  'border-emerald-800/35 bg-zo-green text-cream hover:bg-zo-green-light'

export function standardCapabilityCardClasses(isDarkSection: boolean): string {
  return isDarkSection
    ? 'border-cream/15 bg-cream/[0.04] hover:border-cream/30 hover:bg-cream/[0.08]'
    : 'border-line/60 bg-cream/40 hover:border-ink/15 hover:bg-cream'
}
