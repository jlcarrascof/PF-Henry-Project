import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../Redux/Reducer/reducer";
import { getHotelById } from "../../Redux/Actions/actions";
import "./Detail.modules.css"; 

const Detail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const currentHotel = useSelector((state: State) => state.currentHotel);

  useEffect(() => {
    if (id) {
      // Verifica si id es válido
      dispatch(getHotelById(id));
    }
  }, [dispatch, id]);

  return (
    <div className="container">
      <h1>Hotel Detail</h1>
      {currentHotel && (
        <div className="detail">
          <div className="leftColumn">
            <h2>{currentHotel.name}</h2>

            {/* Nueva estructura para Address */}
            <div className="section">
              <h3>Address:</h3>
              <p>{currentHotel.address}</p>
            </div>

            {/* Nueva estructura para Details */}
            <div className="section">
              <h3>Details:</h3>
              <p>{currentHotel.details}</p>
            </div>

            {/* Nueva estructura para Services */}
            <div className="section">
              <h3>Services:</h3>
              <p>{currentHotel.services}</p>
            </div>

            {/* Agregando secciones de la Card */}
            <div className="section">
              <h3>Reviews:</h3>
              {currentHotel.reviews && (
                <ul>
                  {currentHotel.reviews.map((review, index) => (
                    <li key={index}>
                      <p>Description: {review.description}</p>
                      <p>Score: {review.score}</p>
                      <p>Client: {review.client}</p>
                      <p>Date: {review.date}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="section">
              <h3>Contact:</h3>
              {currentHotel.contact && (
                <div>
                  <p>Phone: {currentHotel.contact.phone}</p>
                  <p>Email: {currentHotel.contact.mail}</p>
                </div>
              )}
            </div>

            <div className="section">
              <h3>Rooms:</h3>
              {currentHotel.rooms && (
                <ul>
                  {currentHotel.rooms.map((room, index) => (
                    <li key={index}>
                      <p>Description: {room.description}</p>
                      <p>Type: {room.typeOfRoom}</p>
                      <p>Price: ${room.price}</p>
                      <p>Availability: {room.availability ? 'Available' : 'Not available'}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="rightColumn">
            {/* Carrusel de imágenes (a futuro) */}
            {currentHotel.images && (
              <div className="imageCarousel">
                {currentHotel.images.map((image, index) => (
                  <img key={index} src={image} alt={`Image ${index}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;



