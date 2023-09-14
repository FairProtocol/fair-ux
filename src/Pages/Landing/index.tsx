import React from 'react'

import { FeaturedAuctions } from './components/featured_auctions/FeaturedAuctions'
import { Footer } from './components/footer/Footer'
import { Hero } from './components/hero/Hero'
import { OngoingAuctions } from './components/ongoing_auctions/OngoingAuctions'
import { useInterestingAuctionInfo } from '../../hooks/useInterestingAuctionDetails'

const Landing: React.FC = () => {
  const featuredAuctions = useInterestingAuctionInfo()

  return (
    <>
      <Hero />
      <FeaturedAuctions featuredAuctions={featuredAuctions} />
      <OngoingAuctions />
      <Footer />
    </>
  )
}

export default Landing
