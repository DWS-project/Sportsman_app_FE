import { Button, Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useNavigate } from 'react-router'

import Header from '../../Header'
import useStyles from '../styles'

const Error404Page = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className={classes.container}>
        <img
          src={'/images/404ErrorIcon.svg'}
          alt="Image 404 error page"
          className={classes.image}
        />
        <Typography variant="h4" className={classes.title}>
          O ne! Greška 404
        </Typography>
        <Typography variant="h5" className={classes.text}>
          Izgleda da stranica koju tražite ne postoji ili je uklonjena.
          Preporučujemo vam da se vratite na početnu stranicu.
        </Typography>
        <Grid container className={classes.buttonsWrapper}>
          <Grid item>
            <Button
              className={classes.firstButton}
              onClick={() => navigate('/')}
            >
              Početna stranica
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.secondButton}
              onClick={() => navigate('/contact-us')}
            >
              Kontaktirajte nas
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Error404Page
