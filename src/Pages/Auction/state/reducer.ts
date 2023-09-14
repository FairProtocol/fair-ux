import { createReducer } from '@reduxjs/toolkit'

import {
  priceInput,
  sellAmountInput,
  setDefaultsFromURLSearch,
  setNoDefaultNetworkId,
} from './actions'
import { parseURL } from '../../../utils/tools'

export interface OrderPlacementState {
  readonly chainId: number | undefined
  readonly price: string
  readonly sellAmount: string
  readonly showPriceInverted: boolean
}

const initialState: OrderPlacementState = {
  chainId: undefined,
  price: '-',
  sellAmount: '',
  showPriceInverted: false,
}

export default createReducer<OrderPlacementState>(initialState, (builder) =>
  builder
    .addCase(setDefaultsFromURLSearch, (_, { payload: { queryString } }) => {
      const { chainId } = parseURL(queryString)
      return {
        ...initialState,
        chainId,
      }
    })
    .addCase(setNoDefaultNetworkId, () => {
      return {
        ...initialState,
      }
    })
    .addCase(sellAmountInput, (state, { payload: { sellAmount } }) => {
      return {
        ...state,
        sellAmount,
      }
    })
    .addCase(priceInput, (state, { payload: { price } }) => {
      return {
        ...state,
        price,
      }
    }),
)
