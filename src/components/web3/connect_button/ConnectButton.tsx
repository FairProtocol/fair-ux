import { useCallback, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { ChainIcon, ConnectKitButton } from 'connectkit'
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi'

import { ChevronRight } from '../../../assets/icons/chevron_right/ChevronRight'
import { NetworkError, useNetworkCheck } from '../../../hooks/useNetworkCheck'
import { useOrderPlacementState } from '../../../state/orderPlacement/hooks'
import { abbreviation } from '../../../utils/numeral'
import { elipsify } from '../../../utils/tools'
import './ConnectButton.scss'

export const ConnectButton = () => {
  const connectWallet = (show: () => void) => {
    show()
  }

  const location = useLocation()
  const { switchNetwork } = useSwitchNetwork()
  const { errorWrongNetwork } = useNetworkCheck()
  const { chainId } = useOrderPlacementState()
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { data } = useBalance({
    address,
  })

  const isAuctionPage = useMemo(() => location.pathname.includes('/auction'), [location.pathname])
  const chainMismatch = useMemo(
    () => errorWrongNetwork === NetworkError.noChainMatch && isAuctionPage,
    [errorWrongNetwork, isAuctionPage],
  )

  const trySwitchingNetworks = useCallback(async (): Promise<void> => {
    if (switchNetwork && chainId && chainMismatch) switchNetwork(chainId)
  }, [switchNetwork, chainMismatch, chainId])

  useEffect(() => {
    trySwitchingNetworks()
  }, [trySwitchingNetworks])

  return (
    <ConnectKitButton.Custom>
      {({ address, isConnected, show }) => {
        if (isConnected && chain && data) {
          return (
            <button
              className="connectbutton_connected"
              onClick={() => connectWallet(show as () => void)}
            >
              <div className="connectbutton_connected_address">
                <div className="connectbutton_connected_icon">
                  <ChainIcon id={chain?.id} />
                </div>
                <span>{elipsify(address as string, 4)}</span>
              </div>
              <span className="vertical_divider" />
              <div className="connectbutton_connected_balance">
                <span>
                  {abbreviation(data?.formatted, 6)} {data?.symbol}
                </span>
              </div>
            </button>
          )
        }
        return (
          <button className="connectbutton" onClick={() => connectWallet(show as () => void)}>
            <div className="connectbutton_root">
              Connect Wallet
              <ChevronRight />
            </div>
          </button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
