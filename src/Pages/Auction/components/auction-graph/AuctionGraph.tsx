import React from 'react'

import { Grid } from '@mui/material'

import useChart from '../../../../hooks/useChart'
import { PricePointDetails } from '../../../../state/types'
import { Token } from '../../../../utils/entities/token'
import { PricePointDummy } from '../../../../utils/orderbookPriceHelpers'
import { XYChart } from '../chart/XYChart'
import './AuctionGraph.scss'

export interface Props {
  baseToken: Token
  data: Maybe<(PricePointDetails | PricePointDummy)[]>
  quoteToken: Token
  chainId: number
}

const AuctionGraph: React.FC<Props> = (props) => {
  const { baseToken, chainId, data, quoteToken } = props

  const { loading, mountPoint } = useChart({
    createChart: XYChart,
    data,
    baseToken,
    quoteToken,
    chainId,
  })

  return (
    <>
      {(!mountPoint || loading) && <div>Loading...</div>}
      {mountPoint && !loading && <Grid className="auction-graph" item ref={mountPoint} />}
    </>
  )
}

export default AuctionGraph
