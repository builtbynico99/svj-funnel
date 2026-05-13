'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const WHOP_PRODUCT_URL = 'https://whop.com/svj-community/svj-media-30-day-blueprint/'

const shortFormStep1 = {
  tags: ['TikTok', 'Reels', 'YouTube Shorts', 'Clips', 'ManyChat Trigger'],
  arrow: 'They watch. They comment the word. ManyChat fires a DM in seconds.',
  badge: null as string | null,
}

const longFormStep1 = {
  tags: ['YouTube', 'Podcasts', 'Long-Form Video'],
  arrow: 'They watch 20+ minutes. They already trust you before they ever see your opt-in.',
  badge: 'Higher trust. Higher conversion downstream.' as string | null,
}

const shortFormStats = [
  { pct: '100%', label: 'See your content',  condition: 'If you post right.' },
  { pct: '10%',  label: 'Opt in',            condition: 'If the hook is real.' },
  { pct: '3%',   label: 'Buy the $97',       condition: 'If the sequence works.' },
  { pct: '0.1%', label: 'Mid ticket',        condition: 'Buyers who want the next level.' },
  { pct: '0.5%', label: 'Go high ticket',    condition: 'The ones who are ready.' },
]

const longFormStats = [
  { pct: '100%', label: 'See your content',  condition: 'If you post right.' },
  { pct: '15%',  label: 'Opt in',            condition: 'Long form builds real trust.' },
  { pct: '5%',   label: 'Buy the $97',       condition: 'Warmer leads convert higher.' },
  { pct: '0.3%', label: 'Mid ticket',        condition: 'Warmer leads go deeper.' },
  { pct: '1%',   label: 'Go high ticket',    condition: 'The ones who are ready.' },
]

const shortFormRates = { optIn: 0.10, lowTicket: 0.03, midTicket: 0.001, highTicket: 0.005 }
const longFormRates  = { optIn: 0.15, lowTicket: 0.05, midTicket: 0.003, highTicket: 0.01  }

const forYou = [
  "You have an audience but no system behind it",
  "You're making content but income is unpredictable",
  "You want recurring revenue not one-off brand deals",
  "You're ready to build infrastructure not just post",
]

const notForYou = [
  "You want someone else to do it for you",
  "You have under 1,000 followers and no email list",
  "You think more views equals more money",
  "You're not willing to send emails to your list",
]

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

function useCountUp(target: number, duration = 400) {
  const [display, setDisplay] = useState(target)
  const rafRef   = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const fromRef  = useRef(target)

  useEffect(() => {
    const from = fromRef.current
    const to   = target
    if (from === to) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    startRef.current = null

    function tick(ts: number) {
      if (!startRef.current) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(from + (to - from) * eased))
      if (progress < 1) { rafRef.current = requestAnimationFrame(tick) }
      else { fromRef.current = to }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [target, duration])

  return display
}

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return `$${n}`
}

