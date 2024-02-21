const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;


// Modelo para Propietario
const ownerSchema = new Schema({
    name: String,
    dni: String,
    mail: {type: String, unique: true},
    phone: Number,
    properties: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
    // Otros campos según sea necesario
  });
  
  const Owner = model('Owner', ownerSchema);

  module.exports = Owner