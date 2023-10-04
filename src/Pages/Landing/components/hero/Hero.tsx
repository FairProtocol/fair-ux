import React, { Fragment, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import TextTransition, { presets } from 'react-text-transition'

import { chains } from '../../../../connectors'
import { useIsTablet } from '../../../../hooks/useIsTablet'
import './Hero.scss'
import { useAnalyticsEventTracker } from '../../../App'

export const Hero: React.FC = () => {
  const isTablet = useIsTablet()
  const eventTracker = useAnalyticsEventTracker('Hero')

  const [index, setIndex] = React.useState(0)
  const navigate = useNavigate()

  const navigateToDocs = useCallback(() => {
    eventTracker('Read the Docs', '')
    navigate('/docs')
  }, [navigate, eventTracker])

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    )
    return () => clearTimeout(intervalId)
  }, [])

  return (
    <Fragment>
      <div className="root">
        <Container className="hero">
          <div className="hero_root">
            <Typography className="hero_heading" color={'#FFFFFF'} fontSize={'1.5rem'}>
              <span>The fairest mechanism to launch assets on</span>
              <span>
                <TextTransition
                  className="hero_heading_special"
                  inline
                  springConfig={presets.gentle}
                >
                  {chains[index % chains.length].name}
                </TextTransition>
              </span>
            </Typography>
            <Typography className="hero_subheading" color={'#FFFFFF'} fontSize={'0.75rem'}>
              Fair Protocol is a platform for conducting fair, transparent and decentralized token
              prize discovery.
            </Typography>
            <div>
              <button className="hero_button" onClick={navigateToDocs}>
                <div className="hero_button_root">
                  <Typography variant="inherit">Read the docs</Typography>
                  <ArrowForwardIosIcon fontSize="small" />
                </div>
              </button>
            </div>
          </div>
        </Container>
      </div>
      <Container className="hero-docs" maxWidth="xl">
        <div className="hero-docs_root">
          <Typography className="hero_heading-2" color={'#180B2D'} fontSize={'0.875rem'}>
            How it works?
          </Typography>
          <Grid container spacing={0}>
            <Grid className="hero_description" item xs={isTablet ? 5.8 : 2.8}>
              <Typography className="hero_description_title" color={'#FFFFFF'} fontSize={'0.75rem'}>
                Connect Wallet
              </Typography>
              <Typography
                className="hero_description_content"
                color={'rgba(255, 255, 255, 0.7)'}
                fontSize={'0.75rem'}
              >
                Bidders will have to connect wallet to join the auctions
              </Typography>
            </Grid>
            <Grid className="hero_description hero_margin-left" item xs={isTablet ? 5.8 : 2.8}>
              <Typography className="hero_description_title" color={'#FFFFFF'} fontSize={'0.75rem'}>
                Selecting Auctions
              </Typography>
              <Typography
                className="hero_description_content"
                color={'rgba(255, 255, 255, 0.7)'}
                fontSize={'0.75rem'}
              >
                View and select auctions from the landing page
              </Typography>
            </Grid>
            {!isTablet && <Grid item xs={0.1}></Grid>}
            <Grid className="hero_description" item xs={isTablet ? 5.8 : 2.8}>
              <Typography className="hero_description_title" color={'#FFFFFF'} fontSize={'0.75rem'}>
                Bidding in an Auction
              </Typography>
              <Typography
                className="hero_description_content"
                color={'rgba(255, 255, 255, 0.7)'}
                fontSize={'0.75rem'}
              >
                Approve, set the amount of tokens and the price per bid-token/auction token
              </Typography>
            </Grid>
            <Grid className="hero_description hero_margin-left" item xs={isTablet ? 5.8 : 2.8}>
              <Typography className="hero_description_title" color={'#FFFFFF'} fontSize={'0.75rem'}>
                Claim your assets
              </Typography>
              <Typography
                className="hero_description_content"
                color={'rgba(255, 255, 255, 0.7)'}
                fontSize={'0.75rem'}
              >
                Submit your transactions to claim your assets
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Fragment>
  )
}
