import { PublicClient } from 'viem'
import { usePublicClient } from 'wagmi'

import {
  FORM_PARAMETERS,
  FormKeys,
  LaunchAuctionFormValues,
} from '../../../Pages/CreateAuction/formConfig'
import { addressRegex } from '../../../constants'
import { useAuctionForm } from '../../../hooks/useAuctionForm'
import FormInput from '../../form/Input'
import SwitchInput from '../../form/SwitchInput'
import Input from '../../form/TextInput'

export const checkIsContract = async (provider: PublicClient, address: string) => {
  try {
    // @ts-ignore
    const code = await provider.getBytecode({ address })
    return code !== undefined
  } catch (error) {
    return false
  }
}

const formKey: FormKeys = 'allowListData'
const isAllowedKey: FormKeys = 'isWhiteListingProcessUsed'

export const AllowListDataInput = () => {
  const { label, tooltipText } = FORM_PARAMETERS[formKey]
  const { label: isAllowedLabel, tooltipText: isAllowedTooltipText } = FORM_PARAMETERS[isAllowedKey]
  const { clearErrors, formState, getFieldState, register, watch } = useAuctionForm()
  const provider = usePublicClient()

  const isWhiteListingProcessUsed = watch(isAllowedKey)

  return (
    <>
      <FormInput tooltip={isAllowedTooltipText}>
        <SwitchInput name={isAllowedKey} placeholder={isAllowedLabel} />
      </FormInput>
      {isWhiteListingProcessUsed && (
        <FormInput tooltip={tooltipText}>
          <Input<LaunchAuctionFormValues>
            clearErrors={clearErrors}
            formState={formState}
            name={formKey}
            placeholder={label}
            register={register}
            rules={{
              required: true,
              pattern: { value: addressRegex, message: 'Please enter a valid address.' },
              validate: {
                isContract: async (address) => {
                  if (!address) return true
                  const allowListDataIsContract = await checkIsContract(provider, address)
                  return allowListDataIsContract ? 'Signing Address should be an EOA' : true
                },
              },
            }}
            showError={getFieldState(formKey).isTouched}
          />
        </FormInput>
      )}
    </>
  )
}
