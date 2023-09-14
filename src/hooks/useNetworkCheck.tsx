import { useAccount, useNetwork } from 'wagmi'

import { useOrderPlacementState } from '../state/orderPlacement/hooks'

export enum NetworkError {
  undefinedInjectedChainId = 1,
  undefinedChainId = 2,
  noChainMatch = 3,
  noError = 0,
}

export const useNetworkCheck = (): { errorWrongNetwork: NetworkError | undefined } => {
  const { address: account } = useAccount()
  const { chain } = useNetwork()
  const injectedChainId = chain?.id
  const { chainId } = useOrderPlacementState()

  const errorWrongNetwork =
    injectedChainId === undefined
      ? NetworkError.undefinedInjectedChainId
      : chainId === undefined
      ? NetworkError.undefinedChainId
      : chainId !== injectedChainId && !!account
      ? NetworkError.noChainMatch
      : NetworkError.noError

  return { errorWrongNetwork }
}
