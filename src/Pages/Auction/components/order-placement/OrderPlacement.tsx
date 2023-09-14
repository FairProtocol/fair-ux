import React, { Fragment, useEffect, useMemo, useState } from 'react'

import { Button, Grid, Typography } from '@mui/material'
import { useModal } from 'connectkit'
import { ReactComponent as Calendar } from 'src/assets/images/calendar.svg'
import { ReactComponent as LockBig } from 'src/assets/images/lock-big.svg'
import { ReactComponent as SpinnerLoader } from 'src/assets/images/tail-spin.svg'
import { useAccount, useNetwork } from 'wagmi'

import { EASY_AUCTION_NETWORKS } from '../../../../constants'
import { ApprovalState, useApproveCallback } from '../../../../hooks/useApproveCallback'
import { useAuctionDetails } from '../../../../hooks/useAuctionDetails'
import { usePlaceOrderCallback } from '../../../../hooks/usePlaceOrderCallback'
import { useSignature } from '../../../../hooks/useSignature'
import { useTokenBalancesTreatWETHAsETH } from '../../../../hooks/wallet/useTokenBalancesTreatWETHAsETH'
import {
  tryParseAmount,
  useGetOrderPlacementError,
  useOrderPlacementState,
  useSwapActionHandlers,
} from '../../../../state/orderPlacement/hooks'
import { useOrderState } from '../../../../state/orders/hooks'
import { OrderState } from '../../../../state/orders/reducer'
import {
  AuctionIdentifier,
  AuctionState,
  DerivedAuctionInfo,
  InfoType,
} from '../../../../state/types'
import { Fraction } from '../../../../utils/entities/fractions/fraction'
import { TokenAmount } from '../../../../utils/entities/fractions/tokenAmount'
import { convertPriceIntoBuyAndSellAmount } from '../../../../utils/prices'
import {
  getFullTokenDisplay,
  isTokenWETH,
  isTokenWMATIC,
  isTokenXDAI,
} from '../../../../utils/tools'
import AmountInput from '../amount-input/AmountInput'
import ConfirmationModal from '../confirmation-modal/ConfirmationModal'
import PlaceOrderButton from '../place-order-button/PlaceOrderButton'
import PlaceOrderModalFooter from '../place-order-modal-footer/PlaceOrderModalFooter'
import PriceInput from '../price-input/PriceInput'
import Wrapper from '../wrapper/Wrapper'
import './OrderPlacement.scss'

interface OrderPlacementProps {
  auctionIdentifier: AuctionIdentifier
  derivedAuctionInfo: DerivedAuctionInfo
}

