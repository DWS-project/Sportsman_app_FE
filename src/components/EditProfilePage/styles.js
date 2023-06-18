import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    sidebar: {
      width: '100%',
      maxWidth: 360,
      bgcolor: 'background.paper',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    listItems: {
      color: 'aliceblue',
      backgroundColor: '#43bbbf',
      width: '200px',
    },
  })
)

export default useStyles
