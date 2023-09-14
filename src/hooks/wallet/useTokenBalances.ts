import { useMemo } from 'react'

import { useContractReads } from 'wagmi'

import ERC20_ABI from '../../constants/abis/erc20.json'
import { TokenAmount } from '../../utils/entities/fractions/tokenAmount'
import { Token } from '../../utils/entities/token'
import { isAddress } from '../../utils/tools'

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalances(
  address?: string,
  tokens?: (Token | undefined)[],
): { [tokenAddress: string]: TokenAmount | undefined } {
  const validatedTokens: Token[] = useMemo(
    () => tokens?.filter((t?: Token): t is Token => isAddress(t?.address) !== false) ?? [],
    [tokens],
  )

  const validatedTokenAddresses = useMemo(
    () => validatedTokens.map((vt) => vt.address),
    [validatedTokens],
  )

  const { data: balances } = useContractReads({
    // @ts-ignore
    contracts: validatedTokenAddresses.map((validatedTokenAddress) => ({
      address: validatedTokenAddress,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [address],
    })),
  })

  return useMemo(
    () =>
      address && validatedTokens.length > 0
        ? validatedTokens.reduce<{
            [tokenAddress: string]: TokenAmount | undefined
          }>((memo, token, i) => {
            const value = balances?.[i]
            const amount =
              value?.result || value?.result === BigInt(0)
                ? BigInt(value.result.toString())
                : undefined
            if (amount) {
              memo[token.address] = new TokenAmount(token, amount)
            }
            return memo
          }, {})
        : {},
    [address, validatedTokens, balances],
  )
}
