import type { FC } from 'react'
import { createElement } from 'react'
// import type { RouteProps } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from 'src/pages/login'
import Layout from './Layout'
import type { RouteProps } from './types'

function App() {
  const PrivateRoute: FC<RouteProps> = ({ component, ...rest }) => {
    return <Route {...rest} render={(props) => createElement(component, props)} />
  }

  const PublicRoute: FC<RouteProps> = ({ component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={
          (props) =>
            // isAuthenticated ? (
            //   <Redirect
            //     to={{
            //       pathname: '/',
            //     }}
            //   />
            // ) : (
            createElement(component, props)
          // )
        }
      />
    )
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route exact path="/app" render={() => <Redirect to="/app/tables" />} />
        <PrivateRoute path="/" component={Layout} />
        <PublicRoute path="/app" component={Login} />
      </Switch>
    </Router>
  )
}

export default App
