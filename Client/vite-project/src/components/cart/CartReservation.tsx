import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReservation, getReservations } from '../../Redux/Actions/actions'; 
import { useParams } from 'react-router-dom';

import "./cartReservation.css";

const CartReservation = () => {
 
  const userName = useSelector(state => state.user?.userName);
  const userEmail = useSelector(state => state.user?.email);

 const reservations = useSelector(state => state.reservations);
  const dispatch = useDispatch();

  console.log("Email de usaurio que sacamos del store: ", userEmail)

  useEffect(() => {
    if (userEmail) {
      dispatch(getReservations(userEmail)); 
    } else {
      console.log("No se hizo el useEffect:", userEmail)
    }
  }, [dispatch, userEmail, userName]);
  
  // const handleDeleteReservation = (reservationId) => {
  //   dispatch(deleteReservation(reservationId)); 
  // };

 
  return (
    <div>
    <h2>Reservas del Usuario: {userName}</h2>
    <div className="reservation"> 
            <ul>
                {reservations.map((reservation) => (
                    <li key={reservation._id}>
                        <p>Fecha de inicio: {reservation.startDate}</p>
                        <p>Fecha de fin: {reservation.endDate}</p>
                        <p>Descripción: {reservation.description}</p>
                        {/* El botón para eliminar saqué dsp lo vuelvo a poner*/}
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default CartReservation;