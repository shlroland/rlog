import type { Theme } from '@material-ui/core'
import {
  Badge as BadgeBase,
  Typography as TypographyBase,
  Button as ButtonBase,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/styles'
import classnames from 'classnames'
import type { FC } from 'react'
import type { BadgeProps, ButtonProps, TypographyProps } from './types'
import { createStyled, getColor, getFontSize, getFontWeight } from './utils'

export const useStyles = makeStyles(() => ({
  badge: {
    fontWeight: 600,
    height: 16,
    minWidth: 16,
  },
}))

export const Badge: FC<BadgeProps> = ({ children, colorBrightness, color, ...props }) => {
  const classes = useStyles()
  const theme = useTheme() as Theme
  const Styled = createStyled({
    badge: {
      backgroundColor: getColor(color, theme, colorBrightness),
    },
  })

  return (
    <Styled>
      {(styledProps) => (
        <BadgeBase
          classes={{
            badge: classnames(classes.badge, styledProps.classes.badge),
          }}
          {...props}>
          {children}
        </BadgeBase>
      )}
    </Styled>
  )
}

export const Typography: FC<TypographyProps> = ({
  children,
  weight,
  size,
  colorBrightness,
  color,
  ...props
}) => {
  const theme = useTheme() as Theme

  return (
    <TypographyBase
      style={{
        color: getColor(color, theme, colorBrightness),
        fontWeight: getFontWeight(weight),
        fontSize: getFontSize(size, props.variant, theme),
      }}
      {...props}>
      {children}
    </TypographyBase>
  )
}

export const Button: FC<ButtonProps> = ({ children, color, className, ...props }) => {
  const theme = useTheme() as Theme

  const Styled = createStyled({
    root: {
      color: getColor(color, theme),
    },
    contained: {
      backgroundColor: getColor(color, theme),
      boxShadow: theme.customShadows.widget,
      color: `${color ? 'white' : theme.palette.text.primary} !important`,
      '&:hover': {
        backgroundColor: getColor(color, theme, 'light'),
        boxShadow: theme.customShadows.widgetWide,
      },
      '&:active': {
        boxShadow: theme.customShadows.widgetWide,
      },
    },
    outlined: {
      color: getColor(color, theme),
      borderColor: getColor(color, theme),
    },
    select: {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
  })

  return (
    <Styled>
      {({ classes }) => (
        <ButtonBase
          classes={{
            contained: classes.contained,
            root: classes.root,
            outlined: classes.outlined,
          }}
          {...props}
          className={classnames(
            {
              [classes.select]: props.select,
            },
            className,
          )}>
          {children}
        </ButtonBase>
      )}
    </Styled>
  )
}
