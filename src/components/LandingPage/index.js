import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputBase,
  Slider,
  Toolbar,
} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import withMainFrame from 'src/hoc/withMainFrame'

import { cities } from 'src/constants/appDefaults'
import { LANDING_PAGE } from 'src/constants/endpoints'
import { COOKIE_AUTHENTICATION_FE } from 'src/constants/keys/browser'
import useStyles from './styles'

const landingPageCities = [
  'Sarajevo',
  'Zenica',
  'Mostar',
  'Banja Luka',
  'Tuzla'
]

const sportNames = [
  'fudbal',
  'kosarka',
  'odbojka',
  'rukomet',
  'tenis',
  'paintball'
]

const LandingPage = () => {
  const [initialValues, setInitialValues] = useState({
    sports: sportNames,
    type: ['vanjski', 'unutrasnji'],
    capacity: 30,
    city: '',
    price: 100,
    date: '',
    time: '',
    searchText: '',
    isSearchClicked: false,
    isAccordionExpanded: false,
    cards: [],
    sortByType: false,
    typeButtonText: 'Sortiraj po tipu',
    sortByPrice: false,
    priceButtonText: 'Sortiraj po cijeni',
    isButtonPriceSortingClicked: false,
    isButtonTypeSortingClicked: false
  })
  const [filter, setFilter] = useState({
    sports: initialValues.sports,
    city: initialValues.city,
    capacity: initialValues.capacity,
    price: initialValues.price,
    date: initialValues.date,
    time: initialValues.time,
    searchText: initialValues.searchText,
    type: initialValues.type,
    sort_type: initialValues.typeButtonText,
    sort_price: initialValues.priceButtonText
  })


  useEffect(() => {
    const userData = Cookies.get(COOKIE_AUTHENTICATION_FE)
    const parsedUserData = userData && JSON.parse(userData)
    const isUserLogged = userData && !!parsedUserData.id

    if(isUserLogged){
      if (parsedUserData.interests !== '') {
        setInitialValues((prevState) => ({
          ...prevState,
          sports: JSON.parse(parsedUserData.interests).interests
        }))
      }
      if (parsedUserData.city !== '') {
        setInitialValues((prevState) => ({
          ...prevState,
          city: parsedUserData.city
        }))
      }
    }
  }, [])

  useEffect(() => {
    setFilter({
      sports: initialValues.sports,
      city: initialValues.city,
      price: initialValues.price,
      date: initialValues.date,
      time: initialValues.time,
      searchText: initialValues.searchText,
      type: initialValues.type,
      sort_type: initialValues.typeButtonText,
      sort_price: initialValues.priceButtonText
    })
  }, [])

  useEffect(() => {
    fetchCards()
  }, [])

  const classes = useStyles()

  async function fetchCards() {
    try {
      const response = await axios.get(LANDING_PAGE, { params: filter })
      setInitialValues((prevState) => ({
        ...prevState,
        cards: response.data.data
      }))

    } catch (error) {
      console.error(error)
    }
  }

  function includeSport(sport) {
    const isItemInList = initialValues.sports.includes(sport)
    if (isItemInList) {
      setInitialValues((prevState) => ({
        ...prevState,
        sports: initialValues.sports.filter((element) => element !== sport)
      }))
    } else {
      setInitialValues((prevState) => ({
        ...prevState,
        sports: [...initialValues.sports, sport]
      }))
    }
  }

  function includeType(typeOfFields) {
    const isItemInList = initialValues.type.includes(typeOfFields)
    if (isItemInList) {
      setInitialValues((prevState) => ({
        ...prevState,
        type: initialValues.type.filter((element) => element !== typeOfFields)
      }))
    } else {
      setInitialValues((prevState) => ({
        ...prevState,
        type: [...initialValues.type, typeOfFields]
      }))
    }
  }

  function handleAccordionChange(event, expanded) {
    if (
      initialValues.isSearchClicked ||
      initialValues.isButtonTypeSortingClicked ||
      initialValues.isButtonPriceSortingClicked
    ) {
      setInitialValues((prevState) => ({
        ...prevState,
        isAccordionExpanded: !expanded
      }))
    } else {
      setInitialValues((prevState) => ({
        ...prevState,
        isAccordionExpanded: expanded
      }))
    }
  }

  function handleSortByType() {
    if (!initialValues.sortByType) {
      setInitialValues((prevState) => ({
        ...prevState,
        sortByType: true,
        typeButtonText: 'Vanjski'
      }))
    } else if (initialValues.typeButtonText === 'Unutrašnji') {
      setInitialValues((prevState) => ({
        ...prevState,
        sortByType: false,
        typeButtonText: 'Sortiraj po tipu'
      }))
    } else {
      setInitialValues((prevState) => ({
        ...prevState,
        typeButtonText: 'Unutrašnji'
      }))
    }
  }

  function handleSortByPrice() {
    if (!initialValues.sortByPrice) {
      setInitialValues((prevState) => ({
        ...prevState,
        sortByPrice: true,
        priceButtonText: 'Najjeftiniji'
      }))
    } else if (initialValues.priceButtonText === 'Najskuplji') {
      setInitialValues((prevState) => ({
        ...prevState,
        sortByPrice: false,
        priceButtonText: 'Sortiraj po cijeni'
      }))
    } else {
      setInitialValues((prevState) => ({
        ...prevState,
        priceButtonText: 'Najskuplji'
      }))
    }
  }

  return withMainFrame(
    <>
      <Box className={classes.landingPage}>
        <Box className={classes.headlineWrapper}>
          <h1 className={classes.landingPageHeadline}>Sportista</h1>
          <p className={classes.landingPageSubText}>
            Najbolje mjesto za iznajmljivanje sportskih dvorana i terena.
            Pružamo vam <br />
            jednostavan i siguran način pronalaženja i rezervisanja idealnog
            prostora <br />
            za vaš sportski trening, natjecanje ili rekreaciju.
          </p>
        </Box>
      </Box>
      <Box className={classes.citiesLandingPage}>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          {landingPageCities.map((city) => (
            <Button
              key={city}
              className={classes.buttonLandingPage}
              onClick={() => {
                setInitialValues((prevState) => ({
                  ...prevState,
                  city
                }))
              }}
            >
              {city}
            </Button>
          ))}
        </Box>
      </Box>
      <Box className={classes.contentWrapper}>
        <Box className={classes.centerContent}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Accordion
                expanded={initialValues.isAccordionExpanded}
                onChange={(event, expanded) => {
                  handleAccordionChange(event, expanded)
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className={classes.accordionSummaryContent}
                >
                  <Toolbar sx={{ width: '100%' }}>
                    <Box className={classes.search}>
                      <Box className={classes.searchIconWrapper}>
                        <SearchIcon />
                      </Box>
                      <InputBase
                        className={classes.searchField}
                        placeholder="Search..."
                        sx={{ outline: 'none', border: 'none' }}
                        onFocus={() => {
                          setInitialValues((prevState) => ({
                            ...prevState,
                            isSearchClicked: true
                          }))
                        }}
                        onBlur={() => {
                          setInitialValues((prevState) => ({
                            ...prevState,
                            isSearchClicked: false
                          }))
                        }}
                        onChange={(event) => {
                          setInitialValues((prevState) => ({
                            ...prevState,
                            searchText: event.target.value
                          }))
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Box
                        onFocus={() => {
                          setInitialValues((prevState) => ({
                            ...prevState,
                            isButtonTypeSortingClicked: true
                          }))
                        }}
                        onBlur={() => {
                          setInitialValues((prevState) => ({
                            ...prevState,
                            isButtonTypeSortingClicked: false
                          }))
                        }}
                      >
                        <Button
                          className={classes.sortingButtons}
                          onClick={handleSortByType}
                        >
                          {initialValues.typeButtonText}
                        </Button>
                      </Box>
                      <Box
                        onFocus={() => {
                          setInitialValues((prevState) => ({
                            ...prevState,
                            isButtonPriceSortingClicked: true
                          }))
                        }}
                        onBlur={() => {
                          setInitialValues((prevState) => ({
                            ...prevState,
                            isButtonPriceSortingClicked: false
                          }))
                        }}
                      >
                        <Button
                          className={classes.sortingButtons}
                          onClick={handleSortByPrice}
                        >
                          {initialValues.priceButtonText}
                        </Button>
                      </Box>
                    </Box>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      className={classes.filterText}
                    >
                      Filtriraj
                    </Typography>
                  </Toolbar>
                </AccordionSummary>
                <AccordionDetails>
                  <Box className={classes.filtersWrapper}>
                    <Box>
                      <Typography sx={{ marginLeft: '-10px' }}>
                        Sportovi:
                      </Typography>
                      <FormGroup>
                        {sportNames.map((sport) => (
                          <FormControlLabel
                            key={sport}
                            control={
                              <Checkbox
                                checked={initialValues.sports.includes(sport)}
                                className={classes.forChecks}
                                onChange={() => includeSport(sport)}
                              />
                            }
                            label={sport.charAt(0).toUpperCase() + sport.slice(1)}
                          />
                        ))}
                      </FormGroup>
                    </Box>
                    <Box className={classes.typeLocationAndPriceDateWrapper}>
                      <Box>
                        <Typography>Tip terena:</Typography>
                        <FormGroup sx={{ marginLeft: '10px' }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked
                                className={classes.forChecks}
                                onChange={() => {
                                  includeType('vanjski')
                                }}
                              />
                            }
                            label={'Vanjski'}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked
                                className={classes.forChecks}
                                onChange={() => {
                                  includeType('unutrasnji')
                                }}
                              />
                            }
                            label={'Unutrasnji'}
                          />
                        </FormGroup>
                      </Box>
                      <Box>
                        <Typography sx={{ mt: 1 }}>Lokacija:</Typography>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={cities}
                          onChange={(event, city) => {
                            setInitialValues((prevState) => ({
                              ...prevState,
                              city
                            }))
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              margin="normal"
                              name="city"
                              id="city"
                              value={initialValues.city}
                              label="Grad"
                            />
                          )}
                        />
                      </Box>
                    </Box>
                    <Box className={classes.typeLocationPriceDateWrapper}>
                      <Box>
                        <Typography>Cijena:</Typography>
                        <Slider
                          defaultValue={100}
                          aria-label="Default"
                          className={classes.forSliders}
                          valueLabelDisplay="auto"
                          onChange={(event) => {
                            setInitialValues((prevState) => ({
                              ...prevState,
                              price: event.target.value
                            }))
                          }}
                        />
                        <Typography sx={{ mt: 2 }}>
                          Datum i vrijeme slobodnog termina:
                        </Typography>
                        <Box className={classes.dateAndTimeWrapper}>
                          <input
                            type="date"
                            className={classes.forDate}
                            min="2023-01-01"
                            max="2025-12-31"
                            onChange={(event) => {
                              setInitialValues((prevState) => ({
                                ...prevState,
                                date: event.target.value
                              }))
                            }}
                          />
                          <input
                            type="time"
                            className={classes.forDate}
                            onChange={(event) => {
                              setInitialValues((prevState) => ({
                                ...prevState,
                                time: event.target.value
                              }))
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
          <Box className={classes.cardsWrapper}>
            <Grid
              container
              spacing={{ xs: 2, md: 6 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              justifyContent="space-evenly"
              sx={{ alignItems: 'stretch' }}
            >
              {initialValues.cards.map((item) => (
                <Grid item xs={2} sm={4} md={4} key={item.id}>
                  <Card className={classes.card}>
                    <CardActionArea sx={{ objectFit: 'cover' }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.pictures}
                        alt={item.title}
                      />
                      <CardContent sx={{ flex: '1' }}>
                        <Typography
                          noWrap
                          gutterBottom
                          variant="h5"
                          component="div"
                        >
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
