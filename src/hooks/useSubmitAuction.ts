import { useCallback } from 'react'

import dayjs from 'dayjs'
import { encodeAbiParameters, parseAbiParameters, parseUnits } from 'viem'
import { useAccount, useBalance, useContractRead, useNetwork } from 'wagmi'
import { prepareWriteContract, waitForTransaction, writeContract } from 'wagmi/actions'

import { useAuctionForm } from './useAuctionForm'
import { additionalServiceApi } from '../api'
import { ALLOW_LIST_OFF_CHAIN_MANAGED } from '../constants'
import EASY_AUCTION_ABI from '../constants/abis/easyAuction/easyAuction.json'
import ERC20_ABI from '../constants/abis/erc20.json'
import auctionCounter from '../contract-reads/auction-counter'
import { getLogger } from '../utils/logger'
import { ChainId } from '../utils/networkConfig'
import { getEasyAuctionAddress } from '../utils/tools'

const logger = getLogger('useSubmitAuction')

type ValuesToSend = [
  string,
  string,
  string,
  string,
  BigInt,
  BigInt,
  BigInt,
  BigInt,
  boolean,
  string,
  string,
]
export const useSubmitAuction = () => {
  const { address } = useAccount()
  const { getValues } = useAuctionForm()
  const { chain } = useNetwork()

  const chainId = chain?.id as number
  const { auctioningTokenAddress, biddingTokenAddress } = getValues()

  const {
    data: auctioningTokenData,
    isError: isErrorFetchingAuctionBalance,
    isFetching: isFetchingAuctionBalance,
  } = useBalance({
    // @ts-ignore
    address,
    // @ts-ignore
    token: auctioningTokenAddress,
    enabled: !!auctioningTokenAddress,
  })

  const {
    data: biddingTokenData,
    isError: isErrorFetchingBiddingBalance,
    isFetching: isFetchingBiddingBalance,
  } = useBalance({
    // @ts-ignore
    address,
    // @ts-ignore
    token: biddingTokenAddress,
    enabled: !!biddingTokenAddress,
  })

  const { data: allowance } = useContractRead({
    // @ts-ignore
    address: auctioningTokenAddress,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: [address, getEasyAuctionAddress(chainId)],
    watch: true,
    enabled: !!auctioningTokenAddress,
  })

  const initiateNewAuction = useCallback(async () => {
    const {
      allowListData,
      auctionEndDate,
      auctionedSellAmount: sellAmount,
      auctioningTokenAddress,
      biddingTokenAddress,
      description,
      discordUrl,
      isAtomicClosureAllowed,
      isWhiteListingProcessUsed,
      minBuyAmount,
      minimumBiddingAmountPerOrder: minBuyAmountPerOrder,
      minimumFundingThreshold: minFundingThreshold,
      orderCancellationEndDate,
      shortSummary,
      siteUrl,
      ticker,
      tokenName,
      twitterUrl,
    } = getValues()

    if (!address) return

    if (isErrorFetchingAuctionBalance || isErrorFetchingBiddingBalance) {
      logger.error('InitiateNewAuction called without tokens')
      return
    }

    if (!auctioningTokenData) {
      logger.error('AuctioningTokenData not found')
      return
    }

    if (!biddingTokenData) {
      logger.error('BiddingTokenData not found')
      return
    }

    if (allowance === undefined) {
      logger.error('Allowance not found')
      return
    }

    const minBuyAmountInAtoms = parseUnits(minBuyAmount as `${number}`, biddingTokenData.decimals)
    const minBuyAmountPerOrderInAtoms = parseUnits(
      minBuyAmountPerOrder as `${number}`,
      biddingTokenData?.decimals,
    )
    const minFundingThresholdInAtoms = parseUnits(
      minFundingThreshold as `${number}`,
      biddingTokenData?.decimals,
    )
    const sellAmountInAtoms = parseUnits(sellAmount as `${number}`, auctioningTokenData.decimals)

    const auctionEndDateDayjs = dayjs(auctionEndDate)
    const orderCancellationEndDateDayjs = dayjs(orderCancellationEndDate)

    if ((allowance as bigint) < sellAmountInAtoms) {
      const { request } = await prepareWriteContract({
        // @ts-ignore
        address: auctioningTokenAddress,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [getEasyAuctionAddress(chainId || 1), sellAmountInAtoms],
      })

      const response = await writeContract(request)

      const data = await waitForTransaction({
        hash: response.hash,
        timeout: 60_000, // 2 seconds
      })
      if (!data) {
        logger.error('Transaction failed')
        return
      }
    }

    if (!chainId) {
      logger.error('ChainId not found')
      return
    }
    const valuesToSend: ValuesToSend = [
      auctioningTokenAddress,
      biddingTokenAddress,
      orderCancellationEndDateDayjs.unix().toString(),
      auctionEndDateDayjs.unix().toString(),
      sellAmountInAtoms,
      minBuyAmountInAtoms,
      minBuyAmountPerOrderInAtoms,
      minFundingThresholdInAtoms,
      !!isAtomicClosureAllowed,
      isWhiteListingProcessUsed
        ? ALLOW_LIST_OFF_CHAIN_MANAGED[chainId as ChainId]
        : '0x0000000000000000000000000000000000000000',
      isWhiteListingProcessUsed
        ? // @ts-ignore
          encodeAbiParameters(parseAbiParameters('address'), [allowListData])
        : '0x',
    ]

    const { request } = await prepareWriteContract({
      address: getEasyAuctionAddress(chainId || 1),
      abi: EASY_AUCTION_ABI,
      functionName: 'initiateAuction',
      args: valuesToSend,
    })

    return writeContract(request)
      .then(async (response) => {
        // Wait for transaction to complete
        await waitForTransaction({ hash: response.hash })
        // Fetch auction counter value
        const latestAuctionId = await auctionCounter({ chainId })
        // Upload details to IPFS
        await additionalServiceApi.uploadAuctionInfo({
          address,
          chainId,
          auctionId: Number(latestAuctionId),
          auctionInfo: {
            tokenName,
            ticker,
            shortSummary,
            description,
            siteUrl,
            twitterUrl,
            discordUrl,
          },
        })
        return { hash: response.hash, auctionId: Number(latestAuctionId) }
      })
      .catch((error) => {
        logger.error(error)
      })
  }, [
    address,
    auctioningTokenData,
    biddingTokenData,
    allowance,
    chainId,
    isErrorFetchingAuctionBalance,
    isErrorFetchingBiddingBalance,
    getValues,
  ])

  return {
    isError: isErrorFetchingAuctionBalance || isErrorFetchingBiddingBalance,
    isLoading: isFetchingAuctionBalance || isFetchingBiddingBalance,
    initiateNewAuction,
  }
}
