import { Link } from "react-router-dom";
import React from "react";
import "./CardLanding.css";

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

const CardLanding: React.FC<CardProps> = (props: CardProps) => {
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
    <div className="cardLandContainer">
      <div className="imgContainer">
        <img
          className="cardLand-image"
          src={images}
          alt={`Photo of ${hotel_name}`}
        />
      </div>

      <div className="cardLand-text-container">
        <h3 className="cardLand-title">{hotel_name}</h3>
        <p className="cardLand-adress">Adress: {address} </p>
        <Link to={`/detail/${id_hotel}`} className="cardLand-link">
          <button onClick={onClick} className="cardLand-button">
            𝐒𝐞𝐞 𝐃𝐞𝐭𝐚𝐢𝐥𝐬
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardLanding;
