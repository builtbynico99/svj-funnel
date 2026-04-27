import Nav from '@/components/Nav'
import Marquee from '@/components/Marquee'
import Footer from '@/components/Footer'

const requirements = [
  {
    title: 'Audience Size',
    body: 'Combination of 50K to 2M followers across any combination of Twitch, YouTube, TikTok, Instagram, or X.',
  },
  {
    title: 'Engagement',
    body: 'Real engagement. Active comments. Strong share to view ratio. We do not work with bot audiences.',
  },
  {
    title: 'Stream Cadence',
    body: 'You stream consistently. Backend infrastructure works because the audience already trusts you on camera.',
  },
  {
    title: 'White Space',
    body: 'Your audience is currently not paying you directly outside of platform revenue and brand deals. That is the white space we build into.',
  },
]

export default function ApplyPage() {
  return (
    <>
      <Nav />
      <Marquee />

      {/* Hero */}
      <section className="w-full py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-2 rounded"
            style={{ background: 'rgba(37,99,235,0.15)', color: '#2563EB' }}
          >
            2 SPOTS PER MONTH. 1 ALREADY FILLED.
          </span>
          <h1 className="text-[36px] md:text-[56px] font-bold text-white leading-[1.1] mt-6">
            Apply to Partner with SVJ.
          </h1>
          <p className="text-lg text-muted leading-relaxed mt-6 max-w-2xl mx-auto">
            SVJ builds backend infrastructure for streamers with 50K to 2M followers on rev share. Zero upfront. Zero retainer. We only win when you win. Two new partnerships per month. One spot is already filled this month.
          </p>
        </div>
      </section>

      {/* Requirements */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[32px] md:text-[40px] font-bold text-white text-center mb-12">
            What We Look For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {requirements.map((req) => (
              <div key={req.title} className="bg-card border border-border rounded-xl p-7">
                <h3 className="text-xl font-bold text-white">{req.title}</h3>
                <p className="text-[15px] text-muted leading-relaxed mt-3">{req.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[32px] md:text-[40px] font-bold text-white">
              Submit Your Application
            </h2>
            <p className="text-base text-muted mt-4">
              If we see the white space, you&apos;ll hear from us within 72 hours.
            </p>
          </div>

          <div className="w-full max-w-3xl mx-auto h-[700px] rounded-xl overflow-hidden border border-border">
            <iframe
              src="https://forms.gle/ZQaZTmFXX5M9gzuB7"
              width="100%"
              height="100%"
              title="SVJ Partnership Application"
              className="border-0"
            />
          </div>

          <div className="text-center mt-8">
            <a
              href="https://forms.gle/ZQaZTmFXX5M9gzuB7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-black font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition"
            >
              Open Application in New Tab
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
