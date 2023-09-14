import { configureChains, createConfig } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector as WC } from 'wagmi/connectors/walletConnect'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import {
  ChainId,
  NETWORK_CONFIGS,
  avalanche,
  bsc,
  gnosis,
  goerli,
  mainnet,
  polygon,
  polygonMumbai,
  sepolia,
} from './../utils/networkConfig'
import { INFURA_KEY, IS_PROD, WALLET_CONNECT_PROJECT_ID } from '../constants/config'

const chainInstance = IS_PROD
  ? [mainnet, gnosis, polygon, avalanche, bsc]
  : [polygonMumbai, sepolia, goerli]

// @ts-ignore
const { chains, publicClient } = configureChains(chainInstance, [
  infuraProvider({ apiKey: INFURA_KEY }),
  publicProvider(),
])

export { chains }

const metamaskConnector = new MetaMaskConnector({ chains })
const coinbaseWalletConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: 'gnosis-auction',
    jsonRpcUrl: `${mainnet.rpcUrls.public.http}`,
  },
})

export const injected = new InjectedConnector({ chains })
export const walletConnectConnector = new WC({
  chains,
  options: {
    projectId: WALLET_CONNECT_PROJECT_ID,
    metadata: {
      name: 'gnosis-auction',
      description: 'Decentralised token price discovery platform',
      url: 'gnosis-auction.eth',
      icons: [],
    },
  },
})

export const config = createConfig({
  autoConnect: true,
  connectors: [metamaskConnector, injected, coinbaseWalletConnector, walletConnectConnector],
  publicClient,
})

const urls: string[] = []

// TOOD Try to use reduce to improve types
const rpcs: any = {}

const chainIds = Object.keys(NETWORK_CONFIGS).map(Number)
chainIds.forEach((chainId: ChainId) => {
  if (NETWORK_CONFIGS[chainId].rpcUrls.default) {
    urls[chainId] = `${NETWORK_CONFIGS[chainId].rpcUrls.default.http}`
    rpcs[chainId] = NETWORK_CONFIGS[chainId].rpcUrls.default.http
  }
})
