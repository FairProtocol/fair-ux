import { useFormContext } from 'react-hook-form'

import { LaunchAuctionFormValues } from '../Pages/CreateAuction/formConfig'

export const useAuctionForm = () => useFormContext<LaunchAuctionFormValues>()
