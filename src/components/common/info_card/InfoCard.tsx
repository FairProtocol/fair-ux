import { Typography } from '@mui/material'
import ContentLoader from 'react-content-loader'
import './InfoCard.scss'
interface InfoCardProps {
  heading: string
  stat: string | number | React.ReactElement | undefined
  isLoading?: boolean
}

const InfoCard: React.FC<InfoCardProps> = ({ heading, isLoading = false, stat }) => {
  return (
    <div className="info-card">
      <Typography className="info-card_heading" variant="body2">
        {heading}
      </Typography>
      {!isLoading ? (
        <Typography className="info-card_stat" variant="h4">
          {stat}
        </Typography>
      ) : (
        <ContentLoader
          backgroundColor={'#ddd'}
          className="info-card_loader"
          foregroundColor={'#eee'}
          speed={2}
          viewBox="0 0 100 100"
        >
          <rect height="10" rx="3" ry="3" width="75" x="0" y="0" />
        </ContentLoader>
      )}
    </div>
  )
}

export default InfoCard
