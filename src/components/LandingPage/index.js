import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import useStyles from '../AuthenticationFrame/styles'
import ImageListItem from "@mui/material/ImageListItem";
import { cities, imagesDataForUser } from "../../constants/appDefaults";
import ToggleButton from "@mui/material/ToggleButton";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageList from "@mui/material/ImageList";
import Link from "@mui/material/Link";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion, AccordionDetails,
  AccordionSummary,
  AppBar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia, Checkbox, FormControlLabel, FormGroup,
  InputBase, Slider,
  Toolbar
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { REGISTRATION_PLAYER } from "../../constants/endpoints";



const items = [
  {
    img: '/images/football.jpg',
    title: 'Fudbal',
    name: 'fudbal'
  },
  {
    img: '/images/basketball.jpg',
    title: 'Košarka',
    name: 'kosarka'
  },
  {
    img: '/images/handball.jpg',
    title: 'Rukomet',
    name: 'rukomet'
  },
  {
    img: '/images/volleyball.jpg',
    title: 'Odbojka',
    name: 'odbojka'
  },
  {
    img: '/images/tennis.jpg',
    title: 'Tenis',
    name: 'tenis'
  },
  {
    img: '/images/paintball.png',
    title: 'Paintball',
    name: 'paintball'
  },
]

