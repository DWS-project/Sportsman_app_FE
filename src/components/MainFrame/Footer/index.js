import { Grid } from '@material-ui/core'
import React from 'react'

import useStyles from './styles'

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={4} className={classes.firstColumn}>
          <h3>Možda će vas zanimati</h3>
          <h3 className={classes.item}>Objekti</h3>
          <h3 className={classes.item}>Termini</h3>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.column}>
          <h3>Kontaktirajte nas</h3>
          <h3 className={classes.item}>+387 61 000 000</h3>
          <h3 className={classes.item}>sportista@gmail.com</h3>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.column}>
          <h3>Zapratite nas</h3>
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer
