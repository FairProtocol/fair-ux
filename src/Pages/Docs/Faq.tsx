import { Typography } from '@mui/material'
import Image12 from 'src/assets/images/image12.png'
import './index.scss'

const Faq: React.FC = () => {
  return (
    <div>
        <Typography className="docs_details_category">
            Frequently Asked Questions
        </Typography>
        <Typography className="docs_details_title">
            FAQs
        </Typography>
        <>
            <Typography className="docs_details_text">1. When does the auction end?</Typography>
            <Typography className="docs_details_text one-spacing">The auction will always end at the predefined time set by the auctioneer. Each auction page has a countdown (a circular orange timer).</Typography>
            <Typography className="docs_details_text">2. How is the final price calculated?</Typography>
            <Typography className="docs_details_text one-spacing">The final clearing price will be the price where the supply and demand curve intersect. (In the graph, it's where the red supply line meets the green demand curve, indicated by the white dashed line).</Typography>
            <Typography className="docs_details_text one-spacing">Bidders are ordered in this format:</Typography>
            <Typography className="docs_details_text two-spacing">a. Price</Typography>
            <Typography className="docs_details_text two-spacing">b. Bid Amount (amount of tokens the bidder is willing to buy)</Typography>
            <Typography className="docs_details_text two-spacing">c. User ID (auto-generated index created when a user connects their wallet)</Typography>
            <Typography className="docs_details_text">3. I was bidding X tokens, how many can I claim?</Typography>
            <Typography className="docs_details_text one-spacing">If the final clearing price was higher than your limit order price, you will receive back your funds used for bidding. Otherwise, you will receive the bidding amount * clearing price auctioned tokens.</Typography>
            <Typography className="docs_details_text one-spacing">Here is one example:</Typography>
            <Typography className="docs_details_text one-spacing">Let's imagine there is an auction selling ETH for DAI</Typography>
            <Typography className="docs_details_text two-spacing">a. You place a limit order of 1000 DAI with a limit price of 4000 DAI per ETH</Typography>
            <Typography className="docs_details_text two-spacing">b. If the clearing price ends up being 5000 DAI per ETH, you will receive your 1000 DAI back</Typography>
            <Typography className="docs_details_text two-spacing">c. If the clearing price ends up being 3000 DAI per ETH, you will receive 1000* 1/3000 ETH = 1/3 ETH</Typography>
            <Typography className="docs_details_text">4. How do I claim my tokens from the auction?</Typography>
            <Typography className="docs_details_text one-spacing">a. Bidders: After the auction has ended, and the settlement transaction has been executed, click on the claim button on the interface.</Typography>
            <Typography className="docs_details_text one-spacing">b. Auctioneers: After the auction time has ended, submit the transaction to settle the auction. Find an example of the command here.</Typography>
            <Typography className="docs_details_text">5. Can I know what the closing price will be?</Typography>
            <Typography className="docs_details_text one-spacing">This cannot be known before the auction closes, as it needs to take into account all bids. For more information on calculating the closing price, check How is the final price calculated. “Current Price” on the interface gives you an estimate of what the closing price might be, as it shows the current closing price of the auction if no more bids are submitted or cancelled.</Typography>
            <Typography className="docs_details_text">6. How can I make sure my bid is included?</Typography>
            <Typography className="docs_details_text one-spacing">You cannot guarantee that your bid will be included in the auction. Though you can bid with a very high price, which is very likely higher than the closing price. Then your bid will be - very likely - above the final clearing price and hence you will get the tokens at the clearing price. This is called non-competitive price bidding.</Typography>
            <Typography className="docs_details_text one-spacing">Alternatively, bidders can try to wait until shortly before the end of the auction when its easier to estimate the final clearing price. Then they can bid higher than their estimated clearing price.</Typography>
            <Typography className="docs_details_text">7. What does the Current Price mean?</Typography>
            <Typography className="docs_details_text one-spacing">“Current Price” shows the current closing price of the auction if no more bids are submitted or cancelled.</Typography>
            <Typography className="docs_details_text">8. I placed a bid, where is my balance?</Typography>
            <Typography className="docs_details_text one-spacing">When you place a bid, your balance of the bid token will be subtracted from the wallet so it is committed to the auction.</Typography>
            <Typography className="docs_details_text one-spacing">You can always cancel your bid (before the optional cancellation period set up by the auctioneer) and have your balance back in your wallet.</Typography>
            <Typography className="docs_details_text">9. How many transactions does a bidder need to submit?</Typography>
            <Typography className="docs_details_text one-spacing">a. Approve the bid token (only if this wasn't done before)</Typography>
            <Typography className="docs_details_text one-spacing">b. Submit bid</Typography>
            <Typography className="docs_details_text one-spacing">c. Claim auction proceeds/receive funds back if not included</Typography>
            <Typography className="docs_details_text one-spacing">d. Cancellation (optional)</Typography>
            <Typography className="docs_details_text one-spacing">Note: after the auction ends, bidders (anyone) can theoretically also submit the transaction for auction settlement. Nonetheless, we expect the auctioneer to carry out this process.</Typography>
            <Typography className="docs_details_text">10. The auction closed but I couldn't claim any of the auctioned tokens, what happened?</Typography>
            <Typography className="docs_details_text one-spacing">It is likely that you placed your bid price too low. Read the answer to “How is the final price calculated” to know more about what determines who is included in the auction.</Typography>
            <Typography className="docs_details_text">11. What is the chart showing?</Typography>
            <Typography className="docs_details_text one-spacing">The chart showcases the bids of the auction.</Typography>
            <div className="docs_details_image_wrapper">
            <img
                className="docs_details_image"
                src={Image12}
            />
            </div>
            <Typography className="docs_details_text one-spacing">a. Black dotted line - Shows the current price of the auction. This current price will be the final/clearing price if no more bids are submitted or cancelled.</Typography>
            <Typography className="docs_details_text one-spacing">b. Green line - Shows the price (x-axis) and size (y-axis) of the bids that have been placed, both expressed in the bid token.</Typography>
            <Typography className="docs_details_text one-spacing">c. Yellow line - Shows the sell supply of the auction, based on the price and nominated in the bidding token</Typography>
            <Typography className="docs_details_text one-spacing">d. Orange line - Only visible when placing an order. Shows the new order that would be placed, based on the current amount and price input.</Typography>
            <Typography className="docs_details_text">12. What is the settlement transaction?</Typography>
            <Typography className="docs_details_text one-spacing">The settlement transaction refers to a transaction that needs to be executed after the auction ends in order to:</Typography>
            <Typography className="docs_details_text two-spacing">a. distribute the proceeds to the auctioneer</Typography>
            <Typography className="docs_details_text two-spacing">b. make claiming available for users</Typography>
            <Typography className="docs_details_text one-spacing">Although this transaction can be submitted by anyone, we expect the auctioneer to take care of this step. An example of the command can be found in the “How to Participate as an Auctioneer” section.</Typography>
            <Typography className="docs_details_text">13. Can I get my tokens back if my bid is not successful?</Typography>
            <Typography className="docs_details_text one-spacing">Yes, as outlined in question “The auction closed but I couldn't claim any of the auctioned tokens, what happened?”, you can claim the total balance of the tokens you used for bidding.</Typography>
            <Typography className="docs_details_text one-spacing">Please note the ether (gas) spent to submit the bid order cannot be claimed as it is not related to the Fair Protocol.</Typography>
            <Typography className="docs_details_text">14. What type of tokens can be auctioned and used for bidding?</Typography>
            <Typography className="docs_details_text one-spacing">Currently, only ERC20 tokens can be auctioned and used for bidding.</Typography>
            <Typography className="docs_details_text">15. Can I place as many orders as I want to?</Typography>
            <Typography className="docs_details_text one-spacing">Yes, as long as you have sufficient balance of the bidding token and meet the auction minimum price you can place as many orders as you want. You can cancel orders at any time if needed. Only successful orders will account for token redemption, orders placed that were unsuccessful will not account for token redemption.</Typography>
        </>
    </div>
  )
}

export default Faq
