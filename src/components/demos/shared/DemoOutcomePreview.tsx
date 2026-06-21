type DemoOutcomePreviewProps = {
  headline: string
  metric: string
  detail?: string
  accentColor: string
}

export function DemoOutcomePreview({ headline, metric, detail, accentColor }: DemoOutcomePreviewProps) {
  return (
    <div
      className="rounded-2xl p-4 text-white ring-1 ring-black/5"
      style={{ backgroundColor: accentColor }}
    >
      <p className="text-[0.625rem] font-semibold uppercase tracking-wide opacity-80">
        Outcome preview
      </p>
      <p className="mt-2 text-[0.9375rem] font-semibold leading-snug">{headline}</p>
      <p className="mt-2 text-[1.25rem] font-bold tabular-nums">{metric}</p>
      {detail && <p className="mt-2 text-[0.75rem] leading-relaxed opacity-90">{detail}</p>}
    </div>
  )
}
