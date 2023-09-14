import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Grid, Typography } from '@mui/material'
import { ReactComponent as Cancel } from 'src/assets/images/cancel.svg'
import { ReactComponent as Info } from 'src/assets/images/info-sans.svg'
import { ReactComponent as Claim } from 'src/assets/images/play-circle.svg'
import { useAccount, useNetwork } from 'wagmi'

import { Cell } from '../../../../components/common/table/CellRow/CellRow'
import Row from '../../../../components/common/table/Row/Row'
import StyledCell from '../../../../components/common/table/StyledCell/StyledCell'
import TableWrapper from '../../../../components/common/table/TableWrapper/TableWrapper'
import { useCancelOrderCallback } from '../../../../hooks/useCancelOrderCallback'
import {
  ClaimState,
  useClaimOrderCallback,
  useGetAuctionProceeds,
} from '../../../../hooks/useClaimOrderCallback'
import { useAllUserOrders, useDerivedClaimInfo } from '../../../../state/orderPlacement/hooks'
import { useOrderState } from '../../../../state/orders/hooks'
import { OrderDisplay, OrderState, OrderStatus } from '../../../../state/orders/reducer'
import { AuctionIdentifier, AuctionState, DerivedAuctionInfo } from '../../../../state/types'
import { ChainId, NETWORK_CONFIGS } from '../../../../utils/networkConfig'
import { abbreviation } from '../../../../utils/numeral'
import CancelOrderModalFooter from '../cancel-order-modal-footer/CancelOrderModalFooter'
import ClaimOrderModalFooter from '../claim-order-modal-footer/ClaimOrderModalFooter'
import ConfirmationModal from '../confirmation-modal/ConfirmationModal'
import Wrapper from '../wrapper/Wrapper'

import './OrdersTable.scss'

interface OrdersTableProps {
  auctionIdentifier: AuctionIdentifier
  derivedAuctionInfo: DerivedAuctionInfo
}

