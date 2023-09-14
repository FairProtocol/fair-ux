import { useMemo } from 'react'

import { useAccount, useNetwork } from 'wagmi'
import { prepareWriteContract, writeContract } from 'wagmi/actions'

import { encodeOrder } from './Order'
import { useGetUserId } from './useGetUserId'
import { additionalServiceApi } from '../api'
import DEPOSIT_AND_PLACE_ORDER_ABI from '../constants/abis/easyAuction/depositAndPlaceOrder.json'
import EASY_AUCTION_ABI from '../constants/abis/easyAuction/easyAuction.json'
import { useOrderPlacementState } from '../state/orderPlacement/hooks'
import { useOrderbookActionHandlers } from '../state/orderbook/hooks'
import { useOrderActionHandlers } from '../state/orders/hooks'
import { OrderStatus } from '../state/orders/reducer'
import { useTransactionAdder } from '../state/transactions/hooks'
import { AuctionIdentifier } from '../state/types'
import { Token } from '../utils/entities/token'
import { getLogger } from '../utils/logger'
import { abbreviation } from '../utils/numeral'
import { convertPriceIntoBuyAndSellAmount } from '../utils/prices'
import {
  getEasyAuctionAddress,
  getTokenDisplay,
  isTokenWETH,
  isTokenWMATIC,
  isTokenXDAI,
} from '../utils/tools'

const logger = getLogger('usePlaceOrderCallback')

// returns a function that will place an order, if the parameters are all valid
// and the user has approved the transfer of tokens
export function usePlaceOrderCallback(
  auctionIdentifer: AuctionIdentifier,
  signature: string | null,
  auctioningToken: Token | undefined,
  biddingToken: Token | undefined,
): null | (() => Promise<string>) {
  const { address: account, isConnected } = useAccount()
  const { chain } = useNetwork()
  const chainId = chain?.id

  const { auctionId } = auctionIdentifer

  const isXdaiWethOrMatic = getIsXdaiWethOrWmatic(biddingToken, chainId)

  const addTransaction = useTransactionAdder()
  const { onNewOrder } = useOrderActionHandlers()
  const { price: priceFromSwapState, sellAmount } = useOrderPlacementState()
  const { onNewBid } = useOrderbookActionHandlers()

  const price = priceFromSwapState.toString()

  const userId: Maybe<string> = useGetUserId(account == null ? undefined : account)

  return useMemo(() => {
    let previousOrder: string

    return async function onPlaceOrder() {
      if (!chainId || !isConnected || !account) {
        throw new Error('missing dependencies in onPlaceOrder callback')
      }

      const { buyAmountScaled, sellAmountScaled } = convertPriceIntoBuyAndSellAmount(
        auctioningToken,
        biddingToken,
        price,
        sellAmount,
      )

      if (sellAmountScaled === undefined || buyAmountScaled === undefined) {
        return 'Price was not correct.'
      }

      try {
        previousOrder = await additionalServiceApi.getPreviousOrder({
          networkId: chainId,
          auctionId,
          price,
          order: {
            buyAmount: buyAmountScaled,
            sellAmount: sellAmountScaled,
            userId: BigInt(0), // Todo: This could be optimized
          },
        })
      } catch (error) {
        logger.error(`Error trying to get previous order for auctionId ${auctionId}`)
      }

      const auctioningTokenDisplay = getTokenDisplay(auctioningToken, chainId)
      const biddingTokenDisplay = getTokenDisplay(biddingToken, chainId)
      const args = isXdaiWethOrMatic
        ? [auctionId, [buyAmountScaled.toString()], [previousOrder], signature ? signature : '0x']
        : [
            auctionId,
            [buyAmountScaled.toString()],
            [sellAmountScaled.toString()],
            [previousOrder],
            signature ? signature : '0x',
          ]

      const { request } = await prepareWriteContract({
        // @ts-ignore
        address: isXdaiWethOrMatic
          ? // @ts-ignore
            DEPOSIT_AND_PLACE_ORDER[chainId]
          : getEasyAuctionAddress(chainId),
        // @ts-ignore
        abi: isXdaiWethOrMatic ? DEPOSIT_AND_PLACE_ORDER_ABI : EASY_AUCTION_ABI,
        // @ts-ignore
        functionName: isXdaiWethOrMatic ? 'depositAndPlaceOrder' : 'placeSellOrders',
        // @ts-ignore
        args,
      })

      return writeContract(request)
        .then((response) => {
          addTransaction(response, {
            summary:
              'Sell ' +
              abbreviation(sellAmount) +
              ' ' +
              biddingTokenDisplay +
              ' for ' +
              abbreviation((parseFloat(sellAmount) / parseFloat(price)).toPrecision(4)) +
              ' ' +
              auctioningTokenDisplay,
          })
          const order = {
            buyAmount: buyAmountScaled,
            sellAmount: sellAmountScaled,
            userId: BigInt(parseInt(userId?.toString() || '0')), // If many people are placing orders, this might be incorrect
          }
          onNewOrder([
            {
              id: encodeOrder(order),
              sellAmount: parseFloat(sellAmount).toString(),
              price: price.toString(),
              status: OrderStatus.PENDING,
              chainId,
            },
          ])
          onNewBid({
            volume: parseFloat(sellAmount),
            price: parseFloat(price),
          })
          return response.hash
        })
        .catch((error) => {
          logger.error('Error writing transaction', error)
          throw error
        })
    }
  }, [
    isXdaiWethOrMatic,
    account,
    addTransaction,
    auctionId,
    auctioningToken,
    biddingToken,
    chainId,
    isConnected,
    onNewBid,
    onNewOrder,
    price,
    sellAmount,
    signature,
    userId,
  ])
}

export const getIsXdaiWethOrWmatic = (
  biddingToken: Token | undefined,
  chainId: number | undefined,
): boolean => {
  if (!chainId || !biddingToken) return false
  return (
    isTokenXDAI(biddingToken.address, chainId) ||
    isTokenWETH(biddingToken.address, chainId) ||
    isTokenWMATIC(biddingToken.address, chainId)
  )
}
