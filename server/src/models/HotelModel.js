const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  description: String,
  score: Number,
  client: { type: Schema.Types.ObjectId, ref: "User" },
  date: Date,
});

const roomSchema = new Schema({
  hotel_id: { tpye: Schema.Types.ObjectId, ref: "Hotel" },
  description: { type: String, required: true },
  typeOfRoom: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, required: true },
  num_rooms: { type: Number, required: true },
  isFav: { type: Boolean, defaultValue: false },
});

const hotelSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  details: { String, required: true },
  address: String,
  services: [String],
  rooms: [roomSchema],
  images: [String],
  contact: {
    phone: Number,
    mail: String,
  },
  reviews: [reviewSchema],
});

const Hotel = model("Hotel", hotelSchema);

module.exports = {
  Hotel,
};
