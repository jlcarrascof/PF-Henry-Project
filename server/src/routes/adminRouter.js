const { Router } = require("express")
const { getDisabledRooms, disableRoom, getDisabledHotels, disableHotel, getMixedSearch } = require("../handlers/adminHandler")

const adminRouter = Router()

adminRouter.get("/rooms/", getDisabledRooms)

adminRouter.patch("/rooms/:id", disableRoom)

adminRouter.get("/hotels/", getDisabledHotels)

adminRouter.patch("/hotels/:id", disableHotel)

adminRouter.get("/search", getMixedSearch)

// Ruta para traer todos los usuarios -->> GET ALL
/* usersRouter.get("/", getUser); */ // --> '/users'

module.exports = adminRouter