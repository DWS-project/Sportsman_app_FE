import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { LOGIN } from '../../constants/endpoints'
import useStyles from './styles'

const LoginForm = () => {
  const classes = useStyles()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  async function handleSubmit() {
    const data = {
      email,
      password,
    }

    const { status, message } = await axios.post(LOGIN, data)
    console.log('status', status)
    console.log('message', message)
  }

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
        <Box sx={{ my: 8, mx: 4 }} className={classes.leftContainer}>
          <Avatar sx={{ m: 1, bgcolor: '#43bbbf' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Prijavi se
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email adresa"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => {
                setEmail(event.target.value)
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Lozinka"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => {
                setPassword(event.target.value)
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#43bbbf' }}
              onClick={() => handleSubmit()}
            >
              Prijavi se
            </Button>
            <Grid container className={classes.link}>
              <Grid item xs>
                <Link
                  href="#"
                  sx={{ color: '#43bbbf', textDecoration: 'none' }}
                >
                  Zaboravili ste lozinku?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  sx={{ color: '#43bbbf', textDecoration: 'none' }}
                >
                  {'Nemate korisnički račun? Registrujte se'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default LoginForm
