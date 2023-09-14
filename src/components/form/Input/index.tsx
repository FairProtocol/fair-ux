import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Tooltip } from '@mui/material'

import './index.scss'

interface Props {
  tooltip: string
  value?: string
  readOnly?: boolean
  placeholder?: string
  children: React.ReactNode
  className?: string
}

const Input: React.FC<Props> = ({ children, className, tooltip }) => {
  return (
    <div className={`input_wrapper ${className}`}>
      {children}
      <Tooltip className="input_tooltip" placement="right" title={tooltip}>
        <HelpOutlineIcon sx={{ color: '#5a5a5a', marginTop: '0.5em' }} />
      </Tooltip>
    </div>
  )
}

export default Input
