import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    backgroundColor: '#E5E5E5',
  },
  image: {
    width: '50%',
    maxWidth: 500,
    marginBottom: theme.spacing(2),
  },
  text: {
    maxWidth: 800,
    fontSize: '14px',
    fontWeight: 400,
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
    },
  },
  title: {
    fontWeight: 900,
    fontSize: '26px',
    marginBottom: theme.spacing(3),
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: 500,
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  firstButton: {
    backgroundColor: '#43bbbf !important',
    minWidth: '200px',
    color: 'white',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(3),
    },
  },
  secondButton: {
    backgroundColor: 'white !important',
    minWidth: '200px',
  },
}))

export default useStyles
