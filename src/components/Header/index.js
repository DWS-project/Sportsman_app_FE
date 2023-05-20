import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useStyles from './styles'

const Header = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [openSideMenu, setOpenSideMenu] = useState(false)

  const handleCloseSideMenu = () => {
    setOpenSideMenu(!openSideMenu)
  }

  const sideMenu = (
    <div>
      <List>
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText>Moj profil</ListItemText>
        </ListItem>
      </List>
    </div>
  )

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleCloseSideMenu}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={'/images/logo.svg'}
            alt="Logo"
            className={classes.logo}
            onClick={() => navigate('/')}
            aria-hidden="true"
          />
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => navigate('/')}
          >
            SPORTISTA
          </Typography>
          <Button color="inherit">Odjavi se</Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Drawer
          variant="temporary"
          anchor="left"
          open={openSideMenu}
          onClose={handleCloseSideMenu}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {sideMenu}
        </Drawer>
      </nav>
    </>
  )
}

export default Header
