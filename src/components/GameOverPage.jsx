import React, {useState, useContext} from "react";
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import UserContext from "../context/userContext";




const GameOverPage = (prop) => {

    const user = useContext(UserContext)
    console.log(user)
    return <div>Game Over!! </div>
}

export default GameOverPage;