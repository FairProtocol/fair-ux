import React, { Fragment, useState } from 'react'

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
import Image1 from 'src/assets/images/image1.png'
import Image10 from 'src/assets/images/image10.png'
import Image11 from 'src/assets/images/image11.png'
import Image12 from 'src/assets/images/image12.png'
import Image2 from 'src/assets/images/image2.png'
import Image3 from 'src/assets/images/image3.png'
import Image4 from 'src/assets/images/image4.png'
import Image5 from 'src/assets/images/image5.png'
import Image6 from 'src/assets/images/image6.png'
import Image7 from 'src/assets/images/image7.png'
import Image8 from 'src/assets/images/image8.png'
import Image9 from 'src/assets/images/image9.png'

import { DocsDetail, DocsItem, docsDetails, docsItems } from './utils'
import './index.scss'
import { useAnalyticsEventTracker } from '../App'

const Docs: React.FC = () => {
  const isMobileOrTablet = useMediaQuery('(max-width:960px)')

  const eventTracker = useAnalyticsEventTracker('Resources')

  const [expanded, setExpanded] = useState(false)
  const [currentDocsDetailIndex, setCurrentDocsDetailIndex] = useState(0)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const previousItem = () => {
    const index = currentDocsDetailIndex - 1
    eventTracker('Previous item', `${docsDetails[index].category}:${docsDetails[index].title}`)
    setCurrentDocsDetailIndex(currentDocsDetailIndex - 1)
  }

  const nextItem = () => {
    const index = currentDocsDetailIndex + 1
    eventTracker('Next item', `${docsDetails[index].category}:${docsDetails[index].title}`)
    setCurrentDocsDetailIndex(currentDocsDetailIndex + 1)
  }

  const goToCategory = (categoryIndex: number) => {
    const docsDetailIndex = docsItems[categoryIndex].starting
    eventTracker(
      'Go to category',
      `${docsDetails[docsDetailIndex].category}:${docsDetails[docsDetailIndex].title}`,
    )
    setCurrentDocsDetailIndex(docsDetailIndex)

    if (isMobileOrTablet) {
      toggleExpanded()
    }
  }

  const goToItem = (categoryIndex: number, itemIndex: number) => {
    const docsDetailIndex = docsItems[categoryIndex].starting + itemIndex
    eventTracker(
      'Go to item',
      `${docsDetails[docsDetailIndex].category}:${docsDetails[docsDetailIndex].title}`,
    )
    setCurrentDocsDetailIndex(docsDetailIndex)

    if (isMobileOrTablet) {
      toggleExpanded()
    }
  }

  const isCurrentPageSelected = (categoryIndex: number, itemIndex: number) => {
    return currentDocsDetailIndex == docsItems[categoryIndex].starting + itemIndex
  }

  const getImageForText = (image: String) => {
    switch (image) {
      case 'Image1':
        return Image1
      case 'Image2':
        return Image2
      case 'Image3':
        return Image3
      case 'Image4':
        return Image4
      case 'Image5':
        return Image5
      case 'Image6':
        return Image6
      case 'Image7':
        return Image7
      case 'Image8':
        return Image8
      case 'Image9':
        return Image9
      case 'Image10':
        return Image10
      case 'Image11':
        return Image11
      case 'Image12':
        return Image12
      default:
        break
    }
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
            <Typography className="docs_details_category">
              {docsDetails[currentDocsDetailIndex].category}
            </Typography>
            <Typography className="docs_details_title">
              {docsDetails[currentDocsDetailIndex].title}
            </Typography>
            {docsDetails[currentDocsDetailIndex].text.map((line, index) => (
              <>
                <Typography className={`docs_details_text ${line[1]}`} key={index}>
                  {line[0]}
                </Typography>
                {line[2] && (
                  <div className="docs_details_image_wrapper">
                    <img className="docs_details_image" src={getImageForText(line[2] as String)} />
                  </div>
                )}
              </>
            ))}
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
              <Typography className="docs_details_category">
                {docsDetails[currentDocsDetailIndex].category}
              </Typography>
              <Typography className="docs_details_title">
                {docsDetails[currentDocsDetailIndex].title}
              </Typography>
              {docsDetails[currentDocsDetailIndex].text.map((line, index) => (
                <>
                  <Typography className={`docs_details_text ${line[1]}`} key={index}>
                    {Array.isArray(line[0]) ? (
                      <>
                        <span className="title-bold">{line[0][0]}</span> {line[0][1]}
                      </>
                    ) : (
                      line[0]
                    )}
                  </Typography>
                  {line[2] && (
                    <div className="docs_details_image_wrapper">
                      <img
                        className="docs_details_image"
                        src={getImageForText(line[2] as String)}
                      />
                    </div>
                  )}
                </>
              ))}
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
