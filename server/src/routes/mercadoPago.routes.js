const { Router } = require("express");
const {createOrder}= require("../controllers/mercadoPago.controller")

const mercadoRouter = Router()


mercadoRouter.post('/create-order', createOrder)

mercadoRouter.get('/success', (req, res) => send('success'))

//mercadoRouter.get('/frailue', (req, res) => res.send('failed order'))

module.exports = mercadoRouter;