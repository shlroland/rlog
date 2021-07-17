import type { FC } from 'react'
import { createElement } from 'react'
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useUserState } from 'src/context/UserContext'
import ArticleEditor from 'src/pages/editor'
import Login from 'src/pages/login'
import Layout from './Layout'
import type { RouteProps } from './types'

function App() {
  const { isAuthenticated } = useUserState()

  const PrivateRoute: FC<RouteProps> = ({ component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    )
  }

  const PublicRoute: FC<RouteProps> = ({ component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: '/',
              }}
            />
          ) : (
            createElement(component, props)
          )
        }
      />
    )
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <Route exact path="/editor/:id" component={ArticleEditor} />
      </Switch>
    </Router>
  )
}

export default App
