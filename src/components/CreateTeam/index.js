import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Button, TextField } from '@mui/material'
import { Collapse } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import {
  BASE_BACKEND_URL,
  CREATE_TEAM,
  DELETE_TEAM,
  DELETE_TEAM_MEMBER,
  GET_PLAYER,
  GET_TEAMS,
  INVITE_TEAM_MEMBER,
} from 'src/constants/endpoints'
import { COOKIE_AUTHENTICATION_FE } from 'src/constants/keys/browser'
import withMainFrame from 'src/hoc/withMainFrame'
import Swal from 'sweetalert2'

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('')
  const [team, setTeam] = useState([])
  const [teamMember, setTeamMember] = useState([])
  const cookie = Cookies.get(COOKIE_AUTHENTICATION_FE)
  const cookie_data = JSON.parse(cookie)
  const id = cookie_data.id

  const handleConfirmation = () => {
    if (teamName.trim() !== '') {
      Swal.fire({
        title: 'Jeste li sigurni?',
        text: '',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Da, kreiraj!',
        cancelButtonText: 'Poništi',
      }).then((result) => {
        if (result.isConfirmed) {
          handleSubmit()
        }
      })
    }
  }

  const handleSubmit = () => {
    Swal.fire('Gotovo!', 'Vaš novi tim je kreiran.', 'success')

    const dataToSend = {
      name: teamName,
      id: id,
    }

    axios
      .post(`${CREATE_TEAM}/`, dataToSend)
      .then((response) => {
        fetchTeamData()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleInputChange = (event) => {
    setTeamName(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  async function fetchTeamData() {
    const dataToSend = {
      name: teamName,
      id: id,
    }

    const res = await axios.get(`${GET_TEAMS}`, {
      params: {
        id: dataToSend.id,
      },
    })
    setTeam(res.data)
  }

  useEffect(() => {
    fetchTeamData()
  }, [])

  const createData = (id, name, brojClanova, clanovi) => {
    return {
      id,
      name,
      brojClanova,
      clanovi,
    }
  }
  const deleteConfirmation = (event) => {
    const id = Number(event.currentTarget.getAttribute('data-name'))

    Swal.fire({
      title: 'Jeste li sigurni?',
      text: '',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da, Obriši tim!',
      cancelButtonText: 'Poništi',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${DELETE_TEAM}`, {
            params: {
              id: id,
            },
          })
          .then((response) => {
            console.log('Team deleted successfully.')

            setTeam((prevTeam) =>
              prevTeam.filter((teamObj) => teamObj.id !== id)
            )
          })
          .catch((error) => {
            console.error('Error deleting team:', error)
          })
      }
    })
  }

  const [memberName, setMemberName] = useState('')
  useEffect(() => {
    sendInvite()
  }, [memberName])

  const addTeamMember = async () => {
    const res = await axios.get(`${GET_PLAYER}`)
    const users = res.data
    const usernames = users.map((user) => user.username)

    const handleInputChangeMember = (event) => {
      setMemberName(event.target.value, () => {})
    }

    Swal.fire({
      title: 'Odaberite username vašeg prijatelja',
      input: 'text',

      confirmButtonColor: '#43bbbf',

      confirmButtonText: 'Zatvori',

      inputAttributes: {
        list: 'member-suggestions',
      },
      didOpen: () => {
        const inputElement = Swal.getInput()
        inputElement.addEventListener('change', handleInputChangeMember)
      },
      html: `<datalist id="member-suggestions">${usernames
        .map((username) => `<option value="${username}" />`)
        .join('')}</datalist>`,

      preConfirm: () => {
        return Promise.resolve()
      },
    })

    Swal.getPopup().addEventListener('didDestroy', () => {
      const datalist = document.getElementById('member-suggestions')
      if (datalist) {
        datalist.remove()
      }
    })
  }

  const [teamId, setTeamId] = useState('')

  const sendInvite = () => {
    const dataToSend = {
      id: id,
      username: memberName,
      team_id: teamId,
    }
    if (memberName.trim() !== '') {
      axios.post(`${INVITE_TEAM_MEMBER}`, dataToSend)
    }
  }
  const deleteMember = (event) => {
    const email = event.currentTarget.getAttribute('data-name')
    const teamId = event.currentTarget.getAttribute('data-team-id')
    Swal.fire({
      title: 'Jeste li sigurni?',
      text: '',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da, ukloni člana!',
      cancelButtonText: 'Poništi',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${DELETE_TEAM_MEMBER}`, {
            params: {
              email: email,
              teamId: teamId,
            },
          })
          .then((response) => {
            console.log('Team Member deleted successfully.')

            setTeamMember((prevTeamMember) =>
              prevTeamMember.filter((teamObj) => teamObj.email !== email)
            )
          })
          .catch((error) => {
            console.error('Error deleting team member:', error)
          })
      }
    })
  }

  function Row(props) {
    const { row } = props
    const [open, setOpen] = React.useState(false)
    const members = []
    if (row.clanovi.length !== 0) {
      for (let i = 0; i < row.clanovi.length; i++) {
        members.push(JSON.parse(row.clanovi[i].slice(1, -1)))
      }
    }

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell
            component="th"
            scope="row"
            sx={{ fontSize: 24, fontWeight: 'medium' }}
          >
            {row.name}
          </TableCell>
          <TableCell
            align="right"
            sx={{ fontSize: 18, fontWeight: 'medium', paddingRight: '15%' }}
          >
            {row.brojClanova}
          </TableCell>
          <TableCell>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              data-name={row.id}
              onClick={deleteConfirmation}
              color="primary"
            >
              Obriši
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Članovi tima
                </Typography>

                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Ime</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                        Prezime
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                        Username
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                        Email
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                        <Button
                          variant="outlined"
                          startIcon={<PersonAddIcon />}
                          onClick={() => {
                            setTeamId(row.id)
                            addTeamMember()
                          }}
                          style={{ color: '#43bbbf' }}
                        >
                          Pozovi
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {members.map((member, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}.</TableCell>
                        <TableCell>{member.fields.name}</TableCell>
                        <TableCell align="right">
                          {member.fields.surname}
                        </TableCell>
                        <TableCell align="right">
                          {member.fields.username}
                        </TableCell>
                        <TableCell align="right">
                          {member.fields.email}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={deleteMember}
                            data-name={member.fields.email}
                            data-team-id={row.id}
                            sx={{
                              paddingRight: '5px',
                              paddingLeft: '5px',
                              marginLeft: '20%',
                            }}
                          >
                            Ukloni
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    )
  }

  const rows = team.map((teamObj) =>
    createData(
      teamObj.id,
      teamObj.name,
      teamObj.members.length,
      teamObj.members
    )
  )

  return withMainFrame(
    <>
      <Typography
        sx={{
          mb: 5,
          fontSize: 32,
          fontWeight: 'medium',
          textAlign: 'center',
        }}
      >
        Kreirajte svoj tim
      </Typography>
      <Box
        component="form"
        onSubmit={(event) => event.preventDefault()}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: '5%',
        }}
      >
        <TextField
          required
          label="Unesite ime vašeg tima"
          value={teamName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          sx={{ width: '250px' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: '20px',
        }}
      >
        <Button
          type="submit"
          variant="contained"
          onClick={handleConfirmation}
          sx={{ backgroundColor: '#43bbbf' }}
        >
          Kreiraj
        </Button>
      </Box>

      {team.length === 0 ? (
        <>
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 'medium',
              textAlign: 'center',
              paddingTop: '5%',
              paddingBottom: '10px',
            }}
          >
            Trenutno nemate nijedan tim <br></br> kreirajte svoj prvi tim na
            jednostavan način
          </Typography>
          <Typography
            sx={{
              mb: 5,
              fontSize: 32,
              fontWeight: 'medium',
              textAlign: 'center',
              paddingTop: '2%',
            }}
          >
            <img src={'/images/create_team.jpg'} alt="Teams" />
          </Typography>
        </>
      ) : (
        <>
          <Typography
            sx={{
              mb: 5,
              fontSize: 32,
              fontWeight: 'medium',
              textAlign: 'center',
              paddingTop: '5%',
            }}
          >
            Moji timovi
          </Typography>
          <Box
            sx={{
              mb: 5,
              fontSize: 32,
              fontWeight: 'medium',
              marginRight: '25%',
              marginLeft: '1%',
              paddingLeft: '25%',
            }}
          >
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell
                      sx={{
                        mb: 5,
                        fontSize: 32,
                        fontWeight: 'medium',
                      }}
                    >
                      Ime tima
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        mb: 5,
                        fontSize: 32,
                        fontWeight: 'medium',
                      }}
                    >
                      Broj članova
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
    </>
  )
}

export default CreateTeam
