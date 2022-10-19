import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const TransactionForm = ({
  fetchTransactions,
  editTransaction,
  setEditTransaction,
}) => {
  const initialForm = {
    amount: "",
    description: "",
    date: new Date(),
  };

  const [formData, setFormData] = useState(initialForm);

  const formDataHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData({
      amount: editTransaction.amount,
      description: editTransaction.description,
      date: editTransaction.date,
    });
  }, [editTransaction]);

  const handleDate = (selectedDate) => {
    setFormData({ ...formData, date: selectedDate });
  };

  const clearHandler = () => {
    setFormData(initialForm);
    setEditTransaction(initialForm);
  };

  const updateTransaction = () => {
    axios
      .put(`http://localhost:5000/transaction/${editTransaction.id}`, formData)
      .then((response) => {
        setEditTransaction(initialForm);
        fetchTransactions();
      })
      .catch((err) => console.error(err));
  };

  const addTransaction = () => {
    if (formData.amount === "" || formData.description === "") return;
    axios
      .post("http://localhost:5000/transaction", formData)
      .then((response) => {
        fetchTransactions();
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTransaction.amount !== "" ? updateTransaction() : addTransaction();
    setFormData(initialForm);
  };

  return (
    <Card sx={{ minWidth: 275, marginTop: 3 }}>
      <CardContent>
        <Typography variant="h6">Add New Transaction</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            name="amount"
            onChange={formDataHandler}
            value={formData.amount}
          />
          <TextField
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            label="Description"
            variant="outlined"
            name="description"
            onChange={formDataHandler}
            value={formData.description}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              inputForm="MM/DD/YYYY"
              onChange={handleDate}
              value={formData.date}
              renderInput={(params) => (
                <TextField
                  sx={{ marginRight: 5 }}
                  name="date"
                  size="small"
                  {...params}
                />
              )}
            ></DesktopDatePicker>
          </LocalizationProvider>
          <Button type="submit" variant="contained" sx={{ marginRight: 5 }}>
            Submit
          </Button>
          <Button type="button" onClick={clearHandler} variant="contained">
            Clear
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
