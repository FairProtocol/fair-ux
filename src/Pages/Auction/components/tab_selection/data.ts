import { ReactComponent as AuctionHammer } from 'src/assets/images/auction_hammer.svg'
import { ReactComponent as Info } from 'src/assets/images/info.svg'
import { ReactComponent as Share } from 'src/assets/images/share.svg'

export const tabs: { name: string; Icon: any }[] = [
  {
    name: 'Auction',
    Icon: AuctionHammer,
  },
  {
    name: 'Information',
    Icon: Info,
  },
  {
    name: 'Share',
    Icon: Share,
  },
]
