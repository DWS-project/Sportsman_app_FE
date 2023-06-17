import React, { useState } from 'react'
import useStyles from './styles';
import { Avatar, Button, Card, CardActions, CardContent, CardMedia, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Cookies from 'js-cookie';
import { COOKIE_AUTHENTICATION_FE } from 'src/constants/keys/browser';
import { ArrowBackIosTwoTone, ArrowForwardIosTwoTone } from '@mui/icons-material';
import { BASE_BACKEND_URL, GET_PLAYER } from 'src/constants/endpoints';
import axios from 'axios';

const recommendPlayer = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const classes = useStyles();

    const cookie = Cookies.get(COOKIE_AUTHENTICATION_FE);
    const cookie_data = JSON.parse(cookie);
    const interests_field = JSON.parse(cookie_data.interests);
    const interests = interests_field.interests;

    const [players, setPlayers] = useState([])
    const [filterParameters, setFilterParameters] = useState({
        city: cookie_data.city,
        interests: interests[0],
        age: cookie_data.age
    })
    const [itemNumber, setItemNumber] = useState({
        startIndex: 0,
        endIndex: 3
    })

    async function fetchPlayers(){
        const response = await axios.get(`${GET_PLAYER}`, {
            params: filterParameters
        });
        setPlayers(response.data);
    }

    const handleCityChange = (value) =>{
        setFilterParameters({...filterParameters, city: value})
    }

    const handleInterestChange = (value) =>{
        setFilterParameters({...filterParameters, interests: value})
    }
    const handleAgeChange = (value) =>{
        setFilterParameters({...filterParameters, age: value})
    }
    const handleForwardClick = () => {
        setItemNumber(prevValue => (
            {
            ...prevValue,
            startIndex: prevValue.startIndex+3,
            endIndex: prevValue.endIndex+3
            }
        ))
    }
    const handleBackClick = () => {
        setItemNumber(prevValue => (
            {
            ...prevValue,
            startIndex: prevValue.startIndex-3,
            endIndex: prevValue.endIndex-3
            }
        ))
    }
    return (
      <div>
        <Button onClick={handleOpen} sx={{bgcolor:'#43bbbf', color:'aliceblue'}}>PREPORUCI IGRACE</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box 
          className = {classes.boxStyle}
          >
            <Paper elevation={3} sx={{bgcolor:"#d3ebed"}}>
                <Grid container alignItems={'center'} direction={'column'}>
                    <Grid container item justifyContent={'space-evenly'} p={3} ml={7}>
                        <Grid item lg={4}>
                            <TextField
                            label="Grad"
                            type="text"
                            value={filterParameters.city}
                            sx={{width:"50%"}}
                            onChange={(event) => handleCityChange(event.target.value)}
                            />
                        </Grid>
                        <Grid item lg={4}>
                            <FormControl sx={{width:'55%'}}>
                                <InputLabel>Interest</InputLabel>
                                <Select
                                value= {filterParameters.interests}
                                label= 'Interest'
                                onChange={(event) => handleInterestChange(event.target.value)}
                                >
                                    {interests.map(item => (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={4}>
                            <TextField
                            label="Broj godina"
                            type="number"
                            value={filterParameters.age}
                            sx={{width:"50%"}}
                            onChange = {(event) => handleAgeChange(event.target.value)} 
                            />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button sx = {{bgcolor:'#43bbbf', color:'aliceblue', width:'535px', marginRight:'60px'}} onClick={fetchPlayers}>
                        NAĐI IGRAČE
                        </Button>
                    </Grid>
                    <Grid container item alignItems={'center'} justifyContent={'space-evenly'} my={3} pb={3} spacing={2}>
                        <Grid item>
                            {itemNumber.startIndex !== 0 && 
                            <Button sx={{color:'blue'}} onClick={handleBackClick}>
                                <ArrowBackIosTwoTone />
                            </Button>}
                        </Grid>
                        {players.slice(itemNumber.startIndex, itemNumber.endIndex).map(player => (
                        <Grid item>
                            <Card>
                                <Box
                                display= {'flex'}
                                flexDirection={'column'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                padding={'20px'}
                                >
                            <CardMedia>
                                <Avatar src={player.picture}/>
                            </CardMedia>
                            <CardContent>
                                <Box
                                display={'flex'}
                                flexDirection={'column'}
                                alignItems={'center'}>
                                    <Typography gutterBottom>
                                    {player.name} {player.surname}
                                    </Typography>
                                    <Typography gutterBottom>
                                    {player.age}
                                    </Typography>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small" sx={{bgcolor:'#43bbbf', color:'aliceblue'}}>
                                    Pozovi
                                </Button>
                            </CardActions>
                                </Box>
                            </Card>
                        </Grid>))}
                        <Grid item>
                            {itemNumber.endIndex < players.length &&
                            <Button sx={{color:'blue'}} onClick={handleForwardClick}>
                                <ArrowForwardIosTwoTone />
                            </Button>}
                        </Grid>
                    </Grid>
                    {players.length > 0 && 
                    <Grid item p={3}>
                        <Button size="small" sx={{bgcolor:'#43bbbf', color:'aliceblue', width:'535px', marginRight:'60px'}}>
                            Pozovi sve
                        </Button>
                    </Grid>
                    }
                </Grid>
            </Paper>
          </Box>
        </Modal>
      </div>
    );
}

export default recommendPlayer
