import React from 'react'
import ReactDOM from 'react-dom'
import { SnackbarProvider } from 'notistack'
import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={1} hideIconVariant={true}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
