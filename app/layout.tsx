import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'SVJ Media | Backend Infrastructure for Streamers',
  description: 'SVJ Media builds the backend infrastructure that streamers with 50K to 2M followers are leaving on the table. Paid communities, VIP programs, digital product libraries. Rev share only.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-bg text-white font-sans antialiased`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
