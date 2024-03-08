const { Router } = require("express")
const { getDisabledRooms, disableRoom, getDisabledHotels, disableHotel } = require("../handlers/adminHandler")

const adminRouter = Router()

adminRouter.get("/rooms/", getDisabledRooms)

adminRouter.patch("/rooms/:id", disableRoom)

adminRouter.get("/hotels/", getDisabledHotels)

adminRouter.patch("/hotels/:id", disableHotel)



module.exports = adminRouter