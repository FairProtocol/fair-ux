import {
  ApolloClient,
  ApolloQueryResult,
  DocumentNode,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
} from '@apollo/client'

import {
  GET_ALL_AUCTION_DETAILS,
  GET_ALL_AUCTION_DETAILS_WITH_USER_PARTICIPATION,
  GET_AUCTION_DETAIL,
  GET_CLEARING_ORDER_AND_VOLUME,
  GET_DETAILS_OF_MOST_INTERESTING_AUCTIONS,
  GET_DETAILS_OF_MOST_INTERESTING_CLOSED_AUCTIONS,
  GET_ORDER_BOOK_DISPLAY,
  GET_PREVIOUS_ORDER,
  GET_USER_ID,
  GET_USER_ORDERS,
  GET_USER_ORDERS_WITHOUT_CLAIMED,
} from './Queries'
import { formatAuctionInfoDetailFromApi, formatAuctionInfoFromApi } from './helpers'
import {
  PINATA_API_KEY,
  PINATA_BASE_URL,
  PINATA_PIN_JSON_URL,
  PINATA_QUERY_URL,
  PINATA_SECRET_API_KEY,
  PINATA_WHITELIST_URL,
  queueStartElement,
} from '../constants/config'
import { Order, encodeOrder } from '../hooks/Order'
import { AuctionInfo } from '../hooks/useAllAuctionInfos'
import { AuctionInfoDetail } from '../hooks/useAuctionDetails'
import { UploadJSONType } from '../state/types'
import { getLogger } from '../utils/logger'
import { ChainId } from '../utils/networkConfig'

const logger = getLogger('AdditionalServicesApi')
export type Signature = {
  signature: string
}

export interface AdditionalServicesApi {
  getOrderBookDisplayQuery(): DocumentNode
  getOrderBookData(params: OrderBookParams): Promise<OrderBookData>
  getPreviousOrderQuery(): DocumentNode
  getPreviousOrder(params: PreviousOrderParams): Promise<string>
  getCurrentUserOrdersQuery(): DocumentNode
  getCurrentUserOrders(params: UserOrderParams): Promise<string[]>
  getAllUserOrdersQuery(): DocumentNode
  getAllUserOrders(params: UserOrderParams): Promise<string[]>
  getMostInterestingAuctionDetailsQuery(): DocumentNode
  getMostInterestingClosedAuctionDetailsQuery(): DocumentNode
  getMostInterestingAuctionDetails(closedAuctions?: boolean): Promise<Maybe<AuctionInfo[]>>
  getAllAuctionDetailsQuery(): DocumentNode
  getAllAuctionDetails(): Promise<Maybe<AuctionInfo[]>>
  getAllAuctionDetailsWithUserParticipationQuery(): DocumentNode
  getAllAuctionDetailsWithUserParticipation(account: string): Promise<Maybe<AuctionInfo[]>>
  getClearingPriceOrderAndVolumeQuery(): DocumentNode
  getClearingPriceOrderAndVolume(params: OrderBookParams): Promise<ClearingPriceAndVolumeData>
  getAuctionDetailQuery(): DocumentNode
  getAuctionDetails(params: AuctionDetailParams): Promise<AuctionInfoDetail>
  getSignature(params: GetSignatureParams): Promise<Maybe<Signature | string>>
  getSignatureUrl(params: GetSignatureParams): string
  getUserIdQuery(): DocumentNode
  getUserId(params: GetUserIdParams): Promise<string>
  getWhitelistedAddresses(params: WhitelistedAddressesParams): Promise<AddressEntry[]>
  uploadUserSignature(params: UploadUserSignatureParams): Promise<string>
  uploadAuctionInfo(params: UploadAuctionInfoParams): Promise<string>
  getAuctionDescriptionUrl(params: GetAuctionDescriptionParams): string
  getAuctionDescription(params: GetAuctionDescriptionParams): Promise<Maybe<AuctionDescription>>
}

interface GetUserIdParams {
  networkId: number
  address: string
}

interface GetSignatureParams {
  networkId: number
  auctionId: number
  address: string
}

interface OrderBookParams {
  networkId: number
  auctionId: number
}

