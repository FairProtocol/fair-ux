import { useCallback } from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import { secp256k1 } from '@noble/curves/secp256k1'
import {
  encodeAbiParameters,
  hexToNumber,
  keccak256,
  parseAbiParameters,
  toBytes,
  toHex,
} from 'viem'
import { useAccount, useNetwork, useWalletClient } from 'wagmi'

import { ALLOW_LIST_OFF_CHAIN_MANAGED } from '../../../constants'
import { usePrivateAuctionSignerForm } from '../../../hooks/usePrivateAuctionSignerForm'
import { getLogger } from '../../../utils/logger'
import { ChainId } from '../../../utils/networkConfig'
import { domain, hashDomain } from '../utils'

const logger = getLogger('useGenerateSignature')

const useGenerateSignature = () => {
  const { watch } = usePrivateAuctionSignerForm()
  const { data: signer } = useWalletClient()
  const { address: signerAddress } = useAccount()
  const { chain } = useNetwork()

  const chainId = chain?.id

  const whitelistedAddress = watch('whitelistedAddress')
  const auctionId = watch('auctionId')

  return useCallback(async () => {
    if (!signer) return []
    if (whitelistedAddress.length > 0 && chainId && auctionId) {
      const addressList = whitelistedAddress.trim()?.split(/[\n, ]+/)
      const contractDomain = domain(chainId, ALLOW_LIST_OFF_CHAIN_MANAGED[chainId as ChainId])
      const signatures: { user: string; signature: string }[] = []
      await Promise.all(
        addressList.map(async (address: string) => {
          const types = {
            EIP712Domain: [
              domain?.name && { name: 'name', type: 'string' },
              contractDomain?.version && { name: 'version', type: 'string' },
              contractDomain?.chainId && { name: 'chainId', type: 'uint256' },
              contractDomain?.verifyingContract && {
                name: 'verifyingContract',
                type: 'address',
              },
            ].filter(Boolean),
          }
          const hashedDomain = hashDomain({ domain: contractDomain, types })
          const auctioneerMessage = keccak256(
            encodeAbiParameters(parseAbiParameters('bytes32, address, uint256'), [
              hashedDomain,
              address as `0x${string}`,
              BigInt(auctionId),
            ]),
          )
          const signature = await signer.signMessage({
            account: signerAddress,
            message: { raw: toBytes(auctioneerMessage) },
          })
          try {
            const { r, s } = secp256k1.Signature.fromCompact(signature.slice(2, 130))
            const v = hexToNumber(`0x${signature.slice(130)}`)
            const auctioneerSignatureEncoded = encodeAbiParameters(
              parseAbiParameters('uint8, bytes32, bytes32'),
              [v, toHex(r), toHex(s)],
            )
            signatures.push({
              user: address,
              signature: auctioneerSignatureEncoded,
            })
          } catch (e) {
            logger.error('Error Generating signature', e)
          }
        }),
      )
      return signatures
    }
  }, [whitelistedAddress, signer, signerAddress, chainId, auctionId])
}

export default useGenerateSignature
