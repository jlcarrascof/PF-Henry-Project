const { Router } = require("express");
const {createOrder}= require("../handlers/mercadoPago.handler")

const mercadoRouter = Router()


mercadoRouter.get('/create-order', createOrder)

mercadoRouter.get('/success', (req, res) => res.send('success'))

//mercadoRouter.get('/frailue', (req, res) => res.send('creating order'))

module.exports = mercadoRouter;