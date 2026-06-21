import type { PhoenixDiagnosisResult } from './types'

type SymptomProfile = {
  id: string
  keywords: string[]
  signals: string[]
  insight: string
  causes: PhoenixDiagnosisResult['causes']
  recommendations: PhoenixDiagnosisResult['recommendations']
  outcomePreview: PhoenixDiagnosisResult['outcomePreview']
  businessImpact: PhoenixDiagnosisResult['businessImpact']
  processingMessages: string[]
}

const profiles: SymptomProfile[] = [
  {
    id: 'extraction',
    keywords: [
      'bitter',
      'slow',
      'extraction',
      'extract',
      'sour',
      'shot',
      'channel',
      'grind',
      '35',
      'seconds',
      'taste',
    ],
    signals: ['slow extraction', 'bitter finish', 'long shot times'],
    insight:
      'Pattern matches scale buildup in the boiler and group head. Last descale was 94 days ago - recommended interval is 90 days.',
    causes: [
      {
        id: 'scale',
        name: 'Scale buildup',
        probability: 58,
        explanation: 'Mineral deposits restrict flow and over-extract, producing bitterness.',
        action: 'Run descale cycle (25 min)',
      },
      {
        id: 'screen',
        name: 'Blocked shower screen',
        probability: 28,
        explanation: 'Coffee oils clog the screen and slow water through the puck.',
        action: 'Deep clean group head',
      },
      {
        id: 'grind',
        name: 'Grinder setting too fine',
        probability: 14,
        explanation: 'Over-fine grind increases resistance and extends shot time.',
        action: 'Adjust grind one step coarser',
      },
    ],
    recommendations: [
      {
        id: 'descale',
        title: 'Run descale cycle',
        description: 'Recommended first step · 25 min · no parts required',
        impact: 'Resolves ~85% of slow + bitter cases',
      },
      {
        id: 'technician',
        title: 'Book technician',
        description: 'If descale fails · estimated $180 callout',
        impact: 'Escalate after self-service attempt',
      },
    ],
    outcomePreview: {
      headline: 'Potential technician callout avoided',
      metric: 'Est. $180 saved',
      detail: 'Self-service descale likely resolves this before a service visit.',
    },
    businessImpact: {
      technicianCostAvoided: '$180',
      downtimeAvoided: '~45 min',
      staffConfidence: '+35% self-service resolution',
      maintenanceCompliance: 'Descale overdue · schedule within 4 days',
      estimatedAnnualSavings: 'Est. $2,400/yr across 6 stores',
    },
    processingMessages: [
      'Reviewing symptoms…',
      'Cross-checking service history…',
      'Matching fault patterns…',
      'Generating diagnosis…',
    ],
  },
  {
    id: 'steam',
    keywords: ['steam', 'pressure', 'wand', 'milk', 'bar', 'texturing', 'cappuccino', 'latte'],
    signals: ['low steam pressure', 'weak steam wand'],
    insight:
      'Steam circuit pressure is below optimal range. Check water level and steam wand blockage before scheduling service.',
    causes: [
      {
        id: 'wand',
        name: 'Steam wand blockage',
        probability: 52,
        explanation: 'Milk residue in the wand tip restricts steam flow.',
        action: 'Purge and clean steam wand tip',
      },
      {
        id: 'water',
        name: 'Low boiler water level',
        probability: 31,
        explanation: 'Insufficient water reduces steam pressure generation.',
        action: 'Refill water tank and bleed system',
      },
      {
        id: 'scale-steam',
        name: 'Scale in steam circuit',
        probability: 17,
        explanation: 'Buildup in the steam boiler reduces pressure output.',
        action: 'Run steam circuit descale',
      },
    ],
    recommendations: [
      {
        id: 'clean-wand',
        title: 'Clean steam wand',
        description: '5 min purge and tip clean · no parts required',
        impact: 'Resolves ~70% of weak steam cases',
      },
      {
        id: 'technician',
        title: 'Book technician',
        description: 'If pressure stays below 1 bar · estimated $180 callout',
        impact: 'Escalate if self-service fails',
      },
    ],
    outcomePreview: {
      headline: 'Potential service call avoided',
      metric: 'Est. $180 saved',
      detail: 'Wand clean and water check often restore steam without a technician.',
    },
    businessImpact: {
      technicianCostAvoided: '$180',
      downtimeAvoided: '~30 min',
      staffConfidence: '+28% first-attempt fix rate',
      maintenanceCompliance: 'Steam circuit descale due in 6 weeks',
      estimatedAnnualSavings: 'Est. $1,800/yr across 6 stores',
    },
    processingMessages: [
      'Reviewing steam symptoms…',
      'Checking boiler pressure history…',
      'Analysing wand maintenance logs…',
      'Generating diagnosis…',
    ],
  },
  {
    id: 'leak',
    keywords: ['leak', 'drip', 'water', 'underneath', 'under', 'gasket', 'group head', 'pooling'],
    signals: ['water leak', 'drip after shot'],
    insight:
      'Leak pattern suggests group head gasket wear or loose shower screen. Likely fixable without full service call.',
    causes: [
      {
        id: 'gasket',
        name: 'Group head gasket wear',
        probability: 55,
        explanation: 'Worn gasket allows water to escape during extraction.',
        action: 'Replace group head gasket',
      },
      {
        id: 'screen-loose',
        name: 'Loose shower screen',
        probability: 30,
        explanation: 'Improperly seated screen can leak under pressure.',
        action: 'Reseat and tighten shower screen',
      },
      {
        id: 'drain',
        name: 'Drain valve obstruction',
        probability: 15,
        explanation: 'Blocked drain causes pooling under the group.',
        action: 'Clear drain tube and tray',
      },
    ],
    recommendations: [
      {
        id: 'gasket-replace',
        title: 'Replace group gasket',
        description: '15 min · gasket kit $12 · common fix',
        impact: 'Resolves most group head leaks',
      },
      {
        id: 'technician',
        title: 'Book technician',
        description: 'If leak persists · estimated $180 callout',
        impact: 'Escalate after gasket replacement',
      },
    ],
    outcomePreview: {
      headline: 'Potential callout avoided with parts fix',
      metric: 'Est. $168 saved vs callout',
      detail: 'Gasket replacement often resolves leaks before technician dispatch.',
    },
    businessImpact: {
      technicianCostAvoided: '$168',
      downtimeAvoided: '~20 min',
      staffConfidence: '+40% parts-level fixes',
      maintenanceCompliance: 'Gasket replacement due · overdue 2 weeks',
      estimatedAnnualSavings: 'Est. $1,200/yr across 6 stores',
    },
    processingMessages: [
      'Reviewing leak symptoms…',
      'Checking group head service history…',
      'Matching seal and gasket patterns…',
      'Generating diagnosis…',
    ],
  },
  {
    id: 'temperature',
    keywords: [
      'temperature',
      'hot',
      'cold',
      'inconsistent',
      'fluctuat',
      'warm',
      'cooling',
      'thermostat',
      'brew temp',
    ],
    signals: ['temperature fluctuation', 'inconsistent brew temp'],
    insight:
      'Temperature instability often traces to thermostat drift or scale affecting the boiler heat exchange. Check brew temp calibration before scheduling service.',
    causes: [
      {
        id: 'thermostat',
        name: 'Thermostat calibration drift',
        probability: 48,
        explanation: 'Sensor or thermostat drift causes inconsistent brew temperature.',
        action: 'Run temperature calibration check',
      },
      {
        id: 'scale-temp',
        name: 'Scale affecting heat transfer',
        probability: 35,
        explanation: 'Scale on heat exchanger reduces temperature stability.',
        action: 'Run descale cycle',
      },
      {
        id: 'probe',
        name: 'Faulty temperature probe',
        probability: 17,
        explanation: 'Worn probe sends incorrect readings to the controller.',
        action: 'Inspect and replace brew probe',
      },
    ],
    recommendations: [
      {
        id: 'calibrate',
        title: 'Run temperature calibration',
        description: '10 min check · verify brew temp within 92–96°C',
        impact: 'Resolves ~60% of fluctuation cases',
      },
      {
        id: 'technician',
        title: 'Book technician',
        description: 'If calibration fails · estimated $180 callout',
        impact: 'Escalate after self-service check',
      },
    ],
    outcomePreview: {
      headline: 'Potential temperature issue resolved in-store',
      metric: 'Est. $180 saved',
      detail: 'Calibration and descale often restore stable brew temperature.',
    },
    businessImpact: {
      technicianCostAvoided: '$180',
      downtimeAvoided: '~35 min',
      staffConfidence: '+32% temperature troubleshooting',
      maintenanceCompliance: 'Boiler descale recommended within 2 weeks',
      estimatedAnnualSavings: 'Est. $1,650/yr across 6 stores',
    },
    processingMessages: [
      'Reviewing temperature symptoms…',
      'Checking boiler and probe history…',
      'Matching heat exchange patterns…',
      'Generating diagnosis…',
    ],
  },
  {
    id: 'weak-coffee',
    keywords: [
      'weak',
      'watery',
      'thin',
      'under-extract',
      'underextract',
      'pale',
      'light',
      'dilute',
      'no crema',
      'bland',
    ],
    signals: ['weak coffee', 'watery shots', 'under-extraction'],
    insight:
      'Weak extraction pattern suggests grind too coarse, low dose, or channeling. Most cases resolve with grind adjustment and group head cleaning.',
    causes: [
      {
        id: 'grind-coarse',
        name: 'Grind too coarse',
        probability: 50,
        explanation: 'Coarse grind reduces resistance and produces weak, fast shots.',
        action: 'Adjust grind one step finer',
      },
      {
        id: 'dose',
        name: 'Low coffee dose',
        probability: 28,
        explanation: 'Insufficient coffee in the basket reduces extraction strength.',
        action: 'Verify dose weight (18–20g)',
      },
      {
        id: 'channel',
        name: 'Channeling in puck',
        probability: 22,
        explanation: 'Uneven tamp or dirty group head causes water to bypass coffee.',
        action: 'Deep clean group head and re-tamp',
      },
    ],
    recommendations: [
      {
        id: 'adjust-grind',
        title: 'Adjust grind finer',
        description: '2 min adjustment · no parts required',
        impact: 'Resolves ~75% of weak coffee cases',
      },
      {
        id: 'clean-group',
        title: 'Deep clean group head',
        description: '10 min backflush · improves extraction consistency',
        impact: 'Recommended if grind adjustment insufficient',
      },
    ],
    outcomePreview: {
      headline: 'Potential quality issue fixed without callout',
      metric: 'Est. $180 saved',
      detail: 'Grind and group head fixes restore shot quality before technician dispatch.',
    },
    businessImpact: {
      technicianCostAvoided: '$180',
      downtimeAvoided: '~25 min',
      staffConfidence: '+38% barista self-adjustment',
      maintenanceCompliance: 'Group head deep clean due this week',
      estimatedAnnualSavings: 'Est. $1,440/yr across 6 stores',
    },
    processingMessages: [
      'Reviewing extraction quality…',
      'Checking grind and dose settings…',
      'Matching under-extraction patterns…',
      'Generating diagnosis…',
    ],
  },
]

