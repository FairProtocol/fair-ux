import React, { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { Chip, Grid, Typography } from '@mui/material'
import { ChainIcon } from 'connectkit'
import ContentLoader from 'react-content-loader'
import { ReactComponent as Lock } from 'src/assets/images/lock.svg'
import './AuctionDetails.scss'

import { ExternalLink } from '../../../../components/common/external-link/ExternalLink'
import InfoCard from '../../../../components/common/info_card/InfoCard'
import Timer from '../../../../components/common/timer/Timer'
import DoubleLogo from '../../../../components/common/token/DoubleLogo'
import { useAuctionDescription } from '../../../../hooks/useAuctionDescription'
import { useAuctionDetails } from '../../../../hooks/useAuctionDetails'
import { useDerivedAuctionInfo } from '../../../../hooks/useDerivedAuctionInfo'
import { useIsMobileOrTablet } from '../../../../hooks/useIsMobileOrTablet'
import { useOrderbookState } from '../../../../state/orderbook/hooks'
import { ChainId, NETWORK_CONFIGS } from '../../../../utils/networkConfig'
import { abbreviation } from '../../../../utils/numeral'
import {
  calculateTimeLeft,
  getExplorerLink,
  getTokenDisplay,
  parseURL,
} from '../../../../utils/tools'
import Wrapper from '../wrapper/Wrapper'

const AuctionDetails: React.FC = () => {
  const { search } = useLocation()
  const isMobileOrTablet = useIsMobileOrTablet()

  const { orderbookPrice: auctionCurrentPrice } = useOrderbookState()

  const auctionIdentifier = parseURL(search)
  const { chainId } = auctionIdentifier
  const derivedAuctionInfo = useDerivedAuctionInfo(auctionIdentifier)
  const { auctionDetails } = useAuctionDetails(auctionIdentifier)
  const auctionDescription = useAuctionDescription(auctionIdentifier)
  const summary = auctionDescription?.shortSummary
  const isPrivateAuction = auctionDetails?.isPrivateAuction

  const [timeLeft, setTimeLeft] = React.useState(0)

  const isLoading = React.useMemo(
    () => derivedAuctionInfo === null || derivedAuctionInfo === undefined,
    [derivedAuctionInfo],
  )

  useEffect(() => {
    const id = setInterval(() => {
      if (derivedAuctionInfo?.auctionEndDate)
        setTimeLeft(calculateTimeLeft(derivedAuctionInfo?.auctionEndDate))
    }, 1000)
    return () => {
      clearInterval(id)
    }
  }, [derivedAuctionInfo?.auctionEndDate, isLoading])

  const biddingTokenDisplay = useMemo(
    () => getTokenDisplay(derivedAuctionInfo?.biddingToken, chainId),
    [derivedAuctionInfo?.biddingToken, chainId],
  )
  const auctioningTokenDisplay = useMemo(
    () => getTokenDisplay(derivedAuctionInfo?.auctioningToken, chainId),
    [derivedAuctionInfo?.auctioningToken, chainId],
  )

  const biddingTokenAddress = useMemo(
    () => getExplorerLink(chainId, derivedAuctionInfo?.biddingToken?.address || '', 'address'),
    [chainId, derivedAuctionInfo?.biddingToken],
  )

  const clearingPriceDisplay = useMemo(() => {
    const clearingPriceNumber = auctionCurrentPrice

    return clearingPriceNumber ? `${abbreviation(clearingPriceNumber, 3)}` : '-'
  }, [auctionCurrentPrice])

  const getStat = () => {
    return `${abbreviation(
      derivedAuctionInfo?.initialAuctionOrder?.sellAmount.toSignificant(4),
    )} ${getTokenDisplay(derivedAuctionInfo?.biddingToken, chainId)}`
  }

  return (
    <Wrapper>
      <Grid className="auctionDetails_description" item sm={5} xs={10}>
        <div className="auctionDetails_header">
          {auctionDetails && (
            <DoubleLogo
              auctioningToken={{
                address: auctionDetails.addressAuctioningToken,
                symbol: auctionDetails.symbolAuctioningToken,
              }}
              biddingToken={{
                address: auctionDetails.addressBiddingToken,
                symbol: auctionDetails.symbolBiddingToken,
              }}
              className="ongoingAuctions_item_image"
              size={68}
            />
          )}
          {isLoading ? (
            <span className="auctionDetails_loader">
              <ContentLoader
                backgroundColor={'#ddd'}
                foregroundColor={'#eee'}
                speed={2}
                viewBox="0 0 50 100"
              >
                <rect height="10" rx="3" ry="3" width="50" x="0" y="0" />
              </ContentLoader>
            </span>
          ) : (
            <div className="auctionDetails_headerText">
              <Typography className="auctionDetails_headerText_heading">{`${auctioningTokenDisplay}/${biddingTokenDisplay}`}</Typography>
              <Typography className="auctionDetails_headerText_link" variant="body2"></Typography>
            </div>
          )}
        </div>
        <div>
          <Typography className="auctionDetails_summary">{summary}</Typography>
        </div>
        <div>
          <Chip
            icon={<ChainIcon id={chainId} size={15} />}
            label={NETWORK_CONFIGS[chainId as ChainId].name}
            size="small"
            sx={{
              paddingLeft: '0.3rem',
              bgcolor: 'primary.dark',
              color: 'white',
            }}
          />
          {isPrivateAuction && (
            <Chip
              color="secondary"
              icon={<Lock />}
              label="Private Auction"
              size="small"
              sx={{
                paddingLeft: '0.2rem',
                marginLeft: '1rem',
              }}
            />
          )}
        </div>
      </Grid>
      <Grid
        item
        style={{
          margin: '0 20px',
          border: '0.5px solid #B9B0ED',
          borderRadius: '10px',
        }}
        xs={isMobileOrTablet ? 12 : 0}
      />
      <Grid className="auctionDetails_info" container sm={6} xs={12}>
        <Grid item sm={6} xs={12}>
          <InfoCard
            heading="Time Remaining"
            isLoading={isLoading}
            stat={<Timer className="auctionDetails-timer" timeLeft={timeLeft} />}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <InfoCard heading="Total Auctioned Tokens" isLoading={isLoading} stat={getStat()} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <InfoCard
            heading="Bidding Token"
            isLoading={isLoading}
            stat={
              <>
                {getTokenDisplay(derivedAuctionInfo?.biddingToken, chainId)}
                <ExternalLink href={biddingTokenAddress} />
              </>
            }
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <InfoCard
            heading="Current Price for Each Token"
            isLoading={isLoading}
            stat={`${clearingPriceDisplay} ${biddingTokenDisplay}`}
          />
        </Grid>
      </Grid>
    </Wrapper>
  )
}

export default AuctionDetails
