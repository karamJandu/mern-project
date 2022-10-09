import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: 0,
    description: "",
    date: "",
  });

  const fetchTransactions = async () => {
    axios
      .get("http://localhost:5000/transaction")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => fetchTransactions, []);

  const formDataHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        setTransactions([...transactions, response.data]);
      })
      .catch((error) => console.log(error));

    // set the form data again
    setFormData({
      amount: 0,
      description: "",
      date: "",
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter transaction amount"
          onChange={formDataHandler}
          name="amount"
          value={formData.amount}
        />
        <input
          type="text"
          placeholder="Enter description details"
          onChange={formDataHandler}
          name="description"
          value={formData.description}
        />
        <input
          type="date"
          onChange={formDataHandler}
          name="date"
          value={formData.date}
        />
        <button type="submit">Submit</button>
      </form>
      <br />
      <section>
        <table>
          <thead>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.amount}</td>
                <td>{transaction.description}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
