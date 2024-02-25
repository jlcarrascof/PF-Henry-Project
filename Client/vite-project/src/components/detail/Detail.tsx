import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../Redux/Reducer/reducer";
import { getHotelById } from "../../Redux/Actions/actions";
import ReviewForm from "../reviewForm/reviewForm";
import "./detail.css";

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
    <div className="detailContainer">
      {currentHotel && (
        <div className="detail">
          <h1>{currentHotel.name}</h1>

          <div className="leftColumn">
            <div className="aColumn">
              <h3>Address:</h3>
              <p>{currentHotel.address}</p>
              <h3>Details:</h3>
              <p>{currentHotel.details}</p>
              <h3>Services:</h3>
              <p>{currentHotel.services}</p>
              <h3>Contact:</h3>

              {currentHotel.contact && (
                <div>
                  <p>Phone: {currentHotel.contact.phone}</p>
                  <p>Email: {currentHotel.contact.mail}</p>
                </div>
              )}
            </div>
            <div className="bColumn">
              <div className="rooms">
                <h3>Rooms:</h3>
                {currentHotel.rooms && (
                  <ul>
                    {currentHotel.rooms.map((room, index) => (
                      <div className="eachRoom" key={index}>
                        <p>Description: {room.description}</p>
                        <p>Type: {room.typeOfRoom}</p>
                        <p>Price: ${room.price}</p>
                        <p>
                          Availability:{" "}
                          {room.availability ? "Available" : "Not available"}
                        </p>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
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
          <div className="reviews">
            <h3>Reviews:</h3>
            {currentHotel.reviews && (
              <ul>
                {currentHotel.reviews.map((review, index) => (
                  <div key={index}>
                    <p>Description: {review.description}</p>
                    <p>Score: {review.score}</p>
                    <p>Date: {review.date}</p>
                  </div>
                ))}
              </ul>
            )}
          </div>
          <div className="revs"> 
            <ReviewForm/>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Detail;
