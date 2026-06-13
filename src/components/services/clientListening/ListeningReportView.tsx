import { Link } from 'react-router-dom'
import type { ListeningReport } from './clientListeningSynthesis'

function ReportHeader({ report }: { report: ListeningReport }) {
  return (
    <div className="border-b border-line bg-ink px-6 py-5 text-cream sm:px-8">
      <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-cream/45">
        Zo&Zo · Client Listening Program
      </p>
      <h3 className="mt-2 text-[1.25rem] font-semibold sm:text-[1.375rem]">{report.meta.title}</h3>
      <p className="mt-1 text-[0.8125rem] text-cream/65">{report.meta.subtitle}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-cream/10 px-3 py-1 text-[0.6875rem] font-medium text-cream/90">
          {report.meta.programScope}
        </span>
        <span className="rounded-full bg-cream/10 px-3 py-1 text-[0.6875rem] font-medium text-cream/90">
          Dominant theme · {report.meta.dominantThemeLabel}
        </span>
      </div>
    </div>
  )
}

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-[0.75rem] font-bold text-cream">
        {number}
      </span>
      <h4 className="text-[0.9375rem] font-semibold uppercase tracking-wide text-ink">{title}</h4>
    </div>
  )
}

export function ReportSectionSummary({ report }: { report: ListeningReport }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
      <ReportHeader report={report} />
      <div className="p-6 sm:p-8">
        <SectionLabel number="1" title="Executive summary" />
        <p className="text-[0.9375rem] leading-[1.7] text-muted">{report.executiveSummary}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {report.strengthsToProtect.map((s) => (
            <div key={s} className="rounded-xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
              <p className="text-[0.625rem] font-bold uppercase text-emerald-800">Strength</p>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-emerald-950">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ReportSectionQuotes({ report }: { report: ListeningReport }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
      <div className="border-b border-line bg-cream-dark/40 px-6 py-3">
        <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">Section 2 · Quote analysis</p>
      </div>
      <div className="divide-y divide-line">
        {report.quoteAnalysis.map((q) => (
          <div key={q.id} className="p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-ink">{q.client}</p>
                <p className="text-[0.75rem] text-muted">{q.role}</p>
              </div>
              <span className="rounded-full bg-ink px-3 py-1 text-[0.6875rem] font-semibold text-cream">
                You tagged · {q.themeLabel}
              </span>
            </div>
            <blockquote className="mt-3 border-l-2 border-ink/20 pl-4 text-[0.9375rem] italic leading-relaxed text-ink">
              &ldquo;{q.verbatim}&rdquo;
            </blockquote>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-cream-dark/50 p-3">
                <p className="text-[0.625rem] font-bold uppercase text-muted-light">Interpretation</p>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">{q.interpretation}</p>
              </div>
              <div className="rounded-lg bg-amber-50/80 p-3 ring-1 ring-amber-100">
                <p className="text-[0.625rem] font-bold uppercase text-amber-900">Leadership implication</p>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-amber-950">{q.implication}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ReportSectionThemes({ report }: { report: ListeningReport }) {
  const priorityColors = {
    critical: 'bg-rose-100 text-rose-900 ring-rose-200',
    high: 'bg-amber-100 text-amber-900 ring-amber-200',
    medium: 'bg-slate-100 text-slate-700 ring-slate-200',
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
        <div className="border-b border-line bg-cream-dark/40 px-6 py-3">
          <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">Section 3 · Theme rankings</p>
        </div>
        <div className="p-5 sm:p-6">
          <div className="space-y-3">
            {report.themeRankings.map((t, i) => (
              <div key={t.theme} className="flex flex-wrap items-start gap-4 rounded-xl bg-cream-dark/40 p-4">
                <span className="text-[1.5rem] font-bold tabular-nums text-ink/30">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-ink">{t.label}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[0.625rem] font-bold uppercase ring-1 ${priorityColors[t.priority]}`}>
                      {t.priority}
                    </span>
                    <span className="text-[0.75rem] text-muted">
                      {t.count} signal{t.count > 1 ? 's' : ''} · {t.clients.join(', ')}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">{t.signal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-100">
          <p className="text-[0.625rem] font-bold uppercase text-amber-900">Blind spot</p>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-amber-950">{report.blindSpot}</p>
        </div>
        <div className="rounded-2xl bg-rose-50 p-5 ring-1 ring-rose-100">
          <p className="text-[0.625rem] font-bold uppercase text-rose-900">Internal vs client gap</p>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-rose-950">{report.internalGap}</p>
        </div>
      </div>
    </div>
  )
}

export function ReportSectionStrategy({ report }: { report: ListeningReport }) {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border-2 border-ink/10 bg-ink text-cream">
        <div className="border-b border-cream/10 px-6 py-3">
          <p className="text-[0.6875rem] font-semibold uppercase text-cream/45">Section 4 · Inform strategy</p>
        </div>
        <div className="p-6">
          <p className="text-[0.9375rem] leading-[1.7] text-cream/90">{report.strategyImplication}</p>
          <Link to="/services/strategy" className="mt-4 inline-block text-[0.8125rem] font-medium underline underline-offset-2">
            See how insights feed Strategy & Direction →
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
        <div className="border-b border-line bg-cream-dark/40 px-6 py-3">
          <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">Strategic priorities</p>
        </div>
        <div className="divide-y divide-line">
          {report.strategicPriorities.map((p) => (
            <div key={p.label} className="flex gap-4 p-4 sm:p-5">
              <p className="w-28 shrink-0 text-[0.75rem] font-bold uppercase text-ink">{p.label}</p>
              <p className="text-[0.875rem] leading-relaxed text-muted">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
        <div className="border-b border-line bg-cream-dark/40 px-6 py-3">
          <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">Recommended response</p>
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-[1.0625rem] font-semibold text-ink">{report.recommendedAction.title}</p>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">{report.recommendedAction.detail}</p>
          <p className="mt-3 text-[0.8125rem] text-muted">
            <span className="font-semibold text-ink">Owner:</span> {report.recommendedAction.owner}
          </p>
          <p className="mt-2 rounded-lg bg-cream-dark/60 p-3 text-[0.8125rem] leading-relaxed text-muted">
            <span className="font-semibold text-ink">Why this action:</span> {report.recommendedAction.rationale}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
        <div className="border-b border-line bg-cream-dark/40 px-6 py-3">
          <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">90-day action plan</p>
        </div>
        <div className="divide-y divide-line">
          {report.actionPlan.map((block) => (
            <div key={block.horizon} className="p-5 sm:p-6">
              <p className="text-[0.75rem] font-bold uppercase text-ink">{block.horizon}</p>
              <ul className="mt-3 space-y-2">
                {block.items.map((item) => (
                  <li key={item.task} className="flex gap-3 text-[0.8125rem]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                    <span>
                      <span className="text-muted">{item.task}</span>
                      <span className="text-muted-light"> · {item.owner}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-cream-dark/50 p-5 ring-1 ring-line">
        <p className="text-[0.625rem] font-bold uppercase text-muted-light">Questions for leadership</p>
        <ul className="mt-3 space-y-2">
          {report.leadershipQuestions.map((q) => (
            <li key={q} className="text-[0.875rem] leading-relaxed text-ink">
              · {q}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function ReportSectionCloseLoop({ report }: { report: ListeningReport }) {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
        <div className="border-b border-line bg-cream-dark/40 px-6 py-3">
          <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">Section 5 · Close the loop</p>
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-[0.625rem] font-bold uppercase text-muted-light">Client update · draft</p>
          <p className="mt-3 text-[1rem] leading-[1.7] text-ink">{report.closeLoopMessage}</p>
          <div className="mt-5 rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
            <p className="text-[0.8125rem] font-semibold text-emerald-900">Action in flight</p>
            <p className="mt-1 text-[0.875rem] text-emerald-800">{report.recommendedAction.title}</p>
            <p className="mt-1 text-[0.75rem] text-emerald-700">Owner · {report.recommendedAction.owner}</p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-5 ring-1 ring-line">
        <p className="text-[0.625rem] font-bold uppercase text-muted-light">Delivery channels</p>
        <ul className="mt-3 space-y-2">
          {report.closeLoopChannels.map((c) => (
            <li key={c} className="flex gap-2 text-[0.8125rem] text-muted">
              <span className="text-ink">→</span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function ReportSectionScores({ report }: { report: ListeningReport }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
          <div className="border-b border-line bg-cream-dark/40 px-5 py-3">
            <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">NPS · baseline</p>
          </div>
          <div className="p-5">
            <p className="text-[2.75rem] font-bold tabular-nums text-ink">{report.nps.score}</p>
            <p className="mt-1 text-[0.8125rem] font-medium text-emerald-700">{report.nps.trend}</p>
            <p className="mt-3 text-[0.8125rem] text-muted">Primary driver · {report.nps.driver}</p>
            <div className="mt-4 space-y-1 border-t border-line pt-4 text-[0.75rem] text-muted">
              <p>{report.nps.promoters}</p>
              <p>{report.nps.detractors}</p>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
          <div className="border-b border-line bg-cream-dark/40 px-5 py-3">
            <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">CSAT · baseline</p>
          </div>
          <div className="p-5">
            <p className="text-[2.75rem] font-bold tabular-nums text-ink">
              {report.csat.score}
              <span className="text-[1rem] font-normal text-muted"> / 5</span>
            </p>
            <div className="mt-4 space-y-2">
              {report.csat.dimensions.map((d) => (
                <div key={d.name} className="flex items-center justify-between gap-2 rounded-lg bg-cream-dark/40 px-3 py-2">
                  <span className="text-[0.8125rem] text-muted">{d.name}</span>
                  <span className="text-[0.8125rem] font-semibold tabular-nums text-ink">
                    {d.score}
                    <span className="ml-2 text-[0.6875rem] font-normal text-muted-light">{d.note}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ReportSectionPersona({ report }: { report: ListeningReport }) {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
        <div className="border-b border-line bg-cream-dark/40 px-6 py-3">
          <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">Intelligent client persona</p>
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-[1.125rem] font-semibold text-ink">{report.persona.name}</p>
          <p className="text-[0.8125rem] text-muted">{report.persona.segment}</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-[0.6875rem] font-bold uppercase text-muted-light">Profile</p>
              <ul className="mt-2 space-y-1.5">
                {report.persona.profile.map((p) => (
                  <li key={p} className="text-[0.8125rem] leading-relaxed text-muted">· {p}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.6875rem] font-bold uppercase text-muted-light">Relationship approach</p>
              <ul className="mt-2 space-y-1.5">
                {report.persona.relationshipApproach.map((p) => (
                  <li key={p} className="text-[0.8125rem] leading-relaxed text-muted">· {p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
        <div className="border-b border-line bg-cream-dark/40 px-6 py-3">
          <p className="text-[0.6875rem] font-semibold uppercase text-muted-light">Measurement rhythm</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-[0.8125rem]">
            <thead>
              <tr className="border-b border-line bg-cream-dark/30">
                <th className="px-5 py-3 font-semibold text-ink">Metric</th>
                <th className="px-5 py-3 font-semibold text-ink">Frequency</th>
                <th className="px-5 py-3 font-semibold text-ink">Owner</th>
              </tr>
            </thead>
            <tbody>
              {report.measurementRhythm.map((row) => (
                <tr key={row.metric} className="border-b border-line last:border-0">
                  <td className="px-5 py-3 font-medium text-ink">{row.metric}</td>
                  <td className="px-5 py-3 text-muted">{row.frequency}</td>
                  <td className="px-5 py-3 text-muted">{row.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export function ReportSectionEmbed({ report }: { report: ListeningReport }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-slate-800 text-cream ring-1 ring-slate-700">
      <div className="border-b border-slate-700 px-6 py-3">
        <p className="text-[0.6875rem] font-semibold uppercase text-cream/45">Embed the 360 framework · AI & automation</p>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
        {report.automation.map((a) => (
          <div key={a.step} className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-slate-700">
            <p className="text-[0.8125rem] font-semibold">{a.step}</p>
            <ul className="mt-2 space-y-1">
              {a.enablers.map((e) => (
                <li key={e} className="text-[0.75rem] leading-relaxed text-cream/75">· {e}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ReportFullPreview({ report }: { report: ListeningReport }) {
  return (
    <div className="space-y-6">
      <ReportSectionSummary report={report} />
      <ReportSectionQuotes report={report} />
      <ReportSectionThemes report={report} />
      <ReportSectionStrategy report={report} />
      <ReportSectionCloseLoop report={report} />
      <ReportSectionScores report={report} />
      <ReportSectionPersona report={report} />
      <ReportSectionEmbed report={report} />
    </div>
  )
}
