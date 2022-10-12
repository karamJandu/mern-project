import { useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const TransactionForm = ({ fetchTransactions }) => {
  const initialForm = {
    amount: "",
    description: "",
    date: new Date(),
  };

  const [formData, setFormData] = useState(initialForm);

  const formDataHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDate = (selectedDate) => {
    setFormData({ ...formData, date: selectedDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/transaction", {
        amount: formData.amount,
        description: formData.description,
        date: formData.date,
      })
      .then((response) => {
        fetchTransactions();
      })
      .catch((error) => console.log(error));

    // set the form data again
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
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
