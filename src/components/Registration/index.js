import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { REGISTRATION_PLAYER } from '../../constants/endpoints'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Autocomplete from '@mui/material/Autocomplete'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import ToggleButton from '@mui/material/ToggleButton'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect } from 'react'
import useStyles from '../AuthenticationFrame/styles'

const steps = ['Postavke profila', 'Interesovanja']

const cities = ['Sarajevo', 'Zenica', 'Tuzla', 'Mostar']

const RegistrationForm = () => {
  const [chosen, setChosen] = useState(null)
  const classes = useStyles()
  return (
    <Box sx={{width: '100', height: '100%'}} fullWidth>
      <Box className={classes.wrapper}>
        <Box className={classes.sportField}>
          <Box className={classes.heroText}>
            <h2 className={classes.registerHeadline}>Registrujte se</h2>
            <p className={classes.registerSub}>kao vlasnik terena</p>
          </Box>
          <Button className={classes.registerButton1}>
          Registruj se
          </Button>

        </Box>
      </Box>
      <Box className={classes.wrapper} fullWidth>
        <Box className={classes.soccerPlayer}>
          <Box className={classes.heroText2}>
            <h2 className={classes.registerHeadline}>Registrujte se</h2>
            <p className={classes.registerSub2}>kao igrač</p>
            <Button className={classes.registerButton2}>
              Registuj se
            </Button>
          </Box>

        </Box>
      </Box>

    </Box>
  )
}

export default RegistrationForm