interface PreviousOrderParams {
  networkId: number
  auctionId: number
  order: Order
  price: string
}

interface UserOrderParams {
  networkId: number
  auctionId: number
  user: string
}

interface AuctionDetailParams {
  networkId: number
  auctionId: number
}

interface WhitelistedAddressesParams {
  auctionId: number
}

export interface AddressEntry {
  name: string
  address: string
  dateAdded: string | Date
}

interface UploadUserSignatureParams {
  chainId: string
  auctionId: string
  address: string
  signature: string
}

interface UploadAuctionInfoParams {
  chainId: ChainId
  auctionId: number
  address: `0x${string}`
  auctionInfo: AuctionDescription
}

interface GetAuctionDescriptionParams {
  auctionId: number
  chainId: ChainId
}

export interface AuctionDescription {
  tokenName: string
  ticker: string
  shortSummary: string
  description: string
  siteUrl: string
  twitterUrl: string
  discordUrl: string
}

/**
 * Price point as defined in the API
 * Both price and volume are numbers (floats)
 */
export interface PricePoint {
  price: number
  volume: number
}

/**
 * DATA returned from api as JSON
 */
export interface OrderBookData {
  asks: PricePoint[]
  bids: PricePoint[]
}

export interface ClearingPriceAndVolumeData {
  clearingOrder: Order
  volume: bigint
}
export interface AdditionalServicesEndpoint {
  networkId: number
  graph_url_production: string
  graph_url_develop?: string
}

export type AdditionalServicesApiParams = AdditionalServicesEndpoint[]

export class AdditionalServicesApiImpl implements AdditionalServicesApi {
  private clientsByNetwork: { [networkId: number]: ApolloClient<NormalizedCacheObject> } = {}

  public constructor(params: AdditionalServicesApiParams) {
    params.forEach((endpoint) => {
      if (endpoint.graph_url_develop || endpoint.graph_url_production) {
        this.clientsByNetwork[endpoint.networkId] = new ApolloClient({
          uri:
            process.env.PRICE_ESTIMATOR_URL === 'production'
              ? endpoint.graph_url_production
              : endpoint.graph_url_develop || endpoint.graph_url_production,
          cache: new InMemoryCache(),
        })
      }
    })
  }
  public getOrderBookDisplayQuery(): DocumentNode {
    return gql(GET_ORDER_BOOK_DISPLAY)
  }

  public getClearingPriceOrderAndVolumeQuery(): DocumentNode {
    return gql(GET_CLEARING_ORDER_AND_VOLUME)
  }

  public getPreviousOrderQuery(): DocumentNode {
    return gql(GET_PREVIOUS_ORDER)
  }

  public getAllUserOrdersQuery(): DocumentNode {
    return gql(GET_USER_ORDERS)
  }

  public getMostInterestingAuctionDetailsQuery(): DocumentNode {
    return gql(GET_DETAILS_OF_MOST_INTERESTING_AUCTIONS)
  }

  public getMostInterestingClosedAuctionDetailsQuery(): DocumentNode {
    return gql(GET_DETAILS_OF_MOST_INTERESTING_CLOSED_AUCTIONS)
  }

  public getAllAuctionDetailsQuery(): DocumentNode {
    return gql(GET_ALL_AUCTION_DETAILS)
  }

  public getAllAuctionDetailsWithUserParticipationQuery(): DocumentNode {
    return gql(GET_ALL_AUCTION_DETAILS_WITH_USER_PARTICIPATION)
  }

  public getAuctionDetailQuery(): DocumentNode {
    return gql(GET_AUCTION_DETAIL)
  }

  public getUserIdQuery(): DocumentNode {
    return gql(GET_USER_ID)
  }

