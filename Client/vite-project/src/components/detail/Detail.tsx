import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../Redux/Reducer/reducer";
import { getRoomById } from "../../Redux/Actions/actions";
import ReviewForm from "../reviewForm/reviewForm";
import { postReservation } from '../../Redux/Actions/actions';
import "./detail.css";

const Detail: React.FC = ({room}) => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const currentRoom = useSelector((state: State) => state.currentRoom);

  useEffect(() => {
    if (id) {
      dispatch(getRoomById(id));
    }
  }, [dispatch, id]);

  const [reservationData, setReservationData] = useState({
    startDate: '',
    endDate: '',
    description: ''
  });


  const handleInputChange = (e) => {
    setReservationData({ ...reservationData, [e.target.name]: e.target.value });
  };


  const handleReservationSubmit = () => {
    dispatch(postReservation(room._id, reservationData));
    // Lógica adicional después de enviar la reserva...
  };




  return (
    <div className="detailContainer">
      {currentRoom && (
        <div className="detail">
          <h1>{currentRoom.name}</h1>

          <div className="leftColumn">
            <div className="aColumn">
              <h3>Description:</h3>
              <p>{currentRoom.description}</p>
              <h3>Type of Room:</h3>
              <p>{currentRoom.typeOfRoom}</p>
              <h3>Price:</h3>
              <p>{currentRoom.price}</p>
              <h3>Availability:</h3>
              <p>{currentRoom.availability ? "Available" : "Not available"}</p>
              <h3>Number of Rooms:</h3>
              <p>{currentRoom.num_rooms}</p>
              <h3>Services:</h3>
              <p>{currentRoom.services}</p>
              <h3>Contact:</h3>
              {currentRoom.contact && (
                <div>
                  <p>Phone: {currentRoom.contact.phone}</p>
                  <p>Email: {currentRoom.contact.mail}</p>
                </div>
              )}
            </div>
            <div className="bColumn"></div>
          </div>

          <div className="rightColumn">
            {/* Carrusel de imágenes (a futuro) */}
            {currentRoom.images && (
              <div className="imageCarousel">
                {currentRoom.images.map((image, index) => (
                  <img key={index} src={image} alt={`Image ${index}`} />
                ))}
              </div>
            )}
          </div>
          <div className="reviews">
            <h3>Reseñas:</h3>
            {currentRoom.reviews && (
              <ul>
                {currentRoom.reviews.map((review: any, index: number) => (
                  <li key={index}>
                    <p>Descripción: {review.description}</p>
                    <p>Puntuación: {review.score}</p>
                    <p>Fecha: {review.date}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="revs">
            <ReviewForm roomId={id} />
          </div>
          <div className="reservation">
            <Link to="/reservation">
              <button>Pay for your reservation!</button>
            </Link>
          </div>
        </div>
      )}

{/*NO SÉ EN QUÉ PARTE DEL DETAIL AGREGAR EL FORUMLARIO DE RESERVAS */}
<form>
        <input type="date" name="startDate" value={reservationData.startDate} onChange={handleInputChange} />
        <input type="date" name="endDate" value={reservationData.endDate} onChange={handleInputChange} />
        <textarea name="description" value={reservationData.description} onChange={handleInputChange}></textarea>
        <button type="button" onClick={handleReservationSubmit}>Agregar al carrito</button>
      </form>
      {/* Mostrar reservas existentes para esta habitación */}
      {room.reservations.map((reservation) => (
        <div key={reservation._id}>
          <p>Inicio: {reservation.startDate}</p>
          <p>Fin: {reservation.endDate}</p>
          <p>Descripción: {reservation.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Detail;




  

          
