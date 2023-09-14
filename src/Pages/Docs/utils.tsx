export type DocsItem = {
  category: String
  items: DocsDetail[]
  starting: number
}

export type DocsDetail = {
  title: String
  category: String
  text: (String | String[])[][]
}

export const docsDetails: DocsDetail[] = [
  {
    title: 'Overview',
    category: 'Introducing Fair Protocol',
    text: [
      [
        'Fair Protocol is a platform for participating in fair, transparent and decentralised token sales/price discovery.',
      ],
      [
        'With our Batch Auction mechanism, the protocol enables a resilient and easy-to-use tool for launching and bidding for ERC-20 tokens on an evergrowing list of supported networks.',
      ],
    ],
  },
  {
    title: 'Features',
    category: 'Introducing Fair Protocol',
    text: [
      ['Fair Protocol powers fair sales through a variety of features:'],
      [
        [
          '1. User-friendly bidding experience -',
          'In contrast to other mechanisms, Fair Protocol enables bidders to participate at their leisure, without needing to time their activity in order to get the desired price.',
        ],
        'one-spacing',
      ],
      [
        [
          '2. Mass order Settlement -',
          'Auctions can settle more than 10,000 bid orders with the same settlement price.',
        ],
        'one-spacing',
      ],
      [
        [
          '3. Entirely permissionless -',
          'Any user can launch or participate in auctions (unless they are private auctions) without the need for a vetting authority. At the same time, we do encourage users to do their due diligence before participating in any sales.',
        ],
        'one-spacing',
      ],
      [
        [
          '4. Fully private Auctions -',
          'Users can create custom whitelists to limit participation for their auctions (based on wallet addresses).',
        ],
        'one-spacing',
      ],
    ],
  },
  {
    title: 'Supported Networks',
    category: 'Introducing Fair Protocol',
    text: [
      ['Fair Protocol currently supports the following networks:'],
      ['Mainnets:', 'title-bold'],
      ['1. Ethereum', 'two-spacing'],
      ['2. Gnosis', 'two-spacing'],
      ['3. Polygon', 'two-spacing'],
      ['4. Avalanche', 'two-spacing'],
      ['Testnet:', 'one-spacing, title-bold'],
      ['1. Sepolia', 'two-spacing'],
      ['2. Goerli', 'two-spacing'],
      ['3. Mumbai', 'two-spacing'],
      ['4. Fuji', 'two-spacing'],
      ['Coming Soon', 'one-spacing, title-bold'],
      [
        'We have a couple more mainnets and testnets coming soon including Arbitrum and Specular. Follow our Twitter to be updated!',
        'two-spacing',
      ],
    ],
  },
  {
    title: 'Overview',
    category: 'Batch Auctions',
    text: [
      [
        'Batch auctions are a fair pricing method that has been battle tested in traditional finance. Some of its uses include everyday Open Auctions in the NYSE, Direct Listings, as well as IPOs (Google being the most prominent).',
      ],
      [
        'Fair Protocol’s mechanism adds major benefits over existing approaches available today on Ethereum like fixed price sales, Dutch Auctions, IBCO or Balancer LBP.',
      ],
    ],
  },
  {
    title: 'Benefits',
    category: 'Batch Auctions',
    text: [
      [
        [
          '1. Front running (MEV) resistant -',
          'Fair Protocolprevents front-running bots from interfering with sales by not allowing them to purchase tokens early and sell later at a higher price. In contrast to AMM solutions, the auction mechanism does not allow miners to extract value from users by using sandwich attacks.',
        ],
      ],
      [
        [
          '2. Full control over participation price -',
          'One of the advantages of Fair Protocol is the bidder’s ability to limit the price at which they are willing to buy. In contrast, IBCOs requires the bidder to commit to participation without knowing the token’s eventual valuation.',
        ],
      ],
      [
        [
          '3. Fair pricing -',
          'All bidders will receive the same clearing price, which is automatically determined when the auction concludes.',
        ],
      ],
      [
        [
          '4. Composable -',
          'The auction setup is modular enough to satisfy many different use cases’ needs.',
        ],
      ],
    ],
  },
  {
    title: 'Use Cases',
    category: 'Batch Auctions',
    text: [
      [
        'Fair Protocol is a permissionless piece of infrastructure and some of the use cases one can initiate as an user include-',
      ],
      [
        [
          '1. Token Sales-',
          'Fair Protocol builds on the proven success in token sales (IDOs) that Gnosis Auction and Gnosis Protocol v1 (Mesa) had. It brings similar benefits in terms of fair price finding and frontrunning resistance and provides a user friendly system for participation.',
        ],
        'one-spacing',
      ],
      [
        [
          '2. Collateral Shortfall Event-',
          'Many lending protocols still don’t have a mechanism to auction off assets in case of a shortfall in collateral to pay lenders. Fair Protocol can work as a platform in which other smart contracts trigger auctions to raise funds for re-collateralization.',
        ],
        'one-spacing',
      ],
      [
        [
          '3. All price-finding events-',
          'Whether it is a large sale of tokens on a DAO’s treasury, zero-coupon bonds, or any other event that requires a fair price-finding method, Fair Protocol can provide the right avenue and features to meet the needs.',
        ],
        'one-spacing',
      ],
    ],
  },
  {
    title: 'Vested Tokens',
    category: 'Batch Auctions',
    text: [
      [
        'Fair Protocol offers a unique method to sell vested tokens. Vested tokens allow projects and investors to align incentives over a longer period and hence are a great bootstrapping tool for new projects.',
      ],
      [
        'Note that vested token implementations are not trivial, as the vesting period can be bypassed if the sale is not carried out properly. E.g., if the vested token distribution allows smart contract addresses to participate, any claim on future vested tokens can be tokenized with special smart contract. These tokenized claims would then allow everyone to trade the vested tokens immediately. Fair Protocol has a unique feature that allows the auctioneer to allowlist only EOA account, which can not tokenize any future claims in a trustless setup. This ensures that the vested tokens sold can not be made liquid without any further trust assumptions.',
      ],
      ['Vested token contracts', 'title-bold'],
      [
        "The vested token contract with the best fit for the platform is an ERC20 token with a disabled transfer function during the vesting period for all addresses, but with a few exceptions. The exceptions required to start a successful auction are the auctioneer's address and the auction contract.",
      ],
      [
        'In this setup, every user can use bidding tokens - e.g. USDC - to bid in the auction for the vesting tokens and then later claim the bought vested tokens into their wallet. But no investor will be able to move the vested tokens out of their wallet during the vesting period. If each participating wallet is only an EAO account, the claimed vested tokens can not be tokenized in a trustless manner.',
      ],
      ['Further additions like linear vesting schedules can also be applied.'],
      ['An example of a vested token can be found here with its associated auction.'],
      ['To start an auction for vested tokens', 'title-bold'],
      ['1. Deploy your vesting token.', 'one-spacing'],
      [
        '2. Declare the necessary exceptions for the transfer restrictions: Auctioneer + Fair Protocol contract.',
        'one-spacing',
      ],
      ['3. Start a new private auction via the launch-auction section.', 'one-spacing'],
      [
        '4. Only allowlist participants that are EAO accounts (and, if it applies, satisfy the needed KYC-level).',
        'one-spacing',
      ],
    ],
  },
  {
    title: 'Requirements',
    category: 'Participating in an Auction',
    text: [
      [
        'To participate in any auction, you would need access to a wallet and then connect this wallet to oursite. We support multiple wallets:',
      ],
      ['1. Metamask', 'one-spacing'],
      ['2. Coinbase', 'one-spacing'],
      ['3. WalletConnect based providers', 'one-spacing'],
      [
        'For beginners or new users, we highly recommend using Metamask. To learn how to create and use a metamask wallet, click here.',
      ],
      [
        'Depending on the auction, you would also need to have the correct tokens to take part in the bidding process.',
      ],
    ],
  },
  {
    title: 'User Flow',
    category: 'Participating in an Auction',
    text: [
      ['1. Connect Wallet', 'title-bold'],
      [
        'a. Connect your wallet to the platform. On the top right corner, you can find the button that will allow you to connect your wallet to the dApp.',
        'one-spacing',
      ],
      [
        'b. A popup will appear where you will be prompted with a list of supported wallet providers. Select the wallet type.',
        'one-spacing',
      ],
      [
        'c. After selecting the wallet (in this case, Metamask) a connection request will appear. Pick the account (Address) you would like to connect with, and click “Next”.',
        'one-spacing',
      ],
      ['d. Once you have selected the account you want to use, click “Connect”.', 'one-spacing'],
      ['2. Selecting Auctions', 'title-bold'],
      [
        'a. After all these steps, you have now successfully connected to dApp. The landing page has one key sections: Popular Auctions and Ongoing Auctions.',
        'one-spacing',
      ],
      ['b. To participate in a Popular Auction, simply click on the auction box.', 'one-spacing'],
      ['c. To participate in an Ongoing Auction, click on the “>” button.', 'one-spacing'],
      ['3. Bidding in an Auction', 'title-bold'],
      ['A typical auction page looks like below:'],
      ['This page contains 3 key sections:'],
      [
        'a. At the top, we have the Auction Summary. These include the key details regarding the auction',
        'one-spacing',
      ],
      ['b. Secondly, we have the Auction and Information Section.', 'one-spacing'],
      [
        'i. The auction section allows you to place orders, see the current prices and trends and shows your order history',
        'two-spacing',
      ],
      [
        'ii. The information section allows you to see more details of the auction. This includes information regarding the project, contract details as well as social links',
        'two-spacing',
      ],
      ['4. Placing a Bid', 'title-bold'],
      [
        'a. If it is the first time that you have used that token to bid, you will have to approve the smart contract to spend that token. Click on the "Unlock" button, and then confirm the transaction in your wallet.',
        'one-spacing',
        'Image8',
      ],
      [
        'b. After you have set both the amount of tokens to bid, and the price per bid-token/auction token, click on “Place Order” to submit your bid',
        'one-spacing',
      ],
      [
        'c. Once you have clicked on “Place Order”, a confirmation popup will appear that will ask you to confirm the order.',
        'one-spacing',
        'Image9',
      ],
      [
        'd. After you have clicked on “Confirm”, your wallet will trigger a popup to confirm the transaction. In this case, the Metamask popup will appear asking you to confirm the execution of the transaction from your wallet interface.',
        'one-spacing',
      ],
      [
        'e. Once the Metamask order has been confirmed, and the transaction has been updated, your bid should appear in the “Your Order” section below. To confirm the transaction, you can click on the Etherscan link to view more order details.',
        'one-spacing',
        'Image10',
      ],
      [
        'Please note: due to the speed of the different networks as well as our decentralised system, sometimes the order may not be immediately reflected in the “Your Orders” section. Rest assured, as long as your wallet has confirmed the transaction, our system has obtained your bid. If the order is not reflected after a short while, please refresh the page a few times for the order to be updated.',
        'one-spacing',
      ],
      ['5. Cancelling a Bid', 'title-bold'],
      [
        'a. To cancel a bid/order, simply head over to the auction, scroll to your orders section and click on the X icon under the Actions heading on the relevant order.',
        'one-spacing',
        'Image11',
      ],
      [
        'b. This should pop up a modal that requires you to confirm the transaction. Do note that if an order is cancelled, your bid will be removed from the auction. You would have to bid again (unless you have prior bids) to take part in the auction. Confirm the action and authorise the transaction in your relevant wallet.',
        'one-spacing',
        'Image12',
      ],
    ],
  },
  {
    title: 'Requirements',
    category: 'Starting an Auction',
    text: [
      ['You will need the meet the following requirements to start an auction:'],
      ['1. A wallet with sufficient funds to process transactions', 'one-spacing'],
      ['2. The right number of tokens (depending on how much you want to auction)', 'one-spacing'],
      [
        '3. A list of addresses to be whitelisted (if and only if you are planning to launch a private auction)',
        'one-spacing',
      ],
      [
        '4. Optional but highly recommended: Details regarding your auction. This would ideally include',
        'one-spacing',
      ],
      [
        'a. A brief summary of the token as well as a more in-depth write-up about the token and project.',
        'two-spacing',
      ],
      ['b. Social media links: Twitter, Discord, Website', 'two-spacing'],
      [
        'c. Contract details: could be etherscan link, token contract address or link to whitepaper',
        'two-spacing',
      ],
    ],
  },
  {
    title: 'Using Scripts',
    category: 'Starting an Auction',
    text: [
      [
        'This guide will first list all the parameters in order to run a Public auction, and then go through an example of setting up an auction on the Goerli testnet.',
      ],
      ['Required Parameters', 'title-bold'],
      ['All auctions need to include the following parameters:'],
      [
        [
          '“--auctioning-token”',
          'refers to the token you want to sell in the auction, add the address as a string',
        ],
        'one-spacing',
      ],
      [
        [
          '“--bidding-token”',
          'refers to the token the bidders will use to bid on the auctioned token, add the address as a string',
        ],
        'one-spacing',
      ],
      [
        [
          '“--sell-amount”',
          'refers to the amount of tokens that you will sell, add the amount as an integer',
        ],
        'one-spacing',
      ],
      [
        [
          '“--min-buy-amount”',
          'refers to the minimum amount of buy tokens you are willing to accept. The minimum sell price of the auction is calculated by dividing the --min-buy-amount/--sell-amount',
        ],
        'one-spacing',
      ],
      [
        [
          '“--auction-end-date”',
          'determines the end date and time of the auction in Unix Timestamp format. Use this website in order to convert from human date and time format to Unix Timestamp.',
        ],
        'one-spacing',
      ],
      [['“--network”', 'determines the network in which the auction will happen.'], 'one-spacing'],
      ['Additional Parameters', 'title-bold'],
      [
        'Additionally, Auctioneers can further customize the auction by using the following optional parameters:',
      ],
      [
        [
          '“--min-funding-threshold”',
          'The minimal funding threshold for executing the settlement. If funding is not reached, everyone will get back their investment. The default is 0.',
        ],
        'one-spacing',
      ],
      [
        [
          '“--order-cancellation-end-date”',
          'The UNIX timestamp (in seconds) until which orders can be cancelled. The default is 0.',
        ],
        'one-spacing',
      ],
      [
        [
          '“--min-buy-amount-per-order”',
          'Describes the minimal buyAmount per order placed in the auction. Auctioneers can define if there is a minimum order size in their auction. Default is 0.01',
        ],
        'one-spacing',
      ],
      [
        [
          '“--is-atomic-closure-allowed”',
          'This parameter enables users to close the auction atomically and submit a final bid by calling the settleAuctionAtomically function in the smart contract once the auction-end date has been reached. The auctioneer determines whether this parameter is on or off by specifying True or False.',
        ],
        'one-spacing',
      ],
      ['Example', 'title-bold'],
      ['Install all dependencies, and switch the right folder by using the following commands:'],
      ['git clone https://github.com/FairProtocol/auction-contracts.git', 'code'],
      ['cd auction-contracts', 'code'],
      ['yarn', 'code'],
      ['yarn build', 'code'],
      ['Do the following command in order to set the network you will use:'],
      ['export NETWORK= goerli', 'code'],
      ['Select the gas price:'],
      ['export GAS_PRICE_GWEI=9', 'code'],
      ['Add your Infura Key:'],
      ['export INFURA_KEY=INFURA_KEY_HERE', 'code'],
      ['Add the private key of the address with the funds to sell:'],
      ['export PK=PRIVATE_KEY_HERE', 'code'],
      ['Example of final command to initiate the auction:'],
      [
        'yarn hardhat initiateAuction --auctioning-token “0xc778417e063141139fce010982780140aa0cd5a” --bidding-token “0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa” --sell-amount 0.1 --min-buy-amount 50 --auction-end-date 1616497200 --network goerli',
        'code',
      ],
      ['Closing an auction'],
      [
        'After the auction time has finished, ANY participant can settle the auction by running this command:',
      ],
      ['yarn hardhat clearAuction --auction-id INSERT_AUCTION_ID_HERE --network goerli', 'code'],
    ],
  },
  {
    title: 'Using UI',
    category: 'Starting an Auction',
    text: [
      ['We highly recommend using the UI to launch auctions. To launch an auction'],
      [
        '1. Ensure your wallet is connected to the site. Click the Create Auction link in the website header. This will redirect you to the launch page',
        'one-spacing',
        'Image7',
      ],
      [
        '2. On the launch page, you will see all the subsections on the side of the page. Ensure the correct network is selected. If not, you can simply click on the network and change it accordingly.',
        'one-spacing',
        'Image2',
      ],
      [
        '3. Start filling in the sections of the form. Note that all sections, except Socials, Short Summary and Description, are required to launch an auction. However, it is highly recommended to fill all the sections for users/bidders to have the best chance to discover and know more about your token/project. If you are ever unsure, hover over the tooltip icons at the side of each input to understand what is required in each section.',
        'one-spacing',
        'Image5',
      ],
      [
        '4. Do note that if you are creating a Private Auction, you will need to toggle the Is Private Auction input. For a Private Auction, a signing address is required to whitelist any participating addresses in the specific auction. Once the auction is launched, you will be able to sign addresses on a separate page at the link below.',
        'one-spacing',
        'Image3',
      ],
      [
        '5. Once all the necessary details are entered, click on the  Create Auction button. This should open up a confirmation modal for you to confirm/make any changes. Once confirmed, click on Confirm Launch.',
        'one-spacing',
        'Image4',
      ],
      [
        '6. This should prompt your wallet to authorise your transaction. This will put the launch in a Pending state. Once the transaction has been authorised in your wallet, you should receive a success pop-up stating that the auction has been successfully launched. You can also view the deployed transaction on the relevant network scan site via the link in the pop-up.',
        'one-spacing',
        'Image6',
      ],
      ['Congratulations! You have successfully launched an auction on Fair Protocol.'],
    ],
  },
  {
    title: 'Settling Auctions',
    category: 'Starting an Auction',
    text: [
      [
        'As with launching an auction, there are two ways to settle an auction. Do note that as this is a transaction on the blockchain, you will be required to pay gas fees.',
      ],
      [
        [
          '1. Using Scripts:',
          'Assuming you have launched the auction using the repo, you will also be to settle the auction using the following command',
        ],
        'one-spacing',
      ],
      ['yarn hardhat clearAuction --auction-id INSERT_AUCTION_ID_HERE --network $NETWORK', 'code'],
      [
        [
          '2. Using UI:',
          'Our user-friendly UI allows you to easily settle auctions at the click of a button. Simply enter the auction ID of your launched auction and then click on the “Settle Auction” button.',
        ],
        'one-spacing',
      ],
      [
        'Please note, an auction can only be settled if it has met the ‘Minimum Funding’ criteria when it was launched. Everyone can settle an auction, but typically the onus is on the auctioneer to submit the transaction.',
      ],
    ],
  },
  {
    title: 'Private Auctions',
    category: 'Starting an Auction',
    text: [
      [
        'Fair Protocol also supports launching and bidding for Private Auction. An auction is considered to be private when the auctioneer has enabled the feature while launching and has limited the participation to just a certain group of addresses (referred to as the ‘whitelist’).',
      ],
      [
        'As such, while any user will be able to view the auction and see details, only whitelisted addresses will be eligible to bid and receive auctioned tokens.',
      ],
      [
        'This whitelisting mechanism allows auctioneers to further reduce the possibility of price manipulation as well as limit to a known group of investors/users.',
      ],
      ['To launch a Private Auction (we recommend launching via the UI):'],
      [
        '1. The auctioneer simply has to submit the auction details and toggle the “Private Auction” functionality',
        'one-spacing',
      ],
      [
        '2. Submit an address or a contract which will facilitate the role of a signer/vetter. Typically this address is the same address used to launch the auction. However, the contract does support the usage of a different address.',
        'one-spacing',
      ],
      ['3. If using the same address to launch and sign:', 'one-spacing'],
      [
        'a. Enter a list of addresses (separated by commas) that they want to whitelist in the “Whitelist” field',
        'two-spacing',
      ],
      [
        'b. Submit the transaction. Your wallet provider will then require you to launch the auction as well as sign each and every address submitted.',
        'two-spacing',
      ],
      ['4. If using a different address to launch and sign:', 'one-spacing'],
      [
        'a. Leave the “Whitelist” field bank and submit the transaction. Your wallet provider should then only require you to launch the auction',
        'two-spacing',
      ],
      ['b. Record the auction ID of your newly launched auction.', 'two-spacing'],
      ['c. Sign out of the website and sign in using the “signing” address.', 'two-spacing'],
      [
        'd. Go to the retroactive “whitelist” page. This allows you to retroactively add addresses for whitelisting and signing',
        'two-spacing',
      ],
      ['e. Enter the auction ID and the whitelisted addresses.', 'two-spacing'],
      [
        'f. Submit the transaction. Your wallet provider should then only ask you to sign the addresses.',
        'two-spacing',
      ],
    ],
  },
  {
    title: 'FAQs',
    category: 'Frequently Asked Questions',
    text: [
      ['1. When does the auction end?'],
      [
        'The auction will always end at the predefined time set by the auctioneer. Each auction page has a countdown (a circular orange timer).',
        'one-spacing',
      ],
      ['2. How is the final price calculated?'],
      [
        "The final clearing price will be the price where the supply and demand curve intersect. (In the graph, it's where the red supply line meets the green demand curve, indicated by the white dashed line).",
        'one-spacing',
      ],
      ['Bidders are ordered in this format:', 'one-spacing'],
      ['a. Price', 'two-spacing'],
      ['b. Bid Amount (amount of tokens the bidder is willing to buy)', 'two-spacing'],
      [
        'c. User ID (auto-generated index created when a user connects their wallet)',
        'two-spacing',
      ],
      ['3. I was bidding X tokens, how many can I claim?'],
      [
        'If the final clearing price was higher than your limit order price, you will receive back your funds used for bidding. Otherwise, you will receive the bidding amount * clearing price auctioned tokens.',
        'one-spacing',
      ],
      ['Here is one example:', 'one-spacing'],
      ["Let's imagine there is an auction selling ETH for DAI", 'one-spacing'],
      [
        'a. You place a limit order of 1000 DAI with a limit price of 4000 DAI per ETH',
        'two-spacing',
      ],
      [
        'b. If the clearing price ends up being 5000 DAI per ETH, you will receive your 1000 DAI back',
        'two-spacing',
      ],
      [
        'c. If the clearing price ends up being 3000 DAI per ETH, you will receive 1000* 1/3000 ETH = 1/3 ETH',
        'two-spacing',
      ],
      [
        '4. How do I claim my tokens from the auction?4. How do I claim my tokens from the auction?',
      ],
      [
        'a. Bidders: After the auction has ended, and the settlement transaction has been executed, click on the claim button on the interface.',
        'one-spacing',
      ],
      [
        'b. Auctioneers: After the auction time has ended, submit the transaction to settle the auction. Find an example of the command here.',
        'one-spacing',
      ],
      ['5. Can I know what the closing price will be?'],
      [
        'This cannot be known before the auction closes, as it needs to take into account all bids. For more information on calculating the closing price, check How is the final price calculated. “Current Price” on the interface gives you an estimate of what the closing price might be, as it shows the current closing price of the auction if no more bids are submitted or cancelled.',
        'one-spacing',
      ],
      ['6. How can I make sure my bid is included?'],
      [
        'You cannot guarantee that your bid will be included in the auction. Though you can bid with a very high price, which is very likely higher than the closing price. Then your bid will be - very likely - above the final clearing price and hence you will get the tokens at the clearing price. This is called non-competitive price bidding.',
        'one-spacing',
      ],
      [
        'Alternatively, bidders can try to wait until shortly before the end of the auction when its easier to estimate the final clearing price. Then they can bid higher than their estimated clearing price.',
        'one-spacing',
      ],
      ['7. What does the Current Price mean?'],
      [
        '“Current Price” shows the current closing price of the auction if no more bids are submitted or cancelled.',
        'one-spacing',
      ],
      ['8. I placed a bid, where is my balance?'],
      [
        'When you place a bid, your balance of the bid token will be subtracted from the wallet so it is committed to the auction.',
        'one-spacing',
      ],
      [
        'You can always cancel your bid (before the optional cancellation period set up by the auctioneer) and have your balance back in your wallet.',
        'one-spacing',
      ],
      ['9. How many transactions does a bidder need to submit?'],
      ["a. Approve the bid token (only if this wasn't done before)", 'one-spacing'],
      ['b. Submit bid', 'one-spacing'],
      ['c. Claim auction proceeds/receive funds back if not included', 'one-spacing'],
      ['d. Cancellation (optional)', 'one-spacing'],
      [
        'Note: after the auction ends, bidders (anyone) can theoretically also submit the transaction for auction settlement. Nonetheless, we expect the auctioneer to carry out this process.',
        'one-spacing',
      ],
      ["10. The auction closed but I couldn't claim any of the auctioned tokens, what happened?"],
      [
        'It is likely that you placed your bid price too low. Read the answer to “How is the final price calculated” to know more about what determines who is included in the auction.',
        'one-spacing',
      ],
      ['11. What is the chart showing?'],
      ['The chart showcases the bids of the auction.', 'one-spacing', 'Image12'],
      [
        'a. Black dotted line - Shows the current price of the auction. This current price will be the final/clearing price if no more bids are submitted or cancelled.',
        'one-spacing',
      ],
      [
        'b. Green line - Shows the price (x-axis) and size (y-axis) of the bids that have been placed, both expressed in the bid token.',
        'one-spacing',
      ],
      [
        'c. Yellow line - Shows the sell supply of the auction, based on the price and nominated in the bidding token',
        'one-spacing',
      ],
      [
        'd. Orange line - Only visible when placing an order. Shows the new order that would be placed, based on the current amount and price input.',
        'one-spacing',
      ],
      ['12. What is the settlement transaction?'],
      [
        'The settlement transaction refers to a transaction that needs to be executed after the auction ends in order to:',
        'one-spacing',
      ],
      ['a. distribute the proceeds to the auctioneer', 'two-spacing'],
      ['b. make claiming available for users', 'two-spacing'],
      [
        'Although this transaction can be submitted by anyone, we expect the auctioneer to take care of this step. An example of the command can be found in the “How to Participate as an Auctioneer” section.',
        'one-spacing',
      ],
      ['13. Can I get my tokens back if my bid is not successful?'],
      [
        "Yes, as outlined in question “The auction closed but I couldn't claim any of the auctioned tokens, what happened?”, you can claim the total balance of the tokens you used for bidding.",
        'one-spacing',
      ],
      [
        'Please note the ether (gas) spent to submit the bid order cannot be claimed as it is not related to the Fair Protocol.',
        'one-spacing',
      ],
      ['14. What type of tokens can be auctioned and used for bidding?'],
      ['Currently, only ERC20 tokens can be auctioned and used for bidding.', 'one-spacing'],
      ['15. Can I place as many orders as I want to?'],
      [
        'Yes, as long as you have sufficient balance of the bidding token and meet the auction minimum price you can place as many orders as you want. You can cancel orders at any time if needed. Only successful orders will account for token redemption, orders placed that were unsuccessful will not account for token redemption.',
        'one-spacing',
      ],
    ],
  },
  {
    title: 'Github',
    category: 'Additional Resources',
    text: [
      [
        'You can visit our GitHub to get more details or learn more about the actual code behind our platform.',
      ],
      ['Our GitHub repo is: https://github.com/FairProtocol/fair-protocol-ux'],
      [
        'If you want to fork our protocol or deploy it for your own private server, you can fork our repo. For in-depth documentation regarding our APIs and code, please visit our gitbook link here:',
      ],
    ],
  },
]

export const docsItems: DocsItem[] = [
  {
    category: 'Introducing Fair Protocol',
    items: docsDetails.slice(0, 3),
    starting: 0,
  },
  {
    category: 'Batch Auctions',
    items: docsDetails.slice(3, 7),
    starting: 3,
  },
  {
    category: 'Participating in an Auction',
    items: docsDetails.slice(7, 9),
    starting: 7,
  },
  {
    category: 'Starting an Auction',
    items: docsDetails.slice(9, 14),
    starting: 9,
  },
  {
    category: 'Frequently Asked Questions',
    items: docsDetails.slice(14, 15),
    starting: 14,
  },
  {
    category: 'Additional Resources',
    items: docsDetails.slice(15, 16),
    starting: 15,
  },
]
