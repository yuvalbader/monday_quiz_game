import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem  from '@material-ui/core/ListItem';
 import ListItemIcon from '@material-ui/core/ListItemIcon';
 import FavoriteIcon from '@material-ui/icons/Favorite';

//import Div from '@material-ui/core/Div';



const QuizPage = (prop) => {

const [quastion,setQuastion] = useState('The quastion is ..........');
const [answer1,setAns1] = useState('Answer number 1');
const [answer2,setAns2] = useState('Answer number 2');
const [answer3,setAns3] = useState('Answer number 3');
const [answer4,setAns4] = useState('Answer number 4');

function updateQuastion(newQuastion){ 
setQuastion(newQuastion);
}

function updateAns1(newAns){ 
setAns1(newAns);
}


function updateAns2(newAns){ 
setAns2(newAns);
}

function updateAns3(newAns){ 
setAns3(newAns);
}

function updateAns4(newAns){ 
setAns4(newAns);
}

    return (
        <div>
        <Box className="Quastion Box" display="flex" 
        width={500} height={200} 
        bgcolor="blue"
        justifyContent="center">  
           <label> {quastion} </label>
        </Box>
            <Box className="Answers Box" display="flex" 
        width={500} height={250} 
        bgcolor="lightblue"
        justifyContent="center">
    

<List  component="nav" aria-label="mailbox folders">
    
           <ListItem > <Button variant="contained" color="primary" onClick={() => { alert("Ans 1 clikced") }}>{answer1}</Button> </ListItem >
           <ListItem > <Button variant="contained" color="primary" onClick={() => { alert("Ans 2 clikced") }}>{answer2}</Button>  </ListItem >
           <ListItem > <Button variant="contained" color="primary" onClick={() => { alert("Ans 3 clikced") }}>{answer3}</Button>  </ListItem >
           <ListItem > <Button variant="contained" color="primary" onClick={() => { alert("Ans 4 clikced") }}>{answer4}</Button>  </ListItem >
</List>
        </Box>

        
{/* <List><ListItem><ListItemIcon> <FavoriteIcon/> </ListItemIcon></ListItem></List>
<List><ListItem><ListItemIcon> <FavoriteIcon/> </ListItemIcon></ListItem></List>
<List><ListItem><ListItemIcon> <FavoriteIcon/> </ListItemIcon></ListItem></List> */}

        <Button variant="contained" color="primary" onClick={() => { alert("50/50 clicked") }}>50/50</Button>
        <Button variant="contained" color="primary" onClick={() => { alert("Next Quastion clicked") }}>Next quastion</Button>


        
</div>

        )
}

export default QuizPage; 