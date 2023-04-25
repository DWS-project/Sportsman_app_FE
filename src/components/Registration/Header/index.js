import useStyles from './styles'

const RegistrationHeader = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.login}>Prijava</div>
      <div className={classes.registration}>Registracija</div>
    </div>
  )
}

export default RegistrationHeader
