const { Router } = require("express");
const {
  getHotelID,
  postHotel,
  patchHotel,
  getHotelsFiltered,
  deleteHotelByID,
  getAllHotels
} = require("../handlers/hotelsHandlers");

const hotelsRouter = Router();

// Ruta para obtener todo los hoteles filtrados y sin filtrar
hotelsRouter.get("/", getAllHotels); // --> '/hotels/'

hotelsRouter.get("/filtered/", getHotelsFiltered); // --> '/hotels/'

// Ruta para traer hotel por ObjectID ---> GET HOTEL BY ID
hotelsRouter.get("/:id", getHotelID); // --> '/hotels/?id'

// Ruta para crear hotel ----> POST HOTEL
hotelsRouter.post("/", postHotel); // --> '/hotels'

// Ruta para actualizar hotel  -----> UPDATE HOTEL
hotelsRouter.patch("/:id", patchHotel); // --> '/hotels/?id'

// Ruta para eliminar hotel por ObjectID (Para el admin dsp) --> DELETE HOTELS
hotelsRouter.delete("/:id", deleteHotelByID); // --> '/hotels/?id'

module.exports = hotelsRouter;