function Connector({ text, delay, visible }: { text: string; delay: number; visible: boolean }) {
  return (
    <div className="flex flex-col items-center my-2 w-full"
      style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${delay}ms` }}>
      <div className="connector-line w-px h-5" style={{ background: '#3A3A3A' }} />
      <p className="text-xs text-muted text-center px-4 max-w-xs py-1">{text}</p>
      <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '7px solid #3A3A3A', marginTop: 4 }} />
    </div>
  )
}

function FunnelCalc({ audience, setAudience, rates }: {
  audience: number
  setAudience: (n: number) => void
  rates: typeof shortFormRates
}) {
  const [inputVal, setInputVal] = useState(audience.toLocaleString())

  const optIns         = Math.round(audience * rates.optIn)
  const lowBuyers      = Math.round(optIns * rates.lowTicket)
  const midBuyers      = Math.round(optIns * rates.midTicket)
  const highBuyers     = Math.round(optIns * rates.highTicket)
  const lowRev         = lowBuyers * 97
  const midRevLow      = midBuyers * 500
  const midRevHigh     = midBuyers * 1000
  const highRevLow     = highBuyers * 2500
  const highRevHigh    = highBuyers * 20000
  const totalLow       = lowRev + midRevLow  + highRevLow
  const totalHigh      = lowRev + midRevHigh + highRevHigh

  const aOptIns    = useCountUp(optIns)
  const aLowB      = useCountUp(lowBuyers)
  const aLowR      = useCountUp(lowRev)
  const aMidB      = useCountUp(midBuyers)
  const aMidRL     = useCountUp(midRevLow)
  const aMidRH     = useCountUp(midRevHigh)
  const aHighB     = useCountUp(highBuyers)
  const aHighRL    = useCountUp(highRevLow)
  const aHighRH    = useCountUp(highRevHigh)
  const aTotalL    = useCountUp(totalLow)
  const aTotalH    = useCountUp(totalHigh)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputVal(e.target.value)
    const n = parseInt(e.target.value.replace(/,/g, ''), 10)
    if (!isNaN(n)) setAudience(Math.max(1000, Math.min(5_000_000, n)))
  }
  function handleInputBlur() { setInputVal(audience.toLocaleString()) }
  function handleSlider(e: React.ChangeEvent<HTMLInputElement>) {
    const n = Number(e.target.value)
    setAudience(n)
    setInputVal(n.toLocaleString())
  }

  const optPct  = Math.round(rates.optIn * 100)
  const lowPct  = Math.round(rates.lowTicket * 100)
  const midPct  = (rates.midTicket * 100).toFixed(1).replace(/\.0$/, '')
  const highPct = (rates.highTicket * 100).toFixed(1).replace(/\.0$/, '')

  return (
    <div className="mt-8 bg-card border rounded-lg p-6 md:p-8" style={{ borderColor: '#1A1A1A' }}>
      <p className="text-xs font-bold tracking-widest uppercase text-muted mb-6">Run Your Numbers</p>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-white mb-3">Your audience size</label>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="10,000"
            className="w-full bg-bg border rounded-lg px-4 py-3 text-white text-sm font-semibold focus:outline-none focus:border-accent transition"
            style={{ borderColor: '#222222' }}
          />
          <input type="range" min={1000} max={5000000} step={1000} value={audience}
            onChange={handleSlider} className="w-full accent-accent" style={{ minHeight: 44 }} />
          <div className="flex justify-between text-xs text-muted"><span>1K</span><span>5M</span></div>
        </div>
      </div>

      <div className="space-y-0 mb-6 text-sm">
        <div className="flex flex-wrap justify-between gap-1 py-3" style={{ borderBottom: '1px solid #1A1A1A' }}>
          <span className="text-muted">{optPct}% opt-in → email list</span>
          <span className="text-white font-semibold">{aOptIns.toLocaleString()} people</span>
        </div>
        <div className="flex flex-wrap justify-between gap-1 py-3" style={{ borderBottom: '1px solid #1A1A1A' }}>
          <span className="text-muted">{lowPct}% buy $97 low ticket</span>
          <span className="font-semibold" style={{ color: '#F59E0B' }}>
            {aLowB.toLocaleString()} buyers · {fmt(aLowR)}
          </span>
        </div>
        <div className="flex flex-wrap justify-between gap-1 py-3" style={{ borderBottom: '1px solid #1A1A1A' }}>
          <span className="text-muted">{midPct}% mid ticket ($500–$1K)</span>
          <span className="font-semibold" style={{ color: '#F97316' }}>
            {aMidB.toLocaleString()} buyers · {fmt(aMidRL)}–{fmt(aMidRH)}
          </span>
        </div>
        <div className="flex flex-wrap justify-between gap-1 py-3" style={{ borderBottom: '1px solid #1A1A1A' }}>
          <span className="text-muted">{highPct}% high ticket ($2.5K–$20K)</span>
          <span className="font-semibold" style={{ color: '#EF4444' }}>
            {aHighB.toLocaleString()} clients · {fmt(aHighRL)}–{fmt(aHighRH)}
          </span>
        </div>
      </div>

      <div className="rounded-lg p-5 text-center" style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.3)' }}>
        <p className="text-xs font-bold tracking-widest uppercase text-muted mb-1">Total Revenue Potential</p>
        <p className="text-4xl font-bold text-white">
          {fmt(aTotalL)}<span className="text-muted text-2xl">–</span>{fmt(aTotalH)}
        </p>
        <p className="text-xs text-muted mt-2">from {audience.toLocaleString()} followers with a system behind it.</p>
      </div>
    </div>
  )
}

export default function FunnelClient() {
  const [submitted, setSubmitted]     = useState(false)
  const [visible, setVisible]         = useState(false)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')
  const [name, setName]               = useState('')
  const [email, setEmail]             = useState('')
  const [phone, setPhone]             = useState('')
  const [audience, setAudience]       = useState(10000)
  const [mode, setMode]               = useState<'short' | 'long'>('short')
  const [step1Anim, setStep1Anim]     = useState(true)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (localStorage.getItem('svj_funnel_submitted')) {
      setSubmitted(true)
      setTimeout(() => setVisible(true), 50)
    }
  }, [])

  const switchMode = useCallback((next: 'short' | 'long') => {
    if (next === mode) return
    setStep1Anim(false)
    setTimeout(() => { setMode(next); setStep1Anim(true) }, 200)
  }, [mode])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) { setError('Please enter your name and email.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, first_name: name, phone }),
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error ?? 'Subscription failed') }
      localStorage.setItem('svj_funnel_submitted', '1')
      if (window.gtag) window.gtag('event', 'funnel_optin', { email })
      setSubmitted(true)
      setTimeout(() => { setVisible(true); setTimeout(() => mapRef.current?.scrollIntoView({ behavior: 'smooth' }), 100) }, 50)
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  const step1Data = mode === 'short' ? shortFormStep1 : longFormStep1
  const rates     = mode === 'short' ? shortFormRates : longFormRates
  const stats     = mode === 'short' ? shortFormStats : longFormStats

  const fadeIn = (i: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.4s ease ${i * 160}ms, transform 0.4s ease ${i * 160}ms`,
  })

  return (
    <>
      <style>{`
        @keyframes flowPulse {
          0%,100% { opacity:0.3; }
          50%      { opacity:1; }
        }
        .connector-line { animation: flowPulse 2s ease-in-out infinite; }
        .funnel-card { transition: box-shadow 0.2s ease; }
        .funnel-card:hover { box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 4px 24px rgba(0,0,0,0.4); }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .step1-anim { animation: slideUp 0.25s ease forwards; }
      `}</style>

      <main className="min-h-screen bg-bg text-white font-sans overflow-x-hidden">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-20 overflow-x-hidden">

          {/* ── GATE ── */}
          {!submitted && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-green-800 mb-8"
                style={{ background: 'rgba(34,197,94,0.08)' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-bold tracking-widest uppercase text-green-400">Free Resource</span>
              </div>

              <h1 className="font-bold leading-[1.1] text-white" style={{ fontSize: 'clamp(32px,8vw,58px)' }}>
                The Creator <span className="text-accent">Money Map</span>
              </h1>

              <p className="text-lg text-muted leading-relaxed mt-6 max-w-xl mx-auto">
                You post. People watch. Nothing converts.
              </p>
              <p className="text-lg text-muted leading-relaxed mt-2 max-w-xl mx-auto">
                This is the exact backend that fixes that.
              </p>

              <div className="bg-card border mt-12 rounded-lg p-6 md:p-8 text-left" style={{ borderColor: '#1A1A1A' }}>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-1">Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                      className="w-full bg-bg border rounded-lg px-4 py-3 text-white placeholder-muted text-sm focus:outline-none focus:border-accent transition"
                      style={{ borderColor: '#222222' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-1">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                      className="w-full bg-bg border rounded-lg px-4 py-3 text-white placeholder-muted text-sm focus:outline-none focus:border-accent transition"
                      style={{ borderColor: '#222222' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-1">
                      Phone <span className="text-muted font-normal">(optional)</span>
                    </label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 000-0000"
                      className="w-full bg-bg border rounded-lg px-4 py-3 text-white placeholder-muted text-sm focus:outline-none focus:border-accent transition"
                      style={{ borderColor: '#222222' }} />
                  </div>
                  {error && <p className="text-red-400 text-sm">{error}</p>}
                  <button type="submit" disabled={loading}
                    className="w-full bg-accent text-white font-bold text-base py-4 rounded-lg hover:opacity-90 transition disabled:opacity-60 mt-2">
                    {loading ? 'Sending...' : 'Show Me The Map →'}
                  </button>
                </form>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {['Kai Cenat', 'ChrisTooSmoove', 'Fanum', 'MrBeast Production'].map(n => (
                  <span key={n} className="text-xs font-semibold text-muted px-3 py-1 rounded border"
                    style={{ borderColor: '#1A1A1A', background: '#111111' }}>{n}</span>
                ))}
              </div>
            </div>
          )}

          {/* ── MAP ── */}
          {submitted && (
            <div ref={mapRef}>

              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-green-800 mb-6"
                  style={{ background: 'rgba(34,197,94,0.08)' }}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-xs font-bold tracking-widest uppercase text-green-400">Free Resource</span>
                </div>
                <h1 className="font-bold leading-[1.1]" style={{ fontSize: 'clamp(30px,7vw,52px)' }}>
                  The Creator <span className="text-accent">Money Map</span>
                </h1>
                <p className="text-muted mt-4 max-w-lg mx-auto text-sm md:text-base">
                  The exact backend that converts content into recurring revenue.
                </p>
              </div>

              {/* Toggle */}
              <div className="flex justify-center mb-8">
                <div className="flex rounded-lg p-1 gap-1" style={{ background: '#111111', border: '1px solid #1A1A1A' }}>
                  {(['short', 'long'] as const).map(m => (
                    <button key={m} onClick={() => switchMode(m)}
                      className="px-4 py-2 rounded-md text-xs font-bold tracking-wide uppercase transition-all duration-200"
                      style={{ background: mode === m ? '#2563EB' : 'transparent', color: mode === m ? '#fff' : '#9CA3AF' }}>
                      {m === 'short' ? 'Short Form' : 'Long Form'}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── FUNNEL FLOW ── */}
              <div className="flex flex-col items-center w-full">

                {/* Step 1: CONTENT */}
                <div className="w-full" style={fadeIn(0)}>
                  <div className={`funnel-card rounded-lg p-5 md:p-6 w-full ${step1Anim ? 'step1-anim' : 'opacity-0'}`}
                    style={{ background: '#0F1F35', border: '1px solid #3B82F622' }}>
                    <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#3B82F6' }}>CONTENT</p>
                    <p className="text-sm text-muted mb-3">Top of Funnel</p>
                    <div className="flex flex-wrap gap-2">
                      {step1Data.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded"
                          style={{ background: '#3B82F618', color: '#3B82F6' }}>{tag}</span>
                      ))}
                    </div>
                    {step1Data.badge && (
                      <p className="text-xs mt-3 font-semibold" style={{ color: '#22C55E' }}>↑ {step1Data.badge}</p>
                    )}
                  </div>
                </div>

                <Connector text={step1Data.arrow} delay={80} visible={visible} />

                {/* Step 2: OPT-IN */}
                <div className="w-full" style={fadeIn(1)}>
                  <div className="funnel-card rounded-lg p-5 md:p-6 w-full"
                    style={{ background: '#1A1040', border: '1px solid #8B5CF622' }}>
                    <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#8B5CF6' }}>OPT-IN PAGE</p>
                    <p className="text-sm text-muted mb-1">Own Your Audience</p>
                    <p className="text-xs text-muted leading-relaxed mb-3 opacity-80">
                      This is where you offer free value. A checklist, a guide, a resource — something worth trading an email for. They get it for free. You get the contact.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Email', 'Phone', 'Name', 'Free Product'].map(tag => (
                        <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded"
                          style={{ background: '#8B5CF618', color: '#8B5CF6' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <Connector text="They give you contact info. You own the line now. No algorithm cuts you off." delay={240} visible={visible} />

                {/* Step 3: EMAIL + COMMUNITY side by side */}
                <div className="w-full" style={fadeIn(2)}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">

                    {/* Email Sequence */}
                    <div className="funnel-card rounded-lg p-5"
                      style={{ background: '#0A2218', border: '1px solid #22C55E22' }}>
                      <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#22C55E' }}>EMAIL SEQUENCE</p>
                      <p className="text-sm text-muted mb-3">5 to 7 Days</p>
                      <div className="flex flex-wrap gap-2">
                        {['ConvertKit', 'One story per email', 'No pitching until day 3'].map(tag => (
                          <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded"
                            style={{ background: '#22C55E18', color: '#22C55E' }}>{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Free Community */}
                    <div className="funnel-card rounded-lg p-5"
                      style={{ background: '#0D1A2E', border: '1px solid #60A5FA22' }}>
                      <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#60A5FA' }}>FREE COMMUNITY</p>
                      <p className="text-sm text-muted mb-1">Where They Live</p>
                      <p className="text-xs text-muted leading-relaxed mb-3 opacity-80">
                        This is where trust compounds. They&apos;re in your world daily. Email sequence runs in the background while they&apos;re already engaged in the community.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['Discord', 'Skool', 'Telegram'].map(tag => (
                          <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded"
                            style={{ background: '#60A5FA18', color: '#60A5FA' }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Double-headed connector label between the two cards */}
                  <div className="flex items-center justify-center gap-2 mt-2 mb-1">
                    <div className="h-px flex-1" style={{ background: '#22C55E33' }} />
                    <span className="text-xs text-muted px-2">↔ run simultaneously</span>
                    <div className="h-px flex-1" style={{ background: '#60A5FA33' }} />
                  </div>
                </div>

                <Connector text="Trust builds. They read every email. By day 5 the offer feels obvious." delay={400} visible={visible} />

                {/* Step 4: LOW TICKET */}
                <div className="w-full" style={fadeIn(3)}>
                  <div className="funnel-card rounded-lg p-5 md:p-6 mx-auto"
                    style={{ maxWidth: '88%', background: '#1E1200', border: '1px solid #F59E0B22' }}>
                    <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#F59E0B' }}>LOW TICKET</p>
                    <p className="text-sm text-muted mb-3">$97 One Time</p>
                    <div className="flex flex-wrap gap-2">
                      {['Whop', 'Creator Content to Cash Machine', 'Instant access'].map(tag => (
                        <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded"
                          style={{ background: '#F59E0B18', color: '#F59E0B' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <Connector text="They buy once. Now they're a buyer. The next offer is easy." delay={560} visible={visible} />

                {/* Step 5: MID TICKET */}
                <div className="w-full" style={fadeIn(4)}>
                  <div className="funnel-card rounded-lg p-5 md:p-6 mx-auto"
                    style={{ maxWidth: '76%', background: '#1A0D00', border: '1px solid #F9731622' }}>
                    <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#F97316' }}>MID TICKET</p>
                    <p className="text-sm text-muted mb-3">$500–$1,000</p>
                    <div className="flex flex-wrap gap-2">
                      {['Deeper access', 'Group program', 'Done-with-you'].map(tag => (
                        <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded"
                          style={{ background: '#F9731618', color: '#F97316' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <Connector text="They've already bought. They want more. This is the next logical step." delay={720} visible={visible} />

                {/* Step 6: HIGH TICKET */}
                <div className="w-full" style={fadeIn(5)}>
                  <div className="funnel-card rounded-lg p-5 md:p-6 mx-auto"
                    style={{ maxWidth: '64%', background: '#1A0800', border: '1.5px solid #D85A30' }}>
                    <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#F97316' }}>HIGH TICKET / PARTNERSHIP</p>
                    <p className="text-sm text-muted mb-1">$2,500–$20,000</p>
                    <p className="text-xs text-muted leading-relaxed mb-3 opacity-80">
                      If they went through the system they&apos;re already qualified. We don&apos;t take cold applicants.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {['90-Day Sprint', 'Full Partnership', '30% Rev Share'].map(tag => (
                        <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded"
                          style={{ background: '#F9731618', color: '#F97316' }}>{tag}</span>
                      ))}
                    </div>
                    <p className="text-xs font-semibold leading-snug" style={{ color: '#EF4444' }}>
                      ⚠ Qualified applicants only. You don&apos;t skip to this. Low ticket and mid ticket buyers first.
                    </p>
                  </div>
                </div>

              </div>
              {/* END FUNNEL */}

              {/* Stats */}
              <div className="mt-20">
                <p className="text-xs font-bold tracking-widest uppercase text-muted text-center mb-8">The Numbers</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {stats.map(s => (
                    <div key={s.pct} className="bg-card border rounded-lg p-4 text-center" style={{ borderColor: '#1A1A1A' }}>
                      <p className="text-2xl font-bold text-white">{s.pct}</p>
                      <p className="text-xs font-semibold text-white mt-1">{s.label}</p>
                      <p className="text-xs text-muted mt-1 leading-snug">{s.condition}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculator */}
              <FunnelCalc audience={audience} setAudience={setAudience} rates={rates} />

              {/* Qualifier */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg p-6" style={{ background: '#0A1F0A', border: '1px solid #14532D' }}>
                  <p className="text-xs font-bold tracking-widest uppercase text-green-400 mb-4">This Is For You If</p>
                  <ul className="space-y-3">
                    {forYou.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white">
                        <span className="text-green-400 mt-0.5 shrink-0">✓</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg p-6" style={{ background: '#1A0808', border: '1px solid #7F1D1D' }}>
                  <p className="text-xs font-bold tracking-widest uppercase text-red-400 mb-4">This Is Not For You If</p>
                  <ul className="space-y-3">
                    {notForYou.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white">
                        <span className="text-red-400 mt-0.5 shrink-0">✕</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-16 rounded-lg p-8 md:p-10 text-center bg-card" style={{ border: '1px solid #2563EB' }}>
                <p className="text-xs font-bold tracking-widest uppercase text-accent mb-4">Next Step</p>
                <h2 className="font-bold text-white leading-snug" style={{ fontSize: 'clamp(22px,5vw,36px)' }}>
                  Get the full blueprint. $97 one time.
                </h2>
                <p className="text-muted mt-4 max-w-lg mx-auto text-sm md:text-base">
                  The Creator Content to Cash Machine. Everything you just saw built out step by step. Templates, email sequences, funnel structure. All of it.
                </p>
                <a href={WHOP_PRODUCT_URL} target="_blank" rel="noopener noreferrer"
                  className="block md:inline-block mt-8 bg-accent text-white font-bold text-base px-10 py-4 rounded-lg hover:opacity-90 transition w-full md:w-auto text-center">
                  Get The $97 Blueprint →
                </a>
              </div>

              {/* Footer */}
              <div className="mt-16 pt-8 text-center px-4" style={{ borderTop: '1px solid #1A1A1A' }}>
                <p className="text-sm text-muted leading-relaxed max-w-xl mx-auto">
                  Built by Nico Chaves / SVJ Media. Worked with Kai Cenat, ChrisTooSmoove, Fanum, and MrBeast production. 2,000 followers. More revenue than most creators with millions. The system is the product.
                </p>
              </div>

            </div>
          )}
        </div>
      </main>
    </>
  )
}
