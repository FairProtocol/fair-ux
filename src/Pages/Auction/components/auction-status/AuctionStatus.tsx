import { Chip } from '@mui/material'

import { AuctionState } from '../../../../state/types'

interface AuctionStatusProps {
  auctionState: AuctionState
}

const getLabelAndColor = (
  auctionState: AuctionState,
): {
  label: string
  color: string
} => {
  if (auctionState === AuctionState.ORDER_PLACING || AuctionState.ORDER_PLACING_AND_CANCELING) {
    return {
      label: 'In Progress',
      color: '#0DD36B',
    }
  }

  if (auctionState === AuctionState.CLAIMING) {
    return {
      label: 'Completed',
      color: '#E5E1FC',
    }
  }

  if (auctionState === AuctionState.NOT_YET_STARTED) {
    return {
      label: 'Not Yet Started',
      color: '#FFDADA',
    }
  }

  return {
    label: 'Error',
    color: '#FFDADA',
  }
}

const AuctionStatus: React.FC<AuctionStatusProps> = ({ auctionState }) => {
  const { color, label } = getLabelAndColor(auctionState)
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        backgroundColor: color,
        '& .MuiChip-label': {
          color: '#180B2D',
          fontFamily: 'Nunito-Sans-Bold !important',
        },
        '& .MuiChip-root': {
          borderRadius: '5px !important',
        },
      }}
    />
  )
}

export default AuctionStatus
