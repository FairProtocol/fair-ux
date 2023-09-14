import { useMemo } from 'react'

import { useAccount, useNetwork } from 'wagmi'
import { prepareWriteContract, writeContract } from 'wagmi/actions'

import { decodeOrder } from './Order'
import EASY_AUCTION_ABI from '../constants/abis/easyAuction/easyAuction.json'
import { useOrderActionHandlers } from '../state/orders/hooks'
import { useTransactionAdder } from '../state/transactions/hooks'
import { AuctionIdentifier } from '../state/types'
import { Fraction } from '../utils/entities/fractions/fraction'
import { Token } from '../utils/entities/token'
import { getLogger } from '../utils/logger'
import { NETWORK_CONFIGS } from '../utils/networkConfig'
import { abbreviation } from '../utils/numeral'
import { getEasyAuctionAddress } from '../utils/tools'

const logger = getLogger('useCancelOrderCallback')

export function useCancelOrderCallback(
  auctionIdentifier: AuctionIdentifier,
  biddingToken: Token | undefined,
): null | ((orderId: string) => Promise<string>) {
  const { address: account } = useAccount()
  const { chain } = useNetwork()
  const chainId = chain?.id
  const addTransaction = useTransactionAdder()
  const { onCancelOrder: actionCancelOrder } = useOrderActionHandlers()
  const { auctionId, chainId: orderChainId } = auctionIdentifier

  return useMemo(() => {
    return async function onCancelOrder(orderId: string) {
      if (!chainId || !account || !biddingToken?.decimals) {
        throw new Error('missing dependencies in onCancelOrder callback')
      }

      if (chainId !== orderChainId) {
        throw new Error(
          `In order to cancel this order, please connect to ${
            // @ts-ignore
            NETWORK_CONFIGS[Number(orderChainId)].name
          } network`,
        )
      }

      const decodedOrder = decodeOrder(orderId)

      const { request } = await prepareWriteContract({
        // @ts-ignore
        address: getEasyAuctionAddress(chainId || 1),
        // @ts-ignore
        abi: EASY_AUCTION_ABI,
        // @ts-ignore
        functionName: 'cancelSellOrders',
        // @ts-ignore
        args: [auctionId, [orderId]],
      })

      return writeContract(request)
        .then((response) => {
          addTransaction(response, {
            summary:
              'Cancel order selling ' +
              abbreviation(
                new Fraction(
                  decodedOrder.sellAmount.toString(),
                  BigInt(10 ** biddingToken.decimals).toString(),
                ).toSignificant(2),
              ) +
              ' ' +
              biddingToken.symbol,
          })
          actionCancelOrder(orderId)

          return response.hash
        })
        .catch((error) => {
          logger.error(`Cancelation or gas estimate failed`, error)
          throw error
        })
    }
  }, [
    chainId,
    account,
    auctionId,
    orderChainId,
    addTransaction,
    biddingToken?.decimals,
    biddingToken?.symbol,
    actionCancelOrder,
  ])
}
