const { Router } = require("express");
const {
  createPreference,
  Success,
  PayPalOrder,
  PayPalCapture,
} = require("../controllers/mercadoPagoController");
const { getDb } = require("../db.js");

const mercadoRouter = Router();

mercadoRouter.post("/create-preference", createPreference);

/**
 * collection_id=1317282278
 * collection_status=approved
 * payment_id=1317282278
 * status=approved
 * external_reference=null
 * payment_type=credit_card
 * merchant_order_id=16247899744
 * preference_id=1705236730-7a174342-1ef3-410c-9983-568192b7117b
 * site_id=MCO
 * processing_mode=aggregator
 * merchant_account_id=null
 */

//se puede ver como recibo :)
mercadoRouter.get("/success/*", Success);

mercadoRouter.all("/frailue", (req, res) => {
  //res.send("estas pelado, bye");   ----> tambien hubiese estado chistoso xd
  res.redirect("http://localhost:5173/rooms");
});

//? PayPal --------------------------------------------- >>>>>>>>>>>>>>>>>>> :p

mercadoRouter.post("/paypal-order", PayPalOrder);
mercadoRouter.get("/paypal-capture/*", PayPalCapture);
mercadoRouter.get("/paypal-cancel", (rq, rs) => {
  rs.send("<h1>Cancelado</h1>");
});

// console.log("\x1B[33m\x1B[31mHoli \x1B[38;2;255;180;220m:p\x1B[0m")

module.exports = mercadoRouter;
