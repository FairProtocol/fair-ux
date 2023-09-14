import { parse } from 'qs'
import invariant from 'tiny-invariant'
import warning from 'tiny-warning'
import { getAddress } from 'viem'

import { Token, WETH } from './entities/token'
import { ChainId, NETWORK_CONFIGS } from './networkConfig'
import { EASY_AUCTION_NETWORKS, SOLIDITY_TYPE_MAXIMA, SolidityType } from '../constants'
import { AuctionIdentifier, BigintIsh } from '../state/types'

export const getDays = (seconds: number): number => {
  return Math.floor(seconds / 24 / 60 / 60) % 360
}

export const getHours = (seconds: number): number => {
  return Math.floor(seconds / 60 / 60) % 24
}

export const getMinutes = (seconds: number): number => {
  return Math.floor(seconds / 60) % 60
}

export const getSeconds = (seconds: number): number => {
  return Math.floor(seconds % 60)
}

export const calculateTimeLeft = (auctionEndDate: number) => {
  if (isNaN(auctionEndDate)) return -1

  const diff = auctionEndDate - Date.now() / 1000

  if (diff < 0) return -1

  return diff
}

export const elipsify = (address: string, length = 6) => {
  if (address != null) {
    return `${address.slice(0, length)}...${address.slice(address.length - length, address.length)}`
  }
}

export function parseIdParameter(urlParam: any): number {
  return typeof urlParam === 'string' && !isNaN(parseInt(urlParam)) ? parseInt(urlParam) : 1
}

export function parseURL(queryString: string): AuctionIdentifier {
  if (queryString && queryString.length > 1) {
    const parsedQs = parse(queryString, {
      parseArrays: false,
      ignoreQueryPrefix: true,
    })

    return {
      chainId: parseIdParameter(parsedQs.chainId),
      auctionId: parseIdParameter(parsedQs.auctionId),
    }
  }

  return {
    chainId: 1,
    auctionId: 1,
  }
}

export function validateSolidityTypeInstance(value: bigint, solidityType: SolidityType): void {
  invariant(value >= BigInt(0), `${value} is not a ${solidityType}.`)
  invariant(value <= SOLIDITY_TYPE_MAXIMA[solidityType], `${value} is not a ${solidityType}.`)
}

// warns if addresses are not checksummed
export function validateAndParseAddress(address: string): string {
  try {
    const checksummedAddress = getAddress(address)
    warning(address === checksummedAddress, `${address} is not checksummed.`)
    return checksummedAddress
  } catch (error) {
    invariant(false, `${address} is not a valid address.`)
  }
}

export function parseBigintIsh(bigintIsh: BigintIsh): bigint {
  return typeof bigintIsh === 'bigint' ? BigInt(bigintIsh.toString()) : BigInt(bigintIsh)
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function isTimeout(timeId: NodeJS.Timeout | undefined): timeId is NodeJS.Timeout {
  return typeof timeId !== 'undefined'
}

export function getEasyAuctionAddress(chainId: number) {
  // @ts-ignore
  return EASY_AUCTION_NETWORKS[chainId]
}

// Always return a non-undefined token display
export function getTokenDisplay(token: Token | undefined, chainId: number): string {
  if (!token) return `🤔`
  if (isTokenXDAI(token.address, chainId)) return `XDAI`
  if (isTokenWETH(token.address, chainId)) return `ETH`
  if (isTokenWMATIC(token.address, chainId)) return `MATIC`
  return (
    token?.symbol?.slice(0, 7) || token?.name?.slice(0, 7) || token?.address.slice(0, 7) || '🤔'
  )
}

// Always return a non-undefined token display
export function getFullTokenDisplay(token: Token | undefined, chainId: number): string {
  if (!token) return `🤔`
  if (isTokenXDAI(token.address, chainId)) return `XDAI`
  if (isTokenWETH(token.address, chainId)) return `ETH`
  if (isTokenWMATIC(token.address, chainId)) return `MATIC`
  return token?.symbol || token?.name || token?.address || '🤔'
}

export function isTokenXDAI(tokenAddress?: string, chainId?: number): boolean {
  return !!tokenAddress && !!chainId && tokenAddress == WETH[chainId]?.address && chainId === 100
}

export function isTokenWETH(tokenAddress?: string, chainId?: number): boolean {
  return (
    !!tokenAddress &&
    !!chainId &&
    tokenAddress == WETH[chainId]?.address &&
    (chainId === 1 || chainId === 5)
  )
}

export function isTokenWMATIC(tokenAddress?: string, chainId?: number): boolean {
  return !!tokenAddress && !!chainId && tokenAddress == WETH[chainId]?.address && chainId === 137
}

const getExplorerPrefix = (chainId: ChainId) => {
  return (
    NETWORK_CONFIGS[chainId]?.blockExplorers?.default.url ||
    `https://${NETWORK_CONFIGS[chainId]?.blockExplorers?.default.url || ''}etherscan.io`
  )
}

export function getExplorerLink(
  chainId: ChainId,
  data: string,
  type: 'transaction' | 'address',
): string {
  const prefix = getExplorerPrefix(chainId)

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}
