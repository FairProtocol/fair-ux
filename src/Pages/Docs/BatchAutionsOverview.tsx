import { Typography } from '@mui/material'
import './index.scss'

const BatchAutionsOverview: React.FC = () => {
  return (
    <div>
        <Typography className="docs_details_category">
            Batch Auctions
        </Typography>
        <Typography className="docs_details_title">
            Overview
        </Typography>
        <>
            <Typography className="docs_details_text">Batch auctions are a fair pricing method that has been battle tested in traditional finance. Some of its uses include everyday Open Auctions in the NYSE, Direct Listings, as well as IPOs (Google being the most prominent).</Typography>
            <Typography className="docs_details_text">Fair Protocol’s mechanism adds major benefits over existing approaches available today on Ethereum like fixed price sales, Dutch Auctions, IBCO or Balancer LBP.</Typography>
        </>
    </div>
  )
}

export default BatchAutionsOverview
