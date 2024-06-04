const mongoose = require("mongoose");

const DebtSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  numberOfInstallments: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    default: 0,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Debt", DebtSchema);
