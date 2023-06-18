import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Typography } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import { red } from '@mui/material/colors'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { cities } from 'src/constants/appDefaults'
import {
  ADD_SPORT_HALL,
  DELETE_MY_SPORT_HALL,
  UPDATE_MY_SPORT_HALL,
} from 'src/constants/endpoints'
import { GET_MY_SPORT_HALLS } from 'src/constants/endpoints'
import { COOKIE_AUTHENTICATION_FE } from 'src/constants/keys/browser'
import { HTTPStatusCodes } from 'src/constants/statusCodes'
import withMainFrame from 'src/hoc/withMainFrame'
import Swal from 'sweetalert2'

import useStyles from './styles'

const OwnerProfile = () => {
  const [sporthalls, setSportHalls] = useState([])
  const classes = useStyles()

  const cookie = Cookies.get(COOKIE_AUTHENTICATION_FE)
  const cookie_data = JSON.parse(cookie)
  const [openAdd, setOpenAdd] = React.useState(false)
  const handleOpenAdd = () => setOpenAdd(true)
  const handleCloseAdd = () => setOpenAdd(false)
  const [openEdit, setOpenEdit] = React.useState(false)
  const [newSportHall, setNewSportHall] = useState({})
  const [deletedSportHallId, setDeletedSportHallId] = useState(null)
  const [editedSportHallId, setEditedSportHallId] = useState(null)
  const [currentSportHall, setCurrentSportHall] = useState({
    imeTerena: '',
    opis: '',
    grad: '',
    adresa: '',
    cijena: '',
    kapacitet: '',
    sportovi: '',
    id: '',
    statusTerena: '',
  })

  const handleOpenEdit = (sporthall) => {
    setOpenEdit(true)

    setCurrentSportHall((prevState) => ({
      ...prevState,
      imeTerena: sporthall.title,
      opis: sporthall.description,
      grad: sporthall.city,
      adresa: sporthall.address,
      cijena: sporthall.price,
      kapacitet: sporthall.capacity,
      sportovi: sporthall.sports,
      id: sporthall.id,
    }))
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  useEffect(() => {
    async function getMySportHalls() {
      const { data, status } = await axios.get(GET_MY_SPORT_HALLS, {
        params: {
          id: cookie_data.id,
        },
      })
      if (status === HTTPStatusCodes.OK) {
        if (deletedSportHallId) {
          setSportHalls(
            data.filter((sporthall) => sporthall.id !== deletedSportHallId)
          )
          setDeletedSportHallId(null)
        } else {
          setSportHalls(data)
        }
      }
    }
    getMySportHalls()
  }, [deletedSportHallId, editedSportHallId])

  const [formValues, setFormValues] = useState({
    imeTerena: '',
    opisTerena: '',
    grad: '',
    adresa: '',
    cijena: '',
    kapacitet: '',
    tipTerena: '',
    sportovi: '',
    slika: '',
    status: '',
  })

  const handleInputChange = (event) => {
    const { name, value, type } = event.target

    let inputValue = value

    if (type === 'number') {
      inputValue = parseInt(value)
    }

    if (name === 'grad' || name === 'tipTerena' || name === 'sportovi') {
      inputValue = event.target.value
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: inputValue,
    }))
  }

  const handleInputChangeEdit = (event) => {
    const { name, value, type } = event.target

    let inputValue = value

    if (type === 'number') {
      inputValue = parseInt(value)
    }

    if (
      name === 'grad' ||
      name === 'tipTerena' ||
      name === 'sportovi' ||
      name === 'statusTerena'
    ) {
      inputValue = event.target.value
    }

    setCurrentSportHall((prevValues) => ({
      ...prevValues,
      [name]: inputValue,
    }))
  }

  const addSportHall = async (e) => {
    e.preventDefault()
    const fileInput = document.getElementById('slika')
    const file = fileInput.files[0]
    const formData = new FormData()

    if (file) {
      formData.append('slika', file)
    }

    formData.append('imeTerena', formValues.imeTerena)
    formData.append('opisTerena', formValues.opisTerena)
    formData.append('grad', formValues.grad)
    formData.append('adresa', formValues.adresa)
    formData.append('cijena', formValues.cijena)
    formData.append('kapacitet', formValues.kapacitet)
    formData.append('tipTerena', formValues.tipTerena)
    formData.append('sportovi', formValues.sportovi)
    formData.append('id', cookie_data.id)

    const {
      imeTerena,
      opisTerena,
      grad,
      adresa,
      cijena,
      kapacitet,
      tipTerena,
      sportovi,
      slika,
    } = formValues

    formValues.slika = formData

    if (grad.trim() === '' || tipTerena.trim() === '' || sportovi[0] === '') {
      alert('Molimo unesite sva polja!')
      return
    }
    if (isNaN(parseInt(cijena)) || isNaN(parseInt(kapacitet))) {
      alert('Molimo unesite ispravne vrijednosti za cijenu i kapacitet!')
      return
    }

    if (
      imeTerena.trim() === '' ||
      opisTerena.trim() === '' ||
      grad.trim() === '' ||
      adresa.trim() === '' ||
      cijena === '' ||
      kapacitet === '' ||
      tipTerena.trim() === '' ||
      sportovi[0] === ''
    ) {
      alert('Molimo unesite sva polja!')

      return
    }

    handleCloseAdd()

    try {
      const response = await axios.post(ADD_SPORT_HALL, formData)
      const { data, status } = response
      if (status === HTTPStatusCodes.OK) {
        setNewSportHall(data)
      }
    } catch (error) {
      console.error('Error adding sport hall:', error)
    }

    try {
      const response = await axios.get(GET_MY_SPORT_HALLS, {
        params: {
          id: cookie_data.id,
        },
      })
      const { data, status } = response
      if (status === HTTPStatusCodes.OK) {
        setSportHalls(data)
      }
    } catch (error) {
      console.error('Error fetching sport halls:', error)
    }
  }

  const handleEdit = async (id) => {
    axios.put(UPDATE_MY_SPORT_HALL, currentSportHall)
    setEditedSportHallId(currentSportHall.id)
    setOpenEdit(false)
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Jeste li sigurni?',
      text: 'Nećete moći povratiti obrisani teren!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da, obriši!',
      cancelButtonText: 'Poništi',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${DELETE_MY_SPORT_HALL}/${id}`)
        setDeletedSportHallId(id)
        Swal.fire('Obrisano!', 'Vaš teren je uspješno obrisan.', 'success')
      }
    })
  }

  return withMainFrame(
    <>
      <Grid container spacing={2} className={classes.container}>
        {sporthalls.map((sporthall, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }} className={classes.cardWrapper}>
              <Box position="relative">
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: red[500] }}
                      src={'/images/defaultUserImage.jpg'}
                      aria-label="recipe"
                    />
                  }
                  title={sporthall.title}
                  subheader={sporthall.city ? sporthall.city : ''}
                  className={classes.text}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 1,
                  }}
                >
                  <IconButton
                    aria-label="edit"
                    style={{ color: 'yellow' }}
                    onClick={() => handleOpenEdit(sporthall)}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
                <CardMedia
                  component="img"
                  height="194"
                  image={
                    sporthall.pictures ? sporthall.pictures : '/images/logo.svg'
                  }
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className={classes.text}
                  >
                    {sporthall.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className={classes.text}
                      fontSize="22px"
                    >
                      {sporthall.sports
                        .split(',')
                        .map((sport) => sport.trim())
                        .join(', ')}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    ></Typography>
                  </Box>

                  <IconButton
                    aria-label="delete"
                    style={{ color: 'red' }}
                    onClick={() => handleDelete(sporthall.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
                {sporthall.status === 'closed' && (
                  <Box component="div" className={classes.ribbon}>
                    <Typography variant="body2" color="text.secondary">
                      Zatvoreno
                    </Typography>
                  </Box>
                )}
                {sporthall.status === 'featured' && (
                  <Box component="div" className={classes.featuredRibbon}>
                    <Typography variant="body2" color="text.secondary">
                      Istaknuto
                    </Typography>
                  </Box>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
        <AddCircleOutlineIcon
          onClick={handleOpenAdd}
          style={{ fontSize: 150 }}
          sx={{
            color: '#43bbbf',
            paddingTop: '10%',
            ':hover': { cursor: 'pointer' },
          }}
        ></AddCircleOutlineIcon>

        <Modal
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Fade in={openAdd}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Unesite informacije o vašem novom terenu
              </Typography>
              <DialogContent sx={{ overflowY: 'auto', maxHeight: '350px' }}>
                <TextField
                  type="text"
                  label="Ime terena"
                  placeholder="Ime terena"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  id="imeTerena"
                  name="imeTerena"
                  value={formValues.imeTerena}
                  onChange={handleInputChange}
                />
                <TextField
                  type="text"
                  label="Opis terena"
                  placeholder="Opis terena"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  id="opisTerena"
                  name="opisTerena"
                  value={formValues.opisTerena}
                  onChange={handleInputChange}
                />
                <Autocomplete
                  options={cities}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Grad"
                      id="grad"
                      placeholder="Grad"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      name="grad"
                      value={formValues.grad}
                      onChange={handleInputChange}
                    />
                  )}
                  onChange={(event, value) => {
                    handleInputChange({
                      target: {
                        name: 'grad',
                        value: value,
                      },
                    })
                  }}
                />
                <TextField
                  type="text"
                  label="Adresa"
                  placeholder="Adresa"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  id="adresa"
                  name="adresa"
                  value={formValues.adresa}
                  onChange={handleInputChange}
                />
                <TextField
                  type="number"
                  label="Cijena"
                  placeholder="Cijena"
                  variant="outlined"
                  margin="normal"
                  id="cijena"
                  fullWidth
                  name="cijena"
                  value={formValues.cijena}
                  onChange={handleInputChange}
                  required
                  inputProps={{
                    min: 0,
                  }}
                />
                <TextField
                  type="number"
                  label="Kapacitet"
                  placeholder="Kapacitet"
                  variant="outlined"
                  margin="normal"
                  id="kapacitet"
                  fullWidth
                  name="kapacitet"
                  required
                  value={formValues.kapacitet}
                  onChange={handleInputChange}
                  inputProps={{
                    min: 0,
                  }}
                />
                <Autocomplete
                  options={['Vanjski', 'Unutrašnji']}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tip terena"
                      placeholder="Tip terena"
                      variant="outlined"
                      margin="normal"
                      fullWidthid
                      name="tipTerena"
                      id="tipTerena"
                      value={formValues.tipTerena}
                      onChange={(event, value) => {
                        setFormValues((prevValues) => ({
                          ...prevValues,
                          [event.target.name]: value,
                        }))
                      }}
                      required
                    />
                  )}
                  onChange={(event, value) => {
                    handleInputChange({
                      target: {
                        name: 'tipTerena',
                        value: value,
                      },
                    })
                  }}
                />
                <Autocomplete
                  multiple
                  id="sports"
                  options={[
                    'Fudbal',
                    'Kosarka',
                    'Odbojka',
                    'Rukomet',
                    'Tenis',
                    'Paintball',
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sportovi"
                      placeholder="Odaberite sportove"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      name="sportovi"
                      value={formValues.sportovi}
                      onChange={(event, value) => {
                        setFormValues((prevValues) => ({
                          ...prevValues,
                          [event.target.name]: event.target.value,
                        }))
                      }}
                      id="sportovi"
                    />
                  )}
                  onChange={(event, value) => {
                    handleInputChange({
                      target: {
                        name: 'sportovi',
                        value: value,
                      },
                    })
                  }}
                />
                Slika vašeg terena
                <Input type="file" name="slika" id="slika" />
              </DialogContent>
              <DialogActions>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '2rem',
                  }}
                >
                  <Button
                    type="submit"
                    onClick={addSportHall}
                    variant="contained"
                  >
                    Kreiraj
                  </Button>
                </Box>
              </DialogActions>
            </Box>
          </Fade>
        </Modal>
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              textAlign={'center'}
              fontWeight={'medium'}
              fontSize="28px"
            >
              Ažuriraj teren
            </Typography>
            <DialogContent sx={{ overflowY: 'auto', maxHeight: '350px' }}>
              <TextField
                label="Ime terena"
                placeholder="Ime terena"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                name="imeTerena"
                value={currentSportHall.imeTerena}
                id="imeTerena"
                onChange={handleInputChangeEdit}
              />
              <TextField
                label="Opis terena"
                placeholder="Opis terena"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                name="opisTerena"
                value={currentSportHall.opis}
                id="opisTerena"
                onChange={handleInputChangeEdit}
              />

              <Autocomplete
                options={cities}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Grad"
                    id="grad"
                    placeholder="Grad"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    name="grad"
                    value={currentSportHall.grad}
                    onChange={handleInputChangeEdit}
                  />
                )}
                onChange={(event, value) => {
                  handleInputChange({
                    target: {
                      name: 'grad',
                      value: value,
                    },
                  })
                }}
              />
              <TextField
                label="Cijena"
                placeholder="Cijena"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                name="cijena"
                value={currentSportHall.cijena}
                id="cijena"
                onChange={handleInputChangeEdit}
              />
              <TextField
                label="Kapacitet"
                placeholder="Kapacitet"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                name="kapacitet"
                value={currentSportHall.kapacitet}
                id="kapacitet"
                onChange={handleInputChangeEdit}
              />
              <Autocomplete
                options={['Vanjski', 'Unutrašnji']}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tip terena"
                    placeholder="Tip terena"
                    variant="outlined"
                    margin="normal"
                    fullWidthid
                    name="tipTerena"
                    id="tipTerena"
                    onChange={(event, value) => {
                      setCurrentSportHall((prevValues) => ({
                        ...prevValues,
                        [event.target.name]: value,
                      }))
                    }}
                    required
                  />
                )}
                onChange={(event, value) => {
                  handleInputChangeEdit({
                    target: {
                      name: 'tipTerena',
                      value: value,
                    },
                  })
                }}
              />
              <Autocomplete
                multiple
                id="sports"
                options={[
                  'Fudbal',
                  'Kosarka',
                  'Odbojka',
                  'Rukomet',
                  'Tenis',
                  'Paintball',
                ]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sportovi"
                    placeholder="Odaberite sportove"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    name="sportovi"
                    value={currentSportHall.sportovi}
                    onChange={(event, value) => {
                      setCurrentSportHall((prevValues) => ({
                        ...prevValues,
                        [event.target.name]: event.target.value,
                      }))
                    }}
                    id="sportovi"
                  />
                )}
                onChange={(event, value) => {
                  handleInputChangeEdit({
                    target: {
                      name: 'sportovi',
                      value: value,
                    },
                  })
                }}
              />
              <Autocomplete
                options={['Otvoreno', 'Zatvoreno']}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Status terena"
                    placeholder="Status terena"
                    variant="outlined"
                    margin="normal"
                    fullWidthid
                    name="statusTerena"
                    id="statusTerena"
                    onChange={(event, value) => {
                      setCurrentSportHall((prevValues) => ({
                        ...prevValues,
                        [event.target.name]: value,
                      }))
                    }}
                    required
                  />
                )}
                onChange={(event, value) => {
                  handleInputChangeEdit({
                    target: {
                      name: 'statusTerena',
                      value: value,
                    },
                  })
                }}
              />
            </DialogContent>
            <DialogActions>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '2rem',
                }}
              >
                <Button type="submit" onClick={handleEdit} variant="contained">
                  Ažuriraj
                </Button>
              </Box>
            </DialogActions>
          </Box>
        </Modal>
      </Grid>
    </>
  )
}

export default OwnerProfile
