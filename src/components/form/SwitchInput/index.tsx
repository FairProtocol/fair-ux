import React, { useEffect } from 'react'

import { Switch, Typography } from '@mui/material'
import { Controller, RegisterOptions, useWatch } from 'react-hook-form'

import { FormKeys, LaunchAuctionFormValues } from '../../../Pages/CreateAuction/formConfig'
import { useAuctionForm } from '../../../hooks/useAuctionForm'
import './index.scss'

interface Props {
  name: FormKeys
  rules?: RegisterOptions
  placeholder?: string
  triggerOnChange?: FormKeys
}

const SwitchInput: React.FC<Props> = ({ name, placeholder, rules, triggerOnChange }) => {
  const { control, getFieldState, setValue, trigger } = useAuctionForm()

  const { error } = getFieldState(name)

  // @ts-ignore
  const watch = useWatch({ control, name: triggerOnChange, disabled: !triggerOnChange })

  useEffect(() => {
    trigger()
  }, [watch, trigger])

  return (
    <Controller<LaunchAuctionFormValues>
      control={control}
      defaultValue={undefined}
      name={name}
      render={({ field: { value } }) => (
        <div>
          <Typography className="switch-input_title">{placeholder}</Typography>
          <Switch
            checked={!!value}
            disabled={false}
            onClick={() => setValue(name, !value)}
            sx={{
              '&.MuiSwitch-root .MuiSwitch-switchBase': { color: '#373737' },
              '&.MuiSwitch-root .Mui-checked': { color: '#5940C1' },
              '&.MuiSwitch-root .Mui-checked+.MuiSwitch-track': { backgroundColor: '#B9B0ED' },
              '&.MuiSwitch-root .MuiSwitch-track': { backgroundColor: '#9E9D9D' },
            }}
          />
          {error?.message && <span className="text-input_error">{error?.message}</span>}
        </div>
      )}
      rules={rules}
    />
  )
}

export default SwitchInput
