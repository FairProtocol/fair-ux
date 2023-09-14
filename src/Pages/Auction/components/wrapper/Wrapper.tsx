import React from 'react'

import { Grid } from '@mui/material'

import './Wrapper.scss'

interface WrapperProps {
  children: React.ReactNode
  className?: string
}

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
  return (
    <Grid className={`auction-grid-wrapper ${className}`} container>
      {children}
    </Grid>
  )
}

export default Wrapper
