import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useAccount, useBlockNumber, useNetwork } from 'wagmi'
import { fetchTransaction, waitForTransaction } from 'wagmi/actions'

import { finalizeTransaction } from './actions'
import { getLogger } from '../../utils/logger'
import { useAddPopup } from '../application/hooks'
import { AppDispatch, AppState } from '../index'
import { pullOrderbookData } from '../orderbook/actions'
import { finalizeOrderCancellation, finalizeOrderPlacement } from '../orders/actions'

const logger = getLogger('transactions/updater')

export default function Updater() {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const chainId = chain?.id

  const lastBlockNumber = useBlockNumber({
    watch: true,
  })

  const dispatch = useDispatch<AppDispatch>()
  const transactions = useSelector<AppState, AppState['transactions']>(
    (state) => state.transactions,
  )

  // show popup on confirm
  const addPopup = useAddPopup()

  useEffect(() => {
    if (!chainId || !isConnected || !lastBlockNumber) return
    const allTransactions = transactions[chainId ?? -1] ?? {}

    Object.keys(allTransactions)
      .filter((hash) => !allTransactions[hash].receipt)
      .forEach((hash) => {
        fetchTransaction({
          // @ts-ignore
          hash,
        })
          .then((transactionResponse) => {
            const hash = transactionResponse.hash
            // @ts-ignore
            waitForTransaction({ hash }).then((receipt) => {
              if (receipt) {
                dispatch(
                  finalizeTransaction({
                    chainId,
                    hash,
                    receipt: {
                      blockHash: receipt.blockHash,
                      blockNumber: Number(receipt.blockNumber),
                      contractAddress: receipt.contractAddress,
                      from: receipt.from,
                      status: receipt.status,
                      to: receipt.to,
                      transactionHash: receipt.transactionHash,
                      transactionIndex: receipt.transactionIndex,
                    },
                  }),
                )
                dispatch(finalizeOrderCancellation())
                dispatch(finalizeOrderPlacement())
                dispatch(pullOrderbookData())
                // add success or failure popup
                if (receipt.status === 'success') {
                  addPopup({
                    txn: {
                      hash,
                      success: true,
                      summary: allTransactions[hash]?.summary,
                    },
                  })
                } else {
                  addPopup({
                    txn: {
                      hash,
                      success: false,
                      summary: allTransactions[hash]?.summary,
                    },
                  })
                }
              }
            })
          })
          .catch((error) => {
            logger.error(`failed to check transaction hash: ${hash}`, error)
          })
      })
  }, [chainId, isConnected, transactions, lastBlockNumber, dispatch, addPopup])

  return null
}
