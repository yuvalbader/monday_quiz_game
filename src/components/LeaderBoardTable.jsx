import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function LeaderBoardTable(props) {
  const users = props.users;
  const sortedUsers = users.sort((a, b) => b[1] - a[1]);

  return (
    <div>
      <Table class="all-time-leaders-table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colspan="2">
              All-Time Leaders
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers.map((userRow) => (
            <TableRow>
              <TableCell scope="row">{userRow[0]}</TableCell>
              <TableCell align="right">{userRow[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
