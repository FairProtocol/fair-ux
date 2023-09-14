import { useCallback, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import {
  appendBid,
  pullOrderbookData,
  removeBid,
  resetOrderbookData,
  resetUserPrice,
  resetUserVolume,
} from './actions'
import { AppDispatch, AppState } from '..'
import { additionalServiceApi } from '../../api'
import { OrderBookData, PricePoint } from '../../api/AdditionalServicesApi'
import { getLogger } from '../../utils/logger'
import { CalculatorClearingPrice } from '../../utils/orderbookPriceHelpers'
import { AuctionIdentifier } from '../types'

const logger = getLogger('orderbook/hooks')

export function useOrderbookState(): AppState['orderbook'] {
  return useSelector<AppState, AppState['orderbook']>((state) => state.orderbook)
}

export interface CalculatedAuctionPrice {
  price: number
}

export function useOrderbookActionHandlers(): {
  onNewBid: (order: PricePoint) => void
  onRemoveBid: (order: PricePoint) => void
  onPullOrderbookData: () => void
  onResetUserPrice: (price: number) => void
  onResetUserVolume: (volume: number) => void
  onResetOrderbookData: (
    auctionId: number,
    chainId: number,
    orderbook: OrderBookData,
    calculatedAuctionPrice: CalculatedAuctionPrice,
    error: Maybe<Error>,
  ) => void
} {
  const dispatch = useDispatch<AppDispatch>()

  const onNewBid = useCallback(
    (order: PricePoint) => {
      dispatch(appendBid({ order }))
    },
    [dispatch],
  )
  const onRemoveBid = useCallback(
    (order: PricePoint) => {
      dispatch(removeBid({ order }))
    },
    [dispatch],
  )
  const onPullOrderbookData = useCallback(() => {
    dispatch(pullOrderbookData())
  }, [dispatch])

  const onResetUserPrice = useCallback(
    (price: number) => {
      dispatch(resetUserPrice({ price }))
    },
    [dispatch],
  )
  const onResetUserVolume = useCallback(
    (volume: number) => {
      dispatch(resetUserVolume({ volume }))
    },
    [dispatch],
  )
  const onResetOrderbookData = useCallback(
    (
      auctionId: number,
      chainId: number,
      orderbook: OrderBookData,
      calculatedAuctionPrice: CalculatedAuctionPrice,
      error: Maybe<Error>,
    ) => {
      dispatch(resetOrderbookData({ auctionId, chainId, orderbook, calculatedAuctionPrice, error }))
    },
    [dispatch],
  )

  return {
    onPullOrderbookData,
    onResetOrderbookData,
    onNewBid,
    onRemoveBid,
    onResetUserPrice,
    onResetUserVolume,
  }
}
export function useOrderbookDataCallback(auctionIdentifer: AuctionIdentifier) {
  const { auctionId, chainId } = auctionIdentifer
  const { onResetOrderbookData } = useOrderbookActionHandlers()
  const { shouldLoad } = useOrderbookState()

  const makeCall = useCallback(async () => {
    try {
      if (!chainId || !auctionId) {
        return
      }
      const rawData = await additionalServiceApi.getOrderBookData({
        networkId: chainId,
        auctionId,
      })
      const calcultatedAuctionPrice: CalculatedAuctionPrice = CalculatorClearingPrice.fromOrderbook(
        rawData.bids,
        rawData.asks[0],
      )

      onResetOrderbookData(auctionId, chainId, rawData, calcultatedAuctionPrice, null)
    } catch (error) {
      logger.error('Error populating orderbook with data', error)
      onResetOrderbookData(auctionId, chainId, { bids: [], asks: [] }, { price: 0 }, null)
    }
  }, [chainId, auctionId, onResetOrderbookData])

  useEffect(() => {
    makeCall()
  }, [chainId, auctionId, onResetOrderbookData, makeCall])

  useEffect(() => {
    if (shouldLoad) {
      makeCall()
    }
  }, [shouldLoad, makeCall])
}
