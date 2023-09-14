import { useCallback, useMemo } from 'react'

import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'

import { useGetClaimInfo } from './useClaimOrderCallback'
import EASY_AUCTION_ABI from '../constants/abis/easyAuction/easyAuction.json'
import { AuctionIdentifier } from '../state/types'
import { getEasyAuctionAddress } from '../utils/tools'

const useSettleAuction = (
  auctionIdentifier: AuctionIdentifier,
): [boolean, () => Promise<`0x${string}` | void>] => {
  const { auctionId, chainId } = auctionIdentifier
  const { claimInfo } = useGetClaimInfo(auctionIdentifier)

  const { error, refetch } = usePrepareContractWrite({
    // @ts-ignore
    address: getEasyAuctionAddress(chainId as ChainId),
    // @ts-ignore
    abi: EASY_AUCTION_ABI,
    // @ts-ignore
    functionName: 'claimFromParticipantOrder',
    // @ts-ignore
    args: [auctionId, claimInfo?.sellOrdersFormUser],
  })

  const { config } = usePrepareContractWrite({
    // @ts-ignore
    address: getEasyAuctionAddress(chainId as ChainId),
    // @ts-ignore
    abi: EASY_AUCTION_ABI,
    // @ts-ignore
    functionName: 'settleAuction',
    // @ts-ignore
    args: [auctionId],
  })

  const { writeAsync } = useContractWrite(config)

  const isSettled = useMemo(() => {
    if (!auctionId) return false

    if (error) return false

    return true
  }, [auctionId, error])

  const settle = useCallback(async (): Promise<`0x${string}` | void> => {
    if (!writeAsync) return

    return writeAsync()
      .then(async (response) => {
        await waitForTransaction({ hash: response.hash })

        refetch()

        return response.hash
      })
      .catch((error: Error) => {
        throw error
      })
  }, [refetch, writeAsync])

  return [isSettled, settle]
}

export default useSettleAuction