const defaultProfile = profiles[0]

function scoreProfile(text: string, profile: SymptomProfile): number {
  const lower = text.toLowerCase()
  let score = 0
  for (const kw of profile.keywords) {
    if (lower.includes(kw)) score += 1
  }
  if (profile.id === 'extraction') {
    if (lower.includes('bitter') && (lower.includes('slow') || lower.includes('extract'))) score += 2
    if (lower.includes('sour') && lower.includes('bitter')) score += 1
  }
  if (profile.id === 'steam' && lower.includes('pressure') && lower.includes('steam')) score += 1
  if (profile.id === 'weak-coffee' && lower.includes('weak') && lower.includes('water')) score += 2
  return score
}

function findMatchedSignals(text: string, profile: SymptomProfile): string[] {
  const lower = text.toLowerCase()
  return profile.signals.filter((signal) =>
    signal.split(' ').every((word) => lower.includes(word) || profile.keywords.some((k) => lower.includes(k))),
  )
}

export function analysePhoenixSymptoms(input: string): PhoenixDiagnosisResult {
  const trimmed = input.trim()
  if (trimmed.length < 3) {
    return buildResult(defaultProfile, trimmed, 42, ['general fault description'])
  }

  let best = defaultProfile
  let bestScore = 0
  for (const profile of profiles) {
    const score = scoreProfile(trimmed, profile)
    if (score > bestScore) {
      bestScore = score
      best = profile
    }
  }

  const matchedKeywords = best.keywords.filter((k) => trimmed.toLowerCase().includes(k))
  const signals = matchedKeywords.length > 0 ? matchedKeywords.slice(0, 4) : findMatchedSignals(trimmed, best)
  const confidence = Math.min(92, Math.max(48, 52 + bestScore * 8 + Math.min(trimmed.length / 8, 12)))

  return buildResult(best, trimmed, Math.round(confidence), signals.length > 0 ? signals : [trimmed.slice(0, 40)])
}

