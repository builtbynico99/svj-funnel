import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="text-3xl font-bold tracking-tight text-white">
            SVJ<span className="text-accent">.</span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/academy" className="text-sm text-muted hover:text-white transition">
              SVJ Academy
            </Link>
            <div className="w-px h-4 bg-border" />
            <Link href="/#how-it-works" className="text-sm text-muted hover:text-white transition">
              How It Works
            </Link>
            <div className="w-px h-4 bg-border" />
            <Link href="/blueprint" className="text-sm text-muted hover:text-white transition">
              The Blueprint
            </Link>
            <div className="w-px h-4 bg-border" />
            <Link href="/apply" className="text-sm text-muted hover:text-white transition">
              Apply to Partner
            </Link>
          </div>

          <p className="text-sm text-muted text-center md:text-right">
            Built for streamers. Run by operators. &copy; 2026 SVJ Media.
          </p>
        </div>
      </div>
    </footer>
  )
}
