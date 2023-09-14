import { Grid, Typography } from '@mui/material'
import { ReactComponent as SpinnerLoader } from 'src/assets/images/tail-spin.svg'

import Wrapper from '../wrapper/Wrapper'
import './OrderPlacement.scss'

const OrderPlacementLoader: React.FC = () => {
  return (
    <Wrapper className="order-placement">
      <Grid item xs={12}>
        <Typography className="order-placement_header">Place Order</Typography>
      </Grid>
      <Grid className="order-placement_loader" container>
        <SpinnerLoader fill="#180B2D" />
      </Grid>
    </Wrapper>
  )
}

export default OrderPlacementLoader
