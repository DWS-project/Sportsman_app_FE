import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { REGISTRATION_PLAYER } from '../../constants/endpoints'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const RegistrationForm = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  async function handleSubmit() {
    const data = {
      name,
      surname,
      phone,
      email,
      password,
      repeatedPassword: password,
    }

    const { status, message } = await axios.post(REGISTRATION_PLAYER, data)
    console.log('status', status)
    console.log('message', message)
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        Registrujte se
      </Typography>
      <Box noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Ime"
          name="name"
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="surname"
          label="Prezime"
          name="surname"
          onChange={(event) => {
            setSurname(event.target.value)
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email adresa"
          name="email"
          autoComplete="off"
          onChange={(event) => {
            setEmail(event.target.value)
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="phone"
          label="Kontakt telefon"
          name="phone"
          autoComplete="off"
          onChange={(event) => {
            setPhone(event.target.value)
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
          autoComplete="off"
          onChange={(event) => {
            setPassword(event.target.value)
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="repeatedPassword"
          label="Ponovljena lozinka"
          type="password"
          id="repeatedPassword"
          autoComplete="off"
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
          Registrujte se
        </Button>
        <Grid container>
          <Grid item>
            <Link
              href="#"
              sx={{
                color: '#43bbbf',
                textDecoration: 'none',
              }}
            >
              Ulogujte se
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default RegistrationForm
