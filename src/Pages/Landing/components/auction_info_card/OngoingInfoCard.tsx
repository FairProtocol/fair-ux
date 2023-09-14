import React from 'react'
import { Link } from 'react-router-dom'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Grid, Typography } from '@mui/material'
import Clock from 'src/assets/images/clock.svg'

import Timer from '../../../../components/common/timer/Timer'
import DoubleLogo from '../../../../components/common/token/DoubleLogo'
import { AuctionInfo } from '../../../../hooks/useAllAuctionInfos'
import { useIsTablet } from '../../../../hooks/useIsTablet'
import { ChainId, NETWORK_CONFIGS } from '../../../../utils/networkConfig'
import { abbreviation } from '../../../../utils/numeral'
import { calculateTimeLeft } from '../../../../utils/tools'

import './OngoingInfoCard.scss'

interface Props {
  auctionInfo: AuctionInfo
}

export const OngoingInfoCard: React.FC<Props> = (props) => {
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
    <Grid item xs={isTablet ? 5.8 : 3.8}>
      <Link
        style={{ textDecoration: 'none' }}
        to={`/auction?auctionId=${auctionId}&chainId=${Number(chainId)}`}
      >
        <div className="ongoingAuctions_item">
          <div className="ongoingAuctions_item_container">
            <DoubleLogo
              auctioningToken={{
                address: auctionInfo.addressAuctioningToken,
                symbol: auctionInfo.symbolAuctioningToken,
              }}
              biddingToken={{
                address: auctionInfo.addressBiddingToken,
                symbol: auctionInfo.symbolBiddingToken,
              }}
              className="ongoingAuctions_item_image"
              size={36}
            />
            <div className="ongoingAuctions_item_details">
              <div className="ongoingAuctions_item_details_container">
                <div className="ongoingAuctions_item_details_container_tag">
                  <Typography
                    className="ongoingAuctions_item_regular"
                    color={'#FFFFFF'}
                    fontSize="0.5rem"
                  >
                    {NETWORK_CONFIGS[chainId as ChainId].name}
                  </Typography>
                </div>
                <div className="ongoingAuctions_item_details_container_tag">
                  <Typography
                    className="ongoingAuctions_item_regular"
                    color={'#FFFFFF'}
                    fontSize="0.5rem"
                  >
                    {isPrivateAuction ? 'Private' : 'Public'}
                  </Typography>
                </div>
              </div>
              <Typography
                className="ongoingAuctions_item_bold"
                color={'#000000'}
                fontSize="0.875rem"
              >
                {`${auctionSymbolBiddingToken}/${auctionSymbolAuctioningToken}`}
              </Typography>
            </div>
          </div>
          <Typography
            className="ongoingAuctions_item_bold"
            color={'rgba(24, 11, 45, 0.7)'}
            fontSize="0.75rem"
          >
            <span className="ongoingAuctions_item_details_price">Price</span>{' '}
            {`${abbreviation(
              currentClearingPrice.toString(),
            )} ${auctionSymbolBiddingToken} per ${auctionSymbolAuctioningToken}`}
          </Typography>
          <div className="ongoingAuctions_item_ended">
            <div className="ongoingAuctions_item_ended_container">
              <img src={Clock} />
              <Timer className="ongoingAuctions_item_timer" timeLeft={timeLeft} />
            </div>
            <button className="ongoingAuctions_item_ended_button">
              <ArrowForwardIcon
                fontSize="small"
                sx={{
                  color: '#5940C1',
                  backgroundColor: '#B9B0ED',
                  padding: '5px',
                  borderRadius: '2em',
                }}
              />
            </button>
          </div>
        </div>
      </Link>
    </Grid>
  )
}
