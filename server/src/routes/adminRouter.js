const { Router } = require("express")
const { getDisabledRooms, disableRoom, getDisabledHotels, disableHotel, getMixedSearch, getUsers, getLinkedRoom } = require("../handlers/adminHandler")

const adminRouter = Router()

adminRouter.get("/rooms/", getDisabledRooms)

adminRouter.get("/rooms/:id", getLinkedRoom)

adminRouter.patch("/rooms/:id", disableRoom)

adminRouter.get("/hotels/", getDisabledHotels)

adminRouter.patch("/hotels/:id", disableHotel)

adminRouter.get("/search", getMixedSearch)

adminRouter.get("/users", getUsers); // --> '/users'

module.exports = adminRouter