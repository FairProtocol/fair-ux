import { Token } from './entities/token'
import { STABLE_TOKENS_FOR_INVERTED_CHARTS } from '../constants/config'
import { tryParseAmount } from '../state/orderPlacement/hooks'

export function convertPriceIntoBuyAndSellAmount(
  auctioningToken: Token | undefined,
  biddingToken: Token | undefined,
  price: string,
  sellAmount: string,
): {
  sellAmountScaled: bigint | undefined
  buyAmountScaled: bigint | undefined
} {
  if (auctioningToken == undefined || biddingToken == undefined) {
    return {
      sellAmountScaled: undefined,
      buyAmountScaled: undefined,
    }
  }
  const sellAmountScaled = tryParseAmount(sellAmount, biddingToken)
  if (sellAmountScaled == undefined) {
    return { sellAmountScaled: undefined, buyAmountScaled: undefined }
  }
  const inversePriceAdjustedBybiddingToken = tryParseAmount(price, biddingToken)
  if (inversePriceAdjustedBybiddingToken == undefined) {
    return { sellAmountScaled: undefined, buyAmountScaled: undefined }
  }
  const buyAmountScaled =
    (BigInt(sellAmountScaled.raw.toString()) * BigInt(10 ** auctioningToken.decimals)) /
    BigInt(inversePriceAdjustedBybiddingToken.raw.toString())
  return {
    sellAmountScaled: BigInt(sellAmountScaled.raw.toString()),
    buyAmountScaled,
  }
}

export function showChartsInverted(token: Token): boolean {
  return STABLE_TOKENS_FOR_INVERTED_CHARTS.includes(token.address)
}
