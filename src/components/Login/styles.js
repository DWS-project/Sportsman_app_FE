import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    leftContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    rightContainer: {
      backgroundImage: 'url(http://localhost:3000/images/loginImage.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#43bbbf',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  })
)

export default useStyles
