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
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1> <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1> <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1><h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1> <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1> <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
      <h1>hola</h1>
    </div>
  );
};

export default StadoUser;