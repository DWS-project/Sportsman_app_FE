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
import { LANDING_PAGE, REGISTRATION_PLAYER } from "../../constants/endpoints";



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

const HeadlineAndCityButtons = ({classes, setCity}) => {
  return (
    <>
      <Box className={classes.landingPage}>
      <Box className={classes.headlineWrapper}>
        <h1 className={classes.landingPageHeadline}>Sportista</h1>
        <p className={classes.landingPageSubText}>Neki text malo duzi</p>
      </Box>
    </Box>
      <Box sx = {{ display: 'flex', justifyContent: 'center', marginTop: '-30px' }}>
        <Box sx = {{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button className={classes.buttonLandingPage} onClick={() => {setCity('Sarajevo')}} >Sarajevo</Button>
          <Button className={classes.buttonLandingPage} onClick={() => {setCity('Zenica')}} >Zenica</Button>
          <Button className={classes.buttonLandingPage} onClick={() => {setCity('Mostar')}} >Mostar</Button>
          <Button className={classes.buttonLandingPage} onClick={() => {setCity('Banja Luka')}} >Banja Luka</Button>
          <Button className={classes.buttonLandingPage} onClick={() => {setCity('Tuzla')}} >Tuzla</Button>
        </Box>
      </Box>
    </>
  )
}

const LandingPage = () => {
  const [sports, setSports] = useState(['fudbal', 'kosarka', 'rukomet', 'odbojka', 'tenis', 'paintball'])
  const [type, setType] = useState(['vanjski', 'unutrasnji'])
  const [capacity, setCapacity] = useState(30)
  const [city, setCity] = useState('')
  const [price, setPrice] = useState(100)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [searchText, setSearchText] = useState('')
  const [isSearchClicked, setIsSearchClicked] = useState(false)
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false)
  const [cards, setCards] = useState([])
  const [sortByType, setSortByType] = useState(false)
  const [typeButtonText, setTypeButtonText] = useState('Sortiraj po tipu')
  const [sortByPrice, setSortByPrice] = useState(false)
  const [priceButtonText, setPriceButtonText] = useState('Sortiraj po cijeni')
  const [isButtonPriceSortingClicked, setIsButtonPriceSortingClicked] = useState(false)
  const [isButtonTypeSortingClicked, setIsButtonTypeSortingClicked] = useState(false)
  const [filter, setFilter] =
    useState({
      sports: sports,
      city: city,
      capacity: capacity,
      price: price,
      date: date,
      time: time,
      searchText: searchText,
      type: type,
      sort_type: typeButtonText,
      sort_price: priceButtonText,
    });
  const classes = useStyles()
  useEffect(() => {
    // Update filter state when any of the variables change
    setFilter({
      sports: sports,
      city: city,
      price: price,
      date: date,
      time: time,
      searchText: searchText,
      type: type,
      sort_type: typeButtonText,
      sort_price: priceButtonText,
    });
  }, [sports, city, capacity, price, date, time, searchText, type, typeButtonText, priceButtonText])

  useEffect(() => {
    fetchCards();
  }, [filter])

  async function fetchCards()  {
    try {
      const response = await axios.get(LANDING_PAGE, {
        params: filter,
      });
      setCards(response.data.data)
    } catch (error) {
      console.error(error); // Handle the error
    }
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
    if (isSearchClicked || isButtonTypeSortingClicked || isButtonPriceSortingClicked) {
      setIsAccordionExpanded(!expanded)
    }else{
      setIsAccordionExpanded(expanded)
    }
  }
  function handleSortByType() {
    if (!sortByType) {
      setSortByType(true)
      setTypeButtonText('Vanjski')
    } else if (typeButtonText === 'Unutrasnji') {
      setSortByType(false)
      setTypeButtonText('Sortiraj po tipu')
    } else {
      setTypeButtonText('Unutrasnji')
    }
  }
  function handleSortByPrice() {
    if (!sortByPrice) {
      setSortByPrice(true)
      setPriceButtonText('Najjeftiniji')
    } else if (priceButtonText === 'Najskuplji') {
      setSortByPrice(false)
      setPriceButtonText('Sortiraj po cijeni')
    } else {
      setPriceButtonText('Najskuplji')
    }
  }

  return (
    <>
      <HeadlineAndCityButtons classes={classes} setCity={setCity}/>

      <Box sx={{ marginTop: '5vh', marginBottom: '5vh', display: 'flex', flexDirection: 'column' }}>
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
                        onChange={(event) => setSearchText(event.target.value)}
                      ></InputBase>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Box
                        onFocus={() => setIsButtonTypeSortingClicked(true)}
                        onBlur={() => setIsButtonTypeSortingClicked(false)}
                      >
                        <Button className={classes.customButton} sx={{ color: 'white', whiteSpace: 'nowrap', width: '10rem'}} onClick={handleSortByType} >{typeButtonText}</Button>
                      </Box>
                      <Box
                        onFocus={() => setIsButtonPriceSortingClicked(true)}
                        onBlur={() => setIsButtonPriceSortingClicked(false)}
                      >
                        <Button className={classes.customButton} sx={{ color: 'white', whiteSpace: 'nowrap', width: '10rem' }} onClick={handleSortByPrice} >{priceButtonText}</Button>
                      </Box>
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
                        <FormControlLabel control={<Checkbox defaultChecked className={classes.forChecks} onChange={() => {includeSport('fudbal')}} />} label="Fudbal" />
                        <FormControlLabel control={<Checkbox defaultChecked className={classes.forChecks} onChange={() => {includeSport('kosarka')}} />} label="Kosarka" />
                        <FormControlLabel control={<Checkbox defaultChecked className={classes.forChecks} onChange={() => {includeSport('odbojka')}} />} label="Odbojka" />
                        <FormControlLabel control={<Checkbox defaultChecked className={classes.forChecks} onChange={() => {includeSport('rukomet')}} />} label="Rukomet" />
                        <FormControlLabel control={<Checkbox defaultChecked className={classes.forChecks} onChange={() => {includeSport('tenis')}} />} label="Tenis" />
                        <FormControlLabel control={<Checkbox defaultChecked className={classes.forChecks} onChange={() => {includeSport('paintball')}} />} label="Paintball" />
                      </FormGroup>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography>Tip terena:</Typography>
                        <FormGroup sx={{ marginLeft: '10px' }}>
                          <FormControlLabel control={<Checkbox defaultChecked className={classes.forChecks} onChange={() => {includeType('vanjski')}} />} label={"Vanjski"} />
                          <FormControlLabel control={<Checkbox defaultChecked className={classes.forChecks} onChange={() => {includeType('unutrasnji')}} />} label={"Unutrasnji"} />
                        </FormGroup>
                      </Box>
                      <Box>
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

                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                      <Box>
                        <Typography>Cijena:</Typography>
                        <Slider
                          defaultValue={100}
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
                    </Box>
                  </Box>
                </AccordionDetails>

              </Accordion>
            </AppBar>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '80%' }}>
            <Grid
              container
              spacing={{ xs: 2, md: 6 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              justifyContent="space-evenly"
              sx={{ alignItems: 'stretch' }}
            >
              {cards.map((item) => (
                <Grid item xs={2} sm={4} md={4} key={item.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <CardActionArea sx={{ objectFit: 'cover' }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.pictures}
                        alt={item.title}
                      />
                      <CardContent sx={{ flex: '1' }}>
                        <Typography noWrap gutterBottom variant="h5" component="div">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description.length > 100
                            ? `${item.description.slice(0, 100)}...`
                            : item.description}
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
