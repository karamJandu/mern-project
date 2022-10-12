import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";

const TransactionList = ({ transactions, fetchTransactions }) => {
  const editHandler = (key) => {
    console.log(key);
  };

  const deleteHandler = (key) => {
    if (!window.confirm("Are you sure to delete this transaction?")) return;
    axios
      .delete(`http://localhost:5000/transaction/${key}`)
      .then((res) => {
        window.confirm(`Delete: ${res.data.message}`);
        fetchTransactions();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Typography variant="h6">List of Transactions</Typography>
      <TableContainer component={Paper} xs={{ marginTop: 10 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {transaction.amount}
                </TableCell>
                <TableCell component="th" scope="row">
                  {transaction.description}
                </TableCell>
                <TableCell component="th" scope="row">
                  {transaction.date}
                </TableCell>
                <TableCell component="th" scope="row">
                  <IconButton
                    color="primary"
                    component="label"
                    onClick={() => editHandler(transaction._id)}
                  >
                    <input hidden accept="image/*" type="file" />
                    <EditSharpIcon />
                  </IconButton>
                  <IconButton
                    color="warning"
                    onClick={() => deleteHandler(transaction._id)}
                  >
                    <DeleteSharpIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TransactionList;
