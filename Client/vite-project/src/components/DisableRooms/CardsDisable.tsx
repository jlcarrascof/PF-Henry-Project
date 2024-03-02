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
  allRooms: Room[];
}

const CardsDisable: React.FC<CardsProps> = ({ allRooms }) => {
  console.log("En cards la lista que recibe cómo props:", allRooms);

  return (
    <div className="Disable-Container">
      <div className="Disable-grid">
        {allRooms.map((room) => (
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
