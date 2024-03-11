/* const mongoose = require("mongoose");
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

const Transaction = model("Transaction", TransactionSchema); */

//! AQUI CAMBIE EL MODELO DE TRANSACCION, COMENTE EL VIEJO ARRIBA
module.exports = Transaction;

const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TransactionSchema = new Schema({
  paymentId: { type: String, required: true },
  /* payerName: { type: String, required: true },
  payerEmail: {
    type: String,
    required: true,
  }, */
  status: {
    type: String,
    enum: ["approved", "refunded", /* "charged_back" */],
  },
  payment_type: {
    type: String,
    required: true,
  },
  items: [
    {
      id: { type: Schema.Types.ObjectId, ref: "Room", required: true },
      currency: { type: String, required: true },
      description: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      unitPrice: { type: Number, required: true },
    },
  ],
  installments: Number,
});


const Transaction = model("Transaction", TransactionSchema);