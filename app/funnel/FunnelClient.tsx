'use client'

import { useState, useEffect, useRef } from 'react'

const WHOP_PRODUCT_URL = 'https://whop.com/svj-community/svj-media-30-day-blueprint/'

const funnelSteps = [
  {
    width: '100%',
    bg: '#0F1F35',
    accent: '#3B82F6',
    label: 'CONTENT',
    sublabel: 'Top of Funnel',
    tags: ['TikTok', 'Reels', 'Clips', 'ManyChat Trigger'],
    arrow: 'They watch. They comment a keyword. ManyChat fires a DM.',
  },
  {
    width: '88%',
    bg: '#1A1040',
    accent: '#8B5CF6',
    label: 'OPT-IN PAGE',
    sublabel: 'Own Your Audience',
    tags: ['Email', 'Phone', 'Name'],
    arrow: 'They give you contact info. You own the line now.',
  },
  {
    width: '76%',
    bg: '#0A2218',
    accent: '#22C55E',
    label: 'EMAIL SEQUENCE',
    sublabel: '5 to 7 Days',
    tags: ['ConvertKit', 'One story per email', 'No pitching until day 3'],
    arrow: 'Trust builds. They read every email. Then they see the offer.',
  },
  {
    width: '64%',
    bg: '#1E1200',
    accent: '#F59E0B',
    label: 'LOW TICKET OFFER',
    sublabel: '$97 One Time',
    tags: ['Whop', 'Creator Content to Cash Machine', 'Instant access'],
    arrow: 'They buy once. They trust you now. The next offer is easy.',
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
  { pct: '100%', label: 'See your content', condition: 'If you post right' },
  { pct: '10%', label: 'Opt in', condition: 'If your hook is real' },
  { pct: '3%', label: 'Buy the $97 product', condition: 'If the sequence works' },
  { pct: '1%', label: 'Go high ticket', condition: 'The ones who are ready' },
]

const forYou = [
  'You have an audience but no system behind it',
  'You make content but income is unpredictable',
  'You want recurring revenue not one-off brand deals',
  'You are ready to build infrastructure not just post',
]

const notForYou = [
  'You want someone to do it for you',
  'You have under 1,000 followers and no email list',
  'You think more views equals more money',
  'You are not willing to send emails to your list',
]

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
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
  const mapRef = useRef<HTMLDivElement>(null)

  const optIns = Math.round(audience * 0.10)
  const lowTicketBuyers = Math.round(optIns * 0.03)
  const highTicketBuyers = Math.round(optIns * 0.005)
  const lowTicketRev = lowTicketBuyers * 97
  const highTicketRevLow = highTicketBuyers * 1500
  const highTicketRevHigh = highTicketBuyers * 10000
  const totalLow = lowTicketRev + highTicketRevLow
  const totalHigh = lowTicketRev + highTicketRevHigh

  function fmt(n: number) {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
    if (n >= 1_000) return `$${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`
    return `$${n}`
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const already = localStorage.getItem('svj_funnel_submitted')
      if (already) {
        setSubmitted(true)
        setTimeout(() => setVisible(true), 50)
      }
    }
  }, [])

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
        setTimeout(() => {
          mapRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }, 50)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-bg text-white font-sans">
      <div className="max-w-3xl mx-auto px-6 py-20">

        {/* ── GATE ── */}
        {!submitted && (
          <div className="text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-green-800 mb-8"
              style={{ background: 'rgba(34,197,94,0.08)' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-green-400">Free Resource</span>
            </div>

            {/* H1 */}
            <h1 className="text-[38px] md:text-[58px] font-bold leading-[1.1] text-white">
              The Creator{' '}
              <span className="text-accent">Money Map</span>
            </h1>

            {/* Body */}
            <p className="text-lg text-muted leading-relaxed mt-6 max-w-xl mx-auto">
              You have an audience. You post consistently. But there is no system behind it — no funnel, no email list, no product that converts while you sleep.
            </p>
            <p className="text-lg text-muted leading-relaxed mt-4 max-w-xl mx-auto">
              This map shows you exactly how top creators build the backend that turns content into recurring revenue. Five steps. No fluff.
            </p>

            {/* Form Card */}
            <div className="bg-card border mt-12 rounded-lg p-8 text-left" style={{ borderColor: '#1A1A1A' }}>
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

            {/* Social Proof */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {['Kai Cenat', 'ChrisTooSmoove', 'Fanum', 'MrBeast Production'].map(name => (
                <span key={name} className="text-xs font-semibold text-muted px-3 py-1 rounded border"
                  style={{ borderColor: '#1A1A1A', background: '#111111' }}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── MAP ── */}
        {submitted && (
          <div ref={mapRef}>

            {/* Eyebrow */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-green-800 mb-6"
                style={{ background: 'rgba(34,197,94,0.08)' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-bold tracking-widest uppercase text-green-400">Free Resource</span>
              </div>
              <h1 className="text-[38px] md:text-[52px] font-bold leading-[1.1]">
                The Creator <span className="text-accent">Money Map</span>
              </h1>
              <p className="text-muted mt-4 max-w-lg mx-auto">
                Five steps. The exact backend that converts content into recurring revenue.
              </p>
            </div>

            {/* Funnel Steps */}
            <div className="flex flex-col items-center">
              {funnelSteps.map((step, i) => (
                <div key={step.label} className="w-full flex flex-col items-center">
                  {/* Step Block */}
                  <div
                    className="rounded-lg p-6 transition-all"
                    style={{
                      width: step.width,
                      maxWidth: '100%',
                      background: step.bg,
                      border: step.border ?? `1px solid ${step.accent}22`,
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(16px)',
                      transition: `opacity 0.4s ease ${i * 180}ms, transform 0.4s ease ${i * 180}ms`,
                    }}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                      <div>
                        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: step.accent }}>
                          {step.label}
                        </p>
                        <p className="text-sm text-muted mt-0.5">{step.sublabel}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {step.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded"
                          style={{ background: `${step.accent}18`, color: step.accent }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Connector */}
                  {step.arrow && (
                    <div className="flex flex-col items-center my-2"
                      style={{
                        opacity: visible ? 1 : 0,
                        transition: `opacity 0.4s ease ${i * 180 + 90}ms`,
                      }}>
                      <div className="w-px h-5" style={{ background: '#2A2A2A' }} />
                      <p className="text-xs text-muted text-center px-4 max-w-xs">{step.arrow}</p>
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderTop: '7px solid #2A2A2A',
                          marginTop: '4px',
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stats Section */}
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

            {/* Revenue Calculator */}
            <div className="mt-8 bg-card border rounded-lg p-8" style={{ borderColor: '#1A1A1A' }}>
              <p className="text-xs font-bold tracking-widest uppercase text-muted mb-6">Run Your Numbers</p>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-white">Your audience size</label>
                  <span className="text-sm font-bold text-accent">{audience.toLocaleString()} followers</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={5000000}
                  step={1000}
                  value={audience}
                  onChange={e => setAudience(Number(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>1K</span>
                  <span>5M</span>
                </div>
              </div>

              {/* Funnel math */}
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between py-2" style={{ borderBottom: '1px solid #1A1A1A' }}>
                  <span className="text-muted">10% opt-in → email list</span>
                  <span className="text-white font-semibold">{optIns.toLocaleString()} people</span>
                </div>
                <div className="flex justify-between py-2" style={{ borderBottom: '1px solid #1A1A1A' }}>
                  <span className="text-muted">3% buy $97 low ticket</span>
                  <span className="font-semibold" style={{ color: '#F59E0B' }}>{lowTicketBuyers.toLocaleString()} buyers · {fmt(lowTicketRev)}</span>
                </div>
                <div className="flex justify-between py-2" style={{ borderBottom: '1px solid #1A1A1A' }}>
                  <span className="text-muted">0.5% go high ticket ($1.5K–$10K)</span>
                  <span className="font-semibold" style={{ color: '#F97316' }}>{highTicketBuyers.toLocaleString()} clients · {fmt(highTicketRevLow)}–{fmt(highTicketRevHigh)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="rounded-lg p-5 text-center" style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.3)' }}>
                <p className="text-xs font-bold tracking-widest uppercase text-muted mb-1">Total Revenue Potential</p>
                <p className="text-4xl font-bold text-white">
                  {fmt(totalLow)}<span className="text-muted text-2xl">–</span>{fmt(totalHigh)}
                </p>
                <p className="text-xs text-muted mt-2">from {audience.toLocaleString()} followers with a working system behind it</p>
              </div>
            </div>

            {/* Qualifier Grid */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* For You */}
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

              {/* Not For You */}
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

            {/* CTA Card */}
            <div className="mt-16 rounded-lg p-10 text-center bg-card" style={{ border: '1px solid #2563EB' }}>
              <p className="text-xs font-bold tracking-widest uppercase text-accent mb-4">Next Step</p>
              <h2 className="text-[28px] md:text-[36px] font-bold text-white leading-snug">
                Get the full blueprint. $97 one time.
              </h2>
              <p className="text-muted mt-4 max-w-lg mx-auto">
                The Creator Content to Cash Machine. Everything you just saw built out step by step. Templates, email sequences, funnel structure. All of it.
              </p>
              <a
                href={WHOP_PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-8 bg-accent text-white font-bold text-base px-10 py-4 rounded-lg hover:opacity-90 transition"
              >
                Get The $97 Blueprint →
              </a>
            </div>

            {/* Footer */}
            <div className="mt-20 pt-8 text-center" style={{ borderTop: '1px solid #1A1A1A' }}>
              <p className="text-sm text-muted leading-relaxed max-w-xl mx-auto">
                Built by Nico Chaves / SVJ Media. Worked with Kai Cenat, ChrisTooSmoove, Fanum, and MrBeast production. 2,000 followers. More revenue than most creators with millions. The system is the product.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
