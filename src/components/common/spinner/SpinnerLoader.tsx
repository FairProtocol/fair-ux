import { Box, CircularProgress } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'

interface Props {
  open: boolean
}

export default function Spinner(props: Props) {
  const { open } = props
  return (
    <Backdrop open={open} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </Backdrop>
  )
}
