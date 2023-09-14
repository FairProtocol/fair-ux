import './Tab.scss'

interface TabProps {
  label: string
  icon: React.ReactElement
  activated: boolean
  className?: string
  onClick: () => void
}

const Tab: React.FC<TabProps> = ({ activated, className, icon, label, onClick }) => {
  return (
    <div className={`tab ${activated && 'tab_activated'} ${className}`} onClick={onClick}>
      <div className="tab_icon">{icon}</div>
      <div className="tab_label">{label}</div>
    </div>
  )
}

export default Tab
