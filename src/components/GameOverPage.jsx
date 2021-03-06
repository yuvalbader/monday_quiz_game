import React, { useContext } from "react";
import UserContext from "../context/userContext";
import LeaderBoardTable from "../components/LeaderBoardTable";
import MystatisticsTable from "../components/MyStatisticsTable";
import { getAllUsersFromLocalStorage } from "../services/localStorageService";
import { Link } from "react-router-dom";

const GameOverPage = (prop) => {
  const myUser = useContext(UserContext);
  const allUsers = getAllUsersFromLocalStorage();
  return (
    <div className="game-over-page">
      {myUser && allUsers && (
        <div className="game-over-tables">
          <div className="boardSection">
            <LeaderBoardTable users={allUsers}></LeaderBoardTable>
          </div>
          <div className="board-section">
            <MystatisticsTable user={myUser}> </MystatisticsTable>
          </div>          
        </div>
      )}
    </div>
  );
};

export default GameOverPage;
