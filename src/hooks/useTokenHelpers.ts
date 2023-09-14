import { useEffect, useMemo, useState } from 'react'

import { useNetwork } from 'wagmi'

import { ZeroAddress } from '../constants/config'
import { useAddUserToken, useFetchTokenByAddress, useUserAddedTokens } from '../state/user/hooks'
import { Token, WETH } from '../utils/entities/token'
import { isAddress } from '../utils/tools'

export function useAllTokens(): { [address: string]: Token } {
  const { chain } = useNetwork()
  const chainId = chain?.id

  const userAddedTokens = useUserAddedTokens()

  return useMemo(() => {
    if (!chainId) return {}
    // @ts-ignore
    const weth = WETH[chainId]
    if (weth) {
      // we have to replace it as a workaround because if it is automatically
      // fetched by address it will cause an invariant when used in constructing
      // pairs since we replace the name and symbol with 'ETH' and 'Ether'
      // @ts-ignore
      userAddedTokens[weth.address] = weth
    }
    return userAddedTokens
  }, [userAddedTokens, chainId])
}

export function useToken(tokenAddress?: string): Token | undefined {
  const tokens = useAllTokens()
  return useMemo(() => {
    const validatedAddress = isAddress(tokenAddress)
    if (!validatedAddress) return
    return tokens[validatedAddress]
  }, [tokens, tokenAddress])
}

// gets token information by address (typically user input) and
// automatically adds it for the user if the token address is valid
export function useTokenByAddressAndAutomaticallyAdd(tokenAddress?: string): {
  token: Token | undefined
  error: Maybe<Error>
  isLoading: boolean
} {
  const fetchTokenByAddress = useFetchTokenByAddress()
  const addToken = useAddUserToken()
  const token = useToken(tokenAddress)
  const { chain } = useNetwork()
  const chainId = chain?.id

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Maybe<Error>>(null)

  useEffect(() => {
    if (!chainId || !tokenAddress || !isAddress(tokenAddress)) return
    // @ts-ignore
    const weth = WETH[chainId]
    if (weth && weth.address === isAddress(tokenAddress)) return

    if (tokenAddress && tokenAddress != ZeroAddress && !token) {
      setIsLoading(true)
      fetchTokenByAddress(tokenAddress)
        .then((token: any) => {
          if (token !== null) {
            addToken(token)
          }
          setIsLoading(false)
        })
        .catch((error: any) => {
          setError(error)
          setIsLoading(false)
        })
    }
  }, [tokenAddress, token, fetchTokenByAddress, addToken, chainId])

  return {
    token,
    isLoading,
    error,
  }
}