const OrdersTable: React.FC<OrdersTableProps> = ({ auctionIdentifier, derivedAuctionInfo }) => {
  const { chainId } = auctionIdentifier
  const { auctionState } = derivedAuctionInfo
  const orders: OrderState | undefined = useOrderState()
  const { address: account } = useAccount()
  const { chain } = useNetwork()
  const web3ChainId = chain?.id
  // Cancel order states
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false)
  const [attemptingCancelTxn, setAttemptingCancelTxn] = useState<boolean>(false) // clicked confirmed
  const [pendingCancelConfirmation, setPendingCancelConfirmation] = useState<boolean>(true) // waiting for user confirmation
  const [cancellationTxHash, setCancellationTxHash] = useState<string>('')

  // Claim order states
  const [showClaimModal, setShowClaimModal] = useState<boolean>(false)
  const [userConfirmedClaimTx, setUserConfirmedClaimTx] = useState<boolean>(false)
  const [pendingClaimConfirmation, setPendingClaimConfirmation] = useState<boolean>(true)
  const [claimTxHash, setClaimTxHash] = useState<string>('')

  const [order, setOrder] = useState<OrderDisplay>()
  const cancelOrderCallback = useCancelOrderCallback(
    auctionIdentifier,
    derivedAuctionInfo?.biddingToken,
  )

  const [claimStatus, claimOrderCallback] = useClaimOrderCallback(auctionIdentifier)
  const { error, isLoading: isDerivedClaimInfoLoading } = useDerivedClaimInfo(
    auctionIdentifier,
    claimStatus,
  )
  const isValid = !error
  const { claimableAuctioningToken, claimableBiddingToken } = useGetAuctionProceeds(
    auctionIdentifier,
    derivedAuctionInfo,
  )
  const isLoading = useMemo(
    () =>
      (account && isDerivedClaimInfoLoading) || !claimableBiddingToken || !claimableAuctioningToken,
    [account, isDerivedClaimInfoLoading, claimableBiddingToken, claimableAuctioningToken],
  )

  const biddingToken = useMemo(
    () => derivedAuctionInfo.biddingToken,
    [derivedAuctionInfo.biddingToken],
  )
  const auctioningToken = useMemo(
    () => derivedAuctionInfo.auctioningToken,
    [derivedAuctionInfo.auctioningToken],
  )

  const isClaimButtonDisabled = useMemo(
    () =>
      !isValid ||
      isLoading ||
      showCancelModal ||
      userConfirmedClaimTx ||
      claimStatus != ClaimState.NOT_CLAIMED ||
      chainId !== web3ChainId,
    [isValid, isLoading, showCancelModal, userConfirmedClaimTx, claimStatus, chainId, web3ChainId],
  )

  const resetCancelModal = useCallback(() => {
    setPendingCancelConfirmation(true)
    setAttemptingCancelTxn(false)
  }, [setPendingCancelConfirmation, setAttemptingCancelTxn])

  const resetClaimModal = useCallback(() => {
    setPendingClaimConfirmation(true)
    setUserConfirmedClaimTx(false)
  }, [setPendingClaimConfirmation, setUserConfirmedClaimTx])

  const onCancelOrder = useCallback(() => {
    if (!cancelOrderCallback || !order) return
    setAttemptingCancelTxn(true)

    cancelOrderCallback(order.id)
      .then((hash: any) => {
        setCancellationTxHash(hash)
        setPendingCancelConfirmation(false)
      })
      .catch(() => {
        resetCancelModal()
        setShowCancelModal(false)
        setPendingCancelConfirmation(false)
      })
  }, [
    resetCancelModal,
    setAttemptingCancelTxn,
    setCancellationTxHash,
    setPendingCancelConfirmation,
    order,
    cancelOrderCallback,
  ])

  const onClaimOrder = () => {
    if (!claimOrderCallback) return
    claimOrderCallback()
      .then((hash) => {
        setClaimTxHash(hash)
        setPendingClaimConfirmation(false)
        setUserConfirmedClaimTx(true)
      })
      .catch(() => {
        resetClaimModal()
        setShowClaimModal(false)
        setUserConfirmedClaimTx(false)
      })
  }

  const hasLastCancellationDate =
    derivedAuctionInfo?.auctionEndDate !== derivedAuctionInfo?.orderCancellationEndDate &&
    derivedAuctionInfo?.orderCancellationEndDate !== 0
  const orderCancellationEndMilliseconds =
    (derivedAuctionInfo?.orderCancellationEndDate || 0) * 1000

  const orderStatusText = {
    [OrderStatus.PLACED]: 'Order Placed',
    [OrderStatus.PENDING]: 'Pending',
    [OrderStatus.PENDING_CANCELLATION]: 'Cancelling',
  }
  const now = Math.trunc(Date.now())
  const ordersEmpty = !orders.orders || orders.orders.length == 0

  // the array is frozen in strict mode, we will need to copy the array before sorting it
  const ordersSorted = orders.orders
    .slice()
    .sort((orderA, orderB) => Number(orderB.price) - Number(orderA.price))
  const orderPlacingOnly = auctionState === AuctionState.ORDER_PLACING
  const isOrderCancellationExpired =
    hasLastCancellationDate && now > orderCancellationEndMilliseconds && orderPlacingOnly
  const orderSubmissionFinished =
    auctionState === AuctionState.CLAIMING || auctionState === AuctionState.PRICE_SUBMISSION
  const hideCancelButton = orderPlacingOnly || orderSubmissionFinished

  useAllUserOrders(auctionIdentifier, derivedAuctionInfo)

  const navigate = useNavigate()
  const navigateToDocs = useCallback(() => {
    navigate('/docs')
  }, [navigate])
  const noAction = hideCancelButton && isClaimButtonDisabled

  return (
    <Wrapper className="orders-table">
      <Grid item xs={12}>
        <Typography className="orders-table_header">Your Orders</Typography>
      </Grid>
      {ordersEmpty && (
        <Grid className="orders-table_no-order" item xs={12}>
          <Info fill="#5940C1" />
          <Typography className="orders-table_no-order_subheading_title">
            You have no orders for this auction
          </Typography>
          <Typography className="orders-table_no-order_subheading">
            Not sure how to start? Click&nbsp;
            <div className="orders-table_no-order_subheading_link" onClick={navigateToDocs}>
              here
            </div>
            &nbsp;to find out how to start an auction
          </Typography>
        </Grid>
      )}
      {!ordersEmpty && (
        <Grid className="orders-table_wrapper" item xs={12}>
          <TableWrapper>
            <Row columns={5} hiddenMd>
              <StyledCell>
                <div>Amount</div>
              </StyledCell>
              <StyledCell>
                <div>Limit Price</div>
              </StyledCell>
              <StyledCell>
                <div>Status</div>
              </StyledCell>
              <StyledCell>
                <div>Network</div>
              </StyledCell>
              <StyledCell>
                <div>Actions</div>
              </StyledCell>
            </Row>
            {ordersSorted.map((order) => (
              <Row columns={5} key={order.id}>
                <Cell>
                  <p>
                    <span>Amount</span>
                  </p>
                  <span>{abbreviation(order.sellAmount)}</span>
                </Cell>
                <Cell>
                  <p>
                    <span>Limit Price</span>
                  </p>
                  <span>{abbreviation(order.price)}</span>
                </Cell>
                <Cell>
                  <p>Status</p>
                  <span>
                    <span>{orderStatusText[order.status]}</span>
                  </span>
                </Cell>
                <Cell>
                  <p>Network</p>
                  <span>{NETWORK_CONFIGS[order.chainId as ChainId].name}</span>
                </Cell>
                <Cell>
                  <p>Actions</p>
                  <span>
                    {!hideCancelButton &&
                      !(
                        isOrderCancellationExpired ||
                        order.status === OrderStatus.PENDING_CANCELLATION
                      ) && (
                        <span
                          className="orders-table_action-button"
                          onClick={() => {
                            setOrder(order)
                            setShowCancelModal(true)
                          }}
                        >
                          <Cancel fill="#1C1B1F" />
                        </span>
                      )}
                    {!isClaimButtonDisabled && (
                      <span
                        className="orders-table_action-button"
                        onClick={() => {
                          setOrder(order)
                          setShowClaimModal(true)
                        }}
                      >
                        <Claim fill="#1C1B1F" />
                      </span>
                    )}
                    {noAction && <span>-</span>}
                  </span>
                </Cell>
              </Row>
            ))}
            <ConfirmationModal
              attemptingTxn={attemptingCancelTxn}
              content={
                <CancelOrderModalFooter
                  biddingToken={biddingToken}
                  chainId={chainId}
                  isWorking={attemptingCancelTxn && pendingCancelConfirmation}
                  onCancelOrder={onCancelOrder}
                  sellAmount={order?.sellAmount || '0'}
                />
              }
              hash={cancellationTxHash}
              isOpen={showCancelModal}
              onDismiss={() => {
                resetCancelModal()
                setShowCancelModal(false)
              }}
              pendingConfirmation={pendingCancelConfirmation}
              title="Cancel Order"
              titleFinished="Order Cancelled"
              titleWorking="Cancelling Order..."
            />
            <ConfirmationModal
              attemptingTxn={userConfirmedClaimTx}
              content={
                <ClaimOrderModalFooter
                  auctioningToken={auctioningToken}
                  biddingToken={biddingToken}
                  chainId={chainId}
                  claimableAuctioningToken={claimableAuctioningToken}
                  claimableBiddingToken={claimableBiddingToken}
                  isWorking={userConfirmedClaimTx && pendingClaimConfirmation}
                  onClaim={onClaimOrder}
                />
              }
              hash={claimTxHash}
              isOpen={showClaimModal}
              onDismiss={() => {
                resetClaimModal()
                setShowClaimModal(false)
              }}
              pendingConfirmation={pendingClaimConfirmation}
              title="Claim Order"
              titleFinished="Order Claimed"
              titleWorking="Claiming Order..."
            />
          </TableWrapper>
        </Grid>
      )}
    </Wrapper>
  )
}

export default OrdersTable
