import { ChainIcon, ConnectKitButton } from 'connectkit'
import { useNetwork } from 'wagmi'

import './index.scss'

interface NetworkSelectProps {
  className?: string
}

export const NetworkSelect: React.FC<NetworkSelectProps> = ({ className }) => {
  const { chain } = useNetwork()

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        return isConnected ? (
          <button className={`network-select-button network-selected ${className}`} onClick={show}>
            <div className="network-selected_icon">
              <ChainIcon id={chain?.id} />
            </div>
            {chain?.name}
          </button>
        ) : (
          <button className={`network-select-button ${className}`} onClick={show}>
            Connect
          </button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
