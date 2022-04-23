import React from 'react'
import './assets/css/style.css'
import { Maps } from './pages/home'

function App () {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_APIKEY ?? ''

  return <Maps apiKey={apiKey}/>
}

export default App
