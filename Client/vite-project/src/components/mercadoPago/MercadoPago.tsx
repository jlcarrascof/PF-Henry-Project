import Login from "../login/Login";
import "./MercadoPago.css";
import pasarela from "./Pasarela/Pasarela.tsx";

const MercadoPago: React.FC = () => {
  const user = localStorage.getItem("user")
   return (
    <>
    {user && user !== undefined ?
      <div className="MercadoContainer">
      <pasarela/> 
      </div>
      : <div>
        <Login />
      </div>
    }
    </>
   )
}
//:)
export default MercadoPago;
