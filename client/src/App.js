import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    amount: 0,
    description: "",
    date: "",
  });

  const formDataHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/transaction", { formData })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
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
    </div>
  );
}

export default App;
