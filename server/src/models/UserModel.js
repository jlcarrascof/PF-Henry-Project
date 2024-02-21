const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Modelo para Usuario
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['client', 'owner'], required: true },
    permissions: [{ type: String, enum: ['read', 'write'] }],
    contactDetails: { phone: Number },
    profile: {
      firstName: String,
      lastName: String,
      birthdate: Date,
    },
});

const User = model('User', userSchema);

// Ejemplo de creación de un documento de usuario
const nuevoUsuario = new User({
    username: 'ejemplo',
    email: 'ejemplo@example.com',
    role: 'cliente',
    permissions: ['read', 'write'],
    contactDetails: {
      phone: '123-456-7890',
      address: '123 Example St, City, Country',
    },
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      birthdate: new Date('1990-01-01T00:00:00Z'),
    },
    reservation:{
      reservationDate: { type: Date, default: Date.now },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      state: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }, // Enumera los estados permitidos
      property: {type: Schema.Types.ObjectId, ref: 'Property', required: true}
    }

  });

// Demo guardado en base de datos

nuevoUsuario.save((error, resultado) => {
    if(error){
        console.log(error)
    } else {
        console.log(resultado)
    }
})


module.exports = User


/* 
  const ownerSchema = new Schema({
    name: String,
    dni: String,
    mail: {type: String, unique: true},
    phone: Number,
    properties: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
  });
  
  const Owner = model('Owner', ownerSchema);

  module.exports = Owner  
*/