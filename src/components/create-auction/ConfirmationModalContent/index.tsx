import { Typography } from '@mui/material'

import './index.scss'
import { useAuctionForm } from '../../../hooks/useAuctionForm'

interface ConfirmationModalContentProps {
  setIsOpen: (val: boolean) => void
  onInitiateAuction: () => void
  isWorking: boolean
}

const ConfirmationModalContent: React.FC<ConfirmationModalContentProps> = ({
  isWorking,
  onInitiateAuction,
}) => {
  const { getValues } = useAuctionForm()

  const {
    auctionEndDate,
    auctionedSellAmount,
    auctioningTokenAddress,
    biddingTokenAddress,
    description,
    discordUrl,
    isAtomicClosureAllowed,
    isWhiteListingProcessUsed,
    minBuyAmount,
    minimumBiddingAmountPerOrder,
    minimumFundingThreshold,
    orderCancellationEndDate,
    shortSummary,
    siteUrl,
    ticker,
    tokenName,
    twitterUrl,
  } = getValues()

  return (
    <>
      <div className="modal">
        <div className="modal_details">
          <Typography className="modal_details_title">{tokenName}</Typography>
          <Typography className="modal_details_text">{ticker}</Typography>
          <Typography className="modal_details_heading">Project Details</Typography>
          <Typography className="modal_details_title">Short Summary</Typography>
          <Typography className="modal_details_text">{shortSummary}</Typography>
          <Typography className="modal_details_title">Description</Typography>
          <Typography className="modal_details_text">{description}</Typography>
        </div>
        <div className="modal_details">
          <Typography className="modal_details_heading">Auction</Typography>
          <Typography className="modal_details_title">Order Cancellation End Time</Typography>
          <Typography className="modal_details_text">
            {orderCancellationEndDate.toString()}
          </Typography>
          <Typography className="modal_details_title">Auction End Time</Typography>
          <Typography className="modal_details_text">{auctionEndDate.toString()}</Typography>
          <Typography className="modal_details_title">Auctioned Sell Amount</Typography>
          <Typography className="modal_details_text">{auctionedSellAmount}</Typography>
          <Typography className="modal_details_title">Minimum Buy Amount</Typography>
          <Typography className="modal_details_text">{minBuyAmount}</Typography>
          <Typography className="modal_details_title">Minimal Bidding-Amount Per Order</Typography>
          <Typography className="modal_details_text">{minimumBiddingAmountPerOrder}</Typography>
          <Typography className="modal_details_title">Minimal Funding Threshold</Typography>
          <Typography className="modal_details_text">{minimumFundingThreshold}</Typography>
          <Typography className="modal_details_title">Is Atomic Closure Allowed?</Typography>
          <Typography className="modal_details_text">
            {isAtomicClosureAllowed ? 'Yes' : 'No'}
          </Typography>
          <Typography className="modal_details_title">Is Private Auction?</Typography>
          <Typography className="modal_details_text">
            {isWhiteListingProcessUsed ? 'Yes' : 'No'}
          </Typography>
        </div>
        <div className="modal_details_container">
          <div className="modal_details">
            <Typography className="modal_details_heading">Token</Typography>
            <Typography className="modal_details_title">Auctioning Token Address</Typography>
            <Typography className="modal_details_text" style={{ wordBreak: 'break-all' }}>
              {auctioningTokenAddress}
            </Typography>
            <Typography className="modal_details_title">Bidding Token Address</Typography>
            <Typography className="modal_details_text" style={{ wordBreak: 'break-all' }}>
              {biddingTokenAddress}
            </Typography>
          </div>
          <div className="modal_details">
            <Typography className="modal_details_heading">Social</Typography>
            <Typography className="modal_details_title">Official Link</Typography>
            <Typography className="modal_details_text">{siteUrl}</Typography>
            <Typography className="modal_details_title">Discord Link</Typography>
            <Typography className="modal_details_text">{discordUrl}</Typography>
            <Typography className="modal_details_title">Twitter Link</Typography>
            <Typography className="modal_details_text">{twitterUrl}</Typography>
          </div>
        </div>
      </div>
      {!isWorking && (
        <button className="modal_button" onClick={onInitiateAuction}>
          Confirm Launch
        </button>
      )}
    </>
  )
}

export default ConfirmationModalContent
