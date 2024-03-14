const { MercadoPagoConfig, Payment, Preference } = require("mercadopago");
const express = require("express");
const crypto = require("crypto");
//! funciona todooo que miedo que se rompaaaa
const { PayPal } = require("../paypal/PayLib.js");

//esto ira en el .env
const ACCESS_TOKEN =
  "TEST-7890066462766668-022819-250330ad61a0db5f6ae00b6b6a4d2129-1705236730"; //token privado

const Pay = new PayPal({
  Auth: {
    //ClientID: 'AVix2mY5FK-1q01HZ75SeDH42X7Eb1gdLrmNh0WGpjnwEXhTUorTfREuU7uMc_sixFBOGh5IyjETEVfZ',
    //Token: 'EK349mHEUFg96MwuhN7QvHAiVXQ76Jy6KyoD7Fzr6i4MRqM-G70sjLzkr8hxGXfXaeWEQXtJO8twK5DW',
    ClientID:
      "AZTLK8fSksKKPFNJqEcDNZEM3NjbetYnFIPXMyJoF3U80Utb0RFMy-F1mzzIhYDiJnZpak5jx8itAyX4",
    Token:
      "EJZy30aiMWQAY06XCLOfFa7hvRFVfODZMXd8ZkX74RYeSlETe5NNnmzmIbEjks7LGSD8m-mtxqfb0Tg0",
  },
});

/**
 * @type {Map<string, Array<{
 *      id: string,
 *      description: string,
 *      title: string,
 *       unit_price: number,
 *       currency_id: "COP" | string,
 *       quantity: Number
 * }>>}
 */
const PaymentData = new Map();

/*
EJEMPLO 
POST << Body en JSON << [{
  "title": "El Tit",
  "price": 500,
  "quantity": 1
}, {
  "title": "2 El Tit",
  "price": 1000,
  "quantity": 4
}]
:)
*/

function SuccesFile() {
  return `<!DOCTYPE html>
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
                <a href="http://localhost:5173/rooms" class="Back">Volver a la pagina</a>
            </div>
        </div>
    </body>
    </html>`;
}

function SavePayData(Body) {
  let Items = [];
  let DataID = crypto.randomUUID();
  if (Body && Body.length && Body.length > 0) {
    Body.forEach((Item) => {
      Items.push({
        id: Item.id,
        description: Item.description,
        title: Item.title, //nombre del Hotel
        unit_price: Number(Item.unit_price), //Precio de la unidad debe ser Number x dias = total
        currency_id: Item.currency_id ?? "COP", //moneda ej: USD
        quantity: Number(Item.quantity), //numero de dias de hospedaje
      });
    });
  }
  PaymentData.set(DataID, Items);
  return DataID;
}

function SaveTransaction(DataID, PayID, PayType, PayStatus) {
  let ItemsFromPayData = PaymentData.get(DataID);
  let Items = [];
  ItemsFromPayData.forEach((Item) => {
    Items.push({
      id: Item.id,
      currency: Item.currency_id,
      description: Item.description,
      quantity: Item.quantity,
      unitPrice: Item.unit_price,
    });
  });

  const DataToInsert = {
    paymentId: PayID, // req.params.payment_id,
    payment_type: PayType, // req.params.payment_type,
    status: PayStatus, // req.query.status,
    items: Items,
  };
  console.log("TransactionData", DataToInsert);
  /* const DB = getDb();
    DB.collection('Transaction').insertOne(DataToInsert); */
}

const createPreference = async (req, res) => {
  const Client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });
  const preference = new Preference(Client);
  const Items = [];
  if (req.body && req.body.length && req.body.length > 0) {
    req.body.forEach((Item) => {
      Items.push({
        id: Item.id,
        description: Item.description,
        title: Item.title, //nombre del Hotel
        unit_price: Number(Item.unit_price), //Precio de la unidad debe ser Number x dias = total
        currency_id: Item.currency_id ?? "COP", //moneda ej: USD
        quantity: Number(Item.quantity), //numero de dias de hospedaje
      });
    });
  }
  const DataID = SavePayData(req.body);
  preference
    .create({
      body: {
        items: Items,
        back_urls: {
          success: `http://localhost:3002/payment/success/${DataID}`,
          failure: `http://localhost:3002/payment/frailue/${DataID}`,
        },
        auto_return: "approved",
      },
    })
    .then((Result) => {
      res.json({
        id: Result.id,
        rs: Result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        Error: "Se produjo un error",
        info: error, // Esta linea es temporal
      });
    });
};

const Success = (req, res) => {
  // res.send("c: que alegria, tienes dinero: payID: " + req.query.payment_id);
  // res.redirect()   --->> si se quiere redireccionar pero esta chevere que salga como un recibo con los datos xd
  const DataID = req.url.replace(/(?:\?.+)|(?:\/success\/)/gi, "");
  if (!PaymentData.has(DataID)) {
    
    res.send("<h1>Not Items Data ID valid</h1>");
    return;
  }
  const transactionData = PaymentData.get(DataID);
  const PayID = req.params.payment_id;
  const PayType = req.params.payment_type;
  const PayStatus = req.query.status;
  SaveTransaction(transactionData, PayID, PayType, PayStatus);
  res.send(SuccesFile());
};

const PayPalOrder = async (req, rs) => {
  let Items = [];
  let Total = 0;
  req.body.forEach((Item) => {
    Total += Item.quantity * Item.unit_price;
    Items.push({
      id: Item.id,
      name: Item.title,
      description: Item.description,
      quantity: Item.quantity,
      unit_amount: {
        currency_code: "USD",
        value: Item.unit_price,
      },
    });
  });
  const DataID = SavePayData(req.body);
  const PayData = await Pay.CreateOrder(
    {
      cancel_url: "http://localhost:5173",
      return_url: `http://localhost:3002/payment/paypal-capture/${DataID}`,
    },
    [
      {
        items: Items,
        amount: {
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: Total,
            },
          },
          currency_code: "USD",
          value: Total,
        },
      },
    ]
  );
  console.log("Items:", Items);
  console.log("Data:", PayData);
  if (PayData.links) {
    let AproveLink = PayData.links.find((value) =>
      value.rel == "approve" ? value : undefined
    );
    rs.json({
      created: true,
      link: AproveLink.href,
    });
  } else {
    rs.json({
      created: false,
    });
  }
};

const PayPalCapture = async (rq, rs) => {
  const Token = rq.query.token;
  const DataID = rq.url.replace(/(?:\?.+)|(?:\/paypal-capture\/)/gi, "");
  if (!Token) {
    rs.send("<h1>Sin Token</h1>");
    return;
  }
  if (!PaymentData.has(DataID)) {
    rs.send("<h1>Not Items Data ID valid</h1>");
    return;
  }
  const OrderData = await Pay.OrderCapture(Token);
  const PayID = OrderData.id;
  const PayType = "PayPal";
  const PayStatus = OrderData.status == "COMPLETED" ? "approved" : "refused";
  SaveTransaction(DataID, PayID, PayType, PayStatus);
  console.log(OrderData);
  rs.send(SuccesFile());
};

module.exports = {
  createPreference,
  Success,
  PayPalOrder,
  PayPalCapture,
};
