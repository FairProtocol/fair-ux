import { InputAdornment } from '@mui/material'
import { ReactComponent as SearchIcon } from 'src/assets/images/search-icon.svg'
import { useAccount, useNetwork } from 'wagmi'

import {
  FORM_PARAMETERS,
  FormKeys,
  PrivateAuctionSignerFormValues,
} from '../../../Pages/PrivateAuctionSigner/formConfig'
import { additionalServiceApi } from '../../../api'
import { positiveNumberRegex } from '../../../constants'
import { usePrivateAuctionSignerForm } from '../../../hooks/usePrivateAuctionSignerForm'
import FormInput from '../../form/Input'
import Input from '../../form/TextInput'

const formKey: FormKeys = 'auctionId'

export const AuctionIdInput = () => {
  const { label, tooltipText } = FORM_PARAMETERS[formKey]
  const { clearErrors, formState, getFieldState, register, watch } = usePrivateAuctionSignerForm()
  const { address } = useAccount()
  const { chain } = useNetwork()
  const chainId = chain?.id

  return (
    <FormInput className="auction-signer_main_auction-id-wrapper" tooltip={tooltipText}>
      <Input<PrivateAuctionSignerFormValues>
        className="auction-signer_main_auction-id"
        clearErrors={clearErrors}
        formState={formState}
        inputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: { borderRadius: '0.5em' },
        }}
        name={formKey}
        placeholder={label}
        register={register}
        rules={{
          required: 'Please enter the auctionId',
          pattern: { value: positiveNumberRegex, message: 'Please enter a positive number.' },
          validate: {
            min: (value) => value > 0 || 'Amount to buy should be positive',
            isPrivateAuction: async (value) => {
              if (!chainId) return 'Please select a chain'
              const params = {
                networkId: chainId,
                auctionId: value,
              }

              try {
                const auctionInfo = await additionalServiceApi.getAuctionDetails(params)
                const { allowListSigner, isPrivateAuction } = auctionInfo
                if (!isPrivateAuction) return 'Auction is not private!'
                if (
                  allowListSigner.substring(26).toLowerCase() !==
                  address?.substring(2).toLowerCase()
                )
                  return 'You are not the auction signer!'
              } catch (err) {
                return 'Invalid auction ID'
              }
              return true
            },
          },
        }}
        showError={getFieldState(formKey).isDirty}
        watch={watch}
      />
    </FormInput>
  )
}
