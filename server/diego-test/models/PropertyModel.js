const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const propertySchema = new Schema({
    name: {type: String, required: true},
    owner_id: { type: Schema.Types.ObjectId, ref: 'Owner', required: true},
    details: {
        address: String,
        description: String,
        services: [String]
        // rooms: Int16Array ----> Este es en caso que usemos una API tipo AirBnB y no exclusivamente de hoteles
        // type: String
    },
    images: [String],
    contact: {
        phone: Number,
        mail: String
    },
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
  });
  
  const Property = model('Property', propertySchema);

// Modelo para Reseña
const reviewSchema = new Schema({
    description: String,
    score: Number,
    // client: { type: Schema.Types.ObjectId, ref: 'User' }  ---> Mientras la demo, este todavia  no
    date: Date
  });
  
  const Review = model('Review', reviewSchema);


  module.exports = {
    Property,
    Review
}

/// demo


/* const nuevaReview = new Review({
    _id: "resena_id_1",
    description: "Mejor me hubiera quedado en mi casa",
    score: 1.5,
    client: ObjectId("soyelnumerodecliente"),
    date: '1990-01-01T00:00:00Z'
})


// Ejemplo de creación de una propiedad con enlace a reseñas
const nuevaPropiedad = new Propiedad({
    name: 'Example Property',
    owner_id: 'owner_id_aqui', // Debes proporcionar el ObjectId válido del propietario
    details: {
      location: 'Example Location',
      description: 'Example Description',
    },
    images: ['image1.jpg', 'image2.jpg'],
    comments: ['Great property!', 'Nice location!'],
    services: ['Cleaning', 'Laundry'],
    // Enlazariamos aqui con reseñas existentes a través de su ObjectId válido
    reviews: ['resena_id_1'],
  }); */
  
/* 
{
  "name": "Example Property",
  "owner_id": "123",
  "details": {
    "location": "Example Location",
    "description": "Example Description",
    "type": "hotel",
    "services": ["Cleaning", "Laundry"]
     },
    "images": ["image1.jpg", "image2.jpg"],
    "contact": {
        "phone": 12345678,
        "mail": "ejemplo@mail.com"
    },
    "reviews": []
} */

  // Guardar la propiedad en la base de datos
 /*  nuevaPropiedad.save((error, resultado) => {
    if (error) {
      console.error('Error al guardar la propiedad:', error);
    } else {
      console.log('Propiedad guardada exitosamente:', resultado);
    }
  }); */