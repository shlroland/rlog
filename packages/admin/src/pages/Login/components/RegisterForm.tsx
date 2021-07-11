import { Button, CircularProgress, TextField } from '@material-ui/core'
import useStyles from '../styles'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import type { RegisterData } from '../typeDefs'
import { REGISTER } from '../typeDefs'
import { omit } from 'lodash-es'
import SnackbarUtils from 'src/components/Toast'
import type { FC } from 'react'

export interface IRegisterForm {
  username: string
  password: string
  email: string
  confirmPassword: string
}

export interface RegisterFormProp {
  changeTab: () => void
}

const RegisterForm: FC<RegisterFormProp> = ({ changeTab }) => {
  const classes = useStyles()

  const { handleSubmit, control, getValues } = useForm<IRegisterForm>({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
    },
  })

  const [register, { loading }] = useMutation<RegisterData>(REGISTER, {
    onCompleted(data) {
      if (data?.register?.userId) {
        SnackbarUtils.success('注册成功')
        changeTab()
        // history.goBack()
      }
    },
  })

  const onSubmit = (data: IRegisterForm) => {
    register({ variables: { input: omit(data, ['confirmPassword']) } })
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
            margin="normal"
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
        name="email"
        control={control}
        rules={{
          required: '请输入电子邮箱!',
          pattern: {
            value:
              /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i,
            message: '请输入合法电子邮箱!',
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            id="email"
            label="电子邮箱"
            variant="standard"
            fullWidth
            required
            margin="normal"
            InputProps={{
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            placeholder="请输入电子邮箱"
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
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: '请再次确认密码!',
          validate(value) {
            return value === getValues('password')
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            id="confirmPassword"
            InputProps={{
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            onChange={onChange}
            value={value}
            margin="normal"
            placeholder="请再次输入密码"
            type="password"
            label="确认密码"
            variant="standard"
            fullWidth
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <div className={classes.creatingButtonContainer}>
        {loading ? (
          <CircularProgress size={26} />
        ) : (
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.createAccountButton}>
            创建账号
          </Button>
        )}
      </div>
    </form>
  )
}

export default RegisterForm
