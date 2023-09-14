import { useCallback } from 'react'

import { Button, Typography } from '@mui/material'
import { useModal } from 'connectkit'
import { useAccount, useSwitchNetwork } from 'wagmi'

import { NetworkError, useNetworkCheck } from '../../../../hooks/useNetworkCheck'
import { useOrderPlacementState } from '../../../../state/orderPlacement/hooks'
import { NETWORK_CONFIGS } from '../../../../utils/networkConfig'
import './SettleAuctionButton.scss'

interface SettleAuctionButtonProps {
  disabled: boolean
  handleSettle: () => void
  isSettling: boolean
}

const SettleAuctionButton: React.FC<SettleAuctionButtonProps> = ({
  disabled,
  handleSettle,
  isSettling,
}) => {
  const { isConnected } = useAccount()
  const { setOpen } = useModal()
  const { errorWrongNetwork } = useNetworkCheck()
  const { switchNetwork } = useSwitchNetwork()
  const { chainId } = useOrderPlacementState()

  const openModal = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const trySwitchingNetworks = useCallback(async (): Promise<void> => {
    if (switchNetwork && chainId && errorWrongNetwork === NetworkError.noChainMatch)
      switchNetwork(chainId)
  }, [switchNetwork, chainId, errorWrongNetwork])

  return !isConnected ? (
    <Button className="settle-button" onClick={openModal} variant="contained">
      <Typography className="settle-button_text">Connect Wallet</Typography>
    </Button>
  ) : errorWrongNetwork === NetworkError.noChainMatch && chainId ? (
    <Button className="settle-button" onClick={trySwitchingNetworks} variant="contained">
      <Typography className="settle-button_text">
        {/* @ts-ignore */}
        Switch to {NETWORK_CONFIGS[chainId].name}
      </Typography>
    </Button>
  ) : (
    <>
      <Button
        className={`settle-button ${(disabled || isSettling) && 'settle-button_disabled'}`}
        disabled={disabled || isSettling}
        onClick={handleSettle}
        variant="contained"
      >
        <Typography className="settle-button_text">
          {!isSettling ? 'Settle Auction' : 'Settling...'}
        </Typography>
      </Button>
      {isSettling && (
        <Typography className="settle-button_subtext">
          Confirm the transaction in your wallet
        </Typography>
      )}
    </>
  )
}

export default SettleAuctionButton
