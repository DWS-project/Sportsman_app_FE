import { Button, TextField, Typography } from '@mui/material'
import withMainFrame from 'src/hoc/withMainFrame'

import useStyles from './styles'

const ForgotPassword = () => {
  const classes = useStyles()

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
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Resetuj lozinku
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
