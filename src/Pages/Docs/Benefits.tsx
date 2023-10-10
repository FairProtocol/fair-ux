import { Typography } from '@mui/material'
import './index.scss'

const Benefits: React.FC = () => {
  return (
    <div>
        <Typography className="docs_details_category">
            Batch Auctions
        </Typography>
        <Typography className="docs_details_title">
            Benefits
        </Typography>
        <>
            <Typography className="docs_details_text title-bold">1. Front running (MEV) resistant -</Typography>
            <Typography className="docs_details_text one-spacing">Fair Protocol prevents front-running bots from interfering with sales by not allowing them to purchase tokens early and sell later at a higher price. In contrast to AMM solutions, the auction mechanism does not allow miners to extract value from users by using sandwich attacks.</Typography>
            <Typography className="docs_details_text title-bold">2. Full control over participation price -</Typography>
            <Typography className="docs_details_text one-spacing">One of the advantages of Fair Protocol is the bidder’s ability to limit the price at which they are willing to buy. In contrast, IBCOs requires the bidder to commit to participation without knowing the token’s eventual valuation.</Typography>
            <Typography className="docs_details_text title-bold">3. Fair pricing -</Typography>
            <Typography className="docs_details_text one-spacing">All bidders will receive the same clearing price, which is automatically determined when the auction concludes.</Typography>
            <Typography className="docs_details_text title-bold">4. Composable -</Typography>
            <Typography className="docs_details_text one-spacing">The auction setup is modular enough to satisfy many different use cases’ needs.</Typography>
        </>
    </div>
  )
}

export default Benefits
