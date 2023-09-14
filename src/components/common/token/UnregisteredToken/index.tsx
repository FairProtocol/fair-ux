import React from 'react'

import { Tooltip as ReactTooltip } from 'react-tooltip'

import { IconUnregistered } from './img/IconUnregistered'
import './index.scss'

interface Props {
  size: number
  symbol?: string
  style?: React.CSSProperties
}

export const UnregisteredToken: React.FC<Props> = (props) => {
  const { size, style, symbol, ...restProps } = props
  const timestamp = React.useMemo(() => Date.now(), [])
  const tooltipId = `tooltip_${symbol}_${size}_${timestamp}`
  const cuttedSymbol = (symbol || '').slice(0, 7)

  return (
    <div
      className="unregistered-token"
      data-for={tooltipId}
      data-html={true}
      data-multiline={true}
      data-tip={`<p><strong>Unregistered token (${symbol}):</strong> This token is unrecognized, and it could even be a fake version of an existing token.</p><p>Use it at your own risk. Caution is advised.`}
      style={{
        height: size,
        width: size,
        ...style,
      }}
      {...restProps}
    >
      <div
        className="unregistered-token_badge"
        style={{
          borderRadius: `${size * 0.07}px`,
          fontSize: `${size * 0.13}px`,
        }}
      >
        {cuttedSymbol}
      </div>
      <IconUnregistered className="unregistered-token_icon-unregistered" />
      <ReactTooltip className="customTooltip" delayHide={50} delayShow={250} id={tooltipId} />
    </div>
  )
}
