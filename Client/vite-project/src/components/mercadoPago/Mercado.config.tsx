import React, { useState, useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

namespace ApiType {
  export type CreateOrder = {
    id: string,
    description?: string,
    title: string,                   //nombre del Hotel
    unit_price: Number,      //Precio de la unidad debe ser Number
    currency_id?: 'COP' | string,              //moneda ej: EUR COP etc
    quantity: Number,      
  }
}

const MercadoP: React.FC<AppProps> = () => {
  const [ID, setID] = useState<string>("null");
  initMercadoPago('TEST-90634ea0-ef39-4285-ba3b-3f6daf135572');
  
  const Pay = (e) => {
    setID("null");
    e.target.setAttribute('Loading', 'Si');
    const orderData: ApiType.CreateOrder[] =  [
      {
        id: 'xxxx-xxxx-xxxxxx-xxxxxx',
        unit_price: 100,
        quantity: 1,
        title: 'room'
      }
    ]
    fetch('http://localhost:3002/payment/create-order', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    }).then(async (Result) => {
      let Data = (await Result.json())
      setID(Data.id);
      console.log("MP result", Data);
      e.target.removeAttribute('Loading');
    }).catch(error => {
      console.log('Error MP:', error)
      e.target.removesetAttribute('Loading');
    });
  }

  useEffect(() => {
    // console.log('PrefID:', ID);
  }, []);



  // <button className="LoadButton" onClick={Pay}>Pay with MercadoPago</button>
  // Hace que no desaparesca el boton ^
  // { ID == "null" && (<button className="LoadButton" onClick={Pay}>Pay with MercadoPago</button>) }
  // Desaparece el boton al aparecer el de mercado pago ^
  return (
    <div>
      { ID == "null" && (<button className="LoadButton" onClick={Pay}>Pay with MercadoPago</button>) }
      { ID !== "null" && (<Wallet initialization={{ preferenceId: ID }}  customization={{ texts:{ valueProp: 'smart_option'}}} />) }
    </div>
  );

  
};

export default MercadoP;