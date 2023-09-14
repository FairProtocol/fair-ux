import React from 'react'

import { Link } from '@mui/material'

import { ExternalLinkIcon } from '../../../assets/icons/ExternalLink/external_link'
import './TextLink.scss'

interface Props {
  href: string
  className?: string
  children: React.ReactNode | string
}

export const TextLink: React.FC<Props> = (props) => {
  const { children, className, href, ...restProps } = props

  return (
    <Link
      className={`text-link ${className}`}
      href={href}
      rel="noreferrer"
      target="_blank"
      {...restProps}
    >
      <>{children}</>
      <ExternalLinkIcon />
    </Link>
  )
}
