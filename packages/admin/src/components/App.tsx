import type { FC } from 'react'
import { createElement } from 'react'
import type { RouteProps } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import type { RequireOne } from 'src/utils/genaric'
import Login from 'src/pages/Login'
import Layout from './Layout'

function App() {
  const PrivateRoute: FC<RequireOne<RouteProps, 'component'>> = ({
    component,
    ...rest
  }) => {
    return <Route {...rest} render={() => createElement(component)} />
  }

  const PublicRoute: FC<RequireOne<RouteProps, 'component'>> = ({
    component,
    ...rest
  }) => {
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
        <PrivateRoute path="/" component={Layout} />
        <PublicRoute path="/login" component={Login} />
      </Switch>
    </Router>
  )
}

export default App
