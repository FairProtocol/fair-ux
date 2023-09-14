import React from 'react'

import { Breakpoint, Dialog, Grid, Typography } from '@mui/material'
import { ReactComponent as Cross } from 'src/assets/images/cross.svg'
import { ReactComponent as SuccessTick } from 'src/assets/images/success-tick.svg'
import { useNetwork } from 'wagmi'

import { useIsMobile } from '../../../../hooks/useIsMobile'
import { getAuctionTitle } from '../../../../utils/auction-helpers'
import { ChainId } from '../../../../utils/networkConfig'
import { getExplorerLink } from '../../../../utils/tools'
import './ConfirmationModal.scss'

interface ConfirmationModalProps {
  attemptingTxn: boolean
  content: React.ReactElement
  hash: string
  isOpen: boolean
  onDismiss: () => void
  pendingConfirmation: boolean
  successMessage?: string
  title?: string
  titleFinished?: string
  titleWorking?: string
  width?: Breakpoint
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  attemptingTxn,
  content,
  hash,
  isOpen,
  onDismiss,
  pendingConfirmation,
  successMessage,
  title,
  titleFinished,
  titleWorking,
  width,
}) => {
  const { chain } = useNetwork()
  const isMobile = useIsMobile()
  const chainId = chain?.id
  const isWorking = attemptingTxn && pendingConfirmation
  const isFinished = attemptingTxn && !pendingConfirmation

  return (
    <Dialog
      PaperProps={{ sx: { borderRadius: '0.5em', padding: isMobile ? '1em 0' : '1em 2em' } }}
      fullWidth
      maxWidth={width || 'sm'}
      onClose={onDismiss}
      open={isOpen}
    >
      <>
        <Grid className="confirmation-modal" container>
          <Typography className="confirmation-modal_header">
            {getAuctionTitle({ isFinished, isWorking, title, titleFinished, titleWorking })}
          </Typography>
          <div className="confirmation-modal_cross" onClick={onDismiss}>
            <Cross fill="#222" />
          </div>
          {!isFinished && <>{content}</>}
          {isWorking && (
            <>
              <Grid className="confirmation-modal_button-wrap" item>
                <div className="confirmation-modal_button">Pending...</div>
              </Grid>
              <Typography className="confirmation-modal_wallet-confirm">
                Confirm this transaction in your wallet
              </Typography>
            </>
          )}
          {isFinished && (
            <Grid className="confirmation-modal_finished-wrap" container>
              <Grid item>
                <SuccessTick />
              </Grid>
              <Typography className="confirmation-modal_finished_header">
                {successMessage}
              </Typography>
              {/* TODO: Fix link to add ga-event here */}
              <a
                className="confirmation-modal_finished_link"
                href={getExplorerLink(chainId as ChainId, hash, 'transaction')}
                rel="noreferrer"
                target="_blank"
              >
                {/* @ts-ignore */}
                <span>
                  View deployed transaction <u>here</u>
                </span>
              </a>
            </Grid>
          )}
        </Grid>
      </>
    </Dialog>
  )
}

export default ConfirmationModal
