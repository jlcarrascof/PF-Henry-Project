const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TransactionSchema = new Schema({
  payment_method_id: { type: String, required: true },
  status: {
    type: String,
    enum: ["approved", "refunded", "charged_back"],
  },
  // payer: {
  //   id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  //   // email: { type: String, required: true },
  // },
  additional_info: {
    items: [
      {
        id: { type: Schema.Types.ObjectId, ref: "Room", required: true },
        description: { type: String, required: true },
      },
    ],
  },
  transaction_amount: { type: Number, required: true },
  installments: Number,
});

const Transaction = model("Transaction", TransactionSchema);

module.exports = Transaction;