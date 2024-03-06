import {useEffect} from "react";
import { useSelector } from "react-redux";
import { RootState } from './RootState'

const StadoUser = () => {
  const user = useSelector((state: RootState) => state.user);

  useEffect (() => {
    console.log("Usuario almacenado en el store:", user);
   },[user])

  // Resto de tu lógica aquí

  return (
    <div>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>Ver el código de este componente</h1>
     <p>ver el código de este componente: Ahora tengo que ir a apagar un incendio en mi casa.</p> 
      <p>al login todavía le falta ya que tiene unas alertas mál implementadas, en la Navbar tengo que gestionar de mejor forma el estado del Login _a menos de que lo quieran mover_</p>
    </div>
  );
};

export default StadoUser;