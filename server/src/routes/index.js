const { Router } = require('express');
const usersRouter = require('./usersRouter');
const hotelsRouter = require('./hotelsRouter');
const roomsRouter = require('./roomRouter');
const adminRouter = require('./adminRouter');

const mainRouter = Router();

mainRouter.use('/rooms', roomsRouter); 
mainRouter.use('/users', usersRouter);  
mainRouter.use('/hotels', hotelsRouter); 
mainRouter.use('/admin', adminRouter)

module.exports = mainRouter;

//! EL QUE TENIA EN LA OTRA RAMA DE PAGO

/* const { Router } = require('express');
const usersRouter = require('./usersRouter');
const hotelsRouter = require('./hotelsRouter');
const roomsRouter = require('./roomRouter');
const favRouter = require('./favRouter');
const adminRouter = require('./adminRouter');
const mercadoRouter = require('./mercadoPago.routes');


mainRouter.use('/favs', favRouter)
mainRouter.use('/rooms', roomsRouter); 
mainRouter.use('/users', usersRouter);  
mainRouter.use('/hotels', hotelsRouter); 
mainRouter.use('/admin', adminRouter);
mainRouter.use('/payment', mercadoRouter); */

