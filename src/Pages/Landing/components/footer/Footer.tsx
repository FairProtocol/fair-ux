import React from 'react'

import { Grid, Typography, useMediaQuery } from '@mui/material'
import { Container } from '@mui/system'
import './Footer.scss'

export const Footer: React.FC = () => {
  const isTablet = useMediaQuery('(max-width:640px) and (orientation: portrait)')

  return (
    <div className="root">
      <Container
        className="footer-landing"
        maxWidth={false}
        sx={{ marginTop: '3em', marginBottom: '0em' }}
      >
        <div className="footer-landing_root">
          <Grid className="footer-landing_container" container spacing={0}>
            <Grid item xs={isTablet ? 12 : 5}>
              <Typography
                className="footer-landing_container_title"
                color={'#FFFFFF'}
                fontSize="0.875rem"
              >
                Decentralised
              </Typography>
              <Typography className="footer-landing_heading" color={'#FFFFFF'} fontSize="3rem">
                Equal Access <br></br> for{' '}
                <span className="footer-landing_heading_special">Everyone</span>
              </Typography>
              <Typography
                className="footer-landing_container_text"
                color={'#FFFFFF'}
                fontSize="0.75rem"
              >
                The go-to fundraising platform for your assets, offering users access to a safe,
                secure and egalitarian crowdfunding model
              </Typography>
            </Grid>
            <Grid item xs={isTablet ? 0 : 2}></Grid>
            <Grid item xs={isTablet ? 12 : 5}>
              <Typography
                className="footer-landing_first"
                color={'#0DD36B'}
                fontSize="3rem"
                textAlign={'right'}
              >
                Multiple
              </Typography>
              <Typography
                className="footer-landing_details_text"
                color={'#FFFFFF'}
                fontSize="0.75rem"
                textAlign={'right'}
              >
                EVM Chains
              </Typography>
              <Typography
                className="footer-landing_details"
                color={'#0DD36B'}
                fontSize="3rem"
                textAlign={'right'}
              >
                Accessible
              </Typography>
              <Typography
                className="footer-landing_details_text"
                color={'#FFFFFF'}
                fontSize="0.75rem"
                textAlign={'right'}
              >
                User Interface
              </Typography>
              <Typography
                className="footer-landing_details"
                color={'#0DD36B'}
                fontSize="3rem"
                textAlign={'right'}
              >
                Transparent
              </Typography>
              <Typography
                className="footer-landing_details_text"
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
