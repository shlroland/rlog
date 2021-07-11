import logo from 'src/assets/images/logo2.svg'
import { Grid, Tab, Tabs, Typography } from '@material-ui/core'
import { useState } from 'react'
import useStyles from './styles'
// import { useForm, Controller } from 'react-hook-form'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

export interface ILoginForm {
  username: string
  password: string
}

const Login = () => {
  const classes = useStyles()
  const [activeTabId, setActiveTabId] = useState(0)

  const changeTab = () => {
    setActiveTabId(0)
  }
  // const [error] = useState(undefined)
  // const [loginValue, setLoginValue] = useState('admin@flatlogic.com')
  // const [passwordValue, setPasswordValue] = useState('password')
  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography variant="h1" className={classes.logotypeText}>
          Rlog Admin
        </Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered>
            <Tab label="登录" classes={{ root: classes.tab }} />
            <Tab label="注册" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && <LoginForm />}
          {activeTabId === 1 && <RegisterForm changeTab={changeTab} />}
        </div>
      </div>
    </Grid>
  )
}

export default Login
