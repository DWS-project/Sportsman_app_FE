import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { bgcolor, Box } from '@mui/system'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { ADD_TEAM_MEMBER, DELETE_PLAYER_FRIEND, GET_PLAYER_FRIENDS, GET_PLAYER_GAMES, GET_PLAYER_INVITATION, UPDATE_INVITATION_STATUS } from 'src/constants/endpoints';
import { COOKIE_AUTHENTICATION_FE } from 'src/constants/keys/browser';
import withMainFrame from 'src/hoc/withMainFrame';

const UserProfile = () => {
  const [friends, setFriends] = useState('')
  const [gamesPlayed, setgamesPlayed] = useState([])
  const [showSection, setShowSection] = useState({
    activeButton: 1,
    showInvitations: true,
    showInvitationHistory: false,
    showFriends: false,
  })
  const [invites, setInvites] = useState({
    allInvites: [],
    onHoldInvites: [],
    acceptedInvites: [],
    deniedInvites: [],
  })
  const [showInvites, setShowInvites] = useState({
    accepted: false,
    denied: false,
    onHold: true,
  })
  const [orders, setOrders] = useState({
    invitationOrder: 'asc',
    invitationOrderBy: 'sender__username',
    historyOrder: 'asc',
    historyOrderBy: 'sport_hall__title',
    friendsOrder: 'asc',
    friendsOrderBy: 'user2__username',
  })

  const cookie = Cookies.get(COOKIE_AUTHENTICATION_FE)
  const cookie_data = JSON.parse(cookie)
  const id = cookie_data.id

  const handleClick = (key) => {
    switch (key) {
      case 1:
        setShowSection({
          activeButton: 1,
          showInvitations: true,
          showInvitationHistory: false,
          showFriends: false,
        })
        break
      case 2:
        setShowSection({
          activeButton: 2,
          showInvitations: false,
          showInvitationHistory: true,
          showFriends: false,
        })
        break
      case 3:
        setShowSection({
          activeButton: 3,
          showInvitations: false,
          showInvitationHistory: false,
          showFriends: true,
        })
        break
    }
  }
  const handleInvitationsSort = async (order, column) => {
    const isAsc = orders.invitationOrderBy === column && order === 'asc'
    setOrders({
      ...orders,
      invitationOrder: isAsc ? 'desc' : 'asc',
      invitationOrderBy: column,
    })
    let status = 0
    if (showInvites.onHold) {
      status = 0
    } else if (showInvites.accepted) {
      status = 1
    } else {
      status = 2
    }
    const data = {
      column: column,
      order: order,
      status: status,
    }
    const response = await axios.get(`${GET_PLAYER_INVITATION}/${id}`, {
      params: data,
    })
    console.log(response);
    switch (response.data[0].status) {
      case 0:
        setInvites({
          ...invites,
          onHoldInvites: response.data,
        })
        break
      case 1:
        setInvites({
          ...invites,
          acceptedInvites: response.data,
        })
        break
      case 2:
        setInvites({
          ...invites,
          deniedInvites: response.data,
        })
        break
    }
  }

  const handleHistorySort = async (order, column) => {
    const isAsc = orders.historyOrderBy === column && order === 'asc'
    setOrders({
      ...orders,
      historyOrder: isAsc ? 'desc' : 'asc',
      historyOrderBy: column,
    })
    const data = {
      column: column,
      order: order,
    }
    const response = await axios.get(`${GET_PLAYER_GAMES}/${id}`, {
      params: data,
    })
    setgamesPlayed(response.data)
  }

  const handleFriendsSort = async (order, column) => {
    const isAsc = orders.friendsOrderBy === column && order === 'asc'
    setOrders({
      ...orders,
      friendsOrder: isAsc ? 'desc' : 'asc',
      friendsOrderBy: column,
    })
    const data = {
      column: column,
      order: order,
    }
    const response = await axios.get(`${GET_PLAYER_FRIENDS}/${id}`, {
      params: data,
    })
    setFriends(response.data)
  }

  useEffect(() => {
    async function fetchData() {
      const invitations = await axios.get(`${GET_PLAYER_INVITATION}/${id}`)
      const acceptedInvitations = invitations.data.filter(
        (data) => data.status === 1
      )
      const deniedInvitations = invitations.data.filter(
        (data) => data.status === 2
      )
      const onHoldInvitations = invitations.data.filter(
        (data) => data.status === 0
      )

      setInvites({
        ...invites,
        acceptedInvites: acceptedInvitations,
        deniedInvites: deniedInvitations,
        onHoldInvites: onHoldInvitations,
      })

      const friends = await axios.get(`${GET_PLAYER_FRIENDS}/${id}`)
      setFriends(friends.data)

      const gamesPlayed = axios.get(`${GET_PLAYER_GAMES}/${id}`)
      setgamesPlayed(gamesPlayed.data)
    }
    fetchData()
  }, [])

  const handleFriendDelete = async (friend_id) => {
    const updated_friends = friends.filter(
      (friends) => friends.id !== friend_id
    )
    await axios.delete(`${DELETE_PLAYER_FRIEND}/${friend_id}`)
    setFriends(updated_friends)
  }

  const handleShowingInvites = (invites) => {
    switch (invites) {
      case 0:
        setShowInvites({
          accepted: false,
          denied: false,
          onHold: true,
        })
        break
      case 1:
        setShowInvites({
          accepted: true,
          denied: false,
          onHold: false,
        })
        break
      case 2:
        setShowInvites({
          accepted: false,
          denied: true,
          onHold: false,
        })
    }
  }

  const handleAccept = async (rowId, details) => {
    const data = {
        'status': 1,
    }
    await axios.put(`${UPDATE_INVITATION_STATUS}/${rowId}`, data);
    const acceptedRow = invites.onHoldInvites.find(row => row.id === rowId);
    acceptedRow.status = 1;
    const updatedInvites = invites.onHoldInvites.filter(row => row.id !== rowId);
    setInvites(prevInvites => ({
        ...prevInvites,
        onHoldInvites: updatedInvites,
        acceptedInvites: [...prevInvites.acceptedInvites, acceptedRow]
    })); 
    const params = {
        'team_id': JSON.parse(details).team_id,
        'user_id': cookie_data.id
    }
    console.log(params)
    await axios.post(`${ADD_TEAM_MEMBER}`, params);
}

  const handleDeny = async (rowId) => {
    const data = {
      status: 2,
    }
    await axios.put(`${UPDATE_INVITATION_STATUS}/${rowId}`, data)
    const deniedRow = invites.onHoldInvites.find((row) => row.id === rowId)
    deniedRow.status = 2
    const updatedInvites = invites.onHoldInvites.filter(
      (row) => row.id !== rowId
    )
    setInvites((prevInvites) => ({
      ...prevInvites,
      onHoldInvites: updatedInvites,
      deniedInvites: [...prevInvites.deniedInvites, deniedRow],
    }))
  }
  return withMainFrame(
    <Grid container direction={'column'} mt={7} p={3} justifyContent={'center'} alignItems={'center'}>
        <Paper elevation={4} sx={{width:'80%', maxHeight:'400px', height:'400px', overflow:'scroll'}}
        >
            <Grid item>
            <Box
            display={'flex'}
            justifyContent={'space-evenly'}
            >
                <Button key={1} 
                        variant='outlined' 
                        fullWidth
                        onClick={() => handleClick(1)}
                        sx={{
                            ...(showSection.activeButton === 1 ? { backgroundColor: '#43bbbf' } : {})
                          }}
                        >Termini</Button>
                <Button key={2} 
                        variant='outlined'
                         fullWidth
                         onClick={() => handleClick(2)}
                         sx={{
                            ...(showSection.activeButton === 2 ? { backgroundColor: '#43bbbf' } : {})
                          }}
                         >Historija</Button>
                <Button key={3} 
                        variant='outlined'
                        fullWidth
                        onClick={() => handleClick(3)}
                        sx={{
                            ...(showSection.activeButton === 3 ? { backgroundColor: '#43bbbf' } : {})
                          }}
                        >Prijatelji</Button>
            </Box>
            </Grid>
            {showSection.showInvitations && 
            <div>
            <Grid item>
              <Box
                display={'flex'}
                justifyContent={'space-evenly'}
                bgcolor="lightblue"
              >
                <Button
                  variant="text"
                  sx={{ color: 'blue' }}
                  onClick={() => handleShowingInvites(0)}
                >
                  Na čekanju
                </Button>
                <Button
                  variant="text"
                  sx={{ color: 'darkgreen' }}
                  onClick={() => handleShowingInvites(1)}
                >
                  Prihvaceni
                </Button>
                <Button
                  variant="text"
                  sx={{ color: 'red' }}
                  onClick={() => handleShowingInvites(2)}
                >
                  Odbijeni
                </Button>
              </Box>
            </Grid>
        <Grid item>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:'bold'}}>
                <TableSortLabel
                active={orders.invitationOrderBy === 'sender__username'}
                direction= {orders.invitationOrder}
                onClick={() => handleInvitationsSort(orders.invitationOrder, 'sender__username')}>
                    Pozvao:
                </TableSortLabel>
            </TableCell>
            <TableCell sx={{fontWeight:'bold'}} align="right">
                <TableSortLabel
                active={orders.invitationOrderBy === 'invitation_type__name'}
                direction= {orders.invitationOrder}
                onClick={() => handleInvitationsSort(orders.invitationOrder, 'invitation_type__name')}>
                    Tip tima: 
                </TableSortLabel>
             </TableCell>
             <TableCell sx={{fontWeight:'bold'}} align="right">
                <TableSortLabel
                active={orders.invitationOrderBy === 'details'}
                direction= {orders.invitationOrder}
                onClick={() => handleInvitationsSort(orders.invitationOrder, 'details')}>
                    Ime tima: 
                </TableSortLabel>
             </TableCell>
            <TableCell sx={{fontWeight:'bold'}} align="right">
                <TableSortLabel
                active={orders.invitationOrderBy === 'time_sent'} 
                direction = {orders.invitationOrder}
                onClick={() => handleInvitationsSort(orders.invitationOrder, 'time_sent')}>
                    Vrijeme:
                </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {showInvites.onHold && invites.onHoldInvites && invites.onHoldInvites.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'lightblue' }
            }
            >
              <TableCell component="th" scope="row">
                {row.sender__username}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              {row.details && 
              <TableCell align="right">{JSON.parse(row.details).team_name}</TableCell>}
              <TableCell align="right">{new Date(row.time_sent).toDateString()}</TableCell>
              
              <TableCell align="right"><IconButton onClick={() => handleAccept(row.id, row.details)}>
                                        <CheckIcon/></IconButton></TableCell>
              <TableCell align="right"><IconButton onClick={() => handleDeny(row.id)}>
                                        <ClearIcon/></IconButton></TableCell>
            </TableRow>
          ))}
          {showInvites.accepted && invites.acceptedInvites && invites.acceptedInvites.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'lightgreen' }}
            >
              <TableCell component="th" scope="row">
                {row.sender__username}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              {row.details && 
              <TableCell align="right">{JSON.parse(row.details).team_name}</TableCell>}
              <TableCell align="right">{new Date(row.time_sent).toDateString()}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
          {showInvites.denied && invites.deniedInvites && invites.deniedInvites.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'red' }}
            >
              <TableCell component="th" scope="row">
                {row.sender__username}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              {row.details && 
              <TableCell align="right">{JSON.parse(row.details).team_name}</TableCell>}
              <TableCell align="right">{new Date(row.time_sent).toDateString()}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Grid>
      </div>}
      {showSection.showInvitationHistory && <div>
      <Grid item>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:'bold'}}>
                <TableSortLabel
                active={orders.historyOrderBy === 'sport_hall__title'}
                direction= {orders.historyOrder}
                onClick={() => handleHistorySort(orders.historyOrder, 'sport_hall__title')}>
                    Ime sale:
                </TableSortLabel>
            </TableCell>
             <TableCell sx={{fontWeight:'bold'}} align="right">
                <TableSortLabel
                active={orders.historyOrderBy === 'team_id__permanentteams__team_name'}
                direction= {orders.historyOrder}
                onClick={() => handleHistorySort(orders.historyOrder, 'team_id__permanentteams__team_name')}>
                    Ime tima: 
                </TableSortLabel>
             </TableCell>
            <TableCell sx={{fontWeight:'bold'}} align="right">
                <TableSortLabel
                active={orders.historyOrderBy === 'time_appointed'} 
                direction = {orders.historyOrder}
                onClick={() => handleHistorySort(orders.historyOrder, 'time_appointed')}>
                    Vrijeme:
                </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {gamesPlayed && gamesPlayed.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'lightgray' }
            }
            >
              <TableCell component="th" scope="row">
                {row.hall_name}
              </TableCell>
              <TableCell align="right">{row.team_name}</TableCell>
              <TableCell align="right">{new Date(row.time_appointed).toDateString()}</TableCell>
            </TableRow>
        ))}
        </TableBody>
      </Table>
      </Grid>
      </div>}
      {showSection.showFriends && <div>
      <Grid item>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:'bold'}}>
            <TableSortLabel
                active={orders.friendsOrderBy === 'user2__username'} 
                direction = {orders.friendsOrder}
                onClick={() => handleFriendsSort(orders.friendsOrder, 'user2__username')}>
                    Ime prijatelja:
                </TableSortLabel></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {friends && friends.map((friends) => (
            <TableRow
              key={friends.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {friends.user2__username}
              </TableCell>
              <TableCell align='right'>
                <IconButton onClick={() => handleFriendDelete(friends.id)}><DeleteIcon/></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Grid>
      </div>}
        </Paper>
    </Grid>
  )
}

export default UserProfile
