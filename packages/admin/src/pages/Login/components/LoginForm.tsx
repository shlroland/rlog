import { useLazyQuery } from '@apollo/client'
import { TextField, CircularProgress, Button } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import useStyles from '../styles'
import type { LoginData } from '../typeDefs'
import { LOGIN } from '../typeDefs'
import SnackbarUtils from 'src/components/Toast'

export interface ILoginForm {
  username: string
  password: string
}

const LoginForm = () => {
  const classes = useStyles()

  const { handleSubmit, control, watch } = useForm<ILoginForm>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const [loginMutate, { loading }] = useLazyQuery<LoginData>(LOGIN, {
    fetchPolicy: 'no-cache',
    onError() {
      SnackbarUtils.error('登录失败，请重试!')
    },
  })

  const username = watch('username')
  const password = watch('password')

  const onSubmit = (data: ILoginForm) => {
    loginMutate({
      variables: { input: { ...data } },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        rules={{
          required: '请输入用户名!',
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            id="username"
            label="用户名"
            variant="standard"
            fullWidth
            required
            InputProps={{
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: '请输入密码!' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            id="password"
            InputProps={{
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            onChange={onChange}
            value={value}
            margin="normal"
            placeholder="请输入密码"
            type="password"
            label="密码"
            variant="standard"
            fullWidth
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />

      <div className={classes.formButtons}>
        {loading ? (
          <CircularProgress size={26} className={classes.loginLoader} />
        ) : (
          <Button
            disabled={username.length === 0 || password.length === 0}
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
            type="submit"
            variant="contained"
            color="primary"
            size="large">
            登录
          </Button>
        )}
        <Button color="primary" size="large" className={classes.forgetButton}>
          Forget Password
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
