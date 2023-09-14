import { useCallback, useEffect, useMemo, useState } from 'react'

import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'

import { additionalServiceApi } from './../api'
import { Order, decodeOrder } from './Order'
import { useAuctionDetails } from './useAuctionDetails'
import EASY_AUCTION_ABI from '../constants/abis/easyAuction/easyAuction.json'
import { DerivedAuctionInfo } from '../state/orderPlacement/hooks'
import { useHasPendingClaim, useTransactionAdder } from '../state/transactions/hooks'
import { AuctionIdentifier } from '../state/types'
import { TokenAmount } from '../utils/entities/fractions/tokenAmount'
import { Token } from '../utils/entities/token'
import { getEasyAuctionAddress } from '../utils/tools'

export interface AuctionProceedings {
  claimableBiddingToken: Maybe<TokenAmount>
  claimableAuctioningToken: Maybe<TokenAmount>
}

export interface ClaimInformation {
  sellOrdersFormUser: string[]
}

export interface UseGetClaimInfoReturn {
  claimInfo: Maybe<ClaimInformation>
  loading: boolean
  error: Maybe<Error>
}

export enum ClaimState {
  UNKNOWN,
  NOT_APPLICABLE,
  NOT_CLAIMED,
  PENDING,
  CLAIMED,
}

// returns the coded orders that participated in the auction for the current account
export const useGetClaimInfo = (auctionIdentifier: AuctionIdentifier): UseGetClaimInfoReturn => {
  const { address: account, isConnected } = useAccount()

  const [claimInfo, setClaimInfo] = useState<ClaimInformation>({ sellOrdersFormUser: [] })
  const [error, setError] = useState<Maybe<Error>>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { auctionId, chainId } = auctionIdentifier

  useEffect(() => {
    setClaimInfo({ sellOrdersFormUser: [] })
    setError(null)
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionId, chainId])

  useEffect(() => {
    let cancelled = false

    const fetchApiData = async (): Promise<void> => {
      try {
        if (!chainId || !isConnected || !account || !auctionId || !additionalServiceApi) return

        if (!cancelled) {
          setLoading(true)
        }

        const sellOrdersFormUser = await additionalServiceApi.getAllUserOrders({
          networkId: chainId,
          auctionId,
          user: account,
        })

        if (!cancelled) {
          setClaimInfo({ sellOrdersFormUser })
          setLoading(false)
        }
      } catch (error: any) {
        if (cancelled) return
        setError(error)
      }
    }
    fetchApiData()

    return (): void => {
      cancelled = true
    }
  }, [account, chainId, isConnected, auctionId, setClaimInfo])

  return {
    claimInfo,
    loading,
    error,
  }
}

interface getClaimableDataProps {
  auctioningToken: Token
  biddingToken: Token
  clearingPriceOrder: Order
  ordersFromUser: string[]
  minFundingThresholdNotReached: boolean
  clearingPriceVolume: bigint
}
export const getClaimableData = ({
  auctioningToken,
  biddingToken,
  clearingPriceOrder,
  clearingPriceVolume,
  minFundingThresholdNotReached,
  ordersFromUser,
}: getClaimableDataProps): Required<AuctionProceedings> => {
  let claimableAuctioningToken = new TokenAmount(auctioningToken, '0')
  let claimableBiddingToken = new TokenAmount(biddingToken, '0')

  // For each order from user add to claimable amounts (bidding or auctioning).
  for (const order of ordersFromUser) {
    const decodedOrder = decodeOrder(order)
    const { buyAmount, sellAmount, userId } = decodedOrder
    const {
      buyAmount: clearingBuyAmount,
      sellAmount: clearingSellAmount,
      userId: clearingUserId,
    } = clearingPriceOrder

    if (minFundingThresholdNotReached) {
      claimableBiddingToken = claimableBiddingToken.add(
        new TokenAmount(biddingToken, sellAmount.toString()),
      )
      // Order from the same user, buyAmount and sellAmount
    } else {
      if (
        buyAmount === clearingBuyAmount &&
        sellAmount === clearingSellAmount &&
        userId === clearingUserId
      ) {
        if (sellAmount - clearingPriceVolume > BigInt(0)) {
          claimableBiddingToken = claimableBiddingToken.add(
            new TokenAmount(biddingToken, (sellAmount - clearingPriceVolume).toString()),
          )
        }
        claimableAuctioningToken = claimableAuctioningToken.add(
          new TokenAmount(
            auctioningToken,
            (
              (clearingPriceVolume * clearingPriceOrder.buyAmount) /
              clearingPriceOrder.sellAmount
            ).toString(),
          ),
        )
      } else if (
        clearingPriceOrder.buyAmount * sellAmount <
        buyAmount * clearingPriceOrder.sellAmount
      ) {
        claimableBiddingToken = claimableBiddingToken.add(
          new TokenAmount(biddingToken, sellAmount.toString()),
        )
      } else {
        if (clearingPriceOrder.sellAmount > BigInt(0)) {
          claimableAuctioningToken = claimableAuctioningToken.add(
            new TokenAmount(
              auctioningToken,
              (
                (sellAmount * clearingPriceOrder.buyAmount) /
                clearingPriceOrder.sellAmount
              ).toString(),
            ),
          )
        }
      }
    }
  }

  return {
    claimableBiddingToken,
    claimableAuctioningToken,
  }
}

