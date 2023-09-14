import React from 'react'

import { ExternalLinkIcon } from '../../../assets/icons/ExternalLink/external_link'
import './ExternalLink.scss'

interface Props {
  href: string
}

export const ExternalLink: React.FC<Props> = (props) => {
  const { href, ...restProps } = props

  return (
    <a className="external-link" href={href} rel="noreferrer" target="_blank" {...restProps}>
      <ExternalLinkIcon />
    </a>
  )
}
