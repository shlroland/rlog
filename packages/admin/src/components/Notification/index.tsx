import type { TypographyPropsVariantOverrides } from '@material-ui/core'
import type { OverridableStringUnion } from '@material-ui/types'
import { useTheme, Button } from '@material-ui/core'
import {
  NotificationsNone as NotificationsIcon,
  ThumbUp as ThumbUpIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalOffer as TicketIcon,
  BusinessCenter as DeliveredIcon,
  SmsFailed as FeedbackIcon,
  DiscFull as DiscIcon,
  Email as MessageIcon,
  Report as ReportIcon,
  Error as DefenceIcon,
  AccountBox as CustomerIcon,
  Done as ShippedIcon,
  Publish as UploadIcon,
} from '@material-ui/icons'
import { cloneElement } from 'react'
import useStyles from './styles'
import classnames from 'classnames'
import tinycolor from 'tinycolor2'
import { Typography } from '../Wrappers'
import type { FC, ReactNode, MouseEventHandler } from 'react'
import type { Variant } from '@material-ui/core/styles/createTypography'

const typesIcons = {
  'e-commerce': <ShoppingCartIcon />,
  notification: <NotificationsIcon />,
  offer: <TicketIcon />,
  info: <ThumbUpIcon />,
  message: <MessageIcon />,
  feedback: <FeedbackIcon />,
  customer: <CustomerIcon />,
  shipped: <ShippedIcon />,
  delivered: <DeliveredIcon />,
  defence: <DefenceIcon />,
  report: <ReportIcon />,
  upload: <UploadIcon />,
  disc: <DiscIcon />,
}

export interface NotificationProp {
  id?: number
  variant?: string
  type?: keyof typeof typesIcons
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  className?: string
  shadowless?: boolean
  typographyVariant?: OverridableStringUnion<
    Variant | 'inherit',
    TypographyPropsVariantOverrides
  >
  message?: ReactNode
  extraButton?: ReactNode
  extraButtonClick?: MouseEventHandler<HTMLButtonElement>
}

function getIconByType(type = 'offer') {
  return typesIcons[type]
}

const Notification: FC<NotificationProp> = ({ variant, ...props }) => {
  const classes = useStyles()
  const theme = useTheme()

  const icon = getIconByType(props.type)
  const iconWithStyles = cloneElement(icon, {
    style: {
      color:
        variant !== 'contained' &&
        props.color &&
        theme.palette[props.color] &&
        theme.palette[props.color].main,
    },
  })

  return (
    <div
      className={classnames(classes.notificationContainer, props.className, {
        [classes.notificationContained]: variant === 'contained',
        [classes.notificationContainedShadowless]: props.shadowless,
      })}
      style={{
        backgroundColor:
          variant === 'contained' && props.color
            ? theme.palette[props.color] && theme.palette[props.color].main
            : '',
      }}>
      <div
        className={classnames(classes.notificationIconContainer, {
          [classes.notificationIconContainerContained]: variant === 'contained',
          [classes.notificationIconContainerRounded]: variant === 'rounded',
        })}
        style={{
          backgroundColor:
            variant === 'rounded' && props.color
              ? theme.palette[props.color] &&
                tinycolor(theme.palette[props.color].main).setAlpha(0.15).toRgbString()
              : '',
        }}>
        {iconWithStyles}
      </div>
      <div className={classes.messageContainer}>
        <Typography
          className={classnames({
            [classes.containedTypography]: variant === 'contained',
          })}
          variant={props.typographyVariant}
          size={variant !== 'contained' && !props.typographyVariant ? 'md' : ''}>
          {props.message}
        </Typography>
        {props.extraButton && props.extraButtonClick && (
          <Button
            onClick={props.extraButtonClick}
            disableRipple
            className={classes.extraButton}>
            {props.extraButton}
          </Button>
        )}
      </div>
    </div>
  )
}

export default Notification
