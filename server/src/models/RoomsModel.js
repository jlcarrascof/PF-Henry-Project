const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  description: String,
  score: Number,
  client: { type: Schema.Types.ObjectId, ref: "User" },
  date: Date,
});

const hotelSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  details: { type: String, required: true },
  address: { type: String, required: true },
  contact: {
    phone: Number,
    mail: String,
  }
});

const Hotel = model("Hotel", hotelSchema);

const roomSchema = new Schema({
  hotel_id: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
  description: { type: String, required: true },
  typeOfRoom: { type: String, required: true },
  services: [String],
  price: { type: Number, required: true },
  availability: { type: Boolean, required: true },
  images: [String],
  contact: {
    phone: Number,
    mail: String,
  },
  num_rooms: { type: Number, required: true },
  isFav: { type: Boolean, default: false },
  reviews: [reviewSchema],
  totalScore: { type: Number, default: 0 }
});

const Room = model("Room", roomSchema);

module.exports = {
  Room,
};