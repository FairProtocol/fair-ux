import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { Grid, Typography } from '@mui/material'
import { ReactComponent as SpinningLoader } from 'src/assets/images/tail-spin.svg'

import { useDerivedAuctionInfo } from '../../../../hooks/useDerivedAuctionInfo'
import { useOrderbookDataCallback, useOrderbookState } from '../../../../state/orderbook/hooks'
import { AuctionIdentifier } from '../../../../state/types'
import { processOrderbookData } from '../../../../utils/orderbookPriceHelpers'
import { parseURL } from '../../../../utils/tools'
import AuctionGraph from '../auction-graph/AuctionGraph'
import Wrapper from '../wrapper/Wrapper'
import './Orderbook.scss'

interface OrderbookProps {
  auctionIdentifier: AuctionIdentifier
}

const Orderbook: React.FC<OrderbookProps> = ({ auctionIdentifier }) => {
  const derivedAuctionInfo = useDerivedAuctionInfo(auctionIdentifier)
  useOrderbookDataCallback(auctionIdentifier)
  const {
    asks,
    auctionId: orderbookAuctionId,
    bids,
    chainId: orderbookChainId,
    error,
    userOrderPrice,
    userOrderVolume,
  } = useOrderbookState()

  const location = useLocation()
  const { auctionId, chainId } = parseURL(location.search)

  const baseToken = derivedAuctionInfo?.auctioningToken
  const quoteToken = derivedAuctionInfo?.biddingToken

  const processedOrderbook = useMemo(() => {
    if (!baseToken || !quoteToken) return []
    const data = { bids, asks }
    return processOrderbookData({
      data,
      userOrder: {
        price: userOrderPrice,
        volume: userOrderVolume,
      },
      baseToken,
      quoteToken,
    })
  }, [asks, baseToken, bids, quoteToken, userOrderPrice, userOrderVolume])

  return (
    <Wrapper className="orderbook">
      <Typography className="orderbook_header">Orderbook</Typography>
      {orderbookAuctionId != auctionId ||
      chainId != orderbookChainId ||
      !baseToken ||
      !quoteToken ? (
        <Grid className="orderbook_loading" container>
          <SpinningLoader fill="#222" />
        </Grid>
      ) : error || !asks || asks.length === 0 ? (
        <p>Loading error</p>
      ) : (
        <AuctionGraph
          baseToken={baseToken}
          chainId={chainId}
          data={processedOrderbook}
          quoteToken={quoteToken}
        />
      )}
    </Wrapper>
  )
}

export default Orderbook
