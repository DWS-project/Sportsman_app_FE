import { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import useStyles from '../AuthenticationFrame/styles'
import RegistrationFormOwner from "./owner";
import RegistrationFormUser from "./user";


const RegistrationForm = ({avatar}) => {
  const [chosen, setChosen] = useState(null)
  const classes = useStyles()

  const handleOptionClick = (option) => {
    setChosen(option)
  }

  if (chosen === 'owner') {
    return (
      <Box sx={{ my: 2, mx: 4 }} className={classes.leftContainer}>
        {avatar}
        <RegistrationFormOwner />
      </Box>
    )
  } else if (chosen === 'user') {
    return (
      <Box sx={{ my: 1, mx: 4 }} className={classes.leftContainer}>
        {avatar}
        <RegistrationFormUser />
      </Box>
    )
  }

  return (
    <Box className={classes.choosingContainer}>
      <Box sx={{width: '100', height: '100%'}}>
        <Box className={classes.wrapper}>
          <Box className={classes.sportField}>
            <Box className={classes.heroText}>
              <h2 className={classes.registerHeadline}>Registrujte se</h2>
              <p className={classes.registerSub}>kao vlasnik terena</p>
              <Button
                className={classes.registerButton1}
                onClick={() => handleOptionClick('owner')}
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
                onClick={() => handleOptionClick('user')}>
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
