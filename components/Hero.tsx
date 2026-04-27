export default function Hero() {
  return (
    <section className="w-full pt-24 pb-16 md:pt-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <h1 className="text-[44px] md:text-[72px] font-bold leading-[0.95] tracking-tight text-white">
            {"You're one partnership away from turning your audience into a "}
            <span className="text-accent underline decoration-2 underline-offset-4">
              revenue machine.
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-xl">
            Start with the $97 blueprint and build it yourself. Or apply to have SVJ build the entire backend for you on rev share.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
            <a
              href="https://whop.com/svj-community/svj-media-30-day-blueprint/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black font-semibold text-lg px-9 py-[18px] rounded-lg hover:bg-gray-100 transition whitespace-nowrap"
            >
              Get The Blueprint - $97
            </a>
            <a
              href="/apply"
              className="border border-white text-white font-semibold text-lg px-9 py-[18px] rounded-lg hover:bg-white hover:text-black transition whitespace-nowrap"
            >
              Apply to Partner
            </a>
          </div>

          <div className="mt-4">
            <a
              href="https://svj-hook-generator.vercel.app/generator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-white hover:underline transition"
            >
              Get the Free Hook Generator
            </a>
          </div>

          <p className="mt-6 text-sm text-muted">
            Zero upfront. Zero retainer. SVJ only wins when you win.
          </p>
        </div>
      </div>
    </section>
  )
}
