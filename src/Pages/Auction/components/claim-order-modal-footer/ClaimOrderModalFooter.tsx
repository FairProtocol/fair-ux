import { useMemo } from 'react'

import { Divider, Grid, Typography } from '@mui/material'

import { TokenAmount } from '../../../../utils/entities/fractions/tokenAmount'
import { Token } from '../../../../utils/entities/token'
import { getTokenDisplay } from '../../../../utils/tools'
import './ClaimOrderModalFooter.scss'

interface ClaimOrderModalFooterProps {
  auctioningToken?: Token
  biddingToken?: Token
  claimableBiddingToken: Maybe<TokenAmount>
  claimableAuctioningToken: Maybe<TokenAmount>
  chainId: number
  isWorking: boolean
  onClaim: () => any
}

const ClaimOrderModalFooter: React.FC<ClaimOrderModalFooterProps> = ({
  auctioningToken,
  biddingToken,
  chainId,
  claimableAuctioningToken,
  claimableBiddingToken,
  isWorking,
  onClaim,
}) => {
  const biddingTokenDisplay = useMemo(
    () => getTokenDisplay(biddingToken, chainId),
    [biddingToken, chainId],
  )

  const auctioningTokenDisplay = useMemo(
    () => getTokenDisplay(auctioningToken, chainId),
    [auctioningToken, chainId],
  )

  return (
    <Grid className="claim-order-footer">
      <Grid className="claim-order-footer_item" item>
        <div>
          <Typography className="claim-order-footer_item_text">
            {biddingTokenDisplay} tokens received
          </Typography>
        </div>
        <Typography className="claim-order-footer_item_text_amount">
          {claimableBiddingToken ? `${claimableBiddingToken.toSignificant(6)} ` : `0.00`}{' '}
          {biddingTokenDisplay}
        </Typography>
      </Grid>
      <Divider />
      <Grid className="claim-order-footer_item" item>
        <div>
          <Typography className="claim-order-footer_item_text">
            {auctioningTokenDisplay} tokens received
          </Typography>
        </div>
        <Typography className="claim-order-footer_item_text_amount">
          {claimableAuctioningToken ? `${claimableAuctioningToken.toSignificant(6)} ` : `0.00`}{' '}
          {auctioningTokenDisplay}
        </Typography>
      </Grid>
      {!isWorking && (
        <Grid className="claim-order-footer_button-wrap" item>
          <div className="claim-order-footer_button" onClick={onClaim}>
            Confirm
          </div>
        </Grid>
      )}
    </Grid>
  )
}

export default ClaimOrderModalFooter
