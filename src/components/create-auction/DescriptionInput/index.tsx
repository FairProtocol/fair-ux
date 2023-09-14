import {
  FORM_PARAMETERS,
  FormKeys,
  LaunchAuctionFormValues,
} from '../../../Pages/CreateAuction/formConfig'
import { useAuctionForm } from '../../../hooks/useAuctionForm'
import FormInput from '../../form/Input'
import MultilineInput from '../../form/MultilineTextInput'

const formKey: FormKeys = 'description'

export const DescriptionInput = () => {
  const { label, tooltipText } = FORM_PARAMETERS[formKey]
  const { clearErrors, formState, getFieldState, register, watch } = useAuctionForm()

  return (
    <FormInput tooltip={tooltipText}>
      <MultilineInput<LaunchAuctionFormValues>
        clearErrors={clearErrors}
        formState={formState}
        name={formKey}
        placeholder={label}
        register={register}
        rows={6}
        showError={getFieldState(formKey).isDirty}
        watch={watch}
      />
    </FormInput>
  )
}