function buildResult(
  profile: SymptomProfile,
  input: string,
  confidence: number,
  matchedSignals: string[],
): PhoenixDiagnosisResult {
  const vague = input.trim().length < 12
  const insight = vague
    ? `${profile.insight} Add more detail next time for a sharper match.`
    : profile.insight

  return {
    confidence,
    insight,
    matchedSignals,
    causes: profile.causes,
    recommendations: profile.recommendations,
    outcomePreview: profile.outcomePreview,
    businessImpact: profile.businessImpact,
    processingMessages: profile.processingMessages,
  }
}

export const phoenixSymptomExamples = [
  { label: 'Coffee is bitter', text: 'Coffee is bitter and extracting slowly - shots running over 35 seconds.' },
  { label: 'Slow extraction', text: 'Extraction is very slow with a sour-bitter finish on every shot.' },
  { label: 'Low steam pressure', text: 'Steam pressure is low - wand weak and gauge below 1 bar.' },
  { label: 'Machine leaking', text: 'Machine leaking underneath the group head after each shot.' },
  { label: 'Temperature unstable', text: 'Brew temperature keeps fluctuating - shots hot then cold, inconsistent throughout the day.' },
  { label: 'Weak coffee', text: 'Coffee tastes weak and watery - pale crema, under-extracted on every shot.' },
]
