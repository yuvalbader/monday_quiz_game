import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import UserContext, { UserProvider } from "../context/userContext";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const WelcomePage = (prop) => {
  const [userName, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isUserEnterName, setIsUserEnterName] = useState(false);
  const [isUserChooseDifficulty, setIsUserChooseDifficulty] = useState(false);

  const user = {
    name: userName,
    difficulty: difficulty,
  };

  const changeUser = useContext(UserContext).changeUser;

  return (
    <div className="welcome-page">
      <h1 className="home-page-title">Welcome to my Quiz - Game</h1>
      <Box className="user-details">
        <UserProvider value={user}>
          <label className="enter-name-msg">Please enter your name </label>
          <TextField
            id="filled-basic"
            variant="filled"
            label="Name"
            onChange={(e) => {
              setName(e.target.value);
              setIsUserEnterName(true);
            }}
          />
          <InputLabel>Please choose difficulty</InputLabel>
          <Select
            value={difficulty}
            label="Difficulty"
            onChange={(e) => {
              setDifficulty(e.target.value);
              setIsUserChooseDifficulty(true);
            }}
          >
            <MenuItem value={"easy"}>Easy</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"hard"}>hard</MenuItem>
          </Select>
          {isUserChooseDifficulty && isUserEnterName && (
            <Link to="/quiz">
              <button
                className="submit-btn"
                onClick={() => {
                  changeUser({
                    name: userName,
                    difficulity: difficulty,
                    numberOfQuestions: 0,
                    numberOfCorrectAnswers: 0,
                    numberOfWrongtAnswers: 0,
                    totalTimeOfAnswer: 0,
                    score: 0,
                  });
                  if (!isUserChooseDifficulty || !isUserEnterName) {
                    alert("Please choose name and dif");
                  }
                }}
              >
                Submit
              </button>
            </Link>
          )}
          {(!isUserChooseDifficulty || !isUserChooseDifficulty) && (
            <button
              className="submit-btn"
              onClick={() => {
                alert(
                  "Don't hurry! Please enter a Name and select a Difficulty level 😊"
                );
              }}
            >
              Submit
            </button>
          )}
        </UserProvider>
      </Box>
      <Box className="game-rules">
        <h1 className="rules-title"> Game rules:</h1>
        <List>
          <ListItem># You have 5 lives </ListItem>
          <ListItem># You have 30 seconds to answer each question</ListItem>
          <ListItem># Wrong answer / time out will take you life </ListItem>
          <ListItem>
            # The score for each question starts from 100 points and decreases
            with time - the faster you answer, the more points you will get
          </ListItem>
          <ListItem>
            # You have two helpers available - 50/50 and skip a question. You
            can use each one once
          </ListItem>
        </List>
      </Box>
    </div>
  );
};

export default WelcomePage;
