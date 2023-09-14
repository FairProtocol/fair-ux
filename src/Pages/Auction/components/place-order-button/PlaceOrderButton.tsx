import { useCallback } from 'react'

import { Button, Typography } from '@mui/material'
import { useModal } from 'connectkit'
import { useAccount, useSwitchNetwork } from 'wagmi'

import { NetworkError, useNetworkCheck } from '../../../../hooks/useNetworkCheck'
import './PlaceOrderButton.scss'
import { useOrderPlacementState } from '../../../../state/orderPlacement/hooks'
import { NETWORK_CONFIGS } from '../../../../utils/networkConfig'

interface PlaceOrderButtonProps {
  disabled: boolean
  handleShowConfirm: () => void
}

const PlaceOrderButton: React.FC<PlaceOrderButtonProps> = ({ disabled, handleShowConfirm }) => {
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
    <Button className="place-order-button" onClick={openModal} variant="contained">
      <Typography className="place-order-button_text">Connect Wallet</Typography>
    </Button>
  ) : errorWrongNetwork === NetworkError.noChainMatch && chainId ? (
    <Button className="place-order-button" onClick={trySwitchingNetworks} variant="contained">
      <Typography className="place-order-button_text">
        {/* @ts-ignore */}
        Switch to {NETWORK_CONFIGS[chainId].name}
      </Typography>
    </Button>
  ) : (
    <Button
      className={`place-order-button ${disabled && 'place-order-button_disabled'}`}
      disabled={disabled}
      onClick={handleShowConfirm}
      variant="contained"
    >
      <Typography className="place-order-button_text">Place order</Typography>
    </Button>
  )
}

export default PlaceOrderButton
