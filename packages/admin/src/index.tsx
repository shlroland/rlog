import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import reportWebVitals from './reportWebVitals'

import Themes from './themes'
import { LayoutProvider } from './components/LayoutContext'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'

ReactDOM.render(
  <React.StrictMode>
    <LayoutProvider>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </LayoutProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
