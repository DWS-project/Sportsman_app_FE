import { Avatar, Divider, List, ListItemAvatar, ListItemButton, ListItemText, ListSubheader } from '@mui/material'
import React from 'react'

const Sidebar = () => {
    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
      };
  return (
    <List sx={style} component="nav" aria-label="mailbox folders" 
    subheader={<ListSubheader>Edit Profile</ListSubheader>}>
    <ListItemAvatar>
        <Avatar alt="Image" src="https://jectossi.sirv.com/Rectangle%2010.png"
        sx={{borderRadius:"50%", width:"100px", height:"100px"}}/>
    </ListItemAvatar>
    
  <div key = {1}>
    <ListItemButton>
            <ListItemText primary="Change personal information"/>
    </ListItemButton>
    <Divider/>
    </div>
    <div key = {2}>
    <ListItemButton>
            <ListItemText primary="Change password"/>
    </ListItemButton>
    </div>
    <Divider/>
    <div key = {3}>
    <ListItemButton>
            <ListItemText primary="Change photo"/>
    </ListItemButton>
    </div>
    <Divider/>
</List>
  )
}

export default Sidebar