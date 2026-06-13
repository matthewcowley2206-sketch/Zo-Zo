export type StoryBeatId =
  | 'spine'
  | 'leadership'
  | 'internal'
  | 'client-narrative'
  | 'toolkit'

export type StoryBeat = {
  id: StoryBeatId
  beat: string
  title: string
  storyLine: string
  summary: string
  whatWeDo: string
  deliverables: string[]
  storySnippet: string
  outcome: string
}

export const narrativeSpine = [
  { label: 'Situation', hint: 'Where we are' },
  { label: 'Tension', hint: 'What is at stake' },
  { label: 'Turn', hint: 'What changes' },
  { label: 'Ask', hint: 'What we need' },
] as const

export const storyBeats: StoryBeat[] = [
  {
    id: 'spine',
    beat: 'Beat 1',
    title: 'Build the narrative spine',
    storyLine: 'Storytelling starts here',
    summary: 'Find the one story before you write a single slide.',
    whatWeDo:
      'We work with you to shape a narrative spine - situation, tension, turn, and ask - so every piece of communication tells the same story. This is where complex thinking becomes something people remember.',
    deliverables: [
      'Narrative spine and storytelling framework for your message',
      'Core storyline leadership can repeat in any room',
      'Audience map - who hears what, and in what order',
    ],
    storySnippet:
      'We are not losing on capability. We are losing because our story sounds like everyone else - and clients cannot see why us.',
    outcome: 'One clear story thread before materials get built.',
  },
  {
    id: 'leadership',
    beat: 'Beat 2',
    title: 'Leadership & board materials',
    storyLine: 'The story for the room',
    summary: 'Board decks, executive summaries, and briefing notes without the waffle.',
    whatWeDo:
      'We translate the narrative spine into board-ready presentations and executive summaries - structured so leaders walk in with a story, not a data dump.',
    deliverables: [
      'Board-ready presentations without the waffle',
      'Executive summaries that get to the point',
      'Briefing notes for board, investors, or leadership',
    ],
    storySnippet:
      'Here is what changed, here is what it means, here is the decision we need - three beats, ten minutes, no filler.',
    outcome: 'Leaders present with clarity and confidence.',
  },
  {
    id: 'internal',
    beat: 'Beat 3',
    title: 'Team & change comms',
    storyLine: 'The story inside the business',
    summary: 'Team packs and staff comms so everyone pulls the same way.',
    whatWeDo:
      'Internal audiences need the why before the what. We build team communication packs and staff comms that carry the same narrative through change - matched to how people actually read and act.',
    deliverables: [
      'Team communication packs for direction and context',
      'Staff comms for new strategies or changes',
      'Rollout sequence so the story lands consistently',
    ],
    storySnippet:
      'This change protects what clients value about us - here is what stays the same, here is what improves, here is what we need from you.',
    outcome: 'Less confusion and faster alignment during change.',
  },
  {
    id: 'client-narrative',
    beat: 'Beat 4',
    title: 'Client narrative development',
    storyLine: 'The story clients hear',
    summary: 'Client-facing narratives for proposals, updates, and key moments.',
    whatWeDo:
      'Clients do not buy bullet points - they buy a story they trust. We develop client narratives for proposals, account updates, and relationship moments so your value lands as a coherent story, not scattered messages.',
    deliverables: [
      'Client narrative development for proposals and key accounts',
      'Relationship storylines that explain value over time',
      'Client-ready explainers and update narratives',
    ],
    storySnippet:
      'You told us speed mattered. Here is how we redesigned the handoff - and what it means for your team from next month.',
    outcome: 'Clients understand your value - and feel part of the story.',
  },
  {
    id: 'toolkit',
    beat: 'Beat 5',
    title: 'Talking points & rollout toolkit',
    storyLine: 'The story on repeat',
    summary: 'FAQs, scripts, and templates so the narrative survives real conversations.',
    whatWeDo:
      'We equip leaders and frontline teams with FAQs, talking points, and scripts drawn from the same narrative spine - so the story holds up in Q&A, hallway chats, and follow-ups.',
    deliverables: [
      'FAQs, talking points, scripts, and explainers',
      'Leader toolkit for consistent delivery',
      'Reusable templates for the next communication',
    ],
    storySnippet:
      'When someone asks why now, everyone gives the same answer - because the story is written once and shared everywhere.',
    outcome: 'Messages people understand - and can repeat under pressure.',
  },
]

export const activityTitle = 'The narrative spine'
export const activityIntro =
  'Communication is storytelling. Follow the beats below - each expands to show how we shape the story, build the materials, and equip your team to tell it well.'
