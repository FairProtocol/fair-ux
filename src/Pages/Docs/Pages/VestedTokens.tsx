import { Typography } from '@mui/material'
import '../index.scss'

const VestedTokens: React.FC = () => {
  return (
    <div>
      <Typography className="docs_details_category">Batch Auctions</Typography>
      <Typography className="docs_details_title">Vested Tokens</Typography>
      <>
        <Typography className="docs_details_text">
          Fair Protocol offers a unique method to sell vested tokens. Vested tokens allow projects
          and investors to align incentives over a longer period and hence are a great bootstrapping
          tool for new projects.
        </Typography>
        <Typography className="docs_details_text">
          Note that vested token implementations are not trivial, as the vesting period can be
          bypassed if the sale is not carried out properly. E.g., if the vested token distribution
          allows smart contract addresses to participate, any claim on future vested tokens can be
          tokenized with a special smart contract. These tokenized claims would then allow everyone
          to trade the vested tokens immediately. Fair Protocol has a unique feature that allows the
          auctioneer to allowlist only EOA account, which can not tokenize any future claims in a
          trustless setup. This ensures that the vested tokens sold can not be made liquid without
          any further trust assumptions.
        </Typography>
        <Typography className="docs_details_text title-bold">Vested token contracts</Typography>
        <Typography className="docs_details_text">
          The vested token contract with the best fit for the platform is an ERC20 token with a
          disabled transfer function during the vesting period for all addresses, but with a few
          exceptions. The exceptions required to start a successful auction are the
          auctioneer&apos;s address and the auction contract.
        </Typography>
        <Typography className="docs_details_text">
          In this setup, every user can use bidding tokens - e.g. USDC - to bid in the auction for
          the vesting tokens and then later claim the bought vested tokens into their wallet. But no
          investor will be able to move the vested tokens out of their wallet during the vesting
          period. If each participating wallet is only an EAO account, the claimed vested tokens can
          not be tokenized in a trustless manner.
        </Typography>
        <Typography className="docs_details_text">
          Further additions like linear vesting schedules can also be applied.
        </Typography>
        <Typography className="docs_details_text">
          An example of a vested token can be found{' '}
          <a
            href="https://etherscan.io/address/0x0C033bb39e67eB598D399C06A8A519498dA1Cec9#code"
            rel="noreferrer"
            target="_blank"
          >
            here
          </a>{' '}
          with its associated{' '}
          <a
            href="https://fairprotocol.eth.limo/#/auction?auctionId=34&chainId=1#topAnchor"
            rel="noreferrer"
            target="_blank"
          >
            auction
          </a>
          .
        </Typography>
        <Typography className="docs_details_text title-bold">
          To start an auction for vested tokens
        </Typography>
        <Typography className="docs_details_text one-spacing">
          1. Deploy your vesting token.
        </Typography>
        <Typography className="docs_details_text one-spacing">
          2. Declare the necessary exceptions for the transfer restrictions: Auctioneer + Fair
          Protocol contract.
        </Typography>
        <Typography className="docs_details_text one-spacing">
          3. Start a new private auction via the{' '}
          <a href="https://fairprotocol.eth.limo/#/create-auction" rel="noreferrer" target="_blank">
            create-auction
          </a>{' '}
          section.
        </Typography>
        <Typography className="docs_details_text one-spacing">
          4. Only allowlist participants that are EOA accounts (and, if it applies, satisfy the
          needed KYC-level).
        </Typography>
      </>
    </div>
  )
}

export default VestedTokens
