const { Router } = require('express');
const { getUserID, deleteUserByID, getUser, postUser, patchUser, createReservation, getReservations, deleteReservation } = require('../handlers/usersHandlers');

const usersRouter = Router();

// Ruta para traer todos los users -->> GET ALL
usersRouter.get('/', getUser); // --> '/users'

// Ruta para traer user por ObjectID ---> GET BY ID
usersRouter.get('/:id', getUserID); // --> '/users/?id'

// Ruta para crear user             -----> POST USER
usersRouter.post('/', postUser); // --> '/users'

// Ruta para actualizar user           ---> UPDATE USER
usersRouter.patch('/:id', patchUser);  // --> '/users/?id'

// Ruta para eliminar user por ObjectID (Para el admin dsp) --> DELETE USER 
usersRouter.delete('/:id', deleteUserByID); // --> '/users/?id'

// Nueva ruta para recibir la información de Firebase
usersRouter.post('/authenticate', (req, res) => { // este endpoint es para prueba inicial
  const { email, uid } = req.body;
  // Info de autenticación de Firebase
  console.log('Received authentication information from Firebase:');
  console.log('Email:', email);
  console.log('UID:', uid);
  // acciones adicionales aquí: 
  res.sendStatus(200); 
});

//PARA CARRITO DE RESERVAS!! -->
// Ruta para crear una reserva para un usuario específico
usersRouter.post('/:userId/reservations', createReservation);

// Ruta para obtener todas las reservas de un usuario
usersRouter.get('/:userId/reservations', getReservations);

// Ruta para eliminar una reserva de un usuario
usersRouter.delete('/:userId/reservations/:reservationId', deleteReservation);


module.exports = usersRouter;


