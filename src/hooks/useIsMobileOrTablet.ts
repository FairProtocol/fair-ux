import { useMediaQuery } from '@mui/material'

export const useIsMobileOrTablet = () => {
  return useMediaQuery('(max-width:960px)')
}
