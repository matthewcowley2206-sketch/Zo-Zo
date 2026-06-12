export type ServiceImage = {
  url: string
  alt: string
}

export type ServiceImagerySet = {
  hero: ServiceImage
  secondary?: ServiceImage
}

export const serviceImagery: Partial<Record<string, ServiceImagerySet>> = {
  strategy: {
    hero: {
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
      alt: 'Small team collaborating around a laptop in a bright, casual workspace',
    },
    secondary: {
      url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80',
      alt: 'Team working through ideas together at a whiteboard',
    },
  },
}
