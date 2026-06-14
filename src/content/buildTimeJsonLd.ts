/** Build-time Organization + WebSite JSON-LD injected into index.html for crawlers. */
export const buildTimeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://www.zoandzo.com.au/#organization',
      name: 'Zo&Zo Advisory',
      url: 'https://www.zoandzo.com.au',
      email: 'matt@zoandzo.com.au',
      description:
        'Zo&Zo Advisory is a Sydney-based business advisory helping growing companies across Australia turn complexity into clarity. We combine strategy, client listening, operations, data and AI guidance, and working prototypes you can test before full development.',
      slogan: 'Turning Complexity into Clarity',
      areaServed: { '@type': 'Country', name: 'Australia' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sydney',
        addressRegion: 'NSW',
        postalCode: '2207',
        addressCountry: 'AU',
      },
      founder: {
        '@type': 'Person',
        name: 'Matthew Cowley',
        jobTitle: 'Founder',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.zoandzo.com.au/#website',
      url: 'https://www.zoandzo.com.au',
      name: 'Zo&Zo Advisory',
      publisher: { '@id': 'https://www.zoandzo.com.au/#organization' },
      inLanguage: 'en-AU',
    },
  ],
}
