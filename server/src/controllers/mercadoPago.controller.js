const { MercadoPagoConfig, Payment, Preference } = require('mercadopago');
const express = require('express');

//esto ira en el .env
const ACCESS_TOKEN = "TEST-7890066462766668-022819-250330ad61a0db5f6ae00b6b6a4d2129-1705236730"; //token privado

/*
POST << Body en JSON << [{
  "title": "El Tit",
  "price": 500,
  "quantity": 1
}, {
  "title": "2 El Tit",
  "price": 1000,
  "quantity": 4
}]
*/

const createOrder = async (req, res) => {
    const Client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });
    const preference = new Preference(Client)
    const Items = [];
    if (req.body && req.body.length && req.body.length > 0) {
        req.body.forEach(Item => {
            Items.push({
                id: Item.productid,
                description: Item.description,
                title: Item.title,                                     //nombre del Hotel
                unit_price: Number(Item.price),                        //Precio de la unidad debe ser Number
                currency_id: Item.currency ?? "COP",                   //moneda ej: EUR COP etc
                quantity: Item.quantity,                               // cantidad - Fijada en 1 ya que se refiere siempre a una habitacion
            });
        });
    }

    preference.create({
        body: {
            items: Items,
            back_urls: {
                success: 'http://localhost:1573/success',
                failure: 'http://localhost:1573/failure',
                pending: 'http://localhost:1573/pending'
        },
        auto_return: 'approved'
    }}).then((Result) => {
        res.json({
            id: Result.id,
            rs: Result,
        });
    }).catch((error) => {
        console.log(error)
        res.status(500).json({
            Error: 'Se produjo un error',
            info: error // Esta linea es temporal
        });
    });
}



module.exports = {
    createOrder,
}