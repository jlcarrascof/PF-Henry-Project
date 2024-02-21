const { Router } = require('express');
const { getUserID, deleteUserByID, getUser, postUser, patchUser } = require('../handlers/usersHandlers');

const usersRouter = Router();

// Ruta para traer user por ObjectID
usersRouter.get('/:id', getUserID); // --> '/users/?id'

// Ruta para eliminar user por ObjectID (Para el admin dsp)
usersRouter.delete('/:id', deleteUserByID); // --> '/users/?id'

// Ruta para traer todos los users
usersRouter.get('/', getUser); // --> '/users'

// Ruta para crear user
usersRouter.post('/', postUser); // --> '/users'

// Ruta para actualizar user
usersRouter.patch('/:id', patchUser);  // --> '/users/?id'

module.exports = usersRouter;