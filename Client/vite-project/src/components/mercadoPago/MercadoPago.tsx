import "./MercadoPago.css";
import Pasarela from "./Pasarela/Pasarela";


const MercadoPago: React.FC = () => {
  const user = window.localStorage.getItem("user")
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