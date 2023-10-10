import { Typography } from '@mui/material'
import '../index.scss'

const PrivateAuctions: React.FC = () => {
  return (
    <div>
        <Typography className="docs_details_category">
            Starting an Auction
        </Typography>
        <Typography className="docs_details_title">
            Private Auctions
        </Typography>
        <>
            <Typography className="docs_details_text">Fair Protocol also supports launching and bidding for Private Auction. An auction is considered to be private when the auctioneer has enabled the feature while launching and has limited the participation to just a certain group of addresses (referred to as the ‘whitelist’).</Typography>
            <Typography className="docs_details_text">As such, while any user will be able to view the auction and see details, only whitelisted addresses will be eligible to bid and receive auctioned tokens.</Typography>
            <Typography className="docs_details_text">This whitelisting mechanism allows auctioneers to further reduce the possibility of price manipulation as well as limit to a known group of investors/users.</Typography>
            <Typography className="docs_details_text">To launch a Private Auction (we recommend launching via the UI):</Typography>
            <Typography className="docs_details_text one-spacing">1. The auctioneer simply has to submit the auction details and toggle the “Private Auction” functionality</Typography>
            <Typography className="docs_details_text one-spacing">2. Submit an address or a contract which will facilitate the role of a signer/vetter. Typically this address is the same address used to launch the auction. However, the contract does support the usage of a different address.</Typography>
            <Typography className="docs_details_text one-spacing">3. If using the same address to launch and sign:</Typography>
            <Typography className="docs_details_text two-spacing">a. Enter a list of addresses (separated by commas) that they want to whitelist in the “Whitelist” field</Typography>
            <Typography className="docs_details_text two-spacing">b. Submit the transaction. Your wallet provider will then require you to launch the auction as well as sign each and every address submitted.</Typography>
            <Typography className="docs_details_text one-spacing">4. If using a different address to launch and sign:</Typography>
            <Typography className="docs_details_text two-spacing">a. Leave the “Whitelist” field bank and submit the transaction. Your wallet provider should then only require you to launch the auction</Typography>
            <Typography className="docs_details_text two-spacing">b. Record the auction ID of your newly launched auction.</Typography>
            <Typography className="docs_details_text two-spacing">c. Sign out of the website and sign in using the “signing” address.</Typography>
            <Typography className="docs_details_text two-spacing">d. Go to the retroactive “whitelist” page. This allows you to retroactively add addresses for whitelisting and signing</Typography>
            <Typography className="docs_details_text two-spacing">e. Enter the auction ID and the whitelisted addresses.</Typography>
            <Typography className="docs_details_text two-spacing">f. Submit the transaction. Your wallet provider should then only ask you to sign the addresses.</Typography>
        </>
    </div>
  )
}

export default PrivateAuctions
