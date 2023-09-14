import React, { Fragment } from 'react'

import { Grid, InputBase, Typography } from '@mui/material'
import { useAccount } from 'wagmi'

import './AmountInput.scss'
import { ApprovalState } from '../../../../hooks/useApproveCallback'
import { FieldRowInfoProps, InfoType } from '../../../../state/types'
import { Token } from '../../../../utils/entities/token'
import { getTokenDisplay } from '../../../../utils/tools'

interface unlockProps {
  isLocked: boolean
  onUnlock: () => void
  unlockState: ApprovalState
}

interface wrapProps {
  isWrappable: boolean
  onClick: () => void
}

interface AmountInputProps {
  balance?: string
  chainId: number
  info?: FieldRowInfoProps | null
  onMax?: () => void
  onUserSellAmountInput: (val: string) => void
  token: Token | undefined
  unlock: unlockProps
  wrap: wrapProps
  value: string
}

const AmountInput: React.FC<AmountInputProps> = ({
  balance,
  chainId,
  info,
  onMax,
  onUserSellAmountInput,
  token,
  unlock,
  value,
}) => {
  const { isConnected } = useAccount()

  const hasError = info?.type === InfoType.error
  const isUnlocking = unlock.unlockState === ApprovalState.PENDING

  return (
    <Fragment>
      <Grid className={`amount-input ${hasError && 'amount-input_error'}`} container>
        <Grid className="amount-input_header" item xs={12}>
          <Typography className="amount-input_header_text">Amount</Typography>
          <Typography className="amount-input_header_text">
            Balance: {balance === '0' || !isConnected ? '0.00' : balance}
          </Typography>
        </Grid>
        <Grid className="amount-input_input" item xs={12}>
          <InputBase
            className="amount-input_input_text"
            margin="none"
            onChange={(e) => onUserSellAmountInput(e.target.value)}
            placeholder="0.0"
            size="small"
            sx={{
              color: '#5940C1',
            }}
            value={value}
          />
          <Typography className="amount-input_input_text amount-input_input_text_symbol">
            {getTokenDisplay(token, chainId)}
          </Typography>
        </Grid>
        <Grid className="amount-input_buttons" item xs={12}>
          <Typography className="amount-input_buttons_text" onClick={onMax}>
            MAX
          </Typography>
          {unlock.isLocked && (
            <Typography
              className={`amount-input_buttons_text-unlock ${
                false && 'amount-input_buttons_text-unlock_disabled'
              }`}
              onClick={unlock.onUnlock}
            >
              {isUnlocking ? 'Unlocking...' : 'Unlock'}
            </Typography>
          )}
        </Grid>
      </Grid>
      {hasError && <Typography className="amount-input_error-text">{info.text}</Typography>}
    </Fragment>
  )
}

export default AmountInput
