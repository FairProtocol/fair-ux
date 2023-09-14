import React from 'react'
import { Link } from 'react-router-dom'

import { Grid, useMediaQuery } from '@mui/material'
import { Container } from '@mui/system'
import Logo from 'src/assets/images/logo.svg'

import { NavBarLink } from '../NavBarLink/NavBarLink'
import { routes } from '../Routes/constants'

import './Footer.scss'

export const Footer: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:480px)')

  return (
    <div className="root" style={{ paddingTop: '2em' }}>
      <Container className="footer footer_bottom" maxWidth="xl">
        <div className="footer_image_container">
          <Link to="/start">
            <img src={Logo} />
          </Link>
        </div>
        {isMobile ? (
          <Grid
            alignItems="center"
            className="footer_button_container_mobile"
            container
            justifyContent="center"
            spacing={0}
          >
            <Grid item xs={5.5}>
              <NavBarLink name="Auction" path={routes.auctionList.path}></NavBarLink>
            </Grid>
            <Grid item xs={5.5}>
              <NavBarLink name="Resources" path={routes.docs.path}></NavBarLink>
            </Grid>
            <Grid item xs={5.5}>
              <NavBarLink name="T&C" path={routes.tc.path}></NavBarLink>
            </Grid>
            <Grid className="footer_button_container_mobile_item" item xs={5.5}>
              <a
                className="navbar-nav-link navbar-nav-link_inactive"
                href="https://discord.gg/287DcFss6F"
                rel="noreferrer"
                target="_blank"
              >
                Discord
              </a>
            </Grid>
          </Grid>
        ) : (
          <div className="footer_button_container">
            <NavBarLink name="Auction" path={routes.auctionList.path}></NavBarLink>
            <NavBarLink name="Resources" path={routes.docs.path}></NavBarLink>
            <NavBarLink name="T&C" path={routes.tc.path}></NavBarLink>
            <a
              className="navbar-nav-link navbar-nav-link_inactive"
              href="https://discord.gg/287DcFss6F"
              rel="noreferrer"
              target="_blank"
            >
              Discord
            </a>
          </div>
        )}
      </Container>
    </div>
  )
}
