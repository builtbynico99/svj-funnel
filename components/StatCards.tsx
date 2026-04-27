const stats = [
  {
    number: '500M+',
    label: 'Views Managed',
    description: 'Includes the Playboi Carti x Offset video that hit number 1 trending on X/Twitter.',
  },
  {
    number: '10+ Years',
    label: 'Inside Live Streaming Operations',
    description: 'At the highest level in the industry.',
  },
  {
    number: '< 1%',
    label: 'of Streamers Have This Infrastructure',
    description: 'That is the white space SVJ operates in.',
  },
]

export default function StatCards() {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-8 hover:border-accent/30 transition"
            >
              <p className="text-[56px] font-bold text-white leading-none">{stat.number}</p>
              <p className="text-lg font-semibold text-white mt-2">{stat.label}</p>
              <p className="text-[15px] text-muted mt-3 leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
