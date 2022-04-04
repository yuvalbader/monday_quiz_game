import React, {useState, useContext} from "react";
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import UserContext, {UserProvider} from "../context/userContext"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";



const LandingPage = (prop) => {
    const [name,setName] = useState('')

    const changeUser = useContext(UserContext).changeUser
    
    return (
        <Box display="flex" 
        width={500} height={80} 
        bgcolor="lightblue"
        justifyContent="center">
        <div> 
            <label>Please enter your name {name}</label>
            <TextField id="filled-basic" label="Name" variant="filled" onChange={(e) => {setName(e.target.value) }} />
            <Link to="/quiz" ><Button variant="contained" color="primary" onClick={()=>{changeUser({userName: name})}}>Submit</Button>  </Link>


        </div>
        </Box>
        )
}

export default LandingPage; 