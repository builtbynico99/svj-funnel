import type { Metadata } from 'next'
import FunnelClient from './FunnelClient'

export const metadata: Metadata = {
  title: 'The Creator Money Map — SVJ Media',
  description:
    'The exact monetization backend top creators use to turn content into recurring revenue. Free resource from SVJ Media.',
  openGraph: {
    title: 'The Creator Money Map — SVJ Media',
    description:
      'The exact monetization backend top creators use to turn content into recurring revenue. Free resource from SVJ Media.',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function FunnelPage() {
  return <FunnelClient />
}
