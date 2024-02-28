
const { Router } = require('express');
const usersRouter = require('./usersRouter');
const hotelsRouter = require('./hotelsRouter');
const roomsRouter = require('./roomRouter');
const mercadoRouter = require('./mercadoPago.routes');

const mainRouter = Router();

mainRouter.use('/users', usersRouter);  
mainRouter.use('/hotels', hotelsRouter); 
mainRouter.use('/rooms', roomsRouter); 
mainRouter.use('/payment', mercadoRouter)

module.exports = mainRouter;





