import { useMediaQuery } from '@mui/material'

export const useIsMobile = (width = '1024') => {
  return useMediaQuery(`(max-width: ${width}px)`)
}
