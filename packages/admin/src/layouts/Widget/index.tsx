import { Paper, IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import classnames from 'classnames'
import type { ReactNode, CSSProperties, FC } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import useStyles from './styles'
import { MoreVert as MoreIcon } from '@material-ui/icons'

export interface WidgetProps {
  title?: ReactNode
  noBodyPadding?: boolean
  bodyClass?: string
  disableWidgetMenu?: boolean
  header?: ReactNode
  noHeaderPadding?: boolean
  headerClass?: string
  style?: CSSProperties
  noWidgetShadow?: boolean
}

const Widget: FC<WidgetProps> = ({
  children,
  title,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  noHeaderPadding,
  headerClass,
  style,
  noWidgetShadow,
}) => {
  const classes = useStyles()
  const moreButtonRef = useRef<HTMLButtonElement | null>(null)
  const [isMoreMenuOpen, setMoreMenuOpen] = useState(false)

  return (
    <div className={classes.widgetWrapper} style={style && { ...style }}>
      <Paper
        className={classes.paper}
        classes={{
          root: classnames(classes.widgetRoot, {
            [classes.noWidgetShadow]: noWidgetShadow,
          }),
        }}>
        <div
          className={classnames(classes.widgetHeader, headerClass, {
            [classes.noPadding]: noHeaderPadding,
          })}>
          {header ? (
            header
          ) : (
            <>
              {' '}
              <Typography variant="h5" color="textSecondary" noWrap>
                {title}
              </Typography>
              {!disableWidgetMenu && (
                <IconButton
                  color="primary"
                  classes={{ root: classes.moreButton }}
                  aria-owns="widget-menu"
                  aria-haspopup="true"
                  onClick={() => setMoreMenuOpen(true)}
                  ref={(ref) => (moreButtonRef.current = ref)}>
                  <MoreIcon />
                </IconButton>
              )}
            </>
          )}
        </div>
        <div
          className={classnames(classes.widgetBody, bodyClass, {
            [classes.noPadding]: noBodyPadding,
          })}>
          {children}
        </div>
      </Paper>
      <Menu
        id="widget-menu"
        open={isMoreMenuOpen}
        anchorEl={moreButtonRef.current}
        onClose={() => setMoreMenuOpen(false)}
        disableAutoFocusItem>
        <MenuItem>
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Copy</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Delete</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Print</Typography>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default Widget
