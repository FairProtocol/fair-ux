import React, { Fragment, useEffect, useState } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useMediaQuery,
} from '@mui/material'

import './index.scss'
import BatchAutionsOverview from './Pages/BatchAutionsOverview'
import Benefits from './Pages/Benefits'
import FairProtocolOverview from './Pages/FairProtocolOverview'
import Faq from './Pages/Faq'
import Features from './Pages/Features'
import Github from './Pages/Github'
import ParticipatingRequirements from './Pages/ParticipatingRequirements'
import PrivateAuctions from './Pages/PrivateAuctions'
import SettlingAuctions from './Pages/SettlingAuctions'
import StartingRequirements from './Pages/StartingRequirements'
import SupportedNetworks from './Pages/SupportedNetworks'
import UseCases from './Pages/UseCases'
import UserFlow from './Pages/UserFlow'
import UsingScripts from './Pages/UsingScripts'
import UsingUI from './Pages/UsingUI'
import VestedTokens from './Pages/VestedTokens'
import { DocsDetail, DocsItem, docsDetails, docsItems } from './utils'

const Docs: React.FC = () => {
  const isMobileOrTablet = useMediaQuery('(max-width:960px)')

  const [expanded, setExpanded] = useState(false)
  const [currentDocsDetailIndex, setCurrentDocsDetailIndex] = useState(0)
  const [pageComponent, setPageComponent] = useState(<FairProtocolOverview />)

  useEffect(() => {
    switch (currentDocsDetailIndex) {
      case 0:
        setPageComponent(<FairProtocolOverview />)
        break
      case 1:
        setPageComponent(<Features />)
        break
      case 2:
        setPageComponent(<SupportedNetworks />)
        break
      case 3:
        setPageComponent(<BatchAutionsOverview />)
        break
      case 4:
        setPageComponent(<Benefits />)
        break
      case 5:
        setPageComponent(<UseCases />)
        break
      case 6:
        setPageComponent(<VestedTokens />)
        break
      case 7:
        setPageComponent(<ParticipatingRequirements />)
        break
      case 8:
        setPageComponent(<UserFlow />)
        break
      case 9:
        setPageComponent(<StartingRequirements />)
        break
      case 10:
        setPageComponent(<UsingScripts />)
        break
      case 11:
        setPageComponent(<UsingUI />)
        break
      case 12:
        setPageComponent(<SettlingAuctions />)
        break
      case 13:
        setPageComponent(<PrivateAuctions />)
        break
      case 14:
        setPageComponent(<Faq />)
        break
      default:
        setPageComponent(<Github />)
        break
    }
  }, [currentDocsDetailIndex])

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const previousItem = () => {
    setCurrentDocsDetailIndex(currentDocsDetailIndex - 1)
  }

  const nextItem = () => {
    setCurrentDocsDetailIndex(currentDocsDetailIndex + 1)
  }

  const goToCategory = (categoryIndex: number) => {
    const docsDetailIndex = docsItems[categoryIndex].starting
    setCurrentDocsDetailIndex(docsDetailIndex)

    if (isMobileOrTablet) {
      toggleExpanded()
    }
  }

  const goToItem = (categoryIndex: number, itemIndex: number) => {
    const docsDetailIndex = docsItems[categoryIndex].starting + itemIndex
    setCurrentDocsDetailIndex(docsDetailIndex)

    if (isMobileOrTablet) {
      toggleExpanded()
    }
  }

  const isCurrentPageSelected = (categoryIndex: number, itemIndex: number) => {
    return currentDocsDetailIndex == docsItems[categoryIndex].starting + itemIndex
  }

  return (
    <div style={{ flexGrow: 1 }}>
      {isMobileOrTablet && (
        <div>
          <Accordion disableGutters={true} elevation={0} expanded={expanded}>
            <AccordionSummary
              className="docs"
              expandIcon={<ExpandMoreIcon />}
              onClick={toggleExpanded}
            >
              <div className="docs_accordion">
                <Typography className="docs_accordion_category">
                  {docsDetails[currentDocsDetailIndex].category}
                </Typography>
                <Typography className="docs_accordion_title">
                  {docsDetails[currentDocsDetailIndex].title}
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails
              className="docs"
              sx={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, marginTop: 0 }}
            >
              <Fragment>
                <div className="docs_accordion_wrapper">
                  <div className="docs_divider"></div>
                  {docsItems.map(({ category, items }: DocsItem, categoryIndex) => (
                    <div className="docs_wrapper" key={categoryIndex}>
                      <div
                        className="docs_category_button"
                        onClick={() => goToCategory(categoryIndex)}
                      >
                        <Typography className="docs_category">{category}</Typography>
                      </div>
                      {items.map(({ title }: DocsDetail, itemIndex) => (
                        <div
                          className="docs_item_button"
                          key={itemIndex}
                          onClick={() => goToItem(categoryIndex, itemIndex)}
                        >
                          <Typography className="docs_item">{title}</Typography>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </Fragment>
            </AccordionDetails>
          </Accordion>
          <div className="docs_details">
            {pageComponent}
            <div className="docs_details_divider"></div>
            <div className="docs_navigation">
              {currentDocsDetailIndex > 0 && (
                <button className="docs_navigation_button_left" onClick={previousItem}>
                  <Typography className="docs_navigation_text">
                    <ArrowBackIcon /> {docsDetails[currentDocsDetailIndex - 1].title}
                  </Typography>
                </button>
              )}
              {currentDocsDetailIndex < docsDetails.length - 1 && (
                <button className="docs_navigation_button_right" onClick={nextItem}>
                  <Typography className="docs_navigation_text">
                    {docsDetails[currentDocsDetailIndex + 1].title}{' '}
                    <ArrowForwardIcon fontSize="small" />
                  </Typography>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {!isMobileOrTablet && (
        <div className="docs_desktop">
          <div className="docs_desktop_parent">
            <div className="docs_sidebar_wrapper">
              <div className="docs_accordion_wrapper">
                {docsItems.map(({ category, items }: DocsItem, categoryIndex) => (
                  <div className="docs_wrapper" key={categoryIndex}>
                    <div
                      className="docs_category_button"
                      onClick={() => goToCategory(categoryIndex)}
                    >
                      <Typography className="docs_category">{category}</Typography>
                    </div>
                    {items.map(({ title }: DocsDetail, itemIndex) => (
                      <div
                        className="docs_item_button"
                        key={itemIndex}
                        onClick={() => goToItem(categoryIndex, itemIndex)}
                      >
                        <Typography
                          className={`docs_item ${
                            isCurrentPageSelected(categoryIndex, itemIndex)
                              ? 'docs_item_selected'
                              : ''
                          }`}
                        >
                          {title}
                        </Typography>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="docs_details"
            style={{ marginRight: '7em', marginLeft: '3em', width: '100%' }}
          >
            <div className="docs_details_wrapper">
              {pageComponent}
              <div className="docs_details_divider"></div>
              <div className="docs_navigation">
                {currentDocsDetailIndex > 0 && (
                  <button className="docs_navigation_button_left" onClick={previousItem}>
                    <Typography className="docs_navigation_text">
                      <ArrowBackIcon /> {docsDetails[currentDocsDetailIndex - 1].title}
                    </Typography>
                  </button>
                )}
                {currentDocsDetailIndex < docsDetails.length - 1 && (
                  <button className="docs_navigation_button_right" onClick={nextItem}>
                    <Typography className="docs_navigation_text">
                      {docsDetails[currentDocsDetailIndex + 1].title}{' '}
                      <ArrowForwardIcon fontSize="small" />
                    </Typography>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Docs
