import { useCallback, useEffect, useMemo, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { parseUnits } from 'viem'
import { useAccount, useNetwork } from 'wagmi'

import {
  priceInput,
  sellAmountInput,
  setDefaultsFromURLSearch,
  setNoDefaultNetworkId,
} from './actions'
import { additionalServiceApi } from '../../api'
import { Order, decodeOrder } from '../../hooks/Order'
import { useAuctionDetails } from '../../hooks/useAuctionDetails'
import { ClaimState } from '../../hooks/useClaimOrderCallback'
import { useOnChainAuctionData } from '../../hooks/useOnChainAuctionData'
import { useTokenBalancesTreatWETHAsETH } from '../../hooks/wallet/useTokenBalancesTreatWETHAsETH'
import { Fraction } from '../../utils/entities/fractions/fraction'
import { TokenAmount } from '../../utils/entities/fractions/tokenAmount'
import { Token } from '../../utils/entities/token'
import { getLogger } from '../../utils/logger'
import { convertPriceIntoBuyAndSellAmount } from '../../utils/prices'
import { getFullTokenDisplay } from '../../utils/tools'
import { AppDispatch, AppState } from '../index'
import { resetUserPrice, resetUserVolume } from '../orderbook/actions'
import { useOrderActionHandlers } from '../orders/hooks'
import { OrderDisplay, OrderStatus } from '../orders/reducer'
import { AuctionIdentifier, AuctionState } from '../types'

const logger = getLogger('orderPlacement/hooks')

export interface SellOrder {
  sellAmount: TokenAmount
  buyAmount: TokenAmount
}

export interface AuctionDataResult {
  auctioningToken: string
  biddingToken: string
  clearingPriceOrder: string
  auctionEndDate: number
}

export function orderToSellOrder(
  order: Order | null | undefined,
  biddingToken: Token | undefined,
  auctioningToken: Token | undefined,
): SellOrder | undefined {
  if (!!order && biddingToken && auctioningToken) {
    return {
      sellAmount: new TokenAmount(biddingToken, order.sellAmount.toString()),
      buyAmount: new TokenAmount(auctioningToken, order.buyAmount.toString()),
    }
  } else {
    return undefined
  }
}

export function orderToPrice(order: SellOrder | null | undefined): Fraction | undefined {
  if (
    !order ||
    order.buyAmount == undefined ||
    order.buyAmount.raw.toString() == '0' ||
    order.sellAmount == undefined
  ) {
    return undefined
  } else {
    return new Fraction(
      (
        BigInt(order.sellAmount.raw.toString()) * BigInt(10 ** order.buyAmount.token.decimals)
      ).toString(),
      (
        BigInt(order.buyAmount.raw.toString()) * BigInt(10 ** order.sellAmount.token.decimals)
      ).toString(),
    )
  }
}

export function useOrderPlacementState(): AppState['orderPlacement'] {
  return useSelector<AppState, AppState['orderPlacement']>((state) => state.orderPlacement)
}

export function useSwapActionHandlers(): {
  onUserSellAmountInput: (sellAmount: string) => void
  onUserPriceInput: (price: string) => void
} {
  const dispatch = useDispatch<AppDispatch>()

  const onUserSellAmountInput = useCallback(
    (sellAmount: string) => {
      if (isNumeric(sellAmount)) dispatch(resetUserVolume({ volume: parseFloat(sellAmount) }))
      dispatch(sellAmountInput({ sellAmount }))
    },
    [dispatch],
  )

  const onUserPriceInput = useCallback(
    (price: string) => {
      if (isNumeric(price)) {
        dispatch(
          resetUserPrice({
            price: parseFloat(price),
          }),
        )
      }
      dispatch(priceInput({ price }))
    },
    [dispatch],
  )

  return { onUserPriceInput, onUserSellAmountInput }
}

function isNumeric(str: string) {
  return str != '' && str != '-'
}

export function tryParseAmount(value?: string, token?: Token): TokenAmount | undefined {
  if (!value || !token) {
    return
  }
  try {
    // @ts-ignore
    const sellAmountParsed = parseUnits(value, token.decimals).toString()
    if (sellAmountParsed !== '0') {
      return new TokenAmount(token, BigInt(sellAmountParsed))
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    logger.debug(`Failed to parse input amount: "${value}"`, error)
  }

  return
}

interface Errors {
  errorAmount: string | undefined
  errorPrice: string | undefined
}

export const useGetOrderPlacementError = (
  derivedAuctionInfo: DerivedAuctionInfo,
  auctionState: AuctionState,
  auctionIdentifier: AuctionIdentifier,
): Errors => {
  const { address: account } = useAccount()

  const { chainId } = auctionIdentifier
  const { price: priceFromState, sellAmount } = useOrderPlacementState()
  const price = priceFromState
  const relevantTokenBalances = useTokenBalancesTreatWETHAsETH(account ?? undefined, [
    derivedAuctionInfo?.biddingToken,
  ])
  const biddingTokenBalance =
    relevantTokenBalances?.[derivedAuctionInfo?.biddingToken?.address ?? '']
  const parsedBiddingAmount = tryParseAmount(sellAmount, derivedAuctionInfo?.biddingToken)
  const { buyAmountScaled, sellAmountScaled } = convertPriceIntoBuyAndSellAmount(
    derivedAuctionInfo?.auctioningToken,
    derivedAuctionInfo?.biddingToken,
    price === '-' ? '1' : price,
    sellAmount,
  )
  const [balanceIn, amountIn] = [biddingTokenBalance, parsedBiddingAmount]

  const amountMustBeBigger =
    amountIn &&
    price &&
    price !== '0' &&
    price !== '.' &&
    price !== 'Infinity' &&
    sellAmount &&
    ((sellAmountScaled &&
      BigInt(derivedAuctionInfo?.minBiddingAmountPerOrder || 0) >= sellAmountScaled) ||
      parseFloat(sellAmount) == 0) &&
    `Amount must be bigger than
      ${new Fraction(
        derivedAuctionInfo?.minBiddingAmountPerOrder || '0',
        BigInt(10 ** (derivedAuctionInfo?.biddingToken?.decimals || 0)).toString(),
      ).toSignificant(2)}`

  const invalidAmount = sellAmount && !amountIn && `Invalid Amount`
  const insufficientBalance =
    balanceIn &&
    amountIn &&
    balanceIn.lessThan(amountIn) &&
    `Insufficient ${getFullTokenDisplay(amountIn.token, chainId)}` + ' balance.'

  const messageHigherInitialPrice = `Price must be higher than ${derivedAuctionInfo?.initialPrice?.toSignificant(
    5,
  )}`
  const messageHigherClearingPrice = `Price must be higher than ${derivedAuctionInfo?.clearingPrice?.toSignificant(
    5,
  )}`

  const messageMinimunPrice = () =>
    auctionState === AuctionState.ORDER_PLACING
      ? messageHigherClearingPrice
      : messageHigherInitialPrice

  const priceEqualsZero =
    amountIn && price && (price === '0' || price === 'Infinity' || price === '.' || price === '0.')
      ? messageMinimunPrice()
      : undefined
  const invalidSellAmount =
    sellAmount && amountIn && price && !sellAmountScaled && `Invalid bidding price`
  const outOfBoundsPricePlacingOrder =
    amountIn &&
    price &&
    derivedAuctionInfo?.clearingPriceSellOrder !== null &&
    derivedAuctionInfo?.clearingPrice !== null &&
    derivedAuctionInfo?.auctioningToken !== undefined &&
    derivedAuctionInfo?.biddingToken !== undefined &&
    auctionState === AuctionState.ORDER_PLACING &&
    buyAmountScaled &&
    sellAmountScaled &&
    sellAmountScaled *
      BigInt(derivedAuctionInfo?.clearingPriceSellOrder?.buyAmount.raw.toString()) <=
      buyAmountScaled *
        BigInt(derivedAuctionInfo?.clearingPriceSellOrder?.sellAmount.raw.toString())
      ? messageHigherClearingPrice
      : undefined

  const outOfBoundsPrice =
    amountIn &&
    price &&
    derivedAuctionInfo?.initialAuctionOrder !== null &&
    derivedAuctionInfo?.auctioningToken !== undefined &&
    derivedAuctionInfo?.biddingToken !== undefined &&
    buyAmountScaled &&
    sellAmountScaled &&
    sellAmountScaled * BigInt(derivedAuctionInfo?.initialAuctionOrder?.sellAmount.raw.toString()) <=
      buyAmountScaled * BigInt(derivedAuctionInfo?.initialAuctionOrder?.buyAmount.raw.toString())
      ? messageHigherInitialPrice
      : undefined

  const errorAmount = amountMustBeBigger || insufficientBalance || invalidAmount || undefined
  const errorPrice =
    priceEqualsZero ||
    outOfBoundsPricePlacingOrder ||
    outOfBoundsPrice ||
    invalidSellAmount ||
    undefined

  return {
    errorAmount,
    errorPrice,
  }
}

export function useDeriveAuctioningAndBiddingToken(auctionIdentifer: AuctionIdentifier): {
  auctioningToken: Token | undefined
  biddingToken: Token | undefined
} {
  const { chainId } = auctionIdentifer
  const { auctionDetails } = useAuctionDetails(auctionIdentifer)

  const auctioningToken = useMemo(
    () =>
      chainId == undefined || !auctionDetails
        ? undefined
        : new Token(
            chainId,
            auctionDetails.addressAuctioningToken,
            parseInt(auctionDetails.decimalsAuctioningToken, 10),
            auctionDetails.symbolAuctioningToken,
          ),
    [chainId, auctionDetails],
  )

  const biddingToken = useMemo(
    () =>
      chainId == undefined || !auctionDetails
        ? undefined
        : new Token(
            chainId,
            auctionDetails.addressBiddingToken,
            parseInt(auctionDetails.decimalsBiddingToken, 10),
            auctionDetails.symbolBiddingToken,
          ),
    [chainId, auctionDetails],
  )

  return {
    auctioningToken,
    biddingToken,
  }
}

export interface DerivedAuctionInfo {
  auctioningToken: Token | undefined
  biddingToken: Token | undefined
  clearingPriceSellOrder: Maybe<SellOrder>
  clearingPriceOrder: Order | undefined
  clearingPrice: Fraction | undefined
  initialAuctionOrder: Maybe<SellOrder>
  auctionEndDate: number | undefined
  auctionStartDate: number | undefined
  clearingPriceVolume: bigint | undefined
  initialPrice: Fraction | undefined
  minBiddingAmountPerOrder: string | undefined
  orderCancellationEndDate: number | undefined
  auctionState: AuctionState | null | undefined
}

export function useDerivedClaimInfo(
  auctionIdentifier: AuctionIdentifier,
  claimStatus: ClaimState,
): {
  auctioningToken?: Maybe<Token>
  biddingToken?: Maybe<Token>
  error?: string | undefined
  isLoading: boolean
} {
  const {
    auctioningToken,
    biddingToken,
    clearingPriceSellOrder,
    isLoading: isAuctionDataLoading,
  } = useOnChainAuctionData(auctionIdentifier)

  const error =
    clearingPriceSellOrder?.buyAmount?.raw?.toString() === '0'
      ? 'Waiting for on-chain price calculation.'
      : claimStatus === ClaimState.CLAIMED
      ? 'You already claimed your funds.'
      : claimStatus === ClaimState.NOT_APPLICABLE
      ? 'You had no participation on this auction.'
      : ''

  const isLoading = isAuctionDataLoading || claimStatus === ClaimState.UNKNOWN

  return {
    auctioningToken,
    biddingToken,
    error,
    isLoading,
  }
}

// updates the swap state to use the defaults for a given network whenever the query
// string updates
export function useDefaultsFromURLSearch(search: string) {
  const { chain } = useNetwork()
  const chainId = chain?.id
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if (!chainId) return
    dispatch(setDefaultsFromURLSearch({ queryString: search }))
  }, [dispatch, search, chainId])
}

