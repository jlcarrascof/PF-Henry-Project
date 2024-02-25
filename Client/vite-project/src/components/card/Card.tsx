import { Link } from "react-router-dom";

import React from "react";

import "./Card.css";

interface CardProps {
  id_hotel: string;
  // id_room: string;
  hotel_name: string;
  hotel_detail: string;
  room_type: string;
  room_description: string;
  address: string;
  price: number;
  images: string;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const {
    // id_room,
    id_hotel,
    hotel_name,
    hotel_detail,
    room_type,
    room_description,
    address,
    price,
    images,
  } = props;

  const onClick = () => {
    console.log(id_hotel);
  };

  return (
    <div className="card-container">
      <img className="card-image" src={images} alt={`Photo of ${hotel_name}`} />
      <div className="card-text-container">
        <h3 className="card-title">{hotel_name}</h3>
        <p className="card-adress">Adress: {address} </p>
        <p className="card-hotel-detail">{hotel_detail}</p>
        <p className="card-room-detail">{`${room_type} - ${room_description}`}</p>
        {/* <p>{id_room}</p> */}
      </div>
      <p className="card-price">${price}</p>

      {/* <Link to={`/Detail/${id_hotel}`} className="card-link">
        <button className="card-button">Ver Detalles</button>
      </Link> */}
      <Link to={`/detail/${id_hotel}`} className="card-link">
        <button onClick={onClick} className="card-button">
        𝐒𝐞𝐞 𝐃𝐞𝐭𝐚𝐢𝐥𝐬
        </button>
      </Link>
    </div>
  );
};

export default Card;
