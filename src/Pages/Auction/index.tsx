import React from 'react'
import { useLocation } from 'react-router-dom'

import { Grid } from '@mui/material'

import AuctionBody from './components/auction-body/AuctionBody'
import AuctionDetails from './components/auction_details/AuctionDetails'
import { useDerivedAuctionInfo } from '../../hooks/useDerivedAuctionInfo'
import { useDefaultsFromURLSearch } from '../../state/orderPlacement/hooks'
import { parseURL } from '../../utils/tools'
import './auction.scss'

const Auction: React.FC = () => {
  const { search } = useLocation()

  const auctionIdentifier = parseURL(search)
  const derivedAuctionInfo = useDerivedAuctionInfo(auctionIdentifier)
  useDefaultsFromURLSearch(search)

  return (
    <div className="auction" style={{ flexGrow: 1 }}>
      <Grid className="auction_container" container>
        <AuctionDetails />
        {!!derivedAuctionInfo && (
          <AuctionBody
            auctionIdentifier={auctionIdentifier}
            derivedAuctionInfo={derivedAuctionInfo}
          />
        )}
      </Grid>
    </div>
  )
}

export default Auction
