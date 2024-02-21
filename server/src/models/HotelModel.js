const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

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
    reviews: [{
    description: String,
    score: {type: Number, required: true},
    client: { type: Schema.Types.ObjectId, ref: 'User' },
    date: {type: Date, required: true}
    }]
  });
  
  const Hotel = model('Hotel', hotelSchema);


module.exports = {
    Hotel,
}
