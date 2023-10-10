import { Typography } from '@mui/material'
import '../index.scss'

const UsingScripts: React.FC = () => {
  return (
    <div>
        <Typography className="docs_details_category">
            Starting an Auction
        </Typography>
        <Typography className="docs_details_title">
            Using Scripts
        </Typography>
        <>
            <Typography className="docs_details_text">This guide will first list all the parameters in order to run a Public auction, and then go through an example of setting up an auction on the Goerli testnet.</Typography>
            <Typography className="docs_details_text title-bold">Required Parameters</Typography>
            <Typography className="docs_details_text one-spacing">All auctions need to include the following parameters:</Typography>
            <Typography className="docs_details_text one-spacing">“--auctioning-token”</Typography>
            <Typography className="docs_details_text one-spacing">refers to the token you want to sell in the auction, add the address as a string</Typography>
            <Typography className="docs_details_text one-spacing">“--bidding-token”</Typography>
            <Typography className="docs_details_text one-spacing">refers to the token the bidders will use to bid on the auctioned token, add the address as a string</Typography>
            <Typography className="docs_details_text one-spacing">“--sell-amount”</Typography>
            <Typography className="docs_details_text one-spacing">refers to the amount of tokens that you will sell, add the amount as an integer</Typography>
            <Typography className="docs_details_text one-spacing">“--min-buy-amount”</Typography>
            <Typography className="docs_details_text one-spacing">refers to the minimum amount of buy tokens you are willing to accept. The minimum sell price of the auction is calculated by dividing the --min-buy-amount/--sell-amount</Typography>
            <Typography className="docs_details_text one-spacing">“--auction-end-date”</Typography>
            <Typography className="docs_details_text one-spacing">determines the end date and time of the auction in Unix Timestamp format. Use this website in order to convert from human date and time format to Unix Timestamp.</Typography>
            <Typography className="docs_details_text one-spacing">“--network”</Typography>
            <Typography className="docs_details_text one-spacing">determines the network in which the auction will happen.</Typography>
            <Typography className="docs_details_text title-bold">Additional Parameters</Typography>
            <Typography className="docs_details_text one-spacing">Additionally, Auctioneers can further customize the auction by using the following optional parameters:</Typography>
            <Typography className="docs_details_text one-spacing">“--min-funding-threshold”</Typography>
            <Typography className="docs_details_text one-spacing">The minimal funding threshold for executing the settlement. If funding is not reached, everyone will get back their investment. The default is 0.</Typography>
            <Typography className="docs_details_text one-spacing">“--order-cancellation-end-date”</Typography>
            <Typography className="docs_details_text one-spacing">The UNIX timestamp (in seconds) until which orders can be cancelled. The default is 0.</Typography>
            <Typography className="docs_details_text one-spacing">“--min-buy-amount-per-order”</Typography>
            <Typography className="docs_details_text one-spacing">Describes the minimal buyAmount per order placed in the auction. Auctioneers can define if there is a minimum order size in their auction. Default is 0.01</Typography>
            <Typography className="docs_details_text one-spacing">“--is-atomic-closure-allowed”</Typography>
            <Typography className="docs_details_text one-spacing">This parameter enables users to close the auction atomically and submit a final bid by calling the settleAuctionAtomically function in the smart contract once the auction-end date has been reached. The auctioneer determines whether this parameter is on or off by specifying True or False.</Typography>
            <Typography className="docs_details_text title-bold">Example</Typography>
            <Typography className="docs_details_text one-spacing">Install all dependencies, and switch the right folder by using the following commands:</Typography>
            <Typography className="docs_details_text code">git clone https://github.com/FairProtocol/auction-contracts.git</Typography>
            <Typography className="docs_details_text code">cd auction-contracts</Typography>
            <Typography className="docs_details_text code">yarn</Typography>
            <Typography className="docs_details_text code">yarn build</Typography>
            <Typography className="docs_details_text one-spacing">Do the following command in order to set the network you will use:</Typography>
            <Typography className="docs_details_text code">export NETWORK= goerli</Typography>
            <Typography className="docs_details_text one-spacing">Select the gas price:</Typography>
            <Typography className="docs_details_text code">export GAS_PRICE_GWEI=9</Typography>
            <Typography className="docs_details_text one-spacing">Add your Infura Key:</Typography>
            <Typography className="docs_details_text code">export INFURA_KEY=INFURA_KEY_HERE</Typography>
            <Typography className="docs_details_text one-spacing">Add the private key of the address with the funds to sell:</Typography>
            <Typography className="docs_details_text code">export PK=PRIVATE_KEY_HERE</Typography>
            <Typography className="docs_details_text one-spacing">Example of final command to initiate the auction:</Typography>
            <Typography className="docs_details_text code">yarn hardhat initiateAuction --auctioning-token “0xc778417e063141139fce010982780140aa0cd5a” --bidding-token “0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa” --sell-amount 0.1 --min-buy-amount 50 --auction-end-date 1616497200 --network goerli</Typography>
            <Typography className="docs_details_text one-spacing">Closing an auction</Typography>
            <Typography className="docs_details_text one-spacing">After the auction time has finished, ANY participant can settle the auction by running this command:</Typography>
            <Typography className="docs_details_text code">yarn hardhat clearAuction --auction-id INSERT_AUCTION_ID_HERE --network goerli</Typography>
        </>
    </div>
  )
}

export default UsingScripts
