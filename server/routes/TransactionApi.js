import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = new Transaction({ amount, description, date });
  const result = await transaction.save();
  res.json(result);
});

router.get("/", async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const response = await Transaction.findByIdAndDelete(id);
  console.log(response);
  const message = response !== null ? "Success" : "Failed";
  res.json({ message });
});
export default router;
