import React from "react";
import {useDispatch} from "react-redux"
import { disableRoom } from "../../../Redux/Actions/actions";
import "./CardDisable.css";

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

const CardDisable: React.FC<CardProps> = ({ room }) => {

  const dispatch = useDispatch();
  const { name, typeOfRoom, description, price, images } = room;

  const onClick = () => {
    const {_id} = room
    dispatch(disableRoom(_id))
    window.alert(`Se desactivo la room con id: ${_id}`)
}

  return (
    <div className="Disable-grid">
      <div className="DisableCard">
        <img className="disableCard-img" src={images[0]} alt={`Photo of ${name}`} />
        <div className="disableCard-text-container">
          <h3 className="disableCard-title">{name}</h3>
          <p className="card-room-detail">{`${typeOfRoom} - ${description}`}</p>
        </div>
        <p className="card-price">${price}</p>
          <button onClick={onClick} className="card-button">
            Disable
          </button>
      </div>
    </div>
  );
};

export default CardDisable;
