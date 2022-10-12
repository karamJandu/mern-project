import { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "./components/AppBar";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { Container } from "@mui/material";

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = () => {
    axios
      .get("http://localhost:5000/transaction")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => fetchTransactions, []);

  return (
    <div>
      <AppBar />;
      <Container>
        <TransactionForm fetchTransactions={fetchTransactions} />
        <TransactionList
          transactions={transactions}
          fetchTransactions={fetchTransactions}
        />
      </Container>
    </div>
  );
}

export default App;
