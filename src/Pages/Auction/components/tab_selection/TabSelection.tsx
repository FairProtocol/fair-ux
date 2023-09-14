import { Grid } from '@mui/material'

import './TabSelection.scss'
import Tab from './Tab'
import { tabs } from './data'
import Wrapper from '../wrapper/Wrapper'

interface TabSelectionProps {
  value: number
  handleChange: (value: any) => void
}

const TabSelection: React.FC<TabSelectionProps> = ({ handleChange, value = 0 }) => {
  return (
    <Wrapper>
      <Grid className="tabs">
        {tabs.map((tab, index) => {
          const { Icon } = tab
          const onClick = () => handleChange(index)
          return (
            <Tab
              activated={value === index}
              className={`tabs_tab`}
              icon={<Icon fill={value === index ? '#5940C1' : '#373737'} />}
              key={tab.name}
              label={tab.name}
              onClick={onClick}
            />
          )
        })}
      </Grid>
    </Wrapper>
  )
}

export default TabSelection
