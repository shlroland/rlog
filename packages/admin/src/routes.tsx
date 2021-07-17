import { Route, Switch } from 'react-router-dom'
import Dashboard from 'src/pages/dashboard'
import Tables from 'src/pages/tables'
import Posts from 'src/pages/post/post'
const routes = () => {
  return (
    <Switch>
      <Route path="/app/dashboard" component={Dashboard} />
      <Route path="/app/tables" component={Tables} />
      <Route path="/app/posts" component={Posts} />
    </Switch>
  )
}

export default routes
