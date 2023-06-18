import { Button } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import SearchIcon from '@mui/icons-material/Search'
import {
  Alert,
  Chip,
  InputBase,
  List,
  ListItem,
  ListItemText,
  MobileStepper,
  Modal,
  Snackbar,
  Tab,
  Tabs,
} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { emailRegex, phoneRegex } from 'src/constants/appDefaults'
import {
  GET_FRIENDS,
  GET_INVITED_USERS,
  GET_PERMANENT_TEAMS,
  GET_SPORT_HALL_RESERVATIONS,
  GET_SPORT_HALL_USER,
  GET_USERS,
  INVITE_TEMPORARY_TEAM,
  REMOVE_INVITE_TEMPORARY_TEAM,
  RESERVATION,
} from 'src/constants/endpoints'
import { COOKIE_AUTHENTICATION_FE } from 'src/constants/keys/browser'
import withMainFrame from 'src/hoc/withMainFrame'

import useStyles from './styles'

const daysOfWeek = ['PON', 'UTO', 'SRI', 'CET', 'PET', 'SUB', 'NED']

const tabs = [
  { label: 'Sakupi raju', value: 'temporary' },
  { label: 'Rezerviši sa timom', value: 'permanent' },
  { label: 'Rezerviši', value: 'reservation' },
]

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
    fontFamily: 'sans-serif',
  },
}))

