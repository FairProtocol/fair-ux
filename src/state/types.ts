import { Order } from '../hooks/Order'
import { Fraction } from '../utils/entities/fractions/fraction'
import { TokenAmount } from '../utils/entities/fractions/tokenAmount'
import { Token } from '../utils/entities/token'

export interface AuctionIdentifier {
  auctionId: number
  chainId: number
}

export enum AuctionState {
  NOT_YET_STARTED,
  ORDER_PLACING_AND_CANCELING,
  ORDER_PLACING,
  PRICE_SUBMISSION,
  CLAIMING,
}

export interface SellOrder {
  sellAmount: TokenAmount
  buyAmount: TokenAmount
}

export type BigintIsh = bigint | string

export interface DerivedAuctionInfo {
  auctioningToken: Token | undefined
  biddingToken: Token | undefined
  clearingPriceSellOrder: Maybe<SellOrder>
  clearingPriceOrder: Order | undefined
  clearingPrice: Fraction | undefined
  initialAuctionOrder: Maybe<SellOrder>
  auctionEndDate: number | undefined
  auctionStartDate: number | undefined
  clearingPriceVolume: bigint | undefined
  initialPrice: Fraction | undefined
  minBiddingAmountPerOrder: string | undefined
  orderCancellationEndDate: number | undefined
  auctionState: AuctionState | null | undefined
}

export interface FieldRowInfoProps {
  text: string
  type: InfoType
}

export enum InfoType {
  error = 'error',
  info = 'info',
  ok = 'ok',
}

export enum Offer {
  Bid,
  Ask,
}

export enum UploadJSONType {
  AuctionInfo = 'auctionInfo',
  AuctionSignature = 'auctionSignature',
}

/**
 * Price point data represented in the graph. Contains BigNumbers for operate with less errors and more precission
 * but for representation uses number as expected by the library
 */
export interface PricePointDetails {
  // Basic data
  price: number
  totalVolume: number // cumulative volume
  type: Offer
  volume: number // volume for the price point

  // Data for representation
  askValueY: Maybe<number>
  bidValueY: Maybe<number>
  clearingPriceValueY: Maybe<number>
  newOrderValueY: Maybe<number>
  priceFormatted: string
  priceNumber: number
  totalVolumeFormatted: string
  totalVolumeNumber: number
}
