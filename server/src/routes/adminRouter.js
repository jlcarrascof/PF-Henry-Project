const { Router } = require("express")
const { getDisabledRooms, disableRoom } = require("../handlers/adminHandler")

const adminRouter = Router()

adminRouter.get("/rooms/", getDisabledRooms)

adminRouter.patch("/:id", disableRoom)



module.exports = adminRouter