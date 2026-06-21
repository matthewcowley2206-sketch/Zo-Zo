import type { DemoRecommendation } from '../../components/demos/demoTypes'
import type { NorthgateAnalysisResult, NorthgateThemeResult } from './types'

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
    summaryPositive: 'Clients appreciate timely updates when they happen proactively.',
    summaryMixed:
      'Clients want faster updates on routine matters. Partners agree - but current process relies on manual check-ins.',
    rootCauses: [
      'Manual status check-ins instead of automated matter updates',
      'No shared view of in-flight matter progress for clients',
      'Capacity constraints during peak matter periods',
    ],
    actions: [
      'Launch proactive matter status updates',
      'Assign matter status owners by practice group',
      'Introduce client portal for in-flight visibility',
    ],
    riskTemplate: 'Turnaround time cited in client feedback',
  },
  {
    id: 'communication',
    label: 'Communication',
    keywords: ['communicate', 'communication', 'clear', 'jargon', 'explain', 'call', 'outreach', 'contact'],
    positiveKeywords: ['clear', 'praise', 'excellent communication'],
    negativeKeywords: ['jargon', 'unclear', 'confusing'],
    summaryPositive: 'Clear, jargon-free updates praised in litigation and property groups.',
    summaryMixed:
      'Communication quality is strong on complex matters but inconsistent on routine updates.',
    rootCauses: [
      'Inconsistent communication templates across teams',
      'Junior staff handling status updates without partner review',
    ],
    actions: [
      'Standardise client update templates',
      'Partner review on key milestone communications',
    ],
  },
  {
    id: 'value',
    label: 'Value',
    keywords: ['fee', 'fees', 'cost', 'value', 'price', 'bill', 'billing', 'expensive', 'transparency', 'narrative'],
    positiveKeywords: ['worth', 'value for'],
    negativeKeywords: ['unclear', 'surprised', 'expensive', 'questioned', 'reactive'],
    summaryPositive: 'Strong perceived value on complex strategic matters.',
    summaryMixed:
      'Corporate clients question fee transparency on multi-phase matters. Value narrative needs strengthening at partner level.',
    rootCauses: [
      'Fee structure explained reactively rather than at matter outset',
      'No structured value narrative for corporate segment',
    ],
    actions: [
      'Partner-led value reviews for top 20 clients',
      'Fee clarity workshop for corporate segment',
      'Quarterly value narrative in client check-ins',
    ],
    riskTemplate: 'Fee clarity flagged in client feedback',
  },
  {
    id: 'strategic',
    label: 'Strategic advice',
    keywords: ['strategy', 'strategic', 'advice', 'judgment', 'counsel', 'acquisition', 'complex', 'trust'],
    positiveKeywords: ['excellent', 'trust', 'strong', 'praise', 'quality'],
    negativeKeywords: ['reactive', 'late', 'early'],
    summaryPositive:
      'Strong trust in partner judgment on complex matters. Clients want earlier strategic input.',
    summaryMixed:
      'Strategic advice scores well overall but clients want earlier involvement on emerging issues.',
    rootCauses: [
      'Strategic input often triggered late in matter lifecycle',
      'Limited proactive strategic review cadence',
    ],
    actions: [
      'Quarterly strategic review for key clients',
      'Early-stage strategic checkpoint on new matters',
    ],
  },
]

const riskPhrases = [
  { match: ['risk', 'concern', 'worried', 'frustrated', 'dissatisfied'], label: 'Client satisfaction risk on routine matters' },
  { match: ['fee', 'billing', 'cost', 'expensive', 'unclear'], label: 'Fee transparency and value perception risk' },
  { match: ['slow', 'wait', 'delay', 'chase'], label: 'Responsiveness risk in corporate segment' },
  { match: ['competitor', 'switch', 'alternative'], label: 'Competitive retention risk' },
]

const opportunityPhrases = [
  { match: ['proactive', 'earlier', 'want more', 'would like'], label: 'Proactive client experience program' },
  { match: ['trust', 'excellent', 'strong', 'praise'], label: 'Leverage strategic advice strength in marketing' },
  { match: ['portal', 'visibility', 'status'], label: 'Client portal and matter visibility initiative' },
  { match: ['nps', 'recommend'], label: 'NPS improvement through top theme actions' },
]

