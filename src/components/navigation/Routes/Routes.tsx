import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { routes } from './constants'
import Auction from '../../../Pages/Auction'
import AuctionList from '../../../Pages/AuctionList'
import CreateAuction from '../../../Pages/CreateAuction'
import Docs from '../../../Pages/Docs'
import Landing from '../../../Pages/Landing'
import PrivateAuctionSigner from '../../../Pages/PrivateAuctionSigner'
import TermsAndConditions from '../../../Pages/TermsAndConditions'
import { Footer } from '../footer/Footer'
import { Navbar } from '../navbar/Navbar'

const AppRoutes: React.FC = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Routes>
        <Route element={<Auction />} path={routes.auction.path} />
        <Route element={<Landing />} path={routes.start.path} />
        <Route element={<Navigate to={routes.start.path} />} path={routes.home.path} />
        <Route element={<Docs />} path={routes.docs.path} />
        <Route element={<CreateAuction />} path={routes.createAuction.path} />
        <Route element={<TermsAndConditions />} path={routes.tc.path} />
        <Route element={<AuctionList />} path={routes.auctionList.path} />
        <Route element={<PrivateAuctionSigner />} path={routes.privateAuctionSigner.path} />
      </Routes>
      <Footer />
    </div>
  )
}

export default AppRoutes
