import Header from '../Header'
import Sidebar from '../Sidebar'
import useStyles from './styles'

const Layout = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header />
      <Sidebar />
    </div>
  )
}

export default Layout
