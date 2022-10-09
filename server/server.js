import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionApi from "./routes/TransactionApi.js";
import connectDB from "./config/db.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

await connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/transaction", TransactionApi);
app.listen(5000, () => console.log("Server running on port 5000"));
