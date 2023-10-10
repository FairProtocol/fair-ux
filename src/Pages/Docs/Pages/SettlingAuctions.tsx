import { Typography } from '@mui/material'
import '../index.scss'

const SettlingAuctions: React.FC = () => {
  return (
    <div>
      <Typography className="docs_details_category">Starting an Auction</Typography>
      <Typography className="docs_details_title">Settling Auctions</Typography>
      <>
        <Typography className="docs_details_text">
          As with launching an auction, there are two ways to settle an auction. Do note that as
          this is a transaction on the blockchain, you will be required to pay gas fees.
        </Typography>
        <Typography className="docs_details_text">1. Using Scripts:</Typography>
        <Typography className="docs_details_text one-spacing">
          Assuming you have launched the auction using the repo, you will also be to settle the
          auction using the following command
        </Typography>
        <Typography className="docs_details_text code">
          yarn hardhat clearAuction --auction-id INSERT_AUCTION_ID_HERE --network $NETWORK
        </Typography>
        <Typography className="docs_details_text">2. Using UI script:</Typography>
        <Typography className="docs_details_text one-spacing">
          Our user-friendly UI allows you to easily settle auctions at the click of a button. Simply
          enter the auction ID of your launched auction and then click on the “Settle Auction”
          button.
        </Typography>
        <Typography className="docs_details_text">
          Please note, an auction can only be settled if it has met the ‘Minimum Funding’ criteria
          when it was launched. Everyone can settle an auction, but typically the onus is on the
          auctioneer to submit the transaction.
        </Typography>
      </>
    </div>
  )
}

export default SettlingAuctions
