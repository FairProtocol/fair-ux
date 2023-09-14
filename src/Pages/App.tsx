import React, { Suspense, useEffect } from 'react'
import { HashRouter } from 'react-router-dom'

import { tokenLogosServiceApi } from '../api'
import Spinner from '../components/common/spinner/SpinnerLoader'
import Routes from '../components/navigation/Routes/Routes'
import { useTokenListActionHandlers } from '../state/tokenList/hooks'
import TransactionUpdater from '../state/transactions/updater'
import { getLogger } from '../utils/logger'

const logger = getLogger('App')

const App: React.FC = () => {
  const { onLoadTokenList } = useTokenListActionHandlers()

  // Fetch token logos for all chain IDs
  useEffect(() => {
    let cancelled = false
    const fetchTokenList = async (): Promise<void> => {
      try {
        const data = await tokenLogosServiceApi.getAllTokens()
        if (!cancelled) {
          onLoadTokenList(data)
        }
      } catch (error) {
        logger.error('Error getting token list', error)
        if (cancelled) return
        onLoadTokenList(null)
      }
    }

    fetchTokenList()
    return (): void => {
      cancelled = true
    }
  }, [onLoadTokenList])

  return (
    <Suspense fallback={<Spinner open />}>
      <TransactionUpdater />
      <HashRouter>
        <Routes />
      </HashRouter>
    </Suspense>
  )
}

export default App
