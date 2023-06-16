import { Button, Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useNavigate } from 'react-router'
import { LOGOUT } from 'src/constants/endpoints'
import { COOKIE_AUTHENTICATION_FE } from 'src/constants/keys/browser'
import { HTTPStatusCodes } from 'src/constants/statusCodes'
import withMainFrame from 'src/hoc/withMainFrame'

import Header from '../../MainFrame/Header'
import useStyles from '../styles'

const Error400Page = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  async function redirectToRegistration() {
    const { status } = await axios.post(LOGOUT, {})
    if (status === HTTPStatusCodes.OK) {
      Cookies.remove(COOKIE_AUTHENTICATION_FE)
      navigate('/registration')
    }
  }

  return withMainFrame(
    <div className={classes.container}>
      <img
        src={'/images/400ErrorIcon.svg'}
        alt="Image 401 error page"
        className={classes.image}
      />
      <Typography variant="h4" className={classes.title}>
        Greška 400
      </Typography>
      <Typography variant="h5" className={classes.text}>
        Kao prijavljeni korisnik nemate pristup stranicama za registraciju.
      </Typography>
      <Typography variant="h5" className={classes.text}>
        Možete se vratiti nazad na početnu stranicu ili registrovati kao novi
        korisnik.
      </Typography>
      <Grid container className={classes.buttonsWrapper}>
        <Grid item>
          <Button className={classes.firstButton} onClick={() => navigate('/')}>
            Početna stranica
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.secondButton}
            onClick={() => redirectToRegistration()}
          >
            Registruj se kao novi korisnik
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Error400Page
