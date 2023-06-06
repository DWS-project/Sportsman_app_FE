import { Button, Divider, Grid, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { Box, bgcolor } from '@mui/system'
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { BASE_BACKEND_URL } from 'src/constants/endpoints';
import { COOKIE_AUTHENTICATION_FE } from 'src/constants/keys/browser';
import withMainFrame from 'src/hoc/withMainFrame';
import useStyles from './styles';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

const UserProfile = () => {

    const [showInvitations, setShowinvitations] = useState(true);
    const [showInvitationHistory, setShowInvitationHistory] = useState(false);
    const [showFriends, setShowFriends] = useState(false);
    const [rows, setRows] = useState('');
    const [acceptedInvites, setAcceptedInvites] = useState('');
    const [deniedInvites, setDeniedInvites] = useState('');
    const [onHoldInvites, setOnHoldInvites] = useState('');
    const [showAcceptedInvites, setShowAcceptedInvites] = useState(false)
    const [showDeniedInvites, setShowDeniedInvites] = useState(false)
    const [showOnHoldInvites, setShowOnHoldInvites] = useState(true)
    const [activeButton, setActiveButton] = useState(1);
    const [friends, setFriends] = useState('');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('sender__username');
    const [historyOrder, setHistoryOrder] = useState('asc');
    const [historyOrderBy, setHistoryOrderBy] = useState('hall_name');
    const [friendsOrder, setFriendsOrder] = useState('asc');
    const [friendsOrderBy, setFriendsOrderBy] = useState('user2__username');
    const [gamesPlayed, setgamesPlayed] = useState([]);

    const cookie = Cookies.get(COOKIE_AUTHENTICATION_FE);
    const cookie_data = JSON.parse(cookie);
    const id = cookie_data.id;

    const handleClick = (key) => {
        if (key === 1) {
            setActiveButton(1)
            setShowinvitations(true);
            setShowInvitationHistory(false);
            setShowFriends(false);
        }
        else if (key === 2) {
            setActiveButton(2)
            setShowinvitations(false);
            setShowInvitationHistory(true);
            setShowFriends(false);
        } 
        else if (key === 3) {
            setActiveButton(3)
            setShowinvitations(false);
            setShowInvitationHistory(false);
            setShowFriends(true);
        }
    }
    const handleInvitationsSort = (order, column) =>{
        const isAsc = orderBy === column && order === 'asc'
        setOrder(isAsc ? 'desc': 'asc')
        setOrderBy(column);
        let status = 0;
        if(showOnHoldInvites){
            status = 0;
        }
        else if(showAcceptedInvites){
            status = 1;
        }
        else {
            status = 2;
        }
        const data = {
            'column': column,
            'order': order,
            'status': status,
        }
        axios.get(`${BASE_BACKEND_URL}/player/sort-invitations/${id}`, {
            params: data
        })
        .then(response => 
            {
            const data = response.data;
            if(data[0].status === 0) {
                setOnHoldInvites(data);
            }
            else if(data[0].status === 1) {
                setAcceptedInvites(data);
            }
            else if (data[0].status === 2){
                setDeniedInvites(data);
            } 
            })
        .catch(error => {
        console.error(error);
        });
    }

    const handleHistorySort = (order, column) =>{
        const isAsc = historyOrderBy === column && order === 'asc'
        setHistoryOrder(isAsc ? 'desc': 'asc')
        setHistoryOrderBy(column);
        const data = {
            'column': column,
            'order': order,
        }
        console.log(data);
        axios.get(`${BASE_BACKEND_URL}/player/sort-history/${id}`, {
            params: data
        })
        .then(response => 
            {
            const data = response.data;
            setgamesPlayed(data);
            })
        .catch(error => {
            console.error(error);
        });
    }

    const handleFriendsSort = (order, column) =>{
        const isAsc = friendsOrderBy === column && order === 'asc'
        setFriendsOrder(isAsc ? 'desc': 'asc')
        setFriendsOrderBy(column);
        const data = {
            'column': column,
            'order': order,
        }
        axios.get(`${BASE_BACKEND_URL}/player/sort-friends/${id}`, {
            params: data
        })
        .then(response => 
            {
            const data = response.data;
            setFriends(data);
            })
        .catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        axios.get(`${BASE_BACKEND_URL}/player/invitations/${id}`)
        .then(response => 
            {
            const data = response.data;
            setRows(data);
            const accepted = data.filter(data => data.status === 1);
            setAcceptedInvites(accepted);
            const denied = data.filter(data => data.status === 2);
            setDeniedInvites(denied);
            const onHold = data.filter(data => data.status === 0)
            setOnHoldInvites(onHold);
            })
        .catch(error => {
        console.error(error);
        });
      }, []);

    useEffect(() => {
        axios.get(`${BASE_BACKEND_URL}/player/friends/${id}`)
        .then(response => 
            {
            const data = response.data;
            setFriends(data);
            })
        .catch(error => {
        console.error(error);
        });
      }, []);

      useEffect(() => {
        axios.get(`${BASE_BACKEND_URL}/player/games/${id}`)
        .then(response => 
            {
            const data = response.data;
            setgamesPlayed(data);
            })
        .catch(error => {
        console.error(error);
        });
      }, []);

    const handleFriendDelete = async (friend_id) => {
        const updated_friends = friends.filter((friends) => friends.id !== friend_id);
        await axios.delete(`${BASE_BACKEND_URL}/player/delete-friend/${friend_id}`)
        setFriends(updated_friends);
    }
    const handleShowingInvites = (invites) => {
        if (invites === 'prihvaceni') {
            setShowAcceptedInvites(true);
            setShowDeniedInvites(false);
            setShowOnHoldInvites(false)
        }
        else if (invites === 'odbijeni') {
            setShowAcceptedInvites(false);
            setShowDeniedInvites(true);
            setShowOnHoldInvites(false)
        }
        else if (invites === 'nacekanju') {
            setShowAcceptedInvites(false);
            setShowDeniedInvites(false);
            setShowOnHoldInvites(true);
        }
    }

    const handleAccept = async (rowId) => {
        const data = {
            'status': 1,
        }
        await axios.put(`${BASE_BACKEND_URL}/player/update-invitation-status/${rowId}`, data);
        const acceptedRow = onHoldInvites.find(row => row.id === rowId);
        acceptedRow.status = 1;
        const updatedInvites = onHoldInvites.filter(row => row.id !== rowId);
        setOnHoldInvites(updatedInvites);
        setAcceptedInvites(prevAcceptedInvites => [...prevAcceptedInvites, acceptedRow]);  
    }

    const handleDeny = async (rowId) => {
        const data = {
            'status': 2,
        }
        await axios.put(`${BASE_BACKEND_URL}/player/update-invitation-status/${rowId}`, data);
        const deniedRow = onHoldInvites.find(row => row.id === rowId);
        deniedRow.status = 2;
        const updatedInvites = onHoldInvites.filter(row => row.id !== rowId);
        setOnHoldInvites(updatedInvites);
        setDeniedInvites(prevDeniedInvites => [...prevDeniedInvites, deniedRow]);  
    }
  return withMainFrame(
    <Grid container direction={'column'} mt={7} p={3} justifyContent={'center'} alignItems={'center'}>
        <Paper elevation={4} sx={{width:'80%', height:'400px'}}>
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
                            ...(activeButton === 1 ? { backgroundColor: '#43bbbf' } : {})
                          }}
                        >Termini</Button>
                <Button key={2} 
                        variant='outlined'
                         fullWidth
                         onClick={() => handleClick(2)}
                         sx={{
                            ...(activeButton === 2 ? { backgroundColor: '#43bbbf' } : {})
                          }}
                         >Historija</Button>
                <Button key={3} 
                        variant='outlined'
                        fullWidth
                        onClick={() => handleClick(3)}
                        sx={{
                            ...(activeButton === 3 ? { backgroundColor: '#43bbbf' } : {})
                          }}
                        >Prijatelji</Button>
            </Box>
            </Grid>
            {showInvitations && 
            <div>
            <Grid item>
            <Box
            display={'flex'}
            justifyContent={'space-evenly'}
            bgcolor='lightblue'
            >
            <Button variant='text' sx={{color:'darkgreen'}} onClick={() => handleShowingInvites('prihvaceni')}>Prihvaceni</Button>
            <Button variant='text' sx={{color:'red'}} onClick={() => handleShowingInvites('odbijeni')}>Odbijeni</Button>
            <Button variant='text' sx={{color:'blue'}} onClick={() => handleShowingInvites('nacekanju')}>Na čekanju</Button>
            </Box>
            </Grid>
        <Grid item>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:'bold'}}>
                <TableSortLabel
                active={orderBy === 'sender__username'}
                direction= {order}
                onClick={() => handleInvitationsSort(order, 'sender__username')}>
                    Pozvao:
                </TableSortLabel>
            </TableCell>
            <TableCell sx={{fontWeight:'bold'}} align="right">
                <TableSortLabel
                active={orderBy === 'type'}
                direction= {order}
                onClick={() => handleInvitationsSort(order, 'type')}>
                    Tip tima: 
                </TableSortLabel>
             </TableCell>
             <TableCell sx={{fontWeight:'bold'}} align="right">
                <TableSortLabel
                active={orderBy === 'details'}
                direction= {order}
                onClick={() => handleInvitationsSort(order, 'details')}>
                    Ime tima: 
                </TableSortLabel>
             </TableCell>
            <TableCell sx={{fontWeight:'bold'}} align="right">
                <TableSortLabel
                active={orderBy === 'time_sent'} 
                direction = {order}
                onClick={() => handleInvitationsSort(order, 'time_sent')}>
                    Vrijeme:
                </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {showOnHoldInvites && onHoldInvites && onHoldInvites.map((row) => (
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
              
              <TableCell align="right"><IconButton onClick={() => handleAccept(row.id)}>
                                        <CheckIcon/></IconButton></TableCell>
              <TableCell align="right"><IconButton onClick={() => handleDeny(row.id)}>
                                        <ClearIcon/></IconButton></TableCell>
            </TableRow>
          ))}
          {showAcceptedInvites && acceptedInvites && acceptedInvites.map((row) => (
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
          {showDeniedInvites && deniedInvites && deniedInvites.map((row) => (
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
      {showInvitationHistory && <div>
      <Grid item>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:'bold'}}>
                <TableSortLabel
                active={historyOrderBy === 'hall_name'}
                direction= {historyOrder}
                onClick={() => handleHistorySort(historyOrder, 'hall_name')}>
                    Ime sale:
                </TableSortLabel>
            </TableCell>
             <TableCell sx={{fontWeight:'bold'}} align="right">
                <TableSortLabel
                active={historyOrderBy === 'team_id__permanentteams__team_name'}
                direction= {historyOrder}
                onClick={() => handleHistorySort(historyOrder, 'team_id__permanentteams__team_name')}>
                    Ime tima: 
                </TableSortLabel>
             </TableCell>
            <TableCell sx={{fontWeight:'bold'}} align="right">
                <TableSortLabel
                active={historyOrderBy === 'time_appointed'} 
                direction = {historyOrder}
                onClick={() => handleHistorySort(historyOrder, 'time_appointed')}>
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
      {showFriends && <div>
      <Grid item>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:'bold'}}>
            <TableSortLabel
                active={friendsOrderBy === 'user2__username'} 
                direction = {friendsOrder}
                onClick={() => handleFriendsSort(friendsOrder, 'user2__username')}>
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