import { Grid, InputAdornment, TextField } from '@mui/material'
import dayjs from 'dayjs'
import { ReactComponent as SearchIcon } from 'src/assets/images/search-icon.svg'
import { useNetwork } from 'wagmi'

import useAuctionWhitelist from '../../../Pages/PrivateAuctionSigner/hooks/useAuctionWhitelist'
import { useIsTablet } from '../../../hooks/useIsTablet'
import { usePrivateAuctionSignerForm } from '../../../hooks/usePrivateAuctionSignerForm'
import { Cell } from '../../common/table/CellRow/CellRow'
import Row from '../../common/table/Row/Row'
import StyledCell from '../../common/table/StyledCell/StyledCell'
import TableWrapper from '../../common/table/TableWrapper/TableWrapper'
import './index.scss'

const AddressList = () => {
  const isTablet = useIsTablet()
  const data = useAuctionWhitelist()
  const { watch } = usePrivateAuctionSignerForm()
  const auctionId = watch('auctionId')

  const { chain } = useNetwork()

  const { whitelistAddresses } = data

  const count = whitelistAddresses.length

  return (
    <Grid item xs={12}>
      <TableWrapper>
        <Row className="address-list_table_search" columns={1}>
          <div className={!isTablet ? 'address-list_wrapper' : ''}>
            <TextField
              InputProps={{
                readOnly: true,
                sx: {
                  borderRadius: '0.5rem',
                },
              }}
              className="address-list_addresses"
              value={`Addresses: ${count}`}
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fill="#B9B0ED" />
                  </InputAdornment>
                ),
                sx: { borderRadius: '0.5em' },
              }}
              className="address-list_auction-id"
              disabled={count === 0}
              fullWidth
              placeholder="Search Addresses"
            />
          </div>
        </Row>
        {count > 0 && (
          <>
            <Row className="address-list_table_header" columns={4} hiddenMd>
              <StyledCell>
                <div>Auction ID</div>
              </StyledCell>
              <StyledCell>
                <div>Address</div>
              </StyledCell>
              <StyledCell>
                <div>Network</div>
              </StyledCell>
              <StyledCell>
                <div>Time Added</div>
              </StyledCell>
            </Row>
            {whitelistAddresses.map((addressEntry) => (
              <Row columns={5} key={addressEntry.address}>
                <Cell>
                  <p>
                    <span>Auction ID</span>
                  </p>
                  <span>{auctionId}</span>
                </Cell>
                <Cell>
                  <p>
                    <span>Address</span>
                  </p>
                  <span>{addressEntry.address}</span>
                </Cell>
                <Cell>
                  <p>Network</p>
                  <span>{chain?.name}</span>
                </Cell>
                <Cell>
                  <p>Time Added</p>
                  <span>
                    {addressEntry.dateAdded
                      ? dayjs(addressEntry.dateAdded).format('DD MMM, YYYY')
                      : '-'}
                  </span>
                </Cell>
              </Row>
            ))}
          </>
        )}
      </TableWrapper>
    </Grid>
  )
}

export default AddressList
