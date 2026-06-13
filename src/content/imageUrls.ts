/** High-resolution Unsplash URLs - people-first, contextual imagery. Each ID used once site-wide. */
export function hiRes(photoId: string, width = 1800): string {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=85`
}

export const photos = {
  strategyTeam: 'photo-1522202176988-66273c2fd55f',
  strategyWhiteboard: 'photo-1553877522-43269d4ea984',
  clientConversation: 'photo-1517245386807-bb43f82c33c4',
  clientFollowUp: 'photo-1573497019940-1c28c88b4f3e',
  salesMeeting: 'photo-1552664730-d307ca884978',
  salesCollaboration: 'photo-1556761175-4b46a572b786',
  commPresentation: 'photo-1542744173-8e7e53415bb0',
  commDiscussion: 'photo-1551836022-d5d88e9218df',
  dataTeam: 'photo-1519389950473-47ba0277781c',
  dataInsights: 'photo-1460925895917-afdab827c52f',
  opsPlanning: 'photo-1556761175-b413da4baf72',
  opsAlignment: 'photo-1560250097-0b93528c311a',
  prototypeReview: 'photo-1522071820081-009f0129c71c',
  opsWorkshop: 'photo-1529156069898-49953e39b3ac',
  gtmPlanning: 'photo-1758518731706-be5d5230e5a5',
  gtmStakeholders: 'photo-1521791136064-7986c2920216',
  demoAirport: 'photo-1436491865332-7a61a109cc05',
  demoCafe: 'photo-1495474472287-4d71bcdd2085',
  demoLegal: 'photo-1551288049-bebda4e38f71',
  homeHero: 'photo-1560472354-b33ff0c44a43',
  founderPortrait: 'photo-1472099645785-5658abf4ff4e',
} as const
