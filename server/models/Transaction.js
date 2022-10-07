import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Transaction", transactionSchema);
