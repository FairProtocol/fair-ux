import { useCallback, useState } from 'react'

import { Grid, Typography } from '@mui/material'
import { ReactComponent as DoubleTick } from 'src/assets/images/double-tick.svg'

import useIsSettled from '../../../../hooks/useIsSettled'
import { AuctionIdentifier } from '../../../../state/types'
import SettleAuctionButton from '../settle-auction-button/SettleAuctionButton'
import Wrapper from '../wrapper/Wrapper'
import './Claimer.scss'

interface ClaimerProps {
  auctionIdentifier: AuctionIdentifier
}

const Claimer: React.FC<ClaimerProps> = ({ auctionIdentifier }) => {
  const [isSettled, settle] = useIsSettled(auctionIdentifier)
  const [txProcessing, setTxProcessing] = useState(false)

  const handleSettle = useCallback(async () => {
    setTxProcessing(true)
    await settle()
    setTxProcessing(false)
  }, [settle, setTxProcessing])

  return (
    <Wrapper className="claimer">
      <Grid item xs={12}>
        <Typography className="claimer_header">Place Order</Typography>
      </Grid>
      <Grid className="claimer_tick" item>
        <DoubleTick />
        <Typography className="claimer_header claimer_margin-top">Auction Ended</Typography>
        <Typography className="claimer_subheader">
          Check your orders below to redeem your tokens
        </Typography>
      </Grid>
      <Grid className="claimer_filler" item />
      {!isSettled && (
        <SettleAuctionButton
          disabled={false}
          handleSettle={handleSettle}
          isSettling={txProcessing}
        />
      )}
    </Wrapper>
  )
}

export default Claimer
