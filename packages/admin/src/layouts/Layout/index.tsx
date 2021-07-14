import type { FC } from 'react'
import { Box, IconButton, Link } from '@material-ui/core'
import classnames from 'classnames'
import Header from '../Header'
import Sidebar from '../Sidebar'
import useStyles from './styles'
import { GitHub as GitHubIcon } from '@material-ui/icons'
import { Route, Switch } from 'react-router-dom'
import Dashboard from 'src/pages/dashboard'
import Tables from 'src/pages/tables'
import Posts from 'src/pages/post/post'

const Layout: FC = () => {
  const classes = useStyles()
  // const theme = useTheme()
  return (
    <div className={classes.root}>
      <Header />
      <Sidebar />
      <div
        className={classnames(classes.content, {
          // [classes.contentShift]: layoutState.isSidebarOpened,
        })}>
        <div className={classes.fakeToolbar} />
        <Switch>
          <Route path="/app/dashboard" component={Dashboard} />
          <Route path="/app/tables" component={Tables} />
          <Route path="/app/posts" component={Posts} />
        </Switch>
        <Box
          mt={5}
          width={'100%'}
          display={'flex'}
          alignItems={'center'}
          justifyContent="space-between">
          <div>
            <Link
              color={'primary'}
              underline="none"
              href={'https://flatlogic.com/blog'}
              target={'_blank'}
              className={classes.link}>
              Blog
            </Link>
          </div>
          <div>
            <Link href={'https://github.com/flatlogic'} target={'_blank'}>
              <IconButton aria-label="github" style={{ marginRight: -12 }}>
                <GitHubIcon sx={{ color: '#6E6E6E99' }} />
              </IconButton>
            </Link>
          </div>
        </Box>
      </div>
    </div>
  )
}

export default Layout
