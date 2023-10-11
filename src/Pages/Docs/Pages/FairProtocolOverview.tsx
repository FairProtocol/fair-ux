import { Typography } from '@mui/material'
import '../index.scss'

const FairProtocolOverview: React.FC = () => {
  return (
    <div>
      <Typography className="docs_details_category">Introducing Fair Protocol</Typography>
      <Typography className="docs_details_title">Overview</Typography>
      <>
        <Typography className="docs_details_text title-bold">
          Fair Protocol is a platform for participating in fair, transparent and decentralised token
          sales/price discovery.
        </Typography>
        <Typography className="docs_details_text title-bold">
          With our Batch Auction mechanism, the protocol enables a resilient and easy-to-use tool
          for launching and bidding for ERC-20 tokens on an evergrowing list of supported networks.
        </Typography>
      </>
    </div>
  )
}

export default FairProtocolOverview
