import './StyledCell.scss'

interface StyledCellProps {
  children: React.ReactNode
}

const StyledCell: React.FC<StyledCellProps> = ({ children }) => {
  return <div className="styled-cell">{children}</div>
}

export default StyledCell
