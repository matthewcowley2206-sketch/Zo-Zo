import { createContext, useContext, type ReactNode } from 'react'

type DemoEmbedSettings = {
  hideGuideRail: boolean
}

const DemoEmbedSettingsContext = createContext<DemoEmbedSettings>({
  hideGuideRail: false,
})

export function DemoEmbedSettingsProvider({
  hideGuideRail = false,
  children,
}: {
  hideGuideRail?: boolean
  children: ReactNode
}) {
  return (
    <DemoEmbedSettingsContext.Provider value={{ hideGuideRail }}>
      {children}
    </DemoEmbedSettingsContext.Provider>
  )
}

export function useDemoEmbedSettings() {
  return useContext(DemoEmbedSettingsContext)
}
