import React, { useEffect, useState, version } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../Redux/Reducer/reducer";
import { getRoomById } from "../../Redux/Actions/actions";
import ReviewForm from "../reviewForm/reviewForm";
// import { reserveRoom } from '../../Redux/Actions/actions';
import "./detail.css";

const Detail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const currentRoom = useSelector((state: State) => state.currentRoom);

  useEffect(() => {
    if (id) {
      dispatch(getRoomById(id));
    }
  }, [dispatch, id]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleReserveClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    if (currentRoom) {
      dispatch(reserveRoom(userId, formData)); // ESTO ES LO QUE ENVIA AL BACKEND Y NO ME ESTÁ FUNCIONANDO
      setShowForm(false);
      setFormData({
        startDate: "",
        endDate: "",
        description: "",
      });
    }
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
{/*NO SÉ EN QUÉ PARTE DEL DETAIL AGREGAR EL FORUMLARIO DE RESERVAS */}
      <button onClick={handleReserveClick}
      className="reserva-button">
        RESERVAR</button>
      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <input
            type="date"
            placeholder="Fecha de inicio"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
          />
          <input
            type="date"
            placeholder="Fecha de fin"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Descripción"
            value={formData.description}

            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <button type="submit">Reservar Habitación</button>
        </form>
      )}
    </div>
  );
};

export default Detail;
