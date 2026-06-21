import type { DemoRecommendation } from '../../components/demos/demoTypes'
import { getIndustryConfig } from './northgateIndustry'
import type { IndustryContext, NorthgateAnalysisResult, NorthgateThemeResult } from './types'

type ThemeDefinition = {
  id: string
  label: string
  keywords: string[]
  positiveKeywords: string[]
  negativeKeywords: string[]
  summaryPositive: string
  summaryMixed: string
  rootCauses: string[]
  actions: string[]
  riskTemplate?: string
}

const themeDefinitions: ThemeDefinition[] = [
  {
    id: 'responsiveness',
    label: 'Responsiveness',
    keywords: [
      'slow',
      'wait',
      'update',
      'updates',
      'turnaround',
      'responsive',
      'response',
      'follow up',
      'chase',
      'status',
      'delay',
      'proactive',
    ],
    positiveKeywords: ['proactive', 'timely', 'quick'],
    negativeKeywords: ['slow', 'wait', 'chase', 'delay', 'follow up'],
    summaryPositive: 'Stakeholders appreciate timely updates when they happen proactively.',
    summaryMixed:
      'Stakeholders want faster updates on routine work. Leadership agrees - but current process relies on manual check-ins.',
    rootCauses: [
      'Manual status check-ins instead of automated updates',
      'No shared view of in-flight progress for stakeholders',
      'Capacity constraints during peak periods',
    ],
    actions: ['Launch proactive status updates', 'Assign status owners by team', 'Introduce progress portal'],
    riskTemplate: 'Turnaround time cited in stakeholder feedback',
  },
  {
    id: 'communication',
    label: 'Communication',
    keywords: ['communicate', 'communication', 'clear', 'jargon', 'explain', 'call', 'outreach', 'contact'],
    positiveKeywords: ['clear', 'praise', 'excellent communication'],
    negativeKeywords: ['jargon', 'unclear', 'confusing'],
    summaryPositive: 'Clear, jargon-free updates praised across key accounts.',
    summaryMixed:
      'Communication quality is strong on complex work but inconsistent on routine updates.',
    rootCauses: [
      'Inconsistent communication templates across teams',
      'Junior staff handling status updates without leadership review',
    ],
    actions: ['Standardise update templates', 'Leadership review on key milestone communications'],
  },
  {
    id: 'value',
    label: 'Value',
    keywords: ['fee', 'fees', 'cost', 'value', 'price', 'bill', 'billing', 'expensive', 'transparency', 'narrative'],
    positiveKeywords: ['worth', 'value for'],
    negativeKeywords: ['unclear', 'surprised', 'expensive', 'questioned', 'reactive'],
    summaryPositive: 'Strong perceived value on complex strategic work.',
    summaryMixed:
      'Key accounts question fee transparency on multi-phase work. Value narrative needs strengthening at leadership level.',
    rootCauses: [
      'Pricing explained reactively rather than at work outset',
      'No structured value narrative for priority segment',
    ],
    actions: [
      'Leadership-led value reviews for top accounts',
      'Fee clarity workshop for priority segment',
      'Quarterly value narrative in check-ins',
    ],
    riskTemplate: 'Fee clarity flagged in stakeholder feedback',
  },
  {
    id: 'strategic',
    label: 'Strategic advice',
    keywords: ['strategy', 'strategic', 'advice', 'judgment', 'counsel', 'acquisition', 'complex', 'trust'],
    positiveKeywords: ['excellent', 'trust', 'strong', 'praise', 'quality'],
    negativeKeywords: ['reactive', 'late', 'early'],
    summaryPositive:
      'Strong trust in leadership judgment on complex work. Stakeholders want earlier strategic input.',
    summaryMixed:
      'Strategic advice scores well overall but stakeholders want earlier involvement on emerging issues.',
    rootCauses: [
      'Strategic input often triggered late in work lifecycle',
      'Limited proactive strategic review cadence',
    ],
    actions: ['Quarterly strategic review for key accounts', 'Early-stage strategic checkpoint on new work'],
  },
]

const riskPhrases = [
  { match: ['risk', 'concern', 'worried', 'frustrated', 'dissatisfied'], label: 'Satisfaction risk on routine work' },
  { match: ['fee', 'billing', 'cost', 'expensive', 'unclear'], label: 'Fee transparency and value perception risk' },
  { match: ['slow', 'wait', 'delay', 'chase'], label: 'Responsiveness risk in priority segment' },
  { match: ['competitor', 'switch', 'alternative'], label: 'Competitive retention risk' },
]

