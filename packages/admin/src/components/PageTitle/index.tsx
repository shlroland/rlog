// styles
import useStyles from './styles'

// components
import { Typography } from '../Wrappers'
import type { FC, ReactNode } from 'react'

const PageTitle: FC<{ button?: ReactNode; title: ReactNode }> = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1" size="sm">
        {props.title}
      </Typography>
      {props.button && props.button}
    </div>
  )
}

export default PageTitle
