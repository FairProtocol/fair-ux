import { Typography } from '@mui/material'
import '../index.scss'

const UseCases: React.FC = () => {
  return (
    <div>
        <Typography className="docs_details_category">
            Batch Auctions
        </Typography>
        <Typography className="docs_details_title">
            Use Cases
        </Typography>
        <>
            <Typography className="docs_details_text">Fair Protocol is a permissionless piece of infrastructure and some of the use cases one can initiate as a user include:</Typography>
            <Typography className="docs_details_text title-bold">1. Token Sales -</Typography>
            <Typography className="docs_details_text one-spacing">Fair Protocol builds on the proven success in token sales (IDOs) that Gnosis Auction and Gnosis Protocol v1 (Mesa) had. It brings similar benefits in terms of fair price finding and frontrunning resistance and provides a user friendly system for participation.</Typography>
            <Typography className="docs_details_text title-bold">2. Collateral Shortfall Event -</Typography>
            <Typography className="docs_details_text one-spacing">Many lending protocols still don’t have a mechanism to auction off assets in case of a shortfall in collateral to pay lenders. Fair Protocol can work as a platform in which other smart contracts trigger auctions to raise funds for re-collateralization.</Typography>
            <Typography className="docs_details_text title-bold">3. All price-finding events -</Typography>
            <Typography className="docs_details_text one-spacing">Whether it is a large sale of tokens on a DAO’s treasury, zero-coupon bonds, or any other event that requires a fair price-finding method, Fair Protocol can provide the right avenue and features to meet the needs.</Typography>
        </>
    </div>
  )
}

export default UseCases
