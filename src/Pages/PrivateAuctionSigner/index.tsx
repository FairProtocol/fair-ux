import { Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'

import { DEFAULT_FORM_PARAMS, PrivateAuctionSignerFormValues } from './formConfig'
import { NetworkSelect } from '../../components/common/NetworkSelect'
import AddressList from '../../components/private-auction-signer/AddressList'
import { AuctionIdInput } from '../../components/private-auction-signer/AuctionIdInput'
import SubmitAddress from '../../components/private-auction-signer/SubmitAddress'
import { WhitelistAddressInput } from '../../components/private-auction-signer/WhitelistAddressesInput'
import './index.scss'

const AuctionSigner: React.FC = () => {
  const formMethods = useForm<Required<PrivateAuctionSignerFormValues>>({
    mode: 'all',
    defaultValues: { ...DEFAULT_FORM_PARAMS },
  })

  return (
    <FormProvider {...formMethods}>
      <div className="auction-signer">
        <div className="auction-signer_container">
          <Typography className="auction-signer_title">Private Auction Signer</Typography>
          <div className="auction-signer_main">
            <div className="auction-signer_main_wrapper">
              <NetworkSelect className="auction-signer_network-select" />
              <AuctionIdInput />
            </div>
            <div className="auction-signer_main_addresses">
              <WhitelistAddressInput />
            </div>
            <div className="auction-signer_main_button_wrapper">
              <SubmitAddress />
            </div>
          </div>
          <Typography className="auction-signer_title">Whitelisted Addresses</Typography>
          <AddressList />
        </div>
      </div>
    </FormProvider>
  )
}

export default AuctionSigner
