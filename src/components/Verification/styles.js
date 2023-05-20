import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  containerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '94vh',
    padding: theme.spacing(2),
    backgroundColor: '#E5E5E5',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  image: {
    maxWidth: '400px',
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(4),
      marginRight: 0,
    },
  },
  textContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '500px',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  buttonGroup: {
    display: 'flex',
    marginTop: theme.spacing(2),
    '& > *': {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignSelf: 'center',
    },
  },
  sendAgainButton: {
    backgroundColor: '#43bbbf !important',
    minWidth: '200px',
    color: 'white',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(3),
    },
  },
  homeButton: {
    backgroundColor: 'white !important',
    minWidth: '200px',
  },
}))

export default useStyles
