'use client'
import Image from 'next/image'
import { useState } from 'react'

const creators = [
  { image: '/creators/mrbeast.jpg', name: 'MrBeast', role: 'Video production' },
  { image: '/creators/kaicenat.jpg', name: 'Kai Cenat', role: 'Systems and infrastructure' },
  { image: '/creators/fanum.jpg', name: 'Fanum', role: 'Operations and workflow' },
  { image: '/creators/christoosmoove.jpg', name: 'ChrisTooSmoove', role: 'Content strategy and career management' },
  { image: '/creators/balloutalex.jpg', name: 'BalloutAlex', role: 'Full channel management and vision' },
]

function CreatorCard({ creator }: { creator: typeof creators[0] }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="snap-start flex-shrink-0 w-52 md:w-auto bg-card border border-border rounded-xl overflow-hidden">
      <div className="relative w-full bg-[#1a1a1a]" style={{ aspectRatio: '3/4' }}>
        {!imgError ? (
          <Image
            src={creator.image}
            alt={creator.name}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
            <span className="text-4xl font-bold text-border">{creator.name[0]}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      <div className="p-5">
        <p className="text-lg font-bold text-white">{creator.name}</p>
        <p className="text-sm text-muted mt-1">{creator.role}</p>
      </div>
    </div>
  )
}

export default function CreatorCards() {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <div className="inline-flex items-center border border-border bg-card rounded-full px-6 py-3">
            <span className="text-[13px] text-muted font-semibold tracking-widest uppercase">
              INFRASTRUCTURE: 500M+ VIEWS MANAGED
            </span>
          </div>

          <h2 className="text-[44px] md:text-[80px] font-extrabold tracking-tight leading-none text-white mt-8 uppercase">
            THE OPERATORS BEHIND THE EMPIRES.
          </h2>

          <p className="text-lg text-muted max-w-2xl mx-auto mt-6">
            We build the systems that sustain the world&apos;s largest creators. Scalable management for 100k+ follower brands.
          </p>
        </div>

        <div className="mt-16 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-5 md:overflow-x-visible">
          {creators.map((creator) => (
            <CreatorCard key={creator.name} creator={creator} />
          ))}
        </div>
      </div>
    </section>
  )
}
