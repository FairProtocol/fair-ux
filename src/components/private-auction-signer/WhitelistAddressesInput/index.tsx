import { useAccount, useNetwork } from 'wagmi'

import {
  FORM_PARAMETERS,
  FormKeys,
  PrivateAuctionSignerFormValues,
} from '../../../Pages/PrivateAuctionSigner/formConfig'
import { addressRegex } from '../../../constants'
import { useIsPrivateAuction } from '../../../hooks/useIsPrivateAuction'
import { usePrivateAuctionSignerForm } from '../../../hooks/usePrivateAuctionSignerForm'
import FormInput from '../../form/Input'
import TextInput from '../../form/MultilineTextInput'

const formKey: FormKeys = 'whitelistedAddress'

export const WhitelistAddressInput = () => {
  const { label, tooltipText } = FORM_PARAMETERS[formKey]
  const { chain } = useNetwork()

  const { clearErrors, formState, register, watch } = usePrivateAuctionSignerForm()
  const { address } = useAccount()
  const auctionId = watch('auctionId')
  const chainId = chain?.id
  const { auctionSigner, isLoading, isPrivateAuction } = useIsPrivateAuction({
    auctionId,
    chainId: chainId || 0,
  })

  const disabled =
    !auctionId ||
    isLoading ||
    !isPrivateAuction ||
    auctionSigner?.toLowerCase() !== address?.toLowerCase()

  return (
    <FormInput tooltip={tooltipText}>
      <TextInput<PrivateAuctionSignerFormValues>
        clearErrors={clearErrors}
        disabled={disabled}
        formState={formState}
        name={formKey}
        placeholder={label}
        register={register}
        rules={{
          validate: {
            validAddress: (value) => {
              if (typeof value !== 'string' || !value) return 'Please enter an address'
              // Split the string by new line, comma or space
              const addresses = value?.trim()?.split(/[\n, ]+/)
              let validAddresses = true
              addresses.forEach((address) => {
                if (!addressRegex.test(address)) {
                  validAddresses = false
                }
              })

              if (!validAddresses) return 'Please enter valid addresses'
              return true
            },
          },
        }}
      />
    </FormInput>
  )
}
