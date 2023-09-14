import { useCallback, useState } from 'react'

import './index.scss'
import ConfirmationModal from '../../../Pages/Auction/components/confirmation-modal/ConfirmationModal'
import { useSubmitAuction } from '../../../hooks/useSubmitAuction'
import ConfirmationModalContent from '../ConfirmationModalContent'

interface LaunchConfirmationModalProps {
  isOpen: boolean
  setIsOpen: (val: boolean) => void
}

const LaunchConfirmationModal: React.FC<LaunchConfirmationModalProps> = ({ isOpen, setIsOpen }) => {
  const { initiateNewAuction } = useSubmitAuction()
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirmed
  const [pendingConfirmation, setPendingConfirmation] = useState<boolean>(true) // waiting for user confirmation
  const [txHash, setTxHash] = useState<string>('')

  const resetModal = useCallback(() => {
    setPendingConfirmation(true)
    setAttemptingTxn(false)
  }, [setPendingConfirmation, setAttemptingTxn])

  const onInitiateAuction = useCallback(() => {
    if (!initiateNewAuction) return
    setAttemptingTxn(true)

    initiateNewAuction()
      .then((hash: any) => {
        setTxHash(hash)
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
      hash={txHash}
      isOpen={isOpen}
      onDismiss={() => {
        resetModal()
        setIsOpen(false)
      }}
      pendingConfirmation={pendingConfirmation}
      successMessage="Your token has been successfully launched!"
      title="Confirmation"
      titleFinished="Auction Created!"
      titleWorking="Launching Auction..."
      width="md"
    />
  )
}

export default LaunchConfirmationModal
