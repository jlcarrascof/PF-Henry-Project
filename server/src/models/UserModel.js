const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reservationSchema = new Schema({
  reservationMade: { type: Date, default: Date.now },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  state: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  description: { type: String, required : true},
});

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ["client", "owner"], required: true },
  permissions: [{ type: String, enum: ["read", "write"] }],
  contactDetails: { phone: Number },
  profile: {
    firstName: String,
    lastName: String,
    birthdate: Date,
  },
  reservation: [reservationSchema],
  favorites: [{ type: Schema.Types.ObjectId, ref: "Room", required: true }]
});

const User = model("User", userSchema);

module.exports = User;
