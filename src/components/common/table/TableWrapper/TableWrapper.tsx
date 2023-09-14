import './TableWrapper.scss'

interface TableWrapperProps {
  children: React.ReactNode
  padding?: string
}

const TableWrapper: React.FC<TableWrapperProps> = ({ children, padding }) => {
  return (
    <div
      className="table-wrapper"
      style={{
        padding: padding ? padding : '0.25rem 0',
      }}
    >
      {children}
    </div>
  )
}

export default TableWrapper
