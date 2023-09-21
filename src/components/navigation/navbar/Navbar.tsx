import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import MenuIcon from '@mui/icons-material/Menu'
import { Drawer, IconButton, Typography, useMediaQuery } from '@mui/material'
import Logo from 'src/assets/images/logo_colored.svg'

import { ConnectButton } from '../../web3/connect_button/ConnectButton'
import { NavBarLink } from '../NavBarLink/NavBarLink'
import { routes } from '../Routes/constants'
import './Navbar.scss'

export const Navbar: React.FC = () => {
  const isTablet = useMediaQuery('(max-width:640px) and (orientation: portrait)')
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const openPath = useCallback(
    (path: string) => {
      navigate(path)
      setOpen(false)
    },
    [navigate, setOpen],
  )

  return (
    <div className="root">
      <div className="navbar">
        <Link to="/start">
          <img src={Logo} />
        </Link>
        {isTablet ? (
          <>
            <IconButton color="inherit" onClick={() => setOpen(true)}>
              <MenuIcon fontSize="large" sx={{ color: '#FFFFFF', margin: '0', padding: '0' }} />
            </IconButton>
            <Drawer anchor={'right'} onClose={() => setOpen(false)} open={open}>
              <div className="navbar_sidebar">
                <button
                  className="navbar_sidebar_button"
                  onClick={() => openPath(routes.auctionList.path)}
                >
                  <Typography
                    className="navbar_sidebar_heading"
                    color={'#FFFFFF'}
                    fontSize={'1rem'}
                  >
                    Auctions
                  </Typography>
                </button>
                <button
                  className="navbar_sidebar_button"
                  onClick={() => openPath(routes.createAuction.path)}
                >
                  <Typography
                    className="navbar_sidebar_heading"
                    color={'#FFFFFF'}
                    fontSize={'1rem'}
                  >
                    Create Auction
                  </Typography>
                </button>
                <button
                  className="navbar_sidebar_button"
                  onClick={() => openPath(routes.docs.path)}
                >
                  <Typography
                    className="navbar_sidebar_heading"
                    color={'#FFFFFF'}
                    fontSize={'1rem'}
                  >
                    Resources
                  </Typography>
                </button>
                <button
                  className="navbar_sidebar_button"
                  onClick={() => openPath(routes.privateAuctionSigner.path)}
                >
                  <Typography
                    className="navbar_sidebar_heading"
                    color={'#FFFFFF'}
                    fontSize={'1rem'}
                  >
                    Auction Signer
                  </Typography>
                </button>
                <div className="navbar_sidebar_connect-button">
                  <ConnectButton />
                </div>
              </div>
            </Drawer>
          </>
        ) : (
          <>
            <NavBarLink name="Auctions" path={routes.auctionList.path}></NavBarLink>
            <NavBarLink name="Create Auction" path={routes.createAuction.path}></NavBarLink>
            <NavBarLink name="Resources" path={routes.docs.path}></NavBarLink>
            <NavBarLink name="Auction Signer" path={routes.privateAuctionSigner.path} />
            <ConnectButton />
          </>
        )}
      </div>
    </div>
  )
}
