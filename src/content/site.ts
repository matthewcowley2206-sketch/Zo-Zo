export const site = {
  name: 'Zo&Zo Advisory',
  tagline: 'Turning Complexity into Clarity',
  email: 'matt@zoandzo.com.au',
  contactCcEmail: 'phoenix8760@gmail.com',
  phone: '0449 570 652',
  location: 'Sydney, NSW 2207 · Australia',
  bookingUrl: 'https://www.zoandzo.com.au/appointments',
  ctaLabel: 'Book a free clarity call',
} as const

export const navLinks = [
  { label: 'How we work', href: '/how-we-work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export const pillars = [
  {
    title: 'Clarity',
    description: 'Turn scattered thinking into simple, practical plans.',
  },
  {
    title: 'Structure',
    description: 'Give your team direction they can actually follow.',
  },
  {
    title: 'Proof',
    description: 'See ideas working before you commit serious spend.',
  },
] as const

export const engagementTypes = [
  {
    title: 'Clarity session',
    description: 'A focused conversation to untangle one problem and define the next step.',
  },
  {
    title: 'Project',
    description: 'Scoped work on strategy, listening, prototyping, or go-to-market - with a clear deliverable.',
  },
  {
    title: 'Ongoing advisory',
    description: 'A trusted partner as you grow - regular check-ins, decisions, and momentum.',
  },
] as const
