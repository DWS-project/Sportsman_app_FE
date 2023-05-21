import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { AppUserRoles } from 'src/constants/appUserRoles'

import useStyles from '../styles'
import RegistrationFormOwner from './Owner/index'
import RegistrationFormUser from './User/index'

const RegistrationForm = ({ avatar }) => {
  const [chosenRegistration, setChosenRegistration] = useState(null)
  const classes = useStyles()

  function handleOptionClick(option) {
    setChosenRegistration(option)
  }

  if (chosenRegistration === AppUserRoles.Owner) {
    return (
      <Box sx={{ my: 2, mx: 4 }} className={classes.leftContainer}>
        {avatar}
        <RegistrationFormOwner />
      </Box>
    )
  } else if (chosenRegistration === AppUserRoles.User) {
    return (
      <Box sx={{ my: 1, mx: 4 }} className={classes.leftContainer}>
        {avatar}
        <RegistrationFormUser />
      </Box>
    )
  }

  return (
    <Box className={classes.choosingContainer}>
      <Box sx={{ width: '100', height: '100%' }}>
        <Box className={classes.wrapper}>
          <Box className={classes.sportField}>
            <Box className={classes.heroText}>
              <h2 className={classes.registerHeadline}>Registrujte se</h2>
              <p className={classes.registerSub}>kao vlasnik terena</p>
              <Button
                className={classes.registerButton1}
                onClick={() => handleOptionClick(AppUserRoles.Owner)}
              >
                Registruj se
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className={classes.wrapper}>
          <Box className={classes.soccerPlayer}>
            <Box className={classes.heroText2}>
              <h2 className={classes.registerHeadline}>Registrujte se</h2>
              <p className={classes.registerSub2}>kao igrač</p>
              <Button
                className={classes.registerButton1}
                onClick={() => handleOptionClick(AppUserRoles.User)}
              >
                Registruj se
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default RegistrationForm
