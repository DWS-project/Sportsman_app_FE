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

const UserProfile = () => {

    const [showInvitations, setShowinvitations] = useState(true);
    const [showInvitationHistory, setShowInvitationHistory] = useState(false);
    const [showFriends, setShowFriends] = useState(false);
    const [rows, setRows] = useState('');
    const [activeButton, setActiveButton] = useState(1);
    const [friends, setFriends] = useState('');
    const classes = useStyles();

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
    useEffect(() => {
        axios.get(`${BASE_BACKEND_URL}/player/invitations/${id}`)
        .then(response => 
            {
            const data = response.data;
            setRows(data);
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

    const handleFriendDelete = async (friend_id) => {
        const updated_friends = friends.filter((friends) => friends.id !== friend_id);
        await axios.delete(`${BASE_BACKEND_URL}/player/delete-friend/${friend_id}`)
        setFriends(updated_friends);
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
            <Button variant='text' sx={{color:'darkgreen'}}>Prihvaceni</Button>
            <Button variant='text' sx={{color:'red'}}>Odbijeni</Button>
            <Button variant='text' sx={{color:'blue'}}>Svi</Button>
            </Box>
            </Grid>
        <Grid item>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:'bold'}}>
                <TableSortLabel direction='asc'>
                    Pozvao:
                </TableSortLabel></TableCell>
            <TableCell sx={{fontWeight:'bold'}} align="right">
            <TableSortLabel direction='asc'>
                    Sportska sala: 
                </TableSortLabel>
             </TableCell>
            <TableCell sx={{fontWeight:'bold'}} align="right">
                <TableSortLabel direction='asc'>
                    Vrijeme:
                </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rows && rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.sender__username}
              </TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.time_sent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Grid>
      </div>}
      {showInvitationHistory && <div>
      <Grid item>
        <p>History</p>
      </Grid>
      </div>}
      {showFriends && <div>
      <Grid item>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:'bold'}}>
                <TableSortLabel direction='asc'>
                    Prijatelji:
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
                <IconButton onClick={() => handleFriendDelete(friends.id)}><ClearIcon/></IconButton>
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