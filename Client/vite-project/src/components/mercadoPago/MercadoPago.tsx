import "./MercadoPago.css";
/* import { useState } from "react";
import MercadoP from "../mercadoPago/Mercado.config.tsx"; */
import Pasarela from "./Pasarela/Pasarela";

const MercadoPago: React.FC = () => {
  const user = window.localStorage.getItem("user")
  //! aqui habia una demo para que funcionase el mercado pago sin embargo renderiza la pasarela (como tal si seria la demo de que funciona el mercado paggo xd)
   return (
    <>
    {
      
      <div className="MercadoContainer">
      <Pasarela/> 
      </div>
    }
    </>
   )
}
//:)
export default MercadoPago;