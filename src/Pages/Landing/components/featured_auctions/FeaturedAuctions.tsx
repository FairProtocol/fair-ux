import React, { HTMLAttributes } from 'react'

import { Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'

import { AuctionInfo } from '../../../../hooks/useAllAuctionInfos'
import { FeaturedInfoCard } from '../auction_info_card/FeaturedInfoCard'
import './FeaturedAuctions.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
  featuredAuctions: Maybe<AuctionInfo[]>
}

export const FeaturedAuctions: React.FC<Props> = (props) => {
  const { featuredAuctions } = props

  const auctions = React.useMemo(() => featuredAuctions?.slice(0, 4), [featuredAuctions])

  return (
    <div className="featuredAuctionsContainer">
      <Container className="featuredAuctions" maxWidth="xl">
        <div className="featuredAuctions_root">
          <Typography className="featuredAuctions_title" color={'#180B2D'} fontSize="0.875rem">
            Popular Auctions
          </Typography>
          <Grid className="featuredAuctions_auctions" container spacing={0}>
            {auctions?.map((auction, index) => (
              <FeaturedInfoCard auctionInfo={auction} key={index} />
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  )
}
