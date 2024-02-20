
const {Router} = require("express");
const { getHandlerUsers, getHandlerUserById, getHandlerUserByName, postHandlerUser } = require("../handlers/usersHandlers");


const usersRouter = Router();


usersRouter.get("/", getHandlerUsers);

usersRouter.get("/user/", getHandlerUserByName);

usersRouter.get("/:id", getHandlerUsersById);

usersRouter.post("/", postHandlerUser);



module.exports = usersRouter;


