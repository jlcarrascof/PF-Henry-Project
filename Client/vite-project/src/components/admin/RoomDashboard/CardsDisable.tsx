import React from "react";
import CardBorrado from "./CardDisable";
import "./CardDisable.css"

interface Room {
  _id: string;
  name: string;
  typeOfRoom: string;
  description: string;
  price: string;
  images: string[];
}

interface CardsProps {
  allAdminRooms: Room[];
}

const CardsDisable: React.FC<CardsProps> = ({ allAdminRooms }) => {
  return (
    <div className="Disable-Container">
      <div className="Disable-grid">
        {allAdminRooms.map((room) => (
          <CardBorrado
          key={room._id} 
          room={room}
          />
          ))}
        </div>
    </div>
  );
};

export default CardsDisable;
