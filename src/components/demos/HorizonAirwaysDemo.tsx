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

const accent = '#0c4a6e'
const gold = '#b45309'
const MILES = 82400

type Tab = 'home' | 'book' | 'miles' | 'trips'
type Flow =
  | null
  | 'search'
  | 'results'
  | 'confirm'
  | 'trip'
  | 'checkin'
  | 'upgrade'
  | 'lounge'
  | 'boarding'

function HorizonApp() {
  const { show } = useDemoAnnotation()
  const { mode } = useDemoGuide()
  const [tab, setTab] = useState<Tab>('home')
  const [flow, setFlow] = useState<Flow>(null)
  const [useMiles, setUseMiles] = useState(true)
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null)
  const [seat, setSeat] = useState('24K')
  const [upgraded, setUpgraded] = useState(false)
  const [checkedIn, setCheckedIn] = useState(false)

  const tripCard = useGuideActivate('trip-card')
  const upgradeBtn = useGuideActivate('upgrade-btn')
  const checkinBtn = useGuideActivate('checkin-btn')
  const boardingBtn = useGuideActivate('boarding-btn')
  const loungeBtn = useGuideActivate('lounge-btn')

  const exploreShow = (annotation: Parameters<typeof show>[0]) => {
    if (mode === 'explore') show(annotation)
  }

  const resetFlow = () => setFlow(null)

  if (flow === 'boarding') {
    return (
      <DemoScreen title="Boarding pass" subtitle="HZ 284 · SYD → SIN" accentColor={accent} onBack={() => setFlow('trip')}>
        <div className="space-y-3">
          <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100">
            <div className="bg-gradient-to-r from-sky-800 to-sky-600 px-4 py-3 text-white">
              <div className="flex justify-between">
                <p className="text-[0.625rem] uppercase opacity-80">Horizon Gold</p>
                <DemoPill color="gold">Group 1</DemoPill>
              </div>
              <p className="mt-1 text-[1.125rem] font-bold">SYD → SIN</p>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4 text-[0.8125rem]">
              <div><p className="text-[0.625rem] uppercase text-slate-400">Seat</p><p className="font-semibold">{upgraded ? '3A Business' : seat}</p></div>
              <div><p className="text-[0.625rem] uppercase text-slate-400">Gate</p><p className="font-semibold">B12 · 13:45</p></div>
              <div><p className="text-[0.625rem] uppercase text-slate-400">Lounge</p><p className="font-semibold text-sky-700">Included</p></div>
              <div><p className="text-[0.625rem] uppercase text-slate-400">Miles earned</p><p className="font-semibold">+2,840</p></div>
            </div>
          </div>
          <DemoButton accentColor={accent} variant="secondary" onClick={() => { resetFlow(); setTab('home') }}>Back to home</DemoButton>
        </div>
      </DemoScreen>
    )
  }

  if (flow === 'lounge') {
    return (
      <DemoScreen title="Lounge pass" subtitle="Gold member benefit" accentColor={gold} onBack={() => setFlow('trip')}>
        <div className="rounded-2xl bg-gradient-to-br from-amber-600 to-amber-900 p-5 text-white">
          <div className="flex justify-between text-[0.625rem] uppercase opacity-80">
            <span>Horizon Gold</span>
            <span>HZ 284 · SYD → SIN</span>
          </div>
          <p className="mt-2 text-[1.25rem] font-bold">Horizon Lounge</p>
          <p className="mt-1 text-[0.75rem] opacity-90">Terminal 1 International · Valid today</p>
          <p className="mt-4 text-center font-mono text-lg tracking-widest">HZ-G-8842</p>
          <p className="mt-2 text-center text-[0.75rem] opacity-90">1 guest included · Linked to your trip</p>
        </div>
      </DemoScreen>
    )
  }

  if (flow === 'upgrade') {
    const afterMiles = MILES - 18500
    return (
      <DemoScreen title="Upgrade with miles" subtitle="HZ 284" accentColor={accent} onBack={() => setFlow('trip')}>
        <div className="space-y-3">
          <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
            <p className="font-semibold">Economy → Business</p>
            <p className="mt-1 text-[0.75rem] text-slate-500">SYD → SIN · Today</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-[0.8125rem]">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[0.625rem] uppercase text-slate-400">Cost</p>
                <p className="mt-1 font-bold text-sky-800">18,500 miles</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[0.625rem] uppercase text-slate-400">Balance after</p>
                <p className="mt-1 font-bold">{afterMiles.toLocaleString()}</p>
              </div>
            </div>
            <p className="mt-3 text-[0.75rem] text-slate-500">Current balance · {MILES.toLocaleString()} miles</p>
          </div>
          <DemoButton accentColor={accent} onClick={() => { setUpgraded(true); setFlow('checkin') }}>Confirm upgrade</DemoButton>
        </div>
      </DemoScreen>
    )
  }

  if (flow === 'checkin') {
    return (
      <DemoScreen title="Check in" subtitle={upgraded ? 'Business · Gold' : 'Economy · Gold'} accentColor={accent} onBack={() => setFlow('trip')}>
        <div className="space-y-3">
          <div className="rounded-xl bg-sky-50 p-3 ring-1 ring-sky-100">
            <p className="text-[0.625rem] font-semibold uppercase text-sky-800">Gold benefits on this trip</p>
            <div className="mt-2 flex flex-wrap gap-2 text-[0.6875rem]">
              <DemoPill color="gold">Lounge included</DemoPill>
              <DemoPill color="blue">Priority boarding</DemoPill>
              <DemoPill color="green">+2,840 miles</DemoPill>
            </div>
          </div>
          {!upgraded && (
            <>
              <p className="text-[0.6875rem] font-semibold uppercase text-slate-400">Select seat</p>
              <div className="grid grid-cols-4 gap-1.5">
                {['22A', '22B', '24K', '24J'].map((s) => (
                  <button key={s} type="button" onClick={() => setSeat(s)} className={`rounded-lg py-2 text-[0.6875rem] font-semibold ${seat === s ? 'bg-sky-700 text-white' : 'bg-white ring-1 ring-slate-200'}`}>{s}</button>
                ))}
              </div>
            </>
          )}
          {upgraded && (
            <div className="rounded-xl bg-white p-3 ring-1 ring-slate-100 text-[0.8125rem]">
              <p className="text-slate-500">Seat assigned</p>
              <p className="font-semibold">3A · Business</p>
            </div>
          )}
          <GuideTarget id="checkin-btn">
            <DemoButton accentColor={accent} onClick={() => {
              checkinBtn.onGuideAction()
              setCheckedIn(true)
              setFlow('trip')
            }}>Complete check-in</DemoButton>
          </GuideTarget>
        </div>
      </DemoScreen>
    )
  }

  if (flow === 'trip') {
    return (
      <DemoScreen title="HZ 284 · Today" subtitle="SYD → SIN" accentColor={accent} onBack={() => { resetFlow(); setTab('trips') }}>
        <div className="space-y-3">
          <div className="flex justify-between rounded-2xl bg-white p-4 ring-1 ring-slate-100">
            <div><p className="text-xl font-bold">SYD</p><p className="text-[0.75rem] text-slate-500">14:20</p></div>
            <div className="self-center text-slate-300">✈</div>
            <div className="text-right"><p className="text-xl font-bold">SIN</p><p className="text-[0.75rem] text-slate-500">20:35</p></div>
          </div>
          {!checkedIn && (
            <DemoButton accentColor={accent} onClick={() => setFlow('checkin')}>Check in</DemoButton>
          )}
          {!checkedIn && !upgraded && (
            <GuideTarget id="upgrade-btn">
              <DemoButton accentColor={gold} variant="secondary" onClick={() => {
                upgradeBtn.onGuideAction()
                setFlow('upgrade')
              }}>Upgrade with miles</DemoButton>
            </GuideTarget>
          )}
          {checkedIn && (
            <GuideTarget id="boarding-btn">
              <DemoButton accentColor={accent} onClick={() => {
                boardingBtn.onGuideAction()
                setFlow('boarding')
              }}>View boarding pass</DemoButton>
            </GuideTarget>
          )}
          <GuideTarget id="lounge-btn">
            <DemoButton accentColor={accent} variant="secondary" onClick={() => {
              loungeBtn.onGuideAction()
              exploreShow({ id: 'lounge', clientAsk: 'digital lounge passes for Gold - no PDF, no separate app.', ourSolution: 'pass generated from tier + trip in the same record.' })
              setFlow('lounge')
            }}>Open lounge pass</DemoButton>
          </GuideTarget>
        </div>
      </DemoScreen>
    )
  }

  if (flow === 'confirm') {
    return (
      <DemoScreen title="Confirm" subtitle="Award booking" accentColor={accent} onBack={() => setFlow('results')}>
        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
          <p className="font-semibold">{selectedFlight}</p>
          <p className="mt-2 text-[1.125rem] font-bold text-sky-800">52,000 miles</p>
        </div>
        <DemoButton accentColor={accent} className="mt-3" onClick={() => {
          resetFlow()
          setTab('trips')
          exploreShow({ id: 'book', clientAsk: 'miles pricing visible before replatforming booking.', ourSolution: 'award flow tested with leadership before any backend commitment.' })
        }}>Confirm</DemoButton>
      </DemoScreen>
    )
  }

  if (flow === 'results') {
    return (
      <DemoScreen title="Award flights" subtitle="SYD → LHR" accentColor={accent} onBack={() => setFlow('search')}>
        {['HZ 102 · 52,000 miles', 'HZ 118 · 48,000 miles'].map((f) => (
          <button key={f} type="button" onClick={() => { setSelectedFlight(f); setFlow('confirm') }} className="mb-2 w-full rounded-xl bg-white p-3 text-left ring-1 ring-slate-100">{f}</button>
        ))}
      </DemoScreen>
    )
  }

  if (flow === 'search') {
    return (
      <DemoScreen title="Search" subtitle="Book with miles" accentColor={accent} onBack={() => { resetFlow(); setTab('book') }}>
        <button type="button" onClick={() => setUseMiles(!useMiles)} className={`mb-3 flex w-full justify-between rounded-xl px-3 py-2.5 text-[0.8125rem] ${useMiles ? 'bg-sky-50 ring-1 ring-sky-200' : 'bg-white ring-1 ring-slate-200'}`}>
          <span>Pay with Horizon Miles</span><span>{useMiles ? 'On' : 'Off'}</span>
        </button>
        <DemoButton accentColor={accent} onClick={() => {
          exploreShow({ id: 'search', clientAsk: 'award and revenue search in one place.', ourSolution: 'simplified fare engine - enough to validate UX, not to go live.' })
          setFlow('results')
        }}>Search SYD → LHR</DemoButton>
      </DemoScreen>
    )
  }

  const titles: Record<Tab, string> = { home: 'Hello, Alex', book: 'Book', miles: 'Horizon Miles', trips: 'My trips' }

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1">
        <DemoScreen title={titles[tab]} subtitle="Horizon Airways" accentColor={accent}>
          {tab === 'home' && (
            <div className="space-y-3">
              <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-100">
                <p className="text-[0.625rem] font-semibold uppercase text-slate-400">Tier status</p>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-amber-800">Horizon Gold</p>
                    <p className="text-[0.6875rem] text-slate-500">Lounge · Extra baggage · Priority</p>
                  </div>
                  <DemoPill color="gold">Active</DemoPill>
                </div>
              </div>

              <div className="rounded-2xl p-4 text-white" style={{ background: `linear-gradient(135deg, ${gold}, #92400e)` }}>
                <p className="text-[0.625rem] font-semibold uppercase opacity-80">Miles balance</p>
                <p className="text-[1.5rem] font-bold">{MILES.toLocaleString()}</p>
                <p className="mt-1 text-[0.8125rem] opacity-90">7,600 miles to Platinum</p>
                <div className="mt-2 h-1.5 rounded-full bg-white/20"><div className="h-full w-[92%] rounded-full bg-white" /></div>
              </div>

              <div>
                <p className="mb-2 text-[0.625rem] font-semibold uppercase text-slate-400">Upcoming trips</p>
                <GuideTarget id="trip-card">
                  <button type="button" onClick={() => {
                    tripCard.onGuideAction()
                    exploreShow({ id: 'trip-card', clientAsk: 'next trip on the loyalty home, not buried in bookings.', ourSolution: 'upcoming flight with check-in and miles earn on one card.' })
                    setFlow('trip')
                  }} className="w-full rounded-2xl bg-white p-4 text-left ring-1 ring-slate-100">
                    <DemoPill color="amber">Today · Check in open</DemoPill>
                    <p className="mt-2 font-bold">SYD → SIN · HZ 284</p>
                    <p className="text-[0.75rem] text-slate-500">14:20 departure · +2,840 miles</p>
                  </button>
                </GuideTarget>
                <div className="mt-2 rounded-xl bg-white p-3 ring-1 ring-slate-100">
                  <p className="text-[0.6875rem] font-semibold text-slate-700">SYD → MEL · HZ 412</p>
                  <p className="text-[0.6875rem] text-slate-500">Thu 19 Jun · Confirmed</p>
                </div>
              </div>
            </div>
          )}
          {tab === 'book' && <DemoButton accentColor={accent} onClick={() => setFlow('search')}>Search flights</DemoButton>}
          {tab === 'miles' && (
            <div className="space-y-2">
              {['Upgrade with miles', 'Partner hotels', 'Gift miles'].map((t) => (
                <button key={t} type="button" onClick={() => exploreShow({ id: t, clientAsk: `interest in "${t}" before phase-two scope.`, ourSolution: 'clickable catalogue used in prioritisation workshops.' })} className="w-full rounded-xl bg-white p-3 text-left ring-1 ring-slate-100">{t}</button>
              ))}
            </div>
          )}
          {tab === 'trips' && (
            <button type="button" onClick={() => setFlow('trip')} className="w-full rounded-2xl bg-white p-4 text-left ring-1 ring-slate-100">
              <p className="font-bold">SYD → SIN · HZ 284</p>
              <p className="text-[0.75rem] text-slate-500">Today · 14:20</p>
            </button>
          )}
        </DemoScreen>
      </div>
      <DemoTabBar tabs={[{ id: 'home', label: 'Home', icon: '⌂' }, { id: 'book', label: 'Book', icon: '✈' }, { id: 'miles', label: 'Miles', icon: '★' }, { id: 'trips', label: 'Trips', icon: '▦' }]} active={tab} onChange={(id) => { resetFlow(); setTab(id as Tab) }} accentColor={accent} />
    </div>
  )
}

export function HorizonAirwaysDemo() {
  return (
    <InteractiveDemoShell demoId="horizon-airways" accentColor={accent}>
      <HorizonApp />
    </InteractiveDemoShell>
  )
}
