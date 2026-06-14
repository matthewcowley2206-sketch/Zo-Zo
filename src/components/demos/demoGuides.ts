import type { DemoAnnotationContent } from './DemoAnnotations'

export type GuideStep = {
  id: string
  target: string
  hint: string
  recovery?: string
  annotation?: DemoAnnotationContent
}

export type DemoGuideConfig = {
  id: string
  title: string
  intro: string
  steps: GuideStep[]
  scopeNote: string
  completeMessage: string
  device?: 'phone' | 'desktop'
}

export const demoGuides: Record<string, DemoGuideConfig> = {
  'horizon-airways': {
    id: 'horizon-airways',
    title: 'Loyalty & travel day',
    intro:
      'This is a working prototype inside the phone. Follow the glowing tap - brief notes appear as you go.',
    completeMessage:
      'You have seen the core journey. Keep exploring - Book, Miles, and lounge pass are all live.',
    scopeNote:
      'Simplified from a global loyalty replatform. Production adds partner airlines, fare rules, fraud, and dozens of integrations - this was enough for leadership to commit.',
    steps: [
      {
        id: 'trip',
        target: 'trip-card',
        hint: "Tap today's flight under Upcoming trips.",
        recovery: 'Use the Home tab - look for Tier status, Miles balance, then Upcoming trips.',
        annotation: {
          id: 'home-loyalty',
          clientAsk:
            'a single app where frequent flyers see tier status, miles, and upcoming trips without jumping between systems.',
          ourSolution:
            'a loyalty-first home screen - tier, balance, and next flight on one view, ready for executive walkthroughs.',
        },
      },
      {
        id: 'upgrade',
        target: 'upgrade-btn',
        hint: 'Try upgrading with miles before check-in.',
        recovery: 'Open your trip first, then tap Upgrade with miles.',
        annotation: {
          id: 'upgrade',
          clientAsk: 'to test miles redemption before wiring to the loyalty engine.',
          ourSolution:
            'full upgrade path with balance preview - rules debated in workshops, not in Jira.',
        },
      },
      {
        id: 'checkin',
        target: 'checkin-btn',
        hint: 'Complete check-in - seats and Gold benefits together.',
        recovery: 'From your trip, tap Check in, pick a seat, then complete check-in.',
        annotation: {
          id: 'checkin',
          clientAsk: 'check-in, seats, and loyalty benefits in one journey - not three apps.',
          ourSolution: 'unified check-in respecting tier, upgrade, and lounge eligibility.',
        },
      },
      {
        id: 'boarding',
        target: 'boarding-btn',
        hint: 'Open your boarding pass.',
        recovery: 'After check-in, tap View boarding pass on the trip screen.',
        annotation: {
          id: 'boarding',
          clientAsk: 'boarding pass with tier, lounge, and miles earned on one card.',
          ourSolution: 'single boarding pass pulling tier benefits and trip details together.',
        },
      },
      {
        id: 'lounge',
        target: 'lounge-btn',
        hint: 'Open your Gold lounge pass.',
        recovery: 'From the trip screen, tap Open lounge pass.',
        annotation: {
          id: 'lounge',
          clientAsk: 'digital lounge passes for Gold - no PDF, no separate app.',
          ourSolution: 'pass generated from tier + trip in the same record.',
        },
      },
    ],
  },
  'phoenix-coffee': {
    id: 'phoenix-coffee',
    title: 'Order & loyalty',
    intro:
      'Tap through a real order flow inside the phone. Each step shows what the client asked for.',
    completeMessage:
      'Order flow complete. Try Rewards and Account tabs - or reorder from home.',
    scopeNote:
      'Built to validate ordering, loyalty, and pickup flows across six stores. Production ties into POS, kitchen displays, and inventory - this prototype settled the UX first.',
    steps: [
      {
        id: 'reorder',
        target: 'usual-btn',
        hint: 'Your home shows tier, points, and next reward - tap Your usual to reorder.',
        recovery: 'On Home, review your points and next reward, then tap Your usual.',
        annotation: {
          id: 'reorder',
          clientAsk: 'regulars to see points, next reward, and reorder in under two taps.',
          ourSolution:
            'home screen with tier, points progress, next reward, and one-tap favourite - tested with store managers before build.',
        },
      },
      {
        id: 'customise',
        target: 'add-order-btn',
        hint: 'Add your drink to the order.',
        recovery: 'Pick size and milk first, then tap Add to order.',
        annotation: {
          id: 'custom',
          clientAsk: 'customisation without overwhelming casual orderers.',
          ourSolution:
            'progressive options - size first, then milk, then extras. Reduced cart abandon in testing.',
        },
      },
      {
        id: 'schedule',
        target: 'schedule-btn',
        hint: 'Schedule pickup for the morning commute.',
        recovery: 'From your cart, tap Pickup time · schedule ahead.',
        annotation: {
          id: 'schedule',
          clientAsk: 'order-ahead with schedule pickup for the morning commute crowd.',
          ourSolution:
            'schedule picker on checkout - killed same-day-only MVP after one user test.',
        },
      },
      {
        id: 'place',
        target: 'place-order-btn',
        hint: 'Place the order and see loyalty update.',
        recovery: 'Return to your cart, then tap Place order.',
        annotation: {
          id: 'order',
          clientAsk: 'confirmation that shows points earned and tier progress after order.',
          ourSolution:
            'order confirmation with scheduled pickup, points earned, and progress to next reward.',
        },
      },
    ],
  },
  'northgate-legal': {
    id: 'northgate-legal',
    title: 'Client portal',
    intro:
      'Walk through a matter as the client would. Highlights show exactly where to tap next.',
    completeMessage:
      'Core portal flows covered. Browse Matters, Chat, and Docs tabs freely.',
    scopeNote:
      'A decision-grade prototype for a top-tier firm. Production adds DMS integration, privilege rules, audit trails, and SSO - this let partners click through the experience in one sitting.',
    steps: [
      {
        id: 'matter',
        target: 'matter-card',
        hint: 'Open the Harbour Tower matter from your dashboard.',
        recovery: 'From Home, tap Harbour Tower acquisition.',
        annotation: {
          id: 'portal-home',
          clientAsk:
            'clients to see matter status, deadlines, and next actions without calling the partner.',
          ourSolution:
            'a dashboard with progress, responsible partner, and pending tasks - partners validated layout in a single workshop.',
        },
      },
      {
        id: 'upload',
        target: 'upload-btn',
        hint: 'Upload documents from the matter screen.',
        recovery: 'Open a matter first, then tap Upload documents.',
      },
      {
        id: 'upload-tap',
        target: 'upload-zone',
        hint: 'Tap to upload a file.',
        recovery: 'Tap Upload documents, then tap the upload area.',
        annotation: {
          id: 'upload',
          clientAsk: 'clients to upload due diligence files without email attachments.',
          ourSolution:
            'drag-and-drop upload with matter tagging and partner notification - DMS integration scoped for phase two.',
        },
      },
      {
        id: 'message',
        target: 'message-btn',
        hint: 'Send a message to your partner.',
        recovery: 'From the matter screen, tap Message partner.',
      },
      {
        id: 'send',
        target: 'send-message-btn',
        hint: 'Send the message.',
        recovery: 'Open Message partner, then tap Send message.',
        annotation: {
          id: 'msg',
          clientAsk: 'secure client-to-partner messaging without email chains.',
          ourSolution:
            'in-portal messaging tied to matter record - compliance reviewed the flow before build.',
        },
      },
    ],
  },
  'brightline-studio': {
    id: 'brightline-studio',
    title: 'Enquiry to quote',
    device: 'desktop',
    intro:
      'This is a desk workflow prototype — not a chatbot. Follow the steps to turn a vague brief into a sendable quote.',
    completeMessage:
      'Walkthrough complete. Try toggling phases or switching quote tiers — the preview updates instantly.',
    scopeNote:
      'Simulated AI — production would connect to your templates, rate card, CRM, and approval rules. This prototype was enough for leadership to agree what to build first.',
    steps: [
      {
        id: 'enquiry',
        target: 'enquiry-card',
        hint: 'Read the enquiry — vague brief, flexible budget, tight deadline.',
        recovery: 'Start on the New enquiry screen and review the message from Marcus.',
        annotation: {
          id: 'enquiry',
          clientAsk:
            'to stop losing half a day every time a hot lead lands in the inbox with a vague brief.',
          ourSolution:
            'a structured intake view that captures the messy enquiry before anyone opens a spreadsheet.',
        },
      },
      {
        id: 'generate',
        target: 'generate-btn',
        hint: 'Tap Turn into scope — watch structured output appear in seconds.',
        recovery: 'From the enquiry screen, tap Turn into scope.',
        annotation: {
          id: 'generate',
          clientAsk: 'scope drafted from enquiry without starting from a blank doc.',
          ourSolution:
            'one action that produces editable blocks — phases, assumptions, and questions — not a wall of AI text.',
        },
      },
      {
        id: 'edit',
        target: 'scope-toggle',
        hint: 'Toggle a phase off to show the quote is editable, not a black box.',
        recovery: 'On the scope screen, tap Brand refresh to toggle it off.',
        annotation: {
          id: 'edit',
          clientAsk: 'the team to adjust scope before pricing — not after the quote is sent.',
          ourSolution:
            'phase toggles wired to the quote — leadership saw pricing shift in the same session.',
        },
      },
      {
        id: 'tier',
        target: 'tier-recommended',
        hint: 'Pick Recommended — same scope, different packaging.',
        recovery: 'Tap Continue to quote options, then select Recommended.',
        annotation: {
          id: 'tier',
          clientAsk: 'three clear options instead of one take-it-or-leave-it number.',
          ourSolution:
            'Essential / Recommended / Full tiers — mirrors how they actually sell, tested in one workshop.',
        },
      },
      {
        id: 'send',
        target: 'send-preview-btn',
        hint: 'Send the quote preview — the moment they would share with the client.',
        recovery: 'Open the quote preview, then tap Send preview.',
        annotation: {
          id: 'send',
          clientAsk: 'a quote they could stand behind before integrating CRM, Xero, or e-sign.',
          ourSolution:
            'sendable preview with line items and timeline — scoped CRM integration for phase two.',
        },
      },
    ],
  },
}
