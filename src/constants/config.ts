// Export env vars
export const PUBLIC_URL = import.meta.env.PUBLIC_URL

// API endpoints for several environments
export const GRAPH_API_URL_DEVELOP_GOERLI =
  import.meta.env.VITE_GRAPH_API_URL_GOERLI ||
  'https://api.thegraph.com/subgraphs/name/gnosis-auction/ga-goerli'
export const GRAPH_API_URL_PRODUCTION_GOERLI =
  import.meta.env.VITE_GRAPH_API_URL_GOERLI ||
  'https://api.studio.thegraph.com/query/48300/fp-goerli/version/latest'
export const GRAPH_API_URL_DEVELOP_MAINNET =
  import.meta.env.VITE_GRAPH_API_URL_MAINNET ||
  'https://api.thegraph.com/subgraphs/name/gnosis-auction/ga-mainnet'
export const GRAPH_API_URL_PRODUCTION_MAINNET =
  import.meta.env.VITE_GRAPH_API_URL_MAINNET ||
  'https://api.studio.thegraph.com/query/48300/fp-mainnet/version/latest'
export const GRAPH_API_URL_DEVELOP_POLYGON =
  import.meta.env.VITE_GRAPH_API_URL_POLYGON ||
  'https://thegraph.com/hosted-service/subgraph/gnosis-auction/ga-polygon'
export const GRAPH_API_URL_PRODUCTION_POLYGON =
  import.meta.env.VITE_GRAPH_API_URL_POLYGON ||
  'https://api.studio.thegraph.com/query/48300/fp-polygon/version/latest'
export const GRAPH_API_URL_DEVELOP_XDAI =
  import.meta.env.VITE_GRAPH_API_URL_XDAI ||
  'https://api.studio.thegraph.com/query/48300/fp-gnosis/version/latest'
export const GRAPH_API_URL_PRODUCTION_XDAI =
  import.meta.env.VITE_GRAPH_API_URL_XDAI ||
  'https://api.studio.thegraph.com/query/48300/fp-gnosis/version/latest'
export const GRAPH_API_URL_DEVELOP_MUMBAI =
  import.meta.env.VITE_GRAPH_API_URL_MUMBAI ||
  'https://api.studio.thegraph.com/query/48300/fp-mumbai/version/latest'
export const GRAPH_API_URL_PRODUCTION_MUMBAI =
  import.meta.env.VITE_GRAPH_API_URL_MUMBAI ||
  'https://api.studio.thegraph.com/query/48300/fp-mumbai/version/latest'
export const GRAPH_API_URL_DEVELOP_AVALANCHE =
  import.meta.env.VITE_GRAPH_API_URL_AVALANCHE ||
  'https://api.thegraph.com/subgraphs/name/gnosis-auction/ga-avax'
export const GRAPH_API_URL_PRODUCTION_AVALANCHE =
  import.meta.env.VITE_GRAPH_API_URL_AVALANCHE ||
  'https://api.studio.thegraph.com/query/48300/fp-avalanche/version/latest'
export const GRAPH_API_URL_DEVELOP_FUJI =
  import.meta.env.VITE_GRAPH_API_URL_FUJI ||
  'https://api.thegraph.com/subgraphs/name/gnosis-auction/ga-fuji'
export const GRAPH_API_URL_PRODUCTION_FUJI =
  import.meta.env.VITE_GRAPH_API_URL_FUJI ||
  'https://api.studio.thegraph.com/query/48300/fp-avalanche/version/latest'
export const GRAPH_API_URL_DEVELOP_BSC =
  import.meta.env.VITE_GRAPH_API_URL_BSC ||
  'https://api.thegraph.com/subgraphs/name/gnosis-auction/ga-bnb'
export const GRAPH_API_URL_PRODUCTION_BSC =
  import.meta.env.VITE_GRAPH_API_URL_BSC ||
  'https://api.thegraph.com/subgraphs/name/gnosis-auction/ga-bnb'
export const GRAPH_API_URL_DEVELOP_BSC_TESTNET =
  import.meta.env.VITE_GRAPH_API_URL_BSC_TESTNET || ''
export const GRAPH_API_URL_PRODUCTION_BSC_TESTNET =
  import.meta.env.VITE_GRAPH_API_URL_BSC_TESTNET || ''
export const GRAPH_API_URL_DEVELOP_BASE_TESTNET =
  import.meta.env.VITE_GRAPH_API_URL_BASE_TESTNET ||
  'https://api.studio.thegraph.com/query/48300/fp-base-testnet/version/latest'
