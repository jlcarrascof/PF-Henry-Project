import { Link } from "react-router-dom";
import React from "react";
import "./CardLanding.css";

interface Room {
  _id: string;
  name: string;
  typeOfRoom: string;
  description: string;
  price: string;
  images: string[];
}

interface CardProps {
  room: Room;
}

const CardLanding: React.FC<CardProps> = ({ room }) => {
  const { _id, name, typeOfRoom, description, price, images } = room;

  const onClick = () => {
    console.log(_id);
  };

  return (
    <div className="cardLandContainer">
      <div className="imgContainer">
        <img
          className="cardLand-image"
          src={images[0]}
          alt={`Photo of ${name}`}
        />
      </div>

      <div className="cardLand-text-container">
        <h3 className="cardLand-title">{name}</h3>
        <p className="cardLand-adress">Type: {description} </p>
        <Link to={`/detail/${_id}`} className="cardLand-link">
          <button onClick={onClick} className="cardLand-button">
            𝐒𝐞𝐞 𝐃𝐞𝐭𝐚𝐢𝐥𝐬
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardLanding;