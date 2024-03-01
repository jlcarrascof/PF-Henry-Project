const { MercadoPagoConfig, Payment} = require('mercadopago');

//notificaciones de pago realizado etc. y se usa para subir los pedidos luego a la DB

const client = new MercadoPagoConfig({ accessToken:"TEST-7890066462766668-022819-250330ad61a0db5f6ae00b6b6a4d2129-1705236730"});
const payment = new Payment(client);

const body = {
 transaction_amount: '100',
  token: 'token',
  description: 'description',
  installments: 1,
  payment_method_id: 'visa',
  notification_url: 'http://https://chichi.mysaml.com/Notifications.com', //dominio local para hacer pruebas, se remplaza por DB
  payer: {
    email: 'test@test.com',
    identification: {
      type: 'CPF',
      number: '19119119100'
    }
  }
};

payment.create({ body: body, requestOptions: { idempotencyKey: '<SOME_UNIQUE_VALUE>' } }).then(console.log).catch(console.log);