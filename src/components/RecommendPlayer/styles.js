import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    boxStyle: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      maxWidth: 800,
      bgcolor: 'background.paper',
      p: 4,
      outline: 0,
    },
    inviteButton: {
      width: '100% !important',
      color: 'white !important',
      borderRadius: '0 !important',
      backgroundColor: '#43bbbf !important',
      height: '3rem !important',
      '&:hover': {
        backgroundColor: '#3eacb0 !important',
      },
    },
    customButton: {
      backgroundColor: '#43bbbf !important',
      '&:hover': {
        boxShadow: '0 0 0 0 #43bbbf,inset 6em 3.5em 0 0 #17a6ab !important',
      },
      color: 'white !important',
      marginTop: '20px !important',
    },
  })
)

export default useStyles
