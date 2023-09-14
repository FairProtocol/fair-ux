import React from 'react'

import { useTokenListState } from '../../../../state/tokenList/hooks'
import { isAddress } from '../../../../utils/tools'
import { UnregisteredToken } from '../UnregisteredToken'
import './index.scss'

interface TokenLogoProps {
  className?: string
  token: { address: string; symbol?: string }
  size: number
  style?: React.CSSProperties
}

const TokenLogo: React.FC<TokenLogoProps> = (props) => {
  const { size, style = {}, token, ...restProps } = props
  const { address, symbol } = token
  const { tokens } = useTokenListState()
  const validToken = isAddress(address) && tokens
  const imageURL = validToken && tokens[address.toLowerCase()]

  return imageURL ? (
    <div
      className={`token-logo ${props.className}`}
      style={{
        borderWidth: size < 20 ? '1px' : '3px',
        height: size,
        width: size,
        ...style,
      }}
      {...restProps}
    >
      <img className="token-logo_image" src={imageURL} />
    </div>
  ) : (
    <UnregisteredToken size={size} style={style} symbol={symbol} {...restProps} />
  )
}

export default TokenLogo
