import { createStyles, makeStyles } from '@material-ui/core'


const useStyles = makeStyles(() =>
  createStyles({
    boxStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width:800,
        maxWidth: 800,
        bgcolor: 'background.paper',
        p: 4,
        outline: 0,
      }
  })
)

export default useStyles