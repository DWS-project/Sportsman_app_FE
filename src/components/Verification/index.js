import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SnackBar, { SnackBarType } from 'src/components/Shared/Snackbar'
import { HTTPStatusCodes } from 'src/constants/statusCodes'
import withMainFrame from 'src/hoc/withMainFrame'

import {
  CONFIRM_EMAIL,
  RESEND_CONFIRMATION_TOKEN,
} from '../../constants/endpoints'
import { SOMETHING_WENT_WRONG } from '../../constants/errorMessages'
import useStyles from '../Verification/styles'

const EmailConfirmation = () => {
  const classes = useStyles()

  const location = useLocation()
  const navigate = useNavigate()
  const navigateToLogin = () => {
    navigate('/login')
  }

  const [token, setToken] = useState('')
  const [snackBarProps, setSnackBarProps] = useState(null)
  const [loading, setLoading] = useState(true)
  const [displayText, setDisplayText] = useState('')
  const [verificationMessage, setVerificationMessage] = useState('')
  const [showLoginButton, setShowLoginButton] = useState(false)
  const [initialValues, setInitialValues] = useState({
    email: '',
  })

  async function resendToken(email) {
    setSnackBarProps(null)
    setDisplayText(null)
    setVerificationMessage(null)

    try {
      const response = await axios.post(`${RESEND_CONFIRMATION_TOKEN}`, {
        email: email,
      })

      if (response.status === HTTPStatusCodes.OK) {
        setSnackBarProps({
          message: '',
          severity: SnackBarType.Success,
        })
        setDisplayText(response.data.message)
      } else {
        setSnackBarProps({
          message: response.status,
          severity: SnackBarType.Error,
        })
        setVerificationMessage(response.data.message)
        setDisplayText(
          'Klikom na dugme “Pošalji ponovo” dobiti ćete e-mail sa novim linkom za verifikaciju.'
        )
      }
    } catch (error) {
      setVerificationMessage(error.response.data.message)
      setDisplayText(SOMETHING_WENT_WRONG)
      setSnackBarProps({
        message: '',
        severity: SnackBarType.Error,
      })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams(location.search)
      setToken(searchParams.get('token'))

      if (token) {
        try {
          const response = await axios.post(`${CONFIRM_EMAIL}${token}`)
          const { message, email } = response.data

          if (email && email !== '') {
            setInitialValues({ email })
          }

          const isStatusOK = response.status === HTTPStatusCodes.CREATED
          if (response.status === HTTPStatusCodes.CREATED) {
            setDisplayText(isStatusOK ? message : SOMETHING_WENT_WRONG)
            setVerificationMessage('Čestitamo')
            setShowLoginButton(true)
            setInitialValues({ email: response.data.email })
          }
        } catch (error) {
          setInitialValues({ email: error.response.data.email })
          setVerificationMessage(error.response.data.message)
          setDisplayText(
            'Klikom na dugme “Pošalji ponovo” dobiti ćete e-mail sa novim linkom za verifikaciju.'
          )
          setSnackBarProps({
            message: SOMETHING_WENT_WRONG,
            severity: SnackBarType.Error,
          })
        } finally {
          setLoading(false)
        }
      }
    }
    fetchData()
  }, [location.search, token])

  return withMainFrame(
    <div className={classes.containerWrapper}>
      {loading ? (
        <div className={classes.spinnerContainer}>
          <Typography variant="h5" className={classes.title}>
            Obrada potvrde email adrese
          </Typography>
          <div className={classes.spinner}>
            <CircularProgress />
          </div>
        </div>
      ) : (
        <React.Fragment>
          {snackBarProps && (
            <SnackBar
              message={snackBarProps.message}
              severity={snackBarProps.severity}
            />
          )}
          <img
            src="/images/verification.svg"
            alt="Verification Image"
            className={classes.image}
          />
          <div className={classes.textContainer}>
            {verificationMessage && (
              <Typography variant="h5" className={classes.title}>
                {verificationMessage}
              </Typography>
            )}
            <Typography variant="body1">{displayText}</Typography>

            <div className={classes.buttonGroup}>
              <Button
                className={classes.sendAgainButton}
                onClick={
                  showLoginButton
                    ? navigateToLogin
                    : () => resendToken(initialValues.email)
                }
              >
                {showLoginButton ? 'Login' : 'Pošalji ponovo'}
              </Button>
              <Button
                className={classes.homeButton}
                onClick={() => navigate('/')}
              >
                Početna stranica
              </Button>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default EmailConfirmation
