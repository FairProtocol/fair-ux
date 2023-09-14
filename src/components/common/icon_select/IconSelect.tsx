import Avalanche from '../../../assets/icons/avalanche'
import AvalancheFuji from '../../../assets/icons/avalanche_fuji'
import BinanceSmartChainTestnet from '../../../assets/icons/bnb-testnet'
import BNBSmartChain from '../../../assets/icons/bnb_smart_chain'
import Gnosis from '../../../assets/icons/gnosis'
import Goerli from '../../../assets/icons/goerli'
import Ethereum from '../../../assets/icons/homestead'
import PolygonMumbai from '../../../assets/icons/mumbai'
import Polygon from '../../../assets/icons/polygon'

interface IconSelectProps {
  name: string
}

export const IconSelect = (props: IconSelectProps) => {
  const { name } = props

  switch (name) {
    case 'Ethereum':
      return <Ethereum />
    case 'Polygon':
      return <Polygon />
    case 'Gnosis':
      return <Gnosis />
    case 'Avalanche':
      return <Avalanche />
    case 'BNB Smart Chain':
      return <BNBSmartChain />
    case 'Goerli':
      return <Goerli />
    case 'Polygon Mumbai':
      return <PolygonMumbai />
    case 'Avalanche Fuji':
      return <AvalancheFuji />
    case 'Binance Smart Chain Testnet':
      return <BinanceSmartChainTestnet />
    default:
      return <></>
  }
}
