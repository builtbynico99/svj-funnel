import Link from 'next/link'

const steps = [
  {
    num: '01',
    title: 'You Apply',
    description:
      'Fill out a short application. We review your channel, audience engagement, and current monetization setup. If we see the white space, we move forward.',
  },
  {
    num: '02',
    title: 'SVJ Builds the Machine',
    description:
      'We architect your entire monetization backend. Paid community, product positioning, funnel, automation, pricing strategy, retention system. You approve. We build. You stay in the spotlight.',
  },
  {
    num: '03',
    title: 'Revenue Starts',
    description:
      'Your first product goes live. Your audience converts. Revenue share kicks in. SVJ takes 30 to 40% of new product revenue. You keep the rest, forever. No upfront. No retainer. No risk.',
  },
]

export default function HowSVJWorks() {
  return (
    <section id="how-it-works" className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[32px] md:text-[48px] font-bold text-white text-center mb-16">
          How SVJ Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative bg-card border border-border rounded-xl p-10 overflow-hidden"
            >
              <span
                className="absolute top-4 right-6 text-[96px] font-extrabold pointer-events-none select-none leading-none"
                style={{ color: 'rgba(37, 99, 235, 0.08)' }}
              >
                {step.num}
              </span>
              <div className="relative z-10">
                <p className="text-sm font-bold text-accent tracking-widest">{step.num}</p>
                <h3 className="text-2xl font-bold text-white mt-2">{step.title}</h3>
                <p className="text-base text-muted leading-relaxed mt-4">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/apply"
            className="inline-block bg-white text-black font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition"
          >
            Apply to Partner
          </Link>
        </div>
      </div>
    </section>
  )
}
