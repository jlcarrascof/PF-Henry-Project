const { Router } = require("express");
const {
  getHotelID,
  postHotel,
  patchHotel,
  getHotelsFiltered,
  deleteHotelByID,
  postReview
} = require("../handlers/hotelsHandlers");

const hotelsRouter = Router();

hotelsRouter.get("/", getHotelsFiltered);

hotelsRouter.get("/:id", getHotelID); 

hotelsRouter.post("/", postHotel); 

hotelsRouter.post("/:id", postReview)

hotelsRouter.patch("/:id", patchHotel); 

hotelsRouter.delete("/:id", deleteHotelByID);

module.exports = hotelsRouter;
