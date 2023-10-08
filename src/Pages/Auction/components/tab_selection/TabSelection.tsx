import { Grid, useMediaQuery } from '@mui/material'

import './TabSelection.scss'
import Tab from './Tab'
import { tabs } from './data'
import Wrapper from '../wrapper/Wrapper'

interface TabSelectionProps {
  value: number
  handleChange: (value: any) => void
}

const TabSelection: React.FC<TabSelectionProps> = ({ handleChange, value = 0 }) => {
  const isMobile = useMediaQuery('(max-width:430px)')

  return (
    <Wrapper>
      {isMobile ? (
        <Grid className="tabs" container>
          {tabs.map((tab, index) => {
            const { Icon } = tab
            const onClick = () => handleChange(index)
            return (
              <Grid item key={tab.name} xs={4}>
                <Tab
                  activated={value === index}
                  className={`tabs_tab`}
                  icon={<Icon fill={value === index ? '#5940C1' : '#373737'} />}
                  label={tab.name}
                  onClick={onClick}
                />
              </Grid>
            )
          })}
        </Grid>
      ) : (
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
      )}
    </Wrapper>
  )
}

export default TabSelection
