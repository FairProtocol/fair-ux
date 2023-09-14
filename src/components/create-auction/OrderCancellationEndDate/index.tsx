import dayjs from 'dayjs'

import { FORM_PARAMETERS, FormKeys } from '../../../Pages/CreateAuction/formConfig'
import { useAuctionForm } from '../../../hooks/useAuctionForm'
import DateInput from '../../form/DateInput'
import FormInput from '../../form/Input'

const formKey: FormKeys = 'orderCancellationEndDate'

export const OrderCancellationEndDate = () => {
  const { label, tooltipText } = FORM_PARAMETERS[formKey]
  const { getFieldState, watch } = useAuctionForm()

  return (
    <FormInput tooltip={tooltipText}>
      <DateInput
        name={formKey}
        placeholder={label}
        rules={{
          required: 'Please enter the order cancellation end Date',
          validate: {
            future: (value) => {
              const now = dayjs().second(0).millisecond(0)
              if (dayjs(value).isBefore(now)) {
                return 'Order cancellation End Date should be in the future'
              }
              return true
            },
            beforeAuctionEndDate: (value) => {
              const auctionEndDate = watch('auctionEndDate')
              if (dayjs(value).isAfter(dayjs(auctionEndDate))) {
                return 'Order cancellation End Date should be before auction End Date'
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
