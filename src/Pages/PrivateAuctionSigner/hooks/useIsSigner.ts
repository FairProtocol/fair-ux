import { useEffect, useState } from 'react'

import { useAccount, useNetwork } from 'wagmi'

import { useAuctionDetails } from '../../../hooks/useAuctionDetails'
import { usePrivateAuctionSignerForm } from '../../../hooks/usePrivateAuctionSignerForm'

const useIsSigner = () => {
  const [isSigner, setIsSigner] = useState<boolean | null>(null)
  const { chain } = useNetwork()
  const { address } = useAccount()

  const { watch } = usePrivateAuctionSignerForm()
  const auctionId = watch('auctionId')
  const chainId = chain?.id
  const { auctionDetails } = useAuctionDetails({ auctionId, chainId: chainId as number })

  useEffect(() => {
    if (!address || !chainId || !auctionId || !auctionDetails) {
      return
    }
    setIsSigner(null)
    let cancelled = false

    const { allowListSigner } = auctionDetails

    if (!cancelled) {
      setIsSigner(getSigner(allowListSigner)?.toLowerCase() === address.toLowerCase())
    }

    return () => {
      cancelled = true
    }
  }, [address, chainId, auctionId, auctionDetails])

  return isSigner
}

function getSigner(allowListSigner?: string) {
  if (allowListSigner && allowListSigner.length == 66) {
    return `0x${allowListSigner.substring(26)}`
  }
}

export default useIsSigner
