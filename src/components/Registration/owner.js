import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { REGISTRATION_OWNER } from '../../constants/endpoints'
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

const steps = ['Postavke profila', 'Tip terena i lokacija']

const cities = ['Sarajevo', 'Zenica', 'Tuzla', 'Mostar']

const RegistrationFormOwner = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [repeatedPassword, setRepeatedPassword] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [streetNumber, setStreetNumber] = useState('')
  const [type, setType] = useState('')
  const [capacity, setCapacity] = useState('')
  const [activeStep, setActiveStep] = useState(0)
  const [hooks, setHooks] = useState([]);
  const classes = useStyles()

  async function handleSubmit() {
    const check = checkFields()
    if(check.length === 0){
      const data = {
        name,
        surname,
        username,
        phone,
        email,
        password,
        repeatedPassword,
        city,
        street,
        streetNumber,
        type,
        capacity
      }

      const { status, message } = await axios.post(REGISTRATION_OWNER, data)
      console.log('status', status)
      console.log('message', message)
    }
  }

  useEffect(() => {
      setHooks([
        { name: 'name', value: name },
        { name: 'surname', value: surname },
        { name: 'username', value: username },
        { name: 'phone', value: phone },
        { name: 'email', value: email },
        { name: 'password', value: password },
        { name: 'repeatedPassword', value: repeatedPassword },
        { name: 'city', value: city },
        { name: 'street', value: street },
        { name: 'streetNumber', value: streetNumber },
        { name: 'type', value: type },
        { name: 'capacity', value: capacity },
      ])
  }, [name, surname, username, phone, email, password, repeatedPassword,
    city, street, streetNumber, type, capacity])

  // Are all fields filled?
  const checkFields = () => {
    const missingFields = []
    hooks.forEach((hook) => {
      if(hook.value === ''){
        missingFields.push(hook.name)
      }
    })
    return missingFields
  }
  const handleNext = () => {
    const check = checkFields()
    if (check.length === 5) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  // Colors of active and completed step in steper
  const activeColor = '#43bbbf';
  const completedColor = '#39CCC5';

  // Is image representing interest selected?
  function isSelected(title){
    return type === title
  }
  // Images and titles for interests
  const itemData = [
    {
      img: '/images/smallSoccerField.jpg',
      title: 'Vanjski',
      name: 'vanjski'
    },
    {
      img: '/images/sportHall.jpg',
      title: 'Unutrašnji',
      name: 'unustrasnji'
    },
    {
      img: '/images/combination.png',
      title: 'Oba tipa',
      name: 'obaTipa'
    },
  ]
  // This part of code is used to display images properly when screen is resized # For responsive display
  // If screen is medium or higher size then three columns of images are displayed, else one column
  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'))
  const [colsValue, setColsValue] = useState(isMediumScreen ? 3 : 1)

  const handleScreenSizeChange = () => {
    const updatedColsValue = isMediumScreen ? 3 : 1
    setColsValue(updatedColsValue)
  }

  useEffect(() => {
    window.addEventListener('resize', handleScreenSizeChange);
    return () => {
      window.removeEventListener('resize', handleScreenSizeChange);
    };
  }, [isMediumScreen]);

  const renderSteps = (label) => {
    const stepProps = {};
    const labelProps = {};
    return (
      <Step key={label} {...stepProps}>
        <StepLabel {...labelProps}>{label}</StepLabel>
      </Step>
    )
  }

  // In "return": first Box element is for stepper, after this Box element I'm checking active step, if active step
  // is last step then "Tip terena i lokacija" step is displayed otherwise the registration form is displayed

  return (
    <>
      <Typography component="h1" variant="h5" sx={{mb: 5}}>
        Registrujte se
      </Typography>
      <Box sx={{width:'100%'}}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          fullWidth
          sx={{
            '& .MuiStepIcon-root.Mui-active': {color: activeColor},
            '& .MuiStepIcon-root.Mui-completed': {color: completedColor}
          }}>
          {steps.map((label) => renderSteps(label))}
        </Stepper>
      </Box>

      {activeStep === steps.length-1 ? (
        <>
          <Box sx={{width: '100%', height: '100%'}}>
            <ImageList cols={colsValue}>
              <ImageListItem cols={colsValue}>
                <Typography component="h1" variant="h5" sx={{mb: 3, mt: 2, alignSelf: 'center'}}>
                  Odaberite tip terena:
                </Typography>
              </ImageListItem>
              {itemData.map((item) => (
                <ToggleButton
                  value="check"
                  selected={type === item.name}
                  onChange={() => {
                    setType(item.name)
                  }}
                  sx={{borderRadius: 0, p: 0, border: 0}}
                >
                  <ImageListItem
                    key={item.img}
                    cols={1}
                    className={classes.imageList}
                    sx={{
                      opacity: isSelected(item.name) ? 0.8 : 1,
                      border: isSelected(item.name) ? '5px solid #43bbbf' : '5px solid transparent',
                    }}>
                    <img
                      src={`${item.img}`}
                      alt={item.title}
                      loading={"eager"}
                    />
                    <ImageListItemBar
                      title={item.title}
                    />
                  </ImageListItem>
                </ToggleButton>
              ))}
            </ImageList>
          </Box>
            <TextField
              margin="normal"
              name="capacity"
              fullWidth
              required
              label="Broj terena koje posjedujete"
              type="number"
              id="capacity"
              autoComplete="off"
              onChange={(event) => {
                setCapacity(event.target.value)
              }}
            />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%'
            }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              required
              options={cities}
              sx={{ width: '30%' }}
              onChange={(event,newValue)=>{
                setCity(newValue)
              }}
              renderInput={(params) =>
                <TextField
                  {...params}
                  margin="normal"
                  name="city"
                  id="city"
                  label="Grad"
                  required
                />}
            />
            <TextField
              margin="normal"
              required
              name="street"
              label="Ulica"
              id="street"
              autoComplete="off"
              onChange={(event) => {
                setStreet(event.target.value)
              }}
              sx={{ width: '30%' }}
            />
            <TextField
              margin="normal"
              required
              name="streetNumber"
              label="Broj ulice"
              type="number"
              id="streetNumber"
              autoComplete="off"
              onChange={(event) => {
                setStreetNumber(event.target.value)
              }}
              sx={{ width: '30%' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              pt: '2',
              width: '100%'
            }}>
            <Button
              onClick={handleBack}
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2, mr: 1 }}
              className={classes.customButton}
            >
              Nazad
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2, mr: 1 }}
              className={classes.customButton}
              onClick={handleSubmit}
            >
              Nastavi
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box noValidate sx={{ mt: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <TextField
                margin="normal"
                required
                id="name"
                label="Ime"
                name="name"
                onChange={(event) => {
                  setName(event.target.value)
                }}
                sx={{width: '47%'}}
              />
              <TextField
                margin="normal"
                required
                id="surname"
                label="Prezime"
                name="surname"
                onChange={(event) => {
                  setSurname(event.target.value)
                }}
                sx={{width:'47%'}}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <TextField
                margin="normal"
                required
                id="email"
                label="Email adresa"
                name="email"
                autoComplete="off"
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
                sx={{width: '47%'}}
              />
              <TextField
                margin="normal"
                required
                id="phone"
                label="Kontakt telefon"
                name="phone"
                autoComplete="off"
                onChange={(event) => {
                  setPhone(event.target.value)
                }}
                sx={{width: '47%'}}
              />
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Korisničko ime"
              id="username"
              autoComplete="off"
              onChange={(event) => {
                setUsername(event.target.value)
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Lozinka"
              type="password"
              id="password"
              autoComplete="off"
              onChange={(event) => {
                setPassword(event.target.value)
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="repeatedPassword"
              label="Ponovljena lozinka"
              type="password"
              id="repeatedPassword"
              autoComplete="off"
              onChange={(event) => {
                setRepeatedPassword(event.target.value)
              }}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className={classes.customButton}
              onClick={handleNext}
            >
              Dalje
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href="http://localhost:3000/login"
                  sx={{
                    color: '#43bbbf',
                    textDecoration: 'none',
                  }}
                >
                  Ulogujte se
                </Link>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </>
  )
}

export default RegistrationFormOwner