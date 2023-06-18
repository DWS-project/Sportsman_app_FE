import NotificationsIcon from '@mui/icons-material/Notifications'
import { IconButton } from '@mui/material'
import Badge from '@mui/material/Badge'
import Popover from '@mui/material/Popover'
import { useState } from 'react'

import useStyles from './styles'

const NotificationsDropdown = () => {
  const classes = useStyles()
  const [openNotifications, setOpenNotifications] = useState(false)
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null)

  const handleOpenNotifications = (event) => {
    setNotificationsAnchorEl(event.currentTarget)
    setOpenNotifications(true)
  }

  const handleCloseNotifications = () => {
    setOpenNotifications(false)
  }

  // Customize the styling and add notifications content inside the Popover
  const notificationsContent = (
    <div>
      {/* Add your notifications content here */}
      <p>Notification 1</p>
      <p>Notification 2</p>
    </div>
  )

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
      <Popover
        id="notifications-menu"
        open={openNotifications}
        anchorEl={notificationsAnchorEl}
        onClose={handleCloseNotifications}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {notificationsContent}
      </Popover>
    </div>
  )
}

export default NotificationsDropdown
