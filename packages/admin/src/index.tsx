import React from 'react'
import ReactDOM from 'react-dom'
import App from './layouts/App'
import reportWebVitals from './reportWebVitals'

import Themes from './themes'
import { LayoutProvider } from './context/LayoutContext'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { StyledEngineProvider } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack5'
import {
  SNACKBAR_MAX_NUM,
  SNACKBAR_ANCHOR_ORIGIN,
  SNACKBAR_AUTO_HIDE_DURATION,
} from './constants'
import { ApolloProvider } from '@apollo/client'
import client from './gql'
import { UserProvider } from './context/UserContext'
import { SnackbarUtilsConfigurator } from './components/Toast'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <LayoutProvider>
        <UserProvider>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={Themes.default}>
              <SnackbarProvider
                maxSnack={SNACKBAR_MAX_NUM}
                anchorOrigin={SNACKBAR_ANCHOR_ORIGIN}
                autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION}>
                <SnackbarUtilsConfigurator />
                <CssBaseline />
                <App />
              </SnackbarProvider>
            </ThemeProvider>
          </StyledEngineProvider>
        </UserProvider>
      </LayoutProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
