import { getColumns } from '../utils'
import './CellRow.scss'

interface CellRowProps {
  columns?: number | string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const CellRow: React.FC<CellRowProps> = ({ children, className, columns, style }) => {
  return (
    <span
      className={`cell-row ${className}`}
      style={{
        gridTemplateColumns: getColumns(columns),
        ...style,
      }}
    >
      {children}
    </span>
  )
}

interface CellProps {
  children: React.ReactNode
}

export const Cell: React.FC<CellProps> = ({ children }) => {
  return <span>{children}</span>
}
