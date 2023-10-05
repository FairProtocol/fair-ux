import React, { MutableRefObject, useMemo, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import ArrowBackwardIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import MagnifierIcon from '@mui/icons-material/Search'
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { Row, useFilters, useGlobalFilter, usePagination, useTable } from 'react-table'

import './AllAuctions.scss'
import { useAnalyticsEventTracker } from '../../../Pages/App'

interface Props {
  tableData: any[]
}

const AllAuctions = (props: Props) => {
  const eventTracker = useAnalyticsEventTracker('Auction List')

  const { tableData, ...restProps } = props
  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'symbol',
        align: 'flex-start',
        show: true,
        style: { height: '100%', justifyContent: 'center' },
      },
      {
        Header: '',
        accessor: 'selling',
        align: 'flex-start',
        show: true,
        style: {},
      },
      {
        Header: 'Auction ID',
        accessor: 'auctionId',
        align: 'flex-start',
        show: true,
        style: {},
      },
      {
        Header: 'Bid Token',
        accessor: 'buying',
        align: 'flex-start',
        show: true,
        style: {},
      },
      {
        Header: 'Status',
        accessor: 'status',
        align: 'flex-start',
        show: true,
        style: {},
      },
      {
        Header: 'Type',
        accessor: 'type',
        align: 'flex-start',
        show: true,
        style: {},
        filter: 'searchInTags',
      },
      {
        Header: 'Participation',
        accessor: 'participation',
        align: 'flex-start',
        show: true,
        style: {},
        filter: 'searchInTags',
      },
      {
        Header: 'Network',
        accessor: 'chainId',
        align: 'flex-start',
        show: true,
        style: {},
      },
      {
        Header: 'End date',
        accessor: 'date',
        align: 'flex-start',
        show: true,
        style: {},
      },
      {
        Header: '',
        accessor: 'chevron',
        align: 'flex-end',
        show: true,
        style: { height: '100%', justifyContent: 'center' },
      },
      {
        Header: '',
        accessor: 'url',
        align: '',
        show: false,
        style: {},
      },
    ],
    [],
  )
  const data = useMemo(() => Object.values(tableData), [tableData])
  const [currentDropdownFilter, setCurrentDropdownFilter] = useState<string | undefined>()

  const searchValue = React.useCallback((element: any, filterValue: string) => {
    const isReactElement = element && element.props && element.props.children
    const isString = !isReactElement && typeof element === 'string'
    const value = isReactElement
      ? element.props?.children[0]?.props?.children
      : isString
      ? element
      : ''

    return filterValue.length === 0
      ? true
      : String(value).toLowerCase().includes(String(filterValue).toLowerCase())
  }, [])

  const filterTypes = React.useMemo(
    () => ({
      searchInTags: (rows: Row<object>[], id: any, filterValue: string) =>
        rows.filter((row) => searchValue(row.values[id], filterValue)),
    }),
    [searchValue],
  )

  const globalFilter = React.useMemo(
    () => (rows: Row<object>[], columns: string[], filterValue: string) =>
      rows.filter((row) => {
        let searchResult = false
        for (const column of columns) {
          searchResult = searchResult || searchValue(row.values[column], filterValue)
        }
        return searchResult
      }),
    [searchValue],
  )

  const {
    canNextPage,
    canPreviousPage,
    nextPage,
    page,
    prepareRow,
    previousPage,
    rows,
    setAllFilters,
    setFilter,
    setGlobalFilter,
    setPageSize,
    state,
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      globalFilter,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    useFilters,
    usePagination,
  )
  const sectionHead = useRef() as MutableRefObject<HTMLDivElement>

  const updateFilter = (column?: string | undefined, value?: string | undefined) => {
    setAllFilters([])
    if (column && value) {
      setFilter(column, value)
    }
  }

  const filterOptions = [
    {
      onClick: updateFilter,
      title: 'All Auctions',
    },
    {
      column: 'participation',
      onClick: updateFilter,
      title: 'Participation "Yes"',
      value: 'yes',
    },
    {
      column: 'participation',
      onClick: updateFilter,
      title: 'Participation "No"',
      value: 'no',
    },
    {
      column: 'status',
      onClick: updateFilter,
      title: 'Ongoing',
      value: 'ongoing',
    },
    {
      column: 'status',
      onClick: updateFilter,
      title: 'Ended',
      value: 'ended',
    },
    {
      column: 'type',
      onClick: updateFilter,
      title: 'Private',
      value: 'private',
    },
    {
      column: 'type',
      onClick: updateFilter,
      title: 'Public',
      value: 'public',
    },
  ]

  const { pageIndex, pageSize } = state
  const noAuctions = tableData.length === 0
  const noAuctionsFound = page.length === 0
  const noData = noAuctions || noAuctionsFound

  function handleNextPage() {
    eventTracker('Next list', '')
    nextPage()
    sectionHead.current.scrollIntoView()
  }

  function handlePrevPage() {
    eventTracker('Previous list', '')
    previousPage()
    sectionHead.current.scrollIntoView()
  }

  return (
    <Box className="all_auctions" ref={sectionHead} {...restProps}>
      <Container maxWidth="xl">
        <div className="all_auctions_root">
          <Typography className="all_auctions_title" color={'#180B2D'} fontSize="0.875rem">
            All Auctions
          </Typography>
          <div className="all_auctions_inner_container">
            <div className="table_controls">
              <div className="search_wrapper">
                <MagnifierIcon style={{ color: '#5940C1' }} />
                <input
                  className="search_input"
                  onChange={(e: any) => {
                    eventTracker('Search', e.target.value)
                    setGlobalFilter(e.target.value)
                  }}
                  placeholder={`Search Auctions`}
                  value={state.globalFilter || ''}
                />
                <button
                  className="search_delete"
                  disabled={!state.globalFilter}
                  onClick={() => {
                    setGlobalFilter(undefined)
                  }}
                >
                  <DeleteIcon />
                </button>
              </div>
              <FormControl className="auction_filter_wrapper">
                <Select
                  sx={{ height: '3rem' }}
                  value={currentDropdownFilter ? currentDropdownFilter : filterOptions[0].title}
                >
                  {filterOptions.map((item, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        eventTracker('Filter', item.title)
                        item.onClick(item.column, item.value)
                        setCurrentDropdownFilter(item.title)
                      }}
                      sx={{ color: '#5940C1' }}
                      value={item.title}
                    >
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {noData ? (
              <div className="empty_content_wrapper">
                <InfoIcon />
                <p className="empty_content_text">
                  {noAuctions && 'No auctions.'}
                  {noAuctionsFound && 'No auctions found.'}
                </p>
              </div>
            ) : (
              <>
                <div className="table">
                  <div className="row_head">
                    <>
                      {prepareRow(page[0])}
                      {page[0].cells.map(
                        (cell, i) =>
                          cell.render('show') && (
                            <span className="table_cell" key={i}>
                              {cell.render('Header')}
                            </span>
                          ),
                      )}
                    </>
                  </div>
                  <div className="table_body">
                    {page.map((row, i) => {
                      prepareRow(row)
                      return (
                        <NavLink
                          className="row_css"
                          key={i}
                          // @ts-ignore
                          onClick={() => eventTracker(row.original['url'], '')}
                          // @ts-ignore
                          to={row.original['url'] ? row.original['url'] : '#'}
                        >
                          {row.cells.map((cell, j) => {
                            return (
                              cell.render('show') && (
                                <span className="table_cell" key={j}>
                                  <span>
                                    {cell.column.Header === 'Selling' ||
                                    cell.column.Header === 'Buying'
                                      ? cell.value.slice(0, 7)
                                      : cell.value}
                                  </span>
                                  <span className="mobile_header_view">
                                    {cell.render('Header')}
                                  </span>
                                </span>
                              )
                            )
                          })}
                        </NavLink>
                      )
                    })}
                  </div>
                  <div className="pagination">
                    <span className="pagination_block">
                      <span className="pagination_text" style={{ marginRight: '0.5rem' }}>
                        Rows per page
                      </span>{' '}
                      <FormControl className="pagination_filter_wrapper">
                        <Select
                          sx={{ '.MuiOutlinedInput-notchedOutline': { borderStyle: 'none' } }}
                          value={pageSize}
                        >
                          {[5, 10, 20, 30].map((pageSize) => (
                            <MenuItem
                              key={pageSize}
                              onClick={() => {
                                setPageSize(Number(pageSize))
                              }}
                              sx={{ color: '#5940C1' }}
                              value={pageSize}
                            >
                              {pageSize}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </span>
                    <span className="pagination_break">|</span>
                    <span className="pagination_block">
                      <span className="pagination_text" style={{ marginRight: '0.5rem' }}>
                        {pageIndex + 1 === 1 ? 1 : pageIndex * pageSize + 1} -{' '}
                        {rows.length < (pageIndex + 1) * pageSize
                          ? rows.length
                          : (pageIndex + 1) * pageSize}{' '}
                        of {rows.length} auctions
                      </span>{' '}
                      <button
                        className="pagination_button"
                        disabled={!canPreviousPage}
                        onClick={() => handlePrevPage()}
                      >
                        <ArrowBackwardIosIcon />
                      </button>
                      <button
                        className="pagination_button"
                        disabled={!canNextPage}
                        onClick={() => handleNextPage()}
                      >
                        <ArrowForwardIosIcon />
                      </button>
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </Box>
  )
}

export default AllAuctions
