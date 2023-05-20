import { Button, Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router'
import { LOGOUT } from 'src/constants/endpoints'
import { HTTPStatusCodes } from 'src/constants/statusCodes'

import Header from '../../Header'
import useStyles from '../styles'

const Error401Page = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  async function redirectToLogin() {
    const { status } = await axios.post(LOGOUT, {})
    if (status === HTTPStatusCodes.OK) navigate('/login')
  }

  return (
    <>
      <Header />
      <div className={classes.container}>
        <img
          src={'/images/401ErrorIcon.svg'}
          alt="Image 401 error page"
          className={classes.image}
        />
        <Typography variant="h4" className={classes.title}>
          Pristup stranici nije odobren
        </Typography>
        <Typography variant="h5" className={classes.text}>
          Izgleda da nemate pristup stranici koju pokušavate posjetiti. Možete
          se prijaviti ili se vratiti na prethodnu stranicu.
        </Typography>
        <Grid container className={classes.buttonsWrapper}>
          <Grid item>
            <Button
              className={classes.firstButton}
              onClick={() => redirectToLogin()}
            >
              Prijavi se sa drugim profilom
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.secondButton}
              onClick={() => navigate(-1)}
            >
              Prethodna stranica
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Error401Page
