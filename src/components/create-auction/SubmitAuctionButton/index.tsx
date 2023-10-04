import { useCallback } from 'react'

import { useModal } from 'connectkit'
import { FieldErrors } from 'react-hook-form'
import { useAccount } from 'wagmi'

import { useAnalyticsEventTracker } from '../../../Pages/App'
import { LaunchAuctionFormValues } from '../../../Pages/CreateAuction/formConfig'
import { useAuctionForm } from '../../../hooks/useAuctionForm'
import './index.scss'

interface SubmitAuctionButtonProps {
  openConfirmationModal: () => void
}

export const SubmitAuctionButton: React.FC<SubmitAuctionButtonProps> = ({
  openConfirmationModal,
}) => {
  const eventTracker = useAnalyticsEventTracker('Submit: Create Auction')

  const { address: account } = useAccount()
  const { setOpen } = useModal()

  const { getValues, handleSubmit, setError, setValue } = useAuctionForm()

  const onSubmit = useCallback(async () => {
    if (!account) {
      setOpen(true)
      return
    }
    eventTracker('Submit', 'Success')
    openConfirmationModal()
  }, [setOpen, openConfirmationModal, account, eventTracker])

  const onError = (errors: FieldErrors<LaunchAuctionFormValues>) => {
    if (!account) {
      setOpen(true)
      return
    }
    Object.values(errors).forEach((error) => {
      const {
        message,
        // @ts-ignore
        ref: { name },
      } = error
      eventTracker('Error', name)
      setError(name, { type: 'custom', message })
      // @ts-ignore
      setValue(name, getValues()[name], {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      })
    })
  }

  return (
    <button className="submit-auction_button" onClick={handleSubmit(onSubmit, onError)}>
      Create Auction
    </button>
  )
}