const OrderPlacement: React.FC<OrderPlacementProps> = ({
  auctionIdentifier,
  derivedAuctionInfo,
}) => {
  const { auctionState } = derivedAuctionInfo
  const { chainId } = auctionIdentifier
  const { address: account } = useAccount()
  const { chain } = useNetwork()
  const { setOpen } = useModal()
  const chainIdFromWeb3 = chain?.id

  const orders: OrderState | undefined = useOrderState()

  const { price, sellAmount } = useOrderPlacementState()
  const { errorAmount, errorPrice } = useGetOrderPlacementError(
    derivedAuctionInfo,
    auctionState || AuctionState.NOT_YET_STARTED,
    auctionIdentifier,
  )

  const { onUserPriceInput, onUserSellAmountInput } = useSwapActionHandlers()
  const { auctionDetails, auctionInfoLoading } = useAuctionDetails(auctionIdentifier)
  const { signature } = useSignature(auctionIdentifier, account)

  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [showWarning, setShowWarning] = useState<boolean>(false)
  const [showWarningWrongChainId, setShowWarningWrongChainId] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirmed
  const [pendingConfirmation, setPendingConfirmation] = useState<boolean>(true) // waiting for user confirmation
  const [txHash, setTxHash] = useState<string>('')

  const auctioningToken = React.useMemo(
    () => derivedAuctionInfo.auctioningToken,
    [derivedAuctionInfo.auctioningToken],
  )

  const biddingToken = React.useMemo(
    () => derivedAuctionInfo.biddingToken,
    [derivedAuctionInfo.biddingToken],
  )

  const parsedBiddingAmount = tryParseAmount(sellAmount, biddingToken)
  const approvalTokenAmount: TokenAmount | undefined = parsedBiddingAmount
  const [approval, approveCallback] = useApproveCallback(
    approvalTokenAmount,
    // @ts-ignore
    EASY_AUCTION_NETWORKS[chainId],
    chainIdFromWeb3,
  )

  const relevantTokenBalances = useTokenBalancesTreatWETHAsETH(account ?? undefined, [biddingToken])
  const biddingTokenBalance = relevantTokenBalances?.[biddingToken?.address ?? '']

  const maxAmountInput: TokenAmount | undefined = biddingTokenBalance
    ? biddingTokenBalance
    : undefined

  useEffect(() => {
    if (price == '-' && derivedAuctionInfo?.clearingPrice) {
      onUserPriceInput(
        derivedAuctionInfo?.clearingPrice.multiply(new Fraction('1001', '1000')).toSignificant(4),
      )
    }
  }, [onUserPriceInput, price, derivedAuctionInfo])

  const resetModal = () => {
    if (!pendingConfirmation) {
      onUserSellAmountInput('')
    }
    setPendingConfirmation(true)
    setAttemptingTxn(false)
  }

  const placeOrderCallback = usePlaceOrderCallback(
    auctionIdentifier,
    signature,
    auctioningToken,
    biddingToken,
  )

  const onPlaceOrder = () => {
    setAttemptingTxn(true)

    if (!placeOrderCallback) return

    placeOrderCallback()
      .then((hash) => {
        setTxHash(hash)
        setPendingConfirmation(false)
      })
      .catch(() => {
        resetModal()
        setShowConfirm(false)
      })
  }

  const biddingTokenDisplay = useMemo(
    () => getFullTokenDisplay(biddingToken, chainId),
    [biddingToken, chainId],
  )
  const notApproved = approval === ApprovalState.NOT_APPROVED || approval === ApprovalState.PENDING
  const orderPlacingOnly = auctionState === AuctionState.ORDER_PLACING
  const coversClearingPrice = (price = '-'): boolean => {
    const { buyAmountScaled, sellAmountScaled } = convertPriceIntoBuyAndSellAmount(
      derivedAuctionInfo?.auctioningToken,
      derivedAuctionInfo?.biddingToken,
      price == '-' ? '1' : price,
      sellAmount,
    )

    return !!(
      buyAmountScaled &&
      sellAmountScaled &&
      sellAmountScaled *
        BigInt(derivedAuctionInfo?.clearingPriceSellOrder?.buyAmount?.raw?.toString() || 0) <=
        buyAmountScaled *
          BigInt(derivedAuctionInfo?.clearingPriceSellOrder?.sellAmount?.raw?.toString() || 0)
    )
  }
  const hasRiskNotCoveringClearingPrice =
    auctionState === AuctionState.ORDER_PLACING_AND_CANCELING && coversClearingPrice(price)

  const handleShowConfirm = () => {
    if (chainId !== chainIdFromWeb3) {
      setShowWarningWrongChainId(true)
      return
    }

    const sameOrder = orders.orders.find((order) => order.price === price)

    if (!sameOrder) {
      setShowConfirm(true)
    } else {
      setShowWarning(true)
    }
  }

  const cancelDate = React.useMemo(() => {
    if (derivedAuctionInfo?.orderCancellationEndDate === undefined) return undefined
    return derivedAuctionInfo?.orderCancellationEndDate !== 0
      ? new Date(derivedAuctionInfo?.orderCancellationEndDate * 1000).toLocaleString()
      : undefined
  }, [derivedAuctionInfo?.orderCancellationEndDate])

  const isPrivate = React.useMemo(
    () => auctionDetails && auctionDetails.isPrivateAuction,
    [auctionDetails],
  )
  const signatureAvailable = React.useMemo(() => signature && signature.length > 10, [signature])

  const onMaxInput = React.useCallback(() => {
    maxAmountInput && onUserSellAmountInput(maxAmountInput.toExact())
  }, [maxAmountInput, onUserSellAmountInput])

  const openWalletModal = React.useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const balanceString = React.useMemo(() => {
    return biddingTokenBalance?.toSignificant(6) || '0'
  }, [biddingTokenBalance])

  const amountInfo = React.useMemo(
    () =>
      !account
        ? {
            text: 'Please connect your wallet.',
            type: InfoType.info,
          }
        : notApproved && approval !== ApprovalState.PENDING
        ? {
            text: `You need to unlock ${biddingTokenDisplay} to allow the smart contract to interact with it.`,
            type: InfoType.error,
          }
        : errorAmount
        ? {
            text: errorAmount,
            type: InfoType.error,
          }
        : null,
    [account, approval, errorAmount, notApproved, biddingTokenDisplay],
  )

  const priceInfo = React.useMemo(
    () =>
      errorPrice
        ? {
            text: errorPrice,
            type: InfoType.error,
          }
        : null,
    [errorPrice],
  )

  const disablePlaceOrder =
    (errorAmount ||
      errorPrice ||
      notApproved ||
      showWarning ||
      showWarningWrongChainId ||
      showConfirm ||
      sellAmount === '' ||
      price === '') &&
    true

  const isWrappable =
    biddingTokenBalance &&
    biddingTokenBalance.greaterThan('0') &&
    (isTokenXDAI(biddingToken?.address, chainId) ||
      isTokenWETH(biddingToken?.address, chainId) ||
      isTokenWMATIC(biddingToken?.address, chainId)) &&
    !!account &&
    !!biddingToken?.address

  return (
    <Fragment>
      <Wrapper className="order-placement">
        {auctionInfoLoading && (
          <Grid className="order-placement_loader" container>
            <SpinnerLoader fill="#180B2D" />
          </Grid>
        )}
        {!auctionInfoLoading && isPrivate && !signatureAvailable && (
          <>
            <Grid className="order-placement_private-wrapper" container>
              <Grid item xs={12}>
                <Typography className="order-placement_header">Place Order</Typography>
              </Grid>
              <Grid className="order-placement_lock" item>
                <LockBig />
                <Typography className="order-placement_header order-placement_private">
                  Private Auction
                </Typography>
                <Typography className="order-placement_subheader order-placement_private-subheader">
                  You need to get allowed to participate
                </Typography>
              </Grid>
              {!account ? (
                <Button
                  className="order-placement_button"
                  onClick={openWalletModal}
                  variant="contained"
                >
                  <Typography className="place-order-button_text">Connect Wallet</Typography>
                </Button>
              ) : (
                <span className="order-placement_empty" />
              )}
            </Grid>
          </>
        )}
        {!auctionInfoLoading && (!isPrivate || signatureAvailable) && (
          <>
            <Grid item xs={12}>
              <Typography className="order-placement_header">Place Order</Typography>
            </Grid>
            {cancelDate && (
              <Grid className="order-placement_subheading" item xs={12}>
                <Calendar style={{ paddingRight: '0.5em' }} />
                <Typography className="order-placement_subheading_text">
                  Orders cannot be canceled after {cancelDate}
                </Typography>
              </Grid>
            )}
            <AmountInput
              balance={balanceString}
              chainId={chainId}
              info={amountInfo}
              onMax={onMaxInput}
              onUserSellAmountInput={onUserSellAmountInput}
              token={biddingToken}
              unlock={{ isLocked: notApproved, onUnlock: approveCallback, unlockState: approval }}
              value={sellAmount}
              wrap={{
                isWrappable: !!isWrappable,
                onClick: () =>
                  chainId == 100
                    ? window.open(
                        `https://app.honeyswap.org/#/swap?inputCurrency=${biddingToken?.address}`,
                      )
                    : chainId == 137
                    ? window.open(
                        `https://quickswap.exchange/#/swap?inputCurrency=${biddingToken?.address}`,
                      )
                    : window.open(
                        `https://app.uniswap.org/#/swap?inputCurrency=${biddingToken?.address}`,
                      ),
              }}
            />
            <PriceInput
              chainId={chainId}
              info={priceInfo}
              onUserPriceInput={onUserPriceInput}
              tokens={{ auctioningToken: auctioningToken, biddingToken: biddingToken }}
              value={price}
            />
            <Grid className="order-placement_filler" item />
            <PlaceOrderButton
              disabled={!!disablePlaceOrder}
              handleShowConfirm={handleShowConfirm}
            />
          </>
        )}
      </Wrapper>
      <ConfirmationModal
        attemptingTxn={attemptingTxn}
        content={
          <PlaceOrderModalFooter
            auctioningToken={auctioningToken}
            biddingToken={biddingToken}
            cancelDate={cancelDate}
            chainId={chainId}
            hasRiskNotCoveringClearingPrice={hasRiskNotCoveringClearingPrice}
            isWorking={attemptingTxn && pendingConfirmation}
            onPlaceOrder={onPlaceOrder}
            orderPlacingOnly={orderPlacingOnly}
            price={price}
            sellAmount={sellAmount}
          />
        }
        hash={txHash}
        isOpen={showConfirm}
        onDismiss={() => {
          resetModal()
          setShowConfirm(false)
        }}
        pendingConfirmation={pendingConfirmation}
        successMessage="Your Order has been successfully submitted!"
        title="Confirm Order"
        titleFinished="Order Placed"
        titleWorking="Confirming Order..."
      />
    </Fragment>
  )
}

export default OrderPlacement
