const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationSchema = new Schema({
  // user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  user_email: { type: String, required: true },
  billing_id: { type: String, required: true },
  billing_status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejeceted"],
    default: "Pending",
  },
  reservationMade: { type: Date, default: Date.now },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  state: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  description: { type: String, required: true },
});

const userSchema = new Schema({
  username: { type: String, required: true },
  uid: { type: String, required: true, unique: true },
  user_email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: "" },
  role: {
    type: String,
    enum: ["client", "owner"],
    default: "client",
    required: true,
  },
  permissions: {
    type: String,
    enum: ["read/write", "create/post/delete"],
    default: "read/write",
    required: true,
  },
  profile: {
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
  },
  phone: { type: Number },
  reservation: [reservationSchema],
  favorites: [{ type: Schema.Types.ObjectId, ref: "Room", required: true }],
});
userSchema.index({ username: 1, email: 1 });

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
