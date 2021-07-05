import type {
  BadgeProps as BadgeBaseProps,
  Palette,
  TypographyProps as TypographyBaseProps,
  ButtonBaseProps,
} from '@material-ui/core'

export interface BadgeProps extends Omit<BadgeBaseProps, 'color'> {
  color?: keyof Palette
  colorBrightness?: string
}

export interface TypographyProps extends TypographyBaseProps {
  weight?: string
  size?: string
  colorBrightness?: string
  color?: keyof Palette
}

export interface ButtonProps extends ButtonBaseProps {
  color?: keyof Palette
  className?: string
  select?: boolean
}
