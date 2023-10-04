import { Fragment, useState } from 'react'

import { Grid } from '@mui/material'

import { AuctionIdentifier, AuctionState, DerivedAuctionInfo } from '../../../../state/types'
import { useAnalyticsEventTracker } from '../../../App'
import AuctionInfo from '../auction-info/AuctionInfo'
import Claimer from '../claimer/Claimer'
import GeneralInfo from '../general-information/GeneralInfo'
import OrderPlacement from '../order-placement/OrderPlacement'
import Orderbook from '../orderbook/Orderbook'
import OrdersTable from '../orders-table/OrdersTable'
import TabSelection from '../tab_selection/TabSelection'

interface AuctionBodyProps {
  auctionIdentifier: AuctionIdentifier
  derivedAuctionInfo: DerivedAuctionInfo
}

const AuctionBody: React.FC<AuctionBodyProps> = ({ auctionIdentifier, derivedAuctionInfo }) => {
  const eventTracker = useAnalyticsEventTracker('Auction Details Tabs')

  const [tabValue, setTabValue] = useState(0)

  const { auctionState } = derivedAuctionInfo

  const handleTabChange = (tabValue: number) => {
    eventTracker('Tab value', tabValue.toString())
    setTabValue(tabValue)
  }

  return (
    <Fragment>
      <TabSelection handleChange={handleTabChange} value={tabValue} />
      {tabValue === 0 ? (
        <>
          <Grid container spacing={{ xs: 0, sm: 2 }}>
            <Grid item sm={8} xs={12}>
              <Orderbook auctionIdentifier={auctionIdentifier} />
            </Grid>
            <Grid item sm={4} xs={12}>
              {(auctionState === AuctionState.ORDER_PLACING ||
                auctionState === AuctionState.ORDER_PLACING_AND_CANCELING) && (
                <OrderPlacement
                  auctionIdentifier={auctionIdentifier}
                  derivedAuctionInfo={derivedAuctionInfo}
                />
              )}
              {(auctionState === AuctionState.CLAIMING ||
                auctionState === AuctionState.PRICE_SUBMISSION) && (
                <Claimer auctionIdentifier={auctionIdentifier} />
              )}
            </Grid>
          </Grid>
          <OrdersTable
            auctionIdentifier={auctionIdentifier}
            derivedAuctionInfo={derivedAuctionInfo}
          />
        </>
      ) : (
        <>
          <Grid container spacing={{ xs: 0, sm: 2 }}>
            <Grid item sm={8} xs={12}>
              <GeneralInfo auctionIdentifier={auctionIdentifier} />
            </Grid>
            <Grid item sm={4} xs={12}>
              <AuctionInfo
                auctionIdentifier={auctionIdentifier}
                derivedAuctionInfo={derivedAuctionInfo}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Fragment>
  )
}

export default AuctionBody
