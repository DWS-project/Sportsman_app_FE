import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import useStyles from './styles'

const Verification = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  return (
    <div className={classes.containerWrapper}>
      <img
        src="/images/verification.svg"
        alt="Verification Image"
        className={classes.image}
      />
      <div className={classes.textContainer}>
        <Typography variant="h5" className={classes.title}>
          Link za verifikaciju je istekao
        </Typography>
        <Typography variant="body1">
          Izgleda kao da je ovaj link za verifikaciju e-mail adrese istekao.
          Klikom na dugme “Pošalji ponovo” dobiti ćete e-mail sa novim linkom za
          verifikaciju.
        </Typography>
        <div className={classes.buttonGroup}>
          <Button className={classes.sendAgainButton}>Pošalji ponovo</Button>
          <Button className={classes.homeButton} onClick={() => navigate('/')}>
            Početna stranica
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Verification
