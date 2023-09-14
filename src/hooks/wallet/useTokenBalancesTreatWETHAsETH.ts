import { useMemo } from 'react'

import { useBalance, useNetwork } from 'wagmi'

import { useTokenBalances } from './useTokenBalances'
import { TokenAmount } from '../../utils/entities/fractions/tokenAmount'
import { Token, WETH } from '../../utils/entities/token'

// contains the hacky logic to treat the WETH token input as if it's ETH to
// maintain compatibility until we handle them separately.
export function useTokenBalancesTreatWETHAsETH(
  address?: string,
  tokens?: (Token | undefined)[],
): { [tokenAddress: string]: TokenAmount | undefined } {
  const { chain } = useNetwork()
  const chainId = chain?.id
  const { includesWETH, tokensWithoutWETH } = useMemo(() => {
    if (!tokens || tokens.length === 0 || !chainId) {
      return { includesWETH: false, tokensWithoutWETH: [] }
    }
    let includesWETH = false
    const tokensWithoutWETH = tokens.filter((t) => {
      if (!chainId) return true
      const isWETH = (!!WETH[chainId] && t?.equals(WETH[chainId])) ?? false
      if (isWETH) includesWETH = true
      return !isWETH
    })
    return { includesWETH, tokensWithoutWETH }
  }, [tokens, chainId])

  const balancesWithoutWETH = useTokenBalances(address, tokensWithoutWETH)
  const ETHBalance = useBalance({
    //@ts-ignore
    address,
    enabled: includesWETH,
  })

  return useMemo(() => {
    if (!chainId || !address) return {}
    if (includesWETH && ETHBalance?.data) {
      const weth = WETH[chainId]
      const ethBalance = ETHBalance.data.value
      return {
        ...balancesWithoutWETH,
        ...(ethBalance && weth ? { [weth.address]: new TokenAmount(weth, ethBalance) } : null),
      }
    } else {
      return balancesWithoutWETH
    }
  }, [balancesWithoutWETH, ETHBalance, includesWETH, address, chainId])
}
