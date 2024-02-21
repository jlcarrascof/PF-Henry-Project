
const { Router } = require('express');
const usersRouter = require('./usersRouter');
const hotelsRouter = require('./hotelsRouter');

const mainRouter = Router();

mainRouter.use('/users', usersRouter);  // Naza rules
mainRouter.use('/hotels', hotelsRouter); // que maravilla

module.exports = mainRouter;





