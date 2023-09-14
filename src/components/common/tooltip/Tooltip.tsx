import React from 'react'

import TooltipIcon from '@mui/icons-material/HelpOutline'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import './Tooltip.scss'

interface Props {
  className?: string
  text: string
}

export const Tooltip: React.FC<Props> = (props) => {
  const { className, text, ...restProps } = props

  return (
    <>
      <span
        className={`wrapper tooltip_component ${className}`}
        data-tooltip-content={text}
        data-tooltip-id="my-tooltip"
        {...restProps}
      >
        <TooltipIcon className="tooltip_icon" />
      </span>
      <ReactTooltip id="my-tooltip" place="top" />
    </>
  )
}
