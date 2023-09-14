import { readContract } from 'wagmi/actions'

import EASY_AUCTION_ABI from '../constants/abis/easyAuction/easyAuction.json'
import { getEasyAuctionAddress } from '../utils/tools'

interface AuctionCounterParams {
  chainId: number
}

const auctionCounter = async ({ chainId }: AuctionCounterParams) => {
  const data = await readContract({
    address: getEasyAuctionAddress(chainId),
    abi: EASY_AUCTION_ABI,
    functionName: 'auctionCounter',
  })

  return data
}

export default auctionCounter
