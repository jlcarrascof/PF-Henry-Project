const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;



// Modelo para Reservación
const reservationSchema = new Schema({
    user: {
      user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Enlazado con el modelo de Usuario
      reservationDate: { type: Date, default: Date.now },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      state: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }, // Enumera los estados permitidos
    },
    // Enlazar con el modelo de Propiedad
    propiedad: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
});
  
  const Reservation = model('Reservation', reservationSchema);


  module.exports = Reservation




  // demo:

  // Ejemplo de creación de una reservación con enlace a propiedad y usuario
const nuevaReservacion = new Reservacion({
    user: {
      user_id: 'user_id_aqui', // Debes proporcionar el ObjectId válido del usuario
      reservationDate: new Date('2024-02-18T00:00:00Z'),
      startDate: new Date('2024-02-20T00:00:00Z'),
      endDate: new Date('2024-02-25T00:00:00Z'),
      state: 'confirmed',
    },
    propiedad: 'propiedad_id_aqui', // Debes proporcionar el ObjectId válido de la propiedad
  });
  
  // Guardar la reservación en la base de datos
  nuevaReservacion.save((error, resultado) => {
    if (error) {
      console.error('Error al guardar la reservación:', error);
    } else {
      console.log('Reservación guardada exitosamente:', resultado);
    }
  });