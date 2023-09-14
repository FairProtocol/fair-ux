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

export function TextInput<FormValues extends FieldValues>({
  className,
  clearErrors,
  formState,
  inputProps = {},
  name,
  placeholder,
  readOnly,
  register,
  rules = {},
  showError = true,
  watch,
}: {
  formState: FormState<FormValues>
  className?: string
  name: FieldPath<FormValues>
  inputProps?: InputBaseProps['inputProps']
  readOnly?: boolean
  placeholder?: string
  rules?: RegisterOptions
  showError?: boolean
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
        className={className || 'text-input'}
        error={!!error?.message && showError}
        fullWidth
        helperText={showError ? error?.message?.toString() : ''}
        inputProps={{ maxLength: 79, minLength: 1, readOnly, ...inputProps }}
        label={error?.message ? '' : placeholder}
        name={name}
        onBlur={onBlur}
        onChange={onChangeHandler}
        placeholder={placeholder || ''}
        ref={ref}
        required={!!rules.required}
        spellCheck="false"
        sx={{
          '& fieldset': { border: 'solid #343434 1px !important', borderRadius: '0.75em' },
          input: { color: '#373737 !important' },
        }}
        type="text"
      />
    </>
  )
}

export default TextInput
