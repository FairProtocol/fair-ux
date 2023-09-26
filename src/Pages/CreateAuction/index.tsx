import { Fragment, useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { useNetwork } from 'wagmi'

import './index.scss'
import { DEFAULT_FORM_PARAMS, LaunchAuctionFormValues } from './formConfig'
import { NetworkSelect } from '../../components/common/NetworkSelect'
import { AllowListDataInput } from '../../components/create-auction/AllowListDataInput'
import { AtomicClosureAllowedCheckbox } from '../../components/create-auction/AtomicClosureAllowedSwitch'
import { AuctionEndDate } from '../../components/create-auction/AuctionEndDate'
import { AuctionedSellAmountInput } from '../../components/create-auction/AuctionedSellAmountInput'
import { AuctioningTokenInput } from '../../components/create-auction/AuctioningTokenInput'
import { BiddingTokenInput } from '../../components/create-auction/BiddingTokenInput'
import { DescriptionInput } from '../../components/create-auction/DescriptionInput'
import { DiscordUrlInput } from '../../components/create-auction/DiscordUrlInput'
import ConfirmationModal from '../../components/create-auction/LaunchConfirmationModal'
import { MinBuyAmountInput } from '../../components/create-auction/MinBuyAmountInput'
import { MinimumBiddingAmountPerOrderInput } from '../../components/create-auction/MinimumBiddingAmountPerOrderInput'
import { MinimumFundingThresholdInput } from '../../components/create-auction/MinimumFundingThresholdInput'
import { OrderCancellationEndDate } from '../../components/create-auction/OrderCancellationEndDate'
import { SiteUrlInput } from '../../components/create-auction/SiteUrlInput'
import { SubmitAuctionButton } from '../../components/create-auction/SubmitAuctionButton'
import { SummaryInput } from '../../components/create-auction/SummaryInput'
import { TickerInput } from '../../components/create-auction/TickerInput'
import { TokenNameInput } from '../../components/create-auction/TokenNameInput'
import { TwitterUrlInput } from '../../components/create-auction/TwitterUrlInput'

const sections = ['Launch Auction', 'Network', 'Token', 'Details', 'Auction', 'Social']

const CreateAuction: React.FC = () => {
  const isMobileOrTablet = useMediaQuery('(max-width:960px)')
  const { chain } = useNetwork()

  const formMethods = useForm<Required<LaunchAuctionFormValues>>({
    mode: 'all',
    defaultValues: { ...DEFAULT_FORM_PARAMS, chainId: chain?.id || 1 },
  })

  const [expanded, setExpanded] = useState(false)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const sectionRefs = [
    useRef<null | HTMLDivElement>(null),
    useRef<null | HTMLDivElement>(null),
    useRef<null | HTMLDivElement>(null),
    useRef<null | HTMLDivElement>(null),
    useRef<null | HTMLDivElement>(null),
    useRef<null | HTMLDivElement>(null),
  ]

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const goToSection = (sectionIndex: number) => {
    setCurrentSectionIndex(sectionIndex)
    setExpanded(false)
    sectionRefs[sectionIndex].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    })
  }

  const navigate = useNavigate()
  const navigateToDocs = useCallback(() => {
    navigate('/docs')
  }, [navigate])

  const { control } = formMethods

  useWatch({
    control,
  })

  return (
    <div className={isMobileOrTablet ? '' : 'create-auction_container'}>
      {/* Accordion/Sidebar */}
      {isMobileOrTablet ? (
        <Accordion disableGutters={true} elevation={0} expanded={expanded}>
          <AccordionSummary
            className="create-auction"
            expandIcon={<ExpandMoreIcon />}
            onClick={toggleExpanded}
          >
            <div className="create-auction_accordion">
              <Typography className="create-auction_accordion_section">Create Auction</Typography>
              <Typography className="create-auction_accordion_title">
                {sections[currentSectionIndex]}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails
            className="create-auction"
            sx={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, marginTop: 0 }}
          >
            <Fragment>
              <div className="create-auction_accordion_wrapper">
                <div className="create-auction_divider"></div>
                {sections.map((section, sectionIndex) => (
                  <div className="create-auction_wrapper" key={sectionIndex}>
                    <div
                      className="create-auction_section_button"
                      onClick={() => goToSection(sectionIndex)}
                    >
                      <Typography className="create-auction_section">{section}</Typography>
                    </div>
                  </div>
                ))}
              </div>
            </Fragment>
          </AccordionDetails>
        </Accordion>
      ) : (
        <div className="sidebar">
          <Fragment>
            <div className="create-auction_accordion_wrapper">
              {/* <div className="create-auction_divider"></div> */}
              <Typography className="sidebar_title">Create Auction</Typography>
              {sections.map((section, sectionIndex) => (
                <div className="create-auction_wrapper" key={sectionIndex}>
                  <div
                    className="create-auction_section_button"
                    onClick={() => goToSection(sectionIndex)}
                  >
                    <Typography
                      className={
                        currentSectionIndex === sectionIndex
                          ? 'sidebar_item_selected'
                          : 'sidebar_item'
                      }
                    >
                      {section}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </Fragment>
        </div>
      )}
      {/* Main Content */}
      <FormProvider {...formMethods}>
        <div className="content">
          {/* Launching your token */}
          <div className="content_wrapper" ref={sectionRefs[0]}>
            <Typography className="content_title">
              <WarningAmberIcon />{' '}
              <span style={{ paddingTop: '0.25em' }}>Launching your token</span>
            </Typography>
            <Typography className="content_text">
              You can utilize this user interface for deployment without needing extensive technical
              expertise, unless you require specific auction parameters. Nonetheless, it is
              advisable to engage in discussions with someone well-versed and thoroughly review the
              documentation to gain a deeper understanding before finalizing any transactions.
            </Typography>
            <button className="content_button" onClick={navigateToDocs}>
              <Typography variant="inherit">Read the Docs</Typography>
            </button>
          </div>
          {/* Network */}
          <div className="content_wrapper" ref={sectionRefs[1]}>
            <Typography className="content_title">Network</Typography>
            <Typography className="content_text">
              Fair Protocol supports ERC20 Token Launches on Ethereum, Gnosis, Polygon, Avalanche &
              Binance Smart Chain, including the corresponding testnets (Goerli, Chiado, Mumbai,
              Fuji & BNB Testnet)
            </Typography>
            <NetworkSelect />
          </div>
          {/* Token */}
          <div className="content_wrapper" ref={sectionRefs[2]}>
            <Typography className="content_title">Token</Typography>
            <AuctioningTokenInput />
            <BiddingTokenInput />
          </div>
          {/* Project Details */}
          <div className="content_wrapper" ref={sectionRefs[3]}>
            <Typography className="content_title">Project Details</Typography>
            <TokenNameInput />
            <TickerInput />
            <SummaryInput />
            <DescriptionInput />
          </div>
          {/* Auction */}
          <div className="content_wrapper" ref={sectionRefs[4]}>
            <Typography className="content_title">Auction</Typography>
            <OrderCancellationEndDate />
            <AuctionEndDate />
            <AuctionedSellAmountInput />
            <MinBuyAmountInput />
            <MinimumBiddingAmountPerOrderInput />
            <MinimumFundingThresholdInput />
            <AtomicClosureAllowedCheckbox />
            <AllowListDataInput />
          </div>
          {/* Social */}
          <div className="content_wrapper" ref={sectionRefs[5]}>
            <Typography className="content_title">Social</Typography>
            <SiteUrlInput />
            <TwitterUrlInput />
            <DiscordUrlInput />
          </div>
          {/* Create Auction Button */}
          <SubmitAuctionButton openConfirmationModal={() => setIsOpen(true)} />
        </div>
        {/* Dialog */}
        <ConfirmationModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </FormProvider>
    </div>
  )
}

export default CreateAuction
