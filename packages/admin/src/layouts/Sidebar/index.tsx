import { Drawer, IconButton, List } from '@material-ui/core'
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
} from '@material-ui/icons'
import classNames from 'classnames'
import { useState } from 'react'
import { useLayoutState } from 'src/context/LayoutContext'
import useStyles from './styles'
import useHeaderStyles from '../Header/styles'
import Dot from './components/Dot'
import SidebarLink from './components/SideBarLink'

const structure = [
  { id: 0, label: 'Dashboard', link: '/app/dashboard', icon: <HomeIcon /> },
  {
    id: 1,
    label: 'Typography',
    link: '/app/typography',
    icon: <TypographyIcon />,
  },
  { id: 2, label: 'Tables', link: '/app/tables', icon: <TableIcon /> },
  {
    id: 3,
    label: 'Notifications',
    link: '/app/notifications',
    icon: <NotificationsIcon />,
  },
  {
    id: 4,
    label: 'UI Elements',
    link: '/app/ui',
    icon: <UIElementsIcon />,
    children: [
      { label: 'Icons', link: '/app/ui/icons' },
      { label: 'Charts', link: '/app/ui/charts' },
      { label: 'Maps', link: '/app/ui/maps' },
    ],
  },
  { id: 5, type: 'divider' },
  { id: 6, type: 'title', label: 'HELP' },
  {
    id: 7,
    label: 'Library',
    link: 'https://flatlogic.com/templates',
    icon: <LibraryIcon />,
  },
  { id: 8, label: 'Support', link: 'https://flatlogic.com/forum', icon: <SupportIcon /> },
  { id: 9, label: 'FAQ', link: 'https://flatlogic.com/forum', icon: <FAQIcon /> },
  { id: 10, type: 'divider' },
  { id: 11, type: 'title', label: 'PROJECTS' },
  {
    id: 12,
    label: 'My recent',
    link: '',
    icon: <Dot size="small" color="warning" />,
  },
  {
    id: 13,
    label: 'Starred',
    link: '',
    icon: <Dot size="small" color="primary" />,
  },
  {
    id: 14,
    label: 'Background',
    link: '',
    icon: <Dot size="small" color="secondary" />,
  },
]

const SideBar = () => {
  const classes = useStyles()
  const headerClasses = useHeaderStyles()
  //   const theme = useTheme()

  // global
  const { isSidebarOpened } = useLayoutState()
  //   const layoutDispatch = useLayoutDispatch()

  // local
  const [isPermanent] = useState(true)

  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}>
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton
        // onClick={() => toggleSidebar(layoutDispatch)}
        >
          <ArrowBackIcon
            classes={{
              root: classNames(
                headerClasses.headerIcon,
                headerClasses.headerIconCollapse,
              ),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map((link) => (
          <SidebarLink
            key={link.id}
            // location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  )
}

export default SideBar
