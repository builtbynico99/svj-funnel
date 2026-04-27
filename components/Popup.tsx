'use client'
import { useEffect, useState } from 'react'

export default function Popup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const seen = sessionStorage.getItem('svj_popup_seen')
      if (!seen) {
        setVisible(true)
        sessionStorage.setItem('svj_popup_seen', '1')
      }
    }, 10000)

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false)
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', handleKey)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={() => setVisible(false)}
    >
      <div
        className="relative w-full max-w-[480px] rounded-xl p-10"
        style={{ background: '#0A0A0A', border: '2px solid #2563EB' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-muted hover:text-white text-xl leading-none"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-white leading-snug">
          Your hooks are the reason nobody is watching. Get the Free Hook Generator.
        </h2>

        <p className="text-base text-muted mt-4">This tool fixes exactly that.</p>
        <p className="text-base text-muted mt-4">Same formula we use for the creators you watch every day.</p>
        <p className="text-base text-muted mt-4">Trained on our internal data.</p>
        <p className="text-base text-muted mt-4">Completely Free.</p>
        <p className="text-base text-muted mt-4">Try it out and feel free to give input to make it better.</p>

        <a
          href="https://svj-hook-generator.vercel.app/generator"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setVisible(false)}
          className="block w-full text-center bg-white text-black font-bold text-base tracking-widest uppercase px-6 py-4 rounded-lg mt-8 hover:bg-gray-100 transition"
        >
          GET FREE ACCESS
        </a>
      </div>
    </div>
  )
}
