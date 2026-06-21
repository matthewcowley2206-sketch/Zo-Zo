/**
 * Permanent redirects for merged or retired service URLs.
 * Implemented in vercel.json (301) and ServiceDetail (client-side Navigate).
 */
export const legacyServiceRedirects: Record<string, string> = {
  'sales-marketing': 'growth-gtm',
  'go-to-market': 'growth-gtm',
}

export const redirectMapForDocs = Object.entries(legacyServiceRedirects).map(
  ([from, to]) => ({
    from: `/services/${from}`,
    to: `/services/${to}`,
    type: '301 permanent' as const,
    reason:
      from === 'sales-marketing'
        ? 'Merged into Growth & Go-to-Market'
        : 'Merged into Growth & Go-to-Market',
  }),
)
