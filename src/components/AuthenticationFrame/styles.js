import { createStyles, makeStyles } from '@material-ui/core'


const useStyles = makeStyles(() =>
  createStyles({
    leftContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    rightContainer: {
      backgroundImage: `url(${process.env.REACT_APP_FRONTEND_URL}/images/loginImage.jpg)`,
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
      },
    },
    wrapper: {
      overflow: "hidden",
      width: '100%',
      height: '50%',
    },
    sportField: {
      backgroundImage: `url(${process.env.REACT_APP_FRONTEND_URL}/images/drawing1.png)`,
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
      backgroundImage: `url(${process.env.REACT_APP_FRONTEND_URL}/images/drawing2.png)`,
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
    customButton: {
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
    landingPage: {
      backgroundImage: `url(${process.env.REACT_APP_FRONTEND_URL}/images/pozadina15.png)`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '50vh',
      marginTop: '30px',
    },
    citiesLandingPage: {
      marginTop: '-30px',
      display: 'flex',
      justifyContent: 'center',
    },
    buttonLandingPage: {
      color: '#43bbbf !important',
      backgroundColor: 'white !important',
      padding: '15px 20px !important',
      margin: '0 1vw !important',
      boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease 0s !important',
      '&:hover': {
        backgroundColor: '#43bbbf !important',
        boxShadow: '0px 15px 20px rgba(46, 229, 219, 0.4) !important',
        color: '#fff !important',
        transform: 'translateY(-7px) !important',
      },
    },
    searchIconWrapper: {
      padding: '0px 16px',
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    search: {
      position: 'relative',
      borderRadius: '4px',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
      },
      marginLeft: '8px',
      width: '50%',
    },
    searchField: {
      color: 'inherit',
      padding: '8px 8px 8px 0',
      paddingLeft: 'calc(1em + 32px) !important',
      '&:hover': {
        border: 'none',
      },
      width: '100%',
    },
    forDate: {
      padding: '15px 5px',
      color: '#646464',
      fontSize: '1rem',
      border: '1px solid #43bbbf',
      outline: 'none',
      borderRadius: '5px',
      '&:focus': {
        border: '2px solid #43bbbf'
      },
    },
    forChecks: {
      '&.Mui-checked': {
        color: '#43bbbf !important',
      },
    },
    forSliders: {
      color: '#43bbbf !important',
    },
    headlineWrapper: {
      position: 'absolute',
      top: '15vh',
      left: '5vw',
      display: 'flex',
      flexDirection: 'column',
    },
    landingPageHeadline: {
      fontFamily: 'sans-serif',
      fontSize: '7rem',
      margin: '0',
      color: '#233535',
    },
    landingPageSubText: {
      fontFamily: 'sans-serif',
      color: '#233535',
      fontSize: '1rem',
      marginLeft: '4rem',
    },

  })
)

export default useStyles
