const { Router } = require('express');
const { getHotelID, deleteHotelByID, getHotels, postHotel, patchHotel } = require('../handlers/hotelsHandlers');

const hotelsRouter = Router();

// Ruta para traer todos los hoteles -- > GET ALL HOTELS    
hotelsRouter.get('/', getHotels); //--> '/hotels'

// Ruta para traer hotel por ObjectID ---> GET HOTEL BY ID
hotelsRouter.get('/:id', getHotelID); // --> '/hotels/?id'

// Ruta para crear hotel ----> POST HOTEL
hotelsRouter.post('/', postHotel); // --> '/hotels'

// Ruta para actualizar hotel  -----> UPDATE HOTEL
hotelsRouter.patch('/:id', patchHotel); // --> '/hotels/?id'

// Ruta para eliminar hotel por ObjectID (Para el admin dsp) --> DELETE HOTELS
//hotelsRouter.delete('/:id', deleteHotelByID); // --> '/hotels/?id'

module.exports = hotelsRouter;


