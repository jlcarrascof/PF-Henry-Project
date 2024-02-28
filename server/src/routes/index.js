const { Router } = require('express');
const usersRouter = require('./usersRouter');
const hotelsRouter = require('./hotelsRouter');
const roomsRouter = require('./roomRouter');
const favRouter = require('./favRouter');

const mainRouter = Router();

mainRouter.use('/users', usersRouter);  
mainRouter.use('/hotels', hotelsRouter); 
mainRouter.use('/favs', favRouter)
mainRouter.use('/rooms', roomsRouter); 

module.exports = mainRouter;