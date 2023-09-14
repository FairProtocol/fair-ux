import React from 'react'

import { Grid, Typography, useMediaQuery } from '@mui/material'
import { Container } from '@mui/system'
import './Footer.scss'

export const Footer: React.FC = () => {
  const isTablet = useMediaQuery('(max-width:640px) and (orientation: portrait)')

  return (
    <div className="root">
      <Container className="footer" maxWidth={false} sx={{ marginTop: '3em', marginBottom: '0em' }}>
        <div className="footer_root">
          <Grid className="footer_container" container spacing={0}>
            <Grid item xs={isTablet ? 12 : 5}>
              <Typography className="footer_container_title" color={'#FFFFFF'} fontSize="0.875rem">
                Decentralised
              </Typography>
              <Typography className="footer_heading" color={'#FFFFFF'} fontSize="3rem">
                Equal Access <br></br> for <span className="footer_heading_special">Everyone</span>
              </Typography>
              <Typography className="footer_container_text" color={'#FFFFFF'} fontSize="0.75rem">
                The go-to fundraising platform for your assets, offering users access to a safe,
                secure and egalitarian crowdfunding model
              </Typography>
            </Grid>
            <Grid item xs={isTablet ? 0 : 2}></Grid>
            <Grid item xs={isTablet ? 12 : 5}>
              <Typography
                className="footer_first"
                color={'#0DD36B'}
                fontSize="3rem"
                textAlign={'right'}
              >
                Multiple
              </Typography>
              <Typography
                className="footer_details_text"
                color={'#FFFFFF'}
                fontSize="0.75rem"
                textAlign={'right'}
              >
                EVM Chains
              </Typography>
              <Typography
                className="footer_details"
                color={'#0DD36B'}
                fontSize="3rem"
                textAlign={'right'}
              >
                Accessible
              </Typography>
              <Typography
                className="footer_details_text"
                color={'#FFFFFF'}
                fontSize="0.75rem"
                textAlign={'right'}
              >
                User Interface
              </Typography>
              <Typography
                className="footer_details"
                color={'#0DD36B'}
                fontSize="3rem"
                textAlign={'right'}
              >
                Transparent
              </Typography>
              <Typography
                className="footer_details_text"
                color={'#FFFFFF'}
                fontSize="0.75rem"
                textAlign={'right'}
              >
                Auctions
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}