export const isMinFundingReached = (
  biddingToken: Token,
  currentBidding: string,
  minFundingThreshold: string,
) => {
  const minFundingThresholdAmount = new TokenAmount(biddingToken, minFundingThreshold)
  const currentBiddingAmount = new TokenAmount(biddingToken, currentBidding)

  return (
    minFundingThresholdAmount.lessThan(currentBiddingAmount) ||
    minFundingThresholdAmount.equalTo(currentBiddingAmount)
  )
}

export function useGetAuctionProceeds(
  auctionIdentifier: AuctionIdentifier,
  derivedAuctionInfo: DerivedAuctionInfo,
): AuctionProceedings {
  const { auctionDetails, auctionInfoLoading } = useAuctionDetails(auctionIdentifier)
  const { claimInfo } = useGetClaimInfo(auctionIdentifier)
  const {
    auctioningToken,
    biddingToken,
    clearingPriceOrder,
    clearingPriceSellOrder,
    clearingPriceVolume,
  } = derivedAuctionInfo

  return useMemo(() => {
    if (
      !claimInfo ||
      !biddingToken ||
      !auctioningToken ||
      !clearingPriceSellOrder ||
      !clearingPriceOrder ||
      !clearingPriceVolume ||
      auctionInfoLoading ||
      !auctionDetails
    ) {
      return {
        claimableBiddingToken: null,
        claimableAuctioningToken: null,
      }
    } else {
      return getClaimableData({
        auctioningToken,
        biddingToken,
        clearingPriceOrder,
        clearingPriceVolume,
        minFundingThresholdNotReached: !isMinFundingReached(
          biddingToken,
          auctionDetails.currentBiddingAmount,
          auctionDetails.minFundingThreshold,
        ),
        ordersFromUser: claimInfo.sellOrdersFormUser,
      })
    }
  }, [
    auctionDetails,
    auctionInfoLoading,
    auctioningToken,
    biddingToken,
    claimInfo,
    clearingPriceOrder,
    clearingPriceSellOrder,
    clearingPriceVolume,
  ])
}

export const useClaimOrderCallback = (
  auctionIdentifier: AuctionIdentifier,
): [ClaimState, () => Promise<string>] => {
  const { address: account } = useAccount()
  const addTransaction = useTransactionAdder()

  const { auctionId, chainId } = auctionIdentifier
  const { claimInfo, error } = useGetClaimInfo(auctionIdentifier)

  const { config } = usePrepareContractWrite({
    // @ts-ignore
    address: getEasyAuctionAddress(chainId as ChainId),
    // @ts-ignore
    abi: EASY_AUCTION_ABI,
    // @ts-ignore
    functionName: 'claimFromParticipantOrder',
    // @ts-ignore
    args: [auctionId, claimInfo?.sellOrdersFormUser],
  })

  const { writeAsync } = useContractWrite(config)

  const claimCallback = useCallback(async (): Promise<string> => {
    if (!chainId || !account || error || !claimInfo || !config || !writeAsync) {
      throw new Error('missing dependencies in onPlaceOrder callback')
    }

    const response = await writeAsync()

    addTransaction(response, {
      summary: `Claiming tokens auction-${auctionId}`,
    })
    return response.hash
  }, [account, addTransaction, chainId, error, auctionId, claimInfo, config, writeAsync])

  const claimableOrders = claimInfo?.sellOrdersFormUser
  const pendingClaim = useHasPendingClaim(auctionIdentifier.auctionId, account)
  const claimStatus = useGetClaimState(auctionIdentifier, claimableOrders, pendingClaim)

  return [claimStatus, claimCallback]
}

export function useGetClaimState(
  auctionIdentifier: AuctionIdentifier,
  claimableOrders?: string[],
  pendingClaim?: Boolean,
): ClaimState {
  const [claimStatus, setClaimStatus] = useState<ClaimState>(ClaimState.UNKNOWN)
  const { address: account } = useAccount()
  const { auctionId, chainId } = auctionIdentifier

  useEffect(() => {
    setClaimStatus(ClaimState.UNKNOWN)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionId, chainId, account])

  const { data: hasAvailableClaim } = useContractRead({
    // @ts-ignore
    address: getEasyAuctionAddress(chainId as ChainId),
    abi: EASY_AUCTION_ABI,
    enabled: !!account || !claimableOrders?.[0],
    functionName: 'containsOrder',
    args: [auctionId, claimableOrders?.[0]],
  })

  useEffect(() => {
    let cancelled = false

    if (!claimableOrders) return

    if (claimableOrders.length === 0) {
      setClaimStatus(ClaimState.NOT_APPLICABLE)
      return
    }

    if (!cancelled && hasAvailableClaim !== undefined) {
      setClaimStatus(
        hasAvailableClaim
          ? pendingClaim
            ? ClaimState.PENDING
            : ClaimState.NOT_CLAIMED
          : ClaimState.CLAIMED,
      )
    }

    return (): void => {
      cancelled = true
    }
  }, [account, auctionId, chainId, claimableOrders, pendingClaim, hasAvailableClaim])

  return claimStatus
}
