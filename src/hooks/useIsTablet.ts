import { useMediaQuery } from '@mui/material'

export const useIsTablet = () => {
  return useMediaQuery('(max-width:640px) and (orientation: portrait)')
}
