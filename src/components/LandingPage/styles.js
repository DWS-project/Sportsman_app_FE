import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
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
  contentWrapper: {
    marginTop: '10vh',
    marginBottom: '5vh',
    display: 'flex',
    flexDirection: 'column',
  },
  centerContent: {
    alignSelf: 'center',
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    marginBottom: '20px'
  },
  buttonLandingPage: {
    color: '#43bbbf !important',
    backgroundColor: 'white !important',
    padding: '15px 20px !important',
    [theme.breakpoints.down('xs')]: {
      padding: '6px 8px !important',
      fontSize: '0.6rem !important',
    },
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
  accordionSummaryContent: {
    backgroundColor: '#43bbbf !important',
    color: 'white !important',
    margin: '0',
    '& >div': {
      margin: '0 !important'
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
    [theme.breakpoints.down('xs')]: {
      padding: '5px 0px',
    },
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
    [theme.breakpoints.down('xs')]: {
      fontSize: '3rem',
    },
    margin: '0',
    color: '#233535',
  },
  landingPageSubText: {
    fontFamily: 'sans-serif',
    color: '#233535',
    fontSize: '1rem',
    [theme.breakpoints.down('md')]: {
      fontSize: 'small !important',
    },
    marginLeft: '4rem',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0',
      fontSize: '0.7rem !important',
    },
  },
  sortingButtons: {
    backgroundColor: '#43bbbf !important',
    '&:hover': {
      boxShadow:'0 0 0 0 #43bbbf,inset 6em 3.5em 0 0 #17a6ab !important',
    },
    color: 'white !important',
    whiteSpace: 'nowrap',
    width: '10rem',
    [theme.breakpoints.down('md')]: {
      fontSize: 'small',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.5rem !important',
      width: 'auto'
    },
  },
  filterText: {
    flexGrow: '1 !important',
    display: "block",
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    textAlign: 'end !important',
    overflow: 'visible !important',
    fontSize: '1rem !important',
    [theme.breakpoints.down('md')]: {
      fontSize: 'small !important',
    },
  },
  filtersWrapper: {
    display:'flex',
    justifyContent: 'space-around',
    marginTop: '8px',
  },
  typeLocationAndPriceDateWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  dateAndTimeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      padding: '5px 0px'
    },
    justifyContent: 'space-between',
    marginTop: '8px',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cardsWrapper: {
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  }
}))

export default useStyles
