const { Router } = require("express");
const userRouter = require("./usersRouter");
const hotelesRouter = require("./hotelesRouter");



const mainRouter = Router();

mainRouter.use("/users", usersRouter);

mainRouter.use("/hoteles", hotelesRouter)




module.exports = mainRouter;
