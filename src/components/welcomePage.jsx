import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import UserContext, { UserProvider } from "../context/userContext";
import { Link } from "react-router-dom";

const LandingPage = (prop) => {
  const [userName, setName] = useState("");

  const user = {
    name: userName,
  };

  const changeUser = useContext(UserContext).changeUser;

  return (
    <div class="welcome-page">
      <h1 class="home-page-title">Welcome to my game</h1>
      <Box class="user-details">
        <UserProvider value={user}>
          <label class="enter-name-msg">Please enter your name </label>
          <TextField
            id="filled-basic"
            variant="filled"
            label="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Link to="/quiz">
            <button
            class="submit-btn"
              // variant="contained"
              // color="primary"
              onClick={() => {
                changeUser({
                  userName: userName,
                  numberOfQuestions: 0,
                  numberOfCorrectAnswers: 0,
                  numberOfWrongtAnswers: 0,
                  totalTimeOfAnswer: 0,
                  score: 0,
                });
              }}
            >
              Submit
            </button>
          </Link>
        </UserProvider>
      </Box>
      <p>Game rules:******</p>
    </div>
  );
};

export default LandingPage;
