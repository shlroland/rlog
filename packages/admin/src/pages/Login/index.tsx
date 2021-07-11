import logo from 'src/assets/images/logo2.svg'
import {
  Button,
  CircularProgress,
  Fade,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core'
import { useState } from 'react'
import useStyles from './styles'
// import { useForm, Controller } from 'react-hook-form'
import LoginForm from './components/LoginForm'

export interface ILoginForm {
  username: string
  password: string
}

const Login = () => {
  const classes = useStyles()

  const [isLoading] = useState(false)
  const [activeTabId, setActiveTabId] = useState(0)
  const [error] = useState(undefined)
  const [loginValue, setLoginValue] = useState('admin@flatlogic.com')
  const [passwordValue, setPasswordValue] = useState('password')
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
          {activeTabId === 1 && (
            <>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                // value={nameValue}
                // onChange={(e) => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Full Name"
                label="Name"
                variant="standard"
                type="text"
                fullWidth
              />
              <TextField
                id="email"
                // InputProps={{
                //   classes: {
                //     // underline: classes.textFieldUnderline,
                //     input: classes.textField,
                //   },
                // }}
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                label="Email"
                variant="standard"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                label="Password"
                variant="standard"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    // onClick={() =>
                    //   loginUser(
                    //     userDispatch,
                    //     loginValue,
                    //     passwordValue,
                    //     props.history,
                    //     setIsLoading,
                    //     setError,
                    //   )
                    // }
                    // disabled={
                    //   loginValue.length === 0 ||
                    //   passwordValue.length === 0 ||
                    //   nameValue.length === 0
                    // }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}>
                    Create your account
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Grid>
  )
}

export default Login
