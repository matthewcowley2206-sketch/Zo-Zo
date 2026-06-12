import { useState } from 'react'
import { useDemoAnnotation } from './DemoAnnotations'
import { GuideTarget, useDemoGuide, useGuideActivate } from './DemoGuide'
import {
  DemoButton,
  DemoPill,
  DemoScreen,
  DemoTabBar,
} from './DeviceFrame'
import { InteractiveDemoShell } from './InteractiveDemoShell'

const accent = '#92400e'
const POINTS = 847
const TARGET = 1000

type Tab = 'home' | 'order' | 'rewards' | 'account'
type Flow = null | 'customise' | 'cart' | 'scheduled' | 'redeem' | 'confirmed'

const drinks = [
  { id: 'latte', name: 'Phoenix Latte', price: 5.5, pts: 55, desc: 'House blend · microfoam' },
  { id: 'iced', name: 'Iced Phoenix', price: 6, pts: 60, desc: 'Cold brew · orange peel' },
  { id: 'matcha', name: 'Matcha Cloud', price: 6.5, pts: 65, desc: 'Ceremonial grade · oat' },
]

function PhoenixApp() {
  const { show } = useDemoAnnotation()
  const { mode } = useDemoGuide()
  const [tab, setTab] = useState<Tab>('home')
  const [flow, setFlow] = useState<Flow>(null)
  const [drink, setDrink] = useState(drinks[0])
  const [size, setSize] = useState('Regular')
  const [milk, setMilk] = useState('Oat')
  const [extraShot, setExtraShot] = useState(false)
  const [schedule, setSchedule] = useState('Now')

  const usualBtn = useGuideActivate('usual-btn')
  const addOrderBtn = useGuideActivate('add-order-btn')
  const scheduleBtn = useGuideActivate('schedule-btn')
  const placeOrderBtn = useGuideActivate('place-order-btn')

  const exploreShow = (annotation: Parameters<typeof show>[0]) => {
    if (mode === 'explore') show(annotation)
  }

  if (flow === 'confirmed') {
    return (
      <DemoScreen title="Order placed" subtitle="Surry Hills" accentColor={accent} onBack={() => { setFlow(null); setTab('home') }}>
        <div className="space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl">✓</div>
          <p className="font-semibold">Ready {schedule === 'Now' ? 'in ~8 min' : `at ${schedule === '8:15' ? '8:15 AM' : schedule}`}</p>
          <p className="text-[0.8125rem] text-slate-600">Scheduled pickup · Surry Hills</p>
          <p className="text-[0.8125rem] text-slate-600">+{drink.pts + (extraShot ? 10 : 0)} Phoenix Points</p>
          <div className="rounded-xl bg-amber-50 p-3 text-[0.8125rem] text-amber-900">
            <p className="font-semibold">Silver tier · {POINTS + drink.pts} points</p>
            <p className="mt-1">{TARGET - POINTS - drink.pts} points to your next free drink</p>
          </div>
        </div>
      </DemoScreen>
    )
  }

  if (flow === 'redeem') {
    return (
      <DemoScreen title="Redeem reward" subtitle="850 points" accentColor={accent} onBack={() => setFlow(null)}>
        <div className="space-y-3">
          <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
            <p className="font-semibold">Free regular drink</p>
            <p className="mt-1 text-[0.8125rem] text-slate-500">Any menu item · regular size</p>
          </div>
          <DemoButton accentColor={accent} onClick={() => {
            exploreShow({ id: 'redeem', clientAsk: 'whether points redemption should happen at order or pickup.', ourSolution: 'redeem-at-checkout flow - validated in store with baristas before POS integration.' })
            setTab('order')
            setFlow('customise')
          }}>Apply to next order</DemoButton>
        </div>
      </DemoScreen>
    )
  }

  if (flow === 'cart') {
    const total = drink.price + (extraShot ? 0.8 : 0)
    return (
      <DemoScreen title="Your order" subtitle="Surry Hills" accentColor={accent} onBack={() => setFlow('customise')}>
        <div className="space-y-3">
          <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
            <p className="font-semibold">{drink.name}</p>
            <p className="text-[0.8125rem] text-slate-500">{size} · {milk}{extraShot ? ' · extra shot' : ''}</p>
            <p className="mt-2 text-[1.125rem] font-bold">${total.toFixed(2)}</p>
          </div>
          <GuideTarget id="schedule-btn">
            <button type="button" onClick={() => {
              scheduleBtn.onGuideAction()
              setFlow('scheduled')
            }} className="flex w-full justify-between rounded-xl bg-white p-3 ring-1 ring-slate-100 text-[0.8125rem]">
              <span>Pickup time · schedule ahead</span><span className="font-semibold">{schedule === 'Now' ? 'Now (~8 min)' : schedule === '8:15' ? '8:15 AM' : schedule}</span>
            </button>
          </GuideTarget>
          <GuideTarget id="place-order-btn">
            <DemoButton accentColor={accent} onClick={() => {
              placeOrderBtn.onGuideAction()
              setFlow('confirmed')
            }}>Place order · ${total.toFixed(2)}</DemoButton>
          </GuideTarget>
        </div>
      </DemoScreen>
    )
  }

  if (flow === 'scheduled') {
    return (
      <DemoScreen title="Schedule pickup" subtitle="Morning commute" accentColor={accent} onBack={() => setFlow('cart')}>
        <p className="mb-3 text-[0.8125rem] text-slate-500">Pick a time before you place the order.</p>
        {['Now (~8 min)', '8:15 AM', '12:30 PM'].map((t) => (
          <button key={t} type="button" onClick={() => { setSchedule(t.split(' ')[0]); setFlow('cart') }} className="mb-2 w-full rounded-xl bg-white p-3 text-left ring-1 ring-slate-100">
            <span className="font-semibold">{t}</span>
            {t.includes('8:15') && <span className="mt-0.5 block text-[0.6875rem] text-slate-500">Most popular · pre-work pickup</span>}
          </button>
        ))}
      </DemoScreen>
    )
  }

  if (flow === 'customise') {
    return (
      <DemoScreen title={drink.name} accentColor={accent} onBack={() => { setFlow(null); setTab('order') }}>
        <div className="space-y-3">
          <div>
            <p className="mb-2 text-[0.6875rem] font-semibold uppercase text-slate-400">1 · Choose size</p>
            <div className="flex gap-2">{['Small', 'Regular', 'Large'].map((s) => (
              <button key={s} type="button" onClick={() => setSize(s)} className={`flex-1 rounded-lg py-2 text-[0.6875rem] font-semibold ${size === s ? 'bg-amber-800 text-white' : 'bg-white ring-1 ring-slate-200'}`}>{s}</button>
            ))}</div>
          </div>
          <div>
            <p className="mb-2 text-[0.6875rem] font-semibold uppercase text-slate-400">2 · Choose milk</p>
            <div className="flex flex-wrap gap-2">{['Oat', 'Almond', 'Full'].map((m) => (
              <button key={m} type="button" onClick={() => setMilk(m)} className={`rounded-lg px-3 py-1.5 text-[0.6875rem] font-semibold ${milk === m ? 'bg-amber-800 text-white' : 'bg-white ring-1 ring-slate-200'}`}>{m}</button>
            ))}</div>
          </div>
          <div>
            <p className="mb-2 text-[0.6875rem] font-semibold uppercase text-slate-400">3 · Add extras</p>
            <button type="button" onClick={() => setExtraShot(!extraShot)} className={`w-full rounded-xl p-3 text-left text-[0.8125rem] ${extraShot ? 'bg-amber-50 ring-1 ring-amber-200' : 'bg-white ring-1 ring-slate-200'}`}>Extra shot · +$0.80</button>
          </div>
          <GuideTarget id="add-order-btn">
            <DemoButton accentColor={accent} onClick={() => {
              addOrderBtn.onGuideAction()
              setFlow('cart')
            }}>Add to order</DemoButton>
          </GuideTarget>
        </div>
      </DemoScreen>
    )
  }

  const titles: Record<Tab, string> = { home: 'Phoenix Coffee', order: 'Order', rewards: 'Rewards', account: 'Account' }

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1">
        <DemoScreen title={titles[tab]} subtitle={tab === 'home' ? 'Surry Hills · Open' : undefined} accentColor={accent}>
          {tab === 'home' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-2 ring-1 ring-emerald-100">
                <p className="text-[0.75rem] font-medium text-emerald-900">Surry Hills · Open</p>
                <p className="text-[0.6875rem] text-emerald-700">~8 min wait</p>
              </div>

              <div className="rounded-2xl bg-amber-900 p-4 text-white">
                <div className="flex items-start justify-between">
                  <p className="text-[0.625rem] font-semibold uppercase opacity-80">Points · Silver tier</p>
                  <DemoPill color="gold">Silver</DemoPill>
                </div>
                <p className="text-[1.5rem] font-bold">{POINTS} <span className="text-[0.875rem] font-normal opacity-80">/ {TARGET}</span></p>
                <div className="mt-2 h-1.5 rounded-full bg-white/20"><div className="h-full rounded-full bg-white" style={{ width: `${(POINTS / TARGET) * 100}%` }} /></div>
                <p className="mt-2 text-[0.75rem] opacity-90">{TARGET - POINTS} points to a free drink</p>
              </div>

              <div className="rounded-xl bg-white p-3 ring-1 ring-slate-100">
                <p className="text-[0.625rem] font-semibold uppercase text-slate-400">Next reward</p>
                <p className="mt-1 font-semibold">Free regular drink</p>
                <p className="text-[0.6875rem] text-slate-500">{TARGET - POINTS} points away · redeem in Rewards</p>
              </div>

              <GuideTarget id="usual-btn">
                <button type="button" onClick={() => {
                  usualBtn.onGuideAction()
                  setDrink(drinks[0])
                  setFlow('customise')
                }} className="w-full rounded-2xl bg-white p-4 text-left ring-1 ring-slate-100">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.625rem] font-semibold uppercase text-amber-800">Your usual · 1-tap reorder</p>
                    <DemoPill color="green">Fast</DemoPill>
                  </div>
                  <p className="mt-1 font-semibold">Phoenix Latte · Oat · Regular</p>
                  <p className="mt-1 text-[0.6875rem] text-slate-500">Last ordered yesterday · 8:02 AM</p>
                </button>
              </GuideTarget>
            </div>
          )}
          {tab === 'order' && drinks.map((d) => (
            <button key={d.id} type="button" onClick={() => { setDrink(d); setFlow('customise') }} className="mb-2 flex w-full justify-between rounded-xl bg-white p-3 ring-1 ring-slate-100">
              <div className="text-left"><p className="font-semibold">{d.name}</p><p className="text-[0.6875rem] text-slate-500">{d.desc}</p></div>
              <span className="font-semibold text-amber-900">${d.price.toFixed(2)}</span>
            </button>
          ))}
          {tab === 'rewards' && (
            <div className="space-y-2">
              <button type="button" onClick={() => setFlow('redeem')} className="w-full rounded-2xl bg-gradient-to-r from-amber-700 to-amber-900 p-4 text-left text-white">
                <DemoPill color="gold">Available</DemoPill>
                <p className="mt-2 font-semibold">Free regular drink</p>
                <p className="text-[0.75rem] opacity-90">850 points · tap to redeem</p>
              </button>
              {['Free size upgrade · 150 pts', 'Birthday drink · 0 pts'].map((r) => (
                <div key={r} className="rounded-xl bg-white p-3 text-[0.8125rem] ring-1 ring-slate-100">{r}</div>
              ))}
            </div>
          )}
          {tab === 'account' && (
            <div className="space-y-2 text-[0.8125rem]">
              <div className="rounded-xl bg-white p-3 ring-1 ring-slate-100"><p className="text-slate-500">Member since</p><p className="font-semibold">2023 · Silver tier</p></div>
              <div className="rounded-xl bg-white p-3 ring-1 ring-slate-100"><p className="text-slate-500">Orders this month</p><p className="font-semibold">12 · $68.40 spent</p></div>
            </div>
          )}
        </DemoScreen>
      </div>
      <DemoTabBar tabs={[{ id: 'home', label: 'Home', icon: '⌂' }, { id: 'order', label: 'Order', icon: '☕' }, { id: 'rewards', label: 'Rewards', icon: '★' }, { id: 'account', label: 'You', icon: '○' }]} active={tab} onChange={(id) => { setFlow(null); setTab(id as Tab) }} accentColor={accent} />
    </div>
  )
}

export function PhoenixCoffeeDemo() {
  return (
    <InteractiveDemoShell demoId="phoenix-coffee" accentColor={accent}>
      <PhoenixApp />
    </InteractiveDemoShell>
  )
}
