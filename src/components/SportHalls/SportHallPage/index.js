import { useParams } from "react-router-dom"
import SwipeableViews from 'react-swipeable-views'
import Box from "@mui/material/Box"
import { Button } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import {
  InputBase, List,
  ListItem,
  ListItemText,
  MobileStepper,
  Modal, Tab, Tabs,
  ToggleButtonGroup
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import useStyles from './styles'
import withMainFrame from "../../../hoc/withMainFrame"
import ToggleButton from "@mui/material/ToggleButton"
import TextField from "@mui/material/TextField"
import { cities, emailRegex, phoneRegex } from "../../../constants/appDefaults"
import Autocomplete from "@mui/material/Autocomplete"
import SearchIcon from "@mui/icons-material/Search"
import Avatar from "@mui/material/Avatar"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Paper from "@mui/material/Paper"
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import axios from "axios";
import {
  GET_FRIENDS,
  GET_SPORT_HALL_RESERVATIONS,
  GET_SPORT_HALL_USER,
  GET_TEAMS, GET_USER, GET_USERS, INVITE_TEMPORARY_TEAM,
  LANDING_PAGE,
  REGISTRATION_PLAYER, REMOVE_INVITE_TEMPORARY_TEAM,
  RESERVATION,
  RESERVATION_PERMANENT_TEAM,
  RESERVATION_TEMPORARY_TEAM,
  RESERVATION_USER
} from "../../../constants/endpoints";
import Cookies from "js-cookie";
import { COOKIE_AUTHENTICATION_FE } from "../../../constants/keys/browser";

const daysOfWeek = ['PON', 'UTO', 'SRI', 'CET', 'PET', 'SUB', 'NED']

const timelines = Array.from({ length: 16 }, (_, index) => {
  const startHour = index + 7
  const endHour = startHour + 1
  const startTime = `${startHour.toString().padStart(2, '0')}:00`
  const endTime = `${endHour.toString().padStart(2, '0')}:00`
  return `${startTime} - ${endTime}`
})

const tabs = [
  { label: 'Sakupi raju', value: 'temporary'},
  { label: 'Rezerviši sa timom', value: 'permanent'},
  { label: 'Rezerviši', value: 'reservation'}
]


const detailsTabs = [
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Development', value: 'development' },
  { label: 'Completed', value: 'completed' },
]

const SportHallPage = () => {
  const [detailTab, setDetailTab] = useState(0)
  const [sportHall, setSportHall] = useState([])
  const [reservations, setReservations] = useState([])
  const [friends, setFriends] = useState([])
  const [activeStep, setActiveStep] = useState(0)
  const [selectedForm, setSelectedForm] = useState('reservation')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [reservationButtonClicked, setReservationButtonClicked] = useState(false)
  const [fromTime, setFromTime] = useState('')
  const [toTime, setToTime] = useState('')
  const [date, setDate] = useState('')
  const [team, setTeam] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [openDropdown, setOpenDropdown] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedFriends, setSelectedFriends] = useState([])
  const [areMembersInvited, setAreMembersInvited] = useState(false)
  const [availableFriends, setAvailableFriends] = useState(friends)
  const [user, setUser] = useState(null)
  const [teams, setTeams] = useState([])
  const [pictures, setPictures] = useState([])
  const [invitations, setInvitations] = useState([])
  const [gliderPosition, setGliderPosition] = useState(2)
  const [location, setLocation] = useState('')


  let maxSteps = 1
  const classes = useStyles()
  const theme = useTheme()
  const { id } = useParams()

  async function fetchSportHall() {
    try {
      const response = await axios.get(GET_SPORT_HALL_USER, { params: { id } })
      const sporthall = response.data.data
      setSportHall(sporthall)
      setPictures(JSON.parse(sporthall.pictures).pictures)
      setLocation(sporthall.city + ', ' + JSON.parse(sporthall.address).street + ' ' + JSON.parse(sporthall.address).streetNumber)
      maxSteps = pictures.length
    } catch (error) {
      console.error(error)
    }
  }
  async function fetchReservations() {
    try {
      const response = await axios.get(GET_SPORT_HALL_RESERVATIONS, { params: { id } })
      setReservations(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }
  async function fetchFriends() {
    try {
      const response = await axios.get(GET_FRIENDS, { params: { id: user.id }  })
      await setFriends(response.data.data)
      await setAvailableFriends(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }
  async function fetchTeams() {
    try {
      const response = await axios.get(GET_TEAMS, { params: { id: user.id } })
      setTeams(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }
  async function fetchUsers() {
    try {
      const response = await axios.get(GET_USERS, { params: { searchText }})
      setSuggestions(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchUser(invitationId) {
    try {
      const response = await axios.get(GET_USER, { params: { invitationId }})
      return response.data.data
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchSportHall()
    fetchReservations()
    const userData = Cookies.get(COOKIE_AUTHENTICATION_FE)
    const parsedUserData = userData && JSON.parse(userData)
    const isUserLogged = userData && !!parsedUserData.id
    if(isUserLogged){
      setUser(parsedUserData)
    }
  }, [])

  useEffect(() => {
    if(user){
      fetchFriends()
      fetchTeams()
    }
  }, [user])

  useEffect(() => {
    if (searchText.length > 0) {
      fetchUsers()
    } else {
      setSuggestions([])
    }
  }, [searchText])

  useEffect(() => {
    if(invitations.length > 0){
      localStorage.setItem('invitations-' + sportHall.id, JSON.stringify(invitations))
    }

  }, [invitations])

  const handleDetailsTabChange = (event, newValue) => {
    setDetailTab(newValue)
  }

  const handleTabChange = (tab, index) => {
    setSelectedForm(tab)
    setGliderPosition(index)
  }
  async function handleReservation() {
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date)
    const isValidTimeFormat = /^\d{2}:(00|30)$/.test(fromTime) && /^\d{2}:(00|30)$/.test(toTime)
    const fromTimeObj = new Date(`2000-01-01T${fromTime}`)
    const toTimeObj = new Date(`2000-01-01T${toTime}`)
    const isTimeValid = isValidTimeFormat && fromTimeObj < toTimeObj
    const isReservationAvailable = !reservations.some((reservation) => {
      const beginTime = new Date(`${reservation.date}T${reservation.time_from}`)
      const endTime = new Date(`${reservation.date}T${reservation.time_to}`)
      const chosenDate = new Date(date)
      const chosenFromTime = new Date(`${date}T${fromTime}`)
      const chosenToTime = new Date(`${date}T${toTime}`)

      return (
        chosenDate.toDateString() === beginTime.toDateString() &&
        ((chosenFromTime >= beginTime && chosenFromTime < endTime) ||
          (chosenToTime > beginTime && chosenToTime <= endTime) ||
          (chosenFromTime <= beginTime && chosenToTime >= endTime))
      )
    })
    if (isValidDate && isTimeValid && isReservationAvailable) {
      let userId = 0, teamId = 0, validInputs = true
      if(user){
        userId = user.id
        if(name !== user.name || surname !== user.surname || email !== user.email){
          validInputs = false
        }
      }
      if(team){
        teamId = team
      }

      const data = {
        name,
        surname,
        email,
        phone,
        date,
        fromTime,
        toTime,
        sportHallId: id,
        userId,
        teamId,
        type: selectedForm,
        teamMembers: selectedFriends
      }
      if(validInputs){
        const { status } = await axios.post(RESERVATION, data)
        if(status){
          await fetchReservations()
        }
      }
    }
  }

  function handleSuggestionClick(suggestion) {
    setSearchText('')
    setSelectedFriends((prevSelectedFriends) => [...prevSelectedFriends, suggestion])
    setOpenDropdown(false)
  }

  function handleAddFriend(friend){
    setSelectedFriends((prevSelectedFriends) => [...prevSelectedFriends, friend])
    setAvailableFriends((prevAvailableFriends) =>
        prevAvailableFriends.filter((availableFriend) => availableFriend.id !== friend.id)
    )
  }

  async function deleteInvite(invite_id){
    await axios.delete(REMOVE_INVITE_TEMPORARY_TEAM, { id: invite_id })
    localStorage.setItem('invitations-' + sportHall.id, JSON.stringify(invitations))
  }

  async function handleInviteUsers(){
    try {

      for (const friend of selectedFriends) {
        const data = {
          senderId: user.id,
          recipientId: friend.id,
          sportHallId: sportHall.id,
          sportHallTitle: sportHall.title
        }
        const response = await axios.post(INVITE_TEMPORARY_TEAM, data)
        if (response.data.status) {
          const newInvitation = response.data.data
          setInvitations((previousInvitations) => [...previousInvitations, newInvitation])
        }
      }
      handleModalClose()
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemoveFriend = (person) => {
    setInvitations((previousInvitations) =>
      previousInvitations.filter((invite) => invite.fields.recipient !== person.id)
    )
    const invitation = invitations.find((invite) => invite.fields.recipient === person.id)
    if (invitation) {
      deleteInvite(invitation.fields.id)
    }
    setSelectedFriends((prevSelectedFriends) =>
      prevSelectedFriends.filter((selectedFriend) => selectedFriend.id !== person.id)
    )

    if(friends.some((friend) => friend.id === person.id)){
      setAvailableFriends((prevAvailableFriends) => [...prevAvailableFriends, person])
    }
  }


  const handleNext = () => {
    if (activeStep !== pictures.length - 1){
      setActiveStep((previousActiveStep) => previousActiveStep + 1)
    }
  }

  const handleBack = () => {
    if (activeStep !== 0){
      setActiveStep((previousActiveStep) => previousActiveStep - 1)
    }
  }

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  const handleSelectedOption = (event, newValue) => {
    if (selectedForm !== newValue) {
      setSelectedForm(newValue)
    }
  }

  function getWeekday(index) {
    const today = new Date()
    const weekdayIndex = (today.getDay() + index - 1) % 7
    return daysOfWeek[weekdayIndex]
  }

  function getDate(index) {
    const today = new Date()
    const selectedDate = new Date(today.setDate(today.getDate() + index))
    return selectedDate.toLocaleDateString()
  }

  function isTimeSlotAppointed(index, time) {
    const currentDate = new Date()
    const selectedDate = new Date()
    selectedDate.setDate(currentDate.getDate() + index)
    let partOne = ''
    let partTwo = ''
    if(time.startsWith('-')){
      partOne = (parseInt(time.slice(1).slice(0, -3)) - 1) + ':30'
      partTwo = time.slice(1)
    }else {
      partOne = time
      partTwo = time.slice(0, -3) + ':30'
    }

    const formattedDate = selectedDate.toISOString().split('T')[0]
    const isAppointed = reservations.some((reservation) => {
      const reservationDate = reservation.date
      const reservationTime = reservation.time_from
      const reservationTimeEnd = reservation.time_to
      const startTime = new Date(`${reservationDate}T${reservationTime}`)
      const endTime = new Date(`${reservationDate}T${reservationTimeEnd}`)
      const checkTime1 = new Date(`${formattedDate}T${partOne + ':00'}`)
      const checkTime2 = new Date(`${formattedDate}T${partTwo + ':00'}`)
      return (
        reservationDate === formattedDate &&
        checkTime1 >= startTime && checkTime2 <= endTime
      )
    })
    return isAppointed
  }

  function handleModalOpen() {
    setOpenModal(true)
  }

  function handleModalClose(){
    setOpenModal(false)
  }

  //<p className={classes.subtextHeadline}>{sportHall.description}</p>
  return withMainFrame(
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '30px', marginBottom: '5rem' }}>
        <Box sx={{ width: '50%', height: '60vh', display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
          <Box className={classes.headlineWrapper}>
            <h2 className={classes.headline}>{sportHall.title}</h2>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={detailTab}
                onChange={handleDetailsTabChange}
                TabIndicatorProps={{ style: { backgroundColor: '#43bbbf' } }}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab
                  label={'Detalji'}
                  value={0}
                  style={{color: detailTab === 0 ? 'black' : ''}}
                />
                <Tab
                  label={'Recenzije'}
                  value={1}
                  style={{color: detailTab === 1 ? 'black' : '' }}
                />
                <Tab
                  label={'Ocjene'}
                  value={2}
                  style={{color: detailTab === 2 ? 'black' : '' }}
                />
              </Tabs>
            </Box>
            <Box>
              {detailTab === 0 ? (
                  <Box className={classes.subtextHeadline}>
                    <p><span style={{ borderBottom: '2px solid grey'}}>Opis</span></p>
                    <p>{sportHall.description}</p>
                    {sportHall.capacity ? (
                        <p><span style={{ borderBottom: '2px solid grey'}}>Kapacitet</span>: {sportHall.capacity}</p>
                    ): null}
                    <p><span style={{ borderBottom: '2px solid grey'}}>Lokacija</span></p>
                    <p>{location}</p>
                  </Box>
              ) : detailTab === 1 ? (
                <p>neke recenzije</p>
              ) : (
                <p>neke ocjene</p>
              )}
            </Box>
          </Box>
          {detailTab === 0 ? (
            <Box className={classes.priceBox}>{sportHall.price}KM/h</Box>
          ) : null}
        </Box>
        <Box sx={{ width: '50%' }}>
          <MobileStepper
            steps={pictures ? pictures.length : maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{
              justifyContent: 'center',
              position: 'absolute',
              top: '58%',
              left: '75%',
              right: '25%',
              zIndex: '1',
              backgroundColor: 'transparent',
              '& .MuiMobileStepper-dot': {
                width: 12,
                height: 12,
              },
              '& .MuiMobileStepper-dotActive': {
                backgroundColor: '#43bbbf',
              },
            }}
          />
          <KeyboardArrowRight
            onClick={handleNext}
            className={classes.rightArrowImage}
          />
          <KeyboardArrowLeft
            onClick={handleBack}
            className={classes.leftArrowImage}
          />
          <SwipeableViews
            axis={'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            sx={{width: '100%'}}
          >
            {pictures.map((step, index) => (
              <div key={step}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      display: 'block',
                      overflow: 'hidden',
                      width: '100%',
                      height: '60vh'
                    }}
                    src={step}
                    alt={sportHall.title}
                  />

                ) : null}
              </div>
            ))}
          </SwipeableViews>
        </Box>
      </Box>
        <Box className={classes.containerForTabs}>
          <Box className={classes.tabs}>
            <Box
              className={classes.glider}
              style={{ transform: `translateX(${gliderPosition * 200}px)` }}
            ></Box>
            {tabs.map((tab, index) => (
              <Box
                className={classes.tab}
                key={tab.value}
                onClick={() => handleTabChange(tab.value, index)}
                sx={{ color: selectedForm === tab.value ? 'white' : ''}}
              >
                {tab.label}
              </Box>
            ))}
          </Box>
        </Box>
      {selectedForm === 'temporary' ? (
        <>
          <Box className={classes.formWrapper} sx={{ alignItems: 'inherit'}}>
            <Box >
              <Box className={classes.reservationFormTemporary}>
                <Typography component="h1" variant="h5" className={classes.reservationFormHeadline}>
                  Pojedinosti rezervacije
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <TextField
                    margin="normal"
                    required
                    id="name"
                    label="Ime"
                    name="name"
                    value={name}
                    error={(name === '' || name.length <= 2) && reservationButtonClicked}
                    onChange={(event) => {
                      setName(event.target.value)
                    }}
                    sx={{ width: '47%' }}
                  />
                  <TextField
                    margin="normal"
                    required
                    id="surname"
                    label="Prezime"
                    name="surname"
                    value={surname}
                    error={surname === '' && reservationButtonClicked}
                    onChange={(event) => {
                      setSurname(event.target.value)
                    }}
                    sx={{ width: '47%' }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{width:'47%'}} className={classes.dateTimeWrapper}>
                    <label style={{fontFamily: 'sans-serif'}}>Od: </label>
                    <input
                      value={fromTime}
                      style={{width: '70%'}}
                      type="time"
                      className={classes.forDate}
                      onChange={(event) => {
                        setFromTime(event.target.value)
                      }}
                    />
                  </Box>
                  <Box sx={{width:'47%'}} className={classes.dateTimeWrapper}>
                    <label style={{fontFamily: 'sans-serif'}}>Do:</label>
                    <input
                      value={toTime}
                      style={{width: '70%'}}
                      type="time"
                      className={classes.forDate}
                      onChange={(event) => {
                        setToTime(event.target.value)
                      }}
                    />
                  </Box>
                </Box>
                <Box className={classes.dateTimeWrapper}>
                <input
                  style={{width: '100%'}}
                  type="date"
                  className={classes.forDate}
                  min="2023-01-01"
                  max="2025-12-31"
                  onChange={(event) => {
                    setDate(event.target.value)
                  }}
                />
              </Box>
                <TextField
                  margin="normal"
                  required
                  id="email"
                  label="Email adresa"
                  name="email"
                  autoComplete="off"
                  fullWidth
                  value={email}
                  error={!emailRegex.test(email) && reservationButtonClicked}
                  onChange={(event) => {
                    setEmail(event.target.value)
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  id="phone"
                  label="Kontakt telefon"
                  name="phone"
                  fullWidth
                  value={phone}
                  error={!phoneRegex.test(phone) && reservationButtonClicked}
                  autoComplete="off"
                  onChange={(event) => {
                    setPhone(event.target.value)
                  }}
                />
              </Box>
            </Box>
            <Box className={classes.reservationForm} sx={{width: '25vw'}}>
              <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                  <Box className={classes.modal}>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '90%'}}>
                      <Box sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
                        <Box className={classes.friendsHeadline}>PRIJATELJI</Box>
                        <Box className={classes.teamMembersWrapperModal} sx={{overflow: 'auto' }}>
                          {availableFriends.map((friend) => (
                            <Box className={classes.teamMember} key={friend.id}>
                              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                {friend.picture ? (
                                  <Avatar src={friend.picture}></Avatar>
                                ) : (
                                  <Avatar src="/images/defaultUserImage.jpg"/>

                                )}
                                <Typography sx={{ ml: 1}}>{friend.username}</Typography>
                              </Box>

                              <AddCircleIcon
                                sx={{ color: '#43bbbf' }}
                                onClick={() => {
                                  handleAddFriend(friend)
                                }}/>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                      <Box sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ height: '3rem', color: 'white', backgroundColor: '#43bbbf'}}>
                          <Box className={classes.search}>
                            <Box className={classes.searchIconWrapper}>
                              <SearchIcon />
                            </Box>
                            <InputBase
                              className={classes.searchField}
                              placeholder="Traži..."
                              value={searchText}
                              sx={{ outline: 'none', border: 'none' }}
                              onChange={(event) => {
                                setSearchText(event.target.value)
                              }}
                              onFocus={(event) => {
                                setAnchorEl(event.currentTarget)
                                setOpenDropdown(true)
                              }}
                              onBlur={() => {
                                setTimeout(() => {
                                  setAnchorEl(null)
                                  setOpenDropdown(false)
                                }, 200)
                              }}
                            />

                          </Box>
                          {openDropdown && suggestions.length !== 0 ? (
                            <Paper>
                              <List sx={{ backgroundColor: 'white', zIndex: '10' }}>
                                {suggestions.map((suggestion) => (
                                  <ListItem
                                    key={suggestion.id}
                                    button
                                    onClick={() => {
                                      handleSuggestionClick(suggestion)
                                    }}>
                                    {suggestion.picture ? (
                                      <Avatar src={suggestion.picture}></Avatar>
                                    ) : (
                                      <Avatar src="/images/defaultUserImage.jpg"/>
                                    )}
                                    <ListItemText primary={suggestion.username} sx={{ ml: 1 }}/>
                                  </ListItem>
                                ))}
                              </List>
                            </Paper>
                          ) : null}
                        </Box>
                        <Box className={classes.teamMembersWrapperModal} sx={{ overflow: 'auto' }}>
                          {selectedFriends.map((friend) => (
                            <Box className={classes.teamMember} key={friend.id}>
                              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                {friend.picture ? (
                                  <Avatar src={friend.picture}></Avatar>
                                ) : (
                                  <Avatar src="/images/defaultUserImage.jpg"/>
                                )}
                                <Typography sx={{ ml: 1}}>{friend.username}</Typography>
                              </Box>

                              <HighlightOffIcon
                                sx={{ color: '#43bbbf' }}
                                onClick={() => {
                                  handleRemoveFriend(friend)
                                }}/>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                    <Box className={classes.modalFooter}>
                      <Button onClick={handleModalClose}>
                        Zatvori
                      </Button>
                      <Button onClick={() => {
                        setAreMembersInvited(true)
                        handleInviteUsers()
                      }}>
                        Pozovi
                      </Button>
                    </Box>
                  </Box>
              </Modal>
              <Typography component="h1" variant="h5" className={classes.reservationFormHeadline}>
                Sakupi raju
              </Typography>
              <Button onClick={handleModalOpen} className={classes.inviteButton}>
                Pozovi prijatelje u tim
              </Button>
              {areMembersInvited ? (
                <Box className={classes.teamMembersWrapper} sx={{ overflow: 'auto' }}>
                  {selectedFriends.map((friend) => (
                    <Box className={classes.teamMember} key={friend.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center'}}>
                        {friend.picture ? (
                          <Avatar src={friend.picture}></Avatar>
                        ) : (
                          <Avatar src="/images/defaultUserImage.jpg"/>
                        )}
                        <Typography sx={{ ml: 1}}>{friend.username}</Typography>
                      </Box>

                      <HighlightOffIcon
                        sx={{ color: '#43bbbf' }}
                        onClick={() => {
                          handleRemoveFriend(friend)
                        }}/>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box className={classes.teamMembersWrapper}></Box>
              )}

              <Button
                className={classes.customButton}
                type="button"
                fullWidth
                variant="contained"
                onClick={handleReservation}
              >
                Rezervisi
              </Button>
            </Box>
          </Box>
        </>
      ) : (<></>)}
      <Box className={classes.formWrapper}>
        <Box>
          <Box className={classes.calendar}>
            <Box className={classes.calendarHeader}>
              <h1>Raspored slobodnih termina</h1>
            </Box>
            <Box className={classes.calendarWrapper}>
              <Box className={classes.calendarWeekdays}>
                {daysOfWeek.map((day, index) => (
                  <Box key={index}>
                    <Box>{getWeekday(index)}</Box>
                    <Box sx={{ color: 'slategrey', fontSize: 'small', fontWeight: '600'}}>{getDate(index).replace(/\//g, ".")}</Box>
                  </Box>
                ))}
              </Box>
              <Box className={classes.calendarContent}>
                {timelines.flatMap((time) =>
                  Array.from({ length: 7 }, (_, index) => {
                    const isAppointedPart1 = isTimeSlotAppointed(index, time.split(' - ')[0])
                    const isAppointedPart2 = isTimeSlotAppointed(index, '-' + time.split(' - ')[1])

                    return (
                      <Box key={`${time}-${index}`}>
                        <Box
                          className={classes.partTime}
                          sx={{
                            backgroundColor: isAppointedPart1 ? '#ff8a8a !important' : 'white',
                            color: isAppointedPart1 ? 'white !important' : '',
                            whiteSpace: 'pre',
                          }}
                        >
                          {' ' + time.split('-')[0]}
                        </Box>
                        <Box
                          className={classes.partTime}
                          sx={{
                            backgroundColor: isAppointedPart2 ? '#ff8a8a !important' : 'white',
                            color: isAppointedPart2 ? 'white !important' : '',
                            whiteSpace: 'pre',
                          }}
                        >
                          - {time.split('-')[1]}
                        </Box>
                      </Box>
                    )
                  })
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        {selectedForm === 'reservation' ? (
          <>
            <Box className={classes.reservationForm}>
              <Typography component="h1" variant="h5" className={classes.reservationFormHeadline}>
                Rezerviši ovdje
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <TextField
                  margin="normal"
                  required
                  id="name"
                  label="Ime"
                  name="name"
                  value={name}
                  error={(name === '' || name.length <= 2) && reservationButtonClicked}
                  onChange={(event) => {
                    setName(event.target.value)
                  }}
                  sx={{ width: '47%' }}
                />
                <TextField
                  margin="normal"
                  required
                  id="surname"
                  label="Prezime"
                  name="surname"
                  value={surname}
                  error={surname === '' && reservationButtonClicked}
                  onChange={(event) => {
                    setSurname(event.target.value)
                  }}
                  sx={{ width: '47%' }}
                />
              </Box>
                <TextField
                  margin="normal"
                  required
                  id="email"
                  label="Email adresa"
                  name="email"
                  autoComplete="off"
                  fullWidth
                  value={email}
                  error={!emailRegex.test(email) && reservationButtonClicked}
                  onChange={(event) => {
                    setEmail(event.target.value)
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  id="phone"
                  label="Kontakt telefon"
                  name="phone"
                  fullWidth
                  value={phone}
                  error={!phoneRegex.test(phone) && reservationButtonClicked}
                  autoComplete="off"
                  onChange={(event) => {
                    setPhone(event.target.value)
                  }}
                />
              <Box className={classes.dateTimeWrapper}>
              <input
                style={{width: '100%'}}
                type="date"
                className={classes.forDate}
                min="2023-01-01"
                max="2025-12-31"
                onChange={(event) => {
                  setDate(event.target.value)
                }}
              />
            </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{width:'47%'}} className={classes.dateTimeWrapper}>
                  <label style={{fontFamily: 'sans-serif'}}>Od: </label>
                  <input
                    value={fromTime}
                    style={{width: '60%'}}
                    type="time"
                    className={classes.forDate}
                    onChange={(event) => {
                      setFromTime(event.target.value)
                    }}
                  />
                </Box>
                <Box sx={{width:'47%'}} className={classes.dateTimeWrapper}>
                  <label style={{fontFamily: 'sans-serif'}}>Do:</label>
                  <input
                    value={toTime}
                    style={{width: '60%'}}
                    type="time"
                    className={classes.forDate}
                    onChange={(event) => {
                      setToTime(event.target.value)
                    }}
                  />
                </Box>
              </Box>
              <Button
                className={classes.customButton}
                type="button"
                fullWidth
                variant="contained"
                onClick={handleReservation}
              >
                Rezervisi
              </Button>
            </Box>
          </>
        ) : selectedForm === 'permanent' ? (
          <>
            <Box className={classes.reservationForm}>
              <Typography component="h1" variant="h5" className={classes.reservationFormHeadline}>
                Rezerviši ovdje
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <TextField
                  margin="normal"
                  required
                  id="name"
                  label="Ime"
                  name="name"
                  value={name}
                  error={(name === '' || name.length <= 2) && reservationButtonClicked}
                  onChange={(event) => {
                    setName(event.target.value)
                  }}
                  sx={{ width: '47%' }}
                />
                <TextField
                  margin="normal"
                  required
                  id="surname"
                  label="Prezime"
                  name="surname"
                  value={surname}
                  error={surname === '' && reservationButtonClicked}
                  onChange={(event) => {
                    setSurname(event.target.value)
                  }}
                  sx={{ width: '47%' }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <TextField
                  margin="normal"
                  required
                  id="email"
                  label="Email adresa"
                  name="email"
                  autoComplete="off"
                  fullWidth
                  value={email}
                  error={!emailRegex.test(email) && reservationButtonClicked}
                  onChange={(event) => {
                    setEmail(event.target.value)
                  }}
                  sx={{ width: '47%'}}
                />
                <TextField
                  margin="normal"
                  required
                  id="phone"
                  label="Kontakt telefon"
                  name="phone"
                  fullWidth
                  value={phone}
                  error={!phoneRegex.test(phone) && reservationButtonClicked}
                  autoComplete="off"
                  onChange={(event) => {
                    setPhone(event.target.value)
                  }}
                  sx={{ width: '47%'}}
                />
              </Box>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={teams}
                onChange={(event, team) => {
                  setTeam(team)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    required
                    name="team"
                    id="team"
                    value={team}
                    label="Naziv tima"
                    sx={{ textAlign: 'center'}}
                  />
                )}
              />
              <Box className={classes.dateTimeWrapper}>
                <input
                  style={{width: '100%'}}
                  type="date"
                  className={classes.forDate}
                  min="2023-01-01"
                  max="2025-12-31"
                  onChange={(event) => {
                    setDate(event.target.value)
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{width:'47%'}} className={classes.dateTimeWrapper}>
                  <label style={{fontFamily: 'sans-serif'}}>Od: </label>
                  <input
                    value={fromTime}
                    style={{width: '60%'}}
                    type="time"
                    className={classes.forDate}
                    onChange={(event) => {
                      setFromTime(event.target.value)
                    }}
                  />
                </Box>
                <Box sx={{width:'47%'}} className={classes.dateTimeWrapper}>
                  <label style={{fontFamily: 'sans-serif'}}>Do:</label>
                  <input
                    value={toTime}
                    style={{width: '60%'}}
                    type="time"
                    className={classes.forDate}
                    onChange={(event) => {
                      setToTime(event.target.value)
                    }}
                  />
                </Box>
              </Box>
              <Button
                className={classes.customButton}
                type="button"
                fullWidth
                variant="contained"
                onClick={handleReservation}
              >
                Rezervisi
              </Button>
            </Box>
          </>
        ) : null}
      </Box>
    </>
  )
}

export default SportHallPage
