'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-bg border-b border-border">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white">
          SVJ<span className="text-accent">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#how-it-works" className="text-sm text-muted hover:text-white transition">
            How It Works
          </Link>
          <Link href="/blueprint" className="text-sm text-muted hover:text-white transition">
            The Blueprint
          </Link>
          <Link href="/academy" className="text-sm text-muted hover:text-white transition">
            SVJ Academy
          </Link>
          <Link
            href="/apply"
            className="bg-white text-black text-sm font-semibold px-5 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Apply to Partner
          </Link>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-bg flex flex-col">
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white" onClick={() => setMobileOpen(false)}>
              SVJ<span className="text-accent">.</span>
            </Link>
            <button
              className="text-white p-2"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-8 px-6 pt-12">
            <Link href="/#how-it-works" className="text-2xl font-semibold text-white" onClick={() => setMobileOpen(false)}>
              How It Works
            </Link>
            <Link href="/blueprint" className="text-2xl font-semibold text-white" onClick={() => setMobileOpen(false)}>
              The Blueprint
            </Link>
            <Link href="/academy" className="text-2xl font-semibold text-white" onClick={() => setMobileOpen(false)}>
              SVJ Academy
            </Link>
            <Link
              href="/apply"
              className="inline-block bg-white text-black text-xl font-semibold px-6 py-4 rounded-lg text-center"
              onClick={() => setMobileOpen(false)}
            >
              Apply to Partner
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
