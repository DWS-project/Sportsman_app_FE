import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(8),
      height: '90vh',
      backgroundColor: '#E5E5E5',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '700px',
    },
    image: {
      marginBottom: theme.spacing(0),
      width: '450px',
    },
    form: {
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#43bbbf !important',
    },
  })
)

export default useStyles
