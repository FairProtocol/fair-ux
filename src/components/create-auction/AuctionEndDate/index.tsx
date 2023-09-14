import dayjs from 'dayjs'

import { FORM_PARAMETERS, FormKeys } from '../../../Pages/CreateAuction/formConfig'
import { useAuctionForm } from '../../../hooks/useAuctionForm'
import DateInput from '../../form/DateInput'
import FormInput from '../../form/Input'

const formKey: FormKeys = 'auctionEndDate'

export const AuctionEndDate = () => {
  const { label, tooltipText } = FORM_PARAMETERS[formKey]
  const { getFieldState } = useAuctionForm()

  return (
    <FormInput tooltip={tooltipText}>
      <DateInput
        name={formKey}
        placeholder={label}
        rules={{
          required: 'Please enter the auction end date',
          validate: {
            future: (value: any) => {
              const now = dayjs().second(0).millisecond(0)
              if (dayjs(value).isBefore(now)) {
                return 'Auction end date should be in the future'
              }
              return true
            },
          },
        }}
        showError={getFieldState(formKey).isTouched}
      />
    </FormInput>
  )
}
