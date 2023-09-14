import React from 'react'

import './IconUnregistered.scss'

export const IconUnregistered: React.FC<{ className?: string }> = (props) => {
  return (
    <svg
      className={`icon-unregistered ${props.className}`}
      viewBox="0 0 74 74"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="#fff"
        stroke="#2B1759"
        strokeMiterlimit="10"
        strokeWidth="3px"
        transform="translate(2.5 7.535) translate(.5 -4.535)"
      >
        <circle cx="34" cy="34" r="34" stroke="none" />
        <circle cx="34" cy="34" fill="none" r="35.5" />
      </g>
      <text
        fill="#2B1759"
        fontFamily="Nunito-Sans-Bold, Averta ☞"
        fontSize="50px"
        fontWeight="700"
        transform="translate(2.5 7.535) translate(34.5 48.465)"
      >
        <tspan x="-11.707" y="0">
          ?
        </tspan>
      </text>
    </svg>
  )
}
