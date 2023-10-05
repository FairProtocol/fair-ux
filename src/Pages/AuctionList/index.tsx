import React from 'react'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CheckIcon from '@mui/icons-material/Check'
import { Tooltip } from '@mui/material'
import { ChainIcon } from 'connectkit'
import { useAccount } from 'wagmi'

import AllAuctions from '../../components/auctions/AllAuctions/AllAuctions'
import Spinner from '../../components/common/spinner/SpinnerLoader'
import DoubleLogo from '../../components/common/token/DoubleLogo'
import {
  AuctionInfo,
  useAllAuctionInfo,
  useAllAuctionInfoWithParticipation,
} from '../../hooks/useAllAuctionInfos'
import { useInterestingAuctionInfo } from '../../hooks/useInterestingAuctionDetails'
import { ChainId, NETWORK_CONFIGS } from '../../utils/networkConfig'
import { FeaturedAuctions } from '../Landing/components/featured_auctions/FeaturedAuctions'
import './index.scss'

const Overview = () => {
  const { address } = useAccount()
  return address ? <OverviewWithAccount account={address} /> : <OverviewWithoutAccount />
}

const OverviewWithoutAccount = () => {
  const allAuctions = useAllAuctionInfo()
  return <OverviewCommon allAuctions={allAuctions} />
}

const OverviewWithAccount = ({ account }: { account: string }) => {
  const allAuctions = useAllAuctionInfoWithParticipation(account)
  return <OverviewCommon allAuctions={allAuctions} />
}

interface OverviewProps {
  allAuctions: Maybe<AuctionInfo[]>
}

const OverviewCommon = ({ allAuctions }: OverviewProps) => {
  const tableData: any[] = []

  const featuredAuctions = useInterestingAuctionInfo()

  const allAuctionsSorted = allAuctions?.sort((a, b) => {
    return b.endTimeTimestamp - a.endTimeTimestamp
    // const aStatus = new Date(a.endTimeTimestamp * 1000) > new Date() ? 'Ongoing' : 'Ended'
    // const bStatus = new Date(b.endTimeTimestamp * 1000) > new Date() ? 'Ongoing' : 'Ended'
    // return bStatus.localeCompare(aStatus) || b.interestScore - a.interestScore
  })

  allAuctionsSorted?.forEach((item) => {
    tableData.push({
      auctionId: `#${item.auctionId}`,
      buying: item.symbolBiddingToken.slice(0, 7),
      chainId: (
        <Tooltip
          placement="top"
          title={NETWORK_CONFIGS[parseInt(item.chainId, 16) as ChainId].name}
        >
          <span>
            <ChainIcon id={parseInt(item.chainId, 16)} size={20} />
          </span>
        </Tooltip>
      ),
      chevron: '',
      date: (
        <Tooltip placement="top" title={new Date(item.endTimeTimestamp * 1000).toString()}>
          <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {new Date(item.endTimeTimestamp * 1000).toLocaleDateString()}
            <ArrowForwardIosIcon fontSize="small" sx={{ color: '000000', marginLeft: '0.5em' }} />
          </span>
        </Tooltip>
      ),
      participation: item.hasParticipation ? (
        <>
          <span>Yes</span>
          <CheckIcon />
        </>
      ) : (
        'No'
      ),
      selling:
        item.symbolAuctioningToken == 'WXDAI' ? 'XDAI' : item.symbolAuctioningToken.slice(0, 7),
      status: new Date(item.endTimeTimestamp * 1000) > new Date() ? 'Ongoing' : 'Ended',
      symbol: (
        <DoubleLogo
          auctioningToken={{
            address: item.addressAuctioningToken,
            symbol: item.symbolAuctioningToken,
          }}
          biddingToken={{
            address: item.addressBiddingToken,
            symbol: item.symbolBiddingToken,
          }}
          className="auction-list_logo"
          size={50}
        />
      ),
      type: item.isPrivateAuction ? 'Private' : 'Public',
      url: `/auction?auctionId=${item.auctionId}&chainId=${Number(item.chainId)}#topAnchor`,
    })
  })

  const isLoading = React.useMemo(
    () =>
      featuredAuctions === undefined ||
      featuredAuctions === null ||
      allAuctions === undefined ||
      allAuctions === null,
    [allAuctions, featuredAuctions],
  )

  return (
    <div style={{ flexGrow: 1 }}>
      {isLoading && <Spinner open />}
      {!isLoading && (
        <>
          <AllAuctions tableData={tableData} />
          <FeaturedAuctions featuredAuctions={featuredAuctions} />
        </>
      )}
    </div>
  )
}

export default Overview
