import {
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
  zkSync,
  zkSyncTestnet,
} from '../utils/networkConfig'

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256',
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: BigInt('0xff'),
  [SolidityType.uint256]: BigInt(
    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  ),
}

export const EASY_AUCTION_NETWORKS = {
  [mainnet.id]: '0x0b7fFc1f4AD541A4Ed16b40D8c37f0929158D101',
  [goerli.id]: '0x1fBAb40C338E2e7243DA945820Ba680C92EF8281',
  [gnosis.id]: '0x0b7fFc1f4AD541A4Ed16b40D8c37f0929158D101',
  [polygon.id]: '0x0b7fFc1f4AD541A4Ed16b40D8c37f0929158D101',
  [polygonMumbai.id]: '0x4100aF1E6e8bBc174fc5da4D409e1e3C03F1f85E',
  [avalanche.id]: '0xb5D00F83680ea5E078e911995c64b43Fbfd1eE61',
  [avalancheFuji.id]: '0xa5cd8D8effACB7Ad861e3797404924199D1463a5',
  [base.id]: '0xcAe780DdD607C2081fbB4654E719f77F5e8907BF',
  [baseGoerli.id]: '0x231F3Fd7c3E3C9a2c8A03B72132c31241DF0a26C',
  [bsc.id]: '0x231F3Fd7c3E3C9a2c8A03B72132c31241DF0a26C',
  [bscTestnet.id]: '0x231F3Fd7c3E3C9a2c8A03B72132c31241DF0a26C',
  [sepolia.id]: '0x231F3Fd7c3E3C9a2c8A03B72132c31241DF0a26C',
  [zkSync.id]: '0xef6007C1f933EA2CE68c2385646e5F9F88Bd7a53',
  [zkSyncTestnet.id]: '0x1EddE05b1205Bf9E336B8e8Cf33674EE3FD7b18B',
}

export const DEPOSIT_AND_PLACE_ORDER = {
  [mainnet.id]: '0x10D15DEA67f7C95e2F9Fe4eCC245a8862b9B5B96',
  [goerli.id]: '0xc6e51F2cb369F03672197D0C31Dd5F0d9566217B',
  [gnosis.id]: '0x845AbED0734e39614FEC4245F3F3C88E2da98157',
  [polygon.id]: '0x93D2BbA07b44e8F2b02F7DA164eE4f7442a3B618',
  [polygonMumbai.id]: '0x7f49Ee20f2E83Ca53B08944938E9B6Fad8e3E3B6',
  [avalanche.id]: '0x193c8993480DF4c1dBBdB39dB07511f7D789cedb',
  [avalancheFuji.id]: '0x39cbA0cC28EE67EAa8134C0e80a061c13EBC3603',
  [base.id]: '0x7bd070D175988C9FF97AcCD61170b65a52e2263D',
  [baseGoerli.id]: '0xBDf182cB6a78E43c95F0F3cC11201cf561830368',
  [bsc.id]: '0x4bAbb4b89ed7180aeF95F872f621afEE724F0344',
  [bscTestnet.id]: '0x14082EDeFCa073578d2C16E8fB42967bEc188E59',
  [sepolia.id]: '0xDDeFBcF94d46E771dad74882012704f51CA15ed8',
  [zkSync.id]: '0xC8FEF8fcE092bA7c07a7dD791F1ACD812a48D947',
  [zkSyncTestnet.id]: '0x25D0d1642ea6Ba7284BC12fE2e4d6a4b57c0Dc55',
}

export const ALLOW_LIST_OFF_CHAIN_MANAGED = {
  [mainnet.id]: '0x0F4648d997e486cE06577d6Ee2FecBcA84b834F4',
  [goerli.id]: '0xE0AD16EB7Ea467C694E6cFdd5E7D61FE850e8B53',
  [gnosis.id]: '0x0F4648d997e486cE06577d6Ee2FecBcA84b834F4',
  [polygon.id]: '0x0480A370279B2e70378188E1bd4f1cD7D76D8aD2',
  [polygonMumbai.id]: '0xE0AD16EB7Ea467C694E6cFdd5E7D61FE850e8B53',
  [avalanche.id]: '0x5ae9b340A98085D0fc25Ae98A5eB704bA08E0dF8',
  [avalancheFuji.id]: '0x2f0045AA41879184a283A644F25Ec4FA31C8767E',
  [base.id]: '0xE0AD16EB7Ea467C694E6cFdd5E7D61FE850e8B53',
  [baseGoerli.id]: '0xE0AD16EB7Ea467C694E6cFdd5E7D61FE850e8B53',
  [bsc.id]: '0xE0AD16EB7Ea467C694E6cFdd5E7D61FE850e8B53',
  [bscTestnet.id]: '0xE0AD16EB7Ea467C694E6cFdd5E7D61FE850e8B53',
  [sepolia.id]: '0xE0AD16EB7Ea467C694E6cFdd5E7D61FE850e8B53',
  [zkSync.id]: '0x1730C3221C69A332E4DbFbfdD22f16fd887a00C7',
  [zkSyncTestnet.id]: '0x4B70AC1C00a220a39B03782Cb79D54556Efb8C6E',
}

export const explorerNames = {
  1: 'Etherscan',
  5: 'Etherscan',
  56: 'Bscscan',
  97: 'Bscscan',
  100: 'Blockscout',
  137: 'Polyscan',
  8453: 'Basescan',
  84532: 'Basescan',
  80001: 'Polygscan',
  43114: 'Snowtrace',
  43113: 'Snowtrace',
  280: 'Zkscan',
  324: 'Zkscan',
}

export const unwrapMessage = {
  1: `Unwrap WETH to ETH on Uniswap`,
  5: `Unwrap WETH to ETH on Uniswap`,
  56: `Unwrap WBNB to BNB on Pancakeswap`,
  97: `Unwrap WBNB to BNB on Pancakeswap`,
  100: `Unwrap WXDAI to XDAI on Honeyswap`,
  137: `Unwrap WMATIC to MATIC on Quickswap`,
  8453: `Unwrap WETH to ETH on Uniswap`,
  84531: `Unwrap WETH to ETH on Uniswap`,
  80001: `Unwrap WMATIC to MATIC on Quickswap`,
  43114: `Unwrap WAVAX to AVAX on Quickswap`,
  43113: `Unwrap WAVAX to AVAX on Quickswap`,
  280: `Unwrap WETH to ETH on Uniswap`,
  324: `Unwrap WETH to ETH on Uniswap`,
}

export const positiveNumberRegex = /^\d+(\.\d{1,4})?$/
export const addressRegex = /0x+[A-F,a-f,0-9]{40}/
export const zeroAddressRegex = /^[x0]*$/
