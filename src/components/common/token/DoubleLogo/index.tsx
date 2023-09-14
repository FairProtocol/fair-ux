import React from 'react'

import TokenLogo from '../TokenLogo'
import './index.scss'

interface DoubleTokenLogoProps {
  auctioningToken: { address: string; symbol: string }
  biddingToken: { address: string; symbol: string }
  className?: string
  size: number
}

const DoubleLogo: React.FC<DoubleTokenLogoProps> = (props) => {
  const { auctioningToken, biddingToken, className = '', size, ...restProps } = props

  return (
    <div className={`double-logo ${className}`} {...restProps}>
      <TokenLogo
        className="double-logo_higher-logo"
        size={size}
        style={{
          margin: `0 -${size / 3}px 0 0`,
        }}
        token={auctioningToken}
      />
      <TokenLogo className="double-logo_covered-logo" size={size} token={biddingToken} />
    </div>
  )
}

export default DoubleLogo
