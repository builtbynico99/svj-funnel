export default function Marquee() {
  const text = 'TRUSTED BY CREATORS LIKE FANUM, KAI CENAT, CHRISTOOSMOOVE & MORE'

  return (
    <div
      className="w-full overflow-hidden h-12 flex items-center"
      style={{
        background: 'rgba(37, 99, 235, 0.08)',
        borderTop: '1px solid rgba(37, 99, 235, 0.2)',
        borderBottom: '1px solid rgba(37, 99, 235, 0.2)',
      }}
    >
      <div className="animate-marquee flex whitespace-nowrap">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="inline-block text-white text-xs font-bold tracking-widest uppercase mx-8"
          >
            {text} <span className="text-accent mx-4">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
