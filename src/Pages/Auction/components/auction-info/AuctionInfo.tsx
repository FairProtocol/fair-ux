import { useMemo } from 'react'

import { Grid, Typography } from '@mui/material'
import dayjs from 'dayjs'

import { ExternalLink } from '../../../../components/common/external-link/ExternalLink'
import { TextLink } from '../../../../components/common/text-link/TextLink'
import { zeroAddressRegex } from '../../../../constants'
import { useAuctionDescription } from '../../../../hooks/useAuctionDescription'
import { useAuctionDetails } from '../../../../hooks/useAuctionDetails'
import { AuctionIdentifier, AuctionState, DerivedAuctionInfo } from '../../../../state/types'
import { Fraction } from '../../../../utils/entities/fractions/fraction'
import { TokenAmount } from '../../../../utils/entities/fractions/tokenAmount'
import { ChainId, NETWORK_CONFIGS } from '../../../../utils/networkConfig'
import { abbreviation } from '../../../../utils/numeral'
import {
  getEasyAuctionAddress,
  getExplorerLink,
  getTokenDisplay,
  shortenAddress,
} from '../../../../utils/tools'
import AuctionStatus from '../auction-status/AuctionStatus'
import Wrapper from '../wrapper/Wrapper'
import './AuctionInfo.scss'

interface AuctionInfoProps {
  auctionIdentifier: AuctionIdentifier
  derivedAuctionInfo: DerivedAuctionInfo
}

