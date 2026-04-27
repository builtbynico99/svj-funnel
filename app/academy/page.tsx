import Nav from '@/components/Nav'
import Marquee from '@/components/Marquee'
import Footer from '@/components/Footer'

const cards = [
  {
    title: 'Meta Strategy Vault',
    description:
      'The same strategy breakdowns SVJ uses internally. New playbooks dropped weekly. Content angles, pricing experiments, retention systems we test on real creator builds.',
  },
  {
    title: 'Weekly Content Playbooks',
    description:
      'Hook frameworks, short form scripts, long form structures. The exact templates we use across SVJ-managed channels. Updated weekly based on what&apos;s actually working right now.',
  },
  {
    title: 'High Level Creator Network',
    description:
      'Real streamers and creators in the 50K to 2M range. No beginners. No spam. The network you actually want to be in.',
  },
  {
    title: 'Live Q&A Sessions',
    description:
      'Live calls with Ceaz and Nico. Bring your channel, your numbers, your questions. We give you direct feedback on your backend.',
  },
]

export default function AcademyPage() {
  return (
    <>
      <Nav />
      <Marquee />

      {/* Hero */}
      <section className="w-full py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block border border-border text-muted text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded">
            FREE. NO CREDIT CARD.
          </span>
          <h1 className="text-[36px] md:text-[56px] font-bold text-white leading-[1.1] mt-6">
            SVJ Academy. The free layer.
          </h1>
          <p className="text-lg text-muted leading-relaxed mt-6 max-w-2xl mx-auto">
            Get inside the systems SVJ actually builds for creators doing 50K to 2M. Daily playbooks, live sessions, and a network that doesn&apos;t waste your time.
          </p>
        </div>
      </section>

      {/* What's Inside */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[32px] md:text-[40px] font-bold text-white text-center mb-12">
            Inside The Academy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card) => (
              <div key={card.title} className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                <p
                  className="text-[15px] text-muted leading-relaxed mt-3"
                  dangerouslySetInnerHTML={{ __html: card.description }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discord CTA */}
      <section className="w-full py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-[32px] md:text-[40px] font-bold text-white">
            Join the Academy. Free.
          </h2>
          <p className="text-lg text-muted mt-4">
            Drop into the Discord. See what we are working on. Pull from the vault. Network with operators.
          </p>
          <a
            href="https://discord.gg/N9YWG262SD"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-white text-black font-semibold text-lg px-10 py-[18px] rounded-lg hover:bg-gray-100 transition"
          >
            Join The Discord
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
}
