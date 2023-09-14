import { useCallback, useEffect, useState } from 'react'

import useIsSigner from './useIsSigner'
import { additionalServiceApi } from '../../../api'
import { AddressEntry } from '../../../api/AdditionalServicesApi'
import { usePrivateAuctionSignerForm } from '../../../hooks/usePrivateAuctionSignerForm'

const useAuctionWhitelist = () => {
  const { watch } = usePrivateAuctionSignerForm()
  const auctionId = watch('auctionId')
  const enabled = useIsSigner()
  const [whitelistAddresses, setWhitelistAddresses] = useState<AddressEntry[]>([])

  const fetchWhiteList = useCallback(async () => {
    const params = {
      auctionId,
    }

    const addresses = await additionalServiceApi.getWhitelistedAddresses(params)

    setWhitelistAddresses(addresses)
  }, [auctionId])

  useEffect(() => {
    if (!auctionId || !enabled) {
      return
    }

    fetchWhiteList()
  }, [auctionId, enabled, fetchWhiteList])

  return { whitelistAddresses, fetchWhiteList }
}

export default useAuctionWhitelist
