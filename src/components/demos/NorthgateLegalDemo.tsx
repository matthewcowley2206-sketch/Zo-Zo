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

const accent = '#1e3a5f'

type Tab = 'home' | 'matters' | 'messages' | 'docs'
type Flow = null | 'matter' | 'upload' | 'message' | 'invoice'

const matters = [
  { id: 'harbour', name: 'Harbour Tower acquisition', status: 'Active', progress: 65, lead: 'J. Whitfield', deadline: '19 Jun', nextAction: 'Upload Q3 financials' },
  { id: 'compliance', name: 'Compliance review', status: 'Awaiting docs', progress: 30, lead: 'A. Chen', deadline: '24 Jun', nextAction: 'Return signed contract' },
]

function NorthgateApp() {
  const { show } = useDemoAnnotation()
  const { mode } = useDemoGuide()
  const [tab, setTab] = useState<Tab>('home')
  const [flow, setFlow] = useState<Flow>(null)
  const [matterId, setMatterId] = useState('harbour')
  const [uploaded, setUploaded] = useState(false)
  const [messageSent, setMessageSent] = useState(false)

  const matter = matters.find((m) => m.id === matterId) ?? matters[0]

  const matterCard = useGuideActivate('matter-card')
  const uploadBtn = useGuideActivate('upload-btn')
  const uploadZone = useGuideActivate('upload-zone')
  const messageBtn = useGuideActivate('message-btn')
  const sendBtn = useGuideActivate('send-message-btn')

  const exploreShow = (annotation: Parameters<typeof show>[0]) => {
    if (mode === 'explore') show(annotation)
  }

  if (flow === 'invoice') {
    return (
      <DemoScreen title="Invoice summary" subtitle={matter.name} accentColor={accent} onBack={() => setFlow('matter')}>
        <div className="space-y-3">
          <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
            <p className="text-[0.75rem] text-slate-500">Outstanding</p>
            <p className="text-[1.5rem] font-bold">$24,680.00</p>
            <p className="mt-2 text-[0.8125rem] text-slate-600">Due diligence phase · 142.5 hours</p>
          </div>
          <DemoButton accentColor={accent} variant="secondary" onClick={() => setFlow('matter')}>Back</DemoButton>
        </div>
      </DemoScreen>
    )
  }

  if (flow === 'message') {
    return (
      <DemoScreen title="Message partner" subtitle={`${matter.name} · Secure`} accentColor={accent} onBack={() => setFlow('matter')}>
        {!messageSent ? (
          <div className="space-y-3">
            <div className="rounded-xl bg-slate-100 px-3 py-2 text-[0.6875rem] text-slate-600">
              Message tied to matter record · {matter.lead}
            </div>
            <textarea className="h-24 w-full rounded-xl border-0 bg-white p-3 text-[0.8125rem] ring-1 ring-slate-200" placeholder="Ask a question about your matter..." defaultValue="Can you confirm the timeline for due diligence?" />
            <GuideTarget id="send-message-btn">
              <DemoButton accentColor={accent} onClick={() => {
                sendBtn.onGuideAction()
                setMessageSent(true)
              }}>Send message</DemoButton>
            </GuideTarget>
          </div>
        ) : (
          <div className="rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
            <p className="font-semibold text-emerald-900">Message sent to {matter.lead}</p>
            <p className="mt-1 text-[0.8125rem] text-emerald-700">Saved to matter thread · Typically responds within 4 business hours</p>
          </div>
        )}
      </DemoScreen>
    )
  }

  if (flow === 'upload') {
    return (
      <DemoScreen title="Upload documents" subtitle="Encrypted · matter-only" accentColor={accent} onBack={() => setFlow('matter')}>
        {!uploaded ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-slate-100 px-3 py-2 text-[0.75rem]">
              <span className="font-medium text-slate-700">Tagged to matter</span>
              <span className="text-slate-500">{matter.name}</span>
            </div>
            <GuideTarget id="upload-zone">
              <button type="button" onClick={() => {
                uploadZone.onGuideAction()
                setUploaded(true)
              }} className="flex w-full flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 bg-white py-12">
                <span className="text-2xl">↑</span>
                <p className="mt-2 text-[0.875rem] font-semibold">Tap to upload</p>
                <p className="text-[0.75rem] text-slate-500">PDF, DOCX · max 25MB · No email attachments</p>
              </button>
            </GuideTarget>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
              <p className="font-semibold text-emerald-900">Upload complete</p>
              <p className="mt-1 text-[0.8125rem] text-emerald-700">due_diligence_summary.pdf</p>
              <p className="mt-2 text-[0.8125rem] text-emerald-700">{matter.lead} and team notified · Saved to matter</p>
            </div>
            <DemoButton accentColor={accent} onClick={() => setFlow('matter')}>Return to matter</DemoButton>
          </div>
        )}
      </DemoScreen>
    )
  }

  if (flow === 'matter') {
    return (
      <DemoScreen title={matter.name} subtitle={`Lead · ${matter.lead}`} accentColor={accent} onBack={() => { setFlow(null); setTab('matters') }}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-[0.8125rem]">
            <div className="rounded-xl bg-white p-3 ring-1 ring-slate-100">
              <p className="text-slate-500">Status</p>
              <p className="font-semibold">{matter.status}</p>
            </div>
            <div className="rounded-xl bg-white p-3 ring-1 ring-slate-100">
              <p className="text-slate-500">Deadline</p>
              <p className="font-semibold">{matter.deadline}</p>
            </div>
          </div>
          <div className="rounded-xl bg-amber-50 p-3 ring-1 ring-amber-100 text-[0.8125rem]">
            <p className="font-semibold text-amber-900">Next action</p>
            <p className="mt-0.5 text-amber-800">{matter.nextAction}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
            <div className="flex justify-between text-[0.8125rem]">
              <span className="text-slate-500">Progress</span>
              <span className="font-semibold">{matter.progress}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-slate-700" style={{ width: `${matter.progress}%` }} /></div>
          </div>
          <div className="space-y-2">
            {['Brief received ✓', 'Due diligence in progress', 'Client documents pending', 'Partner review'].map((s, i) => (
              <div key={s} className="flex items-center gap-2 text-[0.8125rem]">
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[0.625rem] ${i < 2 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>{i < 2 ? '✓' : '·'}</span>
                {s}
              </div>
            ))}
          </div>
          <GuideTarget id="upload-btn">
            <DemoButton accentColor={accent} onClick={() => {
              uploadBtn.onGuideAction()
              setFlow('upload')
            }}>Upload documents</DemoButton>
          </GuideTarget>
          <GuideTarget id="message-btn">
            <DemoButton accentColor={accent} variant="secondary" onClick={() => {
              messageBtn.onGuideAction()
              setFlow('message')
            }}>Message partner</DemoButton>
          </GuideTarget>
          <DemoButton accentColor={accent} variant="secondary" onClick={() => {
            exploreShow({ id: 'billing', clientAsk: 'transparency on fees without exposing full ledger detail.', ourSolution: 'matter-level invoice summary - finance approved this level of visibility.' })
            setFlow('invoice')
          }}>View invoice summary</DemoButton>
        </div>
      </DemoScreen>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1">
        <DemoScreen title={tab === 'home' ? 'Welcome, Sarah' : tab.charAt(0).toUpperCase() + tab.slice(1)} subtitle="Northgate Legal" accentColor={accent}>
          {tab === 'home' && (
            <div className="space-y-3">
              <div className="rounded-2xl bg-slate-800 p-4 text-white">
                <p className="text-[0.625rem] uppercase opacity-70">Action needed</p>
                <p className="mt-1 font-semibold">Upload Q3 financials</p>
                <p className="text-[0.75rem] opacity-80">Harbour Tower · Due in 3 days</p>
              </div>
              {matters.map((m) => (
                m.id === 'harbour' ? (
                  <GuideTarget key={m.id} id="matter-card">
                    <button type="button" onClick={() => {
                      matterCard.onGuideAction()
                      setMatterId(m.id)
                      setFlow('matter')
                    }} className="w-full rounded-xl bg-white p-3 text-left ring-1 ring-slate-100">
                      <div className="flex justify-between"><p className="font-semibold text-[0.8125rem]">{m.name}</p><DemoPill color={m.status === 'Active' ? 'green' : 'amber'}>{m.status}</DemoPill></div>
                      <p className="mt-2 text-[0.6875rem] text-slate-500">Deadline · {m.deadline} · {m.lead}</p>
                      <p className="mt-1 text-[0.6875rem] font-medium text-slate-700">Next · {m.nextAction}</p>
                      <div className="mt-2 h-1 rounded-full bg-slate-100"><div className="h-full rounded-full bg-slate-600" style={{ width: `${m.progress}%` }} /></div>
                    </button>
                  </GuideTarget>
                ) : (
                  <button key={m.id} type="button" onClick={() => { setMatterId(m.id); setFlow('matter'); exploreShow({ id: m.id, clientAsk: 'matter list with status at a glance for busy in-house counsel.', ourSolution: 'card layout with progress bar and lead partner - replaced a 40-slide deck.' }) }} className="w-full rounded-xl bg-white p-3 text-left ring-1 ring-slate-100">
                    <div className="flex justify-between"><p className="font-semibold text-[0.8125rem]">{m.name}</p><DemoPill color={m.status === 'Active' ? 'green' : 'amber'}>{m.status}</DemoPill></div>
                    <p className="mt-2 text-[0.6875rem] text-slate-500">Deadline · {m.deadline} · {m.lead}</p>
                    <p className="mt-1 text-[0.6875rem] font-medium text-slate-700">Next · {m.nextAction}</p>
                    <div className="mt-2 h-1 rounded-full bg-slate-100"><div className="h-full rounded-full bg-slate-600" style={{ width: `${m.progress}%` }} /></div>
                  </button>
                )
              ))}
            </div>
          )}
          {tab === 'matters' && matters.map((m) => (
            <button key={m.id} type="button" onClick={() => { setMatterId(m.id); setFlow('matter') }} className="mb-2 w-full rounded-xl bg-white p-3 text-left ring-1 ring-slate-100">
              <p className="font-semibold">{m.name}</p>
              <p className="text-[0.6875rem] text-slate-500">{m.progress}% · {m.lead}</p>
            </button>
          ))}
          {tab === 'messages' && (
            <div className="space-y-2">
              <div className="rounded-xl bg-white p-3 ring-1 ring-slate-100">
                <p className="text-[0.6875rem] text-slate-500">J. Whitfield · 2h ago</p>
                <p className="mt-1 text-[0.8125rem]">Due diligence on track for Friday review.</p>
              </div>
              <button type="button" onClick={() => { setMatterId('harbour'); setFlow('message') }} className="w-full rounded-xl bg-slate-100 p-3 text-[0.8125rem] font-medium">New message</button>
            </div>
          )}
          {tab === 'docs' && (
            <div className="space-y-2">
              {['Engagement letter.pdf', 'NDA_signed.pdf', 'Site_plan_v2.pdf'].map((d) => (
                <div key={d} className="flex items-center justify-between rounded-xl bg-white p-3 ring-1 ring-slate-100 text-[0.8125rem]">
                  <span>{d}</span><span className="text-slate-400">↓</span>
                </div>
              ))}
            </div>
          )}
        </DemoScreen>
      </div>
      <DemoTabBar tabs={[{ id: 'home', label: 'Home', icon: '⌂' }, { id: 'matters', label: 'Matters', icon: '▦' }, { id: 'messages', label: 'Chat', icon: '💬' }, { id: 'docs', label: 'Docs', icon: '📄' }]} active={tab} onChange={(id) => { setFlow(null); setTab(id as Tab) }} accentColor={accent} />
    </div>
  )
}

export function NorthgateLegalDemo() {
  return (
    <InteractiveDemoShell demoId="northgate-legal" accentColor={accent}>
      <NorthgateApp />
    </InteractiveDemoShell>
  )
}
