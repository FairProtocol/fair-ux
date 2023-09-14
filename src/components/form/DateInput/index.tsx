import React from 'react'

import { DateTimePicker } from '@mui/x-date-pickers'
import { Controller, RegisterOptions } from 'react-hook-form'

import { FormKeys, LaunchAuctionFormValues } from '../../../Pages/CreateAuction/formConfig'
import { useAuctionForm } from '../../../hooks/useAuctionForm'
import './index.scss'

interface Props {
  name: FormKeys
  value?: Date
  rules?: RegisterOptions
  placeholder?: string
  showError?: boolean
}

const DateInput: React.FC<Props> = ({ name, placeholder, rules, showError = true }) => {
  const { clearErrors, control, getFieldState, setValue } = useAuctionForm()

  const onDateChange: (value: any, context: any) => void = (date) => {
    clearErrors(name)
    setValue(name, date)
  }

  const { error } = getFieldState(name)

  return (
    <Controller<LaunchAuctionFormValues>
      control={control}
      defaultValue={undefined}
      name={name}
      render={({ field: { value } }) => (
        <>
          <DateTimePicker
            className="date-input"
            label={placeholder}
            onChange={onDateChange}
            slotProps={{
              textField: {
                helperText: showError ? error?.message : '',
                error: !!error?.message && showError,
              },
            }}
            sx={{
              '& fieldset': { border: 'solid #343434 1px !important', borderRadius: '0.75em' },
              input: { color: '#373737 !important' },
            }}
            value={value}
          />
        </>
      )}
      rules={rules}
    />
  )
}

export default DateInput
