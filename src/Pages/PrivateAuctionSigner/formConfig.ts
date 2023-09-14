export interface PrivateAuctionSignerFormValues {
  auctionId: number
  whitelistedAddress: string
}

export type FormKeys = keyof PrivateAuctionSignerFormValues

export const DEFAULT_FORM_PARAMS: Readonly<Record<FormKeys, any>> = {
  auctionId: null,
  whitelistedAddress: '',
}

type FormValues = {
  label: string
  tooltipText: string
}

export const FORM_PARAMETERS: Readonly<Record<FormKeys, FormValues>> = {
  auctionId: {
    label: 'Auction ID',
    tooltipText: 'The ID of the auction',
  },
  whitelistedAddress: {
    label: 'Enter addresses to whitelist',
    tooltipText: 'The addresses that are allowed to bid in the auction(comma separated)',
  },
}
