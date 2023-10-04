import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import { Grid, Typography, useMediaQuery } from '@mui/material'
import { Container } from '@mui/system'
import Discord from 'src/assets/images/discord.svg'
import Logo from 'src/assets/images/logo.svg'
import Medium from 'src/assets/images/medium.svg'
import Telegram from 'src/assets/images/telegram.svg'
import Twitter from 'src/assets/images/twitter.svg'

import { useAnalyticsEventTracker } from '../../../Pages/App'
import { NavBarLinkProps } from '../NavBarLink/NavBarLink'
import { routes } from '../Routes/constants'

import './Footer.scss'

const FooterNavBarLink: React.FC<NavBarLinkProps> = ({ name, path }) => {
  const eventTracker = useAnalyticsEventTracker('Footer Nav')

  return (
    <NavLink
      className={({ isActive }) =>
        `footer_navbar footer_navbar_${isActive ? 'active' : 'inactive'}`
      }
      onClick={() => eventTracker('Footer nav', name || '')}
      to={path}
    >
      <span className="footer_navbar_link">{name}</span>
    </NavLink>
  )
}

export const Footer: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:800px)')

  const eventTracker = useAnalyticsEventTracker('Footer Socials')

  return (
    <div
      className="root"
      style={{
        paddingTop: '2em',
      }}
    >
      <Container className="footer footer_bottom" maxWidth="xl">
        <Grid className="footer_container" container spacing={0}>
          <Grid className="footer_item" item xs={isMobile ? 12 : 3}>
            <Link to="/start">
              <img className="footer_image" src={Logo} />
            </Link>
          </Grid>
          <Grid className="footer_item footer_links" item xs={isMobile ? 12 : 3}>
            <Typography className="footer_title">Auction</Typography>
            <FooterNavBarLink name="Auction List" path={routes.auctionList.path} />
            <FooterNavBarLink name="Create Auction" path={routes.createAuction.path} />
          </Grid>
          <Grid className="footer_item footer_links" item xs={isMobile ? 12 : 3}>
            <Typography className="footer_title">Resources</Typography>
            <FooterNavBarLink name="Documentation" path={routes.docs.path} />
            <FooterNavBarLink name="Terms & Conditions" path={routes.tc.path} />
          </Grid>
          <Grid className="footer_item footer_socials" item xs={isMobile ? 12 : 3}>
            <a
              href="https://twitter.com/Fair_Auction"
              onClick={() => eventTracker('Twitter', '')}
              rel="noreferrer"
              target="_blank"
            >
              <img src={Twitter} />
            </a>
            <a
              href="https://discord.gg/287DcFss6F"
              onClick={() => eventTracker('Discord', '')}
              rel="noreferrer"
              target="_blank"
            >
              <img src={Discord} />
            </a>
            <a
              href="https://medium.com/@fairprotocol"
              onClick={() => eventTracker('Medium', '')}
              rel="noreferrer"
              target="_blank"
            >
              <img src={Medium} />
            </a>
            <a
              href="https://t.me/+B871uCbBU7g2MDA1"
              onClick={() => eventTracker('Telegram', '')}
              rel="noreferrer"
              target="_blank"
            >
              <img src={Telegram} />
            </a>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
