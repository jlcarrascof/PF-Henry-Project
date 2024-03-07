const { Router } = require("express");
const {
  getUserID,
  deleteUserByID,
  getUser,
  postUser,
  patchUser,
  createReservation,
  getReservations,
  getConfirmedReservations,
  deleteReservation,
  authUser,
} = require("../handlers/usersHandlers");

const usersRouter = Router();

// Ruta para traer todos los usuarios -->> GET ALL
usersRouter.get("/", getUser); // --> '/users'

//RUTA PARA TRAER RESERVAS
usersRouter.get("/:identifier/reservations", getReservations);

//usersRouter.get('/:userId/reservations/confirmed', getConfirmedReservations);
usersRouter.get(
  "/:identifier/reservations/confirmed",
  getConfirmedReservations
);

// Ruta para traer usuario por ObjectID ---> GET BY ID
usersRouter.get("/:id", getUserID); // --> '/users/?id'

// Ruta para crear usuario             -----> POST USER
usersRouter.post("/", postUser); // --> '/users'

// Ruta para actualizar usuario           ---> UPDATE USER
usersRouter.patch("/:id", patchUser); // --> '/users/?id'

// Ruta para eliminar usuario por ObjectID (Para el admin dsp) --> DELETE USER
usersRouter.delete("/:id", deleteUserByID); // --> '/users/?id'

// Nueva ruta para recibir la información de Firebase
usersRouter.get("/authenticate/:email", authUser);

//PARA CARRITO DE RESERVAS!! -->
// Ruta para crear una reserva para un usuario específico
usersRouter.post("/:userId/reservations", createReservation);

// Ruta para obtener todas las reservas de un usuario
// usersRouter.get('/:userId/reservations', getReservations);

// Ruta para eliminar una reserva de un usuario
usersRouter.delete("/:userId/reservations/:reservationId", deleteReservation);

module.exports = usersRouter;
