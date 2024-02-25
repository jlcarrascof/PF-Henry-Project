const { Router } = require("express");
const {
  getRoomFiltered,updateFav,
  getRoomById,postRoom,
  patchRoom,deleteRoomByID,
} = require("../handlers/roomHandlers");

const roomsRouter = Router();

// Ruta para obtener todo los hoteles filtrados y sin filtrar
roomsRouter.get("/", getRoomFiltered); // --> '/hotels/filtered'

// Ruta para traer hotel por ObjectID ---> GET HOTEL BY ID
roomsRouter.get("/:id", getRoomById); // --> '/hotels/?id'

// Ruta para crear hotel ----> POST HOTEL
roomsRouter.post("/", postRoom); // --> '/hotels'

// Ruta para actualizar hotel  -----> UPDATE HOTEL
roomsRouter.patch("/:id", patchRoom); // --> '/hotels/?id'

// Ruta para eliminar hotel por ObjectID (Para el admin dsp) --> DELETE HOTELS
roomsRouter.delete("/:id", deleteRoomByID); // --> '/hotels/?id'

roomsRouter.patch("/fav/:id", updateFav);

module.exports = roomsRouter;
