const { Router } = require("express");
const {
  getRoomFiltered,updateFav,
  getRoomById,postRoom,
  patchRoom,deleteRoomByID, getAllRooms,
} = require("../handlers/roomHandlers");

const roomsRouter = Router();

roomsRouter.get("/", getAllRooms); 

roomsRouter.get("/filtered/", getRoomFiltered); 

roomsRouter.get("/:id", getRoomById);

roomsRouter.post("/", postRoom); 

roomsRouter.patch("/:id", patchRoom); 

roomsRouter.delete("/:id", deleteRoomByID);

roomsRouter.patch("/fav/:id", updateFav);

module.exports = roomsRouter;

