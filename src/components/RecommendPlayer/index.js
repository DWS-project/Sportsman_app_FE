import React, { useState } from 'react'
import useStyles from './styles';
import { Avatar, Button, Card, CardActions, CardContent, CardMedia, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Cookies from 'js-cookie';
import { COOKIE_AUTHENTICATION_FE } from 'src/constants/keys/browser';
import { ArrowBack, ArrowBackIosTwoTone, ArrowForwardIosTwoTone, ChevronLeft, ChevronLeftRounded, ChevronLeftTwoTone, ChevronRight, ChevronRightRounded } from '@mui/icons-material';

const recommendPlayer = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const classes = useStyles();

    const cookie = Cookies.get(COOKIE_AUTHENTICATION_FE);
    const cookie_data = JSON.parse(cookie);
    console.log(cookie_data);
    const interests_field = JSON.parse(cookie_data.interests);
    const interests = interests_field.interests;
    console.log(interests)
    const handleCityChange = () =>{
        console.log('oke');
    }

    const handleInterestChange = () =>{
        console.log('oke');
    }

    return (
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box 
          className = {classes.boxStyle}
          
          >
            <Paper elevation={3}>
            <Grid container justifyContent={'space-between'} p={3}>
            <Grid item>
            <FormControl>
            <InputLabel>City</InputLabel>
                <Select
                defaultValue= {cookie_data.city}
                onChange={handleCityChange}
                label="Sarajevo"
                >
                    <MenuItem value={cookie_data.city}>{cookie_data.city}</MenuItem>
                    <MenuItem value='grad'>Da</MenuItem>
                    <MenuItem value='ok'>ok</MenuItem>

                </Select>
            </FormControl>
            </Grid>
            <Grid item>
            <FormControl>
                <InputLabel>Interest</InputLabel>
                <Select
                defaultValue= {interests[0]}
                label= {interests[0]}
                onChange={handleInterestChange}
                >
                    {interests.map(item => (
                        <MenuItem value={item}>{item}</MenuItem>
                    ))}

                </Select>
            </FormControl>
            </Grid>
            <Grid item>
            <TextField
                label="Broj godina"
                type="number"
                defaultValue={cookie_data.age}
                sx={{width:"50%"}}
              />
            </Grid>
            </Grid>
            <Button fullWidth sx = {{bgcolor:'blue', color:'white'}}>
                FIND PLAYERS
            </Button>
            
           
                        
                <Grid container alignItems={'center'} justifyContent={'space-evenly'} my={3} pb={3} spacing={2}>
                <Grid item>
                    <Button sx={{color:'blue'}}>
                        <ArrowBackIosTwoTone />
                    </Button>
                </Grid>
                 <Grid item>
                    <Card>
                    <Box
                    display= {'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    padding={'20px'}
                    >
                    <CardMedia>
                    <Avatar>
                        H
                    </Avatar>
                    </CardMedia>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Lizard
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Pozovi</Button>
                </CardActions>
                </Box>
                </Card>
                </Grid>
                <Grid item>
                    <Card>
                    <Box
                    display= {'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    padding={'20px'}
                    >
                    <CardMedia>
                    <Avatar>
                        H
                    </Avatar>
                    </CardMedia>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Lizard
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Pozovi</Button>
                </CardActions>
                </Box>
                </Card>
                </Grid>
                <Grid item>
                    <Card>
                    <Box
                    display= {'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    padding={'20px'}>
                    <CardMedia>
                    <Avatar>
                        H
                    </Avatar>
                    </CardMedia>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Lizard
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Pozovi</Button>
                </CardActions>
                </Box>
                </Card>
                </Grid>
                <Grid item>
                <Button sx={{color:'blue'}}>
                        <ArrowForwardIosTwoTone />
                    </Button>
                </Grid>
      </Grid>
      </Paper>
          </Box>
        </Modal>
      </div>
    );
}

export default recommendPlayer
