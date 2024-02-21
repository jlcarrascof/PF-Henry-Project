const { Router } = require('express');
const { getUserID, deleteUserByID, getUser, postUser, patchUser } = require('../handlers/usersHandlers');

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

module.exports = usersRouter;