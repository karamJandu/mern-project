import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionApi from "./routes/TransactionApi.js";

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

app.use("/transaction", TransactionApi);
app.listen(5000, () => console.log("Server running on port 5000"));
