import React from "react";
import { useDispatch } from "react-redux";
import { disableHotel } from "../../../Redux/Actions/actions";
import './HotelDashboard.css';

interface Hotel {
  _id: string;
  name: string;
  address: string;
  price: string;
  availability: boolean;
}

interface HotelProps {
  hotel: Hotel;
}

const HotelDisable: React.FC<HotelProps> = ({ hotel }) => {
  const dispatch = useDispatch();
  const { _id, name, address, price, availability } = hotel;

  const onClick = () => {
    dispatch(disableHotel(_id));
    window.alert(`Se desactivó la habitación con ID: ${_id}`);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{address}</td>
      <td>${price}</td>
      <td>{_id}</td>
      <td>
        <button
          onClick={onClick}
          className={`availability-button ${availability ? 'disable' : 'enable'}`}
        >
          {availability ? 'Deshabilitar' : 'Habilitar'}
        </button>
      </td>
    </tr>
  );
};

export default HotelDisable;
