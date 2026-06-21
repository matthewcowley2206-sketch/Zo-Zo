import type { DemoRecommendation } from '../../components/demos/demoTypes'

export type IndustryContext = 'law' | 'accounting' | 'consulting' | 'professional-services'

export type RecommendationQuadrant = 'quick-win' | 'strategic' | 'long-term'

export type DiagnosisCause = {
  id: string
  name: string
  probability: number
  explanation: string
  action: string
}

export type PhoenixDiagnosisResult = {
  confidence: number
  insight: string
  matchedSignals: string[]
  causes: DiagnosisCause[]
  recommendations: DemoRecommendation[]
  outcomePreview: {
    headline: string
    metric: string
    detail: string
  }
  businessImpact: {
    technicianCostAvoided: string
    downtimeAvoided: string
    staffConfidence: string
    maintenanceCompliance: string
    estimatedAnnualSavings: string
  }
  processingMessages: string[]
}

export type NorthgateThemeResult = {
  id: string
  label: string
  score: number
  sentiment: 'positive' | 'mixed' | 'negative'
  summary: string
  mentions: number
  risk?: string
  supportingQuotes: string[]
  rootCauses: string[]
  recommendedActions: string[]
  expectedOutcomes: string[]
}

export type NorthgateAnalysisResult = {
  industry: IndustryContext
  rawExcerpts: string[]
  themes: NorthgateThemeResult[]
  risks: string[]
  opportunities: string[]
  recommendations: DemoRecommendation[]
  excerptCount: number
  transparency: {
    excerptCount: number
    themeCount: number
    riskCount: number
    opportunityCount: number
    recommendationCount: number
  }
  topInsight: {
    themeLabel: string
    score: number
    summary: string
  }
  outcomePreview: {
    headline: string
    metric: string
    detail: string
  }
  executiveBrief: {
    summary: string
    keyThemes: string[]
    risks: string[]
    opportunities: string[]
    recommendedActions: string[]
    leadershipPriorities: string[]
  }
  processingMessages: string[]
}
