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
    imageList: {
      width: '100%',
      height: '100%',
      '& img': {
        objectFit: 'cover',
        width: '100%',
        height: '200px',
        filter: 'brightness(80%)',
        objectPosition: 'center',
      }
    },
    wrapper: {
      overflow: "hidden",
      width: '100%',
      height: '50%',
    },
    sportField: {
      //linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      backgroundImage: 'url(http://localhost:3000/images/sportField.png)',
      height: '100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative',
      transition: 'transform 0.25s',
      '&:hover': {
        transform: 'scale(1.04)',
      },
      border: '25px solid #43bbbf',
    },
    soccerPlayer: {
      //linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      backgroundImage: 'url(http://localhost:3000/images/soccerPlayer.png)',
      height: '100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative',
      transition: 'transform 0.25s',
      '&:hover': {
        transform: 'scale(1.04)',
      },
      border: '5px solid #09aeb4',
    },
    choosingContainer: {
      width: '100%',
      height: '100%',
    },
    heroText: {
      position: 'absolute',
      top: '45%',
      left: '65%',
      transform: 'translate(-50%, -50%)',
      whiteSpace: 'nowrap',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
    },
    heroHeadline: {
      fontSize: 'h6.fontSize'
    },
    registerButton1: {
      backgroundColor: '#43bbbf !important',
      position: 'absolute',
      top: '70%',
      left: '60%',
      margin: '3 1 2 1',
    },
    registerButton2: {
      backgroundColor: '#43bbbf !important',
      position: 'absolute',
      top: '70%',
      left: '60%',
      margin: '3 1 2 1',
    },

  })
)

export default useStyles
