const { Router } = require("express")
const { getDisabledRooms, disableRoom, getDisabledHotels, disableHotel, getMixedSearch, getUsers, getLinkedRoom, disableUser } = require("../handlers/adminHandler")


const adminRouter = Router()

adminRouter.get("/rooms/", getDisabledRooms)

adminRouter.get("/rooms/:id", getLinkedRoom)

adminRouter.patch("/rooms/:id", disableRoom)

adminRouter.get("/hotels/", getDisabledHotels)

adminRouter.patch("/hotels/:id", disableHotel)

adminRouter.patch("/users/:id", disableUser)

adminRouter.get("/search", getMixedSearch)

adminRouter.get("/users", getUsers); // --> '/users'

module.exports = adminRouter