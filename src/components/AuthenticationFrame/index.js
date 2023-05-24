import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { COOKIE_AUTHENTICATION_FE } from 'src/constants/keys/browser'

import LoginForm from './Login'
import RegistrationForm from './Registration/index'
import useStyles from './styles'

const AuthenticationFrame = ({ route }) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const userData = Cookies.get(COOKIE_AUTHENTICATION_FE)
  const parsedUserData = userData && JSON.parse(userData)
  const isUserLogged = userData && !!parsedUserData.id

  useEffect(() => {
    if (isUserLogged) navigate('/error/400')
  }, [userData])

  const avatar = (
    <>
      <Avatar sx={{ m: 1, bgcolor: '#43bbbf' }}>
        <LockOutlinedIcon />
      </Avatar>
    </>
  )
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.rightContainer} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        className={classes.leftContainer}
      >
        {route === 'login' ? (
          <Box sx={{ my: 8, mx: 4 }} className={classes.leftContainer}>
            {avatar}
            <LoginForm />
          </Box>
        ) : (
          <RegistrationForm avatar={avatar} />
        )}
      </Grid>
    </Grid>
  )
}

export default AuthenticationFrame
