import RegistrationHeader from '../Header'
import useStyles from './styles'

const RegistrationFormOwner = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <RegistrationHeader />
    </div>
  )
}
export default RegistrationFormOwner
