import React from 'react'
import { useLocation } from 'react-router-dom'

import { Grid, Typography } from '@mui/material'
import { ReactComponent as SpinningLoader } from 'src/assets/images/tail-spin.svg'

import AuctionBody from './components/auction-body/AuctionBody'
import AuctionDetails from './components/auction_details/AuctionDetails'
import { ZeroAddress } from '../../constants/config'
import { useDerivedAuctionInfo } from '../../hooks/useDerivedAuctionInfo'
import { useOnChainAuctionData } from '../../hooks/useOnChainAuctionData'
import { useDefaultsFromURLSearch } from '../../state/orderPlacement/hooks'
import { parseURL } from '../../utils/tools'
import './auction.scss'

const Auction: React.FC = () => {
  const { search } = useLocation()

  const auctionIdentifier = parseURL(search)
  const derivedAuctionInfo = useDerivedAuctionInfo(auctionIdentifier)

  const auctionData = useOnChainAuctionData(auctionIdentifier)
  useDefaultsFromURLSearch(search)
  const isIndexing = auctionData && !derivedAuctionInfo
  const isLoading = derivedAuctionInfo === null
  // @ts-ignore
  const invalidAuction = auctionData !== undefined && auctionData[0] === ZeroAddress

  return (
    <div className="auction" style={{ flexGrow: 1 }}>
      <Grid className="auction_container" container>
        {isLoading && (
          <Grid className="auction_loading" item>
            <SpinningLoader fill="#222" />
          </Grid>
        )}
        {invalidAuction && (
          <Grid className="auction_error">
            <Typography color="error" variant="h4">
              Auction ID: #{auctionIdentifier.auctionId}
            </Typography>
            <Typography>Invalid Auction ID. Please check the URL and try again!</Typography>
          </Grid>
        )}
        {isIndexing && !isLoading && !invalidAuction && (
          <Grid className="auction_error">
            <Typography variant="h4">Auction ID: #{auctionIdentifier.auctionId}</Typography>
            <Typography>Auction is indexing! Please try again in some time!</Typography>
          </Grid>
        )}
        {!isIndexing && !invalidAuction && (
          <>
            <AuctionDetails />
            {!!derivedAuctionInfo && (
              <AuctionBody
                auctionIdentifier={auctionIdentifier}
                derivedAuctionInfo={derivedAuctionInfo}
              />
            )}
          </>
        )}
      </Grid>
    </div>
  )
}

export default Auction
