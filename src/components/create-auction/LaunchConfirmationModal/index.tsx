import { useCallback, useState } from 'react'

import { useNetwork } from 'wagmi'

import ConfirmationModal from '../../../Pages/Auction/components/confirmation-modal/ConfirmationModal'
import { useSubmitAuction } from '../../../hooks/useSubmitAuction'
import ConfirmationModalContent from '../ConfirmationModalContent'
import './index.scss'

interface LaunchConfirmationModalProps {
  isOpen: boolean
  setIsOpen: (val: boolean) => void
}

const LaunchConfirmationModal: React.FC<LaunchConfirmationModalProps> = ({ isOpen, setIsOpen }) => {
  const { chain } = useNetwork()
  const chainId = chain?.id
  const { initiateNewAuction } = useSubmitAuction()
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirmed
  const [pendingConfirmation, setPendingConfirmation] = useState<boolean>(true) // waiting for user confirmation
  const [txHash, setTxHash] = useState<string>('')
  const [launchedAuctionId, setLaunchedAuctionId] = useState<number>(60)

  const resetModal = useCallback(() => {
    setPendingConfirmation(true)
    setAttemptingTxn(false)
  }, [setPendingConfirmation, setAttemptingTxn])

  const onInitiateAuction = useCallback(() => {
    if (!initiateNewAuction) return
    setAttemptingTxn(true)

    initiateNewAuction()
      .then((auctionDetails: { hash: `0x${string}`; auctionId: number } | void) => {
        if (auctionDetails) {
          const { auctionId, hash } = auctionDetails
          setTxHash(hash)
          setLaunchedAuctionId(auctionId)
        }
        setPendingConfirmation(false)
      })
      .catch(() => {
        setIsOpen(false)
        setPendingConfirmation(false)
      })
  }, [setAttemptingTxn, setTxHash, setPendingConfirmation, setIsOpen, initiateNewAuction])

  return (
    <ConfirmationModal
      attemptingTxn={attemptingTxn}
      content={
        <ConfirmationModalContent
          isWorking={attemptingTxn}
          onInitiateAuction={onInitiateAuction}
          setIsOpen={setIsOpen}
        />
      }
      externalLink={{
        url: `#/auction?auctionId=${launchedAuctionId}&chainId=${Number(chainId)}`,
        text: 'Check your auction page here >',
      }}
      hash={txHash}
      isOpen={isOpen}
      onDismiss={() => {
        resetModal()
        setIsOpen(false)
      }}
      pendingConfirmation={pendingConfirmation}
      successMessage={`Your auction has been successfully launched with Auction ID: ${launchedAuctionId}`}
      title="Confirmation"
      titleFinished="Auction Created!"
      titleWorking="Launching Auction..."
      width="md"
    />
  )
}

export default LaunchConfirmationModal
