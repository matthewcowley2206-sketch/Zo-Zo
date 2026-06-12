import type { ReactNode } from 'react'
import {
  DemoAnnotationBubble,
  DemoAnnotationProvider,
} from './DemoAnnotations'
import { demoGuides } from './demoGuides'
import { DemoGuideProvider, DemoGuideRail, DemoPhoneBeacon } from './DemoGuide'
import { DeviceFrame } from './DeviceFrame'

type InteractiveDemoShellProps = {
  demoId: keyof typeof demoGuides
  accentColor: string
  children: ReactNode
}

export function InteractiveDemoShell({
  demoId,
  accentColor,
  children,
}: InteractiveDemoShellProps) {
  const config = demoGuides[demoId]

  return (
    <DemoAnnotationProvider>
      <DemoGuideProvider config={config} accentColor={accentColor}>
        <div className="mx-auto grid max-w-[920px] items-start gap-8 lg:grid-cols-[1fr_320px] lg:gap-10">
          <div className="order-1 lg:order-1">
            <DemoGuideRail />
          </div>
          <div className="order-2 lg:order-2">
            <DemoPhoneBeacon>
              <DeviceFrame accentColor={accentColor} showLabel>
                {children}
              </DeviceFrame>
            </DemoPhoneBeacon>
          </div>
        </div>
        <DemoAnnotationBubble />
        <p className="mx-auto mt-6 max-w-[520px] text-center text-[0.75rem] leading-relaxed text-muted-light">
          {config.scopeNote}
        </p>
      </DemoGuideProvider>
    </DemoAnnotationProvider>
  )
}
