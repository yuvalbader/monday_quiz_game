import React, { useState } from "react";
import WelcomePage from "../components/welcomePage";
import QuizPage from "../components/QuizPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameOverPage from "../components/GameOverPage";
import { UserProvider } from "../context/userContext";

const AppContainer = (prop) => {
  const [user, setUser] = useState({});
  const providerOptions = {
    data: user,
    changeUser: (value) => setUser(value),
  };
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <UserProvider value={providerOptions}>
              <WelcomePage />
            </UserProvider>
          }
        />
        <Route
          path="/welcome"
          element={
            <UserProvider value={providerOptions}>
              <WelcomePage />
            </UserProvider>
          }
        />
        <Route
          path="/quiz"
          element={
            <UserProvider value={providerOptions}>
              <QuizPage />
            </UserProvider>
          }
        />
        <Route
          path="/gameOver"
          element={
            <UserProvider value={providerOptions}>
              <GameOverPage />
            </UserProvider>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppContainer;
