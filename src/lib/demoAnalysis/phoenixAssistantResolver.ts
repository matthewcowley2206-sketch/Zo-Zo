import type { PhoenixDiagnosisResult } from './types'

export type PhoenixAssistantQuestion = {
  id: string
  label: string
}

export const phoenixSuggestedQuestions: PhoenixAssistantQuestion[] = [
  { id: 'check-first', label: 'What should I check first?' },
  { id: 'likely-cause', label: 'What is the most likely cause?' },
  { id: 'downtime', label: 'How much downtime could be avoided?' },
  { id: 'technician', label: 'When should I call a technician?' },
  { id: 'maintenance', label: 'What maintenance should I prioritise?' },
]

export function resolvePhoenixAssistantQuestion(
  questionId: string,
  diagnosis: PhoenixDiagnosisResult | null,
): string {
  if (!diagnosis) {
    return fallbackPhoenixResponse(questionId)
  }

  const topCause = diagnosis.causes[0]
  const topRec = diagnosis.recommendations[0]
  const impact = diagnosis.businessImpact
  const escalate = diagnosis.recommendations.find((r) => r.id === 'technician')

  switch (questionId) {
    case 'check-first':
      return topRec
        ? `Check first: ${topRec.title}. ${topRec.description} · ${topRec.impact ?? 'Recommended self-service step'}.`
        : 'Run a diagnosis from the symptom screen for a tailored first step.'
    case 'likely-cause':
      return topCause
        ? `Most likely cause: ${topCause.name} (${topCause.probability}% confidence). ${topCause.explanation} Recommended: ${topCause.action}.`
        : diagnosis.insight
    case 'downtime':
      return `Self-service fix avoids ~${impact.downtimeAvoided} downtime per incident. Across 6 stores, estimated annual savings: ${impact.estimatedAnnualSavings}.`
    case 'technician':
      return escalate
        ? `Call a technician if self-service fails: ${escalate.description}. ${escalate.impact ?? 'Escalate after first-attempt fix.'}`
        : 'Escalate if symptoms persist after the recommended self-service steps.'
    case 'maintenance':
      return `Priority maintenance: ${impact.maintenanceCompliance}. Staff confidence target: ${impact.staffConfidence}.`
    default:
      return fallbackPhoenixResponse(questionId)
  }
}

function fallbackPhoenixResponse(questionId: string): string {
  const fallbacks: Record<string, string> = {
    'check-first': 'Describe the symptom or tap an example - the first check depends on your diagnosis.',
    'likely-cause': 'Run AI diagnosis from the breakdown journey for ranked causes.',
    downtime: 'Downtime avoided appears on the business impact screen after diagnosis.',
    technician: 'Technician escalation guidance appears after you run a diagnosis.',
    maintenance: 'Maintenance priorities are based on service history after diagnosis.',
  }
  return fallbacks[questionId] ?? 'Try a suggested question or run a diagnosis for tailored guidance.'
}

export function matchPhoenixFreeTextQuery(query: string, diagnosis: PhoenixDiagnosisResult | null): string {
  const lower = query.toLowerCase()
  if (lower.includes('bitter') || lower.includes('cause') || lower.includes('why')) {
    return resolvePhoenixAssistantQuestion('likely-cause', diagnosis)
  }
  if (lower.includes('first') || lower.includes('check') || lower.includes('start')) {
    return resolvePhoenixAssistantQuestion('check-first', diagnosis)
  }
  if (lower.includes('downtime') || lower.includes('save') || lower.includes('cost')) {
    return resolvePhoenixAssistantQuestion('downtime', diagnosis)
  }
  if (lower.includes('technician') || lower.includes('call') || lower.includes('escalat')) {
    return resolvePhoenixAssistantQuestion('technician', diagnosis)
  }
  if (lower.includes('maint') || lower.includes('service') || lower.includes('descale')) {
    return resolvePhoenixAssistantQuestion('maintenance', diagnosis)
  }
  return diagnosis
    ? `${diagnosis.insight} Top recommendation: ${diagnosis.recommendations[0]?.title ?? 'Run descale cycle'}.`
    : 'Try a suggested question above, or run a diagnosis for contextual guidance.'
}