function splitExcerpts(text: string): string[] {
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

function buildTheme(text: string, def: ThemeDefinition): NorthgateThemeResult {
  const score = scoreTheme(text, def)
  const neg = countMatches(text, def.negativeKeywords)
  const pos = countMatches(text, def.positiveKeywords)
  const sentiment = sentimentFor(score, neg, pos)
  const mentions = Math.max(1, countMatches(text, def.keywords))
  const quotes = extractQuotes(text, def.keywords)

  return {
    id: def.id,
    label: def.label,
    score,
    sentiment,
    summary: sentiment === 'positive' ? def.summaryPositive : def.summaryMixed,
    mentions,
    risk: def.riskTemplate && neg > 0 ? def.riskTemplate : undefined,
    supportingQuotes: quotes.length > 0 ? quotes : [`Feedback references ${def.label.toLowerCase()} themes.`],
    rootCauses: def.rootCauses,
    recommendedActions: def.actions,
  }
}

function buildRecommendations(themes: NorthgateThemeResult[]): DemoRecommendation[] {
  const top = themes[0]
  const recs: DemoRecommendation[] = []

  if (top.id === 'responsiveness' || themes.find((t) => t.id === 'responsiveness')!.score >= 60) {
    recs.push({
      id: 'responsiveness',
      title: 'Launch proactive matter updates',
      description: 'Automated status updates for in-flight matters · 90-day rollout',
      impact: 'Est. +8 NPS · addresses top client concern',
    })
  }
  if (top.id === 'value' || themes.find((t) => t.id === 'value')!.score >= 58) {
    recs.push({
      id: 'value',
      title: 'Partner-led value reviews',
      description: 'Quarterly value narrative for top corporate clients',
      impact: 'Est. +6 NPS · fee clarity improvement',
    })
  }
  if (recs.length === 0) {
    recs.push({
      id: 'listening',
      title: 'Expand client listening program',
      description: 'Structured interviews across remaining practice groups',
      impact: 'Est. +5 NPS · closes feedback gaps',
    })
  }
  if (recs.length < 2) {
    recs.push({
      id: 'portal',
      title: 'Matter status visibility',
      description: 'Client portal for matter progress · corporate segment',
      impact: 'Est. +5 NPS · reduces status enquiry calls',
    })
  }

  return recs.slice(0, 3)
}

export function analyseNorthgateFeedback(input: string): NorthgateAnalysisResult {
  const text = input.trim()
  const excerpts = splitExcerpts(text)
  const excerptCount = Math.max(1, excerpts.length)

  const themes = themeDefinitions
    .map((def) => buildTheme(text, def))
    .sort((a, b) => b.score - a.score)

  const risks = riskPhrases
    .filter((r) => r.match.some((m) => text.toLowerCase().includes(m)))
    .map((r) => r.label)
  if (risks.length === 0 && themes[0].risk) risks.push(themes[0].risk)

  const opportunities = opportunityPhrases
    .filter((o) => o.match.some((m) => text.toLowerCase().includes(m)))
    .map((o) => o.label)
  if (opportunities.length === 0) {
    opportunities.push('Structured Q3 client experience program')
    opportunities.push('Leverage strategic advice strength')
  }

  const recommendations = buildRecommendations(themes)
  const top = themes[0]

  const executiveBrief = {
    summary: `Analysis of ${excerptCount} feedback excerpt${excerptCount === 1 ? '' : 's'} confirms ${top.label.toLowerCase()} as the highest-impact theme (score ${top.score}). ${themes.filter((t) => t.risk).length > 0 ? `${themes.filter((t) => t.risk).length} risk flag${themes.filter((t) => t.risk).length === 1 ? '' : 's'} require leadership attention.` : 'Overall sentiment supports targeted improvement.'} Recommend ${Math.min(2, recommendations.length)} Q3 initiatives with measurable NPS targets.`,
    keyThemes: themes.slice(0, 4).map((t) => `${t.label} (${t.score})`),
    risks: risks.slice(0, 3),
    opportunities: opportunities.slice(0, 3),
    recommendedActions: recommendations.map((r) => r.title),
  }

  return {
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
      'Extracting themes and sentiment…',
      'Identifying risks and opportunities…',
      'Drafting recommendations…',
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
