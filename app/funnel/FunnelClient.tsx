'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const WHOP_PRODUCT_URL = 'https://whop.com/svj-community/svj-media-30-day-blueprint/'

const shortFormStep1 = {
  tags: ['TikTok', 'Reels', 'Clips', 'ManyChat Trigger'],
  arrow: 'They watch. They comment the word. ManyChat fires a DM in seconds.',
  badge: null,
}

const longFormStep1 = {
  tags: ['YouTube', 'Podcasts', 'Long-Form Video'],
  arrow: 'They watch 20+ minutes. They already trust you before they ever see your opt-in.',
  badge: 'Higher trust. Higher conversion downstream.',
}

const funnelBase = [
  {
    width: '88%',
    bg: '#1A1040',
    accent: '#8B5CF6',
    label: 'OPT-IN PAGE',
    sublabel: 'Own Your Audience',
    tags: ['Email', 'Phone', 'Name'],
    arrow: 'They give you contact info. You own the line now. No algorithm cuts you off.',
  },
  {
    width: '76%',
    bg: '#0A2218',
    accent: '#22C55E',
    label: 'EMAIL SEQUENCE',
    sublabel: '5 to 7 Days',
    tags: ['ConvertKit', 'One story per email', 'No pitching until day 3'],
    arrow: 'Trust builds. They read every email. By day 5 the offer feels obvious.',
  },
  {
    width: '64%',
    bg: '#1E1200',
    accent: '#F59E0B',
    label: 'LOW TICKET OFFER',
    sublabel: '$97 One Time',
    tags: ['Whop', 'Creator Content to Cash Machine', 'Instant access'],
    arrow: 'They buy once. Now they\'re a buyer. The next offer is easy.',
  },
  {
    width: '52%',
    bg: '#1A0800',
    accent: '#F97316',
    border: '1.5px solid #D85A30',
    label: 'HIGH TICKET / PARTNERSHIP',
    sublabel: '$1,500 to $10K+',
    tags: ['90-Day Sprint', 'Full Partnership', '30% Rev Share'],
    arrow: null,
  },
]

const stats = [
  { pct: '100%', label: 'See your content', condition: 'If you post right.' },
  { pct: '10%', label: 'Opt in', condition: 'If the hook is real.' },
  { pct: '3%', label: 'Buy the $97', condition: 'If the sequence works.' },
  { pct: '1%', label: 'Go high ticket', condition: 'The ones who are ready.' },
]

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
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function useCountUp(target: number, duration = 400) {
  const [display, setDisplay] = useState(target)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const fromRef = useRef(target)

  useEffect(() => {
    const from = fromRef.current
    const to = target
    if (from === to) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    startRef.current = null

    function step(ts: number) {
      if (!startRef.current) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(from + (to - from) * eased))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        fromRef.current = to
      }
    }
    rafRef.current = requestAnimationFrame(step)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [target, duration])

  return display
}

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return `$${n}`
}

