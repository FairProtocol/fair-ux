import { useCallback, useMemo } from 'react'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useAccount, useNetwork } from 'wagmi'
import { fetchToken } from 'wagmi/actions'

import {
  SerializedToken,
  addSerializedToken,
  dismissTokenWarning,
  removeSerializedToken,
  updateUserDarkMode,
} from './actions'
import { Token } from '../../utils/entities/token'
import { isAddress } from '../../utils/tools'
import { AppDispatch, AppState } from '../index'

function serializeToken(token: Token): SerializedToken {
  return {
    chainId: token.chainId,
    address: token.address,
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name,
  }
}

function deserializeToken(serializedToken: SerializedToken): Token {
  return new Token(
    serializedToken.chainId,
    serializedToken.address,
    serializedToken.decimals,
    serializedToken.symbol,
    serializedToken.name,
  )
}

export function useIsDarkMode(): boolean {
  const { matchesDarkMode, userDarkMode } = useSelector<
    AppState,
    { userDarkMode: Maybe<boolean>; matchesDarkMode: boolean }
  >(
    ({ user: { matchesDarkMode, userDarkMode } }) => ({
      userDarkMode,
      matchesDarkMode,
    }),
    shallowEqual,
  )

  return userDarkMode === null ? matchesDarkMode : userDarkMode
}

export function useDarkModeManager(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>()
  const darkMode = useIsDarkMode()

  const toggleSetDarkMode = useCallback(() => {
    dispatch(updateUserDarkMode({ userDarkMode: !darkMode }))
  }, [darkMode, dispatch])

  return [darkMode, toggleSetDarkMode]
}

export function useFetchTokenByAddress(): (address: string) => Promise<Maybe<Token>> {
  const { chain } = useNetwork()
  const { isConnected } = useAccount()
  const chainId = chain?.id

  return useCallback(
    async (address: string): Promise<Maybe<Token>> => {
      if (!isConnected || !chainId) return null
      const validatedAddress = isAddress(address)
      if (!validatedAddress) return null
      const { decimals, name, symbol } = await fetchToken({
        // @ts-ignore
        address: validatedAddress,
      })

      if (decimals === null) {
        return null
      } else {
        return new Token(chainId, validatedAddress, decimals, symbol, name)
      }
    },
    [isConnected, chainId],
  )
}

export function useAddUserToken(): (token: Token) => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (token: Token) => {
      dispatch(addSerializedToken({ serializedToken: serializeToken(token) }))
    },
    [dispatch],
  )
}

export function useRemoveUserAddedToken(): (chainId: number, address: string) => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (chainId: number, address: string) => {
      dispatch(removeSerializedToken({ chainId, address }))
    },
    [dispatch],
  )
}

export function useUserAddedTokens(): Token[] {
  const { chain } = useNetwork()
  const chainId = chain?.id
  const serializedTokensMap = useSelector<AppState, AppState['user']['tokens']>(
    ({ user: { tokens } }) => tokens,
  )

  return useMemo(() => {
    if (!chainId) return []
    return Object.values(serializedTokensMap[chainId] ?? {}).map(deserializeToken)
  }, [serializedTokensMap, chainId])
}

/**
 * Returns whether a token warning has been dismissed and a callback to dismiss it,
 * iff it has not already been dismissed and is a valid token.
 */
export function useTokenWarningDismissal(
  chainId?: number,
  token?: Token,
): [boolean, null | (() => void)] {
  const dismissalState = useSelector<AppState, AppState['user']['dismissedTokenWarnings']>(
    (state) => state.user.dismissedTokenWarnings,
  )

  const dispatch = useDispatch<AppDispatch>()

  return useMemo(() => {
    if (!chainId || !token) return [false, null]

    const dismissed: boolean = dismissalState?.[chainId]?.[token.address] === true

    const callback = dismissed
      ? null
      : () => dispatch(dismissTokenWarning({ chainId, tokenAddress: token.address }))

    return [dismissed, callback]
  }, [chainId, token, dismissalState, dispatch])
}
