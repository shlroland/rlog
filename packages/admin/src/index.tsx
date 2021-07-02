import React from 'react'
import ReactDOM from 'react-dom'
import App from './layouts/App'
import reportWebVitals from './reportWebVitals'

import Themes from './themes'
import { LayoutProvider } from './context/LayoutContext'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { StyledEngineProvider } from '@material-ui/core/styles'
ReactDOM.render(
  <React.StrictMode>
    <LayoutProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={Themes.default}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </LayoutProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
