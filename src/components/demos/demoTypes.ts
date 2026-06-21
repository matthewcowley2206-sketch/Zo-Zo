import type { DemoAnnotationContent } from './DemoAnnotations'

export type GuideStep = {
  id: string
  target: string
  hint: string
  recovery?: string
  annotation?: DemoAnnotationContent
}

export type DemoOutcome = {
  beforeLabel: string
  beforeValue: string
  afterLabel: string
  afterValue: string
  headline: string
  metric?: string
}

export type DemoJourney = {
  id: string
  title: string
  persona: string
  scenario: string
  steps: GuideStep[]
  outcome: DemoOutcome
  processingMessages?: string[]
}

export type DemoAssistantPrompt = {
  id: string
  label: string
  response: string
}

export type DemoAssistantConfig = {
  title: string
  placeholder: string
  prompts: DemoAssistantPrompt[]
}

export type DemoGuideConfig = {
  id: string
  title: string
  intro: string
  steps: GuideStep[]
  scopeNote: string
  completeMessage: string
  device?: 'phone' | 'desktop'
  journeys?: DemoJourney[]
  assistant?: DemoAssistantConfig
}

export type DemoRecommendation = {
  id: string
  title: string
  description: string
  impact?: string
}
