import {
  FORM_PARAMETERS,
  FormKeys,
  LaunchAuctionFormValues,
} from '../../../Pages/CreateAuction/formConfig'
import { positiveNumberRegex } from '../../../constants'
import { useAuctionForm } from '../../../hooks/useAuctionForm'
import FormInput from '../../form/Input'
import Input from '../../form/TextInput'

const formKey: FormKeys = 'auctionedSellAmount'

export const AuctionedSellAmountInput = () => {
  const { label, tooltipText } = FORM_PARAMETERS[formKey]
  const { clearErrors, formState, getFieldState, register } = useAuctionForm()

  return (
    <FormInput tooltip={tooltipText}>
      <Input<LaunchAuctionFormValues>
        clearErrors={clearErrors}
        formState={formState}
        name={formKey}
        placeholder={label}
        register={register}
        rules={{
          required: 'Please enter the amount to sell.',
          pattern: { value: positiveNumberRegex, message: 'Pleaes enter a positive number.' },
          validate: {
            min: (value) => value > 0 || 'Amount to sell must be positive',
          },
        }}
        showError={getFieldState(formKey).isTouched}
      />
    </FormInput>
  )
}
