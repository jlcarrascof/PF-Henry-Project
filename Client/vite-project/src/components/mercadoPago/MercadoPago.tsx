import "./MercadoPago.css";
import { useState } from "react";
import MercadoP from "../mercadoPago/Mercado.config.tsx";
import Pasarela from "./pasarela/Pasarela.tsx";

const MercadoPago: React.FC = () => {
    const [days, setDays] = useState(1);
    const [totalAmount, setTotalAmount] = useState<Number>(150);

    const handleChange = (e) =>{
      setDays(e.target.value)
      setTotalAmount(e.target.value * 150)
    }
    /* <h2> Reserva tu estadia </h2>
    <input type="number" placeholder="Numero de dias de tu estadia..." className="" min="2" value={days} onChange={handleChange}></input>
    <p> Reserva por {days} {days === 1 ? "Noche $" : "Noches $"} {totalAmount}  </p> */
   return (
    <div className="MercadoContainer">
      <Pasarela/>
    </div>
   )
}

export default MercadoPago;