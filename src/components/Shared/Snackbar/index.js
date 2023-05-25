import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'

import useStyles from './styles'

export const SnackBarType = {
  Info: 'info',
  Error: 'error',
  Warning: 'warning',
  Success: 'success',
}

const SnackBar = ({ severity, message }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const handleClose = () => setOpen(!open)

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        className={classes.alert}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackBar
