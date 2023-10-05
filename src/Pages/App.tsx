import React, { Suspense, useEffect } from 'react'
import { HashRouter } from 'react-router-dom'

import ReactGA from 'react-ga4'

import { tokenLogosServiceApi } from '../api'
import Spinner from '../components/common/spinner/SpinnerLoader'
import Routes from '../components/navigation/Routes/Routes'
import { useTokenListActionHandlers } from '../state/tokenList/hooks'
import TransactionUpdater from '../state/transactions/updater'
import { getLogger } from '../utils/logger'

const logger = getLogger('App')

export const useAnalyticsEventTracker = (category: string) => {
  const eventTracker = (action: string, label: string) => {
    ReactGA.event({ category, action, label })
  }
  return eventTracker
}

const App: React.FC = () => {
  const trackingId = '<TRACKING-ID>'
  ReactGA.initialize(trackingId)
  ReactGA.send({ hitType: 'pageview', page: 'https://fairprotocol.eth.limo/' })

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
