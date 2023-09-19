import {
  Chain,
  avalanche,
  avalancheFuji,
  base,
  baseGoerli,
  bsc,
  bscTestnet,
  gnosis,
  goerli,
  mainnet,
  polygon,
  polygonMumbai,
  sepolia,
} from 'wagmi/chains'

export {
  avalanche,
  avalancheFuji,
  base,
  baseGoerli,
  bsc,
  bscTestnet,
  gnosis,
  goerli,
  mainnet,
  polygon,
  polygonMumbai,
  sepolia,
}

export enum ChainId {
  MAINNET = 1,
  GÖRLI = 5,
  BSC = 56,
  BSCTESTNET = 97,
  XDAI = 100,
  MATIC = 137,
  MUMBAI = 80001,
  AVALANCHE = 43114,
  FUJI = 43113,
  SEPOLIA = 11155111,
  BASE = 8453,
  BASETESTNET = 84531,
}

export const NETWORK_CONFIGS: {
  [chainId in ChainId]: Chain
} = {
  [mainnet.id]: mainnet,
  [goerli.id]: goerli,
  [gnosis.id]: gnosis,
  [polygon.id]: polygon,
  [polygonMumbai.id]: polygonMumbai,
  [bsc.id]: bsc,
  [bscTestnet.id]: bscTestnet,
  [avalanche.id]: avalanche,
  [avalancheFuji.id]: avalancheFuji,
  [sepolia.id]: sepolia,
  [base.id]: base,
  [baseGoerli.id]: baseGoerli,
}