function FunnelCalc({ audience, setAudience }: { audience: number; setAudience: (n: number) => void }) {
  const [inputVal, setInputVal] = useState(audience.toLocaleString())

  const optIns = Math.round(audience * 0.10)
  const lowTicketBuyers = Math.round(optIns * 0.03)
  const highTicketBuyers = Math.round(optIns * 0.005)
  const lowTicketRev = lowTicketBuyers * 97
  const highTicketRevLow = highTicketBuyers * 1500
  const highTicketRevHigh = highTicketBuyers * 10000
  const totalLow = lowTicketRev + highTicketRevLow
  const totalHigh = lowTicketRev + highTicketRevHigh

  const animOptIns = useCountUp(optIns)
  const animLowBuyers = useCountUp(lowTicketBuyers)
  const animLowRev = useCountUp(lowTicketRev)
  const animHighBuyers = useCountUp(highTicketBuyers)
  const animHighLow = useCountUp(highTicketRevLow)
  const animHighHigh = useCountUp(highTicketRevHigh)
  const animTotalLow = useCountUp(totalLow)
  const animTotalHigh = useCountUp(totalHigh)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/,/g, '')
    setInputVal(e.target.value)
    const n = parseInt(raw, 10)
    if (!isNaN(n)) {
      const clamped = Math.max(1000, Math.min(5_000_000, n))
      setAudience(clamped)
    }
  }

  function handleInputBlur() {
    setInputVal(audience.toLocaleString())
  }

  function handleSlider(e: React.ChangeEvent<HTMLInputElement>) {
    const n = Number(e.target.value)
    setAudience(n)
    setInputVal(n.toLocaleString())
  }

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
          <input
            type="range"
            min={1000}
            max={5000000}
            step={1000}
            value={audience}
            onChange={handleSlider}
            className="w-full accent-accent"
            style={{ minHeight: '44px' }}
          />
          <div className="flex justify-between text-xs text-muted">
            <span>1K</span>
            <span>5M</span>
          </div>
        </div>
      </div>

      <div className="space-y-0 mb-6 text-sm">
        <div className="flex flex-wrap justify-between gap-1 py-3" style={{ borderBottom: '1px solid #1A1A1A' }}>
          <span className="text-muted">10% opt-in → email list</span>
          <span className="text-white font-semibold">{animOptIns.toLocaleString()} people</span>
        </div>
        <div className="flex flex-wrap justify-between gap-1 py-3" style={{ borderBottom: '1px solid #1A1A1A' }}>
          <span className="text-muted">3% buy $97 low ticket</span>
          <span className="font-semibold" style={{ color: '#F59E0B' }}>
            {animLowBuyers.toLocaleString()} buyers · {fmt(animLowRev)}
          </span>
        </div>
        <div className="flex flex-wrap justify-between gap-1 py-3" style={{ borderBottom: '1px solid #1A1A1A' }}>
          <span className="text-muted">0.5% go high ticket ($1.5K–$10K)</span>
          <span className="font-semibold" style={{ color: '#F97316' }}>
            {animHighBuyers.toLocaleString()} clients · {fmt(animHighLow)}–{fmt(animHighHigh)}
          </span>
        </div>
      </div>

      <div className="rounded-lg p-5 text-center" style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.3)' }}>
        <p className="text-xs font-bold tracking-widest uppercase text-muted mb-1">Total Revenue Potential</p>
        <p className="text-4xl font-bold text-white">
          {fmt(animTotalLow)}<span className="text-muted text-2xl">–</span>{fmt(animTotalHigh)}
        </p>
        <p className="text-xs text-muted mt-2">from {audience.toLocaleString()} followers with a system behind it.</p>
      </div>
    </div>
  )
}

