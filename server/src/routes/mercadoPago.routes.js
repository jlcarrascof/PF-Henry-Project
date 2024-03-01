const { Router } = require("express");
const {createOrder}= require("../controllers/mercadoPago.controller")

const mercadoRouter = Router()


mercadoRouter.post('/create-order', createOrder)

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

//se puede ver como recibo 
mercadoRouter.all('/success', (req, res) => {
    // res.send("c: que alegria, tienes dinero: payID: " + req.query.payment_id);
    // res.redirect()   --->> si se quiere redireccionar pero esta chevere que salga como un recibo con los datos xd
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Succes</title>
        <style>
            html { background: #1d1a39; user-select: none; } 
            #Content, .Fondo {
                width: 100vw;
                height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            .Icon {
                font-size: 3em;
            }
            .Tittle {
                margin: 2em;
            }
            .Back {
                text-decoration: none;
                color: #FFF;
                padding: 1em;
                background: #00000066
            }
            .Fondo {
                border: #522b5b 5px solid;
                aspect-ratio: 1/1;
                background: #FFF;
                border-radius: 50%;
                padding: 2em;
                width: 50%;
                height: auto;
            }
        </style>
    </head>
    <body>
        <div id="Content">
            <div class="Fondo">
                <span class="Icon">✔️</span>
                <h1 class="Tittle">Compra exitosa</h1>
                <a href="http://localhost:5173/hotels" class="Back">Volver a la pagina</a>
            </div>
        </div>
    </body>
    </html>`);
})

mercadoRouter.all('/frailue', (req, res) => {
    //res.send("estas pelado, bye");   ----> tambien hubiese estado chistoso xd //zi
    res.redirect("http://localhost:5173/hotels")
})


//mercadoRouter.get('/frailue', (req, res) => res.send('failed order'))

module.exports = mercadoRouter;