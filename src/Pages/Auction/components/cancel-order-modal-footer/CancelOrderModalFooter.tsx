import { useMemo } from 'react'

import { Grid, Typography } from '@mui/material'

import TokenLogo from '../../../../components/common/token/TokenLogo'
import { Token } from '../../../../utils/entities/token'
import { abbreviation } from '../../../../utils/numeral'
import { getTokenDisplay } from '../../../../utils/tools'
import './CancelOrderModalFooter.scss'

interface CancelOrderModalFooterProps {
  biddingToken?: Token
  chainId: number
  isWorking: boolean
  onCancelOrder: () => any
  sellAmount: string
}

const CancelOrderModalFooter: React.FC<CancelOrderModalFooterProps> = ({
  biddingToken,
  chainId,
  isWorking,
  onCancelOrder,
  sellAmount,
}) => {
  const biddingTokenDisplay = useMemo(
    () => getTokenDisplay(biddingToken, chainId),
    [biddingToken, chainId],
  )

  return (
    <Grid className="cancel-order-footer">
      <Grid className="cancel-order-footer_item" item>
        <div className="cancel-order-footer_item_logo-text">
          {biddingToken && (
            <TokenLogo
              size={24}
              token={{ address: biddingToken.address, symbol: biddingToken.symbol }}
            />
          )}
          <Typography className="cancel-order-footer_item_text cancel-order-footer_item_left-margin">
            {biddingTokenDisplay} tokens received
          </Typography>
        </div>
        <Typography className="cancel-order-footer_item_text_amount">
          {abbreviation(sellAmount, 10)} {biddingTokenDisplay}
        </Typography>
      </Grid>
      {!isWorking && (
        <Grid className="cancel-order-footer_button-wrap" item>
          <div className="cancel-order-footer_button" onClick={onCancelOrder}>
            Confirm
          </div>
        </Grid>
      )}
    </Grid>
  )
}

export default CancelOrderModalFooter
