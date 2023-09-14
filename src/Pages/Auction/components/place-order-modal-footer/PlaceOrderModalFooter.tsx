import React, { useMemo } from 'react'

import { Divider, Grid, Typography } from '@mui/material'

import TokenLogo from '../../../../components/common/token/TokenLogo'
import { Fraction } from '../../../../utils/entities/fractions/fraction'
import { Token } from '../../../../utils/entities/token'
import { abbreviation } from '../../../../utils/numeral'
import { convertPriceIntoBuyAndSellAmount } from '../../../../utils/prices'
import { getTokenDisplay } from '../../../../utils/tools'
import './PlaceOrderModalFooter.scss'

interface PlaceOrderModalFooterProps {
  auctioningToken?: Token
  biddingToken?: Token
  cancelDate?: string
  hasRiskNotCoveringClearingPrice: boolean
  isWorking: boolean
  orderPlacingOnly?: boolean
  onPlaceOrder: () => any
  price: string
  sellAmount: string
  chainId: number
}

const PlaceOrderModalFooter: React.FC<PlaceOrderModalFooterProps> = ({
  auctioningToken,
  biddingToken,
  cancelDate,
  chainId,
  hasRiskNotCoveringClearingPrice,
  isWorking,
  onPlaceOrder,
  orderPlacingOnly,
  price,
  sellAmount,
}) => {
  const { buyAmountScaled } = convertPriceIntoBuyAndSellAmount(
    auctioningToken,
    biddingToken,
    price,
    sellAmount,
  )

  let minimumReceived = undefined
  if (sellAmount != undefined && buyAmountScaled != undefined && auctioningToken !== undefined) {
    minimumReceived = new Fraction(
      buyAmountScaled.toString(),
      BigInt(10 ** auctioningToken.decimals).toString(),
    )
  }

  const biddingTokenDisplay = useMemo(
    () => getTokenDisplay(biddingToken, chainId),
    [biddingToken, chainId],
  )
  const auctioningTokenDisplay = useMemo(
    () => getTokenDisplay(auctioningToken, chainId),
    [auctioningToken, chainId],
  )

  return (
    <Grid className="place-order-footer">
      <Grid className="place-order-footer_item" item>
        <div className="place-order-footer_item_logo-text">
          {auctioningToken && (
            <TokenLogo
              size={24}
              token={{ address: auctioningToken.address, symbol: auctioningToken.symbol }}
            />
          )}
          <Typography className="place-order-footer_item_text place-order-footer_item_left-margin">
            Minimum {auctioningTokenDisplay} tokens received
          </Typography>
        </div>
        <Typography className="place-order-footer_item_text_amount">
          {abbreviation(minimumReceived?.toSignificant(4), 10)} {auctioningTokenDisplay}
        </Typography>
      </Grid>
      <Divider />
      <Grid className="place-order-footer_item" item>
        <div className="place-order-footer_item_logo-text">
          {biddingToken && (
            <TokenLogo
              size={24}
              token={{ address: biddingToken.address, symbol: biddingToken.symbol }}
            />
          )}
          <Typography className="place-order-footer_item_text place-order-footer_item_left-margin">
            {biddingTokenDisplay} tokens sold
          </Typography>
        </div>
        <Typography className="place-order-footer_item_text_amount">
          {abbreviation(sellAmount, 10)} {biddingTokenDisplay}
        </Typography>
      </Grid>
      <Divider />
      <Grid className="place-order-footer_item" item>
        <div>
          <Typography className="place-order-footer_item_text">
            Max {auctioningTokenDisplay} per {biddingTokenDisplay}
          </Typography>
        </div>
        <Typography className="place-order-footer_item_text_amount">
          {abbreviation(price, 10)} {auctioningTokenDisplay}
        </Typography>
      </Grid>
      {orderPlacingOnly && !cancelDate && (
        <Typography className="place-order-footer_warning">
          Remember: You won&apos;t be able to cancel this order after you click the{' '}
          <strong>&quot;Confirm&quot;</strong>
          button.
        </Typography>
      )}
      {cancelDate && (
        <Typography className="place-order-footer_warning">
          Remember: After <strong>{cancelDate}</strong> orders cannot be canceled.
        </Typography>
      )}
      {hasRiskNotCoveringClearingPrice && (
        <Typography className="place-order-footer_warning">
          You are placing an order <strong>{'below'}</strong> the current clearing price. Most
          likely your order will not succeed in buying <strong>{auctioningToken?.symbol}</strong>.
        </Typography>
      )}
      {!isWorking && (
        <Grid className="confirmation-modal_button-wrap" item>
          <button className="confirmation-modal_button" onClick={onPlaceOrder}>
            Confirm
          </button>
        </Grid>
      )}
    </Grid>
  )
}

export default PlaceOrderModalFooter
