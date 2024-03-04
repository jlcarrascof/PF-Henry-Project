import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReservations } from '../../Redux/Actions/actions'; 
import { useParams } from 'react-router-dom';

import "./cartReservation.css";

const CartReservation = () => {
  const userName = useSelector(state => state.user?.userName);
  const userEmail = useSelector(state => state.user?.email);
  const reservations = useSelector(state => state.reservations);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userEmail) {
      dispatch(getReservations(userEmail)); 
    } else {
      console.log("No se hizo el useEffect:", userEmail)
    }
  }, [dispatch, userEmail, userName]);
  
  return (
    <div>
      <h2 className="reservations-title">Reservas del Usuario: {userName}</h2>
      <div className="reservation"> 
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation._id}>
              <div className="reservation-item">
                <p className="reservation-label">Fecha de inicio:</p>
                <p className="reservation-value">{reservation.startDate}</p>
              </div>
              <div className="reservation-item">
                <p className="reservation-label">Fecha de fin:</p>
                <p className="reservation-value">{reservation.endDate}</p>
              </div>
              <div className="reservation-item">
                <p className="reservation-label">Descripción:</p>
                <p className="reservation-value">{reservation.description}</p>
              </div>
              {/* El botón para eliminar saqué dsp lo vuelvo a poner*/}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartReservation;