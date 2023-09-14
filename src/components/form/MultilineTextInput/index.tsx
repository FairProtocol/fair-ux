import { InputBaseProps, TextField } from '@mui/material'
import {
  FieldErrors,
  FieldPath,
  FieldValues,
  FormState,
  RegisterOptions,
  UseFormClearErrors,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'

import './index.scss'

export function MultilineTextInput<FormValues extends FieldValues>({
  className,
  clearErrors,
  disabled,
  formState,
  inputProps = {},
  name,
  placeholder,
  readOnly,
  register,
  rows = 10,
  rules = {},
  showError = true,
  watch,
}: {
  className?: string
  formState: FormState<FormValues>
  name: FieldPath<FormValues>
  inputProps?: InputBaseProps['inputProps']
  readOnly?: boolean
  rows?: number
  placeholder?: string
  rules?: RegisterOptions
  showError?: boolean
  disabled?: boolean
  clearErrors?: UseFormClearErrors<FormValues>
  register: UseFormRegister<FormValues>
  watch?: UseFormWatch<FormValues>
}) {
  const { errors } = formState
  const error = errors[name] as FieldErrors
  const { onBlur, onChange, ref } = register(name, rules)

  const onChangeHandler = (val: any) => {
    onChange(val)
    if (clearErrors) clearErrors(name)
  }
  if (watch) watch(name)

  return (
    <>
      <TextField
        autoComplete="off"
        autoCorrect="off"
        className={`text-input multiline-text-input ${className}`}
        disabled={disabled}
        error={!!error?.message && showError}
        fullWidth={true}
        helperText={showError ? error?.message?.toString() : ''}
        inputProps={{ minLength: 1, readOnly, rows, ...inputProps }}
        label={error?.message ? '' : placeholder}
        multiline
        name={name}
        onBlur={onBlur}
        onChange={onChangeHandler}
        placeholder={placeholder || ''}
        ref={ref}
        required={!!rules.required}
        rows={rows}
        spellCheck="false"
        sx={{
          '& fieldset': {
            border: 'solid #343434 1px !important',
            borderRadius: '0.75rem !important',
            ...(disabled && { background: '#D6D6D6 !important' }),
          },
          input: { color: '#373737 !important' },
        }}
        type="text"
      />
    </>
  )
}

export default MultilineTextInput
