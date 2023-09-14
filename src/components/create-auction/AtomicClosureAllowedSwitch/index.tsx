import { FORM_PARAMETERS, FormKeys } from '../../../Pages/CreateAuction/formConfig'
import FormInput from '../../form/Input'
import SwitchInput from '../../form/SwitchInput'

const formKey: FormKeys = 'isAtomicClosureAllowed'

export const AtomicClosureAllowedCheckbox = () => {
  const { label, tooltipText } = FORM_PARAMETERS[formKey]

  return (
    <FormInput tooltip={tooltipText}>
      <SwitchInput name={formKey} placeholder={label} />
    </FormInput>
  )
}
