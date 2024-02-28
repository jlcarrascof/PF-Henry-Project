const { Router } = require("express");
const { updateFav, getFav } = require("../handlers/roomHandlers");

 const favRouter = Router();


favRouter.get("/", getFav);
favRouter.patch("/:id", updateFav);

module.exports = favRouter