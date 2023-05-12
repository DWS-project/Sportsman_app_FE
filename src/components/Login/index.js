import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { LOGIN } from '../../constants/endpoints'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useStyles from "../AuthenticationFrame/styles";

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles()

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
            <Link href="#" sx={{ color: '#43bbbf', textDecoration: 'none' }}>
              Zaboravili ste lozinku?
            </Link>
          </Grid>
          <Grid item>
            <Link href={process.env.REACT_APP_FRONTEND_URL + '/registration'} sx={{ color: '#43bbbf', textDecoration: 'none' }}>
              Nemate korisnički račun? Registrujte se
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default
LoginForm