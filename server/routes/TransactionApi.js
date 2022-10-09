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

export default router;
