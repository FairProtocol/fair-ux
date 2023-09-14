import { useMediaQuery } from '@mui/material'

import { CellRow } from '../CellRow/CellRow'
import { getColumns } from '../utils'
import './Row.scss'

interface RowProps {
  hiddenMd?: boolean
  columns?: string | number
  children: React.ReactNode
  className?: string
}

const Row: React.FC<RowProps> = ({ children, className, columns, hiddenMd }) => {
  const isTabletAndAbove = useMediaQuery(`(min-width: 768px)`)
  return (
    <CellRow
      className={`${isTabletAndAbove ? 'row' : 'row-mobile'} ${className}`}
      style={{
        ...(isTabletAndAbove && { gridTemplateColumns: getColumns(columns), display: 'grid' }),
        ...(!isTabletAndAbove && hiddenMd && { display: 'none' }),
      }}
    >
      {children}
    </CellRow>
  )
}

export default Row
