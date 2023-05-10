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
      backgroundImage: 'url(http://localhost:3000/images/drawing1.png)',
      height: '100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative',
      transition: 'transform 0.25s',
      '&:hover': {
        transform: 'scale(1.04)',
      },
      borderBottom: '10px solid #43bbbf',
    },
    soccerPlayer: {
      backgroundImage: 'url(http://localhost:3000/images/drawing2.png)',
      height: '100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative',
      transition: 'transform 0.25s',
      '&:hover': {
        transform: 'scale(1.04)',
      },
    },
    choosingContainer: {
      width: '100%',
      height: '100%',
    },
    heroText: {
      position: 'absolute',
      top: '47%',
      left: '40%',
      transform: 'translate(-50%, -50%)',
      whiteSpace: 'nowrap',
      display: 'flex',
      flexDirection: 'column',
    },
    heroHeadline: {
      fontSize: 'h6.fontSize'
    },
    registerButton1: {
      backgroundColor: '#43bbbf !important',
      '&:hover': {
        boxShadow:'0 0 0 0 #43bbbf,inset 6em 3.5em 0 0 #17a6ab',
        color: 'white !important',
      },
      width: '50%',
      marginTop: '4% !important',
      color: 'white !important',
    },
    customButton: { // to use through pages
      backgroundColor: '#43bbbf !important',
      '&:hover': {
        boxShadow:'0 0 0 0 #43bbbf,inset 6em 3.5em 0 0 #17a6ab !important',
      },
    },
    registerHeadline: {
      fontSize: '2.3rem',
      fontWeight: '900',
      color: '#43bbbf',
    },
    registerSub: {
      fontSize: '1.3rem',
      marginRight: '0.5rem',
      fontWeight: '900',
      marginTop: 'auto',
      color: 'darkslategrey'
    },
    heroText2: {
      height: '40%',
      position: 'absolute',
      top: '30%',
      left: '40%',
      transform: 'translate(-50%, -50%)',
      whiteSpace: 'nowrap',
      display: 'flex',
      flexDirection: 'column',
    },
    registerSub2: {
      fontSize: '1.3rem',
      marginRight: '0.5rem',
      fontWeight: '900',
      marginTop: 'auto',
      color: 'darkslategrey'
    },
  })
)

export default useStyles
