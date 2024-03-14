import React, { useEffect, useState, FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../Redux/Reducer/reducer";
import { reserveRoom } from "../../Redux/Actions/actions";
import { getRoomById } from "../../Redux/Actions/actions";
import methods from '../../../images/Payment-Methods.jpg';
// import ReviewForm from "../reviewForm/reviewForm";

import { validateReservationForm } from "./validationReserva";
import Types from "../mercadoPago/Pasarela/Types"; //!m

import "./detail.css";
import { Image, Badge, Descriptions, Slider } from "antd";
import type { DescriptionsProps } from "antd";
//Para el mapita -->
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Detail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const currentRoom = useSelector((state: State) => state.currentRoom);
  // const user = useSelector((state: State) => state.user);
  const user = JSON.parse(window.localStorage.getItem("user") || "{}"); /////////////

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
          userEmail: user.user_email,
        };

        console.log("id de room en detail: ", id);
        console.log("formDataWithRoomId: ", formDataWithRoomId);
        dispatch(reserveRoom(user.user_email, formDataWithRoomId)); //formData

        setShowForm(false);
        setFormData({
          startDate: "",
          endDate: "",
          description: "",
        });
      }
    } else {
      setFormErrors(errors);
    }
  };

  function Reservar() {
    const Start = new Date(formData.startDate);
    const End = new Date(formData.endDate);
    const DiffMS = End.getTime() - Start.getTime();
    const msPd = 1000 * 60 * 60 * 24;
    const Dias = DiffMS / msPd;
    const Room: Types.Pasarela.ReservInfo = {
      dias: Dias,
      id: id as string,
      image: currentRoom.images[0],
      precio: currentRoom.price,
      titulo: currentRoom.name,
    };
    console.log("Room:", Room);
    localStorage.setItem("ReservInfo", JSON.stringify(Room));
    window.location.replace("/pay");
  }

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Type of Room",
      children: currentRoom?.typeOfRoom,
    },
    {
      key: "2",
      label: "Billing Mode",
      children: "Prepaid",
    },
    {
      key: "3",
      label: "Overall Score",
      children: `${currentRoom?.totalScore}/${currentRoom?.reviews.length} reviews`,
    },
    {
      key: "4",
      label: "Description",
      span: 2,
      children: currentRoom?.description,
    },
    {
      key: "5",
      label: "Phone Contact",
      children: currentRoom?.contact.phone,
    },
    {
      key: "6",
      label: "Status",
      span: 2,
      children: <Badge status="processing" text="Available" />,
    },
    {
      key: "7",
      label: "Contact Mail",
      children: currentRoom?.contact.mail,
    },
    {
      key: "8",
      label: "Online Payment methods",
      children: (
        <img width={180} height={40} src= {methods} />
      ),
    },
    {
      key: "9",
      label: "Discount",
      children: "No discounts available",
    },
    {
      key: "10",
      label: "Pricing per Night",
      children: `$ ${currentRoom?.price} USD`,
    },
    {
      key: "11",
      label: "Services",
      children: currentRoom?.services?.map((service) => (
        <span key={service}>
          {service} <br />{" "}
        </span>
      )),
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="detailContainer">
      {currentRoom && (
        <div className="detail">
          <h1>{currentRoom.name}</h1>

          <div className="rightColumn">
            {currentRoom.images && (
              <Slider {...sliderSettings}>
                {currentRoom.images.map((image, index) => (
                  <div key={index} className="imageCarousel">
                    <img
                      src={image}
                      alt={`Image ${index}`}
                      width={300}
                      height={300}
                    />
                  </div>
                ))}
              </Slider>
            )}
          </div>

          <div className="rightColumn">
            {currentRoom.images && (
              <div className="imageCarousel">
                {currentRoom.images.map((image, index) => (
                  <div key={index} className="imageCarousel">
                    <Image
                      src={image}
                      alt={`Image ${index + 1}`}
                      width={300}
                      height={300}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <Descriptions
            title="Room Specifications"
            layout="vertical"
            bordered
            items={items}
          />

          {/* <div className="revs">
            <ReviewForm roomId={id} />
          </div> */}
          <button onClick={handleReserveClick} className="reserva-button">

            BOOK

          </button>
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
              {formErrors.startDate && (
                <div className="error-message">{formErrors.startDate}</div>
              )}

              <input
                type="date"
                placeholder="Fecha de fin"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
              {formErrors.endDate && (
                <div className="error-message">{formErrors.endDate}</div>
              )}

              <input
                type="text"
                placeholder="Descripción"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              {formErrors.description && (
                <div className="error-message">{formErrors.description}</div>
              )}

              <button
                onClick={Reservar}
                type="submit"
                className="reserva-button"
              >
                Confirmar Reserva
              </button>
            </form>
          )}

          <div className="map-container">
            <MapContainer
              center={[
                currentRoom.location.latitude,
                currentRoom.location.longitude,
              ]}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[
                  currentRoom.location.latitude,
                  currentRoom.location.longitude,
                ]}
              >
                <Popup>{currentRoom.name}</Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="reviews">
            <h3>Reviews:</h3>
            {currentRoom.reviews && (
              <ul>
                {/* {currentRoom.review.map((review: any, index: number) => ( */}
                {currentRoom.reviews.map((review: any, index: number) => (
                  <li key={index}>
                    <p>
                      <span className="purple">Description: </span>
                      {review.description}
                    </p>
                    <p>
                      <span className="purple">Score: </span>
                      {review.score}
                    </p>
                    <p>
                      <span className="purple">Date: </span>
                      {review.date}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          

        </div>
      )}
    </div>
  );
};

export default Detail;
