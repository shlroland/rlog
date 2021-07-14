// styles
import useStyles from './styles'

// components
import Dot from '../Dot'
import type { FC, ReactNode } from 'react'
import { useState } from 'react'
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
} from '@material-ui/core'
import classnames from 'classnames'
import { Inbox as InboxIcon } from '@material-ui/icons'
import { useLocation, Link } from 'react-router-dom'
import type { Location } from 'history'

interface SiderBarLinkProp {
  link?: string
  icon?: ReactNode
  label?: string
  children?: { label: string; link: string }[]
  isSidebarOpened?: boolean
  nested?: boolean
  type?: string
  location: Location
}

const SidebarLink: FC<SiderBarLinkProp> = ({
  link,
  icon,
  label,
  children,
  isSidebarOpened,
  nested,
  type,
}) => {
  const classes = useStyles()
  const location = useLocation()

  // local
  const [isOpen, setIsOpen] = useState(false)

  function toggleCollapse(e: any) {
    if (isSidebarOpened) {
      e.preventDefault()
      setIsOpen(!isOpen)
    }
  }

  const isLinkActive =
    link && (location.pathname === link || location.pathname.indexOf(link) !== -1)

  if (type === 'title') {
    return (
      <Typography
        className={classnames(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !isSidebarOpened,
        })}>
        {label}
      </Typography>
    )
  }

  if (type === 'divider') return <Divider className={classes.divider} />

  if (link && link.includes('http')) {
    return (
      <ListItem
        button
        className={classes.link}
        classes={{
          root: classnames({
            [classes.linkActive]: isLinkActive && !nested,
            [classes.linkNested]: nested,
          }),
        }}
        disableRipple>
        <a className={classes.externalLink} href={link}>
          <ListItemIcon
            className={classnames(classes.linkIcon, {
              [classes.linkIconActive]: isLinkActive,
            })}>
            {nested ? <Dot color={isLinkActive && 'primary'} /> : icon}
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classnames(classes.linkText, {
                [classes.linkTextActive]: isLinkActive,
                [classes.linkTextHidden]: !isSidebarOpened,
              }),
            }}
            primary={label}
          />
        </a>
      </ListItem>
    )
  }
  console.log(children)
  if (!children) {
    return (
      <ListItemButton
        component={Link}
        to={link || ''}
        className={classes.link}
        classes={{
          root: classnames({
            [classes.linkActive]: isLinkActive && !nested,
            [classes.linkNested]: nested,
          }),
        }}
        disableRipple>
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}>
          {nested ? <Dot color={isLinkActive && 'primary'} /> : icon}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItemButton>
    )
  }

  return (
    <>
      <ListItemButton
        className={classes.link}
        component={Link}
        onClick={toggleCollapse}
        to={link || ''}>
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}>
          {icon ? icon : <InboxIcon />}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItemButton>
      {children && (
        <Collapse
          in={isOpen && isSidebarOpened}
          timeout="auto"
          unmountOnExit
          className={classes.nestedList}>
          <List component="div" disablePadding>
            {children.map((childrenLink) => (
              <SidebarLink
                key={childrenLink && childrenLink.link}
                location={location}
                isSidebarOpened={isSidebarOpened}
                nested
                {...childrenLink}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}

export default SidebarLink
