import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { FORGOT_PASSWORD } from 'src/constants/endpoints'
import withMainFrame from 'src/hoc/withMainFrame'

import useStyles from './styles'

const ForgotPassword = () => {
  const classes = useStyles()

  const [email, setEmail] = useState('')

  async function changePassword() {
    const data = {
      email,
    }

    const { status } = await axios.put(FORGOT_PASSWORD, data)

    if (status === HTTPStatusCodes.OK) navigate('/')
  }

  return withMainFrame(
    <div className={classes.container}>
      <div className={classes.content}>
        <img
          src="/images/forgotPasswordIcon.svg"
          alt="Forgot Password"
          className={classes.image}
        />
        <Typography component="h1" variant="h5">
          Zaboravili ste lozinku?
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="off"
          onChange={(event) => {
            setEmail(event.target.value)
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submit}
          onClick={() => changePassword()}
        >
          Resetuj lozinku
        </Button>
      </div>
    </div>
  )
}

export default ForgotPassword
