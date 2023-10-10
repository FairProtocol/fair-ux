import { Typography } from '@mui/material'
import './index.scss'

const Github: React.FC = () => {
  return (
    <div>
        <Typography className="docs_details_category">
            Additional Resources
        </Typography>
        <Typography className="docs_details_title">
            Github
        </Typography>
        <>
            <Typography className="docs_details_text">You can visit our GitHub to get more details or learn more about the actual code behind our platform.</Typography>
            <Typography className="docs_details_text">Our GitHub repo is: https://github.com/FairProtocol/fair-protocol-ux</Typography>
            <Typography className="docs_details_text">If you want to fork our protocol or deploy it for your own private server, you can fork our repo. For in-depth documentation regarding our APIs and code, please visit our gitbook link here:</Typography>
        </>
    </div>
  )
}

export default Github
