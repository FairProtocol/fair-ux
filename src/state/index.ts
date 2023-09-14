import { configureStore } from '@reduxjs/toolkit'
import { load, save } from 'redux-localstorage-simple'

import application from './application/reducer'
import orderPlacement from './orderPlacement/reducer'
import orderbook from './orderbook/reducer'
import orders from './orders/reducer'
import tokenList from './tokenList/reducer'
import transactions from './transactions/reducer'
import user from './user/reducer'

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'tokenList']

const store = configureStore({
  reducer: {
    application,
    orderPlacement,
    orderbook,
    orders,
    tokenList,
    transactions,
    user,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    save({ states: PERSISTED_KEYS }),
  ],
  preloadedState: load({ states: PERSISTED_KEYS }),
})

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
