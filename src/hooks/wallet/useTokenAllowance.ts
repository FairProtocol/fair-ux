import { useMemo } from 'react'

import { useContractRead } from 'wagmi'

import ERC20_ABI from '../../constants/abis/erc20.json'
import { TokenAmount } from '../../utils/entities/fractions/tokenAmount'
import { Token } from '../../utils/entities/token'

export function useTokenAllowance(
  token?: Token,
  owner?: string,
  spender?: string,
): TokenAmount | undefined {
  const { data: allowance } = useContractRead({
    // @ts-ignore
    address: token?.address,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: [owner, spender],
    watch: true,
    enabled: !!token?.address,
  })

  return useMemo(
    () =>
      token && (allowance || allowance === BigInt(0))
        ? new TokenAmount(token, allowance.toString())
        : undefined,
    [token, allowance],
  )
}
