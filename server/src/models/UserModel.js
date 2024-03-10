const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: "" },
  role: { type: String, enum: ["client", "owner"], required: true },
  permissions: {
    type: String,
    enum: ["read/write", "create/post/delete"],
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

/* {
      "description": "Excellent service and luxurious accommodations!",
      "score": 5,
      "client": {
        "$oid": "61f3c7fe9d8d6c5e2186a654"
      },
      "date": "2023-08-25"
    },
    
    {
      "description": "Spacious suite with a breathtaking balcony view!",
      "score": 3.5,
      "client": {
        "$oid": "61f3c7fe9d8d6c5e2186a789"
      },
      "date": "2023-08-20"
    }
    */

/* 
{
    "username": "Usuario-test",
    "email": "quevedodiego3008@gmail.com",
    "role": "client",
    "permissions": "read/write",
    "contactDetails": {"phone": 1234567890},
    "profile": {
        "firstName": "Soy Un",
        "lastName": "Test",
        "birthday": "2002-08-30"
    }
} */
