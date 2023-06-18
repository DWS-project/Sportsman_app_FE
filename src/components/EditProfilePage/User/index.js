import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  TextField,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  BASE_BACKEND_URL,
  CHANGE_INFO,
  CHANGE_PASSWORD,
  CHANGE_PHOTO,
} from 'src/constants/endpoints'

import useStyles from '../styles'

export const EditUserPage = ({ id }) => {
  const classes = useStyles()
  const [editInfo, setEditInfo] = useState(true)
  const [editPassword, setEditPassword] = useState(false)
  const [editPhoto, setEditPhoto] = useState(false)

  const [user, setUser] = useState({
    username: '',
    name: '',
    surname: '',
    tel_number: '',
    city: '',
    photo: '',
    age: '',
  })

  const [password, setPassword] = useState({
    newPassword: '',
    newRepeatedPassword: '',
    oldPassword: '',
  })

  useEffect(() => {
    axios
      .get(`${BASE_BACKEND_URL}/player/${id}`)
      .then((response) => {
        const data = response.data[0]
        setUser({
          username: data.username,
          name: data.name,
          surname: data.surname,
          tel_number: data.tel_number,
          city: data.city,
          age: data.age,
          photo: data.picture,
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`${CHANGE_INFO}/${id}`, user, {withCredentials: true})
    alert('Uspješno ste ažurirali podatke')
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`${CHANGE_PASSWORD}${id}`, password, {withCredentials: true})
    alert('Uspješno ste promijenili šifru')
  }

  const handlePhotoSubmit = async (e) => {
    e.preventDefault()
    const file = e.target.photo.files[0]
    const formData = new FormData()
    formData.append('photo', file)
    await axios.put(`${CHANGE_PHOTO}/${id}`, formData, {withCredentials: true})
    alert('Profilna slika uspjesno promijenjena')
    window.location.reload()
  }

  const handleClick = (key) => {
    if (key === 1) {
      setEditInfo(false)
      setEditPassword(false)
      setEditPhoto(true)
    } else if (key === 2) {
      setEditInfo(true)
      setEditPassword(false)
      setEditPhoto(false)
    } else {
      setEditInfo(false)
      setEditPassword(true)
      setEditPhoto(false)
    }
  }
  return (
    <Grid
      container
      justifyContent={'space-between'}
      alignItems={'center'}
      mt={6}
      p={4}
    >
      <Grid item xs={12} md={5}>
        <List
          className={classes.sidebar}
          component="nav"
          aria-label="mailbox folders"
          subheader={<ListSubheader>Ažuriraj profil</ListSubheader>}
        >
          <ListItemAvatar>
            <Avatar
              alt="Image"
              src={user.photo}
              sx={{ borderRadius: '50%', width: '100px', height: '100px' }}
            />
          </ListItemAvatar>

          <div key={1} className={classes.listItems}>
            <ListItemButton onClick={() => handleClick(1)}>
              <ListItemText primary="Promijeni profilnu sliku" />
            </ListItemButton>
            <Divider />
          </div>

          <div key={2} className={classes.listItems}>
            <ListItemButton onClick={() => handleClick(2)}>
              <ListItemText primary="Promijeni lične podatke" />
            </ListItemButton>
            <Divider />
          </div>
          <div key={3} className={classes.listItems}>
            <ListItemButton onClick={() => handleClick(3)}>
              <ListItemText primary="Promijeni password" />
            </ListItemButton>
            <Divider />
          </div>
        </List>
      </Grid>
      <Grid item xs={12} md={7}>
        {editInfo && (
          <Paper elevation={3} sx={{ width: '70%' }}>
            <Box
              component="form"
              display={'flex'}
              flexDirection={'column'}
              padding={2}
            >
              <TextField
                label="Username"
                variant="outlined"
                value={user.username}
                name="username"
                onChange={handleChange}
                margin="normal"
                fullWidth
                size="small"
              />
              <TextField
                label="First name"
                variant="outlined"
                value={user.name}
                name="name"
                onChange={handleChange}
                margin="normal"
                fullWidth
                size="small"
              />
              <TextField
                label="Last name"
                variant="outlined"
                value={user.surname}
                name="surname"
                onChange={handleChange}
                margin="normal"
                fullWidth
                size="small"
              />
              <TextField
                label="Telephone number"
                variant="outlined"
                value={user.tel_number}
                name="tel_number"
                onChange={handleChange}
                margin="normal"
                fullWidth
                size="small"
              />
              <TextField
                label="City"
                variant="outlined"
                value={user.city}
                name="city"
                onChange={handleChange}
                margin="normal"
                fullWidth
                size="small"
              />
              <TextField
                label="Age"
                variant="outlined"
                value={user.age}
                name="age"
                onChange={handleChange}
                margin="normal"
                fullWidth
                size="small"
              />

              <Button
                variant="contained"
                style={{ backgroundColor: '#43bbbf' }}
                type="submit"
                onClick={handleSubmit}
              >
                Ažuriraj
              </Button>
            </Box>
          </Paper>
        )}
        {editPassword && (
          <Paper elevation={3} sx={{ width: '70%' }}>
            <Box
              component="form"
              display={'flex'}
              flexDirection={'column'}
              padding={2}
            >
              <h3>Ukucajte novu šifru</h3>
              <TextField
                type="password"
                label="Enter password"
                variant="outlined"
                placeholder="********"
                name="newPassword"
                onChange={handlePasswordChange}
                margin="normal"
                fullWidth
                size="small"
              />
              <h3>Potvrdite vašu novu šifru</h3>
              <TextField
                type="password"
                label="Confirm password"
                variant="outlined"
                placeholder="********"
                name="newRepeatedPassword"
                onChange={handlePasswordChange}
                margin="normal"
                fullWidth
                size="small"
              />
              <h3>Ukucajte staru šifru da biste potvrdili promjenu</h3>
              <TextField
                type="password"
                label="Enter old password"
                variant="outlined"
                placeholder="********"
                name="oldPassword"
                onChange={handlePasswordChange}
                margin="normal"
                fullWidth
                size="small"
              />
              <Button
                variant="contained"
                style={{ backgroundColor: '#43bbbf' }}
                type="submit"
                onClick={handlePasswordSubmit}
              >
                Ažuriraj
              </Button>
            </Box>
          </Paper>
        )}
        {editPhoto && (
          <Paper elevation={3} sx={{ width: '50%' }}>
            <form onSubmit={handlePhotoSubmit}>
              <input type="file" name="photo" />
              <button type="submit">Upload</button>
            </form>
          </Paper>
        )}
      </Grid>
    </Grid>
  )
}
