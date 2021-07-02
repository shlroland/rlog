// import { useTheme } from '@material-ui/core'
import type { Theme } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/styles'
import { createStyled, getColor } from './utils'

export const useStyles = makeStyles(() => ({
  badge: {
    fontWeight: 600,
    height: 16,
    minWidth: 16,
  },
}))

export const Badge = () => {
  //   const classes = useStyles()
  const theme = useTheme() as Theme
  const Styled = createStyled({
    badge: {
      backgroundColor: getColor('secondary', theme, 'lignt'),
    },
  })

  return (
    <Styled>
      {(sp) => {
        console.log(sp)
        return <span />
      }}
    </Styled>
  )
}
