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

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const transaction = await Transaction.findOneAndUpdate(
    { id },
    { ...req.body },
    { new: true }
  );
  transaction.save();
  res.json({ message: "success" });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const response = await Transaction.findByIdAndDelete(id);
  const message = response !== null ? "Success" : "Failed";
  res.json({ message });
});

export default router;
