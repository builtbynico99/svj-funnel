import Link from 'next/link'

const features = {
  academy: [
    'Meta Strategy Vault access',
    'Weekly Content Playbooks',
    'High Level Creator Network',
    'Live Q&A Sessions',
  ],
  blueprint: [
    'Full monetization architecture blueprint',
    'Community build and pricing framework',
    'Digital product positioning guide',
    'Funnel and automation playbook',
    'Retention and scaling system',
  ],
  community: [
    'Full paid community architecture and build',
    'Funnel and onboarding automation',
    'Pricing strategy and product positioning',
    'Ongoing management and optimization',
    'Monthly performance reporting',
  ],
  full: [
    'Everything in Community Build Partnership',
    'VIP insider program build and management',
    'Digital product library development',
    'Ceaz on live channel operations',
    'Full backend revenue architecture',
  ],
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 mt-6">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] text-white">
          <span className="text-accent mt-0.5 flex-shrink-0">&rarr;</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function PickYourLevel() {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[48px] font-bold text-white">Pick Your Level</h2>
          <p className="text-lg text-muted mt-4">
            Start free. Move when you&apos;re ready. SVJ works at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 - Academy */}
          <div className="bg-card border border-border rounded-xl p-8 flex flex-col h-full">
            <div>
              <span className="inline-block border border-border text-muted text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                COMMUNITY
              </span>
              <h3 className="text-[28px] font-bold text-white mt-4">SVJ Academy</h3>
              <p className="text-xl font-semibold text-accent mt-2">Free</p>
              <p className="text-[15px] text-muted leading-relaxed mt-4">
                The free layer. Get inside the systems SVJ actually builds for creators doing 50K to 2M. Daily playbooks, live sessions, and a network that doesn&apos;t waste your time.
              </p>
              <FeatureList items={features.academy} />
            </div>
            <div className="mt-auto pt-8">
              <Link
                href="/academy"
                className="block w-full text-center border border-white text-white font-semibold px-6 py-4 rounded-lg hover:bg-white hover:text-black transition"
              >
                Join The Academy
              </Link>
            </div>
          </div>

          {/* Card 2 - Blueprint */}
          <div
            className="rounded-xl p-8 flex flex-col h-full"
            style={{
              background: '#111111',
              border: '2px solid #2563EB',
              boxShadow: '0 0 0 4px rgba(37, 99, 235, 0.1)',
            }}
          >
            <div>
              <span className="inline-block bg-accent text-white text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                MOST POPULAR
              </span>
              <h3 className="text-[28px] font-bold text-white mt-4">The Creator Content to Cash Machine</h3>
              <p className="text-xl font-semibold text-accent mt-2">$97 One Time</p>
              <p className="text-[15px] text-muted leading-relaxed mt-4">
                The exact framework SVJ uses to build monetization infrastructure for streamers. Community architecture, product positioning, funnel logic, pricing strategy, retention playbook. Self paced. Yours forever.
              </p>
              <FeatureList items={features.blueprint} />
            </div>
            <div className="mt-auto pt-8">
              <a
                href="https://whop.com/svj-community/svj-media-30-day-blueprint/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-white text-black font-semibold px-6 py-4 rounded-lg hover:bg-gray-100 transition"
              >
                Get The Blueprint - $97
              </a>
            </div>
          </div>

          {/* Card 3 - Community Build Partnership */}
          <div className="bg-card border border-border rounded-xl p-8 flex flex-col h-full">
            <div>
              <span className="inline-block border border-border text-muted text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                PARTNERSHIP
              </span>
              <h3 className="text-[28px] font-bold text-white mt-4">Community Build Partnership</h3>
              <p className="text-xl font-semibold text-accent mt-2 leading-snug">
                Rev share only. SVJ takes 30 to 40% of new product revenue
              </p>
              <p className="text-[15px] text-muted leading-relaxed mt-4">
                SVJ builds your complete paid community from scratch. Funnel, automation, onboarding, pricing strategy, retention system. All done for you. You stream. We run the backend. Revenue share starts at your first paying member. Zero upfront. Zero retainer.
              </p>
              <FeatureList items={features.community} />
            </div>
            <div className="mt-auto pt-8">
              <Link
                href="/apply"
                className="block w-full text-center border border-white text-white font-semibold px-6 py-4 rounded-lg hover:bg-white hover:text-black transition"
              >
                Apply Now
              </Link>
            </div>
          </div>

          {/* Card 4 - Full Backend Partnership */}
          <div className="bg-card border border-border rounded-xl p-8 flex flex-col h-full">
            <div>
              <span className="inline-block border border-border text-muted text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                EXCLUSIVE
              </span>
              <h3 className="text-[28px] font-bold text-white mt-4">Full Backend Partnership</h3>
              <p className="text-xl font-semibold text-accent mt-2 leading-snug">
                Rev share only. SVJ takes 30 to 40% across all products built
              </p>
              <p className="text-[15px] text-muted leading-relaxed mt-4">
                Everything in Community Build plus a VIP insider program, digital product library, and Ceaz on live channel operations. Full stack. Creator just streams. SVJ owns the backend and runs the machine end to end.
              </p>
              <FeatureList items={features.full} />
            </div>
            <div className="mt-auto pt-8">
              <Link
                href="/apply"
                className="block w-full text-center border border-white text-white font-semibold px-6 py-4 rounded-lg hover:bg-white hover:text-black transition"
              >
                Apply for Access
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
