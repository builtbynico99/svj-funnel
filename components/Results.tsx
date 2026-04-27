'use client'
import Image from 'next/image'
import { useState } from 'react'

function ViralTweetImage() {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <div className="mt-6 rounded-lg overflow-hidden bg-[#1a1a1a] flex items-center justify-center" style={{ height: 280 }}>
        <p className="text-muted text-sm">viral-tweet.png (add to /public)</p>
      </div>
    )
  }

  return (
    <div className="mt-6 rounded-lg overflow-hidden">
      <Image
        src="/viral-tweet.png"
        alt="Playboi Carti x ChrisTooSmoove viral tweet that hit number 1 trending on X/Twitter"
        width={600}
        height={800}
        className="w-full object-cover"
        onError={() => setImgError(true)}
      />
    </div>
  )
}

export default function Results() {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[48px] font-bold text-white">
            The results speak for themselves.
          </h2>
          <p className="text-lg text-muted mt-4">
            This is what SVJ infrastructure looks like when it hits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-8">
            <span className="inline-block bg-accent text-white text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded">
              #1 ON X/TWITTER
            </span>
            <ViralTweetImage />
            <p className="text-[12px] text-muted tracking-widest uppercase font-semibold mt-6">
              VIRAL MOMENT
            </p>
            <h3 className="text-2xl font-bold text-white mt-2">
              ChrisTooSmoove x Playboi Carti
            </h3>
            <p className="text-base text-muted mt-3 leading-relaxed">
              Pictures strategically leaked on X. Went number 1 Trending on X/Twitter with many posts like this.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 flex flex-col justify-center">
            <div>
              <span className="inline-block bg-accent text-white text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded">
                507K VIEWS
              </span>
              <p className="text-[12px] text-muted tracking-widest uppercase font-semibold mt-4">
                VIDEO PERFORMANCE
              </p>
              <h3 className="text-2xl font-bold text-white mt-2">507,312 views</h3>
              <p className="text-base text-muted mt-3 leading-relaxed">
                504K above typical performance. One SVJ-managed video.
              </p>
            </div>

            <div className="my-6 border-t border-border" />

            <div>
              <span className="inline-block bg-accent text-white text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded">
                37.8M VIEWS
              </span>
              <p className="text-[12px] text-muted tracking-widest uppercase font-semibold mt-4">
                CHANNEL GROWTH
              </p>
              <h3 className="text-2xl font-bold text-white mt-2">37.8M views in 12 months</h3>
              <p className="text-base text-muted mt-3 leading-relaxed">
                999% plus growth versus prior year. This is what the backend looks like at scale.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted italic mt-12">
          Results from SVJ-managed creator operations. Individual results vary.
        </p>
      </div>
    </section>
  )
}
