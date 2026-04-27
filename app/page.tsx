// PLACEHOLDERS TO REPLACE BEFORE LAUNCH:
// YOUR-WHOP-LINK-HERE - Whop checkout link for Creator Content to Cash Machine
// YOUR-HOOK-GENERATOR-URL-HERE - Hook generator tool URL (popup CTA)
// YOUR-APPLICATION-LINK-HERE - Typeform or Tally application URL for partnership
// YOUR-DISCORD-INVITE-URL-HERE - Discord invite link for SVJ Academy free tier
// YOUR-YOUTUBE-VIDEO-ID - YouTube video ID for the Operator video embed
// G-288D43WQ22 - GA4 Measurement ID (already inserted in app/layout.tsx)

import Nav from '@/components/Nav'
import Marquee from '@/components/Marquee'
import Hero from '@/components/Hero'
import StatCards from '@/components/StatCards'
import Results from '@/components/Results'
import OperatorVideo from '@/components/OperatorVideo'
import CreatorCards from '@/components/CreatorCards'
import FollowerRichEquityPoor from '@/components/FollowerRichEquityPoor'
import HowSVJWorks from '@/components/HowSVJWorks'
import PickYourLevel from '@/components/PickYourLevel'
import WhoWeAre from '@/components/WhoWeAre'
import Footer from '@/components/Footer'
import Popup from '@/components/Popup'

export default function Home() {
  return (
    <>
      <Nav />
      <Marquee />
      <Hero />
      <StatCards />
      <Results />
      <OperatorVideo />
      <CreatorCards />
      <FollowerRichEquityPoor />
      <HowSVJWorks />
      <PickYourLevel />
      <WhoWeAre />
      <Footer />
      <Popup />
    </>
  )
}
