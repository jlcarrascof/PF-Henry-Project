import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReservation } from '../../Redux/Actions/actions'; // Action para eliminar reserva

const CartReservation = () => {
  const reservations = useSelector(state => state.reservations);
  const dispatch = useDispatch();

  const handleDeleteReservation = (reservationId) => {
    dispatch(deleteReservation(reservationId)); // Enviar acción para eliminar reserva
  };

  return (
    <div>
      <h2>Reservas del Usuario</h2>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>
            <p>Fecha de inicio: {reservation.startDate}</p>
            <p>Fecha de fin: {reservation.endDate}</p>
            <p>Descripción: {reservation.description}</p>
            <button onClick={() => handleDeleteReservation(reservation.id)}>Eliminar Reserva</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartReservation;