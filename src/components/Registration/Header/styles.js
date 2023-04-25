import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      height: '60px',
      backgroundColor: '#43bbbf',
    },
    login: {
      marginRight: '50px',
      color: '#FFFFFF',
    },
    registration: {
      marginRight: '100px',
    },
  })
)

export default useStyles
