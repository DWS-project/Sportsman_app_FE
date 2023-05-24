import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import { useState } from 'react'
import SnackBar, { SnackBarType } from 'src/components/Shared/Snackbar'
import { CONTACT_US } from 'src/constants/endpoints'
import { HTTPStatusCodes } from 'src/constants/statusCodes'
import withMainFrame from 'src/hoc/withMainFrame'

import useStyles from './styles'

const ContactUs = () => {
  const classes = useStyles()
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    message: '',
  })

  async function handleSubmit() {
    const data = {
      ...initialValues,
    }
    const { status, message: userMessage } = await axios.post(CONTACT_US, data)
    const isStatusOK = status === HTTPStatusCodes.OK

    return (
      <SnackBar
        message={isStatusOK ? userMessage : SOMETHING_WENT_WRONG}
        severity={isStatusOK ? SnackBarType.Success : SnackBarType.Error}
      />
    )
  }

  return withMainFrame(
    <div className={classes.container}>
      <img
        className={classes.image}
        src="/images/contactUsIcon.svg"
        alt="Contact"
      />
      <div className={classes.formContainer}>
        <h1 className={classes.title}>Kontaktirajte nas</h1>
        <div className={classes.inputField}>
          <TextField
            label="Ime i prezime"
            variant="outlined"
            fullWidth
            onChange={(event) => {
              setInitialValues({
                ...initialValues,
                name: event.target.value,
              })
            }}
          />
        </div>
        <div className={classes.inputField}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            onChange={(event) => {
              setInitialValues({
                ...initialValues,
                email: event.target.value,
              })
            }}
          />
        </div>
        <div className={classes.inputField}>
          <TextField
            label="Poruka"
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            onChange={(event) => {
              setInitialValues({
                ...initialValues,
                message: event.target.value,
              })
            }}
          />
        </div>
        <Button className={classes.button} onClick={() => handleSubmit()}>
          Pošalji
        </Button>
      </div>
    </div>
  )
}

export default ContactUs