const SportHallPage = () => {
  const [initialValues, setInitialValues] = useState({
    sportHall: [],
    reservations: [],
    friends: [],
    searchText: '',
    suggestions: [],
    selectedFriends: [],
    availableFriends: [],
    user: null,
    teams: [],
    teamNames: [],
    pictures: [],
    invitations: [],
    location: '',
    areMembersInvited: false,
  })
  const [pageStates, setPageStates] = useState({
    detailTab: 0,
    activeStep: 0,
    windowWidth: window.innerWidth,
    showSnackbar: false,
    gliderPosition: 2,
    openDropdown: false,
    openModal: false,
    reservationButtonClicked: false,
    selectedForm: 'reservation',
  })
  const [reservationInfo, setReservationInfo] = useState({
    name: '',
    surname: '',
    phone: '',
    team: '',
    email: '',
    date: '',
    fromTime: '',
    toTime: '',
  })
  let maxSteps = 1
  const classes = useStyles()
  const { id } = useParams()
  let minDate = new Date()
  minDate.setDate(minDate.getDate() - 1)
  let maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)

  async function fetchSportHall() {
    try {
      const response = await axios.get(GET_SPORT_HALL_USER, { params: { id } })
      const sporthall = response.data.data
      setInitialValues((prevState) => ({
        ...prevState,
        sportHall: sporthall,
        pictures: JSON.parse(sporthall.pictures).pictures,
        location:
          sporthall.city +
          ', ' +
          JSON.parse(sporthall.address).street +
          ' ' +
          JSON.parse(sporthall.address).streetNumber,
      }))
      maxSteps = initialValues.pictures.length
    } catch (error) {
      console.error(error)
    }
  }
  async function fetchReservations() {
    try {
      const response = await axios.get(GET_SPORT_HALL_RESERVATIONS, {
        params: { id },
      })
      setInitialValues((prevState) => ({
        ...prevState,
        reservations: response.data.data,
      }))
    } catch (error) {
      console.error(error)
    }
  }
  async function fetchFriends() {
    try {
      const user_id = initialValues.user.id
      const response = await axios.get(GET_FRIENDS, { params: { id: user_id } })
      await setInitialValues((prevState) => ({
        ...prevState,
        friends: response.data.data,
        availableFriends: response.data.data,
      }))
    } catch (error) {
      console.error(error)
    }
  }
  async function fetchTeams() {
    try {
      const user_id = initialValues.user.id
      const response = await axios.get(GET_PERMANENT_TEAMS, {
        params: { id: user_id },
      })
      setInitialValues((prevState) => ({
        ...prevState,
        teams: response.data.data,
        teamNames: response.data.data.map((temp) => temp.team_name),
      }))
    } catch (error) {
      console.error(error)
    }
  }
  async function fetchUsers() {
    try {
      const searchText = initialValues.searchText
      const response = await axios.get(GET_USERS, { params: { searchText } })
      setInitialValues((prevState) => ({
        ...prevState,
        suggestions: response.data.data,
      }))
    } catch (error) {
      console.error(error)
    }
  }
  async function fetchInvitedUsers(recipientsIds) {
    try {
      const response = await axios.get(GET_INVITED_USERS, {
        params: { recipientsIds },
      })
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
    if (isUserLogged) {
      setInitialValues((prevState) => ({
        ...prevState,
        user: parsedUserData,
      }))
    }
    const handleResize = () => {
      setPageStates((prevState) => ({
        ...prevState,
        windowWidth: window.innerWidth,
      }))
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (initialValues.user) {
      fetchFriends()
      fetchTeams()
    }
  }, [initialValues.user])

  useEffect(() => {
    checkExistingInvitations()
  }, [initialValues.sportHall])

  useEffect(() => {
    if (initialValues.searchText.length > 0) {
      fetchUsers()
    } else {
      setInitialValues((prevState) => ({
        ...prevState,
        suggestions: [],
      }))
    }
  }, [initialValues.searchText])

  useEffect(() => {
    if (initialValues.invitations.length > 0) {
      localStorage.setItem(
        'invitations-' + initialValues.sportHall.id,
        JSON.stringify(initialValues.invitations)
      )
    }
  }, [initialValues.invitations])

  function checkExistingInvitations() {
    let existingInvitations = localStorage.getItem(
      'invitations-' + initialValues.sportHall.id
    )
    if (existingInvitations) {
      existingInvitations = JSON.parse(existingInvitations)
      if (existingInvitations.length > 0) {
        setInitialValues((prevState) => ({
          ...prevState,
          invitations: existingInvitations,
        }))
        let recipientIds = []
        for (const invitation of existingInvitations) {
          recipientIds.push(invitation.fields.recipient)
        }
        const recipientIdsString = recipientIds.join(',')
        fetchInvitedUsers(recipientIdsString)
          .then((recipients) => {
            setInitialValues((prevState) => ({
              ...prevState,
              selectedFriends: recipients,
              areMembersInvited: true,
            }))
          })
          .catch((error) => {
            console.error(error)
          })
        for (const invitation of existingInvitations) {
          setInitialValues((prevState) => ({
            ...prevState,
            availableFriends: prevState.availableFriends.filter(
              (availableFriend) =>
                availableFriend.id !== invitation.fields.recipient
            ),
          }))
        }
      }
    }
  }

  const handleDetailsTabChange = (event, newValue) => {
    setPageStates((prevState) => ({
      ...prevState,
      detailTab: newValue,
    }))
  }

  const handleTabChange = (tab, index) => {
    if (initialValues.user) {
      setPageStates((prevState) => ({
        ...prevState,
        selectedForm: tab,
        gliderPosition: index,
        reservationButtonClicked: false,
      }))
    }
  }
  async function handleReservation() {
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(reservationInfo.date)
    const isValidTimeFormat =
      /^\d{2}:\d*[05]$/.test(reservationInfo.fromTime) &&
      /^\d{2}:\d*[05]$/.test(reservationInfo.toTime)
    const fromTimeObj = new Date(`2000-01-01T${reservationInfo.fromTime}`)
    const toTimeObj = new Date(`2000-01-01T${reservationInfo.toTime}`)
    const isTimeValid = isValidTimeFormat && fromTimeObj < toTimeObj
    const isReservationAvailable = !initialValues.reservations.some(
      (reservation) => {
        const beginTime = new Date(
          `${reservation.date}T${reservation.time_from}`
        )
        const endTime = new Date(`${reservation.date}T${reservation.time_to}`)
        const chosenDate = new Date(reservationInfo.date)
        const chosenFromTime = new Date(
          `${reservationInfo.date}T${reservationInfo.fromTime}`
        )
        const chosenToTime = new Date(
          `${reservationInfo.date}T${reservationInfo.toTime}`
        )

        return (
          chosenDate.toDateString() === beginTime.toDateString() &&
          chosenFromTime >= beginTime &&
          chosenFromTime < endTime &&
          chosenToTime > beginTime &&
          chosenToTime <= endTime
        )
      }
    )
    if (isValidDate && isTimeValid && isReservationAvailable) {
      let userId = 0,
        teamId = 0,
        validInputs = true
      let user = initialValues.user
      if (user) {
        userId = user.id
        if (
          reservationInfo.name !== user.name ||
          reservationInfo.surname !== user.surname ||
          reservationInfo.email !== user.email
        ) {
          validInputs = false
        }
      }
      if (reservationInfo.team) {
        const selectedTeam = initialValues.teams.find(
          (temp) => reservationInfo.team === temp.team_name
        )
        if (selectedTeam) {
          teamId = selectedTeam.team_id_id
        }
      }
      const data = {
        name: reservationInfo.name,
        surname: reservationInfo.surname,
        email: reservationInfo.email,
        phone: reservationInfo.phone,
        date: reservationInfo.date,
        fromTime: reservationInfo.fromTime,
        toTime: reservationInfo.toTime,
        sportHallId: id,
        userId,
        teamId,
        type: pageStates.selectedForm,
        teamMembers: initialValues.selectedFriends,
      }
      if (validInputs) {
        const { status } = await axios.post(RESERVATION, data)
        if (status) {
          await fetchReservations()
          await resetFields()
          await setPageStates((prevState) => ({
            ...prevState,
            showSnackbar: true,
            reservationButtonClicked: false,
          }))
        }
      } else {
        setPageStates((prevState) => ({
          ...prevState,
          reservationButtonClicked: true,
        }))
      }
    } else {
      setPageStates((prevState) => ({
        ...prevState,
        reservationButtonClicked: true,
      }))
    }
  }

  function resetFields() {
    setReservationInfo((prevState) => ({
      ...prevState,
      name: '',
      surname: '',
      toTime: '',
      fromTime: '',
      date: '',
      phone: '',
      email: '',
      team: '',
    }))
    setInitialValues((prevState) => ({
      ...prevState,
      selectedFriends: [],
      invitations: [],
      areMembersInvited: false,
      availableFriends: prevState.friends,
    }))
  }

  function handleSuggestionClick(suggestion) {
    setInitialValues((prevState) => ({
      ...prevState,
      searchText: '',
      selectedFriends: [...prevState.selectedFriends, suggestion],
      availableFriends: prevState.availableFriends.filter(
        (friend) => friend.id !== suggestion.id
      ),
    }))
    setPageStates((prevState) => ({
      ...prevState,
      openDropdown: false,
    }))
  }

  function handleAddFriend(friend) {
    setInitialValues((prevState) => ({
      ...prevState,
      selectedFriends: [...prevState.selectedFriends, friend],
      availableFriends: prevState.availableFriends.filter(
        (availableFriend) => availableFriend.id !== friend.id
      ),
    }))
  }

  async function deleteInvite(invite_id) {
    await axios.delete(REMOVE_INVITE_TEMPORARY_TEAM, {
      data: { id: invite_id },
    })
    localStorage.setItem(
      'invitations-' + initialValues.sportHall.id,
      JSON.stringify(
        initialValues.invitations.filter(
          (invitation) => invitation.fields.id !== invite_id
        )
      )
    )
    if (initialValues.selectedFriends.length === 0) {
      setInitialValues((prevState) => ({
        ...prevState,
        areMembersInvited: false,
      }))
    }
  }

  async function handleInviteUsers() {
    try {
      for (const friend of initialValues.selectedFriends) {
        const data = {
          senderId: initialValues.user.id,
          recipientId: friend.id,
          sportHallId: initialValues.sportHall.id,
          sportHallTitle: initialValues.sportHall.title,
        }
        const response = await axios.post(INVITE_TEMPORARY_TEAM, data)
        if (response.data.status) {
          const newInvitation = response.data.data
          setInitialValues((prevState) => ({
            ...prevState,
            invitations: [...prevState.invitations, newInvitation],
          }))
        }
      }
      handleModalClose()
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemoveFriend = (person) => {
    const invitation = initialValues.invitations.find(
      (invite) => invite.fields.recipient === person.id
    )
    if (invitation) {
      deleteInvite(invitation.fields.id)
    }
    setInitialValues((prevState) => ({
      ...prevState,
      invitations: prevState.invitations.filter(
        (invite) => invite.fields.recipient !== person.id
      ),
      selectedFriends: prevState.selectedFriends.filter(
        (selectedFriend) => selectedFriend.id !== person.id
      ),
    }))
    if (initialValues.friends.some((friend) => friend.id === person.id)) {
      setInitialValues((prevState) => ({
        ...prevState,
        availableFriends: [...prevState.availableFriends, person],
      }))
    }
  }

  const handleNext = () => {
    if (pageStates.activeStep !== initialValues.pictures.length - 1) {
      setPageStates((prevState) => ({
        ...prevState,
        activeStep: prevState.activeStep + 1,
      }))
    }
  }

  const handleBack = () => {
    if (pageStates.activeStep !== 0) {
      setPageStates((prevState) => ({
        ...prevState,
        activeStep: prevState.activeStep - 1,
      }))
    }
  }

  const handleStepChange = (step) => {
    setPageStates((prevState) => ({
      ...prevState,
      activeStep: step,
    }))
  }

  function getWeekday(index) {
    const today = new Date()
    let weekdayIndex = (today.getDay() + index - 1) % 7
    if (weekdayIndex === -1) weekdayIndex = 6
    return daysOfWeek[weekdayIndex]
  }

  function getDate(index) {
    const today = new Date()
    const selectedDate = new Date(today.setDate(today.getDate() + index))
    return selectedDate.toLocaleDateString()
  }

  function getDateForReservation(index) {
    const today = new Date()
    const selectedDate = new Date(today.setDate(today.getDate() + index))
    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  function getRangeDates(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  function getReservation(reservation) {
    const start = reservation.time_from.split(':')
    const end = reservation.time_to.split(':')
    const startHour = Number(start[0])
    const startMinute = Number(start[1])
    const endHour = Number(end[0])
    const endMinute = Number(end[1])

    const totalMinutes =
      endHour * 60 + endMinute - (startHour * 60 + startMinute)
    const hourRowsHeight = 26
    const weekdayRowHeight = 40
    const height = (totalMinutes / 60) * hourRowsHeight
    const top =
      (startHour - 7) * hourRowsHeight +
      startMinute * (hourRowsHeight / 60) +
      weekdayRowHeight

    return (
      <Box
        key={reservation.id}
        className={classes.appointment}
        sx={{
          top: `${top}px`,
          height: `${height}px`,
        }}
      >
        {start[0]}:{start[1]} - {end[0]}:{end[1]}
      </Box>
    )
  }

  function handleModalOpen() {
    setPageStates((prevState) => ({
      ...prevState,
      openModal: true,
    }))
  }

  function handleModalClose() {
    setPageStates((prevState) => ({
      ...prevState,
      openModal: false,
    }))
  }

  return withMainFrame(
    <>
      <Box className={classes.snackbar}>
        <Snackbar
          open={pageStates.showSnackbar}
          autoHideDuration={3000}
          onClose={() => {
            setPageStates((prevState) => ({
              ...prevState,
              showSnackbar: false,
            }))
          }}
          className={classes.customSnackbar}
        >
          <Alert
            onClose={() => {
              setPageStates((prevState) => ({
                ...prevState,
                showSnackbar: false,
              }))
            }}
            severity="success"
            sx={{ width: '100%' }}
          >
            Uspješno ste rezervisali termin!
          </Alert>
        </Snackbar>
      </Box>
      <Box className={classes.firstPartOfPageWrapper}>
        <Box className={classes.headlineAndDetailsWrapper}>
          <Box className={classes.headlineWrapper}>
            <h2 className={classes.headline}>
              {initialValues.sportHall.title}
            </h2>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={pageStates.detailTab}
                onChange={handleDetailsTabChange}
                TabIndicatorProps={{ style: { backgroundColor: '#43bbbf' } }}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab
                  label={'Detalji'}
                  value={0}
                  style={{ color: pageStates.detailTab === 0 ? 'black' : '' }}
                />
                <Tab
                  label={'Recenzije'}
                  value={1}
                  style={{ color: pageStates.detailTab === 1 ? 'black' : '' }}
                />
                <Tab
                  label={'Ocjene'}
                  value={2}
                  style={{ color: pageStates.detailTab === 2 ? 'black' : '' }}
                />
              </Tabs>
            </Box>
            <Box>
              {pageStates.detailTab === 0 ? (
                <Box className={classes.subtextHeadline}>
                  <p>{initialValues.sportHall.description}</p>
                  {initialValues.sportHall.capacity ? (
                    <p>
                      <span>Kapacitet</span>: {initialValues.sportHall.capacity}
                    </p>
                  ) : null}
                  <p>Lokacija: {initialValues.location}</p>
                </Box>
              ) : pageStates.detailTab === 1 ? (
                <p>bonus feature recenzije</p>
              ) : (
                <p>bonus feature ocjene</p>
              )}
            </Box>
          </Box>
          {pageStates.detailTab === 0 ? (
            <Box className={classes.priceBox}>
              {initialValues.sportHall.price}KM/h
            </Box>
          ) : null}
        </Box>
        <Box className={classes.wrapperForImages}>
          <MobileStepper
            steps={
              initialValues.pictures ? initialValues.pictures.length : maxSteps
            }
            position="static"
            activeStep={pageStates.activeStep}
            className={classes.mobileStepper}
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
            index={pageStates.activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            sx={{ width: '100%' }}
          >
            {initialValues.pictures.map((step, index) => (
              <div key={step}>
                {Math.abs(pageStates.activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    className={classes.imageStyle}
                    src={step}
                    alt={initialValues.sportHall.title}
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
            sx={{
              transform: `translateX(${
                pageStates.gliderPosition *
                (pageStates.windowWidth < 600
                  ? 100
                  : pageStates.windowWidth < 960
                  ? 160
                  : 200)
              }px)`,
            }}
          ></Box>
          {initialValues.user ? (
            tabs.map((tab, index) => (
              <Box
                className={classes.tab}
                key={tab.value}
                onClick={() => handleTabChange(tab.value, index)}
                sx={{
                  color: pageStates.selectedForm === tab.value ? 'white' : '',
                }}
              >
                {tab.label}
              </Box>
            ))
          ) : (
            <>
              {tabs.map((tab, index) =>
                index !== 2 ? (
                  <LightTooltip
                    title="Ove opcije su dostupne samo prijavljenim korisnicima"
                    placement="top-start"
                    key={`${tab.value}-${index}`}
                  >
                    <Box className={classes.disabledTab} key={tab.value}>
                      {tab.label}
                    </Box>
                  </LightTooltip>
                ) : (
                  <Box
                    className={classes.tab}
                    key={tab.value}
                    onClick={() => handleTabChange(tab.value, index)}
                    sx={{
                      color:
                        pageStates.selectedForm === tab.value ? 'white' : '',
                    }}
                  >
                    {tab.label}
                  </Box>
                )
              )}
            </>
          )}
        </Box>
      </Box>
      {pageStates.selectedForm === 'temporary' ? (
        <>
          <Box className={classes.formWrapper} sx={{ alignItems: 'inherit' }}>
            <Box className={classes.reservationFormTemporary}>
              <Typography
                component="h1"
                variant="h5"
                className={classes.reservationFormHeadline}
              >
                Detalji rezervacije
              </Typography>
              <Box className={classes.flexRowBetween}>
                <TextField
                  margin="normal"
                  required
                  id="name"
                  label="Ime"
                  name="name"
                  value={reservationInfo.name}
                  error={
                    (reservationInfo.name === '' ||
                      reservationInfo.name.length <= 2) &&
                    pageStates.reservationButtonClicked
                  }
                  onChange={(event) => {
                    setReservationInfo((prevState) => ({
                      ...prevState,
                      name: event.target.value,
                    }))
                  }}
                  sx={{ width: '47%' }}
                />
                <TextField
                  margin="normal"
                  required
                  id="surname"
                  label="Prezime"
                  name="surname"
                  value={reservationInfo.surname}
                  error={
                    reservationInfo.surname === '' &&
                    pageStates.reservationButtonClicked
                  }
                  onChange={(event) => {
                    setReservationInfo((prevState) => ({
                      ...prevState,
                      surname: event.target.value,
                    }))
                  }}
                  sx={{ width: '47%' }}
                />
              </Box>
              <Box className={classes.flexRowBetween}>
                <Box sx={{ width: '47%' }} className={classes.dateTimeWrapper}>
                  <label style={{ fontFamily: 'sans-serif' }}>Od: </label>
                  <input
                    value={reservationInfo.fromTime}
                    style={{ width: '70%' }}
                    type="time"
                    className={
                      reservationInfo.fromTime === '' &&
                      pageStates.reservationButtonClicked
                        ? classes.forDateError
                        : classes.forDate
                    }
                    onChange={(event) => {
                      setReservationInfo((prevState) => ({
                        ...prevState,
                        fromTime: event.target.value,
                      }))
                    }}
                  />
                </Box>
                <Box sx={{ width: '47%' }} className={classes.dateTimeWrapper}>
                  <label style={{ fontFamily: 'sans-serif' }}>Do:</label>
                  <input
                    value={reservationInfo.toTime}
                    style={{ width: '70%' }}
                    type="time"
                    className={
                      reservationInfo.toTime === '' &&
                      pageStates.reservationButtonClicked
                        ? classes.forDateError
                        : classes.forDate
                    }
                    onChange={(event) => {
                      setReservationInfo((prevState) => ({
                        ...prevState,
                        toTime: event.target.value,
                      }))
                    }}
                  />
                </Box>
              </Box>
              <Box className={classes.dateTimeWrapper}>
                <input
                  style={{ width: '100%' }}
                  type="date"
                  className={
                    reservationInfo.date === '' &&
                    pageStates.reservationButtonClicked
                      ? classes.forDateError
                      : classes.forDate
                  }
                  min={getRangeDates(minDate)}
                  max={getRangeDates(maxDate)}
                  onChange={(event) => {
                    setReservationInfo((prevState) => ({
                      ...prevState,
                      date: event.target.value,
                    }))
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
                value={reservationInfo.email}
                error={
                  !emailRegex.test(reservationInfo.email) &&
                  pageStates.reservationButtonClicked
                }
                onChange={(event) => {
                  setReservationInfo((prevState) => ({
                    ...prevState,
                    email: event.target.value,
                  }))
                }}
              />
              <TextField
                margin="normal"
                required
                id="phone"
                label="Kontakt telefon"
                name="phone"
                fullWidth
                value={reservationInfo.phone}
                error={
                  !phoneRegex.test(reservationInfo.phone) &&
                  pageStates.reservationButtonClicked
                }
                autoComplete="off"
                onChange={(event) => {
                  setReservationInfo((prevState) => ({
                    ...prevState,
                    phone: event.target.value,
                  }))
                }}
              />
            </Box>
            <Box
              className={classes.reservationFormTemporary}
              sx={{
                height: `${pageStates.windowWidth < 960 ? '60vh' : null}`,
                width: `${pageStates.windowWidth > 960 ? '25vw' : '60vw'}`,
              }}
            >
              <Modal
                open={pageStates.openModal}
                onClose={handleModalClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <Box className={classes.modal}>
                  <Box className={classes.friendsWrapper}>
                    <Box className={classes.availableFriendWrapper}>
                      <Box className={classes.friendsHeadline}>PRIJATELJI</Box>
                      <Box className={classes.teamMembersWrapperModal}>
                        {initialValues.availableFriends.map((friend) => (
                          <Box className={classes.teamMember} key={friend.id}>
                            <Box className={classes.teamMemberPhotoUsername}>
                              {friend.picture ? (
                                <Avatar src={friend.picture}></Avatar>
                              ) : (
                                <Avatar src="/images/defaultUserImage.jpg" />
                              )}
                              <Typography sx={{ ml: 1 }}>
                                {friend.username}
                              </Typography>
                            </Box>
                            <AddCircleIcon
                              sx={{ color: '#43bbbf' }}
                              onClick={() => {
                                handleAddFriend(friend)
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Box className={classes.searchMembersPartModal}>
                      <Box className={classes.searchWrapper}>
                        <Box className={classes.search}>
                          <Box className={classes.searchIconWrapper}>
                            <SearchIcon />
                          </Box>
                          <InputBase
                            className={classes.searchField}
                            placeholder="Traži..."
                            value={initialValues.searchText}
                            sx={{ outline: 'none', border: 'none' }}
                            onChange={(event) => {
                              setInitialValues((prevState) => ({
                                ...prevState,
                                searchText: event.target.value,
                              }))
                            }}
                            onFocus={(event) => {
                              setPageStates((prevState) => ({
                                ...prevState,
                                openDropdown: true,
                              }))
                            }}
                            onBlur={() => {
                              setTimeout(() => {
                                setPageStates((prevState) => ({
                                  ...prevState,
                                  openDropdown: false,
                                }))
                              }, 200)
                            }}
                          />
                        </Box>
                        {pageStates.openDropdown &&
                        initialValues.suggestions.length !== 0 ? (
                          <Paper>
                            <List className={classes.suggestionList}>
                              {initialValues.suggestions.map((suggestion) => (
                                <ListItem
                                  key={suggestion.id}
                                  button
                                  onClick={() => {
                                    handleSuggestionClick(suggestion)
                                  }}
                                >
                                  {suggestion.picture ? (
                                    <Avatar src={suggestion.picture}></Avatar>
                                  ) : (
                                    <Avatar src="/images/defaultUserImage.jpg" />
                                  )}
                                  <ListItemText
                                    primary={suggestion.username}
                                    sx={{ ml: 1 }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Paper>
                        ) : null}
                      </Box>
                      <Box className={classes.teamMembersWrapperModal}>
                        {initialValues.selectedFriends.map((friend) => (
                          <Box className={classes.teamMember} key={friend.id}>
                            <Box className={classes.teamMemberPhotoUsername}>
                              {friend.picture ? (
                                <Avatar src={friend.picture}></Avatar>
                              ) : (
                                <Avatar src="/images/defaultUserImage.jpg" />
                              )}
                              <Typography sx={{ ml: 1 }}>
                                {friend.username}
                              </Typography>
                            </Box>
                            <HighlightOffIcon
                              sx={{ color: '#43bbbf' }}
                              onClick={() => {
                                handleRemoveFriend(friend)
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  <Box className={classes.modalFooter}>
                    <Button onClick={handleModalClose}>Zatvori</Button>
                    <Button
                      className={classes.customButton}
                      onClick={() => {
                        setInitialValues((prevState) => ({
                          ...prevState,
                          areMembersInvited: true,
                        }))
                        handleInviteUsers()
                      }}
                    >
                      Pozovi
                    </Button>
                  </Box>
                </Box>
              </Modal>
              <Typography
                component="h1"
                variant="h5"
                className={classes.reservationFormHeadline}
              >
                Sakupi raju
              </Typography>
              <Button
                onClick={handleModalOpen}
                className={classes.inviteButton}
                sx={{
                  fontSize: `${pageStates.windowWidth < 960 ? 'smaller' : ''}`,
                }}
              >
                Pozovi prijatelje u tim
              </Button>
              {initialValues.areMembersInvited ? (
                <Box className={classes.teamMembersWrapper}>
                  {initialValues.selectedFriends.map((friend) => {
                    const invitation = initialValues.invitations.find(
                      (invitation) => invitation.recipient === friend.id
                    )

                    return (
                      <Box className={classes.teamMember} key={friend.id}>
                        <Box className={classes.teamMemberPhotoUsername}>
                          {friend.picture ? (
                            <Avatar src={friend.picture}></Avatar>
                          ) : (
                            <Avatar src="/images/defaultUserImage.jpg" />
                          )}
                          <Typography
                            sx={
                              pageStates.windowWidth < 1050
                                ? { marginLeft: '0' }
                                : { marginLeft: '8px' }
                            }
                          >
                            {friend.username}
                          </Typography>

                          {invitation && invitation.status === 0 ? (
                            <Chip
                              icon={
                                <AccessTimeIcon
                                  sx={{ color: 'white !important' }}
                                />
                              }
                              label="Na čekanju"
                              className={classes.pendingStatus}
                              sx={
                                pageStates.windowWidth < 1050
                                  ? { marginLeft: '0' }
                                  : { marginLeft: '0.5rem' }
                              }
                              size="small"
                            />
                          ) : invitation && invitation.status === 1 ? (
                            <Chip
                              icon={
                                <CheckCircleOutlineIcon
                                  sx={{ color: 'white !important' }}
                                />
                              }
                              label="Prihvaćen"
                              className={classes.acceptedStatus}
                              sx={
                                pageStates.windowWidth < 1050
                                  ? { marginLeft: '0' }
                                  : { marginLeft: '0.5rem' }
                              }
                              size="small"
                            />
                          ) : null}
                        </Box>
                        <HighlightOffIcon
                          sx={{ color: '#43bbbf' }}
                          onClick={() => {
                            handleRemoveFriend(friend)
                          }}
                        />
                      </Box>
                    )
                  })}
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
                Rezerviši
              </Button>
            </Box>
            <Box
              className={classes.reservationFormTemporary}
              sx={{
                height: `${pageStates.windowWidth < 960 ? '60vh' : null}`,
                width: `${pageStates.windowWidth > 960 ? '25vw' : '60vw'}`,
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                className={classes.reservationFormHeadline}
              >
                Nedostaje Vam igrač?
              </Typography>
              <Typography component="p"></Typography>
            </Box>
          </Box>
        </>
      ) : null}
      <Box className={classes.formWrapper}>
        <Box
          className={classes.schedulerWrapper}
          sx={{
            width: `${
              pageStates.selectedForm === 'temporary' ? '80vw' : '55vw'
            }`,
          }}
        >
          <Box className={classes.calendarHeader}>
            <h1>Prikaz zakazanih termina</h1>
          </Box>
          <Box className={classes.scheduler}>
            <Box className={classes.timesColumn}>
              <Box sx={{ height: '40px' }}></Box>
              {Array.from({ length: 18 }).map((_, index) => {
                const hour = (index + 7) % 24
                return (
                  <Box key={index} className={classes.timeSlot}>
                    {String(hour).padStart(2, '0')}:00
                  </Box>
                )
              })}
            </Box>
            <Box className={classes.schedulerGrid}>
              {daysOfWeek.slice(0, 7).map((day, index) => (
                <Box key={day} className={classes.schedulerDayColumn}>
                  <Box className={classes.calendarWeekdays}>
                    <Box>
                      <Box>{getWeekday(index)}</Box>
                      <Box className={classes.dateDisplayWeekdays}>
                        {getDate(index).replace(/\//g, '.')}
                      </Box>
                    </Box>
                  </Box>
                  {initialValues.reservations
                    .filter(
                      (reservation) =>
                        reservation.date === getDateForReservation(index)
                    )
                    .map((reservation) => getReservation(reservation))}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        {pageStates.selectedForm === 'reservation' ? (
          <>
            <Box className={classes.reservationForm}>
              <Typography
                component="h1"
                variant="h5"
                className={classes.reservationFormHeadline}
              >
                Rezerviši termin
              </Typography>
              <Box className={classes.flexRowBetween}>
                <TextField
                  margin="normal"
                  required
                  id="name"
                  label="Ime"
                  name="name"
                  value={reservationInfo.name}
                  error={
                    (reservationInfo.name === '' ||
                      reservationInfo.name.length <= 2) &&
                    pageStates.reservationButtonClicked
                  }
                  onChange={(event) => {
                    setReservationInfo((prevState) => ({
                      ...prevState,
                      name: event.target.value,
                    }))
                  }}
                  sx={{ width: '47%' }}
                />
                <TextField
                  margin="normal"
                  required
                  id="surname"
                  label="Prezime"
                  name="surname"
                  value={reservationInfo.surname}
                  error={
                    reservationInfo.surname === '' &&
                    pageStates.reservationButtonClicked
                  }
                  onChange={(event) => {
                    setReservationInfo((prevState) => ({
                      ...prevState,
                      surname: event.target.value,
                    }))
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
                value={reservationInfo.email}
                error={
                  !emailRegex.test(reservationInfo.email) &&
                  pageStates.reservationButtonClicked
                }
                onChange={(event) => {
                  setReservationInfo((prevState) => ({
                    ...prevState,
                    email: event.target.value,
                  }))
                }}
              />
              <TextField
                margin="normal"
                required
                id="phone"
                label="Kontakt telefon"
                name="phone"
                fullWidth
                value={reservationInfo.phone}
                error={
                  !phoneRegex.test(reservationInfo.phone) &&
                  pageStates.reservationButtonClicked
                }
                autoComplete="off"
                onChange={(event) => {
                  setReservationInfo((prevState) => ({
                    ...prevState,
                    phone: event.target.value,
                  }))
                }}
              />
              <Box className={classes.dateTimeWrapper}>
                <input
                  style={{ width: '100%' }}
                  type="date"
                  className={
                    reservationInfo.date === '' &&
                    pageStates.reservationButtonClicked
                      ? classes.forDateError
                      : classes.forDate
                  }
                  min={getRangeDates(minDate)}
                  max={getRangeDates(maxDate)}
                  onChange={(event) => {
                    setReservationInfo((prevState) => ({
                      ...prevState,
                      date: event.target.value,
                    }))
                  }}
                />
              </Box>
              <Box className={classes.flexRowBetween}>
                <Box sx={{ width: '47%' }} className={classes.dateTimeWrapper}>
                  <label style={{ fontFamily: 'sans-serif' }}>Od: </label>
                  <input
                    value={reservationInfo.fromTime}
                    style={{ width: '60%' }}
                    type="time"
                    className={
                      reservationInfo.fromTime === '' &&
                      pageStates.reservationButtonClicked
                        ? classes.forDateError
                        : classes.forDate
                    }
                    onChange={(event) => {
                      setReservationInfo((prevState) => ({
                        ...prevState,
                        fromTime: event.target.value,
                      }))
                    }}
                  />
                </Box>
                <Box sx={{ width: '47%' }} className={classes.dateTimeWrapper}>
                  <label style={{ fontFamily: 'sans-serif' }}>Do:</label>
                  <input
                    value={reservationInfo.toTime}
                    style={{ width: '60%' }}
                    type="time"
                    className={
                      reservationInfo.toTime === '' &&
                      pageStates.reservationButtonClicked
                        ? classes.forDateError
                        : classes.forDate
                    }
                    onChange={(event) => {
                      setReservationInfo((prevState) => ({
                        ...prevState,
                        toTime: event.target.value,
                      }))
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
                Rezerviši
              </Button>
            </Box>
          </>
        ) : pageStates.selectedForm === 'permanent' ? (
          <>
            <Box className={classes.reservationForm}>
              <Typography
                component="h1"
                variant="h5"
                className={classes.reservationFormHeadline}
              >
                Rezerviši termin
              </Typography>
              <Box className={classes.flexRowBetween}>
                <TextField
                  margin="normal"
                  required
                  id="name"
                  label="Ime"
                  name="name"
                  value={reservationInfo.name}
                  error={
                    (reservationInfo.name === '' ||
                      reservationInfo.name.length <= 2) &&
                    pageStates.reservationButtonClicked
                  }
                  onChange={(event) => {
                    setReservationInfo((prevState) => ({
                      ...prevState,
                      name: event.target.value,
                    }))
                  }}
                  sx={{ width: '47%' }}
                />
                <TextField
                  margin="normal"
                  required
                  id="surname"
                  label="Prezime"
                  name="surname"
                  value={reservationInfo.surname}
                  error={
                    reservationInfo.surname === '' &&
                    pageStates.reservationButtonClicked
                  }
                  onChange={(event) => {
                    setReservationInfo((prevState) => ({
                      ...prevState,
                      surname: event.target.value,
                    }))
                  }}
                  sx={{ width: '47%' }}
                />
              </Box>
              <Box className={classes.flexRowBetween}>
                <TextField
                  margin="normal"
                  required
                  id="email"
                  label="Email adresa"
                  name="email"
                  autoComplete="off"
                  fullWidth
                  value={reservationInfo.email}
                  error={
                    !emailRegex.test(reservationInfo.email) &&
                    pageStates.reservationButtonClicked
                  }
                  onChange={(event) => {
                    setReservationInfo((prevState) => ({
                      ...prevState,
                      email: event.target.value,
                    }))
                  }}
                  sx={{ width: '47%' }}
                />
                <TextField
                  margin="normal"
                  required
                  id="phone"
                  label="Kontakt telefon"
                  name="phone"
                  fullWidth
                  value={reservationInfo.phone}
                  error={
                    !phoneRegex.test(reservationInfo.phone) &&
                    pageStates.reservationButtonClicked
                  }
                  autoComplete="off"
                  onChange={(event) => {
                    setReservationInfo((prevState) => ({
                      ...prevState,
                      phone: event.target.value,
                    }))
                  }}
                  sx={{ width: '47%' }}
                />
              </Box>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={initialValues.teamNames}
                onChange={(event, team) => {
                  setReservationInfo((prevState) => ({
                    ...prevState,
                    team: team,
                  }))
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    required
                    name="team"
                    id="team"
                    value={reservationInfo.team}
                    error={
                      reservationInfo.team === '' &&
                      pageStates.reservationButtonClicked
                    }
                    label="Naziv tima"
                    sx={{ textAlign: 'center' }}
                  />
                )}
              />
              <Box className={classes.dateTimeWrapper}>
                <input
                  style={{ width: '100%' }}
                  type="date"
                  className={
                    reservationInfo.date === '' &&
                    pageStates.reservationButtonClicked
                      ? classes.forDateError
                      : classes.forDate
                  }
                  min={getRangeDates(minDate)}
                  max={getRangeDates(maxDate)}
                  onChange={(event) => {
                    setReservationInfo((prevState) => ({
                      ...prevState,
                      date: event.target.value,
                    }))
                  }}
                />
              </Box>
              <Box className={classes.flexRowBetween}>
                <Box sx={{ width: '47%' }} className={classes.dateTimeWrapper}>
                  <label style={{ fontFamily: 'sans-serif' }}>Od: </label>
                  <input
                    value={reservationInfo.fromTime}
                    style={{ width: '60%' }}
                    type="time"
                    className={
                      reservationInfo.fromTime === '' &&
                      pageStates.reservationButtonClicked
                        ? classes.forDateError
                        : classes.forDate
                    }
                    onChange={(event) => {
                      setReservationInfo((prevState) => ({
                        ...prevState,
                        fromTime: event.target.value,
                      }))
                    }}
                  />
                </Box>
                <Box sx={{ width: '47%' }} className={classes.dateTimeWrapper}>
                  <label style={{ fontFamily: 'sans-serif' }}>Do:</label>
                  <input
                    value={reservationInfo.toTime}
                    style={{ width: '60%' }}
                    type="time"
                    className={
                      reservationInfo.toTime === '' &&
                      pageStates.reservationButtonClicked
                        ? classes.forDateError
                        : classes.forDate
                    }
                    onChange={(event) => {
                      setReservationInfo((prevState) => ({
                        ...prevState,
                        toTime: event.target.value,
                      }))
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
                Rezerviši
              </Button>
            </Box>
          </>
        ) : null}
      </Box>
    </>
  )
}

export default SportHallPage
