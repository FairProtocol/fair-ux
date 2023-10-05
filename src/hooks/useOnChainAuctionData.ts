import { useContractRead } from 'wagmi'

import { useTokenByAddressAndAutomaticallyAdd } from './useTokenHelpers'
import easyAuctionABI from '../constants/abis/easyAuction/easyAuction.json'
import { AuctionIdentifier, OnChainAuctionDataResult, SellOrder } from '../state/types'
import { decodeSellOrder } from '../utils/decodeSellOrder'
import { Token } from '../utils/entities/token'
import { getEasyAuctionAddress } from '../utils/tools'

export interface OnChainAuctionData
  extends Partial<
    Omit<OnChainAuctionDataResult, 'auctioningToken' | 'biddingToken' | 'clearingPriceOrder'>
  > {
  auctioningToken?: Maybe<Token>
  biddingToken?: Maybe<Token>
  clearingPriceSellOrder?: Maybe<SellOrder>
  isLoading: boolean
}

export function useOnChainAuctionData(auctionIdentifier: AuctionIdentifier): OnChainAuctionData {
  const { auctionId, chainId } = auctionIdentifier

  const { data: auctionInfo, isLoading: isLoadingAuctionInfo } = useContractRead<
    typeof easyAuctionABI,
    'auctionData',
    OnChainAuctionDataResult
  >({
    // @ts-ignore
    address: getEasyAuctionAddress(chainId),
    abi: easyAuctionABI,
    functionName: 'auctionData',
    args: [auctionId],
  })

  // @ts-ignore
  const auctioningTokenAddress: string | undefined = auctionInfo?.[0]

  // @ts-ignore
  const biddingTokenAddress: string | undefined = auctionInfo?.[1]

  const { isLoading: isAuctioningTokenLoading, token: auctioningToken } =
    useTokenByAddressAndAutomaticallyAdd(auctioningTokenAddress)
  const { isLoading: isBiddingTokenLoading, token: biddingToken } =
    useTokenByAddressAndAutomaticallyAdd(biddingTokenAddress)

  const clearingPriceSellOrder: Maybe<SellOrder> = decodeSellOrder(
    auctionInfo?.clearingPriceOrder,
    biddingToken,
    auctioningToken,
  )

  const isLoading = isLoadingAuctionInfo || isAuctioningTokenLoading || isBiddingTokenLoading

  if (isLoading) {
    return {
      auctioningToken,
      biddingToken,
      clearingPriceSellOrder,
      isLoading,
    }
  }

  if (auctionInfo) {
    return {
      ...auctionInfo,
      auctioningToken,
      biddingToken,
      clearingPriceSellOrder,
      isLoading,
    }
  }

  return {
    isLoading,
  }
}