export default function FunnelClient() {
  const [submitted, setSubmitted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [audience, setAudience] = useState(10000)
  const [mode, setMode] = useState<'short' | 'long'>('short')
  const [step1Visible, setStep1Visible] = useState(true)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const already = localStorage.getItem('svj_funnel_submitted')
      if (already) {
        setSubmitted(true)
        setTimeout(() => setVisible(true), 50)
      }
    }
  }, [])

  const switchMode = useCallback((next: 'short' | 'long') => {
    if (next === mode) return
    setStep1Visible(false)
    setTimeout(() => {
      setMode(next)
      setStep1Visible(true)
    }, 200)
  }, [mode])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email.')
      return
    }
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, first_name: name, phone }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Subscription failed')
      }

      localStorage.setItem('svj_funnel_submitted', '1')

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'funnel_optin', { email })
      }

      setSubmitted(true)
      setTimeout(() => {
        setVisible(true)
        setTimeout(() => mapRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
      }, 50)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const step1Data = mode === 'short' ? shortFormStep1 : longFormStep1

  return (
    <>
      <style>{`
        @keyframes flowPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }
        .connector-line {
          animation: flowPulse 2s ease-in-out infinite;
        }
        .funnel-card {
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .funnel-card:hover {
          box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 4px 24px rgba(0,0,0,0.4);
        }
        .step1-enter {
          animation: step1In 0.25s ease forwards;
        }
        @keyframes step1In {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <main className="min-h-screen bg-bg text-white font-sans">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-20">

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

              <h1 className="font-bold leading-[1.1] text-white"
                style={{ fontSize: 'clamp(32px, 8vw, 58px)' }}>
                The Creator{' '}
                <span className="text-accent">Money Map</span>
              </h1>

              <p className="text-lg text-muted leading-relaxed mt-6 max-w-xl mx-auto">
                You post. People watch. Nothing converts.
              </p>
              <p className="text-lg text-muted leading-relaxed mt-2 max-w-xl mx-auto">
                This is the exact five-step backend that fixes that.
              </p>

              <div className="bg-card border mt-12 rounded-lg p-6 md:p-8 text-left" style={{ borderColor: '#1A1A1A' }}>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-bg border rounded-lg px-4 py-3 text-white placeholder-muted text-sm focus:outline-none focus:border-accent transition"
                      style={{ borderColor: '#222222' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-bg border rounded-lg px-4 py-3 text-white placeholder-muted text-sm focus:outline-none focus:border-accent transition"
                      style={{ borderColor: '#222222' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-1">
                      Phone <span className="text-muted font-normal">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-bg border rounded-lg px-4 py-3 text-white placeholder-muted text-sm focus:outline-none focus:border-accent transition"
                      style={{ borderColor: '#222222' }}
                    />
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent text-white font-bold text-base py-4 rounded-lg hover:opacity-90 transition disabled:opacity-60 mt-2"
                  >
                    {loading ? 'Sending...' : 'Show Me The Map →'}
                  </button>
                </form>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {['Kai Cenat', 'ChrisTooSmoove', 'Fanum', 'MrBeast Production'].map(n => (
                  <span key={n} className="text-xs font-semibold text-muted px-3 py-1 rounded border"
                    style={{ borderColor: '#1A1A1A', background: '#111111' }}>
                    {n}
                  </span>
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
                <h1 className="font-bold leading-[1.1]"
                  style={{ fontSize: 'clamp(30px, 7vw, 52px)' }}>
                  The Creator <span className="text-accent">Money Map</span>
                </h1>
                <p className="text-muted mt-4 max-w-lg mx-auto text-sm md:text-base">
                  Five steps. The exact backend that converts content into recurring revenue.
                </p>
              </div>

              {/* Toggle */}
              <div className="flex justify-center mb-8">
                <div className="flex rounded-lg p-1 gap-1" style={{ background: '#111111', border: '1px solid #1A1A1A' }}>
                  {(['short', 'long'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => switchMode(m)}
                      className="px-4 py-2 rounded-md text-xs font-bold tracking-wide uppercase transition-all duration-200"
                      style={{
                        background: mode === m ? '#2563EB' : 'transparent',
                        color: mode === m ? '#fff' : '#9CA3AF',
                      }}
                    >
                      {m === 'short' ? 'Short Form' : 'Long Form'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Funnel */}
              <div className="flex flex-col items-center">

                {/* Step 1 — animated on toggle */}
                <div className="w-full flex flex-col items-center">
                  <div
                    className={`funnel-card rounded-lg p-5 md:p-6 w-full ${step1Visible ? 'step1-enter' : ''}`}
                    style={{
                      background: '#0F1F35',
                      border: `1px solid #3B82F622`,
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(16px)',
                      transition: `opacity 0.4s ease 0ms, transform 0.4s ease 0ms`,
                    }}
                  >
                    <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#3B82F6' }}>
                      CONTENT
                    </p>
                    <p className="text-sm text-muted mb-3">Top of Funnel</p>
                    <div className="flex flex-wrap gap-2">
                      {step1Data.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded"
                          style={{ background: '#3B82F618', color: '#3B82F6' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    {step1Data.badge && (
                      <p className="text-xs mt-3 font-semibold" style={{ color: '#22C55E' }}>
                        ↑ {step1Data.badge}
                      </p>
                    )}
                  </div>

                  {/* Connector after step 1 */}
                  <div className="flex flex-col items-center my-2"
                    style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease 90ms' }}>
                    <div className="connector-line w-px h-5" style={{ background: '#3A3A3A' }} />
                    <p className="text-xs text-muted text-center px-4 max-w-xs py-1">{step1Data.arrow}</p>
                    <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '7px solid #3A3A3A', marginTop: '4px' }} />
                  </div>
                </div>

                {/* Steps 2–5 */}
                {funnelBase.map((step, i) => (
                  <div key={step.label} className="w-full flex flex-col items-center">
                    <div
                      className="funnel-card rounded-lg p-5 md:p-6"
                      style={{
                        width: step.width,
                        maxWidth: '100%',
                        background: step.bg,
                        border: step.border ?? `1px solid ${step.accent}22`,
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(16px)',
                        transition: `opacity 0.4s ease ${(i + 1) * 180}ms, transform 0.4s ease ${(i + 1) * 180}ms`,
                      }}
                    >
                      <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: step.accent }}>
                        {step.label}
                      </p>
                      <p className="text-sm text-muted mb-3">{step.sublabel}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.tags.map(tag => (
                          <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded"
                            style={{ background: `${step.accent}18`, color: step.accent }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {step.arrow && (
                      <div className="flex flex-col items-center my-2"
                        style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${(i + 1) * 180 + 90}ms` }}>
                        <div className="connector-line w-px h-5" style={{ background: '#3A3A3A' }} />
                        <p className="text-xs text-muted text-center px-4 max-w-xs py-1">{step.arrow}</p>
                        <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '7px solid #3A3A3A', marginTop: '4px' }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-20">
                <p className="text-xs font-bold tracking-widest uppercase text-muted text-center mb-8">The Numbers</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map(s => (
                    <div key={s.pct} className="bg-card border rounded-lg p-5 text-center" style={{ borderColor: '#1A1A1A' }}>
                      <p className="text-3xl font-bold text-white">{s.pct}</p>
                      <p className="text-sm font-semibold text-white mt-1">{s.label}</p>
                      <p className="text-xs text-muted mt-1">{s.condition}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculator */}
              <FunnelCalc audience={audience} setAudience={setAudience} />

              {/* Qualifier */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg p-6" style={{ background: '#0A1F0A', border: '1px solid #14532D' }}>
                  <p className="text-xs font-bold tracking-widest uppercase text-green-400 mb-4">This Is For You If</p>
                  <ul className="space-y-3">
                    {forYou.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white">
                        <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg p-6" style={{ background: '#1A0808', border: '1px solid #7F1D1D' }}>
                  <p className="text-xs font-bold tracking-widest uppercase text-red-400 mb-4">This Is Not For You If</p>
                  <ul className="space-y-3">
                    {notForYou.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white">
                        <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-16 rounded-lg p-8 md:p-10 text-center bg-card" style={{ border: '1px solid #2563EB' }}>
                <p className="text-xs font-bold tracking-widest uppercase text-accent mb-4">Next Step</p>
                <h2 className="font-bold text-white leading-snug" style={{ fontSize: 'clamp(22px, 5vw, 36px)' }}>
                  Get the full blueprint. $97 one time.
                </h2>
                <p className="text-muted mt-4 max-w-lg mx-auto text-sm md:text-base">
                  The Creator Content to Cash Machine. Everything you just saw built out step by step. Templates, email sequences, funnel structure. All of it.
                </p>
                <a
                  href={WHOP_PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block md:inline-block mt-8 bg-accent text-white font-bold text-base px-10 py-4 rounded-lg hover:opacity-90 transition w-full md:w-auto text-center"
                >
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
