import { FC, HTMLAttributes } from 'react'
import cls from 'classnames'
import styles from './index.module.css'

type ButtonType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | ''
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type: ButtonType
  shape: 'rounded' | 'circle' | ''
  plain: boolean
  block: boolean
  size: 'small' | 'normal' | 'large'
}

const Button: FC<Partial<ButtonProps>> = props => {
  const { type, children, shape, plain, block, size, ...rest } = props

  const classes = cls([styles[type!], styles[`shape-${shape}`], [styles[size!]]], {
    [styles.button]: true,
    [styles.plain]: plain,
    [styles.block]: block,
  })

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  type: '',
  shape: '',
  size: 'normal',
}

export default Button
