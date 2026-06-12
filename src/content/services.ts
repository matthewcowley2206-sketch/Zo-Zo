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
    title: 'Prototype Development',
    tagline: 'See your idea working - before you commit to building it.',
    summary:
      'We build clickable, working mock-ups of your idea - an app, customer journey, dashboard, or workflow - so you can test, share, and decide before spending on full development.',
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
    relatedSlugs: ['strategy', 'go-to-market'],
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
      { question: 'Can strategy include prototyping?', answer: 'Yes. When direction needs more than words, we can build working mock-ups so your team sees where you are headed. See Prototype Development.' },
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
    tagline: 'Stop guessing what clients want. Hear what they are really telling you.',
    summary:
      'Most businesses guess what their clients want. You do not have to. We deliver insight that is practical, usable, and impossible to ignore.',
    whoFor: 'Leaders who suspect they are missing something - but need proof, not assumptions.',
    includes: [
      'Tailored interview program with clients and internal teams',
      'Interview guides built to uncover insight, not polite answers',
      'Insights pack (10-15 slides) with themes and blind spots',
      'Strategy-on-a-page summarising what needs attention now',
      'Clarity workshop to align leaders and move together',
      'Exec briefings and reusable Client Listening playbook',
    ],
    approachTitle: 'Real insight, not survey theatre.',
    approachDescription:
      'We design conversations that uncover what clients actually think - then translate findings into decisions you can act on.',
    processSteps: [
      { number: '01', title: 'Design the listening program', description: 'We define who to talk to, what to ask, and what decisions the insight needs to inform.' },
      { number: '02', title: 'Run the conversations', description: 'Structured interviews with clients and internal teams - designed for honesty, not politeness.' },
      { number: '03', title: 'Find the patterns', description: 'We synthesise themes, blind spots, and the gaps between what you assume and what clients experience.' },
      { number: '04', title: 'Align leadership', description: 'A clarity workshop so leaders see the same picture and agree on what needs to change.' },
      { number: '05', title: 'Leave a playbook', description: 'So you can keep listening - not just run a one-off project.' },
    ],
    faq: [
      { question: 'How many clients do you interview?', answer: 'Enough to see patterns - typically a focused set chosen with you, not a statistically massive survey.' },
      { question: 'Will clients be honest?', answer: 'That is why we design the program carefully - and often hear things internal teams never get told directly.' },
      { question: 'What do I actually receive?', answer: 'An insights pack, a strategy-on-a-page, and usually a workshop to align your team on what it means.' },
    ],
    outcomes: [
      'Honest insight into what clients value and where you fall short',
      'Themes and blind spots you can act on immediately',
      'Leadership aligned on what needs to change',
    ],
    relatedSlugs: ['strategy', 'sales-marketing'],
    prototypeNote:
      'Insights land harder when clients can react to something real. We can turn findings into quick prototypes that make feedback concrete.',
  },
  {
    slug: 'sales-marketing',
    title: 'Sales & Marketing',
    tagline: 'Clear positioning and a plan you can run - without burning out.',
    summary:
      'Marketing does not need to be loud, complicated, or everywhere. It needs to be clear.',
    whoFor: 'Businesses ready to reach more of the right people - without the noise.',
    includes: [
      'Positioning statement in plain English',
      'Go-to-market plan built around where your audience is',
      'Simple content plan for consistent visibility',
      'Customer journey outline showing where you lose people',
      'Sales pitch packs for teams on the road',
      'Website tweaks, messaging refreshes, and more',
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
    relatedSlugs: ['go-to-market', 'communication'],
  },
  {
    slug: 'communication',
    title: 'Communication & Clarity',
    tagline: 'Turn your thinking into messages people actually understand.',
    summary:
      'Great ideas fall flat if they are not communicated clearly. We help your message land - with your team, clients, or board.',
    whoFor: 'Leaders rolling out change who need everyone pulling in the same direction.',
    includes: [
      'Board-ready presentations without the waffle',
      'Executive summaries that get to the point',
      'Team communication packs for direction and context',
      'Briefing notes for board, investors, or leadership',
      'Staff comms for new strategies or changes',
      'FAQs, talking points, scripts, and explainers',
    ],
    approachTitle: 'Say it once. Say it clearly.',
    approachDescription:
      'We turn complex thinking into messages that land - whether the audience is your board, your team, or your clients.',
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
      'Messages that people actually understand',
      'Materials ready for board, team, or clients',
      'Less confusion and faster alignment during change',
    ],
    relatedSlugs: ['strategy', 'sales-marketing'],
  },
  {
    slug: 'data-ai',
    title: 'Data, AI & Insights',
    tagline: 'Practical AI and data clarity - for humans, not tech teams.',
    summary:
      'AI should feel like gaining time back - not like learning a new language.',
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
      'We streamline messy processes and automate the bits you hate so things feel lighter every day.',
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
      { question: 'Can you prototype the customer experience?', answer: 'Yes. Seeing the offer in action before launch is one of the most valuable things we do. See Prototype Development.' },
      { question: 'Do you guarantee sales?', answer: 'No - but we give you a clear plan, sharp messaging, and a way to learn fast instead of guessing.' },
    ],
    outcomes: [
      'A go-to-market plan you can execute week by week',
      'Messaging that explains your offer clearly',
      'A test-and-learn approach that reduces launch risk',
    ],
    relatedSlugs: ['prototype-development', 'sales-marketing'],
    prototypeNote:
      'Launch plans land better when people can see the offer in action. We build mock-ups to test messaging, flows, and positioning before go-live.',
  },
]

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getRelatedServices(slug: string): Service[] {
  const service = getService(slug)
  if (!service) return []
  return service.relatedSlugs
    .map((s) => getService(s))
    .filter((s): s is Service => s !== undefined)
}
