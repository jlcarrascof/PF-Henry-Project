import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReservation } from '../../Redux/Actions/actions';

const CartReservation = () => {
  const reservations = useSelector((state) => state.reservations);
  const dispatch = useDispatch();

  const handleDeleteReservation = (reservationId) => {
    dispatch(deleteReservation(reservationId));
    // Lógica adicional después de eliminar la reserva...
  };


  return (
    <div>
      <h1>Carrito de Reservas</h1>
      {reservations.map((reservation) => (
        <div key={reservation._id}>
          <p>Inicio: {reservation.startDate}</p>
          <p>Fin: {reservation.endDate}</p>
          <p>Descripción: {reservation.description}</p>
          <button onClick={() => handleDeleteReservation(reservation._id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default CartReservation;