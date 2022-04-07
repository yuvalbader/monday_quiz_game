import React, { useContext } from "react";

import UserContext from "../context/userContext";

const GameOverPage = (prop) => {
  const user = useContext(UserContext);
  console.log(user);
  return <div>Game Over!! </div>;
};

export default GameOverPage;
