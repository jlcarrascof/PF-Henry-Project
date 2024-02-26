const { Router } = require("express");
const { getFav } = require("../handlers/hotelsHandlers");
const { updateFav } = require("../handlers/roomHandlers");

 const favRouter = Router();


favRouter.get("/", getFav);
favRouter.patch("/:id", updateFav);

module.exports = favRouter