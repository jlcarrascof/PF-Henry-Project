
const { Router } = require('express');
const usersRouter = require('./usersRouter');
const hotelsRouter = require('./hotelsRouter');

const mainRouter = Router();

mainRouter.use('/users', usersRouter);
mainRouter.use('/hotels', hotelsRouter);

module.exports = mainRouter;





