import { useTokenBalances } from './useTokenBalances'
import { TokenAmount } from '../../utils/entities/fractions/tokenAmount'
import { Token } from '../../utils/entities/token'

// get the balance for a single token/account combo
export function useTokenBalance(account?: string, token?: Token): TokenAmount | undefined {
  const tokenBalances = useTokenBalances(account, [token])
  if (!token) return
  return tokenBalances[token.address]
}
