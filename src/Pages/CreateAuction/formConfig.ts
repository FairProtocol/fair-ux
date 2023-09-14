export interface LaunchAuctionFormValues {
  auctioningTokenAddress: string
  biddingTokenAddress: string
  orderCancellationEndDate: Date
  auctionEndDate: Date
  auctionedSellAmount: string
  minBuyAmount: string
  minimumBiddingAmountPerOrder: string
  minimumFundingThreshold: string
  isAtomicClosureAllowed: boolean
  isWhiteListingProcessUsed: boolean
  allowListData: string
  chainId: number
  /** Project Details */
  tokenName: string
  ticker: string
  shortSummary: string
  description: string
  /** Social links */
  siteUrl: string
  twitterUrl: string
  discordUrl: string
}

export type FormKeys = keyof LaunchAuctionFormValues

export const DEFAULT_FORM_PARAMS: Readonly<Record<FormKeys, any>> = {
  auctioningTokenAddress: '',
  biddingTokenAddress: '',
  auctionedSellAmount: '',
  minBuyAmount: '',
  minimumFundingThreshold: '',
  orderCancellationEndDate: '',
  auctionEndDate: '',
  minimumBiddingAmountPerOrder: '',
  isAtomicClosureAllowed: false,
  isWhiteListingProcessUsed: false,
  allowListData: '',
  chainId: 1,
  tokenName: '',
  ticker: '',
  shortSummary: '',
  description: '',
  siteUrl: '',
  twitterUrl: '',
  discordUrl: '',
}

type FormValues = {
  label: string
  tooltipText: string
}

export const FORM_PARAMETERS: Readonly<Record<FormKeys, FormValues>> = {
  auctioningTokenAddress: {
    label: 'Auctioning Token Address',
    tooltipText: "The ERC20's address of the token that should be sold",
  },
  biddingTokenAddress: {
    label: 'Bidding Token Address',
    tooltipText: "The ERC20's address of the token that should be bought",
  },
  auctionedSellAmount: {
    label: 'Auctioned Sell Amount',
    tooltipText: 'The amount of auctioning tokens to be sold',
  },
  minBuyAmount: {
    label: 'Minimum Buy Amount',
    tooltipText:
      'The amount of bidding token to be bought at least for the whole sell amount. Together with the upper sell amount, one is specifying the price: Sell-Amount / Min-Buy-Amount',
  },
  minimumFundingThreshold: {
    label: 'Minimal Funding Threshold',
    tooltipText:
      'The minimal funding threshold for executing the settlement. If funding is not reached, everyone will get back their investment',
  },
  orderCancellationEndDate: {
    label: 'Order Cancellation End Time',
    tooltipText: 'Choose a time (your local time) until users should still able to cancel orders',
  },
  auctionEndDate: {
    label: 'Auction End Time',
    tooltipText: 'Choose a time (your local time) marking the end of the auction.',
  },
  minimumBiddingAmountPerOrder: {
    label: 'Minimal Bidding-Amount Per Order',
    tooltipText:
      'Describes the minimal amount - of bidding tokens - per order in the auction. This can be used in order to protect against too high gas costs for the settlement',
  },
  isAtomicClosureAllowed: {
    label: 'Is Atomic Closure Allowed?',
    tooltipText:
      'If atomic closure is enabled, one arbitrageur is allowed to place one further order at the time of auction settlement. This allows bridging on-chain liquidity into the auction',
  },
  isWhiteListingProcessUsed: {
    label: 'Is Private Auction?',
    tooltipText: 'Do you want to use whitelisting process for your auction?',
  },
  allowListData: {
    label: 'Signing Address',
    tooltipText:
      'Provide the public key that is used to allow list participants for the auction participation',
  },
  chainId: {
    label: '',
    tooltipText: '',
  },
  tokenName: {
    label: 'Token Name',
    tooltipText: 'The name of the token being auctioned.',
  },
  ticker: {
    label: 'Ticker',
    tooltipText: 'The token acronym(generally 3-4 words in length). eg USDC, DAI',
  },
  shortSummary: {
    label: 'Short Summary',
    tooltipText:
      'A short description of the auction (max 200 characters). Displayed on the auction page',
  },
  description: {
    label: 'Description',
    tooltipText: 'A full description on the auction.',
  },
  siteUrl: {
    label: 'Official Link',
    tooltipText: 'Official website link',
  },
  twitterUrl: {
    label: 'Twitter Link',
    tooltipText: 'Official Twitter id/link',
  },
  discordUrl: {
    label: 'Discord Link',
    tooltipText: 'Official Discord id',
  },
}
