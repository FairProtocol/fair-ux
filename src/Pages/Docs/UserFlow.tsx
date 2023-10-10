import { Typography } from "@mui/material"
import Image8 from 'src/assets/images/image8.png'
import Image9 from 'src/assets/images/image9.png'
import Image10 from 'src/assets/images/image10.png'
import Image11 from 'src/assets/images/image11.png'
import Image12 from 'src/assets/images/image12.png'
import './index.scss'

const UserFlow: React.FC = () => {
    return (
      <div>
        <Typography className="docs_details_category">
            Participating in an Auction
        </Typography>
        <Typography className="docs_details_title">
            User Flow
        </Typography>
        <>
            <Typography className="docs_details_text title-bold">1. Connect Wallet</Typography>
            <Typography className="docs_details_text one-spacing">a. Connect your wallet to the platform. On the top right corner, you can find the button that will allow you to connect your wallet to the dApp.</Typography>
            <Typography className="docs_details_text one-spacing">b. A popup will appear where you will be prompted with a list of supported wallet providers. Select the wallet type.</Typography>
            <Typography className="docs_details_text one-spacing">c. After selecting the wallet (in this case, Metamask) a connection request will appear. Pick the account (Address) you would like to connect with, and click “Next”.</Typography>
            <Typography className="docs_details_text one-spacing">d. Once you have selected the account you want to use, click “Connect”.</Typography>
            <Typography className="docs_details_text title-bold">2. Selecting Auctions</Typography>
            <Typography className="docs_details_text one-spacing">a. After all these steps, you have now successfully connected to dApp. The landing page has one key sections: Popular Auctions and Ongoing Auctions.</Typography>
            <Typography className="docs_details_text one-spacing">b. To participate in a Popular Auction, simply click on the auction box.</Typography>
            <Typography className="docs_details_text one-spacing">c. To participate in an Ongoing Auction, click on the “&gt;” button.</Typography>
            <Typography className="docs_details_text title-bold">3. Bidding in an Auction</Typography>
            <Typography className="docs_details_text one-spacing">A typical auction page looks like below:</Typography>
            <Typography className="docs_details_text one-spacing">This page contains 3 key sections:</Typography>
            <Typography className="docs_details_text two-spacing">a. At the top, we have the Auction Summary. These include the key details regarding the auction</Typography>
            <Typography className="docs_details_text two-spacing">b. Secondly, we have the Auction and Information Section.</Typography>
            <Typography className="docs_details_text three-spacing">i. The auction section allows you to place orders, see the current prices and trends and shows your order history</Typography>
            <Typography className="docs_details_text three-spacing">ii. The information section allows you to see more details of the auction. This includes information regarding the project, contract details as well as social links</Typography>
            <Typography className="docs_details_text title-bold">4. Placing a Bid</Typography>
            <Typography className="docs_details_text one-spacing">a. If it is the first time that you have used that token to bid, you will have to approve the smart contract to spend that token. Click on the "Unlock" button, and then confirm the transaction in your wallet.</Typography>
            <div className="docs_details_image_wrapper">
            <img
                className="docs_details_image"
                src={Image8}
            />
            </div>
            <Typography className="docs_details_text one-spacing">b. After you have set both the amount of tokens to bid, and the price per bid-token/auction token, click on “Place Order” to submit your bid</Typography>
            <Typography className="docs_details_text one-spacing">c. Once you have clicked on “Place Order”, a confirmation popup will appear that will ask you to confirm the order.</Typography>
            <div className="docs_details_image_wrapper">
            <img
                className="docs_details_image"
                src={Image9}
            />
            </div>
            <Typography className="docs_details_text one-spacing">d. After you have clicked on “Confirm”, your wallet will trigger a popup to confirm the transaction. In this case, the Metamask popup will appear asking you to confirm the execution of the transaction from your wallet interface.</Typography>
            <Typography className="docs_details_text one-spacing">e. Once the Metamask order has been confirmed, and the transaction has been updated, your bid should appear in the “Your Order” section below. To confirm the transaction, you can click on the Etherscan link to view more order details.</Typography>
            <div className="docs_details_image_wrapper">
            <img
                className="docs_details_image"
                src={Image10}
            />
            </div>
            <Typography className="docs_details_text one-spacing">Please note: due to the speed of the different networks as well as our decentralised system, sometimes the order may not be immediately reflected in the “Your Orders” section. Rest assured, as long as your wallet has confirmed the transaction, our system has obtained your bid. If the order is not reflected after a short while, please refresh the page a few times for the order to be updated.</Typography>
            <Typography className="docs_details_text title-bold">5. Cancelling a Bid</Typography>
            <Typography className="docs_details_text one-spacing">a. To cancel a bid/order, simply head over to the auction, scroll to your orders section and click on the X icon under the Actions heading on the relevant order.</Typography>
            <div className="docs_details_image_wrapper">
            <img
                className="docs_details_image"
                src={Image11}
            />
            </div>
            <Typography className="docs_details_text one-spacing">b. This should pop up a modal that requires you to confirm the transaction. Do note that if an order is cancelled, your bid will be removed from the auction. You would have to bid again (unless you have prior bids) to take part in the auction. Confirm the action and authorise the transaction in your relevant wallet.</Typography>
            <div className="docs_details_image_wrapper">
            <img
                className="docs_details_image"
                src={Image12}
            />
            </div>
        </>
      </div>
    )
}
  
export default UserFlow
