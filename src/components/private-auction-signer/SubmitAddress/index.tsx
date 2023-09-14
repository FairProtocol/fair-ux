import { useCallback } from 'react'

import { useModal } from 'connectkit'
import { FieldErrors } from 'react-hook-form'
import { useAccount, useNetwork } from 'wagmi'

import { PrivateAuctionSignerFormValues } from '../../../Pages/PrivateAuctionSigner/formConfig'
import useGenerateSignature from '../../../Pages/PrivateAuctionSigner/hooks/useGenerateSignature'
import { additionalServiceApi } from '../../../api'
import { usePrivateAuctionSignerForm } from '../../../hooks/usePrivateAuctionSignerForm'
import { useAddPopup } from '../../../state/application/hooks'

const SubmitAddress = () => {
  const generateSignatures = useGenerateSignature()
  const { chain } = useNetwork()
  const { address: account } = useAccount()
  const { setOpen } = useModal()
  const addPopup = useAddPopup()

  const openModal = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const { getValues, handleSubmit, setError, setValue, watch } = usePrivateAuctionSignerForm()

  const auctionId = watch('auctionId')

  const onSubmit = useCallback(async () => {
    if (!account) {
      openModal()
      return
    }
    const signatures = await generateSignatures()
    if (!signatures || !chain) return []
    await Promise.all(
      signatures.map(async (signature) => {
        const { signature: auctioneerSignedMessage, user } = signature
        await additionalServiceApi.uploadUserSignature({
          chainId: chain?.id.toString(),
          auctionId: auctionId.toString(),
          address: user,
          signature: auctioneerSignedMessage,
        })
        addPopup({
          addressSigned: {
            address: user,
            success: true,
            summary: `The address ${user} has been whitelisted for the auction ${auctionId} on ${chain?.name}`,
          },
        })
      }),
    )
  }, [addPopup, generateSignatures, openModal, account, auctionId, chain])

  const onError = (errors: FieldErrors<PrivateAuctionSignerFormValues>) => {
    if (!account) {
      openModal()
      return
    }
    Object.values(errors).forEach((error) => {
      const {
        message,
        // @ts-ignore
        ref: { name },
      } = error
      setError(name, { type: 'custom', message })
      // @ts-ignore
      setValue(name, getValues()[name], { shouldValidate: true, shouldTouch: true })
    })
  }

  return (
    <button
      className="auction-signer_main_button"
      disabled={!chain?.id}
      onClick={handleSubmit(onSubmit, onError)}
    >
      {chain?.id ? 'Whitelist' : 'Connect Wallet'}
    </button>
  )
}

export default SubmitAddress
