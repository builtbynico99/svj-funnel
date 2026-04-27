export default function WhoWeAre() {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[32px] md:text-[48px] font-bold text-white mb-12">
          The Operators Behind The Empires
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-3 space-y-6">
            <p className="text-lg text-muted leading-[1.7]">We didn&apos;t build SVJ in a classroom.</p>
            <p className="text-lg text-muted leading-[1.7]">
              Ceaz has spent over a decade inside live streaming at the highest level. Running channel operations for Kai Cenat, Fanum, and some of the biggest names you watch right now. He knows what the machine looks like from the inside.
            </p>
            <p className="text-lg text-muted leading-[1.7]">
              Nico built the business architecture. The funnels, the monetization systems, the revenue infrastructure that converts streaming audiences into real, recurring income.
            </p>
            <p className="text-lg text-muted leading-[1.7]">
              We watched the biggest creators in the world leave millions on the table. Not because they didn&apos;t work hard. Because nobody had built the backend for them.
            </p>
            <p className="text-lg text-muted leading-[1.7]">SVJ exists to fix that. One creator at a time.</p>
          </div>

          <div className="md:col-span-2 flex items-center">
            <blockquote className="border-l-4 border-accent pl-6">
              <p className="text-2xl font-semibold text-white italic leading-snug">
                &quot;We stay in the shadows so you stay in the spotlight.&quot;
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