const AuctionInfo: React.FC<AuctionInfoProps> = ({ auctionIdentifier, derivedAuctionInfo }) => {
  const { chainId } = auctionIdentifier
  const { auctionState } = derivedAuctionInfo
  const { auctionDetails } = useAuctionDetails(auctionIdentifier)
  const auctionDescription = useAuctionDescription(auctionIdentifier)
  const twitterUrl = auctionDescription?.twitterUrl
  const discordUrl = auctionDescription?.discordUrl
  const siteUrl = auctionDescription?.siteUrl

  const tokenSold = useMemo(
    () =>
      derivedAuctionInfo &&
      auctionDetails &&
      new Fraction(
        auctionDetails.currentBiddingAmount,
        BigInt(10 ** Number(auctionDetails.decimalsBiddingToken)).toString(),
      ).divide(derivedAuctionInfo?.clearingPrice || '0'),
    [auctionDetails, derivedAuctionInfo],
  )

  const allowListSigner = useMemo(
    () =>
      auctionDetails?.allowListSigner?.length === 66
        ? `0x${auctionDetails?.allowListSigner.slice(26)}`
        : auctionDetails?.allowListSigner,
    [auctionDetails?.allowListSigner],
  )

  const easyAuctionAddress = useMemo(
    () => getExplorerLink(chainId, getEasyAuctionAddress(chainId as ChainId) || '', 'address'),
    [chainId],
  )

  return (
    <Grid container>
      <Grid item xs={12}>
        <Wrapper className="auction-info">
          <Typography className="auction-info_header">Auction Information</Typography>
          <div className="auction-info_text">
            <Typography className="auction-info_text_heading">Status</Typography>
            <AuctionStatus auctionState={auctionState || AuctionState.NOT_YET_STARTED} />
          </div>
          <div className="auction-info_text">
            <Typography className="auction-info_text_heading">Auction Start Date</Typography>
            <Typography className="auction-info_text_subHeading">
              {dayjs((auctionDetails?.startingTimestamp || 0) * 1000).format('DD MMM, YYYY')}
            </Typography>
          </div>
          <div className="auction-info_text">
            <Typography className="auction-info_text_heading">Auction End Date</Typography>
            <Typography className="auction-info_text_subHeading">
              {dayjs((auctionDetails?.endTimeTimestamp || 0) * 1000).format('DD MMM, YYYY')}
            </Typography>
          </div>
          <div className="auction-info_text">
            <Typography className="auction-info_text_heading">Auction Duration</Typography>
            <Typography className="auction-info_text_subHeading">
              {dayjs((auctionDetails?.endTimeTimestamp || 0) * 1000).to(
                dayjs((auctionDetails?.startingTimestamp || 0) * 1000),
                true,
              )}
            </Typography>
          </div>
          <div className="auction-info_text">
            <Typography className="auction-info_text_heading">
              Last Order Cancellation Date
            </Typography>
            <Typography className="auction-info_text_subHeading">
              {dayjs((auctionDetails?.orderCancellationEndDate || 0) * 1000).format('DD MMM, YYYY')}
            </Typography>
          </div>
          <div className="auction-info_text">
            <Typography className="auction-info_text_heading">Minimum Funding</Typography>
            <Typography className="auction-info_text_subHeading">
              {!derivedAuctionInfo?.biddingToken ||
              auctionDetails == null ||
              auctionDetails.minFundingThreshold == '0x0'
                ? '0'
                : `${abbreviation(
                    new TokenAmount(
                      derivedAuctionInfo.biddingToken,
                      auctionDetails.minFundingThreshold,
                    ).toSignificant(2),
                  )} ${getTokenDisplay(derivedAuctionInfo?.biddingToken, chainId)}`}
            </Typography>
          </div>
          <div className="auction-info_text">
            <Typography className="auction-info_text_heading">Estimated Token Sold</Typography>
            <Typography className="auction-info_text_subHeading">
              {tokenSold && derivedAuctionInfo
                ? `${abbreviation(tokenSold.toSignificant(2))}  ${getTokenDisplay(
                    derivedAuctionInfo?.auctioningToken,
                    chainId,
                  )}`
                : '-'}
            </Typography>
          </div>
          <div className="auction-info_text">
            <Typography className="auction-info_text_heading">Atomic Closure</Typography>
            <Typography className="auction-info_text_subHeading">
              {auctionDetails
                ? auctionDetails.isAtomicClosureAllowed
                  ? 'Enabled'
                  : 'Disabled'
                : '-'}
            </Typography>
          </div>
          <div className="auction-info_text">
            <Typography className="auction-info_text_heading">
              Min Bidding Amount Per Order
            </Typography>
            <Typography className="auction-info_text_subHeading">
              {derivedAuctionInfo?.biddingToken && auctionDetails
                ? `${abbreviation(
                    new TokenAmount(
                      derivedAuctionInfo?.biddingToken,
                      auctionDetails.minimumBiddingAmountPerOrder,
                    ).toSignificant(2),
                  )} ${getTokenDisplay(derivedAuctionInfo?.biddingToken, chainId)}`
                : '-'}
            </Typography>
          </div>
          <div className="auction-info_text">
            <Typography className="auction-info_text_heading">Allow List Contract</Typography>
            <Typography className="auction-info_text_subHeading">
              {auctionDetails && !zeroAddressRegex.test(auctionDetails.allowListManager)
                ? shortenAddress(auctionDetails.allowListManager)
                : 'None'}
            </Typography>
          </div>
          <div className="auction-info_text">
            <Typography className="auction-info_text_heading">Signers Address</Typography>
            <Typography className="auction-info_text_subHeading">
              {allowListSigner &&
              auctionDetails &&
              !zeroAddressRegex.test(auctionDetails?.allowListSigner)
                ? shortenAddress(allowListSigner)
                : 'None'}
            </Typography>
          </div>
        </Wrapper>
      </Grid>
      <Grid item xs={12}>
        <Wrapper className="auction-info">
          <Typography className="auction-info_header">Contracts</Typography>
          <Typography className="auction-info_text_heading">
            {NETWORK_CONFIGS[chainId as ChainId].name}:
          </Typography>
          <Typography className="auction-info_text_heading">
            {shortenAddress(getEasyAuctionAddress(chainId as ChainId))}
            <ExternalLink href={easyAuctionAddress} />
          </Typography>
          {!!siteUrl && (
            <>
              <Typography className="auction-info_header">Official Links</Typography>
              <TextLink className="auction-info_text_heading" href={siteUrl}>
                Website
              </TextLink>
            </>
          )}
          {(twitterUrl || discordUrl) && (
            <>
              <Typography className="auction-info_header">Socials</Typography>
              {!!twitterUrl && (
                <TextLink className="auction-info_text_heading" href={twitterUrl}>
                  Twitter
                </TextLink>
              )}
              {!!discordUrl && (
                <TextLink className="auction-info_text_heading" href={discordUrl}>
                  Discord
                </TextLink>
              )}
            </>
          )}
        </Wrapper>
      </Grid>
    </Grid>
  )
}

export default AuctionInfo