// updates the swap state to use the defaults for a given network whenever the query
// string updates
export function useSetNoDefaultNetworkId() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(setNoDefaultNetworkId())
  }, [dispatch])
}

export function useAllUserOrders(
  auctionIdentifier: AuctionIdentifier,
  derivedAuctionInfo: DerivedAuctionInfo,
) {
  const { address: account } = useAccount()
  const { auctionId, chainId } = auctionIdentifier
  const { onResetOrder } = useOrderActionHandlers()
  const {
    current: { auctioningToken, biddingToken },
  } = useRef(derivedAuctionInfo)

  useEffect(() => {
    let cancelled = false
    async function fetchData() {
      if (!chainId || !account || !biddingToken || !auctioningToken) {
        return
      }

      let sellOrdersFormUser: string[] = []

      try {
        sellOrdersFormUser = await additionalServiceApi.getAllUserOrders({
          networkId: chainId,
          auctionId,
          user: account,
        })
      } catch (error) {
        logger.error('Error getting current orders: ', error)
      }

      const sellOrderDisplays: OrderDisplay[] = []
      for (const orderString of sellOrdersFormUser) {
        const order = decodeOrder(orderString)

        // in some of the orders the buyAmount field is zero
        if (order.buyAmount === BigInt(0)) {
          logger.error(`Order buyAmount shouldn't be zero`)
          continue
        }

        sellOrderDisplays.push({
          id: orderString,
          sellAmount: new Fraction(
            order.sellAmount.toString(),
            BigInt(10 ** biddingToken.decimals).toString(),
          ).toSignificant(6),
          price: new Fraction(
            (order.sellAmount * BigInt(10 ** auctioningToken.decimals)).toString(),
            (order.buyAmount * BigInt(10 ** biddingToken.decimals)).toString(),
          ).toSignificant(6),
          chainId,
          status: OrderStatus.PLACED,
        })
      }
      if (!cancelled) onResetOrder(sellOrderDisplays)
    }
    fetchData()
    return (): void => {
      cancelled = true
    }
  }, [chainId, account, auctionId, onResetOrder, auctioningToken, biddingToken])
}
