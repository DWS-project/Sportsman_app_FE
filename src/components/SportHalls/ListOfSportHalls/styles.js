import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '100px 50px 50px 100px',
    backgroundColor: '#E5E5E5',
    minHeight: '90vh',
  },
  cardWrapper: {
    backgroundColor: '#43bbbf !important',
  },
  ribbon: {
    textAlign: 'center',
    position: 'absolute',
    top: 20,
    right: '-34px',
    backgroundColor: '#fff',
    padding: '0.5rem',
    transform: 'rotate(45deg)',
    zIndex: 1,
    width: '130px',
  },
  ribbonText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    maxWidth: '500px',
  },
  featuredRibbon: {
    textAlign: 'center',
    position: 'absolute',
    top: 20,
    right: '-34px',
    backgroundColor: '#bea8e3',
    padding: '0.5rem',
    transform: 'rotate(45deg)',
    zIndex: 1,
    width: '130px',
  },
}))

export default useStyles
