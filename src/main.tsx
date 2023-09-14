import './polyfills'

import React from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ConnectKitProvider } from 'connectkit'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { WagmiConfig } from 'wagmi'

import App from './Pages/App'
import { config } from './connectors'
import store from './state'
import './index.css'

dayjs.extend(relativeTime)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <ConnectKitProvider debugMode>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <App />
          </LocalizationProvider>
        </Provider>
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
