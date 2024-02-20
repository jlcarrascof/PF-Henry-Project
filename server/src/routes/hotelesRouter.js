const {Router} = require("express");
const {getHandlerHoteles} = require("../handlers/HotelesHandlers");

const HotelesRouter = Router();


HotelesRouter.get("/", getHandlerHoteles);


module.exports = HotelesRouter;

