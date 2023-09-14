import { useFormContext } from 'react-hook-form'

import { PrivateAuctionSignerFormValues } from '../Pages/PrivateAuctionSigner/formConfig'

export const usePrivateAuctionSignerForm = () => useFormContext<PrivateAuctionSignerFormValues>()
