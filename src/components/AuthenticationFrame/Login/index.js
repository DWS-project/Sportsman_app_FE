import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment-timezone'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COOKIE_AUTHENTICATION_FE } from 'src/constants/keys/browser'
import { HTTPStatusCodes } from 'src/constants/statusCodes'

import { FRONTEND_URL } from '../../../constants/appDefaults'
import { LOGIN } from '../../../constants/endpoints'
import useStyles from '../styles'

const LoginForm = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit() {
    const data = {
      email,
      password,
    }

    const { status, data: userData } = await axios.post(LOGIN, data)

    Cookies.set(COOKIE_AUTHENTICATION_FE, JSON.stringify(userData.user), {
      expires: moment().add(1, 'days').toDate(),
    })

    if (status === HTTPStatusCodes.OK) navigate('/')
  }

  return (
    <>
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
          sx={{ mt: 3, mb: 2 }}
          className={classes.customButton}
          onClick={() => handleSubmit()}
        >
          Prijavi se
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              href="/forgot-password"
              sx={{ color: '#43bbbf', textDecoration: 'none' }}
            >
              Zaboravili ste lozinku?
            </Link>
          </Grid>
          <Grid item>
            <Link
              href={`${FRONTEND_URL}/registration`}
              sx={{ color: '#43bbbf', textDecoration: 'none' }}
            >
              Nemate korisnički račun? Registrujte se
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default LoginForm
