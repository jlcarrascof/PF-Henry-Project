import Login from "../login/Login";
import "./MercadoPago.css";
import Pasarela from "./Pasarela/Pasarela";


const MercadoPago: React.FC = () => {
  const user = window.localStorage.getItem("user")
   return (
    <>
    {user ?
      <div className="MercadoContainer">
      <Pasarela/> 
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