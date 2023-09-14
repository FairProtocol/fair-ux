import { useEffect, useState } from 'react'

import { additionalServiceApi } from '../api'
import { AuctionDescription } from '../api/AdditionalServicesApi'
import { AuctionIdentifier } from '../state/types'
import { getLogger } from '../utils/logger'

const logger = getLogger('useAuctionDescription')

export const useAuctionDescription = (
  auctionIdentifier: AuctionIdentifier,
): Maybe<AuctionDescription> => {
  const { auctionId, chainId } = auctionIdentifier
  const [auctionDescription, setAuctionDescription] = useState<Maybe<AuctionDescription>>(null)

  useEffect(() => {
    let cancelled = false
    const fetchApiData = async () => {
      if (!chainId || !auctionId) {
        return
      }
      const params = {
        chainId,
        auctionId,
      }
      try {
        const auctionDescription = await additionalServiceApi.getAuctionDescription(params)

        if (cancelled) return
        setAuctionDescription(auctionDescription)
      } catch (error) {
        if (!cancelled) return
        logger.error('Error getting auction details', error)
      }
    }
    fetchApiData()

    return (): void => {
      cancelled = true
    }
  }, [auctionId, chainId])

  return auctionDescription
}
