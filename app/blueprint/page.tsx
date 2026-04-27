import Nav from '@/components/Nav'
import Marquee from '@/components/Marquee'
import Footer from '@/components/Footer'
import Link from 'next/link'

const modules = [
  {
    num: '01',
    title: 'Full Monetization Architecture',
    description:
      'The exact blueprint we use to design backend systems for top creators. Map your existing audience to the products they will pay for, the price points that convert, and the funnel that turns followers into customers.',
  },
  {
    num: '02',
    title: 'Community Build And Pricing Framework',
    description:
      'How to architect a paid community from zero. Onboarding, member experience, retention loops, and the pricing psychology that makes creators leave Twitch subs and actually pay you direct.',
  },
  {
    num: '03',
    title: 'Digital Product Positioning Guide',
    description:
      'The five product categories that work for streamers. How to pick the one that fits your audience. The naming, positioning, and offer structure we use across every SVJ build.',
  },
  {
    num: '04',
    title: 'Funnel And Automation Playbook',
    description:
      'The full funnel stack. Lead magnets, email sequences, upsell logic, and the automation tools that keep it running while you stream. No tech background required.',
  },
  {
    num: '05',
    title: 'Retention And Scaling System',
    description:
      'Most creators lose 60% of paid members in the first 90 days. We give you the retention system that gets that number under 15%. Plus the scaling playbook for when revenue starts compounding.',
  },
]

const faqs = [
  {
    q: 'Is this a course?',
    a: 'No. The Blueprint is a self paced framework with the exact systems SVJ uses to build backend infrastructure for top streamers. You get the playbooks, the templates, the pricing logic, and the funnel structures. Not video lectures.',
  },
  {
    q: 'How long does it take to go through?',
    a: 'Most creators work through it in 30 days while still streaming full time. You can move faster or slower. There is no schedule and no expiration.',
  },
  {
    q: 'What do I need to already have?',
    a: 'An audience of 50K or more across any platform, a basic understanding of your viewers, and 30 days of focused work. No tech background required.',
  },
  {
    q: "What's the difference between this and the partnership tier?",
    a: 'The Blueprint gives you the framework to build it yourself. The partnership tier means SVJ builds the entire backend for you on rev share. The Blueprint is $97 one time. The partnership is application only with two spots a month.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'No refunds. The Blueprint is delivered immediately upon purchase. If you are not committed to building real backend infrastructure, do not buy it.',
  },
  {
    q: 'Do I get updates?',
    a: 'Yes. When SVJ updates the framework based on new builds, you get the updates for life at no extra cost.',
  },
]

export default function BlueprintPage() {
  return (
    <>
      <Nav />
      <Marquee />

      {/* Hero */}
      <section className="w-full py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-2 rounded"
            style={{ background: 'rgba(37,99,235,0.15)', color: '#2563EB' }}>
            THE CREATOR CONTENT TO CASH MACHINE
          </span>
          <h1 className="text-[36px] md:text-[56px] font-bold text-white leading-[1.1] mt-6">
            The exact backend SVJ builds for creators. Now{' '}
            <span className="text-accent">$97.</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed mt-6 max-w-2xl mx-auto">
            Community architecture. Product positioning. Funnel logic. Pricing strategy. Retention playbook. The same framework we use to build backend infrastructure for streamers doing 50K to 2M followers. Self paced. Yours forever.
          </p>
          <a
            href="https://whop.com/svj-community/svj-media-30-day-blueprint/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 bg-white text-black font-semibold text-lg px-10 py-[18px] rounded-lg hover:bg-gray-100 transition"
          >
            Get The Blueprint - $97
          </a>
          <p className="text-sm text-muted mt-4">One time payment. Lifetime access. No upsells.</p>
        </div>
      </section>

      {/* What's Inside */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[32px] md:text-[40px] font-bold text-white text-center mb-12">
            What&apos;s Inside The Blueprint
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.slice(0, 4).map((mod) => (
              <div key={mod.num} className="bg-card border border-border rounded-xl p-8">
                <p className="text-sm font-bold text-accent tracking-widest">{mod.num}</p>
                <h3 className="text-xl font-bold text-white mt-2">{mod.title}</h3>
                <p className="text-[15px] text-muted leading-relaxed mt-3">{mod.description}</p>
              </div>
            ))}
            <div className="md:col-span-2 bg-card border border-border rounded-xl p-8">
              <p className="text-sm font-bold text-accent tracking-widest">{modules[4].num}</p>
              <h3 className="text-xl font-bold text-white mt-2">{modules[4].title}</h3>
              <p className="text-[15px] text-muted leading-relaxed mt-3">{modules[4].description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-[32px] font-bold text-white">Who This Is For</h2>
              <p className="text-base text-muted leading-[1.7] mt-6">
                If you are a streamer or creator with 50K to 2M followers and you have never built backend infrastructure outside of platform revenue, this is for you. If you have brand deals coming in but no products of your own, this is for you. If you have a community on Discord but you have never monetized it, this is for you.
              </p>
            </div>
            <div>
              <h2 className="text-[32px] font-bold text-white">Who This Is Not For</h2>
              <p className="text-base text-muted leading-[1.7] mt-6">
                If you are looking for a get rich quick template, this is not for you. If you are not willing to put in 30 days of focused work, this is not for you. If your audience is mostly bots or low engagement followers, this is not for you. SVJ infrastructure works because of audience trust. No trust, no backend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-[32px] md:text-[40px] font-bold text-white text-center mb-12">
            Common Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-card border border-border rounded-xl px-8 py-6">
                <p className="text-lg font-semibold text-white">{faq.q}</p>
                <p className="text-[15px] text-muted leading-relaxed mt-3">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-[32px] md:text-[40px] font-bold text-white leading-snug">
            Stop leaving revenue on the table.
          </h2>
          <p className="text-lg text-muted mt-4">
            The same framework SVJ uses to build backend infrastructure for streamers doing millions in views. $97 one time. Lifetime access.
          </p>
          <a
            href="https://whop.com/svj-community/svj-media-30-day-blueprint/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-white text-black font-semibold text-xl px-12 py-5 rounded-lg hover:bg-gray-100 transition"
          >
            Get The Blueprint - $97
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
}
