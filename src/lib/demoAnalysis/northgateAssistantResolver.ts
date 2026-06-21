import type { NorthgateAnalysisResult } from './types'

export type NorthgateAssistantQuestion = {
  id: string
  label: string
}

export const northgateSuggestedQuestions: NorthgateAssistantQuestion[] = [
  { id: 'focus', label: 'What should leadership focus on?' },
  { id: 'risk', label: 'What is the biggest risk?' },
  { id: 'prioritise', label: 'Which actions should we prioritise?' },
  { id: 'quick-wins', label: 'Show me quick wins.' },
  { id: 'opportunities', label: 'What opportunities are emerging?' },
]

export function resolveNorthgateAssistantQuestion(
  questionId: string,
  analysis: NorthgateAnalysisResult | null,
): string {
  if (!analysis) {
    return fallbackNorthgateResponse(questionId)
  }

  const { topInsight, executiveBrief, risks, opportunities, recommendations } = analysis
  const quickWins = recommendations.filter((r) => r.quadrant === 'quick-win')

  switch (questionId) {
    case 'focus':
      return `Leadership should focus on ${topInsight.themeLabel.toLowerCase()} (score ${topInsight.score}). ${executiveBrief.leadershipPriorities[0] ?? topInsight.summary}`
    case 'risk':
      return risks[0]
        ? `Biggest risk: ${risks[0]}. ${risks[1] ? `Also watch: ${risks[1]}.` : ''} Address in the ${executiveBrief.leadershipPriorities[0] ? 'Q3 program' : 'next leadership review'}.`
        : 'No critical risk flags - focus on sustaining strengths while improving routine experience.'
    case 'prioritise':
      return `Prioritise: ${recommendations.map((r) => r.title).join('; ')}. Start with ${recommendations[0]?.title ?? 'the top theme action'} for fastest impact.`
    case 'quick-wins':
      return quickWins.length > 0
        ? `Quick wins: ${quickWins.map((r) => `${r.title} (${r.impact ?? 'high impact'})`).join(' · ')}.`
        : `Nearest quick win: ${recommendations[0]?.title ?? 'proactive status updates'} - ${recommendations[0]?.impact ?? 'est. +5 advocacy score'}.`
    case 'opportunities':
      return opportunities.length > 0
        ? `Emerging opportunities: ${opportunities.slice(0, 3).join(' · ')}.`
        : 'Leverage strategic advice strength while closing responsiveness gaps.'
    default:
      return fallbackNorthgateResponse(questionId)
  }
}

function fallbackNorthgateResponse(questionId: string): string {
  const fallbacks: Record<string, string> = {
    focus: 'Run an analysis first - leadership focus will reflect your top theme and priorities.',
    risk: 'Paste feedback to surface risk flags from stakeholder input.',
    prioritise: 'Complete analysis to see prioritised actions from your feedback.',
    'quick-wins': 'Quick wins appear after analysis in the priority matrix.',
    opportunities: 'Opportunities are extracted when you analyse stakeholder feedback.',
  }
  return fallbacks[questionId] ?? 'Paste or sample feedback, then analyse to get contextual answers.'
}

export function matchNorthgateFreeTextQuery(query: string, analysis: NorthgateAnalysisResult | null): string {
  const lower = query.toLowerCase()
  if (lower.includes('focus') || lower.includes('leadership') || lower.includes('priorit')) {
    return resolveNorthgateAssistantQuestion('focus', analysis)
  }
  if (lower.includes('risk') || lower.includes('concern')) {
    return resolveNorthgateAssistantQuestion('risk', analysis)
  }
  if (lower.includes('quick') || lower.includes('win') || lower.includes('first')) {
    return resolveNorthgateAssistantQuestion('quick-wins', analysis)
  }
  if (lower.includes('opportunit')) {
    return resolveNorthgateAssistantQuestion('opportunities', analysis)
  }
  if (lower.includes('action') || lower.includes('recommend')) {
    return resolveNorthgateAssistantQuestion('prioritise', analysis)
  }
  return analysis
    ? `Based on your analysis, ${analysis.topInsight.themeLabel} is the top theme. ${analysis.topInsight.summary}`
    : 'Try a suggested question above, or analyse feedback first for contextual guidance.'
}