  public async uploadAuctionInfo(params: UploadAuctionInfoParams): Promise<string> {
    try {
      const {
        address,
        auctionId,
        auctionInfo: {
          description,
          discordUrl,
          shortSummary,
          siteUrl,
          ticker,
          tokenName,
          twitterUrl,
        },
        chainId,
      } = params

      const data = JSON.stringify({
        pinataOptions: {
          cidVersion: 1,
        },
        pinataMetadata: {
          name: `${chainId}-${auctionId}`,
          keyvalues: {
            type: UploadJSONType.AuctionInfo,
            address,
            auctionId,
            chainId,
          },
        },
        pinataContent: {
          ticker,
          tokenName,
          shortSummary,
          description,
          twitterUrl,
          siteUrl,
          discordUrl,
        },
      })

      const res = await fetch(PINATA_PIN_JSON_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
        body: data,
      })
      if (!res.ok) {
        throw await res.json()
      }
      const response = await res.json()

      return response
    } catch (err: any) {
      logger.error(err)
      throw new Error(`Failed to upload auction info: ${err.message}`)
    }
  }

  public async uploadUserSignature(params: UploadUserSignatureParams): Promise<string> {
    try {
      const { address, auctionId, chainId, signature } = params
      const data = JSON.stringify({
        pinataOptions: {
          cidVersion: 1,
        },
        pinataMetadata: {
          name: `${chainId}-${auctionId}-${address}`,
          keyvalues: {
            type: UploadJSONType.AuctionSignature,
            address,
            auctionId: auctionId,
            chainId,
          },
        },
        pinataContent: {
          signature,
        },
      })

      const res = await fetch(PINATA_PIN_JSON_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
        body: data,
      })
      if (!res.ok) {
        throw await res.json()
      }
      const response = await res.json()

      return response
    } catch (error: any) {
      logger.error(error)

      throw new Error(`Failed to upload user signature: ${error.message}`)
    }
  }

  public async getWhitelistedAddresses(
    params: WhitelistedAddressesParams,
  ): Promise<AddressEntry[]> {
    try {
      const { auctionId } = params
      const res = await fetch(PINATA_WHITELIST_URL(auctionId.toString()), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      })
      if (!res.ok) {
        throw await res.json()
      }
      const response = await res.json()
      // @ts-ignore
      const rows = response?.rows
      if (!rows) return []
      return rows.map((entry: any) => ({
        name: entry.metadata.name,
        address: entry.metadata.keyvalues.address,
        dateAdded: entry.date_pinned,
      }))
    } catch (error: any) {
      logger.error(error)

      throw new Error(`Failed to query whitelisted adresses: ${error.message}`)
    }
  }

  public async getAllAuctionDetailsWithUserParticipation(
    account: string,
  ): Promise<Maybe<AuctionInfo[]>> {
    try {
      const promises: Promise<ApolloQueryResult<any>>[] = []
      for (const networkId in this.clientsByNetwork) {
        const client = this._getApolloClient(networkId)
        const query = this.getAllAuctionDetailsWithUserParticipationQuery()

        promises.push(
          client.query({
            query,
            variables: {
              userAddress: account,
            },
          }),
        )
      }
      // The Promise.allSettled() method returns a promise that resolves
      // after all of the given promises have either fulfilled or rejected.
      const results = await Promise.allSettled(promises)

      const allAuctions = []
      for (const res of results) {
        if (res.status === 'rejected') {
          logger.error('Error getting all auction details with user participation: ', res.reason)
        }

        if (res.status === 'fulfilled') {
          if (res.value.error) {
            // backend returns {"message":"invalid url query"}
            // for bad requests
            logger.error(
              'Error getting all auction details with user participation: ',
              res.value.error,
            )
          } else {
            allAuctions.push(
              await res.value.data.auctionDetails.map((auction: AuctionInfo) => ({
                ...auction,
                hasParticipation: !!auction.orders?.length,
              })),
            )
          }
        }
      }
      return allAuctions.flat()
    } catch (error: any) {
      logger.error(error)

      throw new Error(`Failed to query all auctions: ${error.message}`)
    }
  }

  public getCurrentUserOrdersQuery(): DocumentNode {
    return gql(GET_USER_ORDERS_WITHOUT_CLAIMED)
  }

  public async getAllAuctionDetails(): Promise<Maybe<AuctionInfo[]>> {
    try {
      const promises: Promise<ApolloQueryResult<any>>[] = []
      for (const networkId in this.clientsByNetwork) {
        const client = this._getApolloClient(networkId)
        const query = this.getAllAuctionDetailsQuery()

        promises.push(client.query({ query }))
      }
      const results = await Promise.allSettled(promises)
      const allAuctions: AuctionInfo[] = []
      for (const res of results) {
        if (res.status === 'rejected') {
          logger.error('Error getting all auction details without user participation: ', res.reason)
        }
        if (res.status === 'fulfilled') {
          if (res.value.error) {
            // backend returns {"message":"invalid url query"}
            // for bad requests
            logger.error(
              'Error getting all auction details without user participation: ',
              res.value.error,
            )
          } else {
            allAuctions.push(await res.value.data.auctionDetails)
          }
        }
      }
      return allAuctions.flat()
    } catch (error: any) {
      logger.error(error)

      throw new Error(`Failed to query all auctions: ${error.message}`)
    }
  }

  public async getAuctionDetails(params: AuctionDetailParams): Promise<AuctionInfoDetail> {
    try {
      const query = this.getAuctionDetailQuery()
      const client = this._getApolloClient(`${params.networkId}`)

      const res = await client.query({
        query,
        variables: {
          id: params.auctionId,
        },
      })

      if (res.error) {
        // backend returns {"message":"invalid url query"}
        // for bad requests
        throw res.error
      }
      return formatAuctionInfoDetailFromApi(res.data.auctionDetail)
    } catch (error: any) {
      logger.error(error)

      const { auctionId } = params

      throw new Error(
        `Failed to query auction details for auction  id ${auctionId} : ${error.message}`,
      )
    }
  }

  public async getMostInterestingAuctionDetails(
    closedAuctions = false,
  ): Promise<Maybe<AuctionInfo[]>> {
    try {
      const promises: Promise<ApolloQueryResult<any>>[] = []
      for (const networkId in this.clientsByNetwork) {
        const client = this._getApolloClient(networkId)
        const query = closedAuctions
          ? this.getMostInterestingClosedAuctionDetailsQuery()
          : this.getMostInterestingAuctionDetailsQuery()

        promises.push(
          client.query({
            query,
            variables: {
              // unix timestamp in seconds
              currentTimeStamp: Math.round(new Date().getTime() / 1000),
              count: 4,
            },
          }),
        )
      }

      // The Promise.allSettled() method returns a promise that resolves
      // after all of the given promises have either fulfilled or rejected.
      const results: PromiseSettledResult<ApolloQueryResult<any>>[] = await Promise.allSettled(
        promises,
      )
      const allInterestingAuctions = []
      for (const res of results) {
        if (res.status === 'rejected') {
          logger.error('Error getting most interesting auction details: ', res.reason)
        }

        if (res.status === 'fulfilled') {
          if (res.value.error) {
            // backend returns {"message":"invalid url query"}
            // for bad requests
            logger.error('Error getting most interesting auction details: ', res.value.error)
          } else {
            allInterestingAuctions.push(
              (await res.value.data.auctionDetails).map((auctionDetail: any) =>
                formatAuctionInfoFromApi(auctionDetail),
              ),
            )
          }
        }
      }

      const allInterestingAuctionsOrdered = allInterestingAuctions.sort(
        (auctionA, auctionB) => auctionB.interestScore - auctionA.interestScore,
      )
      return allInterestingAuctionsOrdered.flat()
    } catch (error: any) {
      logger.error(error)
      throw new Error(`Failed to query interesting auctions: ${error.message}`)
    }
  }

  public async getPreviousOrder(params: PreviousOrderParams): Promise<string> {
    try {
      const query = this.getPreviousOrderQuery()
      const client = this._getApolloClient(`${params.networkId}`)

      const res = await client.query({
        query,
        variables: {
          id: params.auctionId,
          price: params.price,
        },
      })

      if (res.error) {
        // backend returns {"message":"invalid url query"}
        // for bad requests
        throw res.error
      }
      let order = res.data.auctionDetail.ordersWithoutClaimed[0]
      if (!order) {
        return queueStartElement
      }
      // Sort the orders by their price and volume
      const sortedOrders = [...res.data.auctionDetail.ordersWithoutClaimed].sort((a, b) => {
        if (a.price === b.price) return a.volume - b.volume
        return a.price - b.price
      })
      order = sortedOrders[0]
      order = {
        userId: BigInt(order.userId),
        buyAmount: BigInt(order.buyAmount),
        sellAmount: BigInt(order.sellAmount),
      }
      return await encodeOrder(order)
    } catch (error: any) {
      logger.error(error)

      const { auctionId, order } = params

      throw new Error(
        `Failed to query previous order for auction id ${auctionId} and order ${encodeOrder(
          order,
        )}: ${error.message}`,
      )
    }
  }

  public async getUserId(params: GetUserIdParams): Promise<string> {
    try {
      const query = this.getUserIdQuery()
      const client = this._getApolloClient(`${params.networkId}`)

      const res = await client.query({
        query,
        variables: {
          address: params.address,
        },
      })

      if (res.error) {
        throw res.error
      }

      return res.data.users[0]?.id
    } catch (error: any) {
      logger.error(error)

      const { address } = params

      throw new Error(`Failed to query for user id for address ${address}: ${error.message}`)
    }
  }

  public async getAllUserOrders(params: UserOrderParams): Promise<string[]> {
    try {
      const query = this.getAllUserOrdersQuery()
      const client = this._getApolloClient(`${params.networkId}`)

      const res = await client.query({
        query,
        variables: {
          auctionId: params.auctionId,
          userAddress: params.user,
        },
      })

      if (res.error) {
        // backend returns {"message":"invalid url query"}
        // for bad requests
        throw res.error
      }
      return res.data.auctionDetail.orders.map((order: any) =>
        encodeOrder({
          userId: BigInt(order.userId),
          buyAmount: BigInt(order.buyAmount),
          sellAmount: BigInt(order.sellAmount),
        }),
      )
    } catch (error: any) {
      logger.error(error)

      const { auctionId, user } = params

      throw new Error(
        `Failed to query previous order for auction id ${auctionId} and order ${user}: ${error.message}`,
      )
    }
  }
  public async getCurrentUserOrders(params: UserOrderParams): Promise<string[]> {
    try {
      const query = this.getCurrentUserOrdersQuery()
      const client = this._getApolloClient(`${params.networkId}`)
      const res = await client.query({
        query,
        variables: {
          auctionId: params.auctionId,
          userId: params.user,
        },
      })

      if (res.error) {
        // backend returns {"message":"invalid url query"}
        // for bad requests
        throw res.error
      }
      return res.data.auctionDetail.ordersWithoutClaimed
    } catch (error: any) {
      logger.error(error)

      const { auctionId, user } = params

      throw new Error(
        `Failed to query previous order for auction id ${auctionId} and order ${user}: ${error.message}`,
      )
    }
  }

  public async getClearingPriceOrderAndVolume(
    params: OrderBookParams,
  ): Promise<ClearingPriceAndVolumeData> {
    try {
      const query = this.getClearingPriceOrderAndVolumeQuery()

      const client = this._getApolloClient(`${params.networkId}`)

      const res = await client.query({
        query: query,
        variables: {
          id: params.auctionId,
        },
      })

      if (res.error) {
        // backend returns {"message":"invalid url query"}
        // for bad requests
        throw res.error
      }
      const auctionDetails = res.data.auctionDetail
      if (
        auctionDetails.currentClearingOrderSellAmount === '0' &&
        auctionDetails.currentClearingOrderBuyAmount === '0'
      ) {
        return {
          clearingOrder: {
            sellAmount: BigInt(auctionDetails.exactOrder.buyAmount),
            buyAmount: BigInt(auctionDetails.exactOrder.sellAmount),
            userId: BigInt('0'),
          },
          volume: BigInt(0),
        }
      }
      return {
        clearingOrder: {
          sellAmount: BigInt(auctionDetails.currentClearingOrderSellAmount),
          buyAmount: BigInt(auctionDetails.currentClearingOrderBuyAmount),
          userId: BigInt('0'),
        },
        volume: BigInt(
          Math.trunc(auctionDetails.currentVolume).toLocaleString('fullwide', {
            useGrouping: false,
            maximumSignificantDigits: 20,
          }),
        ),
      }
    } catch (error: any) {
      logger.error(error)

      const { auctionId } = params

      throw new Error(
        `Failed to query clearing price order for auction  id ${auctionId} : ${error.message}`,
      )
    }
  }

  public async getOrderBookData(params: OrderBookParams): Promise<OrderBookData> {
    try {
      const query = this.getOrderBookDisplayQuery()

      const client = this._getApolloClient(`${params.networkId}`)

      const res = await client.query({
        query,
        variables: {
          id: params.auctionId,
        },
      })

      if (res.error) {
        // backend returns {"message":"invalid url query"}
        // for bad requests
        throw res.error
      }
      const exactOrder = await res.data.asks?.exactOrder
      const asks = {
        price: parseFloat(exactOrder.price),
        volume: parseFloat(exactOrder.volume),
      }
      const bids = ((await res.data.bids?.orders) || [])
        .map((bid: any) => ({
          price: parseFloat(bid.price),
          volume: parseFloat(bid.volume),
        }))
        .sort((a: any, b: any) => {
          if (a.price === b.price) return b.volume - a.volume
          return b.price - a.price
        })
      return {
        asks: [asks],
        bids: bids,
      }
    } catch (error: any) {
      logger.error(error)

      const { auctionId } = params

      throw new Error(
        `Failed to query orderbook data for auction  id ${auctionId} : ${error.message}`,
      )
    }
  }

  public getAuctionDescriptionUrl(params: GetAuctionDescriptionParams): string {
    const { auctionId, chainId } = params
    const baseUrl = PINATA_BASE_URL
    return `${baseUrl}data/pinList?status=pinned&metadata[name]=${chainId}-${auctionId}&metadata[keyvalues][type]={"value":"auctionInfo","op":"eq"}`
  }

  public async getAuctionDescription(
    params: GetAuctionDescriptionParams,
  ): Promise<Maybe<AuctionDescription>> {
    try {
      const url = this.getAuctionDescriptionUrl(params)

      const res = await fetch(url, {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      })
      if (!res.ok) {
        throw await res.json()
      }

      const response = await res.json()
      if (response.rows?.length === 0) {
        return null
      }

      const cidData = response.rows[0].ipfs_pin_hash
      if (!cidData) {
        return null
      }
      const baseUrl = PINATA_QUERY_URL
      const auctionDescriptionRes = await fetch(`${baseUrl}${cidData}`)

      if (!auctionDescriptionRes.ok) {
        throw await res.json()
      }
      const auctionDesc = await auctionDescriptionRes.json()
      const { description, discordUrl, shortSummary, siteUrl, ticker, tokenName, twitterUrl } =
        auctionDesc
      const auctionDescription = {
        ticker: ticker || '',
        tokenName: tokenName || '',
        siteUrl: siteUrl || '',
        discordUrl: discordUrl || '',
        twitterUrl: twitterUrl || '',
        shortSummary: shortSummary || '',
        description: description || '',
      }

      return auctionDescription
    } catch (err: any) {
      logger.error(err)
      return null
    }
  }

  public getSignatureUrl(params: GetSignatureParams): string {
    const { address, auctionId, networkId } = params
    const baseUrl = PINATA_BASE_URL
    return `${baseUrl}data/pinList?status=pinned&metadata[name]=${networkId}-${auctionId}-${address}`
  }

  public async getSignature(params: GetSignatureParams): Promise<Maybe<Signature | string>> {
    try {
      const url = await this.getSignatureUrl(params)

      const res = await fetch(url, {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      })
      if (!res.ok) {
        // backend returns {"message":"invalid url query"}
        // for bad requests
        throw await res.json()
      }
      const response = await res.json()
      if (response.rows?.length === 0) {
        return '0x'
      }
      const cidData = response.rows[0].ipfs_pin_hash
      if (!cidData) {
        return '0x'
      }
      const baseUrl = PINATA_QUERY_URL
      const signatureRes = await fetch(`${baseUrl}${cidData}`)
      if (!signatureRes.ok) {
        throw await res.json()
      }
      return signatureRes.json()
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  private _getApolloClient(networkId: string): ApolloClient<NormalizedCacheObject> {
    const client = this.clientsByNetwork[parseInt(networkId)]
    if (typeof client === 'undefined') {
      throw new Error(
        `REACT_APP_GRAPH_API_URL must be a defined environment variable for network ${networkId}`,
      )
    }

    return client
  }
}
