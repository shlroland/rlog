import type { Palette, PaletteColor, Theme } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/styles'
import classnames from 'classnames'

// styles
const useStyles = makeStyles((theme: Theme) => ({
  dotBase: {
    width: 8,
    height: 8,
    backgroundColor: theme.palette.text.hint,
    borderRadius: '50%',
    transition: theme.transitions.create('background-color'),
  },
  dotSmall: {
    width: 5,
    height: 5,
  },
  dotLarge: {
    width: 11,
    height: 11,
  },
}))

interface DotProp {
  size?: string
  color: keyof Palette | '' | false | undefined
}

export default function Dot({ size, color }: DotProp) {
  const classes = useStyles()
  const theme = useTheme() as Theme

  return (
    <div
      className={classnames(classes.dotBase, {
        [classes.dotLarge]: size === 'large',
        [classes.dotSmall]: size === 'small',
      })}
      style={{
        backgroundColor: (color &&
          theme.palette[color] &&
          (theme.palette[color] as PaletteColor).main) as string,
      }}
    />
  )
}
