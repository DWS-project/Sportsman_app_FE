import { makeStyles } from '@material-ui/core'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#43bbbf !important',
    width: '100%',
    paddingLeft: '50px',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: '0px',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
    fontWeight: 900,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  logo: {
    width: '50px',
    height: '50px',
    marginRight: theme.spacing(2),
    '&:hover': {
      cursor: 'pointer',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  logoMobile: {
    width: '50px',
    height: '50px',
    marginRight: theme.spacing(2),
    '&:hover': {
      cursor: 'pointer',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logoWrapper: {
    display: 'flex',
  },
  logoTitleMobile: {
    flexGrow: 1,
    fontFamily: 'monospace !important',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  item: {
    textDecoration: 'none',
    color: 'black',
  },
  notificationIcon: {
    marginRight: '20px',
  },
}))

export default useStyles
