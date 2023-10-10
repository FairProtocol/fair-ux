import { Typography } from '@mui/material'
import '../index.scss'

const SupportedNetworks: React.FC = () => {
  return (
    <div>
        <Typography className="docs_details_category">
          Introducing Fair Protocol
        </Typography>
        <Typography className="docs_details_title">
          Supported Networks
        </Typography>
        <>
            <Typography className="docs_details_text">Fair Protocol currently supports the following networks:</Typography>
            <Typography className="docs_details_text title-bold one-spacing">Mainnets:</Typography>
            <Typography className="docs_details_text two-spacing">1. Ethereum</Typography>
            <Typography className="docs_details_text two-spacing">2. Gnosis</Typography>
            <Typography className="docs_details_text two-spacing">3. Polygon</Typography>
            <Typography className="docs_details_text two-spacing">4. Avalanche</Typography>
            <Typography className="docs_details_text two-spacing">5. BNB chain</Typography>
            <Typography className="docs_details_text title-bold one-spacing">Testnet:</Typography>
            <Typography className="docs_details_text two-spacing">1. Sepolia</Typography>
            <Typography className="docs_details_text two-spacing">2. Goerli</Typography>
            <Typography className="docs_details_text two-spacing">3. Mumbai</Typography>
            <Typography className="docs_details_text two-spacing">4. Fuji</Typography>
            <Typography className="docs_details_text one-spacing">Coming Soon</Typography>
            <Typography className="docs_details_text two-spacing">We have a couple more mainnets and testnets coming soon including Arbitrum and Specular. Follow our Twitter to be updated!</Typography>
        </>
    </div>
  )
}

export default SupportedNetworks
