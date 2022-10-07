import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import Transaction from "./models/Transaction.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://karam05341:karam05341@cluster0.ymyi8.mongodb.net/mern-project?retryWrites=true&w=majority"
  );

  console.log("Mongo DB connection successful");
}

await connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/transaction", async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = new Transaction({ amount, description, date });
  const result = await transaction.save();
  res.json(result);
});

app.get("/transaction", async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(5000, () => console.log("Server running on port 5000"));
