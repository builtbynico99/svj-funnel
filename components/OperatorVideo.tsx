export default function OperatorVideo() {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-[32px] md:text-[48px] font-bold text-white">
            Hear It From The Operator
          </h2>
          <p className="text-lg text-muted mt-4 max-w-2xl mx-auto">
            Ceaz has run live channel operations for Kai Cenat, Fanum, and some of the biggest streamers alive. This is what it looks like from the inside.
          </p>
        </div>

        <div className="relative w-full max-w-[900px] mx-auto aspect-video rounded-xl overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/Jd3mXTwO6ck"
            title="Welcome to SVJ - Ceaz"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  )
}
