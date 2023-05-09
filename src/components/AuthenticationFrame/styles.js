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
      //
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(http://localhost:3000/images/sportField.png)',
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
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(http://localhost:3000/images/soccerPlayer.png)',
      height: '100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative',
      transition: 'transform 0.25s',
      '&:hover': {
        transform: 'scale(1.04)',
      },
      //border: '5px solid #09aeb4',
    },
    choosingContainer: {
      width: '100%',
      height: '100%',
    },
    heroText: {
      position: 'absolute',
      top: '27%',
      left: '57%',
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
      boxShadow: '0.3em 0.3em 0 0 #43bbbf, inset 0.3em 0.3em 0 0 #43bbbf',
      '&:hover': {
        boxShadow:'0 0 0 0 #43bbbf,inset 6em 3.5em 0 0 #43bbbf',
        color: 'white !important',
      },
      position: 'absolute',
      top: '70%',
      left: '60%',
      color: '#43bbbf !important',
      borderRadius: '0',
    },
    registerButton2: {
      boxShadow: '0.3em 0.3em 0 0 #43bbbf, inset 0.3em 0.3em 0 0 #43bbbf',
      '&:hover': {
        boxShadow:'0 0 0 0 #43bbbf,inset 6em 3.5em 0 0 #43bbbf',
        color: 'white !important',
      },
      color: '#43bbbf !important',
      width: '50%',
      marginTop: '4% !important',
    },
    registerHeadline: {
      fontSize: '2.3rem',
      fontWeight: '900',
      color: '#43bbbf',
    },
    registerSub: {
      alignSelf: 'flex-end',
      fontSize: '1.3rem',
      marginRight: '0.5rem',
      marginLeft: '4rem',
      fontWeight: '900',
      marginTop: 'auto'
    },
    heroText2: {
      height: '40%',
      position: 'absolute',
      top: '35%',
      left: '40%',
      transform: 'translate(-50%, -50%)',
      whiteSpace: 'nowrap',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
    },
    registerSub2: {
      fontSize: '1.3rem',
      marginRight: '0.5rem',
      fontWeight: '900',
      marginTop: 'auto'
    },
  })
)

export default useStyles
