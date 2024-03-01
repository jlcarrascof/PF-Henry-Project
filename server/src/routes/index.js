const { Router } = require('express');
const usersRouter = require('./usersRouter');
const hotelsRouter = require('./hotelsRouter');
const roomsRouter = require('./roomRouter');
const favRouter = require('./favRouter');
const adminRouter = require('./adminRouter');

const mainRouter = Router();

mainRouter.use('/favs', favRouter)
mainRouter.use('/rooms', roomsRouter); 
mainRouter.use('/users', usersRouter);  
mainRouter.use('/hotels', hotelsRouter); 
mainRouter.use('/admin', adminRouter)

module.exports = mainRouter;