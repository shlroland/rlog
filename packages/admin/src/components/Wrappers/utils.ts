/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Theme, Palette } from '@material-ui/core'
import type { Styles, WithStylesOptions, ThemeOfStyles } from '@material-ui/styles'
import { withStyles } from '@material-ui/styles'
import type { FC } from 'react'
// import { createElement, ReactNode } from 'react'

function getColor(color?: keyof Palette, theme?: Theme, brigtness = 'main') {
  if (color && theme?.palette[color] && theme.palette[color][brigtness]) {
    return theme.palette[color][brigtness] as string
  } else {
    return ''
  }
}

function getFontWeight(style?: string) {
  switch (style) {
    case 'light':
      return 300
    case 'medium':
      return 500
    case 'bold':
      return 600
    default:
      return 400
  }
}

function getFontSize(size?: string, variant = '', theme?: Theme) {
  let multiplier

  switch (size) {
    case 'sm':
      multiplier = 0.8
      break
    case 'md':
      multiplier = 1.5
      break
    case 'xl':
      multiplier = 2
      break
    case 'xxl':
      multiplier = 3
      break
    default:
      multiplier = 1
      break
  }

  const defaultSize =
    variant && theme?.typography[variant]
      ? theme.typography[variant].fontSize
      : theme?.typography.fontSize + 'px'

  return `calc(${defaultSize} * ${multiplier})`
}

const createStyled = <K extends Styles<any, any>>(
  styles: K,
  options?: WithStylesOptions<ThemeOfStyles<K>>,
) => {
  const WrapStyle = withStyles(styles, options)
  const fn: FC<{
    classes: { [P in keyof K]: string }
    children: (props: { classes: { [P in keyof K]: string } }) => JSX.Element
  }> = (props) => {
    const { classes, children } = props
    return children({ classes })
  }
  return WrapStyle(fn)
}

export { getColor, getFontWeight, getFontSize, createStyled }
