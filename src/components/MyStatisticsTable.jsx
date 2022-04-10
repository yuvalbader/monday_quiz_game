import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function MyStatisticsTable(props) {
  const myUser = props.user;

  return (
    <div>
      <Table className="game-stats-table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan="2">
              Last game statistics:
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th">Name</TableCell>
            <TableCell align="right"> {myUser.data.name} </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">Score</TableCell>
            <TableCell align="right"> {myUser.data.score} </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">No. of Questions</TableCell>
            <TableCell align="right">{myUser.data.numberOfQuestions}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">No. of Correct Answers</TableCell>
            <TableCell align="right">
              {myUser.data.numberOfCorrectAnswers}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">No. of Wrong Answers</TableCell>
            <TableCell align="right">
              {myUser.data.numberOfWrongtAnswers}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">Correct Answers %</TableCell>
            <TableCell align="right">
              {parseFloat(
                (100 * myUser.data.numberOfCorrectAnswers) /
                  myUser.data.numberOfQuestions
              ).toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">Total Playing Time</TableCell>
            <TableCell align="right">{myUser.data.totalTimeOfAnswer}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Avg. Answer Time</TableCell>
            <TableCell align="right">
              {parseFloat(
                myUser.data.totalTimeOfAnswer / myUser.data.numberOfQuestions
              ).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
