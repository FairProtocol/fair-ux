import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'

import { routes } from '../../../../components/navigation/Routes/constants'
import { useAllAuctionInfo } from '../../../../hooks/useAllAuctionInfos'
import { useAnalyticsEventTracker } from '../../../App'
import { OngoingInfoCard } from '../auction_info_card/OngoingInfoCard'
import './OngoingAuctions.scss'

export const OngoingAuctions: React.FC = () => {
  const eventTracker = useAnalyticsEventTracker('Ongoing Auctions')

  const allAuctions = useAllAuctionInfo()
  const navigate = useNavigate()

  const allAuctionsSorted = allAuctions?.sort((a, b) => {
    return b.endTimeTimestamp - a.endTimeTimestamp
  })

  const auctions = React.useMemo(
    () => allAuctionsSorted && allAuctionsSorted.slice(0, 4),
    [allAuctionsSorted],
  )

  const navigateToAllAuctions = React.useCallback(() => {
    eventTracker('All auctions', '')
    navigate(routes.auctionList.path)
  }, [navigate, eventTracker])

  return (
    <Container className="ongoing-auctions" maxWidth="xl">
      <div className="ongoing-auctions_root">
        <Typography className="ongoing-auctions_title" color={'#180B2D'} fontSize="0.875rem">
          Ongoing Auctions
        </Typography>
        <Grid className="ongoing-auctions_auctions" container>
          {auctions?.map((auction, index) => (
            <OngoingInfoCard auctionInfo={auction} key={index} />
          ))}
        </Grid>
        <div className="ongoing-auctions_more">
          <Button
            className="ongoing-auctions_more_button"
            onClick={navigateToAllAuctions}
            variant="outlined"
          >
            View More
          </Button>
        </div>
      </div>
    </Container>
  )
}
