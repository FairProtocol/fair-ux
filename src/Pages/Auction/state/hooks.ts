import { useCallback, useEffect, useState } from 'react'

import { AuctionInfoDetail } from '../../../hooks/useAuctionDetails'
import { useOnChainAuctionData } from '../../../hooks/useOnChainAuctionData'
import { AuctionIdentifier, AuctionState } from '../../../state/types'
import { calculateTimeLeft, isTimeout } from '../../../utils/tools'

export function useDeriveAuctionState(
  auctionDetails: AuctionInfoDetail | null | undefined,
  auctionIdentifier: AuctionIdentifier,
): Maybe<AuctionState> {
  const [currentState, setCurrentState] = useState<Maybe<AuctionState>>(null)
  const { clearingPriceSellOrder } = useOnChainAuctionData({
    auctionId: auctionDetails?.auctionId ?? auctionIdentifier.auctionId,
    chainId: Number(auctionDetails?.chainId ?? auctionIdentifier?.chainId),
  })

  const getCurrentState = useCallback(() => {
    const auctioningTokenAddress: string | undefined = auctionDetails?.addressAuctioningToken
    let auctionState: Maybe<AuctionState> = null
    if (!auctioningTokenAddress) {
      auctionState = AuctionState.NOT_YET_STARTED
    } else {
      const auctionEndDate = auctionDetails?.endTimeTimestamp
      const orderCancellationEndDate = auctionDetails?.orderCancellationEndDate

      if (auctionEndDate && auctionEndDate > new Date().getTime() / 1000) {
        auctionState = AuctionState.ORDER_PLACING
        if (orderCancellationEndDate && orderCancellationEndDate >= new Date().getTime() / 1000) {
          auctionState = AuctionState.ORDER_PLACING_AND_CANCELING
        }
      } else {
        if (clearingPriceSellOrder?.buyAmount?.toSignificant(1) == '0') {
          auctionState = AuctionState.PRICE_SUBMISSION
        } else {
          auctionState = AuctionState.CLAIMING
        }
      }
    }

    return auctionState
  }, [auctionDetails, clearingPriceSellOrder])

  useEffect(() => {
    setCurrentState(getCurrentState())
  }, [auctionDetails, getCurrentState])

  useEffect(() => {
    if (!auctionDetails) {
      return
    }

    const timeLeftEndAuction = calculateTimeLeft(auctionDetails.endTimeTimestamp)
    const timeLeftCancellationOrder = calculateTimeLeft(
      auctionDetails.orderCancellationEndDate as number,
    )

    const updateStatusWhenTimeIsUp = (remainingAuctionTimes: Array<number>) => {
      const timersId = remainingAuctionTimes
        .map((timeLeft) => {
          if (timeLeft < 0) {
            return
          }
          return setTimeout(() => {
            setCurrentState(getCurrentState())
          }, timeLeft * 1000)
        })
        .filter(isTimeout)
      return timersId
    }
    const timerEventsId = updateStatusWhenTimeIsUp([timeLeftCancellationOrder, timeLeftEndAuction])

    return () => {
      timerEventsId.map((timerId) => clearTimeout(timerId))
    }
  }, [auctionDetails, getCurrentState])

  return currentState
}
