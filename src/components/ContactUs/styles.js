import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90vh',
      backgroundColor: '#E5E5E5',
    },
    image: {
      width: '50%',
      marginRight: '2rem',
    },
    formContainer: {
      width: '40%',
      padding: '1rem',
      borderRadius: '5px',
    },
    inputField: {
      marginBottom: '10px',
    },
    button: {
      textAlign: 'center',
      width: '200px',
      backgroundColor: '#6FC8CB !important',
      color: 'white !important',
    },
    title: {
      fontFamily: 'Nunito',
    },
  })
)

export default useStyles
