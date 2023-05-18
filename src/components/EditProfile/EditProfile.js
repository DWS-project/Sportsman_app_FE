import { Box, Button, FormControl, InputLabel, TextField } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const EditProfile = () => {
    const [user, setUser] = useState({
        username: "",
        name: "",
        surname: "",
        tel_number: "",
        city: "",
        age: "",
    });
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/user/player/2/")
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
    const handleSubmit = async (e) => {
        //e.preventDefault();
        await axios.post("http://127.0.0.1:8000/user/update/player/2/", user)
      }
    
      return (
    <Box 
    component= "form"
    sx = {{my : 3,
            display: 'flex',
            flexDirection: 'column',
            p: '2',
            width: '50%',
            alignItems: 'center',
            justifyContent:'center'}}>
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
        Update
      </Button>
    </Box>
  )
}


export default EditProfile