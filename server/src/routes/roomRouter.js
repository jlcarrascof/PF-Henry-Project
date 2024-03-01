const { Router } = require("express");
const {
  getRoomFiltered,updateFav,
  getRoomById,postRoom,
  patchRoom,deleteRoomByID, getAllRooms, postReview,
} = require("../handlers/roomHandlers");

const roomsRouter = Router();

roomsRouter.get("/", getAllRooms); 

roomsRouter.get("/filtered/", getRoomFiltered); 

roomsRouter.get("/:id", getRoomById);

roomsRouter.post("/", postRoom); 

roomsRouter.post("/:id", postReview); 

roomsRouter.patch("/:id", patchRoom); 

roomsRouter.delete("/:id", deleteRoomByID);

roomsRouter.post("/:id/reviews", postReview);

roomsRouter.patch("/fav/:id", updateFav);

module.exports = roomsRouter;








