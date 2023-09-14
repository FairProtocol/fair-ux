import { Typography } from '@mui/material'

import { useAuctionDescription } from '../../../../hooks/useAuctionDescription'
import { AuctionIdentifier } from '../../../../state/types'
import Wrapper from '../wrapper/Wrapper'
import './GeneralInfo.scss'

interface GeneralInfoProps {
  auctionIdentifier: AuctionIdentifier
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ auctionIdentifier }) => {
  const auctionDescription = useAuctionDescription(auctionIdentifier)

  return (
    <Wrapper className="general-info">
      <Typography className="general-info_header">Information</Typography>
      <Typography className="general-info_body">{auctionDescription?.description}</Typography>
    </Wrapper>
  )
}

export default GeneralInfo
