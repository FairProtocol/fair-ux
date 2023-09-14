import { Typography } from '@mui/material'

import { getDays, getHours, getMinutes, getSeconds } from '../../../utils/tools'
import './Timer.scss'

interface TimerProps {
  className?: string
  timeLeft: number
}

const formatSeconds = (seconds: number): React.ReactNode => {
  const days = getDays(seconds)
  const hours = getHours(seconds)
  const minutes = getMinutes(seconds)
  const remainderSeconds = getSeconds(seconds)

  return (
    <>
      {days > 0 && `${days}d `}
      {hours >= 0 && hours < 10 && `0`}
      {hours}
      <>
        <span className="blink" />
        {minutes >= 0 && minutes < 10 && `0`}
        {minutes}
      </>
      {days === 0 && (
        <>
          <span className="blink" />
          {remainderSeconds >= 0 && remainderSeconds < 10 && `0`}
          {remainderSeconds}
        </>
      )}
    </>
  )
}

const Timer: React.FC<TimerProps> = ({ className, timeLeft }) => {
  return (
    <Typography className={`${className}`}>
      {timeLeft && timeLeft > -1 ? formatSeconds(timeLeft) : '-'}
    </Typography>
  )
}

export default Timer
