import { Typography } from '@mui/material'
import './index.scss'

const ParticipatingRequirements: React.FC = () => {
  return (
    <div>
        <Typography className="docs_details_category">
            Participating in an Auction
        </Typography>
        <Typography className="docs_details_title">
            Requirements
        </Typography>
        <>
            <Typography className="docs_details_text">To participate in any auction, you would need access to a wallet and then connect this wallet to oursite. We support multiple wallets:</Typography>
            <Typography className="docs_details_text one-spacing">1. Metamask</Typography>
            <Typography className="docs_details_text one-spacing">2. Coinbase</Typography>
            <Typography className="docs_details_text one-spacing">3. WalletConnect based providers</Typography>
            <Typography className="docs_details_text">For beginners or new users, we highly recommend using Metamask. To learn how to create and use a metamask wallet, click here.</Typography>
            <Typography className="docs_details_text">Depending on the auction, you would also need to have the correct tokens to take part in the bidding process.</Typography>
        </>
    </div>
  )
}

export default ParticipatingRequirements
