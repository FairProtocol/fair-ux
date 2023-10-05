import React from 'react'
import { Link } from 'react-router-dom'

import { Grid, Typography } from '@mui/material'
import ClockImage from 'src/assets/images/clock.svg'

import Timer from '../../../../components/common/timer/Timer'
import DoubleLogo from '../../../../components/common/token/DoubleLogo'
import { AuctionInfo } from '../../../../hooks/useAllAuctionInfos'
import { useIsTablet } from '../../../../hooks/useIsTablet'
import { ChainId, NETWORK_CONFIGS } from '../../../../utils/networkConfig'
import { abbreviation } from '../../../../utils/numeral'
import { calculateTimeLeft } from '../../../../utils/tools'

import './FeaturedInfoCard.scss'

interface Props {
  auctionInfo: AuctionInfo
}

export const FeaturedInfoCard: React.FC<Props> = (props) => {
  const { auctionInfo } = props
  const {
    auctionId,
    chainId: chainIdHex,
    currentClearingPrice,
    endTimeTimestamp,
    isPrivateAuction,
  } = auctionInfo
  const chainId = parseInt(chainIdHex, 16)

  const isTablet = useIsTablet()

  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft(endTimeTimestamp))

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTimeTimestamp))
    }, 1000)
    return () => clearInterval(interval)
  }, [endTimeTimestamp])
  const auctionSymbolBiddingToken = auctionInfo.symbolBiddingToken.slice(0, 7)
  const auctionSymbolAuctioningToken = auctionInfo.symbolAuctioningToken.slice(0, 7)

  return (
    <Grid item xs={isTablet ? 5.8 : 2.8}>
      <Link
        style={{ textDecoration: 'none' }}
        to={`/auction?auctionId=${auctionId}&chainId=${Number(chainId)}`}
      >
        <div className="featuredInfoCard_item">
          <DoubleLogo
            auctioningToken={{
              address: auctionInfo.addressAuctioningToken,
              symbol: auctionInfo.symbolAuctioningToken,
            }}
            biddingToken={{
              address: auctionInfo.addressBiddingToken,
              symbol: auctionInfo.symbolBiddingToken,
            }}
            size={68}
          />
          <div className="featuredInfoCard_item_details">
            <div className="featuredInfoCard_item_details_container">
              <div className="featuredInfoCard_item_details_container_tag">
                <Typography
                  className="featuredInfoCard_item_details_container_regular"
                  color={'#FFFFFF'}
                  fontSize="0.5rem"
                >
                  {NETWORK_CONFIGS[chainId as ChainId].name}
                </Typography>
              </div>
              <div className="featuredInfoCard_item_details_container_tag">
                <Typography
                  className="featuredInfoCard_item_details_container_regular"
                  color={'#FFFFFF'}
                  fontSize="0.5rem"
                >
                  {isPrivateAuction ? 'Private' : 'Public'}
                </Typography>
              </div>
            </div>
            <Typography
              className="featuredInfoCard_item_details_container_bold"
              color={'#000000'}
              fontSize="0.875rem"
            >
              {`${auctionSymbolAuctioningToken}/${auctionSymbolBiddingToken}`}
            </Typography>
            <Typography
              className="featuredInfoCard_item_details_container_bold"
              color={'rgba(24, 11, 45, 0.7)'}
              fontSize="0.75rem"
            >
              <span className="featuredInfoCard_item_details_price">Price</span>{' '}
              {`${abbreviation(
                currentClearingPrice.toString(),
              )} ${auctionSymbolBiddingToken} per ${auctionSymbolAuctioningToken}`}
            </Typography>
            <div className="featuredInfoCard_item_details_container_sub">
              <img src={ClockImage} />
              <Timer
                className="featuredInfoCard_item_details_container_timer"
                timeLeft={timeLeft}
              />
            </div>
          </div>
        </div>
      </Link>
    </Grid>
  )
}
