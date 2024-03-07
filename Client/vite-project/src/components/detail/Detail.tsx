

import React, { useEffect, useState, FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../Redux/Reducer/reducer";
import { reserveRoom } from "../../Redux/Actions/actions";
import { getRoomById } from "../../Redux/Actions/actions";
// import ReviewForm from "../reviewForm/reviewForm";
import { validateReservationForm } from './validationReserva';
import "./detail.css";

const Detail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const currentRoom = useSelector((state: State) => state.currentRoom);
  const user = useSelector((state: State) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(getRoomById(id));
    }
  }, [dispatch, id]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    description: ''
  });

  const [formErrors, setFormErrors] = useState<any>({});

  const handleReserveClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateReservationForm(formData);

    if (Object.keys(errors).length === 0) {
      if (currentRoom && user) {
        const formDataWithRoomId = {
          ...formData,
          roomId: id,
          userEmail: user.email 
        };

        console.log("id de room en detail: ", id)
        console.log("formDataWithRoomId: ", formDataWithRoomId)
        dispatch(reserveRoom(user.uid, formDataWithRoomId));//formData
        
        setShowForm(false);
        setFormData({
          startDate: '',
          endDate: '',
          description: ''
        });
      }
    } else {
      setFormErrors(errors);
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
            {currentRoom.images && (
              <div className="imageCarousel">
                {currentRoom.images.map((image, index) => (
                  <img key={index} src={image} alt={`Image ${index}`} />
                ))}
              </div>
            )}
          </div>
          <div className="reviews">
            <h3>Reviews:</h3>
            {currentRoom.reviews && (
              <ul>
                {currentRoom.reviews.map((review: any, index: number) => (
                  <li key={index}>
                    <p>Description: {review.description}</p>
                    <p>Score: {review.score}</p>
                    <p>Date: {review.date}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* <div className="revs">
            <ReviewForm roomId={id} />
          </div> */}
          <div className="reservation">
            <Link to="/reservation">
              <button>Pay for your reservation!</button>
            </Link>
          </div>
          <button onClick={handleReserveClick} className="reserva-button">
            RESERVAR
          </button>
          {showForm && (
            <form onSubmit={handleFormSubmit}>
              <input
                type="date"
                placeholder="Fecha de inicio"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
              {formErrors.startDate && <div className="error-message">{formErrors.startDate}</div>}

              <input
                type="date"
                placeholder="Fecha de fin"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
              {formErrors.endDate && <div className="error-message">{formErrors.endDate}</div>}

              <input
                type="text"
                placeholder="Descripción"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {formErrors.description && <div className="error-message">{formErrors.description}</div>}

              <button type="submit" className="reserva-button">
                Confirmar Reserva 
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Detail;

  

          




