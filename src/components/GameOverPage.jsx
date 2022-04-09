import React, { useContext } from "react";
import UserContext from "../context/userContext";
import LeaderBoardTable from "../components/LeaderBoardTable";
import MystatisticsTable from "../components/MyStatisticsTable";
import { getAllUsersFromLocalStorage } from "../services/localStorageService";

const GameOverPage = (prop) => {
  const myUser = useContext(UserContext);
  const allUsers = getAllUsersFromLocalStorage();
  return (
    <div class="game-over-page">
      {myUser && allUsers && (
        <div class="game-over-tables">
          <div class="boardSection">
            <LeaderBoardTable users={allUsers}></LeaderBoardTable>
          </div>
          <div class="boardSection">
            <MystatisticsTable user={myUser}> </MystatisticsTable>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameOverPage;
