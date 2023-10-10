import { Typography } from '@mui/material'
import './index.scss'

const StartingRequirements: React.FC = () => {
  return (
    <div>
        <Typography className="docs_details_category">
            Starting an Auction
        </Typography>
        <Typography className="docs_details_title">
            Requirements
        </Typography>
        <>
            <Typography className="docs_details_text">You will need the meet the following requirements to start an auction:</Typography>
            <Typography className="docs_details_text one-spacing">1. A wallet with sufficient funds to process transactions</Typography>
            <Typography className="docs_details_text one-spacing">2. The right number of tokens (depending on how much you want to auction)</Typography>
            <Typography className="docs_details_text one-spacing">3. A list of addresses to be whitelisted (if and only if you are planning to launch a private auction)</Typography>
            <Typography className="docs_details_text one-spacing">4. Optional but highly recommended: Details regarding your auction. This would ideally include</Typography>
            <Typography className="docs_details_text two-spacing">a. A brief summary of the token as well as a more in-depth write-up about the token and project.</Typography>
            <Typography className="docs_details_text two-spacing">b. Social media links: Twitter, Discord, Website</Typography>
            <Typography className="docs_details_text two-spacing">c. Contract details: could be etherscan link, token contract address or link to whitepaper</Typography>
        </>
    </div>
  )
}

export default StartingRequirements
