const { Router } = require('express');
const { getHotelID, deleteHotelByID, getHotels, postHotel, patchHotel } = require('../handlers/hotelsHandlers');

const hotelsRouter = Router();

// Ruta para traer hotel por ObjectID
hotelsRouter.get('/:id', getHotelID); // --> '/hotels/?id'

// Ruta para eliminar hotel por ObjectID (Para el admin dsp)
hotelsRouter.delete('/:id', deleteHotelByID); // --> '/hotels/?id'

// Ruta para traer todos los hoteles
hotelsRouter.get('/', getHotels); //--> '/hotels'

// Ruta para crear hotel
hotelsRouter.post('/', postHotel); // --> '/hotels'

// Ruta para actualizar hotel
hotelsRouter.patch('/:id', patchHotel); // --> '/hotels/?id'

module.exports = hotelsRouter;


