import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#43bbbf',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
    paddingBottom: '50px',
    paddingTop: '20px',
  },
  firstColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(2),
    paddingLeft: '70px',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(2),
  },
  item: {
    fontWeight: 300,
    fontSize: '16px',
  },
}))

export default useStyles
