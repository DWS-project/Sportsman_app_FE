import useStyles from './styles'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LoginForm from '../Login'
import RegistrationForm from "../Registration/index"

const AuthenticationFrame = ({route}) => {
  const classes = useStyles()

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
