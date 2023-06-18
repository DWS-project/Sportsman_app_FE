import NotificationsIcon from '@mui/icons-material/Notifications'
import { IconButton, Menu, MenuItem } from '@mui/material'
import Badge from '@mui/material/Badge'
import { useState } from 'react'

import useStyles from './styles'

const NotificationsDropdown = () => {
  const classes = useStyles()
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null)

  const handleOpenNotifications = (event) => {
    setNotificationsAnchorEl(event.currentTarget)
  }

  const handleCloseNotifications = () => {
    setNotificationsAnchorEl(null)
  }

  const imageSrc = '/images/defaultUserImage.jpg'

  return (
    <div>
      <Badge
        badgeContent={9}
        color="warning"
        className={classes.notificationIcon}
      >
        <IconButton
          onClick={handleOpenNotifications}
          aria-label="notifications"
          aria-controls="notifications-menu"
          aria-haspopup="true"
          sx={{ p: 0 }}
        >
          <NotificationsIcon />
        </IconButton>
      </Badge>
      <Menu
        id="notifications-menu"
        anchorEl={notificationsAnchorEl}
        open={Boolean(notificationsAnchorEl)}
        onClose={handleCloseNotifications}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={classes.notificationsMenu}
      >
        <MenuItem onClick={handleCloseNotifications}>
          <img
            src="/images/notificationPlayerImage.svg"
            alt="Image 1"
            style={{ width: '30px', marginRight: '10px' }}
          />
          Player notifikacija
        </MenuItem>
        <MenuItem onClick={handleCloseNotifications}>
          <img
            src="/images/notificationOwnerImage.svg"
            alt="Image 2"
            style={{ width: '30px', marginRight: '10px' }}
          />
          Owner notifikacija
        </MenuItem>
        <MenuItem onClick={handleCloseNotifications}>
          <img
            src="/images/notificationTeamImage.svg"
            alt="Image 3"
            style={{ width: '30px', marginRight: '10px' }}
          />
          Team notifikacija
        </MenuItem>
      </Menu>
    </div>
  )
}

export default NotificationsDropdown
