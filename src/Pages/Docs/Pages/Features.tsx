import { Typography } from '@mui/material'
import '../index.scss'

const Features: React.FC = () => {
  return (
    <div>
        <Typography className="docs_details_category">
            Introducing Fair Protocol
        </Typography>
        <Typography className="docs_details_title">
            Features
        </Typography>
        <>
            <Typography className="docs_details_text title-bold">Fair Protocol powers fair sales through a variety of features:</Typography>
            <Typography className="docs_details_text one-spacing">1. User-friendly bidding experience -</Typography>
            <Typography className="docs_details_text two-spacing">In contrast to other mechanisms, Fair Protocol enables bidders to participate at their leisure, without needing to time their activity in order to get the desired price.</Typography>
            <Typography className="docs_details_text one-spacing">2. Mass order Settlement -</Typography>
            <Typography className="docs_details_text two-spacing">Auctions can settle more than 10,000 bid orders with the same settlement price.</Typography>
            <Typography className="docs_details_text one-spacing">3. Entirely permissionless -</Typography>
            <Typography className="docs_details_text two-spacing">Any user can launch or participate in auctions (unless they are private auctions) without the need for a vetting authority. At the same time, we do encourage users to do their due diligence before participating in any sales.</Typography>
            <Typography className="docs_details_text one-spacing">4. Fully private Auctions -</Typography>
            <Typography className="docs_details_text two-spacing">Users can create custom whitelists to limit participation for their auctions (based on wallet addresses).</Typography>
        </>
    </div>
  )
}

export default Features
