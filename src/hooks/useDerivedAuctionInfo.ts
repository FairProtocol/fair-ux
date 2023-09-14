import { useMemo } from 'react'

import { Order } from './Order'
import { useAuctionDetails } from './useAuctionDetails'
import { useClearingPriceInfo } from './useCurrentClearingOrderAndVolumeCallback'
import { useDeriveAuctionState } from '../Pages/Auction/state/hooks'
import { AuctionIdentifier, DerivedAuctionInfo, SellOrder } from '../state/types'
import { decodeSellOrder } from '../utils/decodeSellOrder'
import { Fraction } from '../utils/entities/fractions/fraction'
import { TokenAmount } from '../utils/entities/fractions/tokenAmount'
import { Token } from '../utils/entities/token'

const decodeSellOrderFromAPI = (
  sellAmount: bigint | undefined,
  buyAmount: bigint | undefined,
  soldToken: Token | undefined,
  boughtToken: Token | undefined,
): Maybe<SellOrder> => {
  if (!sellAmount || !buyAmount || !soldToken || !boughtToken) {
    return null
  }
  return {
    sellAmount: new TokenAmount(soldToken, sellAmount.toString()),
    buyAmount: new TokenAmount(boughtToken, buyAmount.toString()),
  }
}

export function orderToPrice(order: SellOrder | null | undefined): Fraction | undefined {
  if (
    !order ||
    order.buyAmount == undefined ||
    order.buyAmount.raw.toString() == '0' ||
    order.sellAmount == undefined
  ) {
    return undefined
  } else {
    return new Fraction(
      (
        BigInt(order.sellAmount.raw.toString()) *
        BigInt('10') ** BigInt(order.buyAmount.token.decimals)
      ).toString(),
      (
        BigInt(order.buyAmount.raw.toString()) *
        BigInt('10') ** BigInt(order.sellAmount.token.decimals)
      ).toString(),
    )
  }
}

export function useDerivedAuctionInfo(
  auctionIdentifier: AuctionIdentifier,
): Maybe<DerivedAuctionInfo> | undefined {
  const { chainId } = auctionIdentifier
  const { auctionDetails, auctionInfoLoading } = useAuctionDetails(auctionIdentifier)
  const { clearingPriceInfo, loadingClearingPrice } = useClearingPriceInfo(auctionIdentifier)

  const auctionState = useDeriveAuctionState(auctionDetails, auctionIdentifier)

  const isLoading = auctionInfoLoading || loadingClearingPrice
  const noAuctionData = !auctionDetails || !clearingPriceInfo

  const auctioningToken = useMemo(
    () =>
      !auctionDetails
        ? undefined
        : new Token(
            chainId,
            auctionDetails.addressAuctioningToken,
            parseInt(auctionDetails.decimalsAuctioningToken, 10),
            auctionDetails.symbolAuctioningToken,
          ),
    [auctionDetails, chainId],
  )

  const biddingToken = useMemo(
    () =>
      !auctionDetails
        ? undefined
        : new Token(
            chainId,
            auctionDetails.addressBiddingToken,
            parseInt(auctionDetails.decimalsBiddingToken, 10),
            auctionDetails.symbolBiddingToken,
          ),
    [auctionDetails, chainId],
  )

  const clearingPriceVolume = clearingPriceInfo?.volume

  const initialAuctionOrder: Maybe<SellOrder> = useMemo(
    () => decodeSellOrder(auctionDetails?.exactOrder, auctioningToken, biddingToken),
    [auctionDetails, auctioningToken, biddingToken],
  )

  const clearingPriceOrder: Order | undefined = clearingPriceInfo?.clearingOrder

  const clearingPriceSellOrder: Maybe<SellOrder> = useMemo(
    () =>
      decodeSellOrderFromAPI(
        clearingPriceOrder?.sellAmount,
        clearingPriceOrder?.buyAmount,
        biddingToken,
        auctioningToken,
      ),
    [clearingPriceOrder, biddingToken, auctioningToken],
  )

  const minBiddingAmountPerOrder = useMemo(
    () => BigInt(auctionDetails?.minimumBiddingAmountPerOrder ?? 0).toString(),
    [auctionDetails],
  )

  const clearingPrice: Fraction | undefined = useMemo(
    () => orderToPrice(clearingPriceSellOrder),
    [clearingPriceSellOrder],
  )

  const initialPrice = useMemo(() => {
    let initialPrice: Fraction | undefined
    if (initialAuctionOrder?.buyAmount == undefined) {
      initialPrice = undefined
    } else {
      initialPrice = new Fraction(
        (
          BigInt(initialAuctionOrder?.buyAmount?.raw.toString()) *
          BigInt('10') ** BigInt(initialAuctionOrder?.sellAmount?.token.decimals)
        ).toString(),
        (
          BigInt(initialAuctionOrder?.sellAmount?.raw.toString()) *
          BigInt('10') ** BigInt(initialAuctionOrder?.buyAmount?.token.decimals)
        ).toString(),
      )
    }
    return initialPrice
  }, [initialAuctionOrder])

  if (isLoading) {
    return null
  } else if (noAuctionData) {
    return undefined
  }

  return {
    auctioningToken,
    biddingToken,
    clearingPriceSellOrder,
    clearingPriceOrder,
    clearingPrice,
    initialAuctionOrder,
    auctionStartDate: auctionDetails?.startingTimestamp,
    auctionEndDate: auctionDetails?.endTimeTimestamp,
    clearingPriceVolume,
    initialPrice,
    minBiddingAmountPerOrder,
    orderCancellationEndDate: auctionDetails?.orderCancellationEndDate,
    auctionState,
  }
}
