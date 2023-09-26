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
      color: 'success.main',
    }
  }

  if (auctionState === AuctionState.CLAIMING) {
    return {
      label: 'Completed',
      color: 'success.dark',
    }
  }

  if (auctionState === AuctionState.NOT_YET_STARTED) {
    return {
      label: 'Not Yet Started',
      color: 'secondary.light',
    }
  }

  return {
    label: 'Error',
    color: 'error.light',
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
          color: 'primary.dark',
          fontWeight: 700,
        },
        '& .MuiChip-root': {
          borderRadius: '5px !important',
        },
      }}
    />
  )
}

export default AuctionStatus
