import { makeStyles } from '@material-ui/core'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#43bbbf !important',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
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
  },
  logoWrapper: {
    display: 'flex',
  },
}))

export default useStyles