const HeadlineAndCityButtons = ({classes}) => {
  return (
    <>
      <Box className={classes.landingPage}>
      <Box>
        <h1>Sportista</h1>
        <p>Neki text malo duzi</p>
      </Box>
    </Box>
      <Box sx = {{ display: 'flex', justifyContent: 'center', marginTop: '-30px' }}>
        <Box sx = {{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button className={classes.buttonLandingPage}>Sarajevo</Button>
          <Button className={classes.buttonLandingPage}>Zenica</Button>
          <Button className={classes.buttonLandingPage}>Mostar</Button>
          <Button className={classes.buttonLandingPage}>Banja Luka</Button>
          <Button className={classes.buttonLandingPage}>Tuzla</Button>
        </Box>
      </Box>
    </>
  )
}

const LandingPage = () => {
  const [sports, setSports] = useState([])
  const [type, setType] = useState([])
  const [capacity, setCapacity] = useState('')
  const [city, setCity] = useState('')
  const [price, setPrice] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [isSearchClicked, setIsSearchClicked] = useState(false)
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false)
  const [cards, setCards] = useState([]);
  const [filter, setFilter] =
    useState({
      sports: sports,
      city: city,
      capacity: capacity,
      price: price,
      date: date,
      time: time,
    });
  const classes = useStyles()
  useEffect(() => {
    // Update filter state when any of the variables change
    setFilter({
      sports: sports,
      city: city,
      capacity: capacity,
      price: price,
      date: date,
      time: time,
    });
  }, [sports, city, capacity, price, date, time])

  useEffect(() => {
    fetchCards();
  }, [filter])

  async function fetchCards() {
    const response = await axios.get(REGISTRATION_PLAYER, filter)
    setCards(response.data)
  }

  function includeSport(sport) {
    let copy = [...sports]
    const isItemInList = copy.includes(sport)
    if (isItemInList) {
      setSports(
        copy.filter((element) => element !== sport)
      )
    } else {
      setSports([...copy, sport])
    }
  }

  function includeType(typeOfFields) {
    let copy = [...type]
    const isItemInList = copy.includes(typeOfFields)
    if (isItemInList) {
      setType(
        copy.filter((element) => element !== typeOfFields)
      )
    } else {
      setType([...copy, typeOfFields])
    }
  }

  const handleAccordionChange = (event, expanded) => {
    if (isSearchClicked) {
      setIsAccordionExpanded(!expanded)
    }else{
      setIsAccordionExpanded(expanded)
    }
  }

  return (
    <>
      <HeadlineAndCityButtons classes={classes} />
      <Box sx={{ marginTop: '20vh', marginBottom: '5vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ alignSelf: 'center', width: '80%', marginBottom: '20px' }}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" >
              <Accordion expanded={isAccordionExpanded} onChange={(event, expanded)=>{handleAccordionChange(event,expanded)}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ backgroundColor: '#43bbbf !important', color: 'white', margin: '0', '& >div': {margin: '0 !important'},  }}
                >
                  <Toolbar sx={{width: '100%'}}>
                    <Box className={classes.search}>
                      <Box className={classes.searchIconWrapper}>
                        <SearchIcon />
                      </Box>
                      <InputBase
                        className={classes.searchField}
                        placeholder="Search..."
                        sx={{ outline: 'none', border: 'none' }}
                        onFocus={() => setIsSearchClicked(true)}
                        onBlur={() => setIsSearchClicked(false)}
                      ></InputBase>
                    </Box>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textAlign: 'end' }}
                    >
                      Filtriraj
                    </Typography>
                  </Toolbar>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display:'flex', justifyContent: 'space-around', mt: 1 }}>
                    <Box>
                      <Typography sx={{ marginLeft: '-10px' }}>Sportovi:</Typography>
                      <FormGroup>
                        <FormControlLabel control={<Checkbox className={classes.forChecks} onChange={() => {includeSport('fudbal')}} />} label="Fudbal" />
                        <FormControlLabel control={<Checkbox className={classes.forChecks} onChange={() => {includeSport('kosarka')}} />} label="Kosarka" />
                        <FormControlLabel control={<Checkbox className={classes.forChecks} onChange={() => {includeSport('odbojka')}} />} label="Odbojka" />
                        <FormControlLabel control={<Checkbox className={classes.forChecks} onChange={() => {includeSport('rukomet')}} />} label="Rukomet" />
                        <FormControlLabel control={<Checkbox className={classes.forChecks} onChange={() => {includeSport('tenis')}} />} label="Tenis" />
                        <FormControlLabel control={<Checkbox className={classes.forChecks} onChange={() => {includeSport('paintball')}} />} label="Paintball" />
                      </FormGroup>
                    </Box>
                    <Box>
                      <Typography>Tip terena:</Typography>
                      <FormGroup sx={{ marginLeft: '10px' }}>
                        <FormControlLabel control={<Checkbox className={classes.forChecks} onChange={() => {includeType('vanjski')}} />} label={"Vanjski"} />
                        <FormControlLabel control={<Checkbox className={classes.forChecks} onChange={() => {includeType('unutrasnji')}} />} label={"Unutrasnji"} />
                      </FormGroup>
                      <Typography sx={{ mt: 1 }}>Kapacitet:</Typography>
                      <Slider
                        defaultValue={8}
                        aria-label="Default"
                        className={classes.forSliders}
                        valueLabelDisplay="auto"
                        max={30}
                        onChange={(event) => {
                          setCapacity(event.target.value)
                        }}
                      />
                      <Typography sx={{ mt: 1 }}>Lokacija:</Typography>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={cities}
                        onChange={(event, newValue) => {
                          setCity(newValue)
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="normal"
                            name="city"
                            id="city"
                            value={city}
                            label="Grad"
                          />
                        )}
                      />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                      <Box>
                        <Typography>Cijena:</Typography>
                        <Slider
                          defaultValue={50}
                          aria-label="Default"
                          className={classes.forSliders}
                          valueLabelDisplay="auto"
                          onChange={(event) => {
                            setPrice(event.target.value)
                          }}
                        />
                        <Typography sx={{ mt:2 }}>Datum i vrijeme slobodnog termina:</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 1}}>
                          <input
                            type="date"
                            className={classes.forDate}
                            min="2023-01-01"
                            max="2025-12-31"
                            onChange={(event) => {
                              setDate(event.target.value)
                            }}
                          />
                          <input
                            type="time"
                            className={classes.forDate}
                            onChange={(event) => {
                              setTime(event.target.value)
                            }}
                          />
                        </Box>
                      </Box>
                      <Button className={classes.customButton} sx={{ color: 'white', alignSelf: 'end' }}>Primjeni</Button>
                    </Box>
                  </Box>
                </AccordionDetails>

              </Accordion>
            </AppBar>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '80%' }}>
            <Grid container spacing={{ xs: 2, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="space-evenly">
              {items.map((item) => (
                <Grid item xs={2} sm={4} md={4} key={item.img}>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.img}
                        alt={item.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>



    </>
  )
}

export default LandingPage
