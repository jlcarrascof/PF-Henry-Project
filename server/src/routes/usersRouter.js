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
  getFavoriteRooms,
  addFavoriteRoom,
  removeFavoriteRoom,
} = require("../handlers/usersHandlers");

const usersRouter = Router();

// Nueva ruta para recibir la información de Firebase
usersRouter.get("/", authUser);

//RUTA PARA TRAER RESERVAS
usersRouter.get("/:identifier/reservations", getReservations);

//usersRouter.get('/:userId/reservations/confirmed', getConfirmedReservations);
usersRouter.get("/:identifier/reservations/confirmed",  getConfirmedReservations);

//Ruta para traer los rooms favoritos del usuario
usersRouter.get("/:identifier/favorites", getFavoriteRooms);

//Ruta para agregar un room a los favoritos del usuario
usersRouter.patch("/:identifier/favorites/:roomId", addFavoriteRoom);

//Ruta para eliminar un room de favoritos del usuario
usersRouter.delete("/:identifier/favorites/:roomId", removeFavoriteRoom);

// Ruta para traer usuario por ObjectID ---> GET BY ID
usersRouter.get("/:id", getUserID); // --> '/users/?id'

// Ruta para crear usuario             -----> POST USER
usersRouter.post("/", postUser); // --> '/users'

// Ruta para actualizar usuario           ---> UPDATE USER
usersRouter.patch("/:id", patchUser); // --> '/users/?id'

// Ruta para eliminar usuario por ObjectID (Para el admin dsp) --> DELETE USER
 // --> '/users/?id'


//PARA CARRITO DE RESERVAS!! -->
// Ruta para crear una reserva para un usuario específico
usersRouter.post("/:userId/reservations", createReservation);

// Ruta para obtener todas las reservas de un usuario
// usersRouter.get('/:userId/reservations', getReservations);

// Ruta para eliminar una reserva de un usuario
usersRouter.delete("/:userId/reservations/:reservationId", deleteReservation);

module.exports = usersRouter;
