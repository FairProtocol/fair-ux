import {
  FORM_PARAMETERS,
  FormKeys,
  LaunchAuctionFormValues,
} from '../../../Pages/CreateAuction/formConfig'
import { useAuctionForm } from '../../../hooks/useAuctionForm'
import FormInput from '../../form/Input'
import Input from '../../form/TextInput'

const formKey: FormKeys = 'discordUrl'

export const DiscordUrlInput = () => {
  const { label, tooltipText } = FORM_PARAMETERS[formKey]
  const { clearErrors, formState, getFieldState, register, watch } = useAuctionForm()

  return (
    <FormInput tooltip={tooltipText}>
      <Input<LaunchAuctionFormValues>
        clearErrors={clearErrors}
        formState={formState}
        name={formKey}
        placeholder={label}
        register={register}
        showError={getFieldState(formKey).isDirty}
        watch={watch}
      />
    </FormInput>
  )
}
