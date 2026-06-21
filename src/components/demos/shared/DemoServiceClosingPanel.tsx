type DemoServiceClosingPanelProps = {
  variant: 'phoenix' | 'northgate'
}

const copy = {
  phoenix: {
    title: 'What this prototype demonstrates',
    body: 'This working example shows how an AI-powered troubleshooting assistant could support your team before you invest in IoT, service platforms, or technician dispatch. Zo&Zo builds prototypes like this so leaders can test the experience, validate ROI, and align stakeholders - then hand a blueprint to your dev team.',
  },
  northgate: {
    title: 'What this prototype demonstrates',
    body: 'This working example shows how client listening moves from feedback to executive action - voice of customer, stakeholder insight, and prioritised recommendations - before you invest in analytics platforms or CRM integration. Zo&Zo\'s Client Listening capability helps you capture evidence, align leadership, and decide with confidence.',
  },
}

export function DemoServiceClosingPanel({ variant }: DemoServiceClosingPanelProps) {
  const content = copy[variant]
  return (
    <div className="rounded-xl bg-slate-100 p-4 ring-1 ring-slate-200">
      <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-500">
        {content.title}
      </p>
      <p className="mt-2 text-[0.8125rem] leading-relaxed text-slate-700">{content.body}</p>
    </div>
  )
}