export const GRAPH_API_URL_PRODUCTION_BASE_TESTNET =
  import.meta.env.VITE_GRAPH_API_URL_BASE_TESTNET ||
  'https://api.studio.thegraph.com/query/48300/fp-base-testnet/version/latest'
export const GRAPH_API_URL_DEVELOP_BASE_MAINNET =
  import.meta.env.VITE_GRAPH_API_URL_BASE_MAINNET ||
  'https://api.studio.thegraph.com/query/48300/fp-base/version/latest'
export const GRAPH_API_URL_PRODUCTION_BASE_MAINNET =
  import.meta.env.VITE_GRAPH_API_URL_BASE_MAINNET ||
  'https://api.studio.thegraph.com/query/48300/fp-base/version/latest'

// Infura bridges like 'https://mainnet.infura.io/v3/...'
export const NETWORK_URL_GOERLI =
  import.meta.env.VITE_NETWORK_URL_GOERLI ||
  `https://goerli.infura.io/v3/${import.meta.env.VITE_INFURA_ID}`
export const NETWORK_URL_MAINNET =
  import.meta.env.VITE_NETWORK_URL_MAINNET ||
  `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_ID}`
export const NETWORK_URL_POLYGON =
  import.meta.env.VITE_NETWORK_URL_POLYGON || 'https://polygon-rpc.com'
export const NETWORK_URL_XDAI =
  import.meta.env.VITE_NETWORK_URL_XDAI || 'https://rpc.xdaichain.com/'
export const NETWORK_URL_MUMBAI =
  import.meta.env.VITE_NETWORK_URL_MUMBAI || 'https://rpc-mumbai.maticvigil.com/'
export const NETWORK_URL_AVALANCHE =
  import.meta.env.VITE_NETWORK_URL_AVALANCHE || 'https://rpc.ankr.com/avalanche'
export const NETWORK_URL_FUJI =
  import.meta.env.VITE_NETWORK_URL_FUJI || 'https://rpc.ankr.com/avalanche_fuji'
export const NETWORK_URL_BSC =
  import.meta.env.VITE_NETWORK_URL_BSC || 'https://bsc-dataseed.binance.org/'
export const NETWORK_URL_BSC_TESTNET =
  import.meta.env.VITE_NETWORK_URL_BSC_TESTNET || 'https://data-seed-prebsc-1-s1.binance.org:8545/'

export const INFURA_KEY = import.meta.env.VITE_INFURA_ID || ''
export const WALLET_CONNECT_PROJECT_ID = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || ''

// Wallet connect keys
export const FORTMATIC_KEY = import.meta.env.VITE_FORTMATIC_KEY || ''
export const PORTIS_ID = import.meta.env.VITE_PORTIS_ID || ''

// Other stuff
export const GOOGLE_ANALYTICS_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID || ''
export const GIT_COMMIT_HASH = import.meta.env.VITE_GIT_COMMIT_HASH || ''
export const INSTANCE = import.meta.env.VITE_INSTANCE || ''
export const IS_PROD = INSTANCE === 'prod' || INSTANCE === 'production'

// Pinata keys
export const PINATA_API_KEY = import.meta.env.VITE_PINATA_KEY || ''
export const PINATA_SECRET_API_KEY = import.meta.env.VITE_PINATA_SECRET || ''

export const MAX_DECIMALS_PRICE_FORMAT = 12
export const NUMBER_OF_DIGITS_FOR_INVERSION = 6

export const PINATA_BASE_URL = 'https://api.pinata.cloud/'
export const PINATA_QUERY_URL = 'https://gateway.pinata.cloud/ipfs/'
export const PINATA_PIN_JSON_URL = `${PINATA_BASE_URL}pinning/pinJSONToIPFS`
export const PINATA_DATA_URL = `${PINATA_BASE_URL}data/`
export const PINATA_WHITELIST_URL = (auctionId: string) =>
  `${PINATA_DATA_URL}pinList?status=pinned&metadata[keyvalues][auctionId]={"value":"${auctionId}","op":"eq"}&pageLimit=1000`

export const isDev = import.meta.env.NODE_ENV === 'development'
export const ZeroAddress = '0x0000000000000000000000000000000000000000'

export const STABLE_TOKENS_FOR_INVERTED_CHARTS = [
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa',
]

export const queueStartElement =
  '0x0000000000000000000000000000000000000000000000000000000000000001'
export const queueLastElement = '0xffffffffffffffffffffffffffffffffffffffff000000000000000000000001'
