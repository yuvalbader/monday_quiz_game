import React from "react";
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';



const LandingPage = (prop) => {

  let name = ''
    return (
        <Box display="flex" 
        width={500} height={80} 
        bgcolor="lightblue"
        justifyContent="center">
        <div> 
            <label>Please enter your name</label>
            <TextField id="filled-basic" label="Name" variant="filled" onChange={(ev)=>{name = ev.value}} />
            <Button variant="contained" color="primary" onClick={() => { alert(name + " clikced") }}> 
              Submit
      </Button>

        </div>
        </Box>
        )
}

export default LandingPage; 