const opportunityPhrases = [
  { match: ['proactive', 'earlier', 'want more', 'would like'], label: 'Proactive stakeholder experience program' },
  { match: ['trust', 'excellent', 'strong', 'praise'], label: 'Leverage strategic strength in client marketing' },
  { match: ['portal', 'visibility', 'status'], label: 'Progress visibility initiative' },
  { match: ['nps', 'recommend'], label: 'Advocacy improvement through top theme actions' },
]

export function splitExcerpts(text: string): string[] {
  return text
    .split(/\n+/)
    .map((line) => line.replace(/^["'\-\*•]\s*/, '').trim())
    .filter((line) => line.length > 20)
}

function countMatches(text: string, keywords: string[]): number {
  const lower = text.toLowerCase()
  return keywords.reduce((n, kw) => (lower.includes(kw) ? n + 1 : n), 0)
}

function scoreTheme(text: string, def: ThemeDefinition): number {
  const pos = countMatches(text, def.positiveKeywords)
  const neg = countMatches(text, def.negativeKeywords)
  const base = countMatches(text, def.keywords) * 12
  return Math.min(88, Math.max(45, 50 + base + neg * 4 - pos * 2))
}

function sentimentFor(score: number, neg: number, pos: number): 'positive' | 'mixed' | 'negative' {
  if (pos > neg + 2 && score >= 70) return 'positive'
  if (neg > pos + 1) return 'mixed'
  if (score >= 68) return 'positive'
  return 'mixed'
}

function extractQuotes(text: string, keywords: string[]): string[] {
  const excerpts = splitExcerpts(text)
  return excerpts
    .filter((ex) => keywords.some((k) => ex.toLowerCase().includes(k)))
    .slice(0, 3)
    .map((q) => (q.length > 120 ? `${q.slice(0, 117)}…` : q))
}

function expectedOutcomesForTheme(
  themeId: string,
  score: number,
  industry: ReturnType<typeof getIndustryConfig>,
): string[] {
  const outcomes: Record<string, string[]> = {
    responsiveness: [
      'Est. +8 advocacy score within 90 days',
      `Reduced ${industry.stakeholderTerm} status enquiry calls by ~30%`,
      'Improved routine work satisfaction scores',
    ],
    value: [
      'Est. +6 advocacy score on fee clarity',
      'Fewer billing surprises on multi-phase work',
      'Stronger renewal conversations at leadership level',
    ],
    communication: [
      'Consistent update quality across teams',
      'Est. +4 advocacy score on communication',
      'Reduced escalation on routine matters',
    ],
    strategic: [
      'Earlier strategic input on emerging issues',
      'Est. +5 advocacy score on proactive counsel',
      'Stronger trust scores on complex work',
    ],
  }
  const base = outcomes[themeId] ?? ['Measurable improvement within one quarter']
  return base.map((o) => (score >= 70 ? o : o.replace('+8', '+6').replace('+6', '+4')))
}

function applyIndustryToTheme(
  theme: NorthgateThemeResult,
  def: ThemeDefinition,
  industry: ReturnType<typeof getIndustryConfig>,
): NorthgateThemeResult {
  const expectedOutcomes = expectedOutcomesForTheme(def.id, theme.score, industry)

  if (def.id === 'responsiveness') {
    return {
      ...theme,
      rootCauses: industry.responsiveness.rootCauses,
      recommendedActions: [
        industry.responsiveness.actionTitle,
        `Assign status owners by ${industry.teamUnit}`,
        industry.portal.actionTitle,
      ],
      expectedOutcomes,
    }
  }
  if (def.id === 'value') {
    return {
      ...theme,
      rootCauses: industry.value.rootCauses,
      recommendedActions: [
        industry.value.actionTitle,
        `Fee clarity workshop for priority ${industry.teamUnit}`,
        `Quarterly value narrative in ${industry.stakeholderTerm} check-ins`,
      ],
      expectedOutcomes,
    }
  }
  return { ...theme, expectedOutcomes }
}

function buildTheme(
  text: string,
  def: ThemeDefinition,
  industry: ReturnType<typeof getIndustryConfig>,
): NorthgateThemeResult {
  const score = scoreTheme(text, def)
  const neg = countMatches(text, def.negativeKeywords)
  const pos = countMatches(text, def.positiveKeywords)
  const sentiment = sentimentFor(score, neg, pos)
  const mentions = Math.max(1, countMatches(text, def.keywords))
  const quotes = extractQuotes(text, def.keywords)

  const base: NorthgateThemeResult = {
    id: def.id,
    label: def.label,
    score,
    sentiment,
    summary:
      sentiment === 'positive'
        ? def.summaryPositive.replace(/Stakeholders/g, industry.stakeholderTerm === 'stakeholder' ? 'Stakeholders' : 'Clients')
        : def.summaryMixed.replace(/stakeholders/gi, `${industry.stakeholderTerm}s`).replace(/Leadership/g, industry.leaderTerm),
    mentions,
    risk: def.riskTemplate && neg > 0 ? def.riskTemplate : undefined,
    supportingQuotes: quotes.length > 0 ? quotes : [`Feedback references ${def.label.toLowerCase()} themes.`],
    rootCauses: def.rootCauses,
    recommendedActions: def.actions,
    expectedOutcomes: [],
  }

  return applyIndustryToTheme(base, def, industry)
}

function assignQuadrant(impactScore: number, effortScore: number): DemoRecommendation['quadrant'] {
  if (impactScore >= 4 && effortScore <= 2) return 'quick-win'
  if (impactScore >= 4) return 'strategic'
  return 'long-term'
}

function buildRecommendations(
  themes: NorthgateThemeResult[],
  industry: ReturnType<typeof getIndustryConfig>,
): DemoRecommendation[] {
  const top = themes[0]
  const recs: DemoRecommendation[] = []

  const responsivenessTheme = themes.find((t) => t.id === 'responsiveness')!
  const valueTheme = themes.find((t) => t.id === 'value')!

  if (top.id === 'responsiveness' || responsivenessTheme.score >= 60) {
    recs.push({
      id: 'responsiveness',
      title: industry.responsiveness.actionTitle,
      description: industry.responsiveness.actionDescription,
      impact: 'Est. +8 advocacy score · addresses top concern',
      impactScore: 5,
      effortScore: 3,
      quadrant: assignQuadrant(5, 3),
    })
  }
  if (top.id === 'value' || valueTheme.score >= 58) {
    recs.push({
      id: 'value',
      title: industry.value.actionTitle,
      description: industry.value.actionDescription,
      impact: 'Est. +6 advocacy score · fee clarity improvement',
      impactScore: 4,
      effortScore: 3,
      quadrant: assignQuadrant(4, 3),
    })
  }
  if (recs.length === 0) {
    recs.push({
      id: 'listening',
      title: industry.listening.actionTitle,
      description: industry.listening.actionDescription,
      impact: 'Est. +5 advocacy score · closes feedback gaps',
      impactScore: 3,
      effortScore: 2,
      quadrant: assignQuadrant(3, 2),
    })
  }
  if (recs.length < 2) {
    recs.push({
      id: 'portal',
      title: industry.portal.actionTitle,
      description: industry.portal.actionDescription,
      impact: 'Est. +5 advocacy score · reduces status enquiry calls',
      impactScore: 4,
      effortScore: 4,
      quadrant: assignQuadrant(4, 4),
    })
  }

  if (recs.length < 3 && !recs.find((r) => r.id === 'communication')) {
    recs.push({
      id: 'communication',
      title: 'Standardise stakeholder update templates',
      description: `Consistent communication across ${industry.teamUnit}s · 60-day rollout`,
      impact: 'Est. +4 advocacy score · communication consistency',
      impactScore: 3,
      effortScore: 2,
      quadrant: assignQuadrant(3, 2),
    })
  }

  return recs.slice(0, 3).map((r) => ({
    ...r,
    quadrant: r.quadrant ?? assignQuadrant(r.impactScore ?? 3, r.effortScore ?? 3),
  }))
}

function buildLeadershipPriorities(
  themes: NorthgateThemeResult[],
  recommendations: DemoRecommendation[],
  risks: string[],
  industry: ReturnType<typeof getIndustryConfig>,
): string[] {
  const top = themes[0]
  const priorities: string[] = [
    `Address ${top.label.toLowerCase()} as the highest-impact theme (score ${top.score}) in the ${industry.priorityFraming}.`,
  ]

  if (recommendations[0]) {
    priorities.push(`Approve ${recommendations[0].title.toLowerCase()} with measurable advocacy targets by end of Q3.`)
  }

  if (risks[0]) {
    priorities.push(`Mitigate ${risks[0].toLowerCase()} - assign an executive owner within 30 days.`)
  } else if (recommendations[1]) {
    priorities.push(`Fund ${recommendations[1].title.toLowerCase()} alongside existing ${industry.teamUnit} capacity planning.`)
  }

  return priorities.slice(0, 3)
}

export function analyseNorthgateFeedback(
  input: string,
  industryId: IndustryContext = 'law',
): NorthgateAnalysisResult {
  const industry = getIndustryConfig(industryId)
  const text = input.trim()
  const rawExcerpts = splitExcerpts(text)
  const excerptCount = Math.max(1, rawExcerpts.length)

  const themes = themeDefinitions
    .map((def) => buildTheme(text, def, industry))
    .sort((a, b) => b.score - a.score)

  const risks = riskPhrases
    .filter((r) => r.match.some((m) => text.toLowerCase().includes(m)))
    .map((r) => r.label)
  if (risks.length === 0 && themes[0].risk) risks.push(themes[0].risk)

  const opportunities = opportunityPhrases
    .filter((o) => o.match.some((m) => text.toLowerCase().includes(m)))
    .map((o) => o.label)
  if (opportunities.length === 0) {
    opportunities.push(`Structured Q3 ${industry.stakeholderTerm} experience program`)
    opportunities.push('Leverage strategic advice strength in market positioning')
  }

  const recommendations = buildRecommendations(themes, industry)
  const top = themes[0]
  const leadershipPriorities = buildLeadershipPriorities(themes, recommendations, risks, industry)

  const executiveBrief = {
    summary: `${industry.summaryOpener} of ${excerptCount} feedback excerpt${excerptCount === 1 ? '' : 's'} for a ${industry.label.toLowerCase()} confirms ${top.label.toLowerCase()} as the highest-impact theme (score ${top.score}). ${risks.length > 0 ? `${risks.length} risk flag${risks.length === 1 ? '' : 's'} require ${industry.leaderTerm} attention.` : 'Overall sentiment supports targeted improvement.'} Recommend ${Math.min(2, recommendations.length)} Q3 initiatives with measurable advocacy targets. Prepared for ${industry.leaderTerm} review.`,
    keyThemes: themes.slice(0, 4).map((t) => `${t.label} (${t.score})`),
    risks: risks.slice(0, 3),
    opportunities: opportunities.slice(0, 3),
    recommendedActions: recommendations.map((r) => r.title),
    leadershipPriorities,
  }

  return {
    industry: industryId,
    rawExcerpts: rawExcerpts.length > 0 ? rawExcerpts.slice(0, 4) : [text.slice(0, 160) + (text.length > 160 ? '…' : '')],
    themes,
    risks,
    opportunities,
    recommendations,
    excerptCount,
    transparency: {
      excerptCount,
      themeCount: themes.filter((t) => t.mentions > 1).length || themes.length,
      riskCount: risks.length,
      opportunityCount: opportunities.length,
      recommendationCount: recommendations.length,
    },
    topInsight: {
      themeLabel: top.label,
      score: top.score,
      summary: top.summary,
    },
    outcomePreview: {
      headline: `${top.label} identified as top priority`,
      metric: `Analysis · 3 weeks → ~20 min`,
      detail: `${themes.length} themes surfaced from your feedback with ${risks.length} risk flag${risks.length === 1 ? '' : 's'} for leadership review.`,
    },
    executiveBrief,
    processingMessages: [
      'Parsing feedback excerpts…',
      `Applying ${industry.shortLabel} context…`,
      'Extracting themes and sentiment…',
      'Identifying risks and opportunities…',
      'Drafting executive insight…',
    ],
  }
}

export function themesToInsightCategories(themes: NorthgateThemeResult[]) {
  return themes.map((t) => ({
    id: t.id,
    label: t.label,
    score: t.score,
    sentiment: t.sentiment,
    summary: t.summary,
    mentions: t.mentions,
    risk: t.risk,
  }))
}
