const { Router } = require('express');
const usersRouter = require('./usersRouter');
const hotelsRouter = require('./hotelsRouter');
const roomsRouter = require('./roomRouter');
const adminRouter = require('./adminRouter');
const mercadoRouter = require('./mercadoPago.routes');

const mainRouter = Router();

mainRouter.use('/rooms', roomsRouter); 
mainRouter.use('/users', usersRouter);  
mainRouter.use('/hotels', hotelsRouter); 
mainRouter.use('/admin', adminRouter)
mainRouter.use('/payment', mercadoRouter);

module.exports = mainRouter;


