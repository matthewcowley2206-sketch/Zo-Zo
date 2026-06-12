import type { ComponentType } from 'react'
import type { ProjectDemo } from '../../content/demos'
import { HorizonAirwaysDemo } from './HorizonAirwaysDemo'
import { NorthgateLegalDemo } from './NorthgateLegalDemo'
import { PhoenixCoffeeDemo } from './PhoenixCoffeeDemo'

const demoComponents: Record<string, ComponentType> = {
  'horizon-airways': HorizonAirwaysDemo,
  'phoenix-coffee': PhoenixCoffeeDemo,
  'northgate-legal': NorthgateLegalDemo,
}

export function DemoRenderer({ demoId }: { demoId: ProjectDemo['id'] }) {
  const Component = demoComponents[demoId]
  if (!Component) return null
  return <Component />
}
