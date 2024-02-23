const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  description: String,
  score: Number,
  client: { type: Schema.Types.ObjectId, ref: 'User' },
  date: Date
});

const hotelSchema = new Schema({
    name: {type: String, required: true},
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    details: { String, required: true},
    address: String,
    services: [String],
    rooms: [{
      description: {type: String, required: true},
      typeOfRoom: {type: String, required: true},
      price: {type: Number, required: true},
      availability: {type: Boolean, required: true},
    }],
    images: [String],
    contact: {
        phone: Number,
        mail: String
    },
    reviews: [reviewSchema],
  });
  
  const Hotel = model('Hotel', hotelSchema);


module.exports = {
    Hotel,
}
 