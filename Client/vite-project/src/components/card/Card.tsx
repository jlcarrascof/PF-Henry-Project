import { Link } from "react-router-dom";
import "./Card.css";

interface CardC {
  id_hotel: number;
  id_room: number;
  hotel_name: string;
  hotel_detail: string;
  room_type: string;
  room_description: string;
  address: string;
  price: number;
  images: string;
}

const Card: React.FC<CardC> = (props: CardC) => {
  const {
    id_room,
    id_hotel,
    hotel_name,
    hotel_detail,
    room_type,
    room_description,
    address,
    price,
    images,
  } = props;

  return (
    <div className="card-container">
      <img className="card-image" src={images} alt={`Photo of ${hotel_name}`} />
      <div className="card-text-container">
        <h3 className="card-title">{hotel_name}</h3>
        <p className="card-adress">Adress: {address} </p>
        <p className="card-hotel-detail">{hotel_detail}</p>
        <p className="card-room-detail">{`${room_type} - ${room_description}`}</p>
      </div>
      <p className="card-price">${price}</p>
    </div>
  );
};

export default Card;
