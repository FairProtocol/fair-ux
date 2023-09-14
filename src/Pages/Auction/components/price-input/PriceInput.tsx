import { useMemo } from 'react'

import { Grid, InputBase, Typography } from '@mui/material'

import './PriceInput.scss'
import { FieldRowInfoProps, InfoType } from '../../../../state/types'
import { Token } from '../../../../utils/entities/token'
import { getTokenDisplay } from '../../../../utils/tools'

interface PriceInputProps {
  chainId: number
  info: FieldRowInfoProps | null
  onUserPriceInput: (val: string) => void
  tokens: { auctioningToken: Token | undefined; biddingToken: Token | undefined } | null
  value: string
}

const PriceInput: React.FC<PriceInputProps> = ({
  chainId,
  info,
  onUserPriceInput,
  tokens,
  value,
}) => {
  const { auctioningTokenDisplay, biddingTokenDisplay } = useMemo(() => {
    if (tokens && chainId && tokens.auctioningToken && tokens.biddingToken) {
      return {
        auctioningTokenDisplay: getTokenDisplay(tokens.auctioningToken, chainId),
        biddingTokenDisplay: getTokenDisplay(tokens.biddingToken, chainId),
      }
    } else {
      return { auctioningTokenDisplay: '-', biddingTokenDisplay: '-' }
    }
  }, [chainId, tokens])

  const hasError = info?.type === InfoType.error

  return (
    <>
      <Grid className={`price-input ${hasError && 'price-input_error'}`} container>
        <Grid className="price-input_header" item xs={12}>
          <Typography className="price-input_header_text">
            Max Bidding Price Per {auctioningTokenDisplay}
          </Typography>
        </Grid>
        <Grid className="price-input_input" item xs={12}>
          <InputBase
            className="price-input_input_text"
            margin="none"
            onChange={(e) => onUserPriceInput(e.target.value)}
            placeholder="0.0"
            size="small"
            sx={{
              color: '#5940C1',
            }}
            value={value}
          />
          <Typography className="price-input_input_text price-input_input_text_symbol">
            {biddingTokenDisplay}
          </Typography>
        </Grid>
      </Grid>
      {hasError && <Typography className="price-input_error-text">{info.text}</Typography>}
    </>
  )
}

export default PriceInput
