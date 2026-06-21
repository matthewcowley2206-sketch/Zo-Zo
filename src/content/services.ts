export type ServiceStep = {
  number: string
  title: string
  description: string
}

export type ServiceFaq = {
  question: string
  answer: string
}

export type Service = {
  slug: string
  title: string
  tagline: string
  summary: string
  whoFor: string
  includes: string[]
  approachTitle: string
  approachDescription: string
  processSteps: ServiceStep[]
  faq: ServiceFaq[]
  outcomes: string[]
  relatedSlugs: string[]
  prototypeNote?: string
}

export const services: Service[] = [
  {
    slug: 'prototype-development',
    title: 'Test Before You Invest',
    tagline: 'Validate ideas and reduce uncertainty before you commit serious spend.',
    summary:
      'We build working prototypes you can click through - apps, customer journeys, dashboards, or workflows - so leaders can test assumptions, gather feedback, and decide with evidence. Not a software development agency.',
    whoFor:
      'Leaders with a new idea, high stakes, or stakeholders who need to see it working - not just read about it in a deck.',
    includes: [
      'Discovery session to define what needs testing and why',
      'Working clickable prototype tailored to your idea',
      'Shareable mock-up for your team, board, or clients',
      'Feedback iteration before build commitment',
      'Handover blueprint ready for your dev team',
      'Optional user testing and validation support',
    ],
    approachTitle: 'From idea to something you can click through.',
    approachDescription:
      'We do not wireframe in isolation. We build working prototypes fast enough to learn, polished enough to share - so you can validate direction before development spend.',
    processSteps: [
      { number: '01', title: 'Define what to test', description: 'We clarify the idea, the audience, and what success looks like for the prototype.' },
      { number: '02', title: 'Design the experience', description: 'We map the flows and interactions that matter most - focused, not bloated.' },
      { number: '03', title: 'Build the prototype', description: 'We create a clickable mock-up your stakeholders can actually use.' },
      { number: '04', title: 'Gather feedback', description: 'You test it, we iterate. Assumptions get challenged while change is still cheap.' },
      { number: '05', title: 'Hand over with clarity', description: 'You leave with a validated direction and a blueprint for development if you choose to build.' },
    ],
    faq: [
      {
        question: 'What is prototype development?',
        answer:
          'Prototype development is building a clickable, working mock-up of an idea - an app flow, dashboard, portal, or workflow - so you can test, share, and refine direction before committing to full software development.',
      },
      {
        question: 'What does prototype development include at Zo&Zo?',
        answer:
          'Discovery to define what to test, a tailored clickable prototype, shareable mock-ups for stakeholders, feedback iteration, and a handover blueprint for your dev team if you choose to build.',
      },
      {
        question: 'How much does prototype development cost?',
        answer:
          'Typical prototype development engagements start from $8,500 ex GST, scoped to your idea and key flows. You receive a fixed quote after a clarity call - see our pricing page for starting points.',
      },
      { question: 'What is a working prototype?', answer: 'A clickable, interactive mock-up of an idea - built quickly so you can see and test it before committing to full development.' },
      { question: 'Is this the same as building the real product?', answer: 'No. Prototypes are built to learn and align - not to go live. Faster, cheaper, and designed to answer whether this is the right direction.' },
      { question: 'When does prototyping make sense?', answer: 'When the idea is new, stakes are high, stakeholders cannot agree from a deck alone, or you need feedback on something tangible.' },
      { question: 'How long does it take?', answer: 'From a few days for a focused flow to a couple of weeks for something richer. We scope together before anything starts.' },
      { question: 'Who owns the prototype?', answer: 'You do. Use it internally, share it, or hand it to a dev team as a blueprint.' },
    ],
    outcomes: [
      'A working prototype you can click through and share',
      'Validated direction before major development spend',
      'Shared understanding across stakeholders',
      'A clear blueprint if you choose to build',
    ],
    relatedSlugs: ['strategy', 'growth-gtm'],
  },
  {
    slug: 'strategy',
    title: 'Strategy & Direction',
    tagline: 'Turn scattered ideas into a clear plan you can actually follow.',
    summary:
      'We help you stop overthinking and start moving with a plan that feels doable, not overwhelming.',
    whoFor: 'Owners who know where they want to go - but need the path mapped clearly.',
    includes: [
      'Strategy-on-a-Page that makes direction feel obvious',
      'Strategy Pack (10-15 slides) for your team or board',
      'Practical 30/60/90-day action plan',
      'Prioritisation workshop for hard decisions',
      'Decision-making Playbook for the calls that matter',
      'Board-ready presentations, rhythms, and metrics',
    ],
    approachTitle: 'Less noise. One clear direction.',
    approachDescription:
      'We take what is already in your head and structure it into something your team can follow - without a 100-page document nobody reads.',
    processSteps: [
      { number: '01', title: 'Understand where you are', description: 'We listen to what you are juggling - growth, operations, team, clients - and where strategy keeps slipping.' },
      { number: '02', title: 'Clarify the direction', description: 'We cut through competing priorities and define what matters now versus later.' },
      { number: '03', title: 'Build the plan', description: 'Strategy-on-a-page, action plans, and the rhythms to keep everyone aligned.' },
      { number: '04', title: 'Align your team', description: 'We help you communicate direction so people pull in the same direction.' },
      { number: '05', title: 'Review and adjust', description: 'Strategy is not set-and-forget. We help you revisit as the business moves.' },
    ],
    faq: [
      { question: 'How is this different from a business plan?', answer: 'Shorter, sharper, and built to use - not sit in a drawer. Most clients leave with a one-page direction and a 90-day plan they actually follow.' },
      { question: 'Do I need a full strategy project?', answer: 'Not always. Some clients need a clarity session and a strategy-on-a-page. Others want a deeper pack for their board. We scope to fit.' },
      { question: 'Can strategy include prototyping?', answer: 'Yes. When direction needs more than words, we can build working mock-ups so your team sees where you are headed. See Test Before You Invest.' },
    ],
    outcomes: [
      'A clear direction everyone understands',
      'Priorities you can defend and act on',
      'A practical plan for the next 30, 60, and 90 days',
    ],
    relatedSlugs: ['prototype-development', 'client-listening'],
    prototypeNote:
      'When strategy needs more than a deck, we can prototype key experiences so your team can see the direction - not just read it.',
  },
  {
    slug: 'client-listening',
    title: 'Client Listening',
    tagline: 'Hear what clients are really telling you - then turn it into strategy that sticks.',
    summary:
      'Client listening is often the first step. We run structured conversations, extract insights that inform strategy, measure satisfaction with NPS and CSAT, and embed a 360 loop - listen, act, close, measure - with personas and intelligent automation where it helps.',
    whoFor: 'Leaders who suspect they are missing something - and want a repeatable loop, not a one-off survey.',
    includes: [
      'Starter support package - briefing packs, question sets, and interview guides if client listening is not set up yet',
      '360 client listening program - clients, stakeholders, and internal teams',
      'Facilitation support and runbooks - conversations that surface honest insight, not polite answers',
      'Insight extraction pack - themes, blind spots, and strategy implications',
      'NPS and CSAT baseline, tracking framework, and executive dashboard',
      'Client personas and intelligent relationship profiles',
      'Strategy-on-a-page informed by listening - handoff to strategic choices',
      'Close-the-loop playbook - action feedback and tell clients what changed',
      'AI and automation roadmap across the listening workflow',
      'Leadership workshop to align on findings and next steps',
    ],
    approachTitle: 'The 360 loop - listen, insight, act, close, embed.',
    approachDescription:
      'We design a logical workflow: listen to clients, extract insights that inform strategy, act on feedback, close the loop with clients, and measure with NPS and CSAT. Then we help you embed the framework - with personas, automation, and AI where it adds value.',
    processSteps: [
      { number: '01', title: 'Design the program', description: 'Starter pack or full program - who to listen to, what decisions insight must inform, and how NPS/CSAT fit the rhythm.' },
      { number: '02', title: 'Listen', description: 'Structured interviews and conversations - clients and internal teams - built for honesty.' },
      { number: '03', title: 'Extract insights', description: 'Themes, blind spots, gaps between assumption and experience - synthesised for leadership.' },
      { number: '04', title: 'Inform strategy', description: 'Insights pack and strategy-on-a-page so listening feeds strategic choices, not a slide deck only.' },
      { number: '05', title: 'Act & close the loop', description: 'Prioritised actions, owners, and client updates so people see feedback became change.' },
      { number: '06', title: 'Measure & embed', description: 'NPS, CSAT, personas, and an automation/AI roadmap so the loop runs continuously.' },
    ],
    faq: [
      { question: 'How does this connect to strategy?', answer: 'Listening is the input. We extract insights and translate them into a strategy-on-a-page and choices your leadership can act on - often as the next engagement step.' },
      { question: 'Do we get NPS and CSAT scores?', answer: 'Yes. We establish baseline and tracking as deliverables - not just interview quotes. You see trends, drivers, and where to act.' },
      { question: 'What are client personas in this context?', answer: 'Intelligent profiles of key client segments - what they value, how they decide, and how to manage the relationship - refreshed from listening and survey data.' },
      { question: 'Where does AI and automation fit?', answer: 'Across the loop: interview synthesis, insight tagging, action workflows, close-loop comms, survey pulses, and persona updates. We identify what to automate vs keep human.' },
    ],
    outcomes: [
      'Honest insight into what clients value and where experience breaks down',
      'NPS and CSAT baseline with a clear tracking rhythm',
      'Client personas and relationship approaches your team can use daily',
      'Insights that inform strategy - not reports that gather dust',
      'A 360 listening framework embedded with automation where it helps',
    ],
    relatedSlugs: ['strategy', 'prototype-development'],
    prototypeNote:
      'When clients need to react to something tangible, we can prototype service or product changes informed by listening - so feedback becomes something they can click through.',
  },
  {
    slug: 'sales-marketing',
    title: 'Sales & Marketing',
    tagline: 'Clear positioning and a plan you can run - without burning out.',
    summary:
      'We sharpen who you are for, where you show up, and what you say - so marketing and sales pull in the same direction without burning out.',
    whoFor: 'Businesses ready to reach more of the right people - without spreading thin or sounding generic.',
    includes: [
      'Positioning statement in plain English',
      'Go-to-market plan built around where your audience actually is',
      'Simple content plan for consistent visibility',
      'Customer journey outline - where you win and where you lose people',
      'Sales pitch packs so the team says the same thing on the road',
      'Messaging refreshes for website, decks, and key touchpoints',
    ],
    approachTitle: 'Clear message. Consistent reach.',
    approachDescription:
      'We help you understand why people choose you - then build a plan you can actually run without burning out your team.',
    processSteps: [
      { number: '01', title: 'Clarify your value', description: 'Why customers choose you - in plain English, not marketing jargon.' },
      { number: '02', title: 'Map the journey', description: 'Where prospects find you, where they drop off, and what needs to change.' },
      { number: '03', title: 'Build the plan', description: 'Channels, content, and cadence that fit your capacity - not an impossible wish list.' },
      { number: '04', title: 'Equip your team', description: 'Pitch packs, messaging, and tools so sales and marketing say the same thing.' },
      { number: '05', title: 'Review what works', description: 'Simple rhythms to see what is landing and adjust without starting over.' },
    ],
    faq: [
      { question: 'Do you run campaigns for us?', answer: 'We focus on clarity and plan - the strategy, messaging, and structure. Execution can stay with your team or partners.' },
      { question: 'We have tried marketing before and it did not work.', answer: 'Often the issue is unclear positioning or too many channels. We simplify before we scale.' },
      { question: 'Can you help with our website?', answer: 'Yes - messaging refreshes and structural tweaks are often part of the engagement.' },
    ],
    outcomes: [
      'Positioning that explains your value in one breath',
      'A go-to-market plan your team can follow',
      'Sales and marketing pulling in the same direction',
    ],
    relatedSlugs: ['growth-gtm', 'communication'],
  },
  {
    slug: 'communication',
    title: 'Communication & Clarity',
    tagline: 'Storytelling and clarity for board, team, and clients.',
    summary:
      'Great ideas fall flat when the message is muddy. We use storytelling to turn complex thinking into narratives your board, team, and clients actually understand.',
    whoFor: 'Leaders rolling out change who need everyone pulling in the same direction.',
    includes: [
      'Narrative spine and storytelling frameworks for your core message',
      'Client narrative development for proposals, updates, and key accounts',
      'Board-ready presentations without the waffle',
      'Executive summaries that get to the point',
      'Team communication packs for direction and context',
      'Briefing notes for board, investors, or leadership',
      'Staff comms for new strategies or changes',
      'FAQs, talking points, scripts, and explainers',
    ],
    approachTitle: 'Find the story. Tell it clearly.',
    approachDescription:
      'We shape a narrative spine first - then build the materials that carry it. Board, team, client, and rollout - one story, told well.',
    processSteps: [
      { number: '01', title: 'Understand the audience', description: 'Who needs to hear this, what they care about, and what they need to do differently.' },
      { number: '02', title: 'Distil the message', description: 'Cut the waffle. Find the one thing that needs to land.' },
      { number: '03', title: 'Build the materials', description: 'Decks, briefs, FAQs, and talking points - matched to how people actually consume information.' },
      { number: '04', title: 'Support the rollout', description: 'Help leaders deliver the message consistently across channels.' },
      { number: '05', title: 'Leave reusable assets', description: 'Templates and playbooks so the next communication is easier.' },
    ],
    faq: [
      { question: 'Can you write our board deck?', answer: 'Yes - board-ready presentations are a core deliverable. Clear structure, no filler.' },
      { question: 'We are rolling out a big change. Can you help?', answer: 'That is exactly where this service fits - team packs, FAQs, and leader talking points so everyone understands the why.' },
      { question: 'Do you present on our behalf?', answer: 'We prepare you and your leaders to present with confidence. Coaching can be part of the engagement.' },
    ],
    outcomes: [
      'A clear narrative spine your leaders can repeat',
      'Client narratives and materials ready for board, team, or clients',
      'Less confusion and faster alignment during change',
    ],
    relatedSlugs: ['strategy', 'growth-gtm'],
  },
  {
    slug: 'data-ai',
    title: 'Data, AI & Insights',
    tagline: 'Practical AI and data clarity - for humans, not tech teams.',
    summary:
      'AI and data should save time and sharpen decisions - not add jargon or another tool nobody uses.',
    whoFor: 'Owners who know data and AI matter - but need them to work in the real world.',
    includes: [
      'Small automations that save hours each week',
      'AI prompts and playbooks designed for your business',
      'Data clarity session on the numbers that matter',
      'Dashboard optimisation (Power BI, Tableau)',
      'Practical AI roadmap for quick wins and long-term gains',
      'Training, templates, and workflow redesign',
    ],
    approachTitle: 'AI and data that actually help you decide.',
    approachDescription:
      'No hype, no jargon. We find the numbers and automations that save time and improve decisions - then make them usable for your team.',
    processSteps: [
      { number: '01', title: 'Find what matters', description: 'Which numbers actually drive decisions - and which reports nobody uses.' },
      { number: '02', title: 'Spot quick wins', description: 'Small automations and AI uses that save hours without a major IT project.' },
      { number: '03', title: 'Build practical tools', description: 'Prompts, playbooks, dashboards, and workflows your team can use tomorrow.' },
      { number: '04', title: 'Train your people', description: 'So adoption sticks - not another tool nobody touches.' },
      { number: '05', title: 'Map the roadmap', description: 'What to do next quarter, not just next week.' },
    ],
    faq: [
      { question: 'We are not a tech company. Is this still for us?', answer: 'Especially for you. This service is built for humans, not IT departments - practical wins in plain language.' },
      { question: 'Do you build custom AI products?', answer: 'We focus on practical application - prompts, automations, and workflows - not building software products from scratch.' },
      { question: 'Can you fix our dashboards?', answer: 'Yes. Power BI and Tableau optimisation is a common part of this work.' },
    ],
    outcomes: [
      'Clarity on the numbers that actually matter',
      'Time saved through practical automations',
      'An AI roadmap your team can follow',
    ],
    relatedSlugs: ['operations', 'prototype-development'],
    prototypeNote:
      'Dashboards and AI workflows make more sense when you can click through them. We prototype what good looks like before you build or buy.',
  },
  {
    slug: 'operations',
    title: 'Operations & Simplification',
    tagline: 'Cut clutter. Streamline workflows. Make the business easier to run.',
    summary:
      'We map where work gets stuck, simplify the flow, and automate the repetitive bits - so the business feels lighter to run.',
    whoFor: 'Teams drowning in admin who need the business to run smoother.',
    includes: [
      'Process Mapping workshop to uncover bottlenecks',
      'Before & After workflow redesign',
      'Simple automation (emails, reminders, reporting, approvals)',
      'Standard Operating Procedures pack',
      'Team Roles & Responsibilities map',
      'Operational Efficiency playbook',
    ],
    approachTitle: 'Make the business easier to run.',
    approachDescription:
      'We find where work gets stuck, redesign the flow, and automate the repetitive bits - so your team spends time on what matters.',
    processSteps: [
      { number: '01', title: 'Map what happens today', description: 'Process mapping to see where time and energy disappear.' },
      { number: '02', title: 'Redesign the workflow', description: 'Before and after - simpler steps, clearer ownership.' },
      { number: '03', title: 'Automate the repetitive', description: 'Emails, reminders, approvals, reporting - the bits nobody wants to do manually.' },
      { number: '04', title: 'Document how it works', description: 'SOPs and role maps so the improvement sticks when people change.' },
      { number: '05', title: 'Leave a playbook', description: 'So you keep simplifying - not slide back into chaos.' },
    ],
    faq: [
      { question: 'We have tried process improvement before.', answer: 'We focus on what makes daily work lighter - not enterprise transformation theatre. Small number of high-impact flows first.' },
      { question: 'Do you implement the automation?', answer: 'Yes for simple setups. For complex systems we define what is needed and can work alongside your IT or vendors.' },
      { question: 'How long until we see results?', answer: 'Often within the first engagement - one or two redesigned processes can free hours every week.' },
    ],
    outcomes: [
      'Clearer workflows with less admin friction',
      'Automations that save real time',
      'SOPs and role clarity your team can follow',
    ],
    relatedSlugs: ['data-ai', 'strategy'],
  },
  {
    slug: 'go-to-market',
    title: 'Go-to-Market',
    tagline: 'Take your offering to market with confidence - not guesswork.',
    summary:
      'We sharpen your message, tighten your audience, and help you launch without the guesswork.',
    whoFor: 'Businesses with something new to sell - and no room to launch the wrong way.',
    includes: [
      'Go-to-Market Strategy Pack (10-15 slides)',
      'Refined value proposition and messaging framework',
      'Launch plan with a simple weekly sequence',
      'Audience segmentation and customer profiles',
      'Pricing guidance and offer structure templates',
      'Test-and-learn plan to launch quickly and improve',
    ],
    approachTitle: 'Launch with clarity, not hope.',
    approachDescription:
      'We help you take a new offer to market with a clear message, a realistic plan, and room to learn fast.',
    processSteps: [
      { number: '01', title: 'Sharpen the offer', description: 'Who it is for, why they care, and how it is different - in plain language.' },
      { number: '02', title: 'Define the audience', description: 'Segments, profiles, and where to find the right people.' },
      { number: '03', title: 'Build the launch plan', description: 'A weekly sequence you can actually execute - not a fantasy calendar.' },
      { number: '04', title: 'Test and learn', description: 'Small bets first, iterate based on what works.' },
      { number: '05', title: 'Scale what lands', description: 'Double down on what converts - cut what does not.' },
    ],
    faq: [
      { question: 'We are launching something new. Where do we start?', answer: 'Usually with the offer and audience - get those sharp before you spend on channels.' },
      { question: 'Can you prototype the customer experience?', answer: 'Yes. Seeing the offer in action before launch is one of the most valuable things we do. See Test Before You Invest.' },
      { question: 'Do you guarantee sales?', answer: 'No - but we give you a clear plan, sharp messaging, and a way to learn fast instead of guessing.' },
    ],
    outcomes: [
      'A go-to-market plan you can execute week by week',
      'Messaging that explains your offer clearly',
      'A test-and-learn approach that reduces launch risk',
    ],
    relatedSlugs: ['prototype-development', 'growth-gtm'],
    prototypeNote:
      'Launch plans land better when people can see the offer in action. We build mock-ups to test messaging, flows, and positioning before go-live.',
  },
  {
    slug: 'growth-gtm',
    title: 'Growth & Go-to-Market',
    tagline: 'Position, launch, and grow with confidence - not guesswork.',
    summary:
      'One coherent path from positioning to launch: sharpen your offer, reach the right audience, equip your team, and activate commercially - without separate sales and GTM tracks fighting each other.',
    whoFor:
      'Leaders who need clarity on messaging, audience, and a launch plan the team can actually execute.',
    includes: [
      'Positioning statement and value proposition in plain English',
      'Go-to-market strategy pack and week-by-week launch plan',
      'Customer journey map - where you win and where you lose people',
      'Content plan and channel approach that fits your capacity',
      'Sales pitch packs and enablement so teams say the same thing',
      'Test-and-learn roadmap to reduce launch risk',
    ],
    approachTitle: 'One growth story. One plan.',
    approachDescription:
      'We merged what used to be separate sales, marketing, and go-to-market work into a single engagement - because clients should not have to choose between overlapping services.',
    processSteps: [
      { number: '01', title: 'Clarify your value', description: 'Why customers choose you - sharp positioning, not marketing jargon.' },
      { number: '02', title: 'Define the audience', description: 'Segments, profiles, and where to find the right people.' },
      { number: '03', title: 'Build the plan', description: 'Channels, content, cadence, and launch sequence you can run.' },
      { number: '04', title: 'Equip the team', description: 'Pitch packs, messaging, and tools so sales and marketing align.' },
      { number: '05', title: 'Test, learn, and scale', description: 'Small bets first - double down on what converts.' },
    ],
    faq: [
      {
        question: 'How is Growth & Go-to-Market different from separate sales and marketing help?',
        answer:
          'It is one integrated offer. Positioning, journey, launch plan, and sales enablement belong together - we scope one engagement instead of sending you to two service pages.',
      },
      {
        question: 'Do you run campaigns for us?',
        answer:
          'We focus on clarity, strategy, and structure - the plan and messaging your team or partners can execute.',
      },
      {
        question: 'Can you prototype the customer experience before launch?',
        answer:
          'Yes. When seeing the offer in action matters, we connect this work with Test Before You Invest.',
      },
    ],
    outcomes: [
      'Positioning and messaging your team can repeat',
      'A go-to-market plan you can execute week by week',
      'Sales and marketing pulling in the same direction',
    ],
    relatedSlugs: ['prototype-development', 'communication'],
    prototypeNote:
      'Launch messaging lands better when stakeholders can click through the experience. We can prototype flows alongside GTM work.',
  },
]

import { legacyServiceRedirects } from './redirects'

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getRelatedServices(slug: string): Service[] {
  const service = getService(slug)
  if (!service) return []
  return service.relatedSlugs
    .map((relatedSlug) => {
      const resolvedSlug = legacyServiceRedirects[relatedSlug] ?? relatedSlug
      return getService(resolvedSlug)
    })
    .filter((s): s is Service => s !== undefined)
}