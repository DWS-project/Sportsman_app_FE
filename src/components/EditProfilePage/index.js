import axios from 'axios'
import { Avatar, Box, Button, Divider, Grid, List, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, Paper, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

export const EditProfilePage = () => {
  
  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center"
  };

  const [editInfo, setEditInfo] = useState(true);
  const [editPassword, setEditPassword] = useState(false);
  const [editPhoto, setEditPhoto] = useState(false);

  const [user, setUser] = useState({
    username: "",
    name: "",
    surname: "",
    tel_number: "",
    city: "",
    age: "",
  });

  const [password, setPassword] = useState({
    password1: "",
    password2: "",
    password3: "",
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/player/2/")
    .then(response => 
        {
        console.log(response.data[0]);
        console.log(response.data[0].username);
        const data = response.data[0];
        setUser({
            username: data.username,
            name: data.name,
            surname: data.surname,
            tel_number: data.tel_number,
            city: data.city,
            age: data.age,
        });
        })
    .catch(error => {
    console.error(error);
    });
  }, []);

  const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.post("http://127.0.0.1:8000/update/player/2/", user);
      alert("Uspješno ste ažurirali podatke");
  }
  const handleClick = (key) => {
    if(key === 1){
      setEditInfo(false);
      setEditPassword(false);
      setEditPhoto(true);
    }
    else if(key === 2){
      setEditInfo(true);
      setEditPassword(false);
      setEditPhoto(false);
    }
    else{
      setEditInfo(false);
      setEditPassword(true);
      setEditPhoto(false); 
    }
};
  return (
  <Grid container justifyContent={"center"} alignItems={"center"}>
    <Grid item xs={12} md={4}>
    <List sx={style} component="nav" aria-label="mailbox folders" 
    subheader={<ListSubheader>Ažuriraj profil</ListSubheader>}
    >
      
      <ListItemAvatar>
          <Avatar alt="Image" src="https://jectossi.sirv.com/Rectangle%2010.png"
          sx={{borderRadius:"50%", width:"100px", height:"100px"}}/>
      </ListItemAvatar>
      
    <div key = {1}>
      <ListItemButton onClick={() => handleClick(1)}>
        <ListItemText primary="Promijeni profilnu sliku"/>
      </ListItemButton>
      <Divider/>
    </div>
    
    <div key = {2}>
      <ListItemButton onClick={() => handleClick(2)}>
        <ListItemText primary="Promijeni lične podatke"/>
      </ListItemButton>
      <Divider/>
    </div>
    <div key = {3}>
      <ListItemButton onClick={() => handleClick(3)}>
        <ListItemText primary="Promijeni password"/>
      </ListItemButton>
      <Divider/>
    </div>
    </List>
    </Grid>
    <Grid item xs={12} md={8}>
      {editInfo && 
      <Paper elevation={3} sx={{width:"70%"}}>
      <Box 
    component= "form"
    display={"flex"}
    flexDirection={"column"}
    padding={2}
    >
        <TextField
        label="Username"
        variant="outlined"
        
        value= {user.username}
        name = "username"
        onChange={handleChange}
        margin='normal'
        fullWidth
        size='small'
      /> 
      <TextField
        label="First name"
        variant="outlined"
        value={user.name}
        name = "name"
        onChange={handleChange}
        margin='normal'
        fullWidth
        size='small'
      />
      <TextField
        label="Last name"
        variant="outlined"
        value={user.surname}
        name = "surname"
        onChange={handleChange}
        margin='normal'
        fullWidth
        size='small'
      />
      <TextField
        label="Telephone number"
        variant="outlined"
        value={user.tel_number}
        name = "tel_number"
        onChange={handleChange}
        margin='normal'
        fullWidth
        size='small'
      />
      <TextField
        label="City"
        variant="outlined"
        value={user.city}
        name = "city"
        onChange={handleChange}
        margin='normal'
        fullWidth
        size='small'
      />
      <TextField
        label="Age"
        variant="outlined"
        value={user.age}
        name = "age"
        onChange={handleChange}
        margin='normal'
        fullWidth
        size='small'
      />
      
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Ažuriraj
      </Button>
    </Box>
      </Paper>}
      {editPassword && 
      <Paper elevation={3} sx={{width:"70%"}}>
      <Box 
    component= "form"
    display={"flex"}
    flexDirection={"column"}
    padding={2}
    >
      <h3>Ukucajte novu šifru</h3>
        <TextField
        label="Enter password"
        variant="outlined"
        placeholder='********'
        name = "password1"
        onChange={handlePasswordChange}
        margin='normal'
        fullWidth
        size='small'
      />
      <h3>Potvrdite vašu novu šifru</h3>
        <TextField
        label="Confirm password"
        variant="outlined"
        placeholder='********'
        name = "password2"
        onChange={handlePasswordChange}
        margin='normal'
        fullWidth
        size='small'
      /> 
      <h3>Ukucajte staru šifru da biste potvrdili promjenu</h3>
        <TextField
        label="Enter old password"
        variant="outlined"
        placeholder='********'
        name = "password3"
        onChange={handlePasswordChange}
        margin='normal'
        fullWidth
        size='small'
      /> 
      
      
      
      
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Ažuriraj
      </Button>
    </Box>
      </Paper>}
    </Grid>
  
  </Grid>

  )
}