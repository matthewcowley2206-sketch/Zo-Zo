import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react'
import type { ProjectDemo } from '../../content/demos'

const demoComponents: Record<string, LazyExoticComponent<ComponentType>> = {
  'horizon-airways': lazy(() =>
    import('./HorizonAirwaysDemo').then((module) => ({ default: module.HorizonAirwaysDemo })),
  ),
  'phoenix-coffee': lazy(() =>
    import('./PhoenixCoffeeDemo').then((module) => ({ default: module.PhoenixCoffeeDemo })),
  ),
  'northgate-legal': lazy(() =>
    import('./NorthgateLegalDemo').then((module) => ({ default: module.NorthgateLegalDemo })),
  ),
  'brightline-studio': lazy(() =>
    import('./BrightlineStudioDemo').then((module) => ({ default: module.BrightlineStudioDemo })),
  ),
}

function DemoFallback() {
  return (
    <div className="flex min-h-[520px] items-center justify-center rounded-3xl bg-cream-dark/40 ring-1 ring-line">
      <p className="text-[0.9375rem] text-muted">Loading interactive demo…</p>
    </div>
  )
}

export function DemoRenderer({ demoId }: { demoId: ProjectDemo['id'] }) {
  const Component = demoComponents[demoId]
  if (!Component) return null

  return (
    <Suspense fallback={<DemoFallback />}>
      <Component />
    </Suspense>
  )
}
