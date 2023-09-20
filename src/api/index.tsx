import {
  AdditionalServicesApi,
  AdditionalServicesApiImpl,
  AdditionalServicesEndpoint,
} from './AdditionalServicesApi'
import { TokenLogosServiceApi, TokenLogosServiceApiInterface } from './TokenLogosServiceApi'
import {
  GRAPH_API_URL_DEVELOP_AVALANCHE,
  GRAPH_API_URL_DEVELOP_BASE_MAINNET,
  GRAPH_API_URL_DEVELOP_BASE_TESTNET,
  GRAPH_API_URL_DEVELOP_BSC,
  GRAPH_API_URL_DEVELOP_BSC_TESTNET,
  GRAPH_API_URL_DEVELOP_FUJI,
  GRAPH_API_URL_DEVELOP_GOERLI,
  GRAPH_API_URL_DEVELOP_MAINNET,
  GRAPH_API_URL_DEVELOP_MUMBAI,
  GRAPH_API_URL_DEVELOP_POLYGON,
  GRAPH_API_URL_DEVELOP_XDAI,
  GRAPH_API_URL_PRODUCTION_AVALANCHE,
  GRAPH_API_URL_PRODUCTION_BASE_MAINNET,
  GRAPH_API_URL_PRODUCTION_BASE_TESTNET,
  GRAPH_API_URL_PRODUCTION_BSC,
  GRAPH_API_URL_PRODUCTION_BSC_TESTNET,
  GRAPH_API_URL_PRODUCTION_FUJI,
  GRAPH_API_URL_PRODUCTION_GOERLI,
  GRAPH_API_URL_PRODUCTION_MAINNET,
  GRAPH_API_URL_PRODUCTION_MUMBAI,
  GRAPH_API_URL_PRODUCTION_POLYGON,
  GRAPH_API_URL_PRODUCTION_XDAI,
  IS_PROD,
} from '../constants/config'

function createAdditionalServiceApi(): AdditionalServicesApi {
  const mainnetConfig: AdditionalServicesEndpoint[] = [
    {
      networkId: 100,
      graph_url_production: GRAPH_API_URL_PRODUCTION_XDAI,
      graph_url_develop: GRAPH_API_URL_DEVELOP_XDAI,
    },
    {
      networkId: 1,
      graph_url_production: GRAPH_API_URL_PRODUCTION_MAINNET,
      graph_url_develop: GRAPH_API_URL_DEVELOP_MAINNET,
    },
    {
      networkId: 137,
      graph_url_production: GRAPH_API_URL_PRODUCTION_POLYGON,
      graph_url_develop: GRAPH_API_URL_DEVELOP_POLYGON,
    },
    {
      networkId: 43114,
      graph_url_production: GRAPH_API_URL_PRODUCTION_AVALANCHE,
      graph_url_develop: GRAPH_API_URL_DEVELOP_AVALANCHE,
    },
    {
      networkId: 56,
      graph_url_production: GRAPH_API_URL_PRODUCTION_BSC,
      graph_url_develop: GRAPH_API_URL_DEVELOP_BSC,
    },
    {
      networkId: 8453,
      graph_url_production: GRAPH_API_URL_PRODUCTION_BASE_MAINNET,
      graph_url_develop: GRAPH_API_URL_DEVELOP_BASE_MAINNET,
    },
  ]
  const testnetConfig: AdditionalServicesEndpoint[] = [
    {
      networkId: 5,
      graph_url_production: GRAPH_API_URL_PRODUCTION_GOERLI,
      graph_url_develop: GRAPH_API_URL_DEVELOP_GOERLI,
    },
    {
      networkId: 80001,
      graph_url_production: GRAPH_API_URL_PRODUCTION_MUMBAI,
      graph_url_develop: GRAPH_API_URL_DEVELOP_MUMBAI,
    },
    {
      networkId: 43113,
      graph_url_production: GRAPH_API_URL_PRODUCTION_FUJI,
      graph_url_develop: GRAPH_API_URL_DEVELOP_FUJI,
    },
    {
      networkId: 97,
      graph_url_production: GRAPH_API_URL_PRODUCTION_BSC_TESTNET,
      graph_url_develop: GRAPH_API_URL_DEVELOP_BSC_TESTNET,
    },
    {
      networkId: 84531,
      graph_url_production: GRAPH_API_URL_PRODUCTION_BASE_TESTNET,
      graph_url_develop: GRAPH_API_URL_DEVELOP_BASE_TESTNET,
    },
  ]
  const config: AdditionalServicesEndpoint[] = [...mainnetConfig]
  if (!IS_PROD) {
    config.push(...testnetConfig)
  }
  const dexPriceEstimatorApi = new AdditionalServicesApiImpl(config)

  // @ts-ignore
  window['dexPriceEstimatorApi'] = dexPriceEstimatorApi
  return dexPriceEstimatorApi
}

// Build APIs
export const additionalServiceApi: AdditionalServicesApi = createAdditionalServiceApi()
export const tokenLogosServiceApi: TokenLogosServiceApiInterface = new TokenLogosServiceApi()
