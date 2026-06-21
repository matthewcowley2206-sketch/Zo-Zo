import type { ReactNode } from 'react'
import {
  DemoAnnotationBubble,
  DemoAnnotationProvider,
} from './DemoAnnotations'
import { useDemoEmbedSettings } from './DemoEmbedSettings'
import { demoGuides } from './demoGuides'
import {
  DemoGuideProvider,
  DemoGuideRail,
  DemoPhoneBeacon,
  useDemoGuide,
} from './DemoGuide'
import { DesktopFrame, DeviceFrame } from './DeviceFrame'

function DemoFrameContent({
  children,
  accentColor,
  isDesktop,
}: {
  children: ReactNode
  accentColor: string
  isDesktop: boolean
}) {
  const { restartKey } = useDemoGuide()

  const content = (
    <div key={restartKey} className="h-full min-h-0">
      {children}
    </div>
  )

  if (isDesktop) {
    return (
      <DesktopFrame accentColor={accentColor} showLabel>
        {content}
      </DesktopFrame>
    )
  }

  return (
    <DeviceFrame accentColor={accentColor} showLabel>
      {content}
    </DeviceFrame>
  )
}

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
  const { hideGuideRail } = useDemoEmbedSettings()
  const config = demoGuides[demoId]
  const device = config.device ?? 'phone'
  const isDesktop = device === 'desktop'

  return (
    <DemoAnnotationProvider>
      <DemoGuideProvider config={config} accentColor={accentColor}>
        <div
          className={
            hideGuideRail
              ? 'mx-auto w-full'
              : `mx-auto grid max-w-[920px] items-start gap-8 lg:gap-10 ${
                  isDesktop ? 'lg:grid-cols-[1fr_680px]' : 'lg:grid-cols-[1fr_320px]'
                }`
          }
        >
          {!hideGuideRail && (
            <div className="order-1 lg:order-1">
              <DemoGuideRail />
            </div>
          )}
          <div className={hideGuideRail ? undefined : 'order-2 lg:order-2'}>
            <DemoPhoneBeacon device={device}>
              <DemoFrameContent accentColor={accentColor} isDesktop={isDesktop}>
                {children}
              </DemoFrameContent>
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